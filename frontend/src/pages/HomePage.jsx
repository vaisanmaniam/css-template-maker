import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="wave-overlay"></div>

        <div className="hero-content">
          <h1 className="roll-text">
            <span>NextGen API Template Forge</span>
            <span>API-Powered Design System</span>
            <span>Change Once, Update Everywhere</span>
          </h1>

          <p className="hero-sub">
            <strong>Professional</strong> CSS Engine for 
            <strong> Modern</strong> Web Projects
          </p>

          <div className="hero-buttons">
            <a href="/about" className="btn btn-outline">About</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
