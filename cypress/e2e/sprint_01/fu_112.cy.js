/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_112', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar input Data Inicial na mão com a data atual', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();;
    cy.contains('span', 'Repasse').click()
    cy.get('[formControlName="startDueDate"]').clear()

    // Função para formatar a data atual
    const today = new Date()
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`

    // Usando a data formatada no teste
    cy.get('[formControlName="startDueDate"]').click()
      .type(formattedDate)
      .type('{enter}')
      .should('have.value', formattedDate)
  });

  it('Validar input Data Inicial na mão com 1 dia anterior', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();;
    cy.contains('span', 'Repasse').click()
    cy.get('[formControlName="startDueDate"]').clear()

    // Função para calcular 1 dias antes
    const date = new Date()
    date.setDate(date.getDate() - 1) // Subtrai 5 dias
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`

    // Inserindo no campo
    cy.get('[formControlName="startDueDate"]').click()
      .type(formattedDate)
      .type('{enter}')
      .should('have.value', formattedDate)
  });

  it('Validar input Data Inicial na mão com 5 dias anterior', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();;
    cy.contains('span', 'Repasse').click()
    cy.get('[formControlName="startDueDate"]').clear()

    // Função para calcular 5 dias antes
    const date = new Date()
    date.setDate(date.getDate() - 5) // Subtrai 5 dias
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`

    // Inserindo no campo
    cy.get('[formControlName="startDueDate"]').click()
      .type(formattedDate)
      .type('{enter}')
      .should('have.value', formattedDate)
  });

  it('Validar input Data Final na mão com a data atual', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();;
    cy.contains('span', 'Repasse').click()
    cy.get('[formControlName="startDueDate"]').clear()

    // Calculando data atual
    const today = new Date()
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`

    // Inserindo no campo de data final
    cy.get('[formControlName="endDueDate"]').clear()
      .type(formattedDate)
      .type('{enter}')
      .should('have.value', formattedDate)

  });

  it('Validar input Data Final na mão com 1 dia anterior', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();;
    cy.contains('span', 'Repasse').click()
    cy.get('[formControlName="startDueDate"]').clear()

    // Calculando data anterior (1 dia antes)
    const date = new Date()
    date.setDate(date.getDate() - 1) // Subtrai 1 dia
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`

    // Inserindo no campo de data final e verificando
    cy.get('[formControlName="endDueDate"]').clear()
      .type(formattedDate)
      .type('{enter}')
      .should('have.value', formattedDate) // Verifica se o valor está correto

  });

  it('Validar input Data Final na mão com 5 dias anterior', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();;
    cy.contains('span', 'Repasse').click()
    cy.get('[formControlName="startDueDate"]').clear()

    // Calculando data anterior (5 dias antes)
    const date = new Date()
    date.setDate(date.getDate() - 5) // Subtrai 5 dias
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`

    // Inserindo no campo de data final e verificando
    cy.get('[formControlName="endDueDate"]').clear()
      .type(formattedDate)
      .type('{enter}')
      .should('have.value', formattedDate) // Verifica se o valor está correto

  });

});