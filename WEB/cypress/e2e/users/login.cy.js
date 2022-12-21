/// <reference types="cypress" />

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('displays the correct title', () => {
    cy.get('.connect').should('contain', 'Connexion').should('be.visible')
  })

  it('displays the correct image', () => {
    cy.get('.logo').should('be.visible')
  })

  // should contain form with 2 inputs
  it('displays the correct form', () => {
    cy.get('form').should('be.visible')
    cy.get('input').should('have.length', 2)

    cy.get('input').eq(0).should('have.attr', 'placeholder', 'Email')
    cy.get('input').eq(1).should('have.attr', 'placeholder', 'Mot de passe')

    cy.get('.clickButton').should('contain', 'Se connecter')
  })

  it('Try to login with wrong credentials', () => {
    // fill the first input with "ephec@gmail.com"
    cy.get('input').eq(0).invoke('val', 'ephec@gmail.com').trigger('change')

    // fill the second input with "ephec"
    cy.get('input').eq(1).invoke('val', 'ephec').trigger('change')

    // click on the button
    cy.get('.clickButton').click().wait(1000)

    // check if the error message is displayed
    cy.get('.error').should('contain', 'Veuillez remplir tous les champs')
  })
})
