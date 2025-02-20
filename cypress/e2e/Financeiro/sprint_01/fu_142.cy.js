/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_142', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar permissão sobre a tela Saldo caminho positivo', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Saldo').click()
    cy.url().should('include', 'https://amei-homolog.amorsaude.com.br/financial/balance');
  });
});

