import express from "express";
import cors from "cors";

import { getActiveTemplate, setActiveTemplate } from "./data/activeTemplate.js";
import templateConfigStore from "./data/templateConfigStore.js";

import cssRoutes from "./routes/cssRoutes.js";
import configRoutes from "./routes/configRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

/* ===============================
   ROUTES
================================= */

app.use("/api/css", cssRoutes);
app.use("/api/config", configRoutes);

/* ===============================
   TEMPLATE LIST
================================= */

app.get("/api/templates", (req, res) => {
  res.json([
    {
      templateId: "modern-business",
      name: "Modern Business Theme",
      category: "Business",
      apiKey: "tpl_demo_123",
      version: "v2.0"
    },
    {
      templateId: "minimal-dark",
      name: "Minimal Dark Theme",
      category: "Dark",
      apiKey: "tpl_demo_456",
      version: "v2.0"
    },
    {
      templateId: "vibrant-gradient",
      name: "Vibrant Gradient Theme",
      category: "Creative",
      apiKey: "tpl_demo_789",
      version: "v2.0"
    },
    {
      templateId: "glassmorphism-saas",
      name: "Glassmorphism SaaS Dashboard",
      category: "SaaS",
      apiKey: "tpl_glass_001",
      version: "v1.0",
      isNew: true
    },
    {
      templateId: "cyberpunk-neon",
      name: "Cyberpunk Neon Theme",
      category: "Gaming",
      apiKey: "tpl_cyber_002",
      version: "v1.0",
      isNew: true
    },
    {
      templateId: "minimal-luxury",
      name: "Minimal Luxury Brand",
      category: "Luxury",
      apiKey: "tpl_luxury_003",
      version: "v1.0",
      isNew: true
    },
    {
      templateId: "startup-gradient",
      name: "Startup Landing Gradient",
      category: "Startup",
      apiKey: "tpl_startup_004",
      version: "v1.0",
      isNew: true
    },
    {
      templateId: "developer-portfolio",
      name: "Developer Portfolio Interactive",
      category: "Portfolio",
      apiKey: "tpl_dev_005",
      version: "v1.0",
      isNew: true
    },
    {
      templateId: "ecommerce-modern",
      name: "E-commerce Modern UI",
      category: "E-commerce",
      apiKey: "tpl_ecom_006",
      version: "v1.0",
      isNew: true
    },
    {
      templateId: "ai-futuristic",
      name: "AI Futuristic Theme",
      category: "Technology",
      apiKey: "tpl_ai_007",
      version: "v1.0",
      isNew: true
    }
  ]);
});

/* ===============================
   ACTIVE TEMPLATE ROUTES
================================= */

app.get("/api/active-template", (req, res) => {
  res.json({
    success: true,
    activeApiKey: getActiveTemplate(),
  });
});

app.post("/api/set-active-template/:apiKey", (req, res) => {
  const { apiKey } = req.params;
  setActiveTemplate(apiKey);

  res.json({
    success: true,
    message: `Active template set to ${apiKey}`,
  });
});

/* ===============================
   START SERVER
================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Backend running on http://localhost:" + PORT);
});
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully");
});