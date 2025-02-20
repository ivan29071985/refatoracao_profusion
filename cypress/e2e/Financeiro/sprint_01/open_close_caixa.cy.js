/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('Caixa', () => {
    beforeEach(() => {
        // Defina a baseUrl antes de cada teste
        const environment = Cypress.env('environment');
        const baseUrl = environment === 'staging'
            ? Cypress.env('baseUrl').staging
            : Cypress.env('baseUrl').homologacao;
        Cypress.env('currentBaseUrl', baseUrl); // Armazene a baseUrl atual no Cypress.env

        cy.session('login', () => {
            const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
            cy.visit(`${baseUrl}`);
            cy.get('#E-mail').type('ivan.santos+1@amorsaude.com');
            cy.get('#Senha').type('Iv@n198529', { log: false });
            cy.contains('Entrar').click();
            cy.contains('span', ' Unidade Teste / Treinamento ').click();
            cy.contains('button', ' Entrar ').click();
            cy.get('#schedule').should('exist').and('be.visible');
        });
    });

    it('Fluxo de abertura e fechamento de caixa', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('span', 'Caixas').click()

        cy.get('tr td')
            .filter(':contains("Fechado")')
            .filter(function () {
                return Cypress.$(this).text().trim() === 'Fechado'  // verifica se é exatamente "Fechado"
            })
            .first()
            .parents('tr')
            .find('button:contains("Detalhar")')
            .click({ force: true })

        cy.xpath("//button[@color='primary'][contains(.,'Lançar Saldo Inicial')]").click()
        cy.xpath("//input[@name='initialValue']").then($el => {
            const el = $el[0]
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
            nativeInputValueSetter.call(el, '100,00')
            const event = new Event('input', { bubbles: true })
            el.dispatchEvent(event)
        })

        cy.xpath("(//span[contains(.,'Selecione um funcionário')])[2]").click()

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Ivan Santos Automação')]").click()
        cy.contains('button', 'Salvar').click()
        cy.contains('button', 'Ok').click()
        //cy.xpath("//svg[contains(@width,'100%')]")

    });
})

