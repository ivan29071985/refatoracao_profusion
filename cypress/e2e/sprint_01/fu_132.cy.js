/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_132', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
    });


    it('Validar input data com mes aleatório', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Royalties').click()

        // Primeiro, definimos um array com todos os meses disponíveis
        const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

        // Função para gerar um índice aleatório
        const mesAleatorio = meses[Math.floor(Math.random() * meses.length)]

        // Clica no botão para abrir o calendário
        cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[1]").click()

        // Seleciona um mês aleatório
        cy.contains('.mat-calendar-body-cell', mesAleatorio)
            .should('be.visible')
            .click()
    });

    it('Validar input unidades com apenas a unidade permitida', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Royalties').click()

        //selecionar o placeholder de unidades

        cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()

        //visualizar telemedicina
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Telemedicina')]").should('be.visible')
        // visualizar unidade teste
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Unidade Teste / Treinamento')]").should('be.visible')
        // visualizar parobe
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'AmorSaúde Parobé')]").should('be.visible')


        cy.contains('button', 'Pesquisar').click()

        // Array com todas as colunas esperadas
        const colunas = [
            'Data',
            'Venda Bruta',
            'Royalties',
            'Splits realizados',
            'Saldo dev. dia',
            'Saldo dev. acum',
            'Transf. contas',
            'Total',
            'Status'
        ]

        // Verifica se cada coluna existe
        colunas.forEach(coluna => {
            cy.contains('th', coluna).should('exist')
        })
    });
});