import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GuidePage from './pages/GuidePage';
import TemplatesPage from './pages/TemplatesPage';
import AboutPage from './pages/AboutPage';
import PromptLabPage from './pages/PromptLabPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { getCurrentUser } from './utils/auth';
import Navbar from './components/Navbar';
import './components/Navbar.css';

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route 
          path="/prompt" 
          element={
            <ProtectedRoute>
              <PromptLabPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;