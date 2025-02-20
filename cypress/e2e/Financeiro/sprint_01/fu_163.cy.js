/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('fu_163', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar URL Split', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()
    cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/financial/splits')
  });

  it('Validar bread Home', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()
    cy.contains('a', 'Home').click()
    cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/')
  });

  it('Validar bread Financeiro', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()
    cy.contains('a', 'Financeiro').click()
    cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/financial')
  });

  it('Validar bread Splits', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()
    cy.contains('a', 'Splits').click()
    cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/financial/splits')
  });

  it('Validar título Split H3', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()
    cy.contains('h3', 'Split').should('be.visible')
  });

  it('Validar input data inicial', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()

    // Função para formatar a data atual no formato dd/mm/yyyy
    const today = new Date()
    const formattedDate = today.toLocaleDateString('pt-BR')

    // Limpar e inserir a data atual no campo de data inicial
    cy.xpath("//input[contains(@formcontrolname,'dateStart')]")
      .clear()
      .should('be.visible')
      .type(formattedDate)
      .should('have.value', formattedDate)
  });

  it('Validar input data final', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()

    // Função para formatar a data atual no formato dd/mm/yyyy
    const today = new Date()
    const formattedDate = today.toLocaleDateString('pt-BR')

    // Limpar, inserir a data atual e verificar
    cy.xpath("//input[contains(@formcontrolname,'endDate')]")
      .clear()
      .should('be.visible')
      .type(formattedDate)
      .should('have.value', formattedDate)
  });

  it('Validar input Paciente', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()
    cy.xpath("//input[contains(@formcontrolname,'paciente')]").should('be.visible')

  });

  it('Validar input ID da Transição', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()
    cy.get('#transaction').should('be.visible')
  });

  it('Validar selector Forma Liquidação', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()
    //seletor Forma Liquidação
    cy.xpath("(//div[contains(.,'Forma Liquidação')])[9]").should('be.visible')
  });

  it('Validar button Pesquisar', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()
    cy.get('#search').should('be.visible')
  });

  it('Validar button Clear (Limpar)', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()
    cy.contains('button', 'Limpar').should('be.visible')
  });

  it('Validar tabela após Pesquisa', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Split').click()

    cy.xpath("//input[contains(@formcontrolname,'dateStart')]").clear().type('01/12/2024')

    cy.get('#search').click()

    // Validar os cabeçalhos da tabela
    cy.get('th').should(($headers) => {
      const headerTexts = Array.from($headers).map(header => header.textContent.trim())
      expect(headerTexts).to.deep.equal([
        'Data',
        'Meio de Pagamento',
        'Valor',
        'Bandeira',
        'Paciente',
        'Detalhes'
      ])
    })
    //clicando no botao detalhes
    // Primeiro clica no botão de detalhes
    cy.xpath("(//button[@type='button'][contains(.,'info')])[1]")
      .should('be.visible')
      .click()
      .then(() => {
        // Validar os labels em negrito
        cy.contains('Valor total da movimentação:').should('be.visible') // ok
        cy.contains('Data da movimentação:').should('be.visible') // ok
        cy.contains('Forma Liquidação:').should('be.visible') // ok
        cy.contains('ID da transação:').should('be.visible') // ok
        cy.contains('ID do split:').should('be.visible') // ok
        cy.contains('Usuário:').should('be.visible') // ok
        cy.contains('MovementID:').should('be.visible') // ok
        cy.contains('InvoiceID:').should('be.visible') // ok

        // Validar os cabeçalhos principais (primeira tabela)
        cy.contains('Função').should('be.visible').scrollIntoView({ timeout: 10000 }) // ok
        cy.contains('Descrição').should('be.visible').scrollIntoView({ timeout: 10000 }) // ok
        cy.contains('Valor repassado').should('be.visible').scrollIntoView({ timeout: 10000 }) // ok
        cy.contains('Status').should('be.visible').scrollIntoView({ timeout: 10000 }) // ok
        cy.contains('Ações').should('be.visible').scrollIntoView({ timeout: 10000 }) // ok


        // Validar seção "Splits Criados"
        cy.contains('Splits Criados').should('be.visible').scrollIntoView({ timeout: 10000 }) // ok

        // Validar os cabeçalhos da tabela de splits criados
        cy.contains('Id Split').should('be.visible').scrollIntoView({ timeout: 10000 }) // ok
        cy.contains('Recebedor').should('be.visible').scrollIntoView({ timeout: 10000 }) // ok
        cy.contains('Valor').should('be.visible').scrollIntoView({ timeout: 10000 }) // ok
      })

      cy.xpath("//button[@class='mat-focus-indicator close-icon mat-button mat-button-base'][contains(.,'close')]").click()
      cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/financial/splits')

  });

});