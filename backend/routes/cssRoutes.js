import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import templateConfigStore from "../data/templateConfigStore.js";
import { getActiveTemplate } from "../data/activeTemplate.js";
import templates from "../data/templates.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

function flattenObject(obj, prefix = "") {
  if (!obj) return {};

  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null) {
      Object.assign(acc, flattenObject(value, newKey));
    } else {
      acc[newKey] = value;
    }

    return acc;
  }, {});
}

function injectThemeVariables(css, config) {
  if (!config) {
    console.log("⚠️ Inject received undefined config");
    return css;
  }

  const flat = flattenObject(config);

  Object.entries(flat).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    css = css.replace(regex, value);
  });

  return css;
}

router.get("/:apiKey", (req, res) => {
  let { apiKey } = req.params;

  if (apiKey === "current") {
    apiKey = getActiveTemplate();
  }

  console.log("REQUESTED API KEY:", req.params.apiKey);
  console.log("ALL TEMPLATES:", templates);

  const template = templates.find(
    t => String(t.apiKey).trim() === String(apiKey).trim()
  );

  if (!template) {
    console.log("TEMPLATE NOT FOUND for apiKey:", apiKey);
    return res.status(404).json({ error: "INVALID_API_KEY" });
  }

  try {
    const filePath = path.join(
      __dirname,
      "..",
      "templates",
      `${template.templateId}.css`
    );

    console.log("LOADING CSS FILE:", filePath);

    let cssContent = fs.readFileSync(filePath, "utf8");

    let config = templateConfigStore.getConfig(apiKey);

    if (!config) {
      console.log("⚠️ No config found → using default");

      config = {
        colors: {
          primary: "#2563eb",
          secondary: "#fef3c7",
          accent: "#f59e0b",
          background: "#ffffff",
          text: "#1e293b"
        },
        typography: {
          fontFamily: "Poppins, sans-serif",
          baseSize: "16px",
          headingWeight: "700"
        },
        layout: {
          paddingBase: "16px",
          borderRadius: "8px",
          containerWidth: "1200px"
        }
      };
    }

    console.log("FINAL CONFIG USED:", JSON.stringify(config, null, 2));

    cssContent = injectThemeVariables(cssContent, config);

    res.setHeader("Content-Type", "text/css");
    res.setHeader("Cache-Control", "no-store");
    res.send(cssContent);

  } catch (err) {
    console.error("CSS LOAD FAILED:", err);
    res.status(500).json({ error: "CSS_GENERATION_FAILED" });
  }
});

export default router;
