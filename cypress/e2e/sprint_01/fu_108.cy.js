/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_108', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar fluxo de contas a receber atraves de um check-in', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);

    cy.get('#financial').click()

    cy.contains('Contas a receber').click()

    cy.wait(3000)

    cy.xpath("(//div[contains(.,'10')])[14]").click()
    cy.contains('50').click()

    
    // Obtém a data atual no formato DD/MM/YYYY
    const hoje = new Date()
    const dataFormatada = hoje.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })

    // Busca a linha que contém Ivan Barros e valida as datas
    cy.get('tr')
      .filter(':contains("Ivan Barros")')
      .should('contain', dataFormatada) // Data Cadastro
      .and('contain', dataFormatada)    // Data Pagamento
      .and('contain', dataFormatada)    // Data Vencimento

    // Busca a linha que contém Ivan Barros e valida os campos
    cy.get('tr')
      .filter(':contains("Ivan Barros")')
      .should('contain', 'Ivan Barros')
      .and('contain', 'PROPOSTA')
      .and('contain', 'Quitadas')
      .and('contain', 'Recebimento Único')
  })
});
