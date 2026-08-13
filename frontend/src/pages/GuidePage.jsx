import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./GuidePage.css";

const sections = [
  { id: "welcome", title: "Welcome" },
  { id: "how-it-works", title: "How Templates Work" },
  { id: "customization", title: "Live Customization" },
  { id: "snippet", title: "Integration Snippet" },
  { id: "example", title: "Example HTML Usage" },
  { id: "note", title: "Important Note" },
  { id: "roadmap", title: "Future Roadmap" },
  { id: "why", title: "Why This Exists" },
  { id: "status", title: "Status & Feedback" },
];

const GuidePage = () => {
  const [activeSection, setActiveSection] = useState(0);

  const scrollToSection = (index) => {
    setActiveSection(index);
    const element = document.getElementById(sections[index].id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* DEDICATED GLASS NAVBAR FOR GUIDE PAGE */}
      <nav className="guide-navbar">
        <Link to="/" className="guide-nav-logo">
          <span>📖 NextGen Forge Guide</span>
          <span className="guide-nav-badge">Presentation Tour</span>
        </Link>

        <div className="guide-nav-links">
          <Link to="/">Home</Link>
          <Link to="/templates">Templates</Link>
          <Link to="/" className="guide-nav-btn">
            Back to App
          </Link>
        </div>
      </nav>

      {/* FIXED RIGHT SIDE DOT INDICATORS */}
      <div className="snap-dots-indicator" aria-label="Page navigation dots">
        {sections.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(idx)}
            className={`snap-dot ${activeSection === idx ? "active" : ""}`}
            title={sec.title}
            aria-label={`Jump to ${sec.title}`}
          />
        ))}
      </div>

      {/* FULL-SCREEN SCROLL SNAP CONTAINER */}
      <div className="snap-container">
        
        {/* SECTION 1 — WELCOME */}
        <section id="welcome" className="snap-section section-welcome">
          <div className="snap-radial-overlay"></div>
          <div className="snap-card text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-wider mb-4 border border-white/30">
              Interactive Guide
            </span>
            <h2>👋 Welcome to NextGen Forge</h2>
            <p className="max-w-2xl mx-auto mb-6 text-lg">
              NextGen API Template Forge is a platform for generating, customizing, and integrating modern CSS templates through <strong>API-driven styling</strong>.
            </p>
            <p className="max-w-xl mx-auto text-sm opacity-90 mb-6">
              Quickly apply professional UI themes to your own HTML projects without manually editing large CSS files.
            </p>
            <div className="code-box inline-block">
              <code>GET http://localhost:5000/api/css/YOUR_API_KEY</code>
            </div>
            <div className="mt-8">
              <button
                onClick={() => scrollToSection(1)}
                className="px-6 py-2.5 rounded-full bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all cursor-pointer shadow-lg"
              >
                Start Presentation Tour ↓
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2 — HOW TEMPLATES WORK */}
        <section id="how-it-works" className="snap-section section-how-it-works">
          <div className="snap-radial-overlay"></div>
          <div className="snap-card">
            <h2>🚀 How to Use a Template</h2>
            <p className="mb-6 opacity-90">Three simple steps to integrate dynamic CSS themes:</p>
            
            <div className="grid md:grid-cols-3 gap-5">
              <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
                <span className="w-9 h-9 rounded-full bg-pink-500 text-white font-black flex items-center justify-center mb-3">1</span>
                <h3 className="font-bold text-lg text-white mb-2">1. Open Templates</h3>
                <p className="text-sm opacity-85">Browse our responsive collection in the Template Gallery and click Open Workspace.</p>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
                <span className="w-9 h-9 rounded-full bg-purple-500 text-white font-black flex items-center justify-center mb-3">2</span>
                <h3 className="font-bold text-lg text-white mb-2">2. Customize Live</h3>
                <p className="text-sm opacity-85">Fine-tune colors, fonts, radius, and spacing with instant live preview updates.</p>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
                <span className="w-9 h-9 rounded-full bg-amber-500 text-white font-black flex items-center justify-center mb-3">3</span>
                <h3 className="font-bold text-lg text-white mb-2">3. Embed Snippet</h3>
                <p className="text-sm opacity-85">Copy your unique API stylesheet link into your HTML head tag.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — LIVE CUSTOMIZATION */}
        <section id="customization" className="snap-section section-customization">
          <div className="snap-radial-overlay"></div>
          <div className="snap-card">
            <h2>🎨 Live Customization Controls</h2>
            <p className="mb-4 opacity-90">Inside the interactive workspace, you have real-time control over all design tokens:</p>

            <div className="customization-chips mb-6">
              <span>Primary color</span>
              <span>Secondary color</span>
              <span>Accent color</span>
              <span>Font family</span>
              <span>Text color</span>
              <span>Background color</span>
              <span>Border radius</span>
              <span>Padding and spacing</span>
              <span>Layout width</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/20 text-sm">
              <p className="font-medium">
                ⚡ The <strong>Live Preview</strong> iframe updates in real time using CSS variables and API state sync so you see the exact final design before copying the endpoint link.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — INTEGRATION SNIPPET */}
        <section id="snippet" className="snap-section section-snippet">
          <div className="snap-radial-overlay"></div>
          <div className="snap-card">
            <h2>💻 Integration Snippet</h2>
            <p className="mb-4 opacity-90">Copy the stylesheet tag directly into your HTML <code>&lt;head&gt;</code>:</p>

            <div className="code-box mb-4">
              <pre>
{`<!-- Standard NextGen API Stylesheet -->
<link rel="stylesheet"
      href="http://localhost:5000/api/css/YOUR_API_KEY">`}
              </pre>
            </div>

            <p className="text-xs opacity-80">
              * Replace <code>YOUR_API_KEY</code> with your template's key (e.g. <code>tpl_glass_001</code>). Any future edits in the workspace update your live app automatically.
            </p>
          </div>
        </section>

        {/* SECTION 5 — EXAMPLE HTML USAGE */}
        <section id="example" className="snap-section section-example">
          <div className="snap-radial-overlay"></div>
          <div className="snap-card">
            <h2>🖼️ Example HTML Integration</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-bold text-sm text-pink-300 uppercase tracking-wider mb-2">HTML Source</h4>
                <div className="code-box text-xs">
                  <pre>
{`<div class="nav">
  <h2>My Website</h2>
</div>

<section class="hero">
  <h1>Hello World</h1>
</section>`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-pink-300 uppercase tracking-wider mb-2">Automatic Results</h4>
                <ul className="space-y-2 text-sm">
                  <li>✅ Professional responsive layout</li>
                  <li>✅ Automatic theme color application</li>
                  <li>✅ Modern typography loading</li>
                  <li>✅ Reusable component styling</li>
                  <li>✅ Zero manual CSS editing required</li>
                </ul>
              </div>
            </div>

            {/* MOCK BROWSER DISPLAY */}
            <div className="rounded-xl overflow-hidden border border-white/20 bg-slate-950">
              <div className="bg-slate-800 px-3 py-1.5 flex items-center gap-2 text-xs text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="ml-2 font-mono">https://my-website.com</span>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white text-center">
                <h5 className="font-bold">Hello World</h5>
                <p className="text-xs opacity-80 mt-1">Styled dynamically via NextGen API Template Forge</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — IMPORTANT NOTE */}
        <section id="note" className="snap-section section-note">
          <div className="snap-radial-overlay"></div>
          <div className="snap-card warning-card bg-slate-900/80 border-amber-500/60">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">⚠️</span>
              <h2 className="warning-title">Important Note on Architecture</h2>
            </div>
            
            <p className="mb-4 font-semibold">
              This project is currently in an <strong>active development stage</strong>.
            </p>

            <ul className="space-y-2 text-sm opacity-95">
              <li>• Authentication currently uses <strong>browser localStorage</strong> for demo purposes.</li>
              <li>• A production database (MongoDB Atlas) has <strong>not yet been integrated</strong>.</li>
              <li>• User data is stored locally in the browser and is not shared across devices.</li>
              <li>• The project is fully functional for demonstration, portfolio, and feature evaluation purposes.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 7 — FUTURE ROADMAP */}
        <section id="roadmap" className="snap-section section-roadmap">
          <div className="snap-radial-overlay"></div>
          <div className="snap-card">
            <h2>Roadmap</h2>
            <p className="text-sm opacity-85 mb-4">Upcoming production feature releases:</p>

            <div className="snap-roadmap-grid">
              <div className="snap-roadmap-card">
                <span className="text-2xl">🗄️</span>
                <div>
                  <h5>MongoDB Atlas</h5>
                  <p>Persistent database storage for user accounts & custom templates.</p>
                </div>
              </div>

              <div className="snap-roadmap-card">
                <span className="text-2xl">🔐</span>
                <div>
                  <h5>JWT & OAuth2</h5>
                  <p>Secure login with Google/GitHub OAuth and API rate limits.</p>
                </div>
              </div>

              <div className="snap-roadmap-card">
                <span className="text-2xl">☁️</span>
                <div>
                  <h5>Cloud Accounts</h5>
                  <p>Sync user templates across devices automatically.</p>
                </div>
              </div>

              <div className="snap-roadmap-card">
                <span className="text-2xl">🏪</span>
                <div>
                  <h5>Public Marketplace</h5>
                  <p>Community hub for sharing and publishing themes.</p>
                </div>
              </div>

              <div className="snap-roadmap-card">
                <span className="text-2xl">🤖</span>
                <div>
                  <h5>AI Theme Generator</h5>
                  <p>Prompt-to-CSS generator for custom palettes & tokens.</p>
                </div>
              </div>

              <div className="snap-roadmap-card">
                <span className="text-2xl">📦</span>
                <div>
                  <h5>ZIP / NPM Export</h5>
                  <p>Download standalone CSS packages or NPM modules.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 — WHY THIS EXISTS */}
        <section id="why" className="snap-section section-why">
          <div className="snap-radial-overlay"></div>
          <div className="snap-card text-center">
            <span className="text-4xl mb-3 block">🌟</span>
            <h2>Why This Project Exists</h2>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed mt-4">
              The goal of <strong>NextGen API Template Forge</strong> is to make <strong>frontend styling reusable, customizable, and API-driven</strong>, allowing developers to integrate professional designs into any compatible HTML project with minimal effort and maximum flexibility.
            </p>
          </div>
        </section>

        {/* SECTION 9 — PROJECT STATUS & FEEDBACK */}
        <section id="status" className="snap-section section-status">
          <div className="snap-radial-overlay"></div>
          <div className="snap-card text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider mb-4 border border-emerald-500/30">
              🟢 Actively Maintained & Evolving
            </span>
            <h2>🚀 Project Status: Actively Improving</h2>
            <p className="max-w-xl mx-auto text-sm opacity-90 mb-6">
              This project is continuously being enhanced with new templates, better customization controls, improved API integration, and production-ready features. Feedback and suggestions are always welcome.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/templates"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold hover:scale-105 transition-all shadow-lg text-sm"
              >
                🎨 Browse Templates
              </Link>
              <a
                href="https://github.com/vaisanmaniam/css-template-maker"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full border border-white/40 text-white font-bold hover:bg-white/10 transition-all text-sm"
              >
                🐙 View GitHub
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default GuidePage;
