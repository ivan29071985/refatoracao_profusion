/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('fu_192', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar input data inicial', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();

    cy.contains('span', 'Split').click()

    // Gera data aleatória dentro do mês atual
    const hoje = new Date()
    const anoAtual = hoje.getFullYear()
    const mesAtual = hoje.getMonth() + 1
    const diaAtual = hoje.getDate()

    // Gera um dia aleatório entre 1 e o dia atual
    const diaAleatorio = Math.floor(Math.random() * diaAtual) + 1

    // Formata a data no padrão dd/mm/yyyy
    const dataFormatada = `${diaAleatorio.toString().padStart(2, '0')}/${mesAtual.toString().padStart(2, '0')}/${anoAtual}`

    // Insere e valida a data
    cy.xpath("//input[contains(@formcontrolname,'dateStart')]")
      .clear()  // Limpa o campo antes
      .type(dataFormatada, { force: true })  // Força a digitação
      .should('have.value', dataFormatada)  // Verifica o valor
      .wait(1000)  // Aguarda um pouco para garantir
      .then(() => {
        cy.log(`Data de início inserida com sucesso: ${dataFormatada}`)
      })
  });

  it('Validar input data final', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();

    cy.contains('span', 'Split').click()

    // Gera data aleatória para dateStart
    const hoje = new Date()
    const anoAtual = hoje.getFullYear()
    const mesAtual = hoje.getMonth() + 1
    const diaAtual = hoje.getDate()

    // Gera um dia aleatório entre 1 e o dia atual para dateStart
    const diaAleatorioInicio = Math.floor(Math.random() * diaAtual) + 1

    // Formata a data inicial
    const dataFormatadaInicio = `${diaAleatorioInicio.toString().padStart(2, '0')}/${mesAtual.toString().padStart(2, '0')}/${anoAtual}`

    // Gera um dia aleatório para endDate (entre o dia inicial e o dia atual)
    const diaAleatorioFim = Math.floor(Math.random() * (diaAtual - diaAleatorioInicio)) + diaAleatorioInicio + 1

    // Formata a data final
    const dataFormatadaFim = `${diaAleatorioFim.toString().padStart(2, '0')}/${mesAtual.toString().padStart(2, '0')}/${anoAtual}`

    // Insere e valida as datas
    cy.xpath("//input[contains(@formcontrolname,'dateStart')]")
      .clear()
      .type(dataFormatadaInicio, { force: true })
      .should('have.value', dataFormatadaInicio)
      .wait(1000)
      .then(() => {
        cy.log(`Data inicial inserida: ${dataFormatadaInicio}`)
      })

    cy.xpath("//input[contains(@formcontrolname,'endDate')]")
      .clear()
      .type(dataFormatadaFim, { force: true })
      .should('have.value', dataFormatadaFim)
      .wait(1000)
      .then(() => {
        cy.log(`Data final inserida: ${dataFormatadaFim}`)
      })
  });

});