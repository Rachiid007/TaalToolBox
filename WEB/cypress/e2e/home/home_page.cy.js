/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the correct header', () => {
    cy.get('.logo')
      .should('be.visible')
      .should('contain', 'TaalToolBox')
      .click()
      .url()
      .should('include', '/')

    cy.get('.tabs_element').should('contain', 'Accueil')

    cy.get('.conreg')
      .should('contain', 'Se connecter')
      .click()
      .url()
      .should('include', '/login')
      .go('back')
  })

  it('displays the correct main content', () => {
    cy.get('#firstIn').should('contain', 'Bienvenue sur TaalToolBox')

    cy.get('#secondIn').should('contain', 'Jouer à apprendre les langues !')

    cy.get('h1').eq(0).should('contain', "Une nouvelle façon d'apprendre")

    // last p should contain the link to the github repo
    cy.get('p')
      .last()
      .should(
        'contain',
        'Profitez de notre large gamme de jeux pour améliorer votre maîtrise de la langue. Pour chaque jeu, des thèmes et des difficultés différentes vous sont proposés.'
      )

    cy.get('h1').eq(1).should('contain', 'Une multitude de jeux amusants')
  })
})
