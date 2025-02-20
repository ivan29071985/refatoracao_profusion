/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_24', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar fluxo de parcelamento no Check-in com parcelamento acima de 5 reais nas parcelas', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);

    cy.get("#schedule", { timeout: 10000 }).click()
    cy.contains('span', 'Check-in').click()


    cy.wait(3000)

    cy.xpath("(//div[contains(.,'5')])[18]").click()
    cy.xpath("//span[contains(.,'50')]").click()

    cy.xpath("//input[@formcontrolname='patient']")
      .type('Ivan Barros', { timeout: 1000 })


    cy.xpath("//span[@class='mat-option-text'][contains(.,'Ivan Barros - 34921977879')]").click()

    cy.contains('button', 'Filtrar').click()

    cy.xpath("//tr[1]//button[@class='mat-ripple btn']").click()

    cy.contains("button", 'Receber').click()

    // Verifica a presença dos botões de pagamento
    cy.contains('button', 'Cartão de Crédito').should('be.visible')
    cy.contains('button', 'Cartão de Débito').should('be.visible')
    cy.contains('button', 'Dinheiro').should('be.visible')
    cy.contains('button', 'PIX').should('be.visible')

    // Ou verifica o título "Receber"
    cy.contains(' Receber ').should('be.visible')

    cy.contains('button', 'Cartão de Crédito').click()

    // Verifica o título da tela
    cy.contains('Receber por Cartão de Crédito').should('be.visible')

    // Verifica elementos característicos do formulário
    cy.xpath("(//label[@class='mdc-label'][contains(.,'TEF')])[1]").should('be.visible') // Radio Tef
    cy.contains('Não TEF').should('be.visible') // Radio Não Tef

    // Primeiro clica no seletor de parcelas
    cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").should('be.visible').click()

    // Depois verifica se existem as opções de 1 a 12     
    cy.get('mat-option').should('have.length', 12) // Verifica se tem 12 opções      

    // Verifica cada opção individualmente     
    for (let i = 1; i <= 12; i++) {
      cy.contains('mat-option', `${i}`).should('exist')
    }      



    // Clica na opção aleatória
    cy.contains('mat-option', '3').click()

    cy.xpath("//input[contains(@prefix,'R$ ')]").clear().type('20')

    cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()

    cy.xpath("//span[@class='mat-option-text'][contains(.,'TEF PagTodos (Crédito)')]").click()

    // Função para formatar a data atual no mesmo formato que aparece no campo (DD/MM/YYYY)
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    // Pega a data atual formatada
    const today = formatDate(new Date());

    // Verifica se o campo de data contém a data atual
    cy.xpath("//input[@formcontrolname='datePayment']").should('have.value', today);

    cy.contains('button', 'Pagar').click()

    cy.contains('Você está realizando um pagamento manual, a transação foi concluída com sucesso?').should('be.visible')

  });
  
  it('Validar fluxo de parcelamento no Check-in com parcelamento abaixo de 5 reais nas parcelas', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);

    cy.get("#schedule", { timeout: 10000 }).click()
    cy.contains('span', 'Check-in').click()


    cy.wait(3000)

    cy.xpath("(//div[contains(.,'5')])[18]").click()
    cy.xpath("//span[contains(.,'50')]").click()

    cy.xpath("//input[@formcontrolname='patient']")
      .type('Ivan Barros', { timeout: 1000 })


      cy.xpath("//span[@class='mat-option-text'][contains(.,'Ivan Barros - 34921977879')]").click()

    cy.contains('button', 'Filtrar').click()

    cy.xpath("//tr[1]//button[@class='mat-ripple btn']").click()

    cy.contains("button", 'Receber').click()

    // Verifica a presença dos botões de pagamento
    cy.contains('button', 'Cartão de Crédito').should('be.visible')
    cy.contains('button', 'Cartão de Débito').should('be.visible')
    cy.contains('button', 'Dinheiro').should('be.visible')
    cy.contains('button', 'PIX').should('be.visible')

    // Ou verifica o título "Receber"
    cy.contains(' Receber ').should('be.visible')

    cy.contains('button', 'Cartão de Crédito').click()

    // Verifica o título da tela
    cy.contains('Receber por Cartão de Crédito').should('be.visible')

    // Verifica elementos característicos do formulário
    cy.xpath("(//label[@class='mdc-label'][contains(.,'TEF')])[1]").should('be.visible') // Radio Tef
    cy.contains('Não TEF').should('be.visible') // Radio Não Tef

    // Primeiro clica no seletor de parcelas
    cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").should('be.visible').click()

    // Depois verifica se existem as opções de 1 a 12     
    cy.get('mat-option').should('have.length', 12) // Verifica se tem 12 opções      

    // Verifica cada opção individualmente     
    for (let i = 1; i <= 12; i++) {
      cy.contains('mat-option', `${i}`).should('exist')
    }

    // Depois verifica se existem as opções de 1 a 12          
    cy.get('mat-option').should('have.length', 12) // Verifica se tem 12 opções            

    // Verifica cada opção individualmente          
    for (let i = 1; i <= 12; i++) {
      cy.contains('mat-option', `${i}`).should('exist')
    }

    // Gera um número aleatório entre 1 e 12
    const randomNumber = Math.floor(Math.random() * 12) + 1

    // Clica na opção aleatória
    cy.contains('mat-option', `${randomNumber}`).click()

    cy.xpath("//input[contains(@prefix,'R$ ')]").clear().type('4')

    cy.xpath("//mat-error[@aria-atomic='true'][contains(.,'Valor abaixo de R$ 5,00')]").should('be.visible')

    cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()

    cy.xpath("//span[@class='mat-option-text'][contains(.,'TEF PagTodos (Crédito)')]").click()

    // Função para formatar a data atual no mesmo formato que aparece no campo (DD/MM/YYYY)
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    // Pega a data atual formatada
    const today = formatDate(new Date());

    // Verifica se o campo de data contém a data atual
    cy.xpath("//input[@formcontrolname='datePayment']").should('have.value', today);

  });

});