import React, { useState, useMemo, useRef, useEffect } from 'react';
import Toast from './Toast.jsx';
import { NoTemplatesFound, NoSearchResults, LoadingState } from './EmptyState.jsx';
import { GallerySkeleton } from './LoadingSkeleton.jsx';
import { fetchAvailableTemplates, fetchTemplateCss } from '../api/templates.js';

const TemplateGallery = ({ searchTerm, selectedCategory, loading }) => {
  const [copiedId, setCopiedId] = useState(null);
  const [expandedPreviews, setExpandedPreviews] = useState(new Set());
  const [toasts, setToasts] = useState([]);
  const [activePreviewTemplate, setActivePreviewTemplate] = useState(null);
  const [appliedTemplate, setAppliedTemplate] = useState(null);
  const [templateColors, setTemplateColors] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [selectedTemplateForApiKey, setSelectedTemplateForApiKey] = useState(null);
  const [activeApiKey, setActiveApiKeyState] = useState(null);

  // Advanced customizer state
  const [advancedConfig, setAdvancedConfig] = useState({
    colors: {
      primary: '#2563eb',
      secondary: '#fef3c7',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1e293b'
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
      baseSize: '16px',
      headingWeight: '700'
    },
    layout: {
      paddingBase: '16px',
      borderRadius: '8px',
      containerWidth: '1200px'
    },
    components: {
      navbarStyle: 'solid',
      footerStyle: 'dark',
      buttonStyle: 'rounded'
    }
  });

  const [generatedApiKey, setGeneratedApiKey] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [showLiveCustomization, setShowLiveCustomization] = useState(false);
  const [selectedTemplateForCustomization, setSelectedTemplateForCustomization] = useState(null);
  const [liveColors, setLiveColors] = useState({
    primaryColor: '',
    secondaryColor: '',
    accentColor: ''
  });
  const [templateCssContent, setTemplateCssContent] = useState({});
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewActive, setPreviewActive] = useState(false);
  const [dynamicApiUrls, setDynamicApiUrls] = useState({});

  // Load templates from backend API on mount
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setTemplatesLoading(true);
        const response = await fetchAvailableTemplates();
        
        // Assume templates is an array returned from API
        if (Array.isArray(response) && response.length > 0) {
          // Transform API response to match component expectations
          const transformedTemplates = response.map(template => ({
            id: template.templateId,
            name: template.name,
            description: template.description,
            category: template.category || 'business', // Use API category or default
            apiKey: template.apiKey,
            version: template.version
          }));
          
          setTemplates(transformedTemplates);
        } else {
          // Empty array - no templates available
          setTemplates([]);
        }
      } catch (error) {
        console.error('Error loading templates from API:', error);
        addToast('Failed to load templates from server', 'error');
        setTemplates([]);
      } finally {
        setTemplatesLoading(false);
      }
    };

    loadTemplates();
  }, []);

  // Generate dynamic CSS API URL based on template and customizations
  const generateDynamicApiUrl = (template, colors = null) => {
    const baseUrl = 'http://localhost:5000/api/css';
    const apiKey = template.apiKey;
    const customizationColors = colors || templateColors[template.id] || liveColors;
    
    const queryParams = new URLSearchParams();
    
    // Add color parameters only if they have values
    if (customizationColors.primaryColor) {
      queryParams.append('primaryColor', customizationColors.primaryColor);
    }
    if (customizationColors.secondaryColor) {
      queryParams.append('secondaryColor', customizationColors.secondaryColor);
    }
    if (customizationColors.accentColor) {
      queryParams.append('accentColor', customizationColors.accentColor);
    }
    
    const queryString = queryParams.toString();
    return queryString ? `${baseUrl}/${apiKey}?${queryString}` : `${baseUrl}/${apiKey}`;
  };

  // Update dynamic API URLs when colors change
  useEffect(() => {
    const newUrls = {};
    templates.forEach(template => {
      newUrls[template.id] = generateDynamicApiUrl(template);
    });
    setDynamicApiUrls(newUrls);
  }, [templates, templateColors, liveColors]);

  // Load applied template and colors from localStorage on mount
  useEffect(() => {
    const savedTemplate = localStorage.getItem('appliedTemplate');
    const savedColors = localStorage.getItem('templateColors');
    const savedLiveColors = localStorage.getItem('liveCustomizationColors');
    
    if (savedTemplate) {
      try {
        const template = JSON.parse(savedTemplate);
        setAppliedTemplate(template);
      } catch (error) {
        console.error('Error loading template from localStorage:', error);
      }
    }
    
    if (savedColors) {
      try {
        const colors = JSON.parse(savedColors);
        setTemplateColors(colors);
      } catch (error) {
        console.error('Error loading colors from localStorage:', error);
      }
    }
    
    // Load live customization colors and apply them to templates
    if (savedLiveColors) {
      try {
        const liveColorsData = JSON.parse(savedLiveColors);
        // Apply saved live colors to template colors
        Object.keys(liveColorsData).forEach(templateId => {
          const colors = liveColorsData[templateId];
          setTemplateColors(prev => ({
            ...prev,
            [templateId]: {
              primary: colors.primary,
              secondary: colors.secondary,
              accent: colors.accent
            }
          }));
        });
      } catch (error) {
        console.error('Error loading live customization colors:', error);
      }
    }
  }, []);

  // Fetch active template on component mount
  useEffect(() => {
    const fetchActiveTemplate = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/active-template");
        const data = await res.json();

        if (data.success) {
          setActiveApiKeyState(data.activeApiKey);
        }
      } catch (err) {
        console.error("Failed to fetch active template", err);
      }
    };

    fetchActiveTemplate();
  }, []);

  // Save applied template to localStorage whenever it changes
  useEffect(() => {
    if (appliedTemplate) {
      localStorage.setItem('appliedTemplate', JSON.stringify(appliedTemplate));
    } else {
      localStorage.removeItem('appliedTemplate');
    }
  }, [appliedTemplate]);

  // Save colors to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(templateColors).length > 0) {
      localStorage.setItem('templateColors', JSON.stringify(templateColors));
    } else {
      localStorage.removeItem('templateColors');
    }
  }, [templateColors]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const updateLiveColor = (colorType, color) => {
    setLiveColors(prev => ({
      ...prev,
      [colorType]: color
    }));
    
    // Apply live customization to the selected template immediately
    if (selectedTemplateForCustomization) {
      // Map live color types to UI color types
      const uiColorType = colorType === 'primaryColor' ? 'primary' : 
                          colorType === 'secondaryColor' ? 'secondary' : 
                          colorType === 'accentColor' ? 'accent' : colorType;
      
      updateTemplateColor(selectedTemplateForCustomization.id, uiColorType, color);
    }
  };

  const fetchTemplateCssContent = async (template) => {
    // Check if CSS content already exists in state
    if (templateCssContent[template.id]) {
      return templateCssContent[template.id];
    }

    try {
      setPreviewLoading(true);
      const cssContent = await fetchTemplateCss(template.apiKey);
      setTemplateCssContent(prev => ({
        ...prev,
        [template.id]: cssContent
      }));
      return cssContent;
    } catch (error) {
      console.error('Error fetching CSS content:', error);
      addToast('Failed to fetch template CSS', 'error');
      return '';
    } finally {
      setPreviewLoading(false);
    }
  };

  const openLiveCustomization = async (template) => {
    setSelectedTemplateForCustomization(template);
    
    // First, fetch the latest configuration from backend
    const config = await fetchTemplateConfiguration(template);
    
    let colorsToUse = {
      primaryColor: '#2563eb',
      secondaryColor: '#64748b',
      accentColor: '#f59e0b'
    };
    
    // Use fetched configuration if available, otherwise check localStorage
    if (config) {
      colorsToUse = {
        primaryColor: config.primaryColor || '#2563eb',
        secondaryColor: config.secondaryColor || '#64748b',
        accentColor: config.accentColor || '#f59e0b'
      };
      console.log(`Using saved configuration for ${template.name}:`, config);
    } else {
      // Fallback to localStorage if no backend config
      const savedColors = localStorage.getItem('liveCustomizationColors');
      if (savedColors) {
        try {
          const parsedColors = JSON.parse(savedColors);
          colorsToUse = {
            primaryColor: parsedColors[template.id]?.primary || colorsToUse.primaryColor,
            secondaryColor: parsedColors[template.id]?.secondary || colorsToUse.secondaryColor,
            accentColor: parsedColors[template.id]?.accent || colorsToUse.accentColor
          };
        } catch (error) {
          console.error('Error loading saved colors:', error);
        }
      }
    }
    
    // Use template colors if they exist, otherwise use fetched/saved colors
    setLiveColors({
      primaryColor: templateColors[template.id]?.primary || colorsToUse.primaryColor,
      secondaryColor: templateColors[template.id]?.secondary || colorsToUse.secondaryColor,
      accentColor: templateColors[template.id]?.accent || colorsToUse.accentColor
    });
    
    setShowLiveCustomization(true);
  };

  const closeLiveCustomization = () => {
    // Save current colors to localStorage before closing
    if (selectedTemplateForCustomization) {
      const savedColors = localStorage.getItem('liveCustomizationColors');
      let allSavedColors = {};
      
      if (savedColors) {
        try {
          allSavedColors = JSON.parse(savedColors);
        } catch (error) {
          console.error('Error loading saved colors:', error);
        }
      }
      
      // Update saved colors with current customization
      allSavedColors[selectedTemplateForCustomization.id] = {
        primary: liveColors.primaryColor,
        secondary: liveColors.secondaryColor,
        accent: liveColors.accentColor
      };
      
      localStorage.setItem('liveCustomizationColors', JSON.stringify(allSavedColors));
    }
    
    setShowLiveCustomization(false);
    setSelectedTemplateForCustomization(null);
  };

  const applyLiveCustomization = () => {
    if (selectedTemplateForCustomization) {
      // Update the template colors for the selected template
      updateTemplateColor(selectedTemplateForCustomization.id, 'primary', liveColors.primaryColor);
      updateTemplateColor(selectedTemplateForCustomization.id, 'secondary', liveColors.secondaryColor);
      updateTemplateColor(selectedTemplateForCustomization.id, 'accent', liveColors.accentColor);
      
      // Save to localStorage
      const savedColors = localStorage.getItem('liveCustomizationColors');
      let allSavedColors = {};
      
      if (savedColors) {
        try {
          allSavedColors = JSON.parse(savedColors);
        } catch (error) {
          console.error('Error loading saved colors:', error);
        }
      }
      
      allSavedColors[selectedTemplateForCustomization.id] = {
        primary: liveColors.primaryColor,
        secondary: liveColors.secondaryColor,
        accent: liveColors.accentColor
      };
      
      localStorage.setItem('liveCustomizationColors', JSON.stringify(allSavedColors));
      
      addToast('Live customization applied and saved!', 'success');
      closeLiveCustomization();
    }
  };

  const generateLiveApiUrl = () => {
    if (!selectedTemplateForCustomization) return '';
    
    const baseUrl = 'http://localhost:5000/api/css';
    const apiKey = selectedTemplateForCustomization.apiKey;
    const params = new URLSearchParams();
    
    // Add color parameters only if they differ from defaults
    if (liveColors.primaryColor && liveColors.primaryColor !== '#2563eb') {
      params.append('primaryColor', liveColors.primaryColor);
    }
    if (liveColors.secondaryColor && liveColors.secondaryColor !== '#64748b') {
      params.append('secondaryColor', liveColors.secondaryColor);
    }
    if (liveColors.accentColor && liveColors.accentColor !== '#f59e0b') {
      params.append('accentColor', liveColors.accentColor);
    }
    
    const queryString = params.toString();
    return queryString ? `${baseUrl}/${apiKey}?${queryString}` : `${baseUrl}/${apiKey}`;
  };

  const copyLiveApiUrl = async () => {
    const url = generateLiveApiUrl();
    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        addToast('Live API URL copied to clipboard!', 'success');
      } catch (err) {
        addToast('Failed to copy API URL', 'error');
      }
    }
  };

  const resetLiveColors = () => {
    const defaultColors = {
      primaryColor: '#2563eb',
      secondaryColor: '#64748b',
      accentColor: '#f59e0b'
    };
    
    setLiveColors(defaultColors);
    
    // Apply reset to template immediately if selected
    if (selectedTemplateForCustomization) {
      updateTemplateColor(selectedTemplateForCustomization.id, 'primary', defaultColors.primaryColor);
      updateTemplateColor(selectedTemplateForCustomization.id, 'secondary', defaultColors.secondaryColor);
      updateTemplateColor(selectedTemplateForCustomization.id, 'accent', defaultColors.accentColor);
      
      // Remove from localStorage
      const savedColors = localStorage.getItem('liveCustomizationColors');
      if (savedColors) {
        try {
          const allSavedColors = JSON.parse(savedColors);
          delete allSavedColors[selectedTemplateForCustomization.id];
          localStorage.setItem('liveCustomizationColors', JSON.stringify(allSavedColors));
        } catch (error) {
          console.error('Error removing saved colors:', error);
        }
      }
    }
  };

  const getCustomizedCSS = (template) => {
    // Use fetched CSS content or return empty string if not available
    const cssContent = templateCssContent[template.id] || '';
    
    // Defensive: Return empty string if CSS is not a string
    if (typeof cssContent !== 'string') {
      return '';
    }

    const colors = templateColors[template.id];
    let customizedCSS = cssContent;

    // Only apply color replacements if colors exist
    if (colors) {
      // Replace primary color
      if (colors.primary && typeof colors.primary === 'string') {
        customizedCSS = customizedCSS.replace(
          /--primary-color:\s*[^;]+;/g,
          `--primary-color: ${colors.primary};`
        );
        customizedCSS = customizedCSS.replace(
          /--primary-light:\s*[^;]+;/g,
          `--primary-light: ${colors.primary}cc;`
        );
      }

      // Replace secondary color
      if (colors.secondary && typeof colors.secondary === 'string') {
        customizedCSS = customizedCSS.replace(
          /--secondary-color:\s*[^;]+;/g,
          `--secondary-color: ${colors.secondary};`
        );
      }

      // Replace accent color
      if (colors.accent && typeof colors.accent === 'string') {
        customizedCSS = customizedCSS.replace(
          /--accent-color:\s*[^;]+;/g,
          `--accent-color: ${colors.accent};`
        );
      }
    }

    return customizedCSS;
  };

  const handleActivate = async (apiKey) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/set-active-template/${apiKey}`,
        { method: "POST" }
      );

      if (res.ok) {
        setActiveApiKeyState(apiKey);
        addToast('Template activated successfully', 'success');
      } else {
        throw new Error('Failed to set active template');
      }
    } catch (error) {
      console.error('Error setting active template:', error);
      addToast('Failed to set active template', 'error');
    }
  };

  const updateTemplateConfig = async (apiKey, updates) => {
    try {
      const response = await fetch(`http://localhost:5000/api/config/${apiKey}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "updates": updates
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update template configuration');
      }
      
      console.log('Configuration updated successfully:', updates);
      addToast('Configuration updated successfully', 'success');
      
      // Refresh CSS preview if this template is currently active
      if (activeApiKey === apiKey) {
        // Trigger CSS reload for current template
        const cssLink = document.querySelector('link[href*="/api/css/current"]');
        if (cssLink) {
          const timestamp = new Date().getTime();
          cssLink.href = `http://localhost:5000/api/css/current?t=${timestamp}`;
        }
      }
      
    } catch (error) {
      console.error('Error updating template configuration:', error);
      // Optionally show error to user
      addToast(`Failed to update configuration: ${error.message}`, 'error');
    }
  };

  const updateTemplateColor = (templateId, colorType, color) => {
    setTemplateColors(prev => ({
      ...prev,
      [templateId]: {
        ...prev[templateId],
        [colorType]: color
      }
    }));
    
    // Find the template to get its apiKey
    const template = templates.find(t => t.id === templateId);
    if (template) {
      // Map UI color types to backend field names
      const backendColorType = colorType === 'primary' ? 'primaryColor' : 
                              colorType === 'secondary' ? 'secondaryColor' : 
                              colorType === 'accent' ? 'accentColor' : colorType;
      
      // Immediately send PATCH request to backend
      updateTemplateConfig(template.apiKey, { [backendColorType]: color });
    }
  };

  const generateApiKey = (template) => {
    // Generate a mock API key (in real implementation, this would come from backend)
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const apiKey = `tpl_${template.id}_${timestamp}_${random}`;
    
    setGeneratedApiKey(apiKey);
    setSelectedTemplateForApiKey(template);
    setShowApiKeyModal(true);
  };

  const copyApiKey = async () => {
    if (generatedApiKey) {
      try {
        await navigator.clipboard.writeText(generatedApiKey);
        addToast('API key copied to clipboard!', 'success');
      } catch (err) {
        addToast('Failed to copy API key', 'error');
      }
    }
  };

  const copyApiUsage = async (template) => {
    const dynamicUrl = dynamicApiUrls[template.id] || generateDynamicApiUrl(template);
    const apiUsage = `API Key: ${template.apiKey}
Dynamic CSS URL: ${dynamicUrl}
Link Tag: <link rel="stylesheet" href="${dynamicUrl}">

Usage Instructions:
1. Copy the link tag above
2. Add it to your HTML <head> section
3. Your template will load with live customizations
4. Updates to colors will reflect automatically

Note: The URL includes your selected color customizations as query parameters.`;
    
    try {
      await navigator.clipboard.writeText(apiUsage);
      setCopiedId(`api-usage-${template.id}`);
      setTimeout(() => setCopiedId(null), 2000);
      addToast('API usage copied to clipboard!', 'success');
    } catch (err) {
      addToast('Failed to copy API usage', 'error');
    }
  };

  const applyTemplate = async (template) => {
    try {
      // Fetch CSS content when template is applied
      await handleTemplateLoad(template);
      
      // Get current customization values for this template
      const colors = templateColors[template.id] || {};
      const customizationData = {
        primaryColor: colors.primary || '#2563eb',
        secondaryColor: colors.secondary || '#64748b', 
        accentColor: colors.accent || '#f59e0b',
        theme: 'default'
      };
      
      // Send PATCH request to backend to save configuration
      const response = await fetch(`http://localhost:5000/api/config/${template.apiKey}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updates: customizationData
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save template configuration');
      }
      
      setAppliedTemplate(template);
      setActivePreviewTemplate(null);
      setExpandedPreviews(new Set());
      addToast(`${template.name} template applied and saved successfully!`, 'success');
    } catch (error) {
      console.error('Error applying template:', error);
      addToast(`Failed to apply template: ${error.message}`, 'error');
    }
  };

  const fetchTemplateConfiguration = async (template) => {
    try {
      const response = await fetch(`http://localhost:5000/api/config/${template.apiKey}`);
      
      if (!response.ok) {
        console.warn('No existing configuration found for template:', template.apiKey);
        return null;
      }
      
      const data = await response.json();
      if (data.success && data.data) {
        return data.data.config;
      }
      return null;
    } catch (error) {
      console.error('Error fetching template configuration:', error);
      return null;
    }
  };

  const handleTemplateLoad = async (template) => {
    try {
      await fetchTemplateCssContent(template);
      
      // Fetch existing configuration and initialize customization UI
      const config = await fetchTemplateConfiguration(template);
      if (config) {
        // Update template colors with saved configuration
        setTemplateColors(prev => ({
          ...prev,
          [template.id]: {
            primary: config.primaryColor || '#2563eb',
            secondary: config.secondaryColor || '#64748b',
            accent: config.accentColor || '#f59e0b'
          }
        }));
        
        // Update live colors if this template is selected for customization
        if (selectedTemplateForCustomization?.id === template.id) {
          setLiveColors({
            primaryColor: config.primaryColor || '#2563eb',
            secondaryColor: config.secondaryColor || '#64748b',
            accentColor: config.accentColor || '#f59e0b'
          });
        }
        
        console.log(`Loaded saved configuration for ${template.name}:`, config);
      }
    } catch (error) {
      console.error('Error loading template CSS:', error);
      addToast('Failed to load template CSS', 'error');
    }
  };

  const downloadCSS = (css, templateName) => {
    try {
      const blob = new Blob([css], { type: 'text/css' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}.css`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addToast(`${templateName} CSS downloaded successfully!`, 'success');
    } catch (error) {
      addToast('Failed to download CSS', 'error');
    }
  };

  const copyToClipboard = async (css, id) => {
    try {
      await navigator.clipboard.writeText(css);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      addToast('CSS copied to clipboard!', 'success');
    } catch (err) {
      addToast('Failed to copy CSS', 'error');
    }
  };

  const injectPreviewStyles = (template) => {
    // Remove any existing preview styles
    removePreviewStyles();
    
    // Generate dynamic API URL
    const dynamicUrl = dynamicApiUrls[template.id] || generateDynamicApiUrl(template);
    
    // Create and inject link tag for dynamic CSS
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = dynamicUrl;
    linkElement.id = 'template-preview-styles';
    
    // Add to document head
    document.head.appendChild(linkElement);
    
    // Set preview active state
    setPreviewActive(true);
    setActivePreviewTemplate(template);
  };

  const removePreviewStyles = () => {
    // Remove preview styles if they exist
    const existingStyles = document.getElementById('template-preview-styles');
    if (existingStyles) {
      existingStyles.remove();
    }
  };

  const handlePreviewLoad = async (template) => {
    try {
      // Load template CSS content and configuration
      await handleTemplateLoad(template);
      
      const cssContent = await fetchTemplateCssContent(template);
      if (cssContent) {
        injectPreviewStyles(template);
      } else {
        addToast('Preview unavailable for this template', 'warning');
      }
    } catch (error) {
      console.error('Error loading preview:', error);
      addToast('Failed to load preview', 'error');
    }
  };

  const togglePreview = (template) => {
    setExpandedPreviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(template.id)) {
        // Closing preview
        newSet.delete(template.id);
        setActivePreviewTemplate(null);
        setPreviewActive(false);
        // Remove preview styles when closing preview
        removePreviewStyles();
      } else {
        // Opening preview
        newSet.clear(); // Clear all other previews
        newSet.add(template.id);
        setActivePreviewTemplate(template);
        setPreviewActive(true);
        
        // Fetch CSS and inject preview styles
        handlePreviewLoad(template);
      }
      return newSet;
    });
  };

  const filteredTemplates = useMemo(() => {
    // Assume templates is an array, filter safely
    if (!Array.isArray(templates)) {
      return [];
    }
    
    return templates.filter(template => {
      const matchesSearch = !searchTerm || 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [templates, searchTerm]);

  if (templatesLoading) {
    return <LoadingState />;
  }

  // Render templates when array length > 0, show empty state when empty
  if (!Array.isArray(templates) || templates.length === 0) {
    return <NoTemplatesFound />;
  }
  return (
    <>
      {/* Applied Template Global Styles - Only if template has CSS */}
      {appliedTemplate && appliedTemplate.css && (
        <style id="applied-template-styles">
          {getCustomizedCSS(appliedTemplate)}
        </style>
      )}
      
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-6">
        {/* Defensive: Ensure templates is an array before mapping */}
        {Array.isArray(filteredTemplates) && filteredTemplates.map((template) => (
          <div
            key={template.id}
            className={`group relative bg-purple-50 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-700 ease-out overflow-hidden border-2 ${
              appliedTemplate?.id === template.id 
                ? 'border-green-400 ring-4 ring-green-100 shadow-green-200 scale-105' 
                : 'border-purple-200 hover:border-pink-300'
            } animate-fade-in-up`}
          >
            {/* Active Template Indicator */}
            {appliedTemplate?.id === template.id && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-green-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Active
                </div>
              </div>
            )}

            {/* Color Customization Button */}
            <div className="absolute top-4 left-4 z-10">
              <button
                onClick={() => setShowColorPicker(showColorPicker === template.id ? null : template.id)}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-purple-200"
                title="Customize Colors"
              >
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </button>
            </div>

            {/* Color Picker Panel */}
            {showColorPicker === template.id && (
              <div className="absolute top-16 left-4 z-20 bg-white rounded-xl shadow-2xl p-4 border border-purple-200 animate-fade-in">
                <h4 className="text-sm font-semibold text-purple-800 mb-3">Customize Colors</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-purple-600 font-medium block mb-1">Primary Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={advancedConfig.colors.primary}
                        onChange={(e) => setAdvancedConfig(prev => ({
                          ...prev,
                          colors: { ...prev.colors, primary: e.target.value }
                        }))}
                        className="w-8 h-8 rounded cursor-pointer border border-purple-200"
                      />
                      <input
                        type="text"
                        value={advancedConfig.colors.primary}
                        onChange={(e) => setAdvancedConfig(prev => ({
                          ...prev,
                          colors: { ...prev.colors, primary: e.target.value }
                        }))}
                        className="flex-1 px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="#2563eb"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-purple-600 font-medium block mb-1">Secondary Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={advancedConfig.colors.secondary}
                        onChange={(e) => setAdvancedConfig(prev => ({
                          ...prev,
                          colors: { ...prev.colors, secondary: e.target.value }
                        }))}
                        className="w-8 h-8 rounded cursor-pointer border border-purple-200"
                      />
                      <input
                        type="text"
                        value={advancedConfig.colors.secondary}
                        onChange={(e) => setAdvancedConfig(prev => ({
                          ...prev,
                          colors: { ...prev.colors, secondary: e.target.value }
                        }))}
                        className="flex-1 px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="#fef3c7"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-purple-600 font-medium block mb-1">Accent Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={advancedConfig.colors.accent}
                        onChange={(e) => setAdvancedConfig(prev => ({
                          ...prev,
                          colors: { ...prev.colors, accent: e.target.value }
                        }))}
                        className="w-8 h-8 rounded cursor-pointer border border-purple-200"
                      />
                      <input
                        type="text"
                        value={advancedConfig.colors.accent}
                        onChange={(e) => setAdvancedConfig(prev => ({
                          ...prev,
                          colors: { ...prev.colors, accent: e.target.value }
                        }))}
                        className="flex-1 px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="#f59e0b"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-purple-600 font-medium block mb-1">Background Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={advancedConfig.colors.background}
                        onChange={(e) => setAdvancedConfig(prev => ({
                          ...prev,
                          colors: { ...prev.colors, background: e.target.value }
                        }))}
                        className="w-8 h-8 rounded cursor-pointer border border-purple-200"
                      />
                      <input
                        type="text"
                        value={advancedConfig.colors.background}
                        onChange={(e) => setAdvancedConfig(prev => ({
                          ...prev,
                          colors: { ...prev.colors, background: e.target.value }
                        }))}
                        className="flex-1 px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-purple-600 font-medium block mb-1">Text Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={advancedConfig.colors.text}
                        onChange={(e) => setAdvancedConfig(prev => ({
                          ...prev,
                          colors: { ...prev.colors, text: e.target.value }
                        }))}
                        className="w-8 h-8 rounded cursor-pointer border border-purple-200"
                      />
                      <input
                        type="text"
                        value={advancedConfig.colors.text}
                        onChange={(e) => setAdvancedConfig(prev => ({
                          ...prev,
                          colors: { ...prev.colors, text: e.target.value }
                        }))}
                        className="flex-1 px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="#1e293b"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-purple-100">
                    <label className="text-xs text-purple-600 font-medium block mb-1">Typography</label>
                    
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-purple-600 font-medium block mb-1">Font Family</label>
                        <select
                          value={advancedConfig.typography.fontFamily}
                          onChange={(e) => setAdvancedConfig(prev => ({
                            ...prev,
                            typography: { ...prev.typography, fontFamily: e.target.value }
                          }))}
                          className="w-full px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        >
                          <option value="Poppins, sans-serif">Poppins</option>
                          <option value="Inter, sans-serif">Inter</option>
                          <option value="Roboto, sans-serif">Roboto</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-xs text-purple-600 font-medium block mb-1">Base Size</label>
                        <input
                          type="text"
                          value={advancedConfig.typography.baseSize}
                          onChange={(e) => setAdvancedConfig(prev => ({
                            ...prev,
                            typography: { ...prev.typography, baseSize: e.target.value }
                          }))}
                          className="w-full px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                          placeholder="16px"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-purple-600 font-medium block mb-1">Heading Weight</label>
                        <select
                          value={advancedConfig.typography.headingWeight}
                          onChange={(e) => setAdvancedConfig(prev => ({
                            ...prev,
                            typography: { ...prev.typography, headingWeight: e.target.value }
                          }))}
                          className="w-full px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        >
                          <option value="400">400 (Regular)</option>
                          <option value="600">600 (Semi-Bold)</option>
                          <option value="700">700 (Bold)</option>
                          <option value="900">900 (Black)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-purple-100">
                    <label className="text-xs text-purple-600 font-medium block mb-1">Layout</label>
                    
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-purple-600 font-medium block mb-1">Padding Base</label>
                        <input
                          type="text"
                          value={advancedConfig.layout.paddingBase}
                          onChange={(e) => setAdvancedConfig(prev => ({
                            ...prev,
                            layout: { ...prev.layout, paddingBase: e.target.value }
                          }))}
                          className="w-full px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                          placeholder="16px"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-purple-600 font-medium block mb-1">Border Radius</label>
                        <input
                          type="text"
                          value={advancedConfig.layout.borderRadius}
                          onChange={(e) => setAdvancedConfig(prev => ({
                            ...prev,
                            layout: { ...prev.layout, borderRadius: e.target.value }
                          }))}
                          className="w-full px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                          placeholder="8px"
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-purple-600 font-medium block mb-1">Container Width</label>
                        <input
                          type="text"
                          value={advancedConfig.layout.containerWidth}
                          onChange={(e) => setAdvancedConfig(prev => ({
                            ...prev,
                            layout: { ...prev.layout, containerWidth: e.target.value }
                          }))}
                          className="w-full px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                          placeholder="1200px"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-purple-100">
                    <label className="text-xs text-purple-600 font-medium block mb-1">Components</label>
                    
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-purple-600 font-medium block mb-1">Navbar Style</label>
                        <select
                          value={advancedConfig.components.navbarStyle}
                          onChange={(e) => setAdvancedConfig(prev => ({
                            ...prev,
                            components: { ...prev.components, navbarStyle: e.target.value }
                          }))}
                          className="w-full px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        >
                          <option value="solid">Solid</option>
                          <option value="transparent">Transparent</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-xs text-purple-600 font-medium block mb-1">Footer Style</label>
                        <select
                          value={advancedConfig.components.footerStyle}
                          onChange={(e) => setAdvancedConfig(prev => ({
                            ...prev,
                            components: { ...prev.components, footerStyle: e.target.value }
                          }))}
                          className="w-full px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        >
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-xs text-purple-600 font-medium block mb-1">Button Style</label>
                        <select
                          value={advancedConfig.components.buttonStyle}
                          onChange={(e) => setAdvancedConfig(prev => ({
                            ...prev,
                            components: { ...prev.components, buttonStyle: e.target.value }
                          }))}
                          className="w-full px-2 py-1 text-xs border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        >
                          <option value="rounded">Rounded</option>
                          <option value="square">Square</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => {
                        const template = templates.find(t => t.id === template.id);
                        if (template) {
                          updateTemplateConfig(template.apiKey, advancedConfig);
                        }
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Apply Advanced Configuration
                    </button>
                  </div>
                </div>        
                // Send PATCH request to reset configuration
                updateTemplateConfig(template.apiKey, defaultColors);
                addToast('Colors reset to default', 'success');
              }
            })}
            
                    className="text-xs text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            )}

            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-purple-800 group-hover:text-pink-600 transition-all duration-500 ease-out mb-2 group-hover:scale-105 transform">
                    {template.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-purple-600 font-medium transition-colors duration-300">Available</span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-purple-700 mb-8 line-clamp-3 leading-relaxed">
                {template.description}
              </p>

              {/* Preview Stats */}
              <div className="grid grid-cols-3 gap-2 mb-8">
                <div className="text-center p-2 bg-pink-50 rounded-lg border border-pink-100 transition-all duration-300 hover:scale-105 hover:shadow-md">
                  <div className="text-xs text-purple-600">Components</div>
                  <div className="text-sm font-semibold text-purple-800">6+</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-100 transition-all duration-300 hover:scale-105 hover:shadow-md">
                  <div className="text-xs text-purple-600">Responsive</div>
                  <div className="text-sm font-semibold text-green-600">✓</div>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded-lg border border-yellow-100 transition-all duration-300 hover:scale-105 hover:shadow-md">
                  <div className="text-xs text-purple-600">Modern</div>
                  <div className="text-sm font-semibold text-blue-600">✓</div>
                </div>
              </div>

              {/* API Key Display Section */}
              <div className="bg-purple-50 rounded-lg p-3 mb-4 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-purple-700">API Key</span>
                  <button
                    onClick={() => copyToClipboard(template.apiKey, `api-key-${template.id}`)}
                    className="text-purple-600 hover:text-purple-800 transition-colors"
                    title="Copy API Key"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <div className="font-mono text-xs text-purple-800 bg-white rounded px-2 py-1 border border-purple-100">
                  {template.apiKey}
                </div>
                {copiedId === `api-key-${template.id}` && (
                  <span className="text-xs text-green-600 mt-1 block animate-fade-in">Copied!</span>
                )}
              </div>

              {/* Link Tag Display Section */}
              <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-700">Dynamic Link:</span>
                  <button
                    onClick={() => copyApiUsage(template)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Copy Dynamic API Usage"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <div className="font-mono text-xs text-blue-800 bg-white rounded px-2 py-1 border border-blue-100 break-all">
                  &lt;link rel="stylesheet" href="{dynamicApiUrls[template.id] || `http://localhost:5000/api/css/${template.apiKey}`}"&gt;
                </div>
                {copiedId === `api-usage-${template.id}` && (
                  <span className="text-xs text-green-600 mt-1 block animate-fade-in">✓ Dynamic URL copied!</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => togglePreview(template)}
                    className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                      expandedPreviews.has(template.id)
                        ? 'bg-gradient-to-r from-orange-300 to-pink-300 hover:from-orange-400 hover:to-pink-400 text-white'
                        : 'bg-gradient-to-r from-blue-300 to-purple-300 hover:from-blue-400 hover:to-purple-400 text-white'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {previewLoading && activePreviewTemplate?.id === template.id ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 2m15.356 2A8.001 8.001 0 004.582 2m15.356 2A8.001 8.001 0 004.582 2" />
                          </svg>
                          Loading...
                        </>
                      ) : expandedPreviews.has(template.id) ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Hide Preview
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Live Preview
                        </>
                      )}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => openLiveCustomization(template)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-300 to-purple-300 hover:from-indigo-400 hover:to-purple-400 text-white rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      Customize
                    </span>
                  </button>
                </div>
                
                <div className="flex gap-3">
                  {activeApiKey === template.apiKey ? (
                    <span className="active-badge">ACTIVE</span>
                  ) : (
                    <button onClick={() => handleActivate(template.apiKey)}>
                      Activate
                    </button>
                  )}
                </div>
              </div>
              
              {/* Live Preview Section - Only if template has CSS */}
              {expandedPreviews.has(template.id) && (
                <div className="mt-6 animate-fade-in-up">
                  {previewLoading && activePreviewTemplate?.id === template.id ? (
                    <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                      <svg className="w-6 h-6 animate-spin text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 2m15.356 2A8.001 8.001 0 004.582 2m15.356 2A8.001 8.001 0 004.582 2" />
                      </svg>
                      <span className="ml-2 text-gray-600">Loading preview...</span>
                    </div>
                  ) : (
                    <LivePreview cssString={getCustomizedCSS(template)} templateName={template.name} />
                  )}
                </div>
              )}
              
              {/* Preview Status Indicator */}
              {previewActive && activePreviewTemplate?.id === template.id && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.293 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0z" clipRule="evenodd" />
                    </svg>
                    Preview Active
                  </div>
                </div>
              )}
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* API Key Modal */}
      {showApiKeyModal && selectedTemplateForApiKey && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">API Key Generated</h3>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Template: <span className="font-semibold text-purple-600">{selectedTemplateForApiKey.name}</span>
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your API Key:</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={generatedApiKey}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono"
                />
                <button
                  onClick={copyApiKey}
                  className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                  title="Copy API Key"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">How to use:</label>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-2">Add this link tag to your HTML head:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs bg-white px-2 py-1 rounded border border-gray-200 font-mono">
                    &lt;link rel="stylesheet" href="http://localhost:5000/api/css/{generatedApiKey}"&gt;
                  </code>
                  <button
                    onClick={copyLinkTag}
                    className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs transition-colors"
                    title="Copy Link Tag"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-blue-800 mb-1">📋 Quick Instructions:</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Copy the API key above</li>
                <li>• Add the link tag to your HTML &lt;head&gt; section</li>
                <li>• The template will be applied to your website</li>
                <li>• API key includes your custom colors if you've set any</li>
              </ul>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  copyLinkTag();
                  setShowApiKeyModal(false);
                }}
                className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                Copy & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Customization Modal */}
      {showLiveCustomization && selectedTemplateForCustomization && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full mx-4 animate-fade-in-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Live Customization</h3>
              <button
                onClick={closeLiveCustomization}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Customizing: <span className="font-semibold text-purple-600">{selectedTemplateForCustomization.name}</span>
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {/* Primary Color Picker */}
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <label className="block text-sm font-semibold text-purple-700 mb-3">Primary Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={liveColors.primaryColor}
                    onChange={(e) => updateLiveColor('primaryColor', e.target.value)}
                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-purple-300"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={liveColors.primaryColor}
                      onChange={(e) => updateLiveColor('primaryColor', e.target.value)}
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                      placeholder="#2563eb"
                    />
                    <p className="text-xs text-purple-600 mt-1">Main color for buttons, links, and primary elements</p>
                  </div>
                </div>
              </div>

              {/* Secondary Color Picker */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Secondary Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={liveColors.secondaryColor}
                    onChange={(e) => updateLiveColor('secondaryColor', e.target.value)}
                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={liveColors.secondaryColor}
                      onChange={(e) => updateLiveColor('secondaryColor', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 font-mono"
                      placeholder="#64748b"
                    />
                    <p className="text-xs text-gray-600 mt-1">Supporting color for secondary elements and text</p>
                  </div>
                </div>
              </div>

              {/* Accent Color Picker */}
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <label className="block text-sm font-semibold text-yellow-700 mb-3">Accent Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={liveColors.accentColor}
                    onChange={(e) => updateLiveColor('accentColor', e.target.value)}
                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-yellow-300"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={liveColors.accentColor}
                      onChange={(e) => updateLiveColor('accentColor', e.target.value)}
                      className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 font-mono"
                      placeholder="#f59e0b"
                    />
                    <p className="text-xs text-yellow-600 mt-1">Highlight color for important elements and calls-to-action</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Color Preview</h4>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div 
                    className="w-full h-12 rounded-lg mb-2" 
                    style={{ backgroundColor: liveColors.primaryColor }}
                  ></div>
                  <span className="text-xs text-gray-600">Primary</span>
                </div>
                <div className="text-center">
                  <div 
                    className="w-full h-12 rounded-lg mb-2" 
                    style={{ backgroundColor: liveColors.secondaryColor }}
                  ></div>
                  <span className="text-xs text-gray-600">Secondary</span>
                </div>
                <div className="text-center">
                  <div 
                    className="w-full h-12 rounded-lg mb-2" 
                    style={{ backgroundColor: liveColors.accentColor }}
                  ></div>
                  <span className="text-xs text-gray-600">Accent</span>
                </div>
              </div>
            </div>

            {/* Live API URL Preview */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-700 mb-3">Live API URL</h4>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <code className="text-xs bg-white px-3 py-2 rounded border border-blue-200 font-mono break-all block">
                    {generateLiveApiUrl()}
                  </code>
                </div>
                <button
                  onClick={() => copyLiveApiUrl()}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs transition-colors"
                  title="Copy API URL"
                >
                  Copy
                </button>
              </div>
              <p className="text-xs text-blue-600 mt-2">Use this URL to get the customized CSS with your selected colors</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetLiveColors}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                Reset to Default
              </button>
              <button
                onClick={closeLiveCustomization}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={applyLiveCustomization}
                className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                Apply Customization
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Live Preview Component
const LivePreview = ({ cssString, templateName }) => {
  const styleRef = useRef(null);

  useEffect(() => {
    if (styleRef.current) {
      styleRef.current.textContent = cssString;
    }
  }, [cssString]);

  // Generate demo content based on template name
  const getDemoContent = () => {
    if (templateName.toLowerCase().includes('business')) {
      return (
        <div className="container">
          <header className="header">
            <h1>Modern Business</h1>
            <p>Professional corporate website design</p>
            <div className="header-actions">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-outline">Learn More</button>
            </div>
          </header>
          <nav className="nav">
            <div className="nav-container">
              <div className="nav-logo">BusinessCo</div>
              <ul className="nav-menu">
                <li><a href="#" className="nav-link">Home</a></li>
                <li><a href="#" className="nav-link">Services</a></li>
                <li><a href="#" className="nav-link">About</a></li>
                <li><a href="#" className="nav-link">Contact</a></li>
              </ul>
            </div>
          </nav>
          <div style={{padding: '40px 20px'}}>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Our Services</h3>
              </div>
              <div className="card-body">
                <p className="card-text">We provide professional business solutions tailored to your needs.</p>
                <button className="btn btn-primary">View Services</button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (templateName.toLowerCase().includes('minimal') && templateName.toLowerCase().includes('dark')) {
      return (
        <div className="container">
          <header className="header">
            <h1>Minimal Dark</h1>
            <p>Sleek dark theme with minimal design</p>
            <div className="header-actions">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-outline">Learn More</button>
            </div>
          </header>
          <nav className="nav">
            <div className="nav-container">
              <div className="nav-logo">DarkCo</div>
              <ul className="nav-menu">
                <li><a href="#" className="nav-link">Home</a></li>
                <li><a href="#" className="nav-link">Services</a></li>
                <li><a href="#" className="nav-link">About</a></li>
                <li><a href="#" className="nav-link">Contact</a></li>
              </ul>
            </div>
          </nav>
          <div style={{padding: '40px 20px'}}>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Dark Features</h3>
              </div>
              <div className="card-body">
                <p className="card-text">Experience the elegance of minimal dark design with smooth animations and modern aesthetics.</p>
                <button className="btn btn-primary">Explore Features</button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (templateName.toLowerCase().includes('portfolio')) {
      return (
        <div className="container">
          <section className="hero">
            <h1>Creative Portfolio</h1>
            <p>Showcase your creative work with style</p>
            <div style={{marginTop: '30px'}}>
              <button className="btn btn-primary">View Work</button>
              <button className="btn btn-secondary" style={{marginLeft: '15px'}}>Contact Me</button>
            </div>
          </section>
          <nav className="nav">
            <div className="nav-container">
              <div className="nav-logo">Creative Studio</div>
              <ul className="nav-menu">
                <li><a href="#" className="nav-link">Home</a></li>
                <li><a href="#" className="nav-link">Portfolio</a></li>
                <li><a href="#" className="nav-link">About</a></li>
                <li><a href="#" className="nav-link">Blog</a></li>
              </ul>
            </div>
          </nav>
          <div style={{padding: '40px 20px'}}>
            <div className="gallery">
              <div className="gallery-item"></div>
              <div className="gallery-item"></div>
              <div className="gallery-item"></div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Preview Content</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="border border-purple-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 ease-out animate-fade-in">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 border-b border-purple-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-purple-700 transition-colors duration-300">Live Preview</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-300 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="bg-purple-50 min-h-[200px] relative overflow-hidden transition-all duration-300">
        <style ref={styleRef} />
        <div className="preview-container animate-fade-in">
          {getDemoContent()}
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;
