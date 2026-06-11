import loginPage    from '../../pages/LoginPage'
import productsPage from '../../pages/ProductsPage'
import checkoutPage from '../../pages/CheckoutPage'

describe('SauceDemo — Checkout Flow', () => {

  beforeEach(() => {
    // Use custom command (defined in commands.js)
    cy.loginAndGoToProducts()
  })

  it('TC-201 | Complete end-to-end checkout', () => {
    // Add item
    productsPage.addProductToCart('Sauce Labs Backpack')
    productsPage.cartLink.click()

    // Cart page
    cy.url().should('include', '/cart.html')
    cy.get('.cart_item').should('have.length', 1)
    cy.get('#checkout').click()

    // Checkout step 1: Personal info
    checkoutPage.fillShippingInfo('Yin', 'Yin', '11100')

    // Checkout step 2: Summary
    cy.get('.summary_info').should('be.visible')
    cy.get('.summary_total_label').should('contain', 'Total:')

    // Complete order
    checkoutPage.completeOrder()
  })

  it('TC-202 | Checkout fails without firstname', () => {
    productsPage.addProductToCart('Sauce Labs Backpack')
    productsPage.cartLink.click()
    cy.get('#checkout').click()

    // Leave first name empty
    checkoutPage.lastNameInput.type('Yin')
    checkoutPage.postalCodeInput.type('11100')
    checkoutPage.continueBtn.click()

    cy.get('[data-test="error"]')
      .should('contain', 'First Name is required')
  })

  it('TC-203 | Remove item from cart', () => {
    productsPage.addProductToCart('Sauce Labs Backpack')
    productsPage.cartLink.click()
    cy.get('.cart_item').should('have.length', 1)

    cy.get('#remove-sauce-labs-backpack').click()
    cy.get('.cart_item').should('not.exist')
    productsPage.cartBadge.should('not.exist')
  })
})