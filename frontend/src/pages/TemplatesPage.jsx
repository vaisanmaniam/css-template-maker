import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TemplateGallery from '../components/TemplateGallery';
import './TemplatesPage.css';

const TemplatesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="templates-page">
      {/* DOT BACKGROUND */}
      <div className="dots-bg">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>
      
      {/* MAIN CONTENT */}
      <div className="relative z-10">
        <div className="templates-content">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="templates-header"
          >
            <h1 className="templates-title">
              Template Gallery
            </h1>
            <p className="templates-desc">
              Craft, customize, and deploy your UI with powerful API-driven design systems.
            </p>
          </motion.div>

          {/* Our Templates Heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl font-bold text-center text-white mb-10">
              Our Templates
            </h2>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-xl mx-auto mb-10"
          >
            <input
              type="text"
              placeholder="🔍 Search templates..."
              className="w-full p-4 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/80 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          {/* Template Gallery Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TemplateGallery searchTerm={searchTerm} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
