// Template Service - Abstracted template data access
// This service can easily be switched to use API calls in the future

// Static templates (current implementation)
import { staticTemplates } from '../data/templates.js';

class TemplateService {
  constructor() {
    this.templates = staticTemplates;
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get all templates
   * @returns {Promise<Array>} Array of template objects
   */
  async getTemplates() {
    const cacheKey = 'all_templates';
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    // Current: Return static templates
    // Future: Replace with API call
    // const response = await fetch('/api/templates');
    // const data = await response.json();
    // return data;

    const templates = this.templates;
    this.setCachedData(cacheKey, templates);
    return templates;
  }

  /**
   * Get template by ID
   * @param {string} id - Template ID
   * @returns {Promise<Object|null>} Template object or null if not found
   */
  async getTemplateById(id) {
    const cacheKey = `template_${id}`;
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    // Current: Find in static templates
    // Future: Replace with API call
    // const response = await fetch(`/api/templates/${id}`);
    // if (response.ok) {
    //   const data = await response.json();
    //   this.setCachedData(cacheKey, data);
    //   return data;
    // }
    // return null;

    const template = this.templates.find(t => t.id === id) || null;
    if (template) {
      this.setCachedData(cacheKey, template);
    }
    return template;
  }

  /**
   * Search templates by query
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching templates
   */
  async searchTemplates(query) {
    const cacheKey = `search_${query}`;
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    // Current: Filter static templates
    // Future: Replace with API call
    // const response = await fetch(`/api/templates/search?q=${encodeURIComponent(query)}`);
    // const data = await response.json();
    // this.setCachedData(cacheKey, data);
    // return data;

    const allTemplates = await this.getTemplates();
    const filtered = allTemplates.filter(template => 
      template.name.toLowerCase().includes(query.toLowerCase()) ||
      template.description.toLowerCase().includes(query.toLowerCase())
    );
    
    this.setCachedData(cacheKey, filtered);
    return filtered;
  }

  /**
   * Get templates by category
   * @param {string} category - Category filter
   * @returns {Promise<Array>} Array of templates in category
   */
  async getTemplatesByCategory(category) {
    const cacheKey = `category_${category}`;
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    // Current: Filter static templates
    // Future: Replace with API call
    // const response = await fetch(`/api/templates/category/${encodeURIComponent(category)}`);
    // const data = await response.json();
    // this.setCachedData(cacheKey, data);
    // return data;

    const allTemplates = await this.getTemplates();
    const filtered = category === 'all' 
      ? allTemplates 
      : allTemplates.filter(template => template.category === category);
    
    this.setCachedData(cacheKey, filtered);
    return filtered;
  }

  /**
   * Get template categories
   * @returns {Promise<Array>} Array of unique categories
   */
  async getCategories() {
    const cacheKey = 'categories';
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    // Current: Extract from static templates
    // Future: Replace with API call
    // const response = await fetch('/api/templates/categories');
    // const data = await response.json();
    // this.setCachedData(cacheKey, data);
    // return data;

    const allTemplates = await this.getTemplates();
    const categories = ['all', ...new Set(allTemplates.map(t => t.category).filter(Boolean))];
    
    this.setCachedData(cacheKey, categories);
    return categories;
  }

  /**
   * Cache management helpers
   */
  getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Update templates (useful for dynamic updates)
   * @param {Array} newTemplates - New templates array
   */
  updateTemplates(newTemplates) {
    this.templates = newTemplates;
    this.clearCache();
  }

  /**
   * Add a new template
   * @param {Object} template - Template object to add
   */
  addTemplate(template) {
    this.templates.push(template);
    this.clearCache();
  }

  /**
   * Update an existing template
   * @param {string} id - Template ID
   * @param {Object} updates - Template updates
   */
  updateTemplate(id, updates) {
    const index = this.templates.findIndex(t => t.id === id);
    if (index !== -1) {
      this.templates[index] = { ...this.templates[index], ...updates };
      this.clearCache();
    }
  }

  /**
   * Remove a template
   * @param {string} id - Template ID
   */
  removeTemplate(id) {
    this.templates = this.templates.filter(t => t.id !== id);
    this.clearCache();
  }
}

// Create singleton instance
const templateService = new TemplateService();

export default templateService;

// Export class for testing or multiple instances
export { TemplateService };
