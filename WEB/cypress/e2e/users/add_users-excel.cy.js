/// <reference types="cypress" />

import 'cypress-file-upload'

describe('Add Users Excel', () => {
  beforeEach(() => {
    cy.visit('/add-user/excel')
  })

  it('displays the correct title', () => {
    cy.get('.title').should('contain', 'Ajouter des utilisateurs avec un fichier Excel')
  })

  it('uploads an .txt file when the file button is clicked', () => {
    cy.get('input[type="file"]').attachFile('bad_file.txt')
    cy.get('.error')
      .should(
        'contain',
        'Le format du fichier est incorrect, veuillez sélectionner un fichier Excel (XLSX).'
      )
      .should('be.visible')
  })

  it('uploads an .xlsx file when the file button is clicked', () => {
    cy.get('input[type="file"]').attachFile('excel_with_students.xlsx')
    cy.get('.sub-title').should('contain', 'Convertir les en-têtes du fichiers Excel')
    cy.get('.column').should('have.length', 7)
    cy.get('.column').eq(0).should('contain', 'Nom')
    cy.get('.column').eq(1).should('contain', 'Prénom')
    cy.get('.column').eq(2).should('contain', 'Email (école)')
    cy.get('.column').eq(3).should('contain', 'Email (personnel)')
    cy.get('.column').eq(4).should('contain', 'Date de naissance')
    cy.get('.column').eq(5).should('contain', 'Classe')
    cy.get('.column').eq(6).should('contain', 'Sexe')

    // select an option for each column and click on the button
    cy.get('.column').eq(0).find('select').select('Naam')
    cy.get('.column').eq(1).find('select').select('Voornaam')
    cy.get('.column').eq(2).find('select').select('E-mail (school)')
    cy.get('.column').eq(3).find('select').select('E-mail (privé)')
    cy.get('.column').eq(4).find('select').select('Geboortedatum')
    cy.get('.column').eq(5).find('select').select('Klas')
    cy.get('.column').eq(6).find('select').select('Seks')

    cy.get('.submit-btn').should('contain', 'Afficher la table').click()

    cy.get('.display-table').should('be.visible')
  })
})
