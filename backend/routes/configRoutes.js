import express from "express";
import templateConfigStore from '../data/templateConfigStore.js';

const router = express.Router();

// Get template configuration
router.get('/:apiKey', async (req, res) => {
  try {
    const { apiKey } = req.params;
    const config = templateConfigStore.getConfig(apiKey);
    
    res.status(200).json({
      success: true,
      data: {
        apiKey,
        config
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get template configuration'
    });
  }
});

// Update template configuration
router.put('/:apiKey', async (req, res) => {
  try {
    const { apiKey } = req.params;
    const { config } = req.body;
    
    if (!config) {
      return res.status(400).json({
        success: false,
        error: 'Configuration object is required'
      });
    }
    
    const updatedConfig = await templateConfigStore.setConfig(apiKey, config);
    
    res.status(200).json({
      success: true,
      data: {
        apiKey,
        config: updatedConfig
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update template configuration'
    });
  }
});

// Update partial template configuration
router.patch("/:apiKey", (req, res) => {
  const { apiKey } = req.params;
  const updates = req.body;

  console.log("🔥 RECEIVED UPDATE:", updates);

  let existing = templateConfigStore.getConfig(apiKey);

  if (!existing) {
    existing = {};
  }

  const newConfig = {
    ...existing,
    ...updates,
    colors: {
      ...existing?.colors,
      ...updates?.colors
    },
    typography: {
      ...existing?.typography,
      ...updates?.typography
    },
    layout: {
      ...existing?.layout,
      ...updates?.layout
    }
  };

  templateConfigStore.setConfig(apiKey, newConfig);

  console.log("✅ SAVED CONFIG:", newConfig);

  res.json({
    success: true,
    config: newConfig
  });
});

// Reset template configuration to defaults
router.post('/:apiKey/reset', async (req, res) => {
  try {
    const { apiKey } = req.params;
    const defaultConfig = await templateConfigStore.resetConfig(apiKey);
    
    res.status(200).json({
      success: true,
      data: {
        apiKey,
        config: defaultConfig
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to reset template configuration'
    });
  }
});

// Delete template configuration
router.delete('/:apiKey', async (req, res) => {
  try {
    const { apiKey } = req.params;
    const deleted = templateConfigStore.deleteConfig(apiKey);
    
    if (deleted) {
      res.status(200).json({
        success: true,
        message: 'Template configuration deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Template configuration not found'
      });
    }
  } catch (error) {
    console.error('Error deleting template config:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete template configuration'
    });
  }
});

// Get all template configurations (admin endpoint)
router.get('/', async (req, res) => {
  try {
    const allConfigs = templateConfigStore.getAllConfigs();
    
    res.status(200).json({
      success: true,
      data: allConfigs
    });
  } catch (error) {
    console.error('Error getting all template configs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get template configurations'
    });
  }
});

export default router;
