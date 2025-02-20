/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_133', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
      });

    it('Validar nomenclatura Movimentações Gerais na tela Extrato', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()

        cy.contains('h4', 'Movimentações Gerais').should('contain.text', 'Movimentações Gerais')

        .should(($el) => {
            const computedStyle = window.getComputedStyle($el[0]);
            const borderColor = computedStyle.getPropertyValue('border-color');
            // Aqui você pode verificar o valor exato de RGB que espera
            expect(borderColor).to.match(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
          });
    });

    it('Validar nomenclatura Conta Bancária ao clicar na conta na tela Extrato', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()

        cy.xpath("//td[@class='col-7 fs-6 d-flex justify-content-start'][contains(.,'Conta Bancária')]").click()

        .should(($el) => {
            const computedStyle = window.getComputedStyle($el[0]);
            const borderColor = computedStyle.getPropertyValue('border-color');
            // Aqui você pode verificar o valor exato de RGB que espera
            expect(borderColor).to.match(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
          });

        cy.contains('h4', 'Movimentações Conta Bancária').should('contain.text', 'Movimentações Conta Bancária')
    });

    it('Validar nomenclatura Não Tef Pagtodos (Crédito) ao clicar na conta na tela Extrato', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()

        cy.xpath("//td[@class='col-7 fs-6 d-flex justify-content-start'][contains(.,'Não Tef Pagtodos (Crédito)')]").click()

        .should(($el) => {
            const computedStyle = window.getComputedStyle($el[0]);
            const borderColor = computedStyle.getPropertyValue('border-color');
            // Aqui você pode verificar o valor exato de RGB que espera
            expect(borderColor).to.match(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
          });

        cy.contains('h4', 'Movimentações Não TEF PagTodos (Crédito)').should('contain.text', 'Movimentações Não TEF PagTodos (Crédito)')
    });

    it('Validar nomenclatura Caixa Dinheiro ao clicar na conta na tela Extrato', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()

        cy.xpath("//td[contains(.,'Caixa Dinheiro')]").click()

        .should(($el) => {
            const computedStyle = window.getComputedStyle($el[0]);
            const borderColor = computedStyle.getPropertyValue('border-color');
            // Aqui você pode verificar o valor exato de RGB que espera
            expect(borderColor).to.match(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
          });

        cy.contains('h4', 'Movimentações Caixa Dinheiro').should('contain.text', 'Movimentações Caixa Dinheiro')
    });

});