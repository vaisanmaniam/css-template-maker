import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Profile
          </h1>
          <p className="text-xl text-gray-600">
            Manage your account and preferences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
                {user?.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {user?.email}
              </p>
              
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 0v4m0 0h8m0 0v4m0 0h8M8 7v4m0 0h8" />
                  </svg>
                  Member since 2024
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2m0 0l-2-2m6 0l2 2m0 0l-2-2" />
                  </svg>
                  Pro User
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Activity Stats
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">CSS Generated</span>
                <span className="text-2xl font-bold text-blue-600">127</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Templates Created</span>
                <span className="text-2xl font-bold text-green-600">23</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">API Calls</span>
                <span className="text-2xl font-bold text-purple-600">1,847</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Storage Used</span>
                <span className="text-2xl font-bold text-orange-600">2.3GB</span>
              </div>
            </div>
          </motion.div>

          {/* Settings Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Quick Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Email Notifications</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none">
                    <span className="sr-only">Enable email notifications</span>
                    <span className="translate-x-6 inline-block h-4 w-4 rounded-full bg-purple-600 transition-transform"></span>
                  </button>
                </label>
              </div>
              
              <div>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Dark Mode</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none">
                    <span className="sr-only">Enable dark mode</span>
                    <span className="translate-x-6 inline-block h-4 w-4 rounded-full bg-gray-400 transition-transform"></span>
                  </button>
                </label>
              </div>
              
              <div>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Auto-save</span>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none">
                    <span className="sr-only">Enable auto-save</span>
                    <span className="translate-x-6 inline-block h-4 w-4 rounded-full bg-green-600 transition-transform"></span>
                  </button>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Actions Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
              Account Actions
            </h3>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Export My Data
              </button>
              
              <button className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                Download API Key
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
