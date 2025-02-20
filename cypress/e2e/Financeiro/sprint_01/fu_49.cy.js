/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('fu_49', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Deve cadastrar uma conta a receber, processar o pagamento e verificar a data de vencimento no extrato', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Contas a receber').click();
    cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

    cy.wait(2000);
    cy.get("#ReceberDe").click();
    cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

    cy.get("#Pagador").click();
    cy.contains(' Dr. Ivan Automação 001 - NÃO MEXER ').click();

    function getRandomNumber() {
      return Math.floor(Math.random() * 5000) + 1;
    }

    const randomNumber = getRandomNumber();

    cy.xpath("//input[contains(@formcontrolname,'billsInvoice')]").type(randomNumber.toString());

    function generateRandomText(wordCount = 20) {
      const words = ['sistema', 'financeiro', 'transações', 'relatórios', 'contabilidade', 'banco', 'investimentos', 'auditoria', 'compliance', 'orçamento', 'receita', 'despesa', 'lucro', 'patrimônio', 'ativos', 'passivos', 'fluxo de caixa', 'balanço', 'análise', 'risco'];
      return Array.from({ length: wordCount }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
    }

    cy.get("#Observacao").type(generateRandomText());
    cy.contains('Adicionar itens').click();

    function generateRandomLetters(length = 5) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
    }

    cy.get("#Item").type(generateRandomLetters());
    cy.get("#SelectPlanoContas").click();
    cy.xpath("//span[contains(.,'Receita de Contas - Consultas')]").click();
    cy.get("#ValorUnitario").clear().type('10');
    cy.xpath("(//input[@type='number'])[2]").type('1');
    cy.xpath("(//input[@type='number'])[3]").type('1');
    cy.get("#dataIntervalo").click();
    cy.contains('Dia').click();
    cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").click();
    cy.contains('Gerar Conta a Receber').should('be.visible');
    cy.contains('Tem Certeza que deseja cadastrar essa conta a receber?').should('be.visible');
    cy.xpath("//button[contains(.,'Cadastrar')]").click();
    cy.contains('Parcelas geradas com sucesso').should('be.visible');
    cy.contains('Ok').click();

    cy.contains('Contas a receber').click();
    cy.contains('Pesquisar').click();

    cy.contains(randomNumber.toString())
      .parent()
      .within(() => {
        cy.xpath("//mat-icon[@role='img'][contains(.,'edit')]")
          .first()
          .click({ force: true });
      });
    cy.xpath("//button[contains(.,'Receber')]").click();
    cy.xpath("//button[contains(.,'Dinheiro')]").click();
    cy.xpath("//input[contains(@name,'valorRecebido')]").type('10');
    cy.xpath("(//div[contains(.,'Conta Vinculada *')])[9]").click();
    cy.xpath("//span[contains(.,'Caixa Dinheiro')]").click();
    cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click();
    cy.contains('Parcela salva com sucesso !').click();
    cy.contains('Ok').click();
    cy.contains('Extrato').click();

    cy.contains('Data da Baixa').click()
    
    //selecione a conta
    cy.get(':nth-child(9) > .col-7 > .account-table__label--one-line').click({force:true})

    cy.get("#typeDatePicker").click()
    cy.xpath("//th[@role='columnheader'][contains(.,'Data da baixa')]").click()


    // Função para verificar o conteúdo de uma coluna específica
    const verificarColuna = (nomeColuna, valorEsperado) => {
      cy.contains('th', nomeColuna)
        .invoke('index')
        .then((columnIndex) => {
          cy.get('.col-md-12 table tbody tr')
            .first()
            .find('td')
            .eq(columnIndex)
            .invoke('text')
            .then((texto) => {
              expect(texto.trim()).to.equal(valorEsperado);
            });
        });
    };

    // Obter a data atual no formato dd/mm/yyyy
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Verificação da coluna Data Vencimento
    verificarColuna('Data Vencimento', dataAtual);

    // Rolar a tela para baixo
    cy.scrollTo('bottom', { duration: 1000 });

    // Aguardar um momento após a rolagem (opcional, mas pode ajudar na visualização)
    cy.wait(1000);
  });
});

