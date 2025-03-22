import { defineConfig } from "cypress";
export default defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/mocha",
      quite: true,
      overwrite: false,
      html: false,
      json: true,
      charts: true,
    },
  },
  downloadsFolder: "cypress/downloads",
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "cypress/reports/mochareports/",
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 5000,
  chromeWebSecurity: true,
  viewportHeight: 800, //Default height in pixels for the application under tests' viewport.
  viewportWidth: 1200, //Default width in pixels for the application under tests' viewport.
  retries: {
    runMode: 1,
    openMode: 1,
  },
  env: {
    URL: "https://derivfe.github.io/qa-test/settings",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
