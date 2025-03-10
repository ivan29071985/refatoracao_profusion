/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('Contas a Receber - Pagamentos', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Fluxo de Contas a receber - Dinheiro', () => {
    const baseUrl = Cypress.env('currentBaseUrl');
    cy.visit(baseUrl);
    cy.get('#financial').click();
    cy.contains('Contas a receber').click();
    cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

    cy.wait(2000);
    cy.get("#ReceberDe").click();
    cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

    cy.get("#Pagador").click();
    cy.contains(' Dr. Ivan Barros ').click();

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
    cy.xpath("//span[contains(.,' Conta Automação ')]").click();
    cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click();
    cy.contains('Parcela salva com sucesso !').click();
    cy.contains('Ok').click();
    cy.contains('Extrato').click();
    cy.get("#typeDatePicker").click()
    cy.xpath("//label[@role='button'][contains(.,'Data da Baixa')]").click()
    cy.xpath("//span[@class='account-table__label--one-line not-clicked-item'][contains(.,'Conta Automação')]").click();

    cy.get('.col-md-12').within(() => {
      cy.get('tr').eq(1).within(() => {
        cy.get('td').eq(0).invoke('text').then((dataBaixa) => {
          // Obter a data atual no formato dd/mm/yyyy HH:mm:ss
          const dataAtual = new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }).replace(',', '');

          // Comparar apenas a parte da data da string completa
          const dataBaixaApenasData = dataBaixa.trim().split(' ')[0];
          const dataAtualApenasData = dataAtual.split(' ')[0];

          expect(dataBaixaApenasData).to.equal(dataAtualApenasData);
          expect(dataBaixa.trim()).to.match(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
        });
      });
    });

    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(1000);
  });

  it('Fluxo de Contas a receber - PIX', () => {
    const baseUrl = Cypress.env('currentBaseUrl');
    cy.visit(baseUrl);
    cy.get('#financial').click();
    cy.contains('Contas a receber').click();
    cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

    cy.wait(2000);
    cy.get("#ReceberDe").click();
    cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

    cy.get("#Pagador").click();
    cy.contains(' Dr. Ivan Barros ').click();

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
    cy.xpath("//button[contains(.,'PIX')]").click();
    cy.xpath("//input[contains(@name,'valorRecebido')]").type('10');
    cy.xpath("(//div[contains(.,'Conta Vinculada *')])[9]").click();
    cy.xpath("//span[contains(.,' Conta Automação ')]").click();
    cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click();
    cy.contains('Parcela salva com sucesso !').click();
    cy.contains('Ok').click();
    cy.contains('Extrato').click();
    cy.get("#typeDatePicker").click()
    cy.xpath("//label[@role='button'][contains(.,'Data da Baixa')]").click()
    cy.xpath("//span[@class='account-table__label--one-line not-clicked-item'][contains(.,'Conta Automação')]").click();

    cy.get('.col-md-12').within(() => {
      cy.get('tr').eq(1).within(() => {
        cy.get('td').eq(0).invoke('text').then((dataBaixa) => {
          // Obter a data atual no formato dd/mm/yyyy HH:mm:ss
          const dataAtual = new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }).replace(',', '');

          // Comparar apenas a parte da data da string completa
          const dataBaixaApenasData = dataBaixa.trim().split(' ')[0];
          const dataAtualApenasData = dataAtual.split(' ')[0];

          expect(dataBaixaApenasData).to.equal(dataAtualApenasData);
          expect(dataBaixa.trim()).to.match(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
        });
      });
    });

    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(1000);
  });

  it('Fluxo de Contas a receber - Debito', () => {
    const baseUrl = Cypress.env('currentBaseUrl');
    cy.visit(baseUrl);
    cy.get('#financial').click();
    cy.contains('Contas a receber').click();
    cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

    cy.wait(2000);
    cy.get("#ReceberDe").click();
    cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

    cy.get("#Pagador").click();
    cy.contains(' Dr. Ivan Barros ').click();

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
    cy.xpath("//button[contains(.,'Cartão de Débito')]").click();
    cy.xpath("//input[contains(@value,'false')]").click({ force: true })
    cy.xpath("//input[contains(@value,'false')]").click({ force: true })
    cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
    cy.get('span').contains(' Conta Débito').click()
    cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click();
    cy.get('button').contains('Sim').click()
    cy.contains('Ok').click();
    cy.contains('Extrato').click();
    cy.get("#typeDatePicker").click()
    cy.xpath("//label[@role='button'][contains(.,'Data da Baixa')]").click()
    cy.xpath("//span[@class='account-table__label--one-line not-clicked-item'][contains(.,'Conta Automação')]").click();

    cy.get('.col-md-12').within(() => {
      cy.get('tr').eq(1).within(() => {
        cy.get('td').eq(0).invoke('text').then((dataBaixa) => {
          // Obter a data atual no formato dd/mm/yyyy HH:mm:ss
          const dataAtual = new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }).replace(',', '');

          // Comparar apenas a parte da data da string completa
          const dataBaixaApenasData = dataBaixa.trim().split(' ')[0];
          const dataAtualApenasData = dataAtual.split(' ')[0];

          expect(dataBaixaApenasData).to.equal(dataAtualApenasData);
          expect(dataBaixa.trim()).to.match(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
        });
      });
    });

    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(1000);
  });

  it('Fluxo de Contas a receber - Credito', () => {
    const baseUrl = Cypress.env('currentBaseUrl');
    cy.visit(baseUrl);
    cy.get('#financial').click();
    cy.contains('Contas a receber').click();
    cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

    cy.wait(2000);
    cy.get("#ReceberDe").click();
    cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

    cy.get("#Pagador").click();
    cy.contains(' Dr. Ivan Barros ').click();

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
    cy.get('button').contains('Cartão de Crédito').click()
    cy.xpath("//input[contains(@value,'false')]").click({ force: true })
    cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
    cy.get('span').contains('2').click()
    cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
    cy.get('span').contains(' Crédito Cartão').click()
    cy.get('button').contains('Pagar').click()
    cy.get('button').contains('Sim').click()
    cy.contains('Ok').click();
    cy.contains('Extrato').click();
    cy.get("#typeDatePicker").click()
    cy.xpath("//label[@role='button'][contains(.,'Data da Baixa')]").click()
    cy.xpath("//span[@class='account-table__label--one-line not-clicked-item'][contains(.,'Conta Automação')]").click();

    cy.get('.col-md-12').within(() => {
      cy.get('tr').eq(1).within(() => {
        cy.get('td').eq(0).invoke('text').then((dataBaixa) => {
          // Obter a data atual no formato dd/mm/yyyy HH:mm:ss
          const dataAtual = new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }).replace(',', '');

          // Comparar apenas a parte da data da string completa
          const dataBaixaApenasData = dataBaixa.trim().split(' ')[0];
          const dataAtualApenasData = dataAtual.split(' ')[0];

          expect(dataBaixaApenasData).to.equal(dataAtualApenasData);
          expect(dataBaixa.trim()).to.match(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
        });
      });
    });

    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(1000);
  });

});