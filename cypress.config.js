const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    specPattern: [
      'cypress/e2e/Financeiro/fluxos.cy.js',
      'cypress/e2e/Financeiro/fluxo_atendimento.cy.js'
    ],
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    failOnStatusCode: false,
    downloadsFolder: 'cypress/downloads',
    chromeWebSecurity: false,
    screenshots: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    numTestsKeptInMemory: 5,
    retries: {
      runMode: 3,
      openMode: 3
    },
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'chromium') {
          launchOptions.args.push(
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-software-rasterizer',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--no-sandbox',
            '--js-flags=--expose-gc'
          );
        }
        return launchOptions;
      });

      on('task', {
        clearMemory() {
          if (global.gc) {
            global.gc();
          }
          return null;
        }
      });

      if (config.env.allure) {
        allureWriter(on, config, {
          reportDir: 'allure-results',
          reportTitle: 'Automation Report Amei',
          testCasePrefix: 'TC-',
          disableWebdriverStepsReporting: true,
          disableWebdriverScreenshotsReporting: true,
          addAnalyticLabels: true,
          addRetryAnalyticLabels: true,
        });
      }

      const environment = process.env.CYPRESS_ENV || config.env.environment || 'homologacao';
      config.baseUrl = config.env.baseUrl[environment] || 'https://amei-homolog.amorsaude.com.br';
      config.env.environment = environment;
      
      return config;
    }
  },
  env: {
    environment: 'homologacao',
    baseUrl: {
      homologacao: 'https://amei-homolog.amorsaude.com.br',
      staging: 'https://amei-staging.amorsaude.com.br',
      producao: 'https://amei.amorsaude.com.br'
    },
    failOnStatusCode: false
  }
});