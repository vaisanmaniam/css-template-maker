import React, { useEffect, useRef } from 'react';

const LivePreview = ({ cssString, children }) => {
  const styleRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    if (styleRef.current) {
      styleRef.current.textContent = cssString;
    }
  }, [cssString]);

  return (
    <div className="w-full h-full">
      <style ref={styleRef} />
      <div 
        ref={previewRef}
        className="preview-container p-8 bg-gray-100 min-h-[400px] rounded-lg border border-gray-300"
      >
        {children || (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="glass-card max-w-md">
              <h3 className="text-xl font-bold mb-2">Glassmorphism Card</h3>
              <p>This is a preview of the glassmorphism effect.</p>
            </div>
            <button className="neu-button">
              Neumorphism Button
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;
