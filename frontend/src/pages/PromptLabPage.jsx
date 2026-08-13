import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getCurrentUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import './PromptPage.css';

const PromptLabPage = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCSS, setGeneratedCSS] = useState('');
  const [history, setHistory] = useState([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation (in real app, this would call your AI backend)
    setTimeout(() => {
      const mockCSS = `/* Generated CSS for: ${prompt} */
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  --background: #ffffff;
  --text: #1f2937;
  --font-family: 'Inter', sans-serif;
  --base-size: 16px;
  --border-radius: 8px;
  --padding-base: 16px;
}

body {
  font-family: var(--font-family);
  font-size: var(--base-size);
  background: var(--background);
  color: var(--text);
  margin: 0;
  padding: var(--padding-base);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--padding-base);
}

.btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background: var(--accent-color);
  transform: translateY(-2px);
}

.card {
  background: var(--secondary-color);
  border-radius: var(--border-radius);
  padding: var(--padding-base);
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`;
      
      setGeneratedCSS(mockCSS);
      setHistory(prev => [prompt, ...prev.slice(0, 4)]);
      setIsGenerating(false);
    }, 2000);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('promptHistory');
  };

  return (
    <section className="ai-page">
      <div className="color-drops">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <div className="ai-content">
        <div className="ai-box">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-4">AI Prompt Generator</h1>
            <p className="mb-6">Create your own CSS using AI prompts 🚀</p>
          </motion.div>

          <div className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your design prompt..."
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 resize-none h-32"
              disabled={isGenerating}
            />

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="glass-btn"
            >
              {isGenerating ? 'Generating...' : 'Generate Design'}
            </button>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-white/80">Recent Prompts</h3>
                <button
                  onClick={clearHistory}
                  className="text-sm text-white/60 hover:text-white/80 transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2">
                {history.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(item)}
                    className="w-full text-left px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/80"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Generated Output */}
          {generatedCSS && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-white/80 mb-3">Generated CSS</h3>
              <div className="bg-black/30 rounded-lg p-4 max-h-40 overflow-y-auto">
                <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
                  {generatedCSS}
                </pre>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(generatedCSS)}
                className="glass-btn mt-3"
              >
                Copy CSS
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromptLabPage;
