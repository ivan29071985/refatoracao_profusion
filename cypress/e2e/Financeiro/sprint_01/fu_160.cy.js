/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('fu_160', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Verificar coluna Saldo dev.dia', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();

    cy.contains('span', 'Royalties', {timeout:10000} ).click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Todos')]").click()

    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Todos')]").click()

    cy.contains('button', 'Pesquisar').click()

    cy.wait(5000)

    cy.xpath("//th[contains(.,'Saldo dev. dia')]").should('be.visible')
  });

  it('Verificar coluna Saldo dev.acum', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();

    cy.contains('span', 'Royalties', {timeout:10000} ).click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Todos')]").click()

    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Todos')]").click()

    cy.contains('button', 'Pesquisar').click()

    cy.wait(5000)

    cy.xpath("//th[contains(.,'Saldo dev. acum')]").should('be.visible')
  });
  
});