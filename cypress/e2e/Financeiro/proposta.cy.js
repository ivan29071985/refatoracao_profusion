
/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />

describe('Contas a pagar exemplo', () => {

    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizado
    });

    it('validar menu financeiro', () => {

        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);

        cy.get('#financial')
            .should('exist')
            .should('be.visible')


        cy.contains('li', 'FIANCEIRO')
            .should('exist')
            .should('be.visible')


        cy.xpath('//*[@id="financial"]')
            .should('exist')
            .should('be.visible')

    });

    it.only('validar existencia ta tela saldo', () => {

        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);

        cy.get('#financial') // clica no menu financeiro
            .click()

        cy.contains('span', 'Saldo')
            .should('exist')
            .should('be.visible')

        cy.xpath('//*[@id="navbar"]/mat-sidenav-container/mat-sidenav/div/mat-nav-list/mat-selection-list/mat-list-option[1]/div/div[2]/a/span')
            .should('exist')
            .should('be.visible')
    });


});