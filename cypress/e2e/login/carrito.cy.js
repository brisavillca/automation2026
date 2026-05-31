describe('Modulo Carrito', () => {

  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  })

  it('TC 10 - Agregar un producto al carrito', () => {

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .should('be.visible')
      .click()

    cy.get('.shopping_cart_badge')
      .should('contain', '1')

    cy.get('.shopping_cart_link').click()

    cy.url().should('include', '/cart.html')

    cy.contains('Sauce Labs Backpack')
      .should('exist')
  })

  it('TC 11 - Agregar multiples productos y verificar contador', () => {

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

    cy.get('.shopping_cart_badge')
      .should('contain', '2')

    cy.get('.shopping_cart_link').click()

    cy.get('.cart_item')
      .should('have.length', 2)
  })

  it('TC 12 - Eliminar producto desde carrito', () => {

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="remove-sauce-labs-backpack"]').click()

    cy.get('.cart_item')
      .should('not.exist')

    cy.get('.shopping_cart_badge')
      .should('not.exist')
  })

})