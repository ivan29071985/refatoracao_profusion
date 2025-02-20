/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('fu_28', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar busca de Advogados para Confirmação', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout: 10000}).click();
    cy.contains('Contas a pagar', {timeout: 10000} ).click();
    cy.xpath("//input[contains(@formcontrolname,'planoDeContas')]").type('Advogados');
    cy.xpath("//span[contains(.,'Administrativas - Advogados')]").should('be.visible');
  });

  it('Validar busca de Alvarás para Confirmação', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout: 10000}).click();
    cy.contains('Contas a pagar', {timeout: 10000}).click();
    cy.xpath("//input[contains(@formcontrolname,'planoDeContas')]").type('Alvarás');
    cy.xpath("//span[@class='mdc-list-item__primary-text'][contains(.,'Administrativas - Alvarás')]").should('exist');
  });

  it('Validar busca de Transporte para Confirmação', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout: 10000}).click();
    cy.contains('Contas a pagar', {timeout: 10000}).click();
    cy.xpath("//input[contains(@formcontrolname,'planoDeContas')]").type('Transporte');
    cy.xpath("//span[@class='mdc-list-item__primary-text'][contains(.,'Administrativas - Transporte')]").should('exist');
  });

  it('Validar busca de Transportadora para Confirmação', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout: 10000}).click();
    cy.contains('Contas a pagar', {timeout: 10000}).click();
    cy.xpath("//input[contains(@formcontrolname,'planoDeContas')]").type('Transportadora', {timeout: 1000} )
    cy.xpath("//span[contains(.,'Administrativas - Transportadora')]").should('exist');
  });
}); 
