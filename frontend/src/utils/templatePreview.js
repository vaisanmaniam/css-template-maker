export function getTemplatePreviewHTML(template, config) {
  const c = config.colors || {};
  const t = config.typography || {};
  const l = config.layout || {};

  const primary = c.primary || "#2563eb";
  const secondary = c.secondary || "#64748b";
  const accent = c.accent || "#f59e0b";
  const bg = c.background || "#ffffff";
  const text = c.text || "#111";

  const font = t.fontFamily || "Poppins, sans-serif";
  const size = t.baseSize || "16px";

  const padding = l.paddingBase || "20px";
  const radius = l.borderRadius || "10px";

  /* 🔥 TEMPLATE SWITCH */
  switch (template.templateId) {

    /* ========================= */
    case "modern-business":
      return `
      <html><head><style>
      body{margin:0;font-family:${font};background:${bg};color:${text}}
      .nav{background:${primary};color:white;padding:${padding};display:flex;justify-content:space-between}
      .hero{padding:80px;text-align:center}
      .btn{background:${accent};color:white;padding:10px;border:none;border-radius:${radius}}
      .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:40px}
      .card{background:${secondary};padding:${padding};border-radius:${radius}}
      </style></head>
      <body>
      <div class="nav"><h2>Business</h2><button class="btn">Login</button></div>
      <div class="hero"><h1>Grow Your Business</h1><button class="btn">Start</button></div>
      <div class="grid">
        <div class="card">Service 1</div>
        <div class="card">Service 2</div>
        <div class="card">Service 3</div>
      </div>
      </body></html>
      `;

    /* ========================= */
    case "minimal-dark":
      return `
      <html><head><style>
      body{margin:0;background:#121212;color:white;font-family:${font}}
      .container{padding:40px}
      .card{background:#1e1e1e;margin:20px 0;padding:${padding};border-radius:${radius}}
      </style></head>
      <body>
      <div class="container">
        <h1>Minimal Dark</h1>
        <div class="card">Simple clean UI</div>
        <div class="card">Dark elegant design</div>
      </div>
      </body></html>
      `;

    /* ========================= */
    case "vibrant-gradient":
      return `
      <html><head><style>
      body{margin:0;font-family:${font};background:linear-gradient(135deg,${primary},${accent});color:white;text-align:center}
      .hero{padding:100px}
      .btn{background:white;color:black;padding:12px;border-radius:${radius}}
      </style></head>
      <body>
      <div class="hero">
        <h1>Vibrant UI</h1>
        <button class="btn">Explore</button>
      </div>
      </body></html>
      `;

    /* ========================= */
    case "developer-portfolio":
      return `
      <html><head><style>
      body{margin:0;font-family:${font};background:${bg};color:${text}}
      .header{padding:40px;text-align:center;background:${primary};color:white}
      .section{padding:40px}
      </style></head>
      <body>
      <div class="header"><h1>Developer Portfolio</h1></div>
      <div class="section">Projects | Skills | Contact</div>
      </body></html>
      `;

    /* ========================= */
    case "ecommerce-modern":
      return `
      <html><head><style>
      body{margin:0;font-family:${font}}
      .nav{background:${primary};color:white;padding:${padding}}
      .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:40px}
      .card{border:1px solid #ddd;padding:${padding};border-radius:${radius}}
      .btn{background:${accent};color:white;padding:8px}
      </style></head>
      <body>
      <div class="nav">Shop</div>
      <div class="grid">
        <div class="card">Product <button class="btn">Buy</button></div>
        <div class="card">Product <button class="btn">Buy</button></div>
        <div class="card">Product <button class="btn">Buy</button></div>
      </div>
      </body></html>
      `;

    /* ========================= */
    case "ai-futuristic":
      return `
      <html><head><style>
      body{margin:0;background:black;color:#00f0ff;font-family:${font};text-align:center}
      .hero{padding:100px}
      </style></head>
      <body>
      <div class="hero">
        <h1>AI Futuristic UI</h1>
        <p>Neon cyber design</p>
      </div>
      </body></html>
      `;

    /* ========================= */
    default:
      return `
      <html>
      <body style="padding:50px;font-family:sans-serif">
        <h2>${template.name}</h2>
        <p>Preview Working ✅</p>
      </body>
      </html>
      `;
  }
}
