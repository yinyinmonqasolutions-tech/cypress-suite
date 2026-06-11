import loginPage    from '../../pages/LoginPage'
import productsPage from '../../pages/ProductsPage'

describe('SauceDemo — Product Listing', () => {

  beforeEach(() => {
    loginPage.visit()
    loginPage.loginWithEnvVars()
    productsPage.verifyOnProductsPage()
  })

  it('TC-101 | Displays 6 products', () => {
    productsPage.productItems.should('have.length', 6)
  })

  it('TC-102 | Sort by price low-to-high', () => {
    productsPage.sortBy('lohi')
    productsPage.getPrices().then(prices => {
      const sorted = [...prices].sort((a, b) => a - b)
      expect(prices).to.deep.equal(sorted)
    })
  })

  it('TC-103 | Sort by price high-to-low', () => {
    productsPage.sortBy('hilo')
    productsPage.getPrices().then(prices => {
      const sorted = [...prices].sort((a, b) => b - a)
      expect(prices).to.deep.equal(sorted)
    })
  })

  it('TC-104 | Add item to cart increments badge', () => {
    productsPage.addProductToCart('Sauce Labs Backpack')
    productsPage.cartBadge.should('have.text', '1')
  })

  it('TC-105 | Add multiple items updates badge count', () => {
    productsPage.addProductToCart('Sauce Labs Backpack')
    productsPage.addProductToCart('Sauce Labs Bike Light')
    productsPage.addProductToCart('Sauce Labs Bolt T-Shirt')
    productsPage.cartBadge.should('have.text', '3')
  })

  it('TC-106 | Product detail page loads correctly', () => {
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').click()
    cy.url().should('include', 'inventory-item.html')
    cy.get('.inventory_details_name')
      .should('contain', 'Sauce Labs Backpack')
  })
})