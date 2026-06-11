class CheckoutPage {

  get firstNameInput()  { return cy.get('#first-name') }
  get lastNameInput()   { return cy.get('#last-name') }
  get postalCodeInput() { return cy.get('#postal-code') }
  get continueBtn()     { return cy.get('#continue') }
  get finishBtn()       { return cy.get('#finish') }
  get successHeader()   { return cy.get('.complete-header') }

  fillShippingInfo(firstName, lastName, postalCode) {
    this.firstNameInput.type(firstName)
    this.lastNameInput.type(lastName)
    this.postalCodeInput.type(postalCode)
    this.continueBtn.click()
  }

  completeOrder() {
    this.finishBtn.click()
    this.successHeader
      .should('be.visible')
      .and('contain', 'Thank you')
  }
}

export default new CheckoutPage()