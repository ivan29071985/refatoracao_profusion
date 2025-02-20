/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('White-Label', () => {


    it('Cenario xxxx', () => {

        cy.visit('https://white-label-staging.amorsaude.tech/amorsaudewhite-label-front')
        // disponibilizar janela para login e senha
        cy.xpath("//mat-icon[@role='img'][contains(.,'account_circle')]").click()
        // digite seu cpf
        cy.xpath("//mat-label[contains(.,'Digite seu CPF de cadastro')]").type('804.329.240-00')
        // digite sua senha
        cy.xpath("//mat-label[contains(.,'Digite sua senha')]").type('@Amor100')
        //visibilidade da senha
        cy.xpath("//mat-icon[@role='img'][contains(.,'visibility_off')]").click()
        //clique no botão Entrar
        cy.contains('span', 'Entrar').should('be.visible').click()
        //sair da tela agendando consulta
        cy.wait(3000)
        cy.xpath("//div[contains(.,'Agendar Consulta')]").click({force:true})
        // clique em telemedicina
        cy.xpath("//div[@class='flex flex-col items-between gap-3 md:gap-4'][contains(.,'videocamTelemedicina')]").click()
        // clique em particular
        cy.xpath("//div[@class='flex flex-col items-between gap-3 md:gap-4'][contains(.,'paymentParticular')]", { timeout: 10000 }).click()
        //agaurde 2000 ms
        cy.wait(2000)
        //clique em proximo passo
        cy.xpath("//span[@class='uppercase font-semibold'][contains(.,'Próximo passo')]", { timeout: 10000 }).click()
        //selecione area de atuação
        cy.xpath("//input[contains(@placeholder,'Selecione as áreas de atuação')]").click()
        //selecione acupuntura
        cy.xpath("//mat-option[@role='option'][contains(.,'Acupuntura')]").click()
        //selecione abertura do input
        cy.xpath("//input[contains(@placeholder,'Profissional')]").click()
        //selecione profissional
        cy.xpath("//mat-option[@role='option'][contains(.,'Horácio Mello  RQE 123  CRM  5689  - SP')]").click()
        //selcione Mim (radio)
        cy.xpath("//input[contains(@value,'Mim')]").click()
        //selecione botão proximo passo
        cy.xpath("(//span[@class='mat-mdc-button-touch-target'])[4]", { timeout: 10000 }).click({ force: true })

        //função para selecionar um slot

        // Clica no primeiro slot disponível, independente do horário
        cy.xpath("//div[@class='flex items-center px-7 py-1 border border-primary-80 rounded-lg cursor-pointer ng-star-inserted']")
            .first()
            .click();
        //clica no botão proximo passo
        cy.contains('span', 'Próximo passo', {timeout:10000} ).click()
        //clica na 2 opção de checkbox
        cy.xpath("//input[@id='mat-mdc-checkbox-3-input']").click()
        //clica no botão Confirmar
        cy.contains('span', 'Confirmar').click()

        //selecione o nome do paciente e dados do cartao
         let cartao = '4556 2435 5391 4215'
         let vencimento = '07/25'
         let cvc = '637'

        cy.get('#name').type("Ivan Barrps",{timeout:10000} )
        cy.get('#cardNumberField').type(cartao)
        cy.xpath("//mat-label[contains(.,'Vencimento')]").type(vencimento)
        cy.get('#cvvField').type(cvc)
        
        cy.get('.flex-col > .timer > .progress-bar-container').click({force:true})

        cy.contains('span', 'PAGAR AGORA').click()

    });

});