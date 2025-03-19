/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_109', () => {
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

    // Função para formatar a data no padrão dd/mm/yyyy
    const formatarData = (data) => {
      return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };

    // Obtém as datas necessárias
    const dataAtual = new Date();
    const dataPagamento = new Date();
    const dataVencimento = new Date();
    dataVencimento.setFullYear(dataVencimento.getFullYear() + 1); // Adiciona 1 ano para o vencimento

    // Formata as datas
    const dataCadastro = formatarData(dataAtual);
    const dataPagamentoFormatada = formatarData(dataPagamento);
    const conta = 'Ivan Barros'
    const status = 'Quitadas'

    // Tenta encontrar a linha de várias maneiras diferentes
    cy.get('table')
      .find('tr')
      .contains('td', 'Ivan Barros', { timeout: 10000 }) // Aumenta o timeout e especifica busca em td
      .parents('tr')
      .within(() => {
        // Verifica as colunas
        cy.get('td').eq(0).should('contain', dataCadastro) // Data Cadastro
        cy.get('td').eq(1).should('contain', dataPagamentoFormatada) // Data Pagamento
        cy.get('td').eq(3).should('contain', conta)
        cy.get('td').eq(8).should('contain', status)


        // Encontrar e clicar no botão de edit na linha do Ivan Barros
        cy.xpath("//tr[contains(., 'Ivan Barros')]//button[contains(.,'edit')]")
          .scrollIntoView()
          .should('be.visible')
          .click({ force: true })



        cy.scrollTo('bottom', { duration: 2000 });

        cy.wait(3000)
        

      })
  });
});
