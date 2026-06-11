class LoginPage {

  // ── Selectors ──────────────────────────────────
  get usernameInput() { return cy.get('#user-name') }
  get passwordInput() { return cy.get('#password') }
  get loginButton()  { return cy.get('#login-button') }
  get errorMsg()     { return cy.get('[data-test="error"]') }
  get pageTitle()    { return cy.get('.login_logo') }

  // ── Actions ────────────────────────────────────
  visit() {
    cy.visit('/')
  }

  login(username, password) {
    this.usernameInput.clear().type(username)
    this.passwordInput.clear().type(password, { log: false })
    this.loginButton.click()
  }

  loginWithEnvVars() {
    this.login(
      Cypress.env('username'),
      Cypress.env('password')
    )
  }

  verifyLoginError(message) {
    this.errorMsg
      .should('be.visible')
      .and('contain.text', message)
  }
}

export default new LoginPage()