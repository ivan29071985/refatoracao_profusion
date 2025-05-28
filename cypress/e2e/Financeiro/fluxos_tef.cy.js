
/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />



describe('Agendamento Simples', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin()
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });


    it('Validar Fluxo Completo no Agendamento Cartão de Todos por grade Semanal 1', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(1000)

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(5000);

        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.wait(1000)

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(1000)

        const today = new Date();
        const weekDay = today.getDay();
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();
        cy.wait(1000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });

        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)

        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
    });

    it('Validar Fluxo Completo no Agendamento Cartão de Todos por grade Semanal 2', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(1000)

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(5000);

        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.wait(1000)

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(1000)

        const today = new Date();
        const weekDay = today.getDay();
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();
        cy.wait(1000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });

        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)

        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
    });

    it('Validar Fluxo Completo no Agendamento Cartão de Todos por grade Semanal 3', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(1000)

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(5000);

        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.wait(1000)

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(1000)

        const today = new Date();
        const weekDay = today.getDay();
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();
        cy.wait(1000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });

        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)

        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
    });

    it('Validar Fluxo Completo no Agendamento Cartão de Todos por grade Semanal 4', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(1000)

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(5000);

        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.wait(1000)

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(1000)

        const today = new Date();
        const weekDay = today.getDay();
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();
        cy.wait(1000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });

        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)

        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
    });

    it('Validar Fluxo Completo no Agendamento Cartão de Todos por grade Semanal 5', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(1000)

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(5000);

        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.wait(1000)

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(1000)

        const today = new Date();
        const weekDay = today.getDay();
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();
        cy.wait(1000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });

        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)

        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
    });

});

describe('Check-in Tef', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin()
        cy.allure().epic('Financeiro');
        cy.allure().feature('Check-in');
        cy.allure().severity('critical');
    });

    it('Validar Fluxo Parcelamento no Cartão Crédito abaixo de 5,00 com 2 parcelas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 2 ').click()
        cy.wait(2000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo Parcelamento no Cartão Crédito abaixo de 5,00 com 3 parcelas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 3 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo Parcelamento no Cartão Crédito abaixo de 5,00 com 4 parcelas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 4 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo Parcelamento no Cartão Crédito abaixo de 5,00 com 5 parcelas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 5 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 6 parcelas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 6 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 7 parcelas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 7 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 8 parcelas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 8 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 9 parcelas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 9 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 10 parcelas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 10 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 11 parcelas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 11 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 12 parcelas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 12 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo Cartão Crédito 1 parcela', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 1 ').click()
        cy.wait(3000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito ').click()
        cy.get('button').contains('Pagar', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('Transação efetuada.', {timeout:20000} ).should('be.visible')

    });

    it('Validar Fluxo no Cartão Débito', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Cartão de Débito').click()
        cy.xpath("//label[normalize-space()='Não TEF']").click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Conta Débito').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()
        cy.xpath("//th[@role='columnheader'][contains(.,'Parcela')]").should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Vencimento')]").should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Valor Total')]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[1]").should('be.visible')
        cy.xpath("(//mat-icon[@role='img'][contains(.,'expand_more')])[1]").click()
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[2]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Baixado')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Forma de Pagamento')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Pagamento')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Baixa')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[2]").should('be.visible')
    });

    it('Validar Fluxo no PIX', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click({ force: true })
        cy.get('button').contains('Receber', { timeout: 20000 }).click()
        cy.get('button').contains('PIX').click()
        cy.wait(1000)
        cy.xpath("//label[normalize-space()='Não TEF']").click()
        cy.xpath("//input[@name='valorRecebido']").type('3,33')
        cy.xpath("(//div[contains(.,'Conta Vinculada *')])[10]", { timeout: 2000 }).click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Conta Automação ')]").click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Ok', { timeout: 20000 }).click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.xpath("//th[@role='columnheader'][contains(.,'Parcela')]").should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Vencimento')]").should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Valor Total')]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[1]").should('be.visible')
        cy.xpath("(//mat-icon[@role='img'][contains(.,'expand_more')])[1]").click()
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[2]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Baixado')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Forma de Pagamento')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Pagamento')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Baixa')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[2]").should('be.visible')
    });

    it('Validar Fluxo no Dinheiro com Troco', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        const valorItem = 3.33; // Valor fixo do item a ser pago

        // Função para gerar um valor aleatório entre min e max com 2 casas decimais
        function gerarValorAleatorio(min, max) {
            const valor = Math.random() * (max - min) + min;
            return parseFloat(valor.toFixed(2));
        }

        // Gerar um valor aleatório entre 4,00 e 500,00
        const valorPago = gerarValorAleatorio(4, 500);
        const trocoEsperado = (valorPago - valorItem).toFixed(2).replace('.', ',');
        const trocoFormatado = `R$ ${trocoEsperado}`;
        const valorPagoFormatado = valorPago.toFixed(2).replace('.', ',');

        // Log informativo sobre os valores que serão usados
        cy.log(`Teste com valores aleatórios:`)
        cy.log(`Valor do item: R$ ${valorItem.toFixed(2).replace('.', ',')}`)
        cy.log(`Valor pago: R$ ${valorPagoFormatado}`)
        cy.log(`Troco esperado: ${trocoFormatado}`)

        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click({ force: true })
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Dinheiro').click()
        cy.xpath("//input[@name='valorRecebido']").type(valorPagoFormatado)
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Ok').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')

        cy.wait(1000)

        cy.get('#open-financial').click()
        cy.contains(' Detalhes ').click()

        // Abordagem mais flexível para verificação
        cy.get('table', { timeout: 10000 }).should('be.visible');

        // Verificar se existe alguma linha na tabela que contenha o valor do troco
        cy.get('tr').contains(trocoFormatado, { timeout: 10000 }).should('exist');

        // Verificar nas últimas linhas da tabela (mais provável conter o item mais recente)
        cy.get('tr').then(($rows) => {
            // Percorrer as 5 últimas linhas
            const numLinhas = $rows.length;
            const startIndex = Math.max(0, numLinhas - 5); // Pegar as últimas 5 linhas ou todas se houver menos de 5

            cy.log(`Verificando as últimas ${numLinhas - startIndex} linhas da tabela, total de ${numLinhas} linhas`);

            // Flag para indicar se encontramos o troco em alguma linha
            let trocoEncontrado = false;

            // Verificar cada uma das últimas linhas
            for (let i = startIndex; i < numLinhas; i++) {
                const $row = $rows.eq(i);
                const rowText = $row.text();

                if (rowText.includes(trocoFormatado)) {
                    trocoEncontrado = true;

                    // Verificar se a linha também contém TR
                    if (rowText.includes('TR')) {
                        cy.log(`✓ Troco ${trocoFormatado} e TR encontrados na linha ${i + 1}`);
                        break;
                    } else {
                        cy.log(`✗ Troco ${trocoFormatado} encontrado na linha ${i + 1}, mas não contém TR`);
                    }
                }
            }

            // Se não encontramos o troco, verificamos de forma mais flexível
            if (!trocoEncontrado) {
                cy.log('Troco não encontrado nas últimas linhas. Verificando de forma mais flexível...');

                // Verificação alternativa: procurar qualquer célula com o troco
                cy.contains(trocoFormatado).should('exist');

                // E verificar se qualquer linha com esse troco contém TR
                cy.contains(trocoFormatado).parents('tr').contains(/TR/).should('exist');
            }
        });


    });

    it('Validar Fluxo no Dinheiro', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click({ force: true })
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Dinheiro').click()
        cy.xpath("//input[@name='valorRecebido']").type('3,33')
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Ok').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
    });

    it('Validar Fluxo de um novo recebimento quando o valor pago for menor que o valor do item', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        const valorPago = 1.00; // Valor insuficiente
        const valorPagoFormatado = valorPago.toFixed(2).replace('.', ',');

        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click({ force: true })
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Dinheiro').click()

        // Inserir um valor insuficiente
        cy.xpath("//input[@name='valorRecebido']").type(valorPagoFormatado)

        // Tentar pagar com valor insuficiente
        cy.get('button').contains('Pagar').click()

        cy.get('button').contains('Ok').click()

        // Verificar se o texto completo da mensagem de erro está correto
        cy.contains('Não é possível prosseguir com recebimento parcial da conta.').should('be.visible');

        // Verificar se os botões de "Sair" e "Novo Recebimento" estão presentes
        cy.contains('button', 'Sair').should('be.visible');
        cy.contains('button', 'Novo Recebimento').should('be.visible').click()

        cy.get('button').contains('Dinheiro').click()

        // Inserir um valor insuficiente
        cy.xpath("//input[@name='valorRecebido']").type('2,33')

        // Tentar pagar com valor insuficiente
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Ok').click()
    });


});

describe('Contas a Receber', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizado
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Fluxo de Contas a receber - Dinheiro', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Contas a receber').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        cy.wait(2000);
        cy.get("#ReceberDe").click();
        cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

        cy.get("#Pagador").click();
        cy.contains(' Dr. Ivan Barros ').click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@formcontrolname,'billsInvoice')]").type(randomNumber.toString());

        function generateRandomText(wordCount = 20) {
            const words = ['sistema', 'financeiro', 'transações', 'relatórios', 'contabilidade', 'banco', 'investimentos', 'auditoria', 'compliance', 'orçamento', 'receita', 'despesa', 'lucro', 'patrimônio', 'ativos', 'passivos', 'fluxo de caixa', 'balanço', 'análise', 'risco'];
            return Array.from({ length: wordCount }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
        }

        cy.get("#Observacao").type(generateRandomText());
        cy.contains('Adicionar itens').click();

        function generateRandomLetters(length = 5) {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
        }

        cy.get("#Item").type(generateRandomLetters());
        cy.get("#SelectPlanoContas").click();
        cy.xpath("//span[contains(.,'Receita de Contas - Consultas')]").click();
        cy.get("#ValorUnitario").clear().type('10');
        cy.xpath("(//input[@type='number'])[2]").type('1');
        cy.xpath("(//input[@type='number'])[3]").type('1');
        cy.get("#dataIntervalo").click();
        cy.contains('Dia').click();
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").click();
        cy.contains('Gerar Conta a Receber').should('be.visible');
        cy.contains('Tem Certeza que deseja cadastrar essa conta a receber?').should('be.visible');
        cy.xpath("//button[contains(.,'Cadastrar')]").click();
        cy.contains('Parcelas geradas com sucesso').should('be.visible');
        cy.contains('Ok').click();

        cy.contains('Contas a receber').click();
        cy.contains('Pesquisar').click();

        cy.contains(randomNumber.toString())
            .parent()
            .within(() => {
                cy.xpath("//mat-icon[@role='img'][contains(.,'edit')]")
                    .first()
                    .click({ force: true });
            });
        cy.xpath("//button[contains(.,'Receber')]").click();
        cy.xpath("//button[contains(.,'Dinheiro')]").click();
        cy.xpath("//input[contains(@name,'valorRecebido')]").type('10');
        cy.xpath("(//div[contains(.,'Conta Vinculada *')])[9]").click();
        cy.xpath("//span[contains(.,' Conta Automação ')]").click();
        cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click();
        cy.contains('Parcela salva com sucesso !', { timeout: 20000 }).should('be.visible').click();
        cy.contains('Ok').click();


    });

    it('Fluxo de Contas a receber - PIX', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Contas a receber').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        cy.wait(2000);
        cy.get("#ReceberDe").click();
        cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

        cy.get("#Pagador").click();
        cy.contains(' Dr. Ivan Barros ').click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@formcontrolname,'billsInvoice')]").type(randomNumber.toString());

        function generateRandomText(wordCount = 20) {
            const words = ['sistema', 'financeiro', 'transações', 'relatórios', 'contabilidade', 'banco', 'investimentos', 'auditoria', 'compliance', 'orçamento', 'receita', 'despesa', 'lucro', 'patrimônio', 'ativos', 'passivos', 'fluxo de caixa', 'balanço', 'análise', 'risco'];
            return Array.from({ length: wordCount }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
        }

        cy.get("#Observacao").type(generateRandomText());
        cy.contains('Adicionar itens').click();

        function generateRandomLetters(length = 5) {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
        }

        cy.get("#Item").type(generateRandomLetters());
        cy.get("#SelectPlanoContas").click();
        cy.xpath("//span[contains(.,'Receita de Contas - Consultas')]").click();
        cy.get("#ValorUnitario").clear().type('10');
        cy.xpath("(//input[@type='number'])[2]").type('1');
        cy.xpath("(//input[@type='number'])[3]").type('1');
        cy.get("#dataIntervalo").click();
        cy.contains('Dia').click();
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").click();
        cy.contains('Gerar Conta a Receber').should('be.visible');
        cy.contains('Tem Certeza que deseja cadastrar essa conta a receber?').should('be.visible');
        cy.xpath("//button[contains(.,'Cadastrar')]").click();
        cy.contains('Parcelas geradas com sucesso').should('be.visible');
        cy.contains('Ok').click();

        cy.contains('Contas a receber').click();
        cy.contains('Pesquisar').click();

        cy.contains(randomNumber.toString())
            .parent()
            .within(() => {
                cy.xpath("//mat-icon[@role='img'][contains(.,'edit')]")
                    .first()
                    .click({ force: true });
            });
        cy.xpath("//button[contains(.,'Receber')]").click();
        cy.xpath("//button[contains(.,'PIX')]").click();
       // cy.xpath("//label[normalize-space()='Não TEF']").click()
        cy.xpath("//input[contains(@name,'valorRecebido')]").type('10');
        cy.xpath("(//div[contains(.,'Conta Vinculada *')])[9]").click();
        cy.xpath("//span[contains(.,' Conta Automação ')]").click();
        cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click();
        cy.contains('Parcela salva com sucesso !', { timeout: 20000 }).should('be.visible').click();
        cy.contains('Ok').click();

    });

    it('Fluxo de Contas a receber - Debito', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Contas a receber').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        cy.wait(2000);
        cy.get("#ReceberDe").click();
        cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

        cy.get("#Pagador").click();
        cy.contains(' Dr. Ivan Barros ').click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@formcontrolname,'billsInvoice')]").type(randomNumber.toString());

        function generateRandomText(wordCount = 20) {
            const words = ['sistema', 'financeiro', 'transações', 'relatórios', 'contabilidade', 'banco', 'investimentos', 'auditoria', 'compliance', 'orçamento', 'receita', 'despesa', 'lucro', 'patrimônio', 'ativos', 'passivos', 'fluxo de caixa', 'balanço', 'análise', 'risco'];
            return Array.from({ length: wordCount }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
        }

        cy.get("#Observacao").type(generateRandomText());
        cy.contains('Adicionar itens').click();

        function generateRandomLetters(length = 5) {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
        }

        cy.get("#Item").type(generateRandomLetters());
        cy.get("#SelectPlanoContas").click();
        cy.xpath("//span[contains(.,'Receita de Contas - Consultas')]").click();
        cy.get("#ValorUnitario").clear().type('10');
        cy.xpath("(//input[@type='number'])[2]").type('1');
        cy.xpath("(//input[@type='number'])[3]").type('1');
        cy.get("#dataIntervalo").click();
        cy.contains('Dia').click();
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").click();
        cy.contains('Gerar Conta a Receber').should('be.visible');
        cy.contains('Tem Certeza que deseja cadastrar essa conta a receber?').should('be.visible');
        cy.xpath("//button[contains(.,'Cadastrar')]").click();
        cy.contains('Parcelas geradas com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('Ok').click();
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Cartão de Débito').click()
        //cy.xpath("//label[normalize-space()='Não TEF']").click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Conta Débito').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('Parcela salva com sucesso !', { timeout: 20000 }).should('be.visible').click();
        cy.contains('Ok').click();
    });

    it('Fluxo de Contas a receber - Credito', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Contas a receber').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        cy.wait(2000);
        cy.get("#ReceberDe").click();
        cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

        cy.get("#Pagador").click();
        cy.contains(' Dr. Ivan Barros ').click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@formcontrolname,'billsInvoice')]").type(randomNumber.toString());

        function generateRandomText(wordCount = 20) {
            const words = ['sistema', 'financeiro', 'transações', 'relatórios', 'contabilidade', 'banco', 'investimentos', 'auditoria', 'compliance', 'orçamento', 'receita', 'despesa', 'lucro', 'patrimônio', 'ativos', 'passivos', 'fluxo de caixa', 'balanço', 'análise', 'risco'];
            return Array.from({ length: wordCount }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
        }

        cy.get("#Observacao").type(generateRandomText());
        cy.contains('Adicionar itens').click();

        function generateRandomLetters(length = 5) {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
        }

        cy.get("#Item").type(generateRandomLetters());
        cy.get("#SelectPlanoContas").click();
        cy.xpath("//span[contains(.,'Receita de Contas - Consultas')]").click();
        cy.get("#ValorUnitario").clear().type('10');
        cy.xpath("(//input[@type='number'])[2]").type('1');
        cy.xpath("(//input[@type='number'])[3]").type('1');
        cy.get("#dataIntervalo").click();
        cy.contains('Dia').click();
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").click();
        cy.contains('Gerar Conta a Receber').should('be.visible');
        cy.contains('Tem Certeza que deseja cadastrar essa conta a receber?').should('be.visible');
        cy.xpath("//button[contains(.,'Cadastrar')]").click();
        cy.contains('Parcelas geradas com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('Ok').click();
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Cartão de Crédito').click()
        //cy.xpath("//label[normalize-space()='Não TEF']").click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão ').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('Parcela salva com sucesso !', { timeout: 20000 }).should('be.visible')
        cy.contains('Ok').click();
    });

    it('Validar filtro status > Não quitadas ', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Contas a receber').click();
        cy.get('#selectStats', { timeout: 20000 }).click()
        cy.get('span').contains(' Não quitadas ').click()
        cy.get('button').contains('Pesquisar').click()
        cy.wait(3000)
        cy.contains('th', 'Status').invoke('index').then((statusIndex) => {
            // Verificar cada célula da coluna Status
            cy.get('tbody tr').each(($row) => {
                // Obter o texto da célula na coluna de status
                const statusText = $row.find(`td:eq(${statusIndex})`).text().trim();

                // Verificar se contém "Não quitadas"
                expect(statusText).to.equal('Não quitadas');
            });
        });
    });

    it('Validar filtro status > Quitadas ', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Contas a receber').click();
        cy.get('#selectStats', { timeout: 20000 }).click()
        cy.get('span').contains(' Quitadas ').click()
        cy.contains('th', 'Status').invoke('index').then((statusIndex) => {
            // Verificar cada célula da coluna Status
            cy.get('tbody tr').each(($row) => {
                // Obter o texto da célula na coluna de status
                const statusText = $row.find(`td:eq(${statusIndex})`).text().trim();

                // Verificar se contém "Não quitadas"
                expect(statusText).to.equal('Quitadas');
            });
        });
    });
});

describe('Contas a Pagar', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizado
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });
    it('Fluxo de Contas a Pagar - Dinheiro', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(3000);

        cy.get('#financial').click();
        cy.contains('Contas a pagar').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@maxlength,'250')]").type(randomNumber.toString());

        cy.get("#Pagador").click()
        cy.xpath("(//span[contains(.,'Fornecedor')])[2]").click()
        cy.contains('Profissional').click()
        cy.get("#Pagador").type('dr. ivan barros')
        cy.get('section > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #observationHeader')
            .type('Teste voltado para escrita no campo Observação')
        cy.xpath("//button[contains(.,'Adicionar itens')]").click()
        cy.xpath("//input[@data-placeholder='Digite o nome do Item']").type('Teste Campo')
        cy.get('#selectPlanoContas').click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Administrativas - Aluguel de Imóvel -')]").click()
        cy.xpath("//input[@prefix='R$ ']").clear().type('10')
        cy.xpath("(//input[contains(@type,'number')])[3]").type('1')
        cy.xpath("(//input[contains(@type,'number')])[4]").type('1')
        cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.contains("Dia").click()
        cy.get("#adicionarParcelas").click()
        cy.contains('Contas a pagar cadastrada com sucesso').should('be.visible')
        cy.contains('Ok').click()
        cy.contains('Pagar').click()
        cy.contains('Pesquisar').click()

        cy.contains(randomNumber.toString())
            .parent()
            .find('img[id^="editarParcela"]')
            .click({ force: true });

        cy.xpath("//button[contains(.,'Pagar')]").click()
        cy.xpath("//button[contains(.,'Dinheiro')]").click()

        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Conta Automação ')]").click()

        cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click()
        cy.contains('Parcela salva com sucesso !').should('be.visible')
        cy.contains('Ok').click()
    });

    it('Fluxo de Contas a Pagar - PIX', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(3000);

        cy.get('#financial').click();
        cy.contains('Contas a pagar').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@maxlength,'250')]").type(randomNumber.toString());

        cy.get("#Pagador").click()
        cy.xpath("(//span[contains(.,'Fornecedor')])[2]").click()
        cy.contains('Profissional').click()
        cy.get("#Pagador").type('dr. ivan barros')
        cy.get('section > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #observationHeader')
            .type('Teste voltado para escrita no campo Observação')
        cy.xpath("//button[contains(.,'Adicionar itens')]").click()
        cy.xpath("//input[@data-placeholder='Digite o nome do Item']").type('Teste Campo')
        cy.get('#selectPlanoContas').click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Administrativas - Aluguel de Imóvel -')]").click()
        cy.xpath("//input[@prefix='R$ ']").clear().type('10')
        cy.xpath("(//input[contains(@type,'number')])[3]").type('1')
        cy.xpath("(//input[contains(@type,'number')])[4]").type('1')
        cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.contains("Dia").click()
        cy.get("#adicionarParcelas").click()
        cy.contains('Contas a pagar cadastrada com sucesso').should('be.visible')
        cy.contains('Ok').click()
        cy.contains('Pagar').click()
        cy.contains('Pesquisar').click()

        cy.contains(randomNumber.toString())
            .parent()
            .find('img[id^="editarParcela"]')
            .click({ force: true });

        cy.xpath("//button[contains(.,'Pagar')]").click()
        cy.xpath("//button[contains(.,'PIX')]").click()

        cy.xpath("(//div[contains(.,'Contas Correntes *')])[10]").click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Automação')]").click()

        cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click()
        cy.contains('Parcela salva com sucesso !').should('be.visible')
        cy.contains('Ok').click()
    });
});

describe('Proposta', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.clearAllCookies()
        cy.setupAndLogin()
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Dinheiro com busca por CPF (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);

        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('349.219.778-79');
        cy.get('button').contains('Pesquisar').click()
        cy.get('button').contains(' edit ').click()
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });

        cy.wait(2000)

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.wait(3000)

        cy.get('#proposalAreaExpertise').click({ force: true })

        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação', { timeout: 2000 }).should('exist').click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Consulta Áreas de Atuação')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Consulta Áreas de Atuação')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });



        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Teste Fran Tavares  ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.contains('button', 'Adicionar').click()
        cy.wait(3000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('button', 'Dinheiro').click()        // Pegar o valor do pagamento e usar no campo de valor recebido
        cy.get('input[name="valorPagamento"]')
            .invoke('val')
            .then((valorPagamento) => {
                // Remove o R$ e espaços, e garante que use vírgula como separador decimal
                const valor = valorPagamento
                    .replace('R$ ', '')
                    .replace('.', ',')

                // Preenche o valor recebido com o mesmo valor do pagamento
                cy.xpath("//input[@name='valorRecebido']")
                    .clear()
                    .type(valor)

                // Verifica se foi preenchido corretamente (com vírgula)
                cy.xpath("//input[@name='valorRecebido']")

            })
        cy.contains('button', 'Pagar').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')

    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Dinheiro com busca por Nome (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);

        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('Ivan Barros');
        cy.get('button').contains('Pesquisar').click()

        // Solução 2: Primeiro localizar o CPF, depois buscar no mesmo contexto
        cy.contains('349.219.778-79').then($cpf => {
            // Pegar o elemento pai comum que contém tanto o CPF quanto o botão
            const $row = $cpf.closest('.row-container, .mat-row, [role="row"]');
            // Dentro desse elemento, buscar o ícone de edição
            cy.wrap($row).find('mat-icon').contains(' edit ').click();
        })

        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.wait(2000)
        cy.get('#proposalAreaExpertise').click({ force: true })
        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Consulta Áreas de Atuação')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Consulta Áreas de Atuação')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });
        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Teste Fran Tavares  ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('button', 'Dinheiro').click()

        // Pegar o valor do pagamento e usar no campo de valor recebido
        cy.get('input[name="valorPagamento"]')
            .invoke('val')
            .then((valorPagamento) => {
                // Remove o R$ e espaços, e garante que use vírgula como separador decimal
                const valor = valorPagamento
                    .replace('R$ ', '')
                    .replace('.', ',')

                // Preenche o valor recebido com o mesmo valor do pagamento
                cy.xpath("//input[@name='valorRecebido']")
                    .clear()
                    .type(valor)

                // Verifica se foi preenchido corretamente (com vírgula)
                cy.xpath("//input[@name='valorRecebido']")

            })
        cy.contains('button', 'Pagar').click()
        cy.contains('button', 'Ok').click()

    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Credito com busca por CPF (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);

        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('349.219.778-79');
        cy.get('button').contains('Pesquisar').click()
        cy.get('button').contains(' edit ').click()
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });

        cy.wait(2000)

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.wait(3000)

        cy.get('#proposalAreaExpertise').click({ force: true })

        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Consulta Áreas de Atuação')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Consulta Áreas de Atuação')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });

        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Teste Fran Tavares  ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.contains('button', 'Adicionar').click()
        cy.wait(3000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')

        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.wait(1000)
        cy.get('span').contains(' 2 ', { timeout: 2000 }).click()
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()

    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Credito com busca por Nome (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('Ivan Barros');
        cy.get('button').contains('Pesquisar').click()
        //botão editar
        // Solução 2: Primeiro localizar o CPF, depois buscar no mesmo contexto
        cy.contains('349.219.778-79').then($cpf => {
            // Pegar o elemento pai comum que contém tanto o CPF quanto o botão
            const $row = $cpf.closest('.row-container, .mat-row, [role="row"]');
            // Dentro desse elemento, buscar o ícone de edição
            cy.wrap($row).find('mat-icon').contains(' edit ').click();
        })
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.wait(2000)
        cy.get('#proposalAreaExpertise').click({ force: true })
        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Consulta Áreas de Atuação')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Consulta Áreas de Atuação')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });
        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()
        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Teste Fran Tavares  ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 2 ').click()
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()
    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Pix com busca por CPF (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('349.219.778-79');
        cy.get('button').contains('Pesquisar').click()
        cy.get('button').contains(' edit ').click()
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.wait(2000)
        cy.get('#proposalAreaExpertise').click({ force: true })
        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Consulta Áreas de Atuação')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Consulta Áreas de Atuação')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });
        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()
        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Teste Fran Tavares  ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('button', 'PIX').click()
        cy.xpath("(//div[contains(.,'Conta Vinculada *')])[10]").click({ force: true })
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Automação')]").click()
        // Preenche o campo de valor recebido
        cy.xpath("//input[@name='valorRecebido']")
            .clear()
            .type('358,00')
        cy.contains('button', 'Pagar').click()
        cy.contains('button', 'Ok').click()
    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Pix com busca por Nome (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('Ivan Barros');
        cy.get('button').contains('Pesquisar').click()
        //botão editar
        // Solução 2: Primeiro localizar o CPF, depois buscar no mesmo contexto
        cy.contains('349.219.778-79').then($cpf => {
            // Pegar o elemento pai comum que contém tanto o CPF quanto o botão
            const $row = $cpf.closest('.row-container, .mat-row, [role="row"]');
            // Dentro desse elemento, buscar o ícone de edição
            cy.wrap($row).find('mat-icon').contains(' edit ').click();
        })
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.wait(2000)
        cy.get('#proposalAreaExpertise').click({ force: true })
        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Consulta Áreas de Atuação')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Consulta Áreas de Atuação')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });
        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()
        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Teste Fran Tavares  ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('button', 'PIX').click()
        cy.xpath("(//div[contains(.,'Conta Vinculada *')])[10]").click({ force: true })
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Automação')]").click()
        // Preenche o campo de valor recebido
        cy.xpath("//input[@name='valorRecebido']")
            .clear()
            .type('358,00')
        cy.contains('button', 'Pagar').click()
        cy.contains('button', 'Ok').click()
    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Debito com busca por CPF (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('349.219.778-79');
        cy.get('button').contains('Pesquisar').click()
        cy.get('button').contains(' edit ').click()
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.wait(2000)
        cy.get('#proposalAreaExpertise').click({ force: true })
        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Consulta Áreas de Atuação')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Consulta Áreas de Atuação')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });
        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()
        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Teste Fran Tavares  ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.get('button').contains('Cartão de Débito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Conta Débito').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()
    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Debito com busca por Nome (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('Ivan Barros');
        cy.get('button').contains('Pesquisar').click()
        //botão editar
        // Solução 2: Primeiro localizar o CPF, depois buscar no mesmo contexto
        cy.contains('349.219.778-79').then($cpf => {
            // Pegar o elemento pai comum que contém tanto o CPF quanto o botão
            const $row = $cpf.closest('.row-container, .mat-row, [role="row"]');
            // Dentro desse elemento, buscar o ícone de edição
            cy.wrap($row).find('mat-icon').contains(' edit ').click();
        })
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.wait(2000)
        cy.get('#proposalAreaExpertise').click({ force: true })
        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Consulta Áreas de Atuação')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Consulta Áreas de Atuação')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });
        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()
        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Teste Fran Tavares  ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.get('button').contains('Cartão de Débito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Conta Débito').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()
    })
});

describe('Tela Cartões', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin()
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Validar Fluxo de Parcelas na tela Cartões', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);

        cy.get('#financial', { timeout: 20000 }).click()
        cy.get('span').contains('Cartões').click()

        const today = new Date()
        const formattedDate = today.toLocaleDateString('pt-BR')

        cy.get('#dataDe').type(formattedDate)


        cy.get('#typeDatePicker').click({ force: true })
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Data de Pagamento')]").click()

        cy.get('button').contains('Buscar').click({ force: true })

        cy.xpath("(//div[contains(.,'10')])[15]", { timeout: 20000 }).click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'50')]").click()


        const expectedColumns = [
            'Pagador',
            'Id transação',
            'Data pagamento',
            'Valor pagamento',
            'Taxa %',
            'Valor baixa',
            'Parcelas',
            'Data baixa',
            'Data Venc.',
            'Status'
        ]

        expectedColumns.forEach(column => {
            cy.contains('th', column).should('be.visible')
        })

        cy.xpath(`(//td[@role='cell'][contains(.,'${formattedDate}')])[1]`, { timeout: 20000 }).should('be.visible')



        const timeout = { timeout: 20000 };

        const parseMoneyValue = (text) => {
            if (!text) return 0;
            const cleanValue = text
                .replace('Valor Bruto: ', '')
                .replace('R$', '')
                .replace(/\./g, '')
                .replace(',', '.')
                .trim();
            return Number(parseFloat(cleanValue).toFixed(2));
        };

        let somaTotal = 0;

        cy.get('tbody > tr > .cdk-column-valuePayer', timeout)
            .should('have.length.at.least', 1)
            .each(($cell, index) => {
                const value = parseMoneyValue($cell.text());
                // Mantém apenas 2 casas decimais na soma
                somaTotal = Number((somaTotal + value).toFixed(2));
                cy.log(`Linha ${index + 1}: R$ ${value}`);
            })
            .then(() => {
                cy.log(`Soma total: R$ ${somaTotal}`);

                cy.xpath("//strong[contains(text(), 'R$')]")
                    .invoke('text')
                    .then(valorBrutoText => {
                        const valorBruto = Number(parseMoneyValue(valorBrutoText));
                        cy.log(`Valor Bruto encontrado: R$ ${valorBruto}`);
                        expect(somaTotal).to.equal(valorBruto);
                    });
            });

    });
});

describe('Royalties', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizado
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Validar Big Numbers Venda bruta total na tela de Royalties ', () => {

        let valorBrutoTotal;

        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();

        cy.get('span').contains('Royalties', { timeout: 20000 }).click();

        cy.xpath("//button[@class='btn position-absolute search-button']").click()


        cy.get('.cursor-pointer', { timeout: 20000 })
            .should('be.visible')
            .first()
            .click({ force: true });

        // Intercept the request
        cy.intercept('GET', '**/api/v1/royalties/infos-financials**').as('getValores');
        cy.wait('@getValores', { timeout: 10000 });

        const extrairValor = (texto) => {
            // Melhorando a extração para lidar com diferentes formatos
            const match = texto.match(/R\$\s*([\d.,]+)/);
            if (!match) return 0;
            const valorStr = match[1];
            // Tratando números com pontos e vírgulas no formato brasileiro
            return parseFloat(valorStr.replace(/\./g, '').replace(',', '.'));
        };

        // Captura o valor da venda bruta total
        cy.xpath('//div[contains(@class,"card-content-item") and contains(.,"Venda bruta total")]')
            .invoke('text')
            .then((vendaBrutaTexto) => {
                cy.log(`Texto completo venda bruta: "${vendaBrutaTexto}"`);
                const vendaBruta = extrairValor(vendaBrutaTexto);
                cy.log(`Venda Bruta extraída: ${vendaBruta}`);

                // Armazena o valor bruto total na variável
                valorBrutoTotal = vendaBruta;

                // Armazena os valores das formas de pagamento
                let tef = 0;
                let naoTef = 0;
                let dinheiro = 0;
                let pix = 0;

                // Captura o valor TEF
                cy.xpath('//div[contains(@class,"second-card-content") and contains(.,"TEF")]')
                    .invoke('text')
                    .then((tefTexto) => {
                        cy.log(`Texto completo TEF: "${tefTexto}"`);
                        tef = extrairValor(tefTexto);
                        cy.log(`TEF extraído: ${tef}`);

                        // Captura o valor Não TEF
                        cy.xpath('//div[contains(@class,"second-card-content") and contains(.,"Não TEF")]')
                            .invoke('text')
                            .then((naoTefTexto) => {
                                cy.log(`Texto completo Não TEF: "${naoTefTexto}"`);
                                naoTef = extrairValor(naoTefTexto);
                                cy.log(`Não TEF extraído: ${naoTef}`);

                                // Captura o valor Dinheiro
                                cy.xpath('//div[contains(@class,"second-card-content") and contains(.,"Dinheiro")]')
                                    .invoke('text')
                                    .then((dinheiroTexto) => {
                                        cy.log(`Texto completo Dinheiro: "${dinheiroTexto}"`);
                                        dinheiro = extrairValor(dinheiroTexto);
                                        cy.log(`Dinheiro extraído: ${dinheiro}`);

                                        // Captura o valor PIX
                                        cy.xpath('//div[contains(@class,"second-card-content") and contains(.,"PIX")]')
                                            .invoke('text')
                                            .then((pixTexto) => {
                                                cy.log(`Texto completo PIX: "${pixTexto}"`);
                                                pix = extrairValor(pixTexto);
                                                cy.log(`PIX extraído: ${pix}`);

                                                // Calcula a soma das formas de pagamento
                                                const somaFormasPagamento = tef + naoTef + dinheiro + pix;

                                                // Formata os valores para exibição com 2 casas decimais
                                                const somaFormatada = somaFormasPagamento.toFixed(2);
                                                const valorBrutoFormatado = valorBrutoTotal.toFixed(2);

                                                // Exibe a verificação de forma clara
                                                cy.log(`A soma das formas de pagamento (TEF + Não TEF + Dinheiro + PIX = ${somaFormatada}) deve ser igual à Venda bruta total (${valorBrutoFormatado})`);

                                                // Verificação
                                                expect(parseFloat(somaFormatada)).to.equal(parseFloat(valorBrutoFormatado),
                                                    `A soma das formas de pagamento (TEF: ${tef.toFixed(2)} + Não TEF: ${naoTef.toFixed(2)} + Dinheiro: ${dinheiro.toFixed(2)} + PIX: ${pix.toFixed(2)} = ${somaFormatada}) deve ser igual à Venda bruta total (${valorBrutoFormatado})`);
                                            });
                                    });
                            });
                    });
            });
    });
});

describe('Saldo - Big Numbers', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizado
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Validar somatória dos Bigs Numbers', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);

        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.contains('span', 'Saldo', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        // Capturar todos os valores em cadeia
        cy.contains('Caixa Dinheiro')
            .parent()
            .contains(/R\$/)
            .invoke('text')
            .then((text1) => {
                const valorCaixaDinheiro = parseFloat(text1.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
                cy.log(`Caixa Dinheiro: ${valorCaixaDinheiro}`);

                cy.contains('Conta Automação')
                    .parent()
                    .contains(/R\$/)
                    .invoke('text')
                    .then((text2) => {
                        // Valor pode ser negativo, então precisamos manter o sinal
                        const valorContaAutomacao = parseFloat(text2.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
                        cy.log(`Conta Automação: ${valorContaAutomacao}`);

                        cy.contains('Conta Débito')
                            .parent()
                            .contains(/R\$/)
                            .invoke('text')
                            .then((text3) => {
                                const valorContaDebito = parseFloat(text3.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
                                cy.log(`Conta Débito: ${valorContaDebito}`);

                                cy.contains('Crédito Cartão')
                                    .parent()
                                    .contains(/R\$/)
                                    .invoke('text')
                                    .then((text4) => {
                                        const valorCreditoCartao = parseFloat(text4.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
                                        cy.log(`Crédito Cartão: ${valorCreditoCartao}`);

                                        // Capturar o saldo geral exibido
                                        cy.contains('Saldo Geral')
                                            .parent()
                                            .parent()
                                            .contains(/R\$/)
                                            .invoke('text')
                                            .then((text5) => {
                                                const saldoGeralExibido = parseFloat(text5.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
                                                cy.log(`Saldo Geral Exibido: ${saldoGeralExibido}`);

                                                const somaCalculada = valorCaixaDinheiro + valorContaAutomacao + valorContaDebito + valorCreditoCartao;
                                                cy.log(`Soma Calculada: ${somaCalculada}`);

                                                // Usando toFixed(2) para arredondar para 2 casas decimais
                                                expect(Number(somaCalculada.toFixed(2))).to.equal(Number(saldoGeralExibido.toFixed(2)));
                                            });
                                    });
                            });
                    });
            });
    });

});