describe('Menu Financeiro com Sub menu', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar menu Financeiro', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.location('pathname').should('eq', '/financial')
    
  });

  it('Validar menu Extrato', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Extrato').click()
    cy.location('pathname').should('eq', '/financial/resume-financial')
  });

  it('Validar menu Contas a pagar', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Contas a pagar').click()
    cy.location('pathname').should('eq', '/financial/bills')
  });

  it('Validar menu Contas a receber', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Contas a receber').click()
    cy.location('pathname').should('eq', '/financial/receives')
  });

  it('Validar menu Cartões', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Cartões').click()
    cy.location('pathname').should('eq', '/financial/cards')
  });

  it('Validar menu Repasse', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Repasse').click()
    cy.location('pathname').should('eq', '/financial/new-transfer')
  });

  it('Validar menu Split', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Split').click()
    cy.location('pathname').should('eq', '/financial/splits')
  });

  it('Validar menu Caixas', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Caixas').click()
    cy.location('pathname').should('eq', '/financial/box')
  });

  it('Validar menu Propostas', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Propostas').click()
    cy.location('pathname').should('eq', '/financial/proposals')
  });

  it('Validar menu Cadeado', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Cadeado').click()
    cy.location('pathname').should('eq', '/financial/padlock')
  });

  it('Validar menu Royalties', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Royalties').click()
    cy.location('pathname').should('eq', '/financial/royalties')
  });

  it('Validar escrita do menu Financeiro', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('FINANCEIRO').should('have.text', 'FINANCEIRO')    
  });

  it('Validar escrita do menu Extrato', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Extrato').should('have.text', 'Extrato')
  });

  it('Validar escrita do menu Contas a pagar', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Contas a pagar').should('have.text', 'Contas a pagar')
  });

  it('Validar escrita do menu Contas a receber', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Contas a receber').should('have.text', 'Contas a receber')
  });

  it('Validar escrita do menu Cartões', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Cartões').should('have.text', 'Cartões')
  });

  it('Validar escrita do menu Repasse', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Repasse').should('have.text', 'Repasse')
  });

  it('Validar escrita do menu Split', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Split').should('have.text', 'Split')
  });

  it('Validar escrita do menu Caixas', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Caixas').should('have.text', 'Caixas')
  });

  it('Validar escrita do menu Propostas', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Propostas').should('have.text', 'Propostas')
  });

  it('Validar escrita do menu Cadeado', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Cadeado').should('have.text', 'Cadeado')
  });

  it('Validar escrita do menu Royalties', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Royalties').should('have.text', 'Royalties')
  });
});

