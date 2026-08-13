import React, { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import "./AboutPage.css";

export default function AboutPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Feedback sent successfully");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send feedback");
      }
    } catch (err) {
      console.error("Contact Form Error:", err);
      toast.error("Failed to send feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="about-page-wrapper">
        {/* ANIMATED SVG TRIANGLE FUSION BACKGROUND */}
        <div className="triangle-fusion-bg">
          {/* LAYER 1: ROTATING TRIANGLE MESH */}
          <svg className="svg-layer svg-layer-1" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="triGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#312e81" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <polygon points="500,100 850,750 150,750" fill="url(#triGrad1)" />
            <polygon points="500,250 750,700 250,700" fill="none" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="2" />
          </svg>

          {/* LAYER 2: OPPOSITE ROTATING GEOMETRY */}
          <svg className="svg-layer svg-layer-2" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="triGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <polygon points="500,900 150,250 850,250" fill="url(#triGrad2)" />
            <polygon points="500,750 250,300 750,300" fill="none" stroke="rgba(124, 58, 237, 0.35)" strokeWidth="2" />
          </svg>

          {/* LAYER 3: OUTER CONCENTRIC TRIANGLES */}
          <svg className="svg-layer svg-layer-3" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <polygon points="500,50 950,850 50,850" fill="none" stroke="rgba(244, 114, 182, 0.15)" strokeWidth="3" />
            <polygon points="500,950 50,150 950,150" fill="none" stroke="rgba(129, 140, 248, 0.15)" strokeWidth="3" />
          </svg>

          {/* FLOATING TRIANGLE PARTICLES */}
          <div className="floating-triangles">
            <div className="particle-triangle particle-1"></div>
            <div className="particle-triangle particle-2"></div>
            <div className="particle-triangle particle-3"></div>
            <div className="particle-triangle particle-4"></div>
          </div>
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <div className="about-main-container">
          
          {/* 1️⃣ HERO SECTION */}
          <div className="about-hero">
            <div className="about-badge">
              <span>✨ Active Development Project</span>
            </div>
            <h1 className="about-title">About NextGen API Template Forge</h1>
            <p className="about-subtitle">
              A modern API-driven CSS customization platform built for developers, designers, and rapid web prototyping.
            </p>
          </div>

          {/* 2️⃣ WHAT IS THIS PROJECT? */}
          <div className="about-card">
            <h3>What is This Project?</h3>
            <p>
              NextGen API Template Forge allows users to browse professionally designed CSS templates, customize colors, typography, spacing, and layout in real time, and integrate the generated styles into their own HTML projects through a simple API-based stylesheet link.
            </p>
          </div>

          {/* 3️⃣ CORE FEATURES */}
          <div className="about-card">
            <h3>Core Features</h3>
            <div className="features-grid">
              <div className="feature-card-item">
                <div className="feature-icon-wrapper">🎨</div>
                <h4>Live Template Preview</h4>
                <p>Real-time visual feedback inside the interactive workspace modal.</p>
              </div>

              <div className="feature-card-item">
                <div className="feature-icon-wrapper">⚡</div>
                <h4>Real-Time Customization</h4>
                <p>Instant color palette, typography, border radius, and spacing updates.</p>
              </div>

              <div className="feature-card-item">
                <div className="feature-icon-wrapper">🔑</div>
                <h4>API Key Based CSS Delivery</h4>
                <p>Dynamic endpoint delivery connecting your design directly to any HTML app.</p>
              </div>

              <div className="feature-card-item">
                <div className="feature-icon-wrapper">📱</div>
                <h4>Responsive Design Support</h4>
                <p>Flawless layout adaptivity across mobile, tablet, and desktop screens.</p>
              </div>

              <div className="feature-card-item">
                <div className="feature-icon-wrapper">📋</div>
                <h4>One-Click Snippet Copying</h4>
                <p>Instant HTML <code>&lt;link&gt;</code> code generation for effortless embedding.</p>
              </div>

              <div className="feature-card-item">
                <div className="feature-icon-wrapper">🌈</div>
                <h4>Multiple Modern Themes</h4>
                <p>Growing library of SaaS, Dark, Creative, and Business UI templates.</p>
              </div>
            </div>
          </div>

          {/* 4️⃣ TECHNOLOGY STACK */}
          <div className="about-card text-center">
            <h3 className="text-center">Technology Stack</h3>
            <p className="text-sm text-gray-300 mb-4">Built with modern web technologies for performance and flexibility:</p>
            <div className="tech-badges-grid">
              <span className="tech-badge-glowing">⚡ React.js</span>
              <span className="tech-badge-glowing">🔥 Vite</span>
              <span className="tech-badge-glowing">🟢 Node.js</span>
              <span className="tech-badge-glowing">🚂 Express.js</span>
              <span className="tech-badge-glowing">🌐 REST APIs</span>
              <span className="tech-badge-glowing">🎨 CSS3 & Glassmorphism</span>
              <span className="tech-badge-glowing">💾 localStorage Persistence</span>
              <span className="tech-badge-glowing">💉 Dynamic CSS Injection</span>
            </div>
          </div>

          {/* 📨 FEEDBACK / CONTACT SECTION */}
          <div className="about-card">
            <h3>Send Feedback or Suggestions</h3>
            <p className="mb-4 text-slate-300">
              Have an idea to improve this project? Found a bug? Want to suggest a new template or feature? Send your feedback directly to the project maintainer.
            </p>

            <form onSubmit={handleSubmit} className="about-contact-form">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-field-group">
                  <label htmlFor="contact-name">Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-email">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="e.g. Feature Suggestion / Bug Report"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  rows="4"
                  placeholder="Share your thoughts, suggestions, or ideas..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-fusion-submit"
              >
                {loading ? "Sending Feedback..." : "Send Feedback 🚀"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
