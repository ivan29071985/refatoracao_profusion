/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_123', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
      });

    it('Verificar fluxo de Transferencia entre contas com valores acima da origem', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('button', 'Transferência entre contas').click()
        cy.contains('h6', 'Transferência entre contas bancárias').should('contain.text', 'Transferência entre contas bancárias')
        cy.wait(2000)
        cy.contains('span', 'Transferido de: *', { timeout: 5000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Bancária')]", { timeout: 3000 }).click({ multiple: true })

        cy.xpath("(//div[contains(.,'Para: *')])[8]", { timeout: 3000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Caixa Dinheiro')]", { timeout: 3000 }).click()

        cy.contains('span', 'Tipo operação: *', { timeout: 3000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Transferência no PIX')]").click()

        cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[3]").click()

        cy.wrap(new Date().getDate()).as('currentDay')

        cy.get('@currentDay').then((day) => {
            cy.wait(2000)
            cy.log(`Procurando pelo dia: ${day}`)
            cy.xpath(`(//button[contains(@type,'button') and contains(., '${day}')])[1]`, { timeout: 5000 })
                .should('exist')
                .and('be.visible')
                .then($el => {
                    cy.log(`Elemento encontrado: ${$el.text()}`)
                    cy.wait(2000) // Espera adicional antes do clique
                    // Usar cy.wrap para garantir que estamos trabalhando com um elemento atualizado
                    cy.wrap($el).click({ force: true })
                })
        })

        // Primeiro, garanta que o calendário está visível e carregado
        cy.xpath("//input[contains(@type,'text')]").click();

        // Gera um valor aleatório entre 1 e 500 com duas casas decimais
        const randomValue = (Math.random() * 500 + 1).toFixed(2);

        // Localiza o campo e insere o valor aleatório
        cy.xpath("//input[@type='text']")
            .should('be.visible')
            .clear()  // Limpa o campo antes de digitar
            .type(randomValue)
            .then(() => {
                // Log do valor gerado para debug
                cy.log(`Valor aleatório gerado: ${randomValue}`);
            });

        cy.xpath("//textarea[contains(@formcontrolname,'description')]").type("Aqui vamos colocar algumas palavras para testar esse campo, entre letras e números")

        cy.xpath("//button[@color='primary'][contains(.,'Salvar')]").click()

        cy.contains('O valor da conta Conta Bancária é insuficiente para esta transferência. Deseja continuar?').should('be.visible')

        cy.xpath("//button[@type='button'][contains(.,'Continuar')]").click()

        cy.contains('h2', 'Sucesso').should('be.visible')

        cy.contains('Transferência realizada com sucesso.').should('be.visible')

        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()

    });

    it('Verificar fluxo de Transferencia entre contas ativando o botão Cancelar', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('button', 'Transferência entre contas').click()
        cy.contains('h6', 'Transferência entre contas bancárias').should('contain.text', 'Transferência entre contas bancárias')
        cy.wait(2000)
        cy.contains('span', 'Transferido de: *', { timeout: 5000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Bancária')]", { timeout: 3000 }).click({ multiple: true })

        cy.xpath("(//div[contains(.,'Para: *')])[8]", { timeout: 3000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Caixa Dinheiro')]", { timeout: 3000 }).click()

        cy.contains('span', 'Tipo operação: *', { timeout: 3000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Transferência no PIX')]").click()

        cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[3]").click()

        cy.wrap(new Date().getDate()).as('currentDay')

        cy.get('@currentDay').then((day) => {
            cy.wait(2000)
            cy.log(`Procurando pelo dia: ${day}`)
            cy.xpath(`(//button[contains(@type,'button') and contains(., '${day}')])[1]`, { timeout: 5000 })
                .should('exist')
                .and('be.visible')
                .then($el => {
                    cy.log(`Elemento encontrado: ${$el.text()}`)
                    cy.wait(2000) // Espera adicional antes do clique
                    // Usar cy.wrap para garantir que estamos trabalhando com um elemento atualizado
                    cy.wrap($el).click({ force: true })
                })
        })

        // Primeiro, garanta que o calendário está visível e carregado
        cy.xpath("//input[contains(@type,'text')]").click();

        // Gera um valor aleatório entre 1 e 500 com duas casas decimais
        const randomValue = (Math.random() * 500 + 1).toFixed(2);

        // Localiza o campo e insere o valor aleatório
        cy.xpath("//input[@type='text']")
            .should('be.visible')
            .clear()  // Limpa o campo antes de digitar
            .type(randomValue)
            .then(() => {
                // Log do valor gerado para debug
                cy.log(`Valor aleatório gerado: ${randomValue}`);
            });

        cy.xpath("//textarea[contains(@formcontrolname,'description')]").type("Aqui vamos colocar algumas palavras para testar esse campo, entre letras e números")

        cy.xpath("//button[@color='primary'][contains(.,'Salvar')]").click()

        cy.contains('O valor da conta Conta Bancária é insuficiente para esta transferência. Deseja continuar?').should('be.visible')

        cy.xpath("//button[@type='button'][contains(.,'Cancelar')]").click()

        cy.xpath("//h6[@class='text-primary fs-4 m-0 fw-bold'][contains(.,'Transferência entre contas bancárias')]").should('be.visible')

    });

    it('Verificar fluxo de Transferencia entre contas iguais', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('button', 'Transferência entre contas').click()
        cy.contains('h6', 'Transferência entre contas bancárias').should('contain.text', 'Transferência entre contas bancárias')
        cy.wait(2000)
        cy.contains('span', 'Transferido de: *', { timeout: 5000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Bancária')]", { timeout: 3000 }).click({ multiple: true })

        cy.xpath("(//div[contains(.,'Para: *')])[8]", { timeout: 3000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Bancária')]", { timeout: 3000 }).click({ multiple: true })

        cy.contains('span', 'Tipo operação: *', { timeout: 3000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Transferência no PIX')]").click()

        cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[3]").click()

        cy.wrap(new Date().getDate()).as('currentDay')

        cy.get('@currentDay').then((day) => {
            cy.wait(2000)
            cy.log(`Procurando pelo dia: ${day}`)
            cy.xpath(`(//button[contains(@type,'button') and contains(., '${day}')])[1]`, { timeout: 5000 })
                .should('exist')
                .and('be.visible')
                .then($el => {
                    cy.log(`Elemento encontrado: ${$el.text()}`)
                    cy.wait(2000) // Espera adicional antes do clique
                    // Usar cy.wrap para garantir que estamos trabalhando com um elemento atualizado
                    cy.wrap($el).click({ force: true })
                })
        })

        // Primeiro, garanta que o calendário está visível e carregado
        cy.xpath("//input[contains(@type,'text')]").click();

        // Gera um valor aleatório entre 1 e 500 com duas casas decimais
        const randomValue = (Math.random() * 500 + 1).toFixed(2);

        // Localiza o campo e insere o valor aleatório
        cy.xpath("//input[@type='text']")
            .should('be.visible')
            .clear()  // Limpa o campo antes de digitar
            .type(randomValue)
            .then(() => {
                // Log do valor gerado para debug
                cy.log(`Valor aleatório gerado: ${randomValue}`);
            });

        cy.xpath("//textarea[contains(@formcontrolname,'description')]").type("Aqui vamos colocar algumas palavras para testar esse campo, entre letras e números")

        cy.xpath("//button[@color='primary'][contains(.,'Salvar')]").click()

       
        cy.xpath("//button[@type='button'][contains(.,'Continuar')]").click()

        cy.contains('h2', 'Erro ao fazer a transação').should('be.visible')

        cy.contains('Conta de origem e destino não podem ser iguais').should('be.visible')
    });
});