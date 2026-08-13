import React, { useState } from 'react';

const TemplateCard = ({ template }) => {
  const [showCode, setShowCode] = useState(true);
  const [localConfig, setLocalConfig] = useState({
    colors: {
      primary: "#2563eb",
      secondary: "#64748b",
      accent: "#f59e0b",
      background: "#ffffff",
      text: "#111111"
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
      baseSize: "16px"
    },
    layout: {
      paddingBase: "20px",
      borderRadius: "10px"
    }
  });

  function getTemplatePreviewHTML(template, config) {
    const c = config.colors || {};
    const t = config.typography || {};
    const l = config.layout || {};

    const primary = c.primary || "#2563eb";
    const secondary = c.secondary || "#64748b";
    const accent = c.accent || "#f59e0b";
    const bg = c.background || "#ffffff";
    const text = c.text || "#111";

    const font = t.fontFamily || "Poppins, sans-serif";
    const size = t.baseSize || "16px";

    const padding = l.paddingBase || "20px";
    const radius = l.borderRadius || "10px";

    return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        margin:0;
        font-family:${font};
        background:${bg};
        color:${text};
        font-size:${size};
      }

      .nav {
        background:${primary};
        color:white;
        padding:${padding};
        display:flex;
        justify-content:space-between;
      }

      .hero {
        padding:80px;
        text-align:center;
      }

      .btn {
        background:${accent};
        color:white;
        padding:12px 24px;
        border:none;
        border-radius:${radius};
        cursor:pointer;
      }

      .card {
        margin:40px;
        padding:${padding};
        border-radius:${radius};
        background:${secondary};
      }
    </style>
  </head>

  <body>
    <div class="nav">
      <h2>${template.name}</h2>
      <button class="btn">Login</button>
    </div>

    <div class="hero">
      <h1>Live Preview Working 🚀</h1>
      <button class="btn">Start</button>
    </div>

    <div class="card">
      Customization is now LIVE
    </div>
  </body>
  </html>
  `;
  }

  function updateConfig(section, key, value) {
    setLocalConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{template.name}</h3>
            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mt-2">
              {template.category}
            </span>
          </div>
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">{template.description}</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Section */}
          <div className={`${showCode ? 'block' : 'hidden'} lg:block`}>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">CSS Code</h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                <code>{template.css}</code>
              </pre>
            </div>
          </div>
          
          {/* Customization Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Customize</h4>
            <div className="space-y-4">
              {/* Colors */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Primary Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={localConfig.colors.primary}
                    onChange={(e) => updateConfig("colors", "primary", e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={localConfig.colors.primary}
                    onChange={(e) => updateConfig("colors", "primary", e.target.value)}
                    className="flex-1 text-xs border rounded px-2 py-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Font Family</label>
                <select
                  value={localConfig.typography.fontFamily}
                  onChange={(e) => updateConfig("typography", "fontFamily", e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg text-sm"
                >
                  <option value="Poppins, sans-serif">Poppins</option>
                  <option value="Inter, sans-serif">Inter</option>
                  <option value="Roboto, sans-serif">Roboto</option>
                  <option value="Montserrat, sans-serif">Montserrat</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Border Radius</label>
                <input
                  type="text"
                  value={localConfig.layout.borderRadius}
                  onChange={(e) => updateConfig("layout", "borderRadius", e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
          
          {/* Live Preview Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Live Preview</h4>
            <iframe
              key={JSON.stringify(localConfig)}
              title="preview"
              style={{
                width: "100%",
                height: "400px",
                border: "none",
                borderRadius: "12px"
              }}
              srcDoc={getTemplatePreviewHTML(template, localConfig)}
            />
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium">
            Use Template
          </button>
          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
            Copy CSS
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
