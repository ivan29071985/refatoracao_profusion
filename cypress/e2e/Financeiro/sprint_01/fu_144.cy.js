/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_144', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar usabilidade dos campos de data com a data atual (Data inicial)', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Contas a pagar').click()
    cy.xpath("//input[@formcontrolname='dateInit']").clear()

    // Pega a data atual e formata para DD/MM/YYYY
    const dataAtual = new Date();
    const dataFormatada = `${String(dataAtual.getDate()).padStart(2, '0')}/${String(dataAtual.getMonth() + 1).padStart(2, '0')}/${dataAtual.getFullYear()}`;

    // Insere a data e valida
    cy.xpath("//input[@formcontrolname='dateInit']")
      .type(dataFormatada)
      .should('have.value', dataFormatada);
  });

  it('Validar usabilidade dos campos de data com 5 dias retroativos data atual (Data inicial)', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Contas a pagar').click()
    cy.xpath("//input[@formcontrolname='dateInit']").clear()

    // Pega a data atual
    const dataAtual = new Date();
    // Subtrai 5 dias
    dataAtual.setDate(dataAtual.getDate() - 5);

    // Formata para DD/MM/YYYY
    const dataFormatada = `${String(dataAtual.getDate()).padStart(2, '0')}/${String(dataAtual.getMonth() + 1).padStart(2, '0')}/${dataAtual.getFullYear()}`;

    // Insere a data e valida
    cy.xpath("//input[@formcontrolname='dateInit']")
      .type(dataFormatada)
      .should('have.value', dataFormatada);
  });

  it('Validar usabilidade dos campos de data com a data atual (Data final)', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Contas a pagar').click()
    cy.xpath("//input[@formcontrolname='dateEnd']").clear()

    // Pega a data atual e formata para DD/MM/YYYY
    const dataAtual = new Date();
    const dataFormatada = `${String(dataAtual.getDate()).padStart(2, '0')}/${String(dataAtual.getMonth() + 1).padStart(2, '0')}/${dataAtual.getFullYear()}`;

    // Insere a data e valida
    cy.xpath("//input[@formcontrolname='dateEnd']")
      .type(dataFormatada)
      .should('have.value', dataFormatada);
  });

  it('Validar usabilidade dos campos de data com 5 dias retroativos data atual (Data inicial)', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Contas a pagar').click()
    cy.xpath("//input[@formcontrolname='dateEnd']").clear()

    // Pega a data atual
    const dataAtual = new Date();
    // Subtrai 5 dias
    dataAtual.setDate(dataAtual.getDate() - 5);

    // Formata para DD/MM/YYYY
    const dataFormatada = `${String(dataAtual.getDate()).padStart(2, '0')}/${String(dataAtual.getMonth() + 1).padStart(2, '0')}/${dataAtual.getFullYear()}`;

    // Insere a data e valida
    cy.xpath("//input[@formcontrolname='dateEnd']")
      .type(dataFormatada)
      .should('have.value', dataFormatada);
  });


});