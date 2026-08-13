import React, { useState } from 'react';

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCSS, setGeneratedCSS] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateCSS = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedCSS('');

    try {
      // Simulate API call to generate CSS
      // In a real app, this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock generated CSS based on prompt
      const mockCSS = generateMockCSS(prompt);
      setGeneratedCSS(mockCSS);
    } catch (error) {
      console.error('Error generating CSS:', error);
      setGeneratedCSS('/* Error generating CSS. Please try again. */');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockCSS = (userPrompt) => {
    const lowerPrompt = userPrompt.toLowerCase();
    
    if (lowerPrompt.includes('button')) {
      if (lowerPrompt.includes('glowing') || lowerPrompt.includes('glow')) {
        return `.glowing-button {
  background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(131, 56, 236, 0.5);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.glowing-button:hover {
  box-shadow: 0 0 30px rgba(131, 56, 236, 0.8);
  transform: translateY(-2px);
}

.glowing-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.glowing-button:hover::before {
  left: 100%;
}`;
      } else if (lowerPrompt.includes('modern')) {
        return `.modern-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.modern-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.modern-button:active {
  transform: translateY(0);
}`;
      }
    } else if (lowerPrompt.includes('card')) {
      if (lowerPrompt.includes('glass') || lowerPrompt.includes('glassmorphism')) {
        return `.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 24px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  color: white;
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(31, 38, 135, 0.45);
}`;
      }
    }

    // Default fallback
    return `.generated-element {
  /* Generated for: "${userPrompt}" */
  background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
  padding: 16px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
}

.generated-element:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(79, 172, 254, 0.4);
}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCSS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  const downloadCSS = () => {
    const blob = new Blob([generatedCSS], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated-style.css';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-2">AI CSS Generator</h2>
          <p className="text-blue-100">Describe the CSS you want to generate</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Input Section */}
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Describe your CSS style
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'modern glowing button with hover effect', 'glassmorphic card with blur', 'neumorphic input field'..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none h-32"
              disabled={isGenerating}
            />
            <div className="mt-2 text-sm text-gray-500">
              Be specific about colors, effects, animations, and use cases for better results.
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={generateCSS}
              disabled={!prompt.trim() || isGenerating}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating CSS...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate CSS
                </>
              )}
            </button>
          </div>

          {/* Generated CSS Output */}
          {generatedCSS && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Generated CSS</h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={downloadCSS}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  <code>{generatedCSS}</code>
                </pre>
              </div>

              {/* Preview Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-600">Live Preview</span>
                </div>
                <div className="bg-white p-8 min-h-[120px]">
                  <style>{generatedCSS}</style>
                  <div className="flex items-center justify-center">
                    {prompt.toLowerCase().includes('button') ? (
                      <button className="glowing-button">Generated Button</button>
                    ) : prompt.toLowerCase().includes('card') ? (
                      <div className="glass-card max-w-sm">
                        <h4 className="text-lg font-bold mb-2">Generated Card</h4>
                        <p className="text-sm">This is a preview of your generated CSS.</p>
                      </div>
                    ) : (
                      <div className="generated-element">
                        Generated Element
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;
