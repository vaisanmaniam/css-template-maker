class TemplateConfigStore {
  constructor() {
    this.configs = {};
  }

  getConfig(apiKey) {
    return this.configs[apiKey];
  }

  setConfig(apiKey, config) {
    this.configs[apiKey] = config;
  }

  deleteConfig(apiKey) {
    delete this.configs[apiKey];
  }
}

const store = new TemplateConfigStore();
export default store;
