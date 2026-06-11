import loginPage from '../../pages/LoginPage'
import productsPage from '../../pages/ProductsPage'

describe('SauceDemo — Authentication', () => {

  beforeEach(() => {
    loginPage.visit()
  })

  // ── TC-001 Valid Login ────────────────────────────
  it('TC-001 | Valid login redirects to Products page', () => {
    loginPage.loginWithEnvVars()
    productsPage.verifyOnProductsPage()
  })

  // ── TC-002 Invalid Password ───────────────────────
  it('TC-002 | Invalid password shows error message', () => {
    loginPage.login('standard_user', 'wrong_password')
    loginPage.verifyLoginError('Username and password do not match')
  })

  // ── TC-003 Locked Out User ────────────────────────
  it('TC-003 | Locked-out user sees locked error', () => {
    loginPage.login(
      Cypress.env('locked_user'),
      Cypress.env('password')
    )
    loginPage.verifyLoginError('Sorry, this user has been locked out')
  })

  // ── TC-004 Empty Fields ───────────────────────────
  it('TC-004 | Empty username shows validation error', () => {
    loginPage.loginButton.click()
    loginPage.verifyLoginError('Username is required')
  })

  // ── TC-005 Logout ─────────────────────────────────
  it('TC-005 | User can logout and return to login', () => {
    loginPage.loginWithEnvVars()
    productsPage.verifyOnProductsPage()

    // Open burger menu → Logout
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()

    // Should return to login page
    cy.url().should('eq', 'https://www.saucedemo.com/')
    loginPage.loginButton.should('be.visible')
  })

  // ── TC-006 Page Title ─────────────────────────────
  it('TC-006 | Login page has correct title', () => {
    loginPage.pageTitle.should('contain.text', 'Swag Labs')
    cy.title().should('eq', 'Swag Labs')
  })
})