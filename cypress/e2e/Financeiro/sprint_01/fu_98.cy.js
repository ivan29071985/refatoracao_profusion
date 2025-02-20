/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_98', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
      });

    it('Verificar coluna Data Cadastro', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', {timeout:10000} ).click();
        cy.contains('Contas a receber').click();
        cy.xpath("//th[@role='columnheader'][contains(.,'Data Cadastro')]").should('contain', 'Data Cadastro')
    });

    it('Verificar coluna Data Pagamento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', {timeout:10000} ).click();;
        cy.contains('Contas a receber').click();
        cy.xpath("//th[@role='columnheader'][contains(.,'Data Pagamento')]").should('contain', 'Data Pagamento')
    });

    it('Verificar coluna Data Vencimento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', {timeout:10000} ).click();;
        cy.contains('Contas a receber').click();
        cy.xpath("//th[@role='columnheader'][contains(.,'Data Vencimento')]").should('contain', 'Data Vencimento')
    });

    it('Verificar selector Selecione o tipo de data', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', {timeout:10000} ).click();;
        cy.contains('Contas a receber').click();
        cy.xpath("(//div[contains(.,'Data CadastroSelecione o tipo de data')])[8]").should('contain', 'Selecione o tipo de data')
    });

    it('Verificar selector Data Cadastro', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', {timeout:10000} ).click();;
        cy.contains('Contas a receber').click();
        cy.xpath("(//div[contains(.,'Data CadastroSelecione o tipo de data')])[8]").click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Data Cadastro')]").should('contain', 'Data Cadastro')
    });

    it('Verificar selector Data Pagamento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', {timeout:10000} ).click();;
        cy.contains('Contas a receber').click();
        cy.xpath("(//div[contains(.,'Data CadastroSelecione o tipo de data')])[8]").click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Data Pagamento')]").should('contain', 'Data Pagamento')
    });

    it('Verificar selector Data Vencimento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', {timeout:10000} ).click();;
        cy.contains('Contas a receber').click();
        cy.xpath("(//div[contains(.,'Data CadastroSelecione o tipo de data')])[8]").click()
        cy.contains('Data Vencimento').should('contain', 'Data Vencimento')
    });
})

