describe('Modulo Checkout', () => {

  beforeEach(() => {

    cy.login('standard_user', 'secret_sauce')

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()
  })

  it('TC 13 - Completar checkout con datos validos', () => {

    cy.get('[data-test="firstName"]').type('Brisa')

    cy.get('[data-test="lastName"]').type('Villca')

    cy.get('[data-test="postalCode"]').type('1234')

    cy.get('[data-test="continue"]').click()

    cy.url().should('include', 'checkout-step-two')

    cy.contains('Checkout: Overview')
      .should('be.visible')
  })

  it('TC 14 - Checkout sin completar campos obligatorios', () => {

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
      .should('contain', 'Error')
  })

  it('TC 15 - Campo Last Name con problem_user', () => {

    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('problem_user')

    cy.get('[data-test="password"]').type('secret_sauce')

    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Brisa')

    cy.get('[data-test="lastName"]').type('Villca')

    cy.get('[data-test="postalCode"]').type('1234')

    cy.get('[data-test="continue"]').click()

    // Validacion esperada del bug
    cy.get('[data-test="error"]').should('exist')
  })

})