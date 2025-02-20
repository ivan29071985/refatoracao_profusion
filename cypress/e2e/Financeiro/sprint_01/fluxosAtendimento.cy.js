
/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />

describe('Fluxo Atendimento sem Acolhimento', () => {
    beforeEach(() => {
        const baseUrl = Cypress.env('environment') === 'staging'
            ? Cypress.env('baseUrl').staging
            : Cypress.env('baseUrl').homologacao;

        cy.visit(`${baseUrl}/auth/login`)
        cy.loginDrBarros();
    });

    it('Validar Fluxo de Atendimento Médico sem Acolhimento', () => {
        cy.get('span').contains('Atendimento médico', { timeout: 20000 }).click()
        cy.get('span').contains(' Atender ', { timeout: 20000 }).should('be.visible')
            .first()
            .click();

        cy.get('button').contains('Iniciar atendimento', {timeout:20000} ).click()

        cy.wait(3000)

        cy.contains('h3', ' 1 - Etapa Subjetiva (Anamnese)', {timeout:20000}).click()

        cy.xpath("//textarea[contains(@formcontrolname,'anamnesi_content')]").type('Aqui pode verificar', {timeout:20000})

        cy.wait(3000)
        
        cy.get('button').contains('Finalizar atendimento', {timeout:20000} ).click()

        cy.xpath("//input[contains(@value,'false')]", {timeout:20000} ).click()
        cy.get('button').contains('Avançar', {timeout:20000} ).click()
        cy.get('button').contains(' Finalizar atendimento ', {timeout:20000} ).click()

        const url = Cypress.env('ambiente') === 'staging' 
        ? 'https://amei-staging.amorsaude.com.br/waiting-room-v2/medical-care'
        : 'https://amei-homolog.amorsaude.com.br/waiting-room-v2/medical-care'
      
   
      cy.url().should('include', '/waiting-room-v2/medical-care')

    });
});

