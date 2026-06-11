class ProductsPage {

  get pageTitle()    { return cy.get('.title') }
  get productItems() { return cy.get('.inventory_item') }
  get sortDropdown() { return cy.get('.product_sort_container') }
  get cartBadge()    { return cy.get('.shopping_cart_badge') }
  get cartLink()     { return cy.get('.shopping_cart_link') }

  verifyOnProductsPage() {
    cy.url().should('include', '/inventory.html')
    this.pageTitle.should('contain', 'Products')
  }

  addProductToCart(productName) {
    cy.contains('.inventory_item', productName)
      .find('button')
      .click()
  }

  sortBy(option) {
    this.sortDropdown.select(option)
  }

  getPrices() {
    return cy.get('.inventory_item_price')
      .then($prices => {
        return [...$prices].map(el =>
          parseFloat(el.innerText.replace('$', ''))
        )
      })
  }
}

export default new ProductsPage()