import React, { useEffect } from "react";
import "./AboutPage.css";

export default function AboutPage() {

  useEffect(() => {
    const handleMouseMove = (e) => {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = e.clientX + "px";
      sparkle.style.top = e.clientY + "px";
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="about-page">

      <div className="galaxy"></div>
      <div className="planet planet1"></div>
      <div className="planet planet2"></div>
      <div className="planet planet3"></div>

      <div className="about-content p-10 max-w-4xl mx-auto space-y-10">
        <h1 className="about-title">
          <span>About NextGen Forge</span>
        </h1>

        <p className="about-sub">
          A <strong>Professional AI-Powered</strong> CSS Engine
          for <strong>Modern Web Experiences</strong>
        </p>

        <div className="hologram-panel">
          <h2>🤖 AI Hologram Engine</h2>
          <p>
            Customize once. Deploy everywhere.
            Real-time API-powered design system.
          </p>
        </div>

        <div className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">🚀 Our Vision</h2>
            <p className="text-lg leading-relaxed text-white">
              NextGen API Template Forge was built to eliminate repetitive styling work.
              We believe design systems should be dynamic, reusable, and API-driven.
              Change once — update everywhere.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold">⚡ What Makes Us Different</h2>
            <p className="text-lg leading-relaxed text-white">
              Unlike traditional CSS templates, our engine delivers live theme updates
              through secure API endpoints. Whether it's colors, typography, layout,
              or component styling — everything updates instantly across connected projects.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold">🧠 Powered by Intelligent Design</h2>
            <p className="text-lg leading-relaxed text-white">
              Our platform combines structured theme architecture with AI-assisted
              customization to generate scalable, professional-grade design systems
              suitable for startups, enterprises, and creative developers.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold">🌍 Built for the Future</h2>
            <p className="text-lg leading-relaxed text-white">
              We are continuously evolving into a full AI-powered UI generation engine —
              including prompt-based theme creation, user personalization,
              and enterprise-level authentication systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
