import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <Navbar />

      {/* HERO SECTION */}
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
            <Link to="/guide" className="btn-read-me">
              📖 If You Have a Minute, Read Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
