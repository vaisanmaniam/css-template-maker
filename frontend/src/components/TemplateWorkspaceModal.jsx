import React, { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { logActivity } from "../utils/activity";
import "./TemplateWorkspaceModal.css";

const generatePreviewHTML = (template, styles) => {

  // 🔵 MODERN BUSINESS TEMPLATE (FULL REAL WEBSITE PREVIEW)
  if (template.name === "Modern Business Theme") {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body {
  margin: 0;
  font-family: ${styles.fontFamily};
  background: #f8fafc;
  color: #1e293b;
}

/* NAVBAR */
.nav {
  background: ${styles.primary};
  color: white;
  padding: ${styles.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav h2 {
  margin: 0;
}
.nav button {
  background: ${styles.accent};
  border: none;
  padding: 8px 16px;
  color: white;
  border-radius: ${styles.radius};
}

/* HERO */
.hero {
  padding: 80px 20px;
  text-align: center;
  background: linear-gradient(135deg, ${styles.primary}, ${styles.accent});
  color: white;
}
.hero h1 {
  font-size: 42px;
  margin-bottom: 20px;
}
.hero p {
  font-size: 18px;
}

/* SERVICES */
.services {
  display: flex;
  gap: 20px;
  padding: 40px;
}
.card {
  flex: 1;
  background: white;
  padding: ${styles.padding};
  border-radius: ${styles.radius};
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  transition: 0.3s;
}
.card:hover {
  transform: translateY(-5px);
}

/* CTA */
.cta {
  text-align: center;
  padding: 50px;
}
.cta button {
  background: ${styles.primary};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: ${styles.radius};
}

/* FOOTER */
.footer {
  background: ${styles.secondary};
  color: white;
  padding: 20px;
  text-align: center;
}
</style>
</head>

<body>

<!-- NAVBAR -->
<div class="nav">
  <h2>Modern Business</h2>
  <button>Login</button>
</div>

<!-- HERO -->
<section class="hero">
  <h1>Build Powerful Websites</h1>
  <p>Professional UI with real-time customization</p>
</section>

<!-- SERVICES -->
<div class="services">
  <div class="card">
    <h3>Design</h3>
    <p>Modern UI design system</p>
  </div>
  <div class="card">
    <h3>Development</h3>
    <p>Fast and scalable apps</p>
  </div>
  <div class="card">
    <h3>Deployment</h3>
    <p>Production-ready systems</p>
  </div>
</div>

<!-- CTA -->
<div class="cta">
  <button>Get Started</button>
</div>

<!-- FOOTER -->
<div class="footer">
  © 2026 Modern Business Template
</div>

</body>
</html>
`;
  }

  // 🌑 MINIMAL DARK THEME (REAL DARK WEBSITE PREVIEW)
  if (template.name === "Minimal Dark Theme") {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body {
  margin: 0;
  font-family: ${styles.fontFamily};
  background: #0f172a;
  color: #e2e8f0;
}

/* NAVBAR */
.nav {
  background: #020617;
  color: white;
  padding: ${styles.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1e293b;
}
.nav button {
  background: ${styles.primary};
  border: none;
  padding: 8px 16px;
  color: white;
  border-radius: ${styles.radius};
}

/* HERO */
.hero {
  padding: 80px 20px;
  text-align: center;
}
.hero h1 {
  font-size: 42px;
  color: ${styles.primary};
}
.hero p {
  color: #94a3b8;
}

/* FEATURES */
.features {
  display: flex;
  gap: 20px;
  padding: 40px;
}
.card {
  flex: 1;
  background: #020617;
  padding: ${styles.padding};
  border-radius: ${styles.radius};
  border: 1px solid #1e293b;
  transition: 0.3s;
}
.card:hover {
  border-color: ${styles.primary};
  transform: translateY(-5px);
}

/* BUTTON */
.btn {
  background: ${styles.accent};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: ${styles.radius};
}

/* FOOTER */
.footer {
  background: #020617;
  color: #64748b;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #1e293b;
}
</style>
</head>

<body>

<!-- NAVBAR -->
<div class="nav">
  <h2>Minimal Dark</h2>
  <button>Login</button>
</div>

<!-- HERO -->
<section class="hero">
  <h1>Dark Mode Experience</h1>
  <p>Clean, minimal, distraction-free UI</p>
</section>

<!-- FEATURES -->
<div class="features">
  <div class="card">
    <h3>Performance</h3>
    <p>Optimized and fast UI</p>
  </div>
  <div class="card">
    <h3>Security</h3>
    <p>Reliable backend systems</p>
  </div>
  <div class="card">
    <h3>Scalability</h3>
    <p>Enterprise-ready design</p>
  </div>
</div>

<!-- CTA -->
<div style="text-align:center; padding:40px;">
  <button class="btn">Start Now</button>
</div>

<!-- FOOTER -->
<div class="footer">
  © 2026 Minimal Dark Template
</div>

</body>
</html>
`;
  }

  // 🌈 VIBRANT GRADIENT THEME (REAL COLORFUL WEBSITE PREVIEW)
  if (template.name === "Vibrant Gradient Theme") {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body {
  margin: 0;
  font-family: ${styles.fontFamily};
  background: linear-gradient(135deg, #ff7a18, #ff3cac, #784ba0);
  color: white;
}

/* NAVBAR */
.nav {
  background: rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
  padding: ${styles.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav button {
  background: ${styles.accent};
  border: none;
  padding: 8px 16px;
  color: white;
  border-radius: ${styles.radius};
}

/* HERO */
.hero {
  padding: 80px 20px;
  text-align: center;
}
.hero h1 {
  font-size: 44px;
  background: linear-gradient(to right, #fff, ${styles.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero p {
  opacity: 0.9;
}

/* FEATURES */
.features {
  display: flex;
  gap: 20px;
  padding: 40px;
}
.card {
  flex: 1;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);
  padding: ${styles.padding};
  border-radius: ${styles.radius};
  transition: 0.3s;
}
.card:hover {
  transform: scale(1.05);
}

/* CTA */
.cta {
  text-align: center;
  padding: 50px;
}
.cta button {
  background: ${styles.primary};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: ${styles.radius};
}

/* FOOTER */
.footer {
  background: rgba(0,0,0,0.3);
  padding: 20px;
  text-align: center;
}
</style>
</head>

<body>

<!-- NAVBAR -->
<div class="nav">
  <h2>Vibrant UI</h2>
  <button>Login</button>
</div>

<!-- HERO -->
<section class="hero">
  <h1>Creative Gradient Experience</h1>
  <p>Modern colorful UI with smooth transitions</p>
</section>

<!-- FEATURES -->
<div class="features">
  <div class="card">
    <h3>Creative</h3>
    <p>Color-rich UI system</p>
  </div>
  <div class="card">
    <h3>Dynamic</h3>
    <p>Modern gradients and motion</p>
  </div>
  <div class="card">
    <h3>Interactive</h3>
    <p>Engaging user experience</p>
  </div>
</div>

<!-- CTA -->
<div class="cta">
  <button>Explore Now</button>
</div>

<!-- FOOTER -->
<div class="footer">
  © 2026 Vibrant Gradient Template
</div>

</body>
</html>
`;
  }

  // � GLASSMORPHISM SAAS DASHBOARD (REAL DASHBOARD UI)
  if (template.name === "Glassmorphism SaaS Dashboard") {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body {
  margin: 0;
  font-family: ${styles.fontFamily};
  background: linear-gradient(135deg, #6366f1, #ec4899);
  color: white;
  display: flex;
}

/* SIDEBAR */
.sidebar {
  width: 220px;
  height: 100vh;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);
  padding: ${styles.padding};
}
.sidebar h2 {
  margin-bottom: 20px;
}
.sidebar a {
  display: block;
  margin: 10px 0;
  color: white;
  text-decoration: none;
}

/* MAIN */
.main {
  flex: 1;
  padding: 20px;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.header button {
  background: ${styles.accent};
  border: none;
  padding: 8px 16px;
  color: white;
  border-radius: ${styles.radius};
}

/* CARDS */
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.card {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(20px);
  padding: ${styles.padding};
  border-radius: ${styles.radius};
  transition: 0.3s;
}
.card:hover {
  transform: translateY(-5px);
}

/* CHART AREA */
.chart {
  margin-top: 30px;
  background: rgba(255,255,255,0.15);
  padding: ${styles.padding};
  border-radius: ${styles.radius};
}
</style>
</head>

<body>

<!-- SIDEBAR -->
<div class="sidebar">
  <h2>Dashboard</h2>
  <a href="#">Overview</a>
  <a href="#">Analytics</a>
  <a href="#">Users</a>
  <a href="#">Settings</a>
</div>

<!-- MAIN -->
<div class="main">

  <!-- HEADER -->
  <div class="header">
    <h1>Glass SaaS Dashboard</h1>
    <button>Upgrade</button>
  </div>

  <!-- CARDS -->
  <div class="cards">
    <div class="card">
      <h3>Revenue</h3>
      <p>$24,500</p>
    </div>
    <div class="card">
      <h3>Users</h3>
      <p>1,240</p>
    </div>
    <div class="card">
      <h3>Growth</h3>
      <p>+18%</p>
    </div>
  </div>

  <!-- CHART -->
  <div class="chart">
    <h3>Performance Overview</h3>
    <p>Interactive chart area</p>
  </div>

</div>

</body>
</html>
`;
  }

  // CYBERPUNK NEON THEME (FUTURISTIC NEON UI)
  if (template.name === "Cyberpunk Neon Theme") {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body {
  margin: 0;
  font-family: ${styles.fontFamily};
  background: #020617;
  color: ${styles.primary};
}

/* NAVBAR */
.nav {
  background: #020617;
  padding: ${styles.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${styles.primary};
}
.nav h2 {
  text-shadow: 0 0 10px ${styles.primary};
}
.nav button {
  background: transparent;
  border: 1px solid ${styles.accent};
  color: ${styles.accent};
  padding: 8px 16px;
  border-radius: ${styles.radius};
  box-shadow: 0 0 10px ${styles.accent};
}

/* HERO */
.hero {
  padding: 80px 20px;
  text-align: center;
}
.hero h1 {
  font-size: 44px;
  text-shadow: 0 0 15px ${styles.primary}, 0 0 30px ${styles.primary};
}
.hero p {
  color: ${styles.accent};
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 40px;
}

/* CARDS */
.card {
  background: #020617;
  border: 1px solid ${styles.primary};
  padding: ${styles.padding};
  border-radius: ${styles.radius};
  box-shadow: 0 0 10px ${styles.primary};
  transition: 0.3s;
}
.card:hover {
  box-shadow: 0 0 20px ${styles.primary}, 0 0 40px ${styles.primary};
  transform: translateY(-5px);
}

/* BUTTON */
.btn {
  display: block;
  margin: 30px auto;
  background: ${styles.primary};
  color: black;
  padding: 12px 24px;
  border: none;
  border-radius: ${styles.radius};
  box-shadow: 0 0 20px ${styles.primary};
}

/* FOOTER */
.footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid ${styles.primary};
  color: ${styles.accent};
}
</style>
</head>

<body>

<!-- NAVBAR -->
<div class="nav">
  <h2>Cyberpunk UI</h2>
  <button>Access</button>
</div>

<!-- HERO -->
<section class="hero">
  <h1>Neon Future Interface</h1>
  <p>Glowing UI powered by next-gen design</p>
</section>

<!-- GRID -->
<div class="grid">
  <div class="card">
    <h3>System</h3>
    <p>Realtime monitoring</p>
  </div>
  <div class="card">
    <h3>Network</h3>
    <p>Secure connections</p>
  </div>
  <div class="card">
    <h3>AI Core</h3>
    <p>Smart automation</p>
  </div>
</div>

<!-- CTA -->
<button class="btn">Initialize</button>

<!-- FOOTER -->
<div class="footer">
  2077 Cyberpunk Interface
</div>

</body>
</html>
`;
  }

  // MINIMAL LUXURY BRAND (PREMIUM ELEGANT UI)
  if (template.name === "Minimal Luxury Brand") {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body {
  margin: 0;
  font-family: ${styles.fontFamily};
  background: #f9f7f3;
  color: #1e293b;
}

/* NAVBAR */
.nav {
  background: #ffffff;
  padding: ${styles.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}
.nav h2 {
  font-weight: 700;
  letter-spacing: 1px;
}
.nav button {
  background: ${styles.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: ${styles.radius};
}

/* HERO */
.hero {
  padding: 100px 20px;
  text-align: center;
}
.hero h1 {
  font-size: 48px;
  font-weight: 300;
}
.hero p {
  color: #64748b;
  margin-top: 10px;
}

/* COLLECTION */
.collection {
  display: flex;
  gap: 20px;
  padding: 40px;
}
.card {
  flex: 1;
  background: white;
  padding: ${styles.padding};
  border-radius: ${styles.radius};
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  transition: 0.3s;
}
.card:hover {
  transform: translateY(-5px);
}

/* CTA */
.cta {
  text-align: center;
  padding: 60px;
}
.cta button {
  background: ${styles.accent};
  color: white;
  padding: 12px 28px;
  border: none;
  border-radius: ${styles.radius};
}

/* FOOTER */
.footer {
  background: #111827;
  color: #9ca3af;
  text-align: center;
  padding: 20px;
}
</style>
</head>

<body>

<!-- NAVBAR -->
<div class="nav">
  <h2>Luxury Brand</h2>
  <button>Shop</button>
</div>

<!-- HERO -->
<section class="hero">
  <h1>Timeless Elegance</h1>
  <p>Premium minimal design for luxury brands</p>
</section>

<!-- COLLECTION -->
<div class="collection">
  <div class="card">
    <h3>Collection A</h3>
    <p>Elegant and refined styles</p>
  </div>
  <div class="card">
    <h3>Collection B</h3>
    <p>Modern luxury designs</p>
  </div>
  <div class="card">
    <h3>Collection C</h3>
    <p>Exclusive premium range</p>
  </div>
</div>

<!-- CTA -->
<div class="cta">
  <button>Explore Collection</button>
</div>

<!-- FOOTER -->
<div class="footer">
  &copy; 2026 Luxury Brand Template
</div>

</body>
</html>
`;
  }

  // MINIMAL LUXURY (LIGHT CLEAN)
  if (template.name === "Minimal Luxury Brand") {
    return `
<!DOCTYPE html>
<html>
<head>
<style>
body {
  margin:0;
  font-family:${styles.fontFamily};
  background:#f8f5f0;
  color:#1e293b;
}
.nav {
  background:#1e293b;
  color:#facc15;
  padding:16px;
  display:flex;
  justify-content:space-between;
}
.hero {
  padding:60px;
  text-align:center;
}
.container {
  display:flex;
  gap:20px;
  padding:40px;
}
.card {
  flex:1;
  background:white;
  padding:${styles.padding};
  border-radius:${styles.radius};
}
.btn {
  background:#facc15;
  color:black;
  padding:10px 20px;
  border-radius:${styles.radius};
}
</style>
</head>
<body>
<div class="nav"><h2>Luxury Brand</h2><button class="btn">Login</button></div>
<div class="hero"><h1>Elegant UI</h1><p>Minimal premium feel</p></div>
<div class="container">
  <div class="card">Design</div>
  <div class="card">Quality</div>
  <div class="card">Experience</div>
</div>
</body>
</html>`;
  }

  // � STARTUP LANDING GRADIENT (MODERN SAAS LANDING PAGE)
  if (template.name === "Startup Landing Gradient") {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body {
  margin: 0;
  font-family: ${styles.fontFamily};
  background: linear-gradient(135deg, ${styles.primary}, ${styles.accent});
  color: white;
}

/* NAVBAR */
.nav {
  padding: ${styles.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav button {
  background: white;
  color: ${styles.primary};
  border: none;
  padding: 8px 16px;
  border-radius: ${styles.radius};
}

/* HERO */
.hero {
  padding: 100px 20px;
  text-align: center;
}
.hero h1 {
  font-size: 48px;
}
.hero p {
  opacity: 0.9;
}

/* FEATURES */
.features {
  display: flex;
  gap: 20px;
  padding: 40px;
}
.card {
  flex: 1;
  background: rgba(255,255,255,0.15);
  padding: ${styles.padding};
  border-radius: ${styles.radius};
  backdrop-filter: blur(10px);
  transition: 0.3s;
}
.card:hover {
  transform: scale(1.05);
}

/* CTA */
.cta {
  text-align: center;
  padding: 50px;
}
.cta button {
  background: white;
  color: ${styles.primary};
  padding: 12px 28px;
  border: none;
  border-radius: ${styles.radius};
}

/* FOOTER */
.footer {
  text-align: center;
  padding: 20px;
  background: rgba(0,0,0,0.2);
}
</style>
</head>

<body>

<!-- NAVBAR -->
<div class="nav">
  <h2>Startup</h2>
  <button>Sign Up</button>
</div>

<!-- HERO -->
<section class="hero">
  <h1>Launch Your Startup Faster</h1>
  <p>Modern gradient UI for SaaS products</p>
</section>

<!-- FEATURES -->
<div class="features">
  <div class="card">
    <h3>Speed</h3>
    <p>Build quickly with reusable UI</p>
  </div>
  <div class="card">
    <h3>Scalable</h3>
    <p>Ready for growth</p>
  </div>
  <div class="card">
    <h3>Reliable</h3>
    <p>Production-ready design</p>
  </div>
</div>

<!-- CTA -->
<div class="cta">
  <button>Get Started</button>
</div>

<!-- FOOTER -->
<div class="footer">
  © 2026 Startup Landing Template
</div>

</body>
</html>
`;
  }

  // � DEVELOPER PORTFOLIO INTERACTIVE (REAL PORTFOLIO WEBSITE)
  if (template.name === "Developer Portfolio Interactive") {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body {
  margin: 0;
  font-family: ${styles.fontFamily};
  background: #0f172a;
  color: #e2e8f0;
}

/* NAV */
.nav {
  padding: ${styles.padding};
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #1e293b;
}
.nav a {
  color: ${styles.primary};
  text-decoration: none;
  margin-left: 15px;
}

/* HERO */
.hero {
  padding: 80px 20px;
  text-align: center;
}
.hero h1 {
  font-size: 42px;
  color: ${styles.primary};
}
.hero span {
  color: ${styles.accent};
}
.hero p {
  color: #94a3b8;
}

/* PROJECTS */
.projects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 40px;
}
.card {
  background: #020617;
  border: 1px solid #1e293b;
  padding: ${styles.padding};
  border-radius: ${styles.radius};
  transition: 0.3s;
}
.card:hover {
  transform: translateY(-5px);
  border-color: ${styles.primary};
}

/* SKILLS */
.skills {
  padding: 40px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
.skill {
  background: ${styles.primary};
  padding: 8px 14px;
  border-radius: ${styles.radius};
  color: white;
}

/* CTA */
.cta {
  text-align: center;
  padding: 50px;
}
.cta button {
  background: ${styles.accent};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: ${styles.radius};
}

/* FOOTER */
.footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid #1e293b;
  color: #64748b;
}
</style>
</head>

<body>

<!-- NAV -->
<div class="nav">
  <h2>My Portfolio</h2>
  <div>
    <a href="#">Projects</a>
    <a href="#">Skills</a>
    <a href="#">Contact</a>
  </div>
</div>

<!-- HERO -->
<section class="hero">
  <h1>Hi, I'm <span>Developer</span></h1>
  <p>Building modern web applications</p>
</section>

<!-- PROJECTS -->
<div class="projects">
  <div class="card">
    <h3>Project One</h3>
    <p>React + API integration</p>
  </div>
  <div class="card">
    <h3>Project Two</h3>
    <p>Full-stack web app</p>
  </div>
  <div class="card">
    <h3>Project Three</h3>
    <p>AI-powered UI system</p>
  </div>
</div>

<!-- SKILLS -->
<div class="skills">
  <div class="skill">React</div>
  <div class="skill">Node.js</div>
  <div class="skill">CSS</div>
  <div class="skill">AI</div>
</div>

<!-- CTA -->
<div class="cta">
  <button>Contact Me</button>
</div>

<!-- FOOTER -->
<div class="footer">
  &copy; 2026 Developer Portfolio
</div>

</body>
</html>
`;
  }

  // 🛒 E-COMMERCE MODERN UI (REAL SHOPPING WEBSITE)
  if (template.name === "E-commerce Modern UI") {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body {
  margin: 0;
  font-family: ${styles.fontFamily};
  background: #f1f5f9;
  color: #1e293b;
}

/* NAVBAR */
.nav {
  background: white;
  padding: ${styles.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.nav button {
  background: ${styles.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: ${styles.radius};
}

/* HERO */
.hero {
  padding: 40px;
  text-align: center;
}
.hero h1 {
  color: ${styles.primary};
}

/* PRODUCTS GRID */
.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 40px;
}

/* PRODUCT CARD */
.card {
  background: white;
  padding: ${styles.padding};
  border-radius: ${styles.radius};
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  text-align: center;
  transition: 0.3s;
}
.card:hover {
  transform: translateY(-5px);
}

/* PRODUCT IMAGE */
.image {
  height: 120px;
  background: #e2e8f0;
  margin-bottom: 10px;
  border-radius: ${styles.radius};
}

/* BUTTON */
.btn {
  margin-top: 10px;
  background: ${styles.accent};
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: ${styles.radius};
}

/* FOOTER */
.footer {
  background: #020617;
  color: #94a3b8;
  text-align: center;
  padding: 20px;
}
</style>
</head>

<body>

<!-- NAVBAR -->
<div class="nav">
  <h2>ShopUI</h2>
  <button>Cart</button>
</div>

<!-- HERO -->
<section class="hero">
  <h1>Explore Latest Products</h1>
</section>

<!-- PRODUCTS -->
<div class="products">

  <div class="card">
    <div class="image"></div>
    <h3>Product 1</h3>
    <p>$49</p>
    <button class="btn">Add</button>
  </div>

  <div class="card">
    <div class="image"></div>
    <h3>Product 2</h3>
    <p>$79</p>
    <button class="btn">Add</button>
  </div>

  <div class="card">
    <div class="image"></div>
    <h3>Product 3</h3>
    <p>$99</p>
    <button class="btn">Add</button>
  </div>

  <div class="card">
    <div class="image"></div>
    <h3>Product 4</h3>
    <p>$59</p>
    <button class="btn">Add</button>
  </div>

</div>

<!-- FOOTER -->
<div class="footer">
  &copy; 2026 E-commerce Template
</div>

</body>
</html>
`;
  }

  // 🤖 AI FUTURISTIC THEME (ADVANCED AI INTERFACE UI)
  if (template.name === "AI Futuristic Theme") {
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body {
  margin: 0;
  font-family: ${styles.fontFamily};
  background: radial-gradient(circle at top, #0f172a, #020617);
  color: #e0f2fe;
}

/* NAVBAR */
.nav {
  padding: ${styles.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.nav h2 {
  color: ${styles.primary};
  text-shadow: 0 0 10px ${styles.primary};
}
.nav button {
  background: ${styles.accent};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: ${styles.radius};
  box-shadow: 0 0 10px ${styles.accent};
}

/* HERO */
.hero {
  padding: 80px 20px;
  text-align: center;
}
.hero h1 {
  font-size: 44px;
  text-shadow: 0 0 20px ${styles.primary};
}
.hero p {
  color: #94a3b8;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 40px;
}

/* CARDS */
.card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: ${styles.padding};
  border-radius: ${styles.radius};
  backdrop-filter: blur(15px);
  transition: 0.3s;
}
.card:hover {
  transform: scale(1.05);
  border-color: ${styles.primary};
}

/* AI PANEL */
.panel {
  margin: 40px;
  padding: ${styles.padding};
  border-radius: ${styles.radius};
  background: rgba(255,255,255,0.08);
  border: 1px solid ${styles.primary};
  box-shadow: 0 0 20px ${styles.primary};
}

/* CTA */
.cta {
  text-align: center;
  padding: 40px;
}
.cta button {
  background: ${styles.primary};
  color: black;
  padding: 12px 24px;
  border: none;
  border-radius: ${styles.radius};
  box-shadow: 0 0 20px ${styles.primary};
}

/* FOOTER */
.footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
  color: #64748b;
}
</style>
</head>

<body>

<!-- NAVBAR -->
<div class="nav">
  <h2>AI System</h2>
  <button>Connect</button>
</div>

<!-- HERO -->
<section class="hero">
  <h1>NextGen AI Interface</h1>
  <p>Powered by intelligent design systems</p>
</section>

<!-- GRID -->
<div class="grid">
  <div class="card">
    <h3>AI Engine</h3>
    <p>Real-time processing</p>
  </div>
  <div class="card">
    <h3>Automation</h3>
    <p>Smart workflows</p>
  </div>
  <div class="card">
    <h3>Insights</h3>
    <p>Predictive analytics</p>
  </div>
</div>

<!-- PANEL -->
<div class="panel">
  <h3>System Status</h3>
  <p>All AI modules running efficiently</p>
</div>

<!-- CTA -->
<div class="cta">
  <button>Initialize AI</button>
</div>

<!-- FOOTER -->
<div class="footer">
  © 2026 AI Futuristic Template
</div>

</body>
</html>
`;
  }

  // 🟣 GLASSMORPHISM (BLUR + GRADIENT)
  if (template.name === "Glassmorphism SaaS Dashboard") {
    return `
<!DOCTYPE html>
<html>
<head>
<style>
body {
  margin:0;
  font-family:${styles.fontFamily};
  background: linear-gradient(135deg,#6366f1,#ec4899);
  color:white;
}
.nav {
  backdrop-filter: blur(10px);
  background: rgba(255,255,255,0.2);
  padding:16px;
  display:flex;
  justify-content:space-between;
}
.hero {
  padding:60px;
  text-align:center;
}
.container {
  display:flex;
  gap:20px;
  padding:40px;
}
.card {
  flex:1;
  backdrop-filter: blur(20px);
  background: rgba(255,255,255,0.2);
  padding:${styles.padding};
  border-radius:${styles.radius};
}
.btn {
  background:${styles.accent};
  color:white;
  padding:10px 20px;
  border-radius:${styles.radius};
}
</style>
</head>
<body>
<div class="nav"><h2>Glass Dashboard</h2><button class="btn">Login</button></div>
<div class="hero"><h1>Futuristic UI</h1><p>Blur + transparency</p></div>
<div class="container">
  <div class="card">Analytics</div>
  <div class="card">Users</div>
  <div class="card">Reports</div>
</div>
</body>
</html>`;
  }

  // 🟢 CYBERPUNK (NEON DARK)
  if (template.name === "Cyberpunk Neon Theme") {
    return `
<!DOCTYPE html>
<html>
<head>
<style>
body {
  margin:0;
  font-family:${styles.fontFamily};
  background:#020617;
  color:#22c55e;
}
.nav {
  background:#020617;
  border-bottom:2px solid #22c55e;
  padding:16px;
}
.hero {
  padding:60px;
  text-align:center;
}
.container {
  display:flex;
  gap:20px;
  padding:40px;
}
.card {
  flex:1;
  background:#020617;
  border:1px solid #22c55e;
  padding:${styles.padding};
  border-radius:${styles.radius};
}
.btn {
  background:#22c55e;
  color:black;
  padding:10px 20px;
}
</style>
</head>
<body>
<div class="nav">Cyberpunk UI</div>
<div class="hero"><h1>Neon Interface</h1></div>
<div class="container">
  <div class="card">System</div>
  <div class="card">Data</div>
  <div class="card">Control</div>
</div>
</body>
</html>`;
  }

  // ⚪ DEFAULT TEMPLATE
  return `
<!DOCTYPE html>
<html>
<head>
<style>
body {
  margin:0;
  font-family:${styles.fontFamily};
  background:#eef2ff;
}
.nav {
  background:${styles.primary};
  color:white;
  padding:16px;
}
.hero {
  padding:60px;
  text-align:center;
}
.card {
  margin:20px;
  padding:${styles.padding};
  border-radius:${styles.radius};
  background:white;
}
</style>
</head>
<body>
<div class="nav">${template.name}</div>
<div class="hero"><h1>Default Template</h1></div>
<div class="card">Feature</div>
</body>
</html>`;
};

const TemplateWorkspaceModal = ({ template, onClose }) => {
  const [styles, setStyles] = useState({
    primary: "#2563eb",
    secondary: "#f1f5f9",
    accent: "#f59e0b",
    background: "#ffffff",
    text: "#111827",
    padding: "16px",
    radius: "8px",
    fontFamily: "Poppins, sans-serif"
  });

  // Force live preview refresh when styles change
  useEffect(() => {
    // This will trigger iframe re-render with new cache-busting parameter
  }, [styles]);

  // PAUSE PARENT ANIMATION WHEN MODAL OPENS
  useEffect(() => {
    const templatesPage = document.querySelector('.templates-page');
    if (templatesPage) {
      templatesPage.style.animation = 'none';
      templatesPage.style.filter = 'none';
    }
    return () => {
      if (templatesPage) {
        templatesPage.style.animation = '';
        templatesPage.style.filter = '';
      }
    };
  }, []);

  const update = async (key, value) => {
    const updated = {
      ...styles,
      [key]: value
    };

    setStyles(updated);

    try {
      await fetch(`http://localhost:5000/api/config/${template.apiKey}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          colors: {
            primary: updated.primary,
            secondary: updated.secondary,
            accent: updated.accent,
            background: updated.background,
            text: updated.text
          },
          typography: {
            fontFamily: updated.fontFamily,
            baseSize: "16px",
            headingWeight: "700"
          },
          layout: {
            paddingBase: updated.padding,
            borderRadius: updated.radius,
            containerWidth: "1200px"
          }
        })
      });

      console.log("✅ SENT TO BACKEND:", updated);

    } catch (err) {
      console.error("❌ UPDATE FAILED", err);
    }
  };

  // ✅ FIX: generate HTML correctly
  const previewHTML = useMemo(() => {
    return generatePreviewHTML(template, styles);
  }, [template, styles]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
        const activeElement = document.activeElement;
        const isInputFocused = activeElement && (
          activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.tagName === "SELECT" ||
          activeElement.isContentEditable
        );

        if (!isInputFocused) {
          e.preventDefault();
          const key = template.apiKey || "demo_key_123";
          navigator.clipboard.writeText(key);
          toast.success("API Key Copied to Clipboard!");
          logActivity("copy_key", `Copied API key for ${template.name}`);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, template]);

  const handleActivate = () => {
    localStorage.setItem("activeTemplate", JSON.stringify(template));
    toast.success("Template Activated Successfully!");
    logActivity("activate", `Activated ${template.name}`);
  };

  const handleDeactivate = () => {
    localStorage.removeItem("activeTemplate");
    toast.success("Template Deactivated!");
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(template.apiKey || "demo_key_123");
    toast.success("API Key Copied to Clipboard!");
    logActivity("copy_key", `Copied API key for ${template.name}`);
  };

  const copyTemplateLink = () => {
    const link = `http://localhost:5000/api/css/${template.apiKey || "demo_key_123"}`;
    navigator.clipboard.writeText(link);
    toast.success("Template Link Copied to Clipboard!");
    logActivity("copy_snippet", `Copied CSS link for ${template.name}`);
  };

  const copyIntegrationSnippet = () => {
    const key = template.apiKey || "demo_key_123";
    const snippet = `<link rel="stylesheet" href="http://localhost:5000/api/css/${key}">`;
    navigator.clipboard.writeText(snippet);
    toast.success("HTML integration snippet copied");
    logActivity("copy_snippet", `Copied HTML integration snippet for ${template.name}`);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 workspace-modal-overlay">
      <div className="bg-white w-[95%] h-[90%] rounded-2xl flex overflow-hidden shadow-2xl workspace-modal-card">
        
        {/* LEFT CUSTOMIZATION PANEL */}
        <div className="w-[30%] p-6 overflow-y-auto border-r border-gray-200 bg-gray-50">
          <h2 className="font-bold text-xl mb-6 text-gray-800">Customize Template</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={styles.primary}
                  onChange={e => update("primary", e.target.value)} 
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <input 
                  type="text" 
                  value={styles.primary}
                  onChange={e => update("primary", e.target.value)} 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={styles.secondary}
                  onChange={e => update("secondary", e.target.value)} 
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <input 
                  type="text" 
                  value={styles.secondary}
                  onChange={e => update("secondary", e.target.value)} 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={styles.accent}
                  onChange={e => update("accent", e.target.value)} 
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <input 
                  type="text" 
                  value={styles.accent}
                  onChange={e => update("accent", e.target.value)} 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={styles.background}
                  onChange={e => update("background", e.target.value)} 
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <input 
                  type="text" 
                  value={styles.background}
                  onChange={e => update("background", e.target.value)} 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={styles.text}
                  onChange={e => update("text", e.target.value)} 
                  className="w-12 h-12 rounded cursor-pointer"
                />
                <input 
                  type="text" 
                  value={styles.text}
                  onChange={e => update("text", e.target.value)} 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Padding</label>
              <select 
                value={styles.padding}
                onChange={e => update("padding", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="8px">Small (8px)</option>
                <option value="16px">Medium (16px)</option>
                <option value="24px">Large (24px)</option>
                <option value="32px">Extra Large (32px)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
              <select 
                value={styles.radius}
                onChange={e => update("radius", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="0px">None</option>
                <option value="4px">Small</option>
                <option value="8px">Medium</option>
                <option value="12px">Large</option>
                <option value="16px">Extra Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
              <select 
                value={styles.fontFamily}
                onChange={e => update("fontFamily", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="Poppins, sans-serif">Poppins</option>
                <option value="Inter, sans-serif">Inter</option>
                <option value="Roboto, sans-serif">Roboto</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Georgia, serif">Georgia</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT PREVIEW + ACTIONS */}
        <div className="w-[70%] flex flex-col">
          
          {/* PREVIEW HEADER */}
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Live Preview (Real CSS Output)</h3>
              <p className="text-sm text-gray-600">Connected to backend API - reflects customization changes instantly</p>
            </div>
            <button 
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 text-xl font-bold transition-colors cursor-pointer"
              title="Close modal"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* FLOATING THEME STATUS BAR */}
          <div className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-white/10 shadow-sm flex-wrap gap-2">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Theme Active</span>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400 font-medium">Primary:</span>
                <span className="inline-block w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs" style={{ backgroundColor: styles.primary }}></span>
                <span className="font-mono text-gray-200">{styles.primary}</span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-gray-400 font-medium">Font:</span>
                <span className="font-medium text-gray-200">{styles.fontFamily.split(',')[0]}</span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-gray-400 font-medium">Radius:</span>
                <span className="font-medium text-gray-200">{styles.radius}</span>
              </div>
            </div>
          </div>
          
          {/* PREVIEW */}
          <div className="flex-1 bg-white p-4 overflow-y-auto preview-iframe-wrapper">
            <iframe
  key={template.apiKey + JSON.stringify(styles)}
  title="preview"
  srcDoc={`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="http://localhost:5000/api/css/${template.apiKey}?v=${Date.now()}">
        <style>
          :root {
            --primary: ${styles.primary};
            --secondary: ${styles.secondary};
            --accent: ${styles.accent};
            --background: ${styles.background};
            --text: ${styles.text};
            --font-family: ${styles.fontFamily};
            --padding-base: ${styles.padding};
            --border-radius: ${styles.radius};

            --primaryColor: ${styles.primary};
            --secondaryColor: ${styles.secondary};
            --accentColor: ${styles.accent};
            --backgroundColor: ${styles.background};
            --textColor: ${styles.text};
            --fontFamily: ${styles.fontFamily};
            --padding: ${styles.padding};
            --radius: ${styles.radius};

            --primary-color: ${styles.primary};
            --secondary-color: ${styles.secondary};
            --accent-color: ${styles.accent};
            --bg-color: ${styles.background};
            --text-color: ${styles.text};
          }

          * {
            transition: color 0.3s ease, background-color 0.3s ease, font-family 0.3s ease, border-radius 0.3s ease, padding 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          }

          html, body, h1, h2, h3, h4, h5, h6, p, button, a, span, div, input, select {
            font-family: ${styles.fontFamily} !important;
          }

          html, body {
            margin: 0;
            padding: 0;
            min-height: 100%;
            overflow-y: auto;
            background-color: ${styles.background} !important;
            color: ${styles.text} !important;
          }

          .nav, header {
            padding: ${styles.padding} !important;
          }

          .card, .container {
            padding: ${styles.padding};
            border-radius: ${styles.radius};
          }

          .btn, button, input, select {
            border-radius: ${styles.radius} !important;
          }
        </style>
      </head>
      <body>

        <div class="nav">
          <h2>${template.name}</h2>
          <button class="btn btn-primary">Login</button>
        </div>

        <section class="hero">
          <h1>Live Template Preview</h1>
          <p>This reflects backend customization</p>
        </section>

        <div class="container">
          <div class="card">
            <h3>Feature</h3>
            <button class="btn btn-primary">Action</button>
          </div>
        </div>

        <div class="footer">Footer</div>

      </body>
    </html>
  `}
  style={{
    width: "100%",
    minHeight: "650px",
    height: "100%",
    border: "none",
    borderRadius: "12px"
  }}
/>
          </div>

          {/* ACTIONS / FOOTER */}
          <div className="p-4 flex flex-wrap gap-3 border-t border-gray-200 bg-white sticky bottom-0 z-10 items-center">
            <button 
              onClick={handleActivate}
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2 shadow-sm cursor-pointer"
            >
              ✅ Activate Template
            </button>

            <button 
              onClick={handleDeactivate}
              className="bg-rose-600 text-white px-5 py-2.5 rounded-lg hover:bg-rose-700 transition-colors font-medium flex items-center gap-2 shadow-sm cursor-pointer"
            >
              ❌ Deactivate Template
            </button>

            <button 
              onClick={copyApiKey}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2 shadow-sm cursor-pointer"
            >
              🔑 Copy API Key
            </button>

            <button 
              onClick={copyTemplateLink}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-sm cursor-pointer"
            >
              🔗 Copy Template Link
            </button>

            <button 
              onClick={copyIntegrationSnippet}
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2 shadow-sm cursor-pointer"
            >
              📋 Copy Integration Snippet
            </button>

            <button 
              onClick={onClose} 
              className="ml-auto px-5 py-2.5 text-gray-600 hover:text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateWorkspaceModal;
