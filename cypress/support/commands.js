// ── loginAndGoToProducts ──────────────────────────
// Usage: cy.loginAndGoToProducts()
Cypress.Commands.add('loginAndGoToProducts', () => {
  cy.visit('/')
  cy.get('#user-name').type(Cypress.env('username'))
  cy.get('#password').type(Cypress.env('password'), { log: false })
  cy.get('#login-button').click()
  cy.url().should('include', '/inventory.html')
})

// ── loginViaAPI (bypass UI — much faster!) ────────
// Usage: cy.loginViaAPI()
Cypress.Commands.add('loginViaAPI', () => {
  cy.request({
    method: 'POST',
    url:    '/',
    form:   true,
    body: {
      user:     Cypress.env('username'),
      password: Cypress.env('password')
    }
  })
})

// ── addToCart ─────────────────────────────────────
Cypress.Commands.add('addToCart', (productName) => {
  cy.contains('.inventory_item_name', productName)
    .parents('.inventory_item')
    .find('button[id^="add-to-cart"]')
    .click()
})

// ── verifyToast / Alert ───────────────────────────
Cypress.Commands.add('assertText', (selector, text) => {
  cy.get(selector).should('contain.text', text)
})

// ── apiRequest wrapper ────────────────────────────
Cypress.Commands.add('apiGet', (endpoint) => {
  return cy.request('GET', `${Cypress.env('api_url')}${endpoint}`)
})