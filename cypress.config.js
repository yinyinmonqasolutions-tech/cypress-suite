const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // ─── Reporter ───────────────────────────────────
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir:        'cypress/reports',
    overwrite:        false,
    html:             true,
    json:             true,
    timestamp:        'mmddyyyy_HHMMss',
    embeddedScreenshots: true,
  },

  e2e: {
    // ─── Base URL (SauceDemo) ────────────────────────
    baseUrl:         'https://www.saucedemo.com',
    specPattern:     'cypress/e2e/**/*.cy.js',
    supportFile:     'cypress/support/e2e.js',
    fixturesFolder:  'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder:    'cypress/videos',

    // ─── Browser / Timing ────────────────────────────
    defaultCommandTimeout:  8000,
    pageLoadTimeout:        30000,
    requestTimeout:         10000,
    responseTimeout:        10000,
    viewportWidth:          1280,
    viewportHeight:         800,

    // ─── Retries (retry flaky tests) ─────────────────
    retries: {
      runMode:  2,   // CI: retry twice on failure
      openMode: 0
    },

    // ─── Videos / Screenshots ────────────────────────
    video:                  true,
    screenshotOnRunFailure: true,

    // ─── Env Variables ───────────────────────────────
    env: {
      username:     'standard_user',
      password:     'secret_sauce',
      locked_user:  'locked_out_user',
      api_url:      'https://jsonplaceholder.typicode.com'
    },

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    }
  }
})