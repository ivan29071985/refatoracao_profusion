/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_161', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar tela de Saldo', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('Saldo').click()

    cy.url().should('eq', 'https://amei-staging.amorsaude.com.br/financial/balance')

  });

  it('Validar tela de Extrato', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('Extrato').click()

    cy.url().should('eq', 'https://amei-staging.amorsaude.com.br/financial/resume-financial')
    
  });

});