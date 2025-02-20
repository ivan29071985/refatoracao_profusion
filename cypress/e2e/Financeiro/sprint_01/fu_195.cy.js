/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('fu_195', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar preenchimento do campo de data inicial na tela de cartões', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    // Gera uma data aleatória dentro do mês atual
    const hoje = new Date()
    const anoAtual = hoje.getFullYear()
    const mesAtual = hoje.getMonth() + 1
    const diaAtual = hoje.getDate()

    // Gera um dia aleatório entre 1 e o dia atual
    const diaAleatorio = Math.floor(Math.random() * diaAtual) + 1

    // Formata a data no padrão dd/mm/yyyy
    const dataFormatada = `${diaAleatorio.toString().padStart(2, '0')}/${mesAtual.toString().padStart(2, '0')}/${anoAtual}`

    // Insere a data no campo
    cy.xpath("//input[contains(@formcontrolname,'dataDe')]")
      .type(dataFormatada)
      .should('have.value', dataFormatada) // Verifica se o valor inserido está correto
      .then(() => {
        cy.log(`Data inserida com sucesso: ${dataFormatada}`)
      })
  });

  it('Validar preenchimento do campo de data final na tela de cartões', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    // Gera data aleatória para dataDe
    const hoje = new Date()
    const anoAtual = hoje.getFullYear()
    const mesAtual = hoje.getMonth() + 1
    const diaAtual = hoje.getDate()

    // Gera um dia aleatório entre 1 e o dia atual para dataDe
    const diaAleatorioDe = Math.floor(Math.random() * diaAtual) + 1

    // Formata a data inicial
    const dataFormatadaDe = `${diaAleatorioDe.toString().padStart(2, '0')}/${mesAtual.toString().padStart(2, '0')}/${anoAtual}`

    // Insere a data inicial e aguarda o campo ser preenchido
    cy.xpath("//input[contains(@formcontrolname,'dataDe')]")
      .clear()  // Limpa o campo antes
      .type(dataFormatadaDe, { force: true })  // Força a digitação
      .should('have.value', dataFormatadaDe)  // Verifica o valor
      .wait(1000)  // Aguarda um pouco para garantir

    // Gera um dia aleatório para dataAte (entre o dia de dataDe e o dia atual)
    const diaAleatorioAte = Math.floor(Math.random() * (diaAtual - diaAleatorioDe)) + diaAleatorioDe + 1

    // Formata a data final
    const dataFormatadaAte = `${diaAleatorioAte.toString().padStart(2, '0')}/${mesAtual.toString().padStart(2, '0')}/${anoAtual}`

    // Insere a data final e aguarda o campo ser preenchido
    cy.xpath("//input[contains(@formcontrolname,'dataAte')]")
      .clear()  // Limpa o campo antes
      .type(dataFormatadaAte, { force: true })  // Força a digitação
      .should('have.value', dataFormatadaAte)  // Verifica o valor
      .wait(1000)  // Aguarda um pouco para garantir
  });
}); 
