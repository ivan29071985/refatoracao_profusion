const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000, // Aumenta para 10 segundos
    requestTimeout: 10000,
    responseTimeout: 10000,
    downloadsFolder: 'cypress/downloads',
    chromeWebSecurity: false,
    screenshots: false,
    viewportWidth: 1920,
    video: false,
    viewportHeight: 1080,
    retries: {
      runMode: 3,      // 2 retentativas em modo headless (CLI)
      openMode: 3      // 0 retentativas no modo interativo
    },
    setupNodeEvents(on, config) {
      // Configura o Allure Reports
      if (config.env.allure) {
        allureWriter(on, config, {
          reportDir: 'allure-results',
          reportTitle: 'Automation Report Amei'
        });
      }

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