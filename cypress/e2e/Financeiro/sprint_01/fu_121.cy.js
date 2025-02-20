/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_121', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
      });

    it('Verificar button Transferência entre contas', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#financial', { timeout: 1000 }).click();
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('button', 'Transferência entre contas').should('contain.text', 'Transferência entre contas')

        cy.request('https://amei-homolog.amorsaude.com.br/financial/resume-financial').then((response) => {
            expect(response.status).to.equal(200)
        })
    });

    it('Verificar button Exportar lançamentos', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);

        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ', { timeout: 10000 }).click()

        // Rolar a tela para baixo
        cy.scrollTo('bottom', { duration: 1000 });
        cy.scrollTo('bottom', { duration: 1000 });
        cy.get('.mat-select-arrow-wrapper').click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'100')]").click()
        cy.contains('button', 'Exportar lançamentos').should('contain.text', 'Exportar lançamentos').click()

        cy.request('https://amei-homolog.amorsaude.com.br/financial/resume-financial').then((response) => {
            expect(response.headers['content-type']).to.equal('text/html')
        })

        const path = require('path')

        cy.readFile(path.join('cypress/downloads', 'lancamentos-financeiros.xlsx')).should('exist')
    });

});