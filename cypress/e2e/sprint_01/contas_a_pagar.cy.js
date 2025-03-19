describe('Contas a Pagar', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Fluxo de Contas a Pagar - Dinheiro', () => {
    cy.visit('/')
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
    cy.visit('/')
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



