
/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />

describe('Fluxo Completo no Amei', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
    });

    it.only('Validar Rota da Tela Saldo', () => {
        cy.visit('/');
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Saldo', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance')
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Extrato', () => {
        cy.visit('/');
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Extrato', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/resume-financial') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/resume-financial')
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Contas a pagar', () => {
        cy.visit('/');
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Contas a pagar', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/bills') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/bills')
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Contas a receber', () => {
        cy.visit('/');
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Contas a receber', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/receives') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/receives')
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Cartões', () => {
        cy.visit('/');
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Cartões', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/cards') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/cards')
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Repasse', () => {
        cy.visit('/');
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Repasse', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/new-transfer') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/new-transfer')
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Split', () => {
        cy.visit('/');
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Split', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/splits') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/splits')
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Caixas', () => {
        cy.visit('/');
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Caixas', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/box') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/box')
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Propostas', () => {
        cy.visit('/');
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Propostas', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/proposals') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/proposals')
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Controle de Parcerias', () => {
        cy.visit('/');
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.get('span').contains('Controle de Parcerias', { timeout: 20000 })
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/partnership-charges') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/partnership-charges')
        }, { timeout: 20000 });
    })

    it('Validar Rota da Tela Cadeado', () => {
        cy.visit('/');
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.get('span').contains('Cadeado', { timeout: 20000 })
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/padlock') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/padlock')
        }, { timeout: 20000 });
    })

    it('Validar Rota da Tela Royalties', () => {
        cy.visit('/');
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.get('span').contains('Royalties', { timeout: 20000 })
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/royalties') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/royalties')
        }, { timeout: 20000 });
    })
});


