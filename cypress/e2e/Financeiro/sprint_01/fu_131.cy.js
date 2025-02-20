/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_131', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
      });


    it('Validar css Conta Bancária disponível', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()

        
        cy.xpath("//td[@class='col-7 fs-6 d-flex justify-content-start'][contains(.,'Conta Bancária')]").click()
        cy.xpath("//td[@class='col-7 fs-6 d-flex justify-content-start'][contains(.,'Conta Bancária')]").should('have.css', 'color', 'rgba(0, 0, 0, 0.87)')
    });

    it('Validar css Não Tef Pagtodos (Crédito) disponível', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()

        cy.xpath("//td[@class='col-7 fs-6 d-flex justify-content-start'][contains(.,'Não Tef Pagtodos (Crédito)')]").click()
        cy.xpath("//td[@class='col-7 fs-6 d-flex justify-content-start'][contains(.,'Não Tef Pagtodos (Crédito)')]").should('have.css', 'color', 'rgba(0, 0, 0, 0.87)')


    });

    it('Validar css Caixa Dinheiro ao clicar disponível', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()

        cy.xpath("//td[contains(.,'Caixa Dinheiro')]").click()
        cy.xpath("//td[contains(.,'Caixa Dinheiro')]").should('have.css', 'color', 'rgba(0, 0, 0, 0.87)')

    });

    it('Validar título ao selecionar o radio (button) Data de Vencimento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()

        cy.xpath("//input[@id='1']").click()
        cy.contains('div', 'Lançado por Data de Pagamento').should('contain.text', 'Lançado por Data de Pagamento')
    });

    it('Validar título ao selecionar o radio (button) Data da Baixa', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()

        cy.xpath("//input[@id='3']").click()
        cy.contains('div', 'Lançado por Data da Baixa').should('contain.text', 'Lançado por Data da Baixa')
    });

    it('Validar título ao selecionar o radio (button) Data de Vencimento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()

        cy.xpath("//input[@id='2']").click()
        cy.contains('div', 'Lançado por Data de Vencimento').should('contain.text', 'Lançado por Data de Vencimento')
    });

});