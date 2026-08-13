// API utility for template operations

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch available templates from the backend API
 * @returns {Promise<Array>} Template list array
 */
export async function fetchAvailableTemplates() {
  try {
    const response = await fetch(`${API_BASE_URL}/templates`);
    
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      // Return fallback templates with image paths
      return getFallbackTemplates();
    }
    
    const data = await response.json();
    
    // Treat response as root-level array
    if (Array.isArray(data)) {
      return data.map(template => ({
        ...template,
        image: template.image || getDefaultImage(template.name)
      }));
    } else {
      console.warn('Response is not an array:', data);
      return getFallbackTemplates();
    }
  } catch (error) {
    console.error('Error fetching available templates:', error);
    return getFallbackTemplates();
  }
}

function getFallbackTemplates() {
  return [
    {
      id: 1,
      name: "Minimal Luxury Brand",
      image: "/templates/modern.png",
      apiKey: "tpl_demo_123",
      description: "Elegant luxury brand template with serif fonts",
      css: `
        body { 
          background: #f8f5f0;
          font-family: 'Playfair Display', Georgia, serif;
        }
        .nav { 
          background: #1e293b;
          color: #facc15;
        }
        .hero { 
          background: #f1f5f9;
          color: #1e293b;
        }
        .btn { 
          background: #facc15;
          color: black;
        }
        .card { 
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }
      `
    },
    {
      id: 2,
      name: "Glassmorphism SaaS Dashboard",
      image: "/templates/dark.png",
      apiKey: "tpl_demo_456",
      description: "Modern glass morphism dashboard design",
      css: `
        body { 
          background: linear-gradient(135deg, #6366f1, #ec4899);
          font-family: 'Inter', sans-serif;
        }
        .nav { 
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .hero { 
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
        }
        .btn { 
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
        }
        .card { 
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.2);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.2);
        }
      `
    },
    {
      id: 3,
      name: "Cyberpunk Neon Theme",
      image: "/templates/gradient.png",
      apiKey: "tpl_demo_789",
      description: "Futuristic cyberpunk design with neon effects",
      css: `
        body { 
          background: #020617;
          color: #22c55e;
          font-family: 'Orbitron', 'Courier New', monospace;
        }
        .nav { 
          background: #020617;
          border-bottom: 2px solid #22c55e;
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
        .hero { 
          background: linear-gradient(180deg, #020617 0%, #0f172a 100%);
          color: #22c55e;
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.8);
        }
        .btn { 
          background: #22c55e;
          color: black;
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
        }
        .card { 
          background: #0f172a;
          border: 2px solid #22c55e;
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
        }
      `
    },
    {
      id: 4,
      name: "Vibrant Gradient Theme",
      image: "/templates/glass.png",
      apiKey: "tpl_demo_101",
      description: "Colorful gradient theme for creative projects",
      css: `
        body { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'SF Pro Display', -apple-system, sans-serif;
        }
        .nav { 
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .hero { 
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
        }
        .card { 
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 16px;
        }
      `
    },
    {
      id: 5,
      name: "Cyberpunk Neon Theme",
      image: "/templates/cyberpunk.png",
      apiKey: "tpl_demo_202",
      description: "Futuristic cyberpunk design with neon effects",
      css: `
        body { 
          background: #0a0a0a;
          color: #00ff00;
          font-family: 'Courier New', monospace;
        }
        .nav { 
          background: linear-gradient(90deg, #ff00ff, #00ff00);
          box-shadow: 0 0 20px rgba(255,0,255,0.5);
          animation: neonGlow 2s ease-in-out infinite alternate;
        }
        .hero { 
          background: radial-gradient(circle, #ff00ff, #0a0a0a);
          color: #00ffff;
          text-shadow: 0 0 10px rgba(0,255,255,0.8);
        }
        .card { 
          background: #1a1a1a;
          border: 2px solid #ff00ff;
          border-radius: 4px;
          box-shadow: 0 0 15px rgba(255,0,255,0.3);
        }
        @keyframes neonGlow {
          from { box-shadow: 0 0 20px rgba(255,0,255,0.5); }
          to { box-shadow: 0 0 30px rgba(0,255,255,0.8); }
        }
      `
    },
    {
      id: 6,
      name: "Minimal Luxury Brand",
      image: "/templates/luxury.png",
      apiKey: "tpl_demo_303",
      description: "Elegant luxury brand template",
      css: `
        body { 
          background: #fafafa;
          color: #1a1a1a;
          font-family: 'Playfair Display', Georgia, serif;
        }
        .nav { 
          background: #ffffff;
          border-bottom: 1px solid #e5e5e5;
          color: #1a1a1a;
        }
        .hero { 
          background: linear-gradient(135deg, #f8f8f8, #ffffff);
          color: #1a1a1a;
          text-align: center;
        }
        .card { 
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 2px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .hero h1 {
          font-weight: 300;
          letter-spacing: 2px;
        }
      `
    }
  ];
}

function getDefaultImage(templateName) {
  const nameMap = {
    "modern": "/templates/modern.png",
    "dark": "/templates/dark.png",
    "gradient": "/templates/gradient.png",
    "glass": "/templates/glass.png",
    "cyberpunk": "/templates/cyberpunk.png",
    "luxury": "/templates/luxury.png"
  };
  
  const lowerName = templateName.toLowerCase();
  for (const [key, path] of Object.entries(nameMap)) {
    if (lowerName.includes(key)) {
      return path;
    }
  }
  
  return "/templates/modern.png"; // fallback
}

/**
 * Fetch CSS template by API key
 * @param {string} apiKey - The API key for the template
 * @param {string} [version] - Optional version parameter
 * @returns {Promise<string>} CSS content
 */
export async function fetchTemplateCss(apiKey, version = 'v1.0') {
  try {
    const url = version 
      ? `${API_BASE_URL}/css/${apiKey}?version=${version}`
      : `${API_BASE_URL}/css/${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const cssContent = await response.text();
    return cssContent;
  } catch (error) {
    console.error('Error fetching template CSS:', error);
    throw error;
  }
}
