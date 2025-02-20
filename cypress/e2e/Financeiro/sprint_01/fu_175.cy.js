/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('fu_175', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Verificar menu Saldo', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();

  });
  
});