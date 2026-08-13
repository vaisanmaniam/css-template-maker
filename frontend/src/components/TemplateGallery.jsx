import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { getTemplatePreviewHTML } from "../utils/templatePreview";
import Toast from "./Toast.jsx";
import { NoTemplatesFound, LoadingState } from "./EmptyState.jsx";
import { fetchAvailableTemplates } from "../api/templates.js";
import TemplateWorkspaceModal from "./TemplateWorkspaceModal.jsx";
import { getFavoriteTemplateIds, toggleFavoriteTemplate } from "../utils/activity";

const TemplateGallery = ({ searchTerm }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeApiKey, setActiveApiKey] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState(getFavoriteTemplateIds());
  const [localState, setLocalState] = useState({
    fontFamily: "Poppins, sans-serif",
    background: "#f9fafb",
    primary: "#2563eb",
    accent: "#f59e0b",
    secondary: "#64748b",
    radius: "10px"
  });

  const generatePreviewHTML = (template, styles) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              font-family: ${styles.fontFamily || "Poppins, sans-serif"};
              background: ${styles.background || "#f9fafb"};
              color: #333;
            }

            .nav {
              background: ${styles.primary || "#2563eb"};
              color: white;
              padding: 16px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .nav h2 {
              margin: 0;
              font-size: 1.5rem;
            }

            .nav button {
              background: rgba(255,255,255,0.2);
              border: 1px solid rgba(255,255,255,0.3);
              color: white;
              padding: 8px 16px;
              border-radius: 6px;
              cursor: pointer;
            }

            .hero {
              padding: 60px 20px;
              text-align: center;
              background: linear-gradient(135deg, ${styles.primary || "#2563eb"}, ${styles.accent || "#f59e0b"});
              color: white;
            }

            .hero h1 {
              font-size: 2.5rem;
              margin: 0 0 16px 0;
              color: white;
            }

            .hero p {
              font-size: 1.2rem;
              margin: 0 0 24px 0;
              opacity: 0.9;
            }

            .hero button {
              background: ${styles.accent || "#f59e0b"};
              color: white;
              padding: 12px 24px;
              border-radius: 6px;
              border: none;
              font-size: 1rem;
              cursor: pointer;
              transition: transform 0.2s;
            }

            .hero button:hover {
              transform: scale(1.05);
            }

            .card {
              margin: 20px;
              padding: 20px;
              border-radius: ${styles.radius || "10px"};
              background: white;
              box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            }

            .card h3 {
              color: ${styles.primary || "#2563eb"};
              margin: 0 0 12px 0;
            }

            .features {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 20px;
              padding: 40px 20px;
              max-width: 1200px;
              margin: 0 auto;
            }

            footer {
              background: ${styles.secondary || "#64748b"};
              color: white;
              padding: 20px;
              text-align: center;
            }

            ${template.css || ""}
          </style>
        </head>
        <body>
          <div class="nav">
            <h2>${template.name}</h2>
            <button>Login</button>
          </div>

          <div class="hero">
            <h1>Live Preview</h1>
            <p>This is a real working template preview</p>
            <button>Get Started</button>
          </div>

          <div class="features">
            <div class="card">
              <h3>Feature Section</h3>
              <p>This reflects your template styling with real content</p>
            </div>
            <div class="card">
              <h3>Another Section</h3>
              <p>See how your CSS affects different elements</p>
            </div>
            <div class="card">
              <h3>Dynamic Content</h3>
              <p>Everything updates in real-time</p>
            </div>
          </div>

          <footer>
            Template Preview Engine - Real Working Preview
          </footer>
        </body>
      </html>
    `;
  };

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        const fetchedTemplates = await fetchAvailableTemplates();
        
        // Load user templates from localStorage
        const userTemplates = JSON.parse(localStorage.getItem("userTemplates") || "[]");
        
        // Combine both template types
        setTemplates([...fetchedTemplates, ...userTemplates]);
      } catch (error) {
        console.error("Error loading templates:", error);
        addToast("Failed to load templates", "error");
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const updateConfig = (section, key, value) => {
    setLocalConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleActivate = (apiKey) => {
    setActiveApiKey(apiKey);
    addToast("Template activated successfully!", "success");
  };

  const filteredTemplates = useMemo(() => {
    if (!searchTerm) return templates;
    return templates.filter(template =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [templates, searchTerm]);

  if (loading) {
    return <LoadingState />;
  }

  if (filteredTemplates.length === 0) {
    return <NoTemplatesFound searchTerm={searchTerm} />;
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Main template grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <div
              key={`${template.id || template.apiKey}-${index}`}
              className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl shadow-xl hover:scale-[1.04] transition-all duration-500 border border-white/30 cursor-pointer relative group"
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="h-28 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-xl font-bold shadow-lg relative">
                {template.name.split(" ")[0]}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const tId = template.id || template.templateId || template.apiKey;
                    const isFav = toggleFavoriteTemplate(tId, template.name);
                    setFavoriteIds(getFavoriteTemplateIds());
                    if (isFav) {
                      toast.success(`Saved "${template.name}" to Favorites!`);
                    } else {
                      toast.success(`Removed "${template.name}" from Favorites`);
                    }
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-amber-400 border border-white/20 flex items-center justify-center text-sm shadow-md transition-transform hover:scale-110 cursor-pointer"
                  title={favoriteIds.includes(template.id || template.templateId || template.apiKey) ? "Remove from Favorites" : "Save to Favorites"}
                >
                  {favoriteIds.includes(template.id || template.templateId || template.apiKey) ? "⭐" : "☆"}
                </button>
              </div>
              <div className="p-2">
                <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{template.description}</p>
                {template.author && (
                  <p className="text-xs text-purple-600 font-medium">by {template.author}</p>
                )}
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTemplate(template);
                }}
                className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Open Workspace
              </button>
              
              {/* User Template Features */}
              {template.type === "user" && (
                <div className="mt-4 bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                  <pre className="whitespace-pre-wrap">{template.css}</pre>
                  
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(template.css);
                        addToast("CSS Copied!", "success");
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                      Copy CSS
                    </button>

                    <button
                      onClick={() => {
                        const existing = JSON.parse(localStorage.getItem("userTemplates") || "[]");
                        const updated = existing.filter(t => t.id !== template.id);
                        localStorage.setItem("userTemplates", JSON.stringify(updated));
                        
                        // Update state to refresh UI
                        setTemplates(prev => prev.filter(t => t.id !== template.id));
                        addToast("Template deleted!", "success");
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete Template
                    </button>
                  </div>

                  {template.github && (
                    <a
                      href={template.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-blue-600 underline hover:text-blue-800"
                    >
                      View GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Workspace Modal */}
      {selectedTemplate && (
        <TemplateWorkspaceModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  );
};

export default TemplateGallery;
