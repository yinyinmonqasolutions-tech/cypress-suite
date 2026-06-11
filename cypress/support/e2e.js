// Import custom commands
import './commands'

// Import mochawesome reporter support
import 'cypress-mochawesome-reporter/register'

// ── Global hooks ──────────────────────────────────
beforeEach(() => {
  // Preserve cookies between tests in same spec
  cy.clearCookies()
})

// Catch uncaught exceptions (prevent test fail on 3rd-party errors)
Cypress.on('uncaught:exception', (err) => {
  // Return false to ignore the error and continue the test
  if (err.message.includes('ResizeObserver')) {
    return false
  }
})