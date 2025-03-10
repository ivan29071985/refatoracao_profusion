const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    downloadsFolder: 'cypress/downloads',
    chromeWebSecurity: false,
    screenshotsFolder: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      
      // Determina o ambiente
      const environment = process.env.CYPRESS_ENV || config.env.environment;
      config.baseUrl = config.env.baseUrl[environment];
      config.env.environment = environment;

      return config;
    },
    baseUrl: 'https://amei-homolog.amorsaude.com.br',
  },
  env: {
    environment: 'homologacao',
    baseUrl: {
      homologacao: 'https://amei-homolog.amorsaude.com.br',
      staging: 'https://amei-staging.amorsaude.com.br',
      producao: 'https://amei.amorsaude.com.br'
    },
  }
});