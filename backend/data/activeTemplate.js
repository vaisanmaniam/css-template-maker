let activeApiKey = "tpl_demo_123";

export const getActiveTemplate = () => activeApiKey;

export const setActiveTemplate = (key) => {
  activeApiKey = key;
};
