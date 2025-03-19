describe('fu_50', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Fluxo de Contas a Pagar com data de pagamento 30 dias atrás', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Contas a pagar').click();
    cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

    function getRandomNumber() {
      return Math.floor(Math.random() * 5000) + 1;
    }

    const randomNumber = getRandomNumber();

    cy.xpath("//input[contains(@maxlength,'250')]").type(randomNumber.toString());

    cy.get("#Pagador").click()
    cy.xpath("//span[@class='mat-option-text'][contains(.,'db diagnósticos teste')]").click()
    cy.xpath("(//span[contains(.,'Fornecedor')])[2]").click()
    cy.contains('Profissional').click()
    cy.get("#Pagador").type('dr. ivan automação 001 - não mexer')
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

    // Função para calcular a data de 30 dias atrás
    const getDate30DaysAgo = () => {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      return date;
    };

    // Função para formatar a data no formato dd/mm/yyyy (padrão brasileiro)
    const formatDateBR = (date) => {
      const day = date.getDate().toString().padStart(2, '0'); 
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Calcular e formatar a data de 15 dias atrás
    const dataPassada = getDate30DaysAgo();
    const dataPassadaBR = formatDateBR(dataPassada);

    cy.xpath("//button[contains(.,'Pagar')]").click()
    cy.xpath("//button[contains(.,'Dinheiro')]").click()

    // Preencher o campo de data de pagamento com a data de 30 dias atrás
    cy.get('#dataPagamento').clear().type(dataPassadaBR);

    // Verificação para garantir que o valor foi inserido corretamente
    cy.get('#dataPagamento').should('have.value', dataPassadaBR);

    cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
    cy.xpath("//span[@class='mat-option-text'][contains(.,'Caixa Dinheiro')]").click()

    cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click()
    cy.contains('Parcela salva com sucesso !').should('be.visible')
    cy.contains('Ok').click()

    cy.contains('Extrato').click()

    cy.get("#typeDatePicker").click()
    cy.xpath("//label[@role='button'][contains(.,'Data da Baixa')]").click()
    cy.xpath("//button[@color='primary'][contains(.,'Filtrar')]").click()
    //selecione a conta
    cy.get(':nth-child(9) > .col-7 > .account-table__label--one-line').click()


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

          // Armazenar a data de baixa para comparação posterior
          cy.wrap(dataBaixa.trim()).as('dataBaixa');
        });
      });
    });

    cy.xpath("//th[@role='columnheader'][contains(.,' Data Pagamento ')]")
      .invoke('index')
      .then((columnIndex) => {
        cy.get('.col-md-12 table tbody tr').first().find('td').eq(columnIndex).invoke('text').then((dataPagamento) => {
          // Calcula a data esperada (30 dias antes da data atual)
          const hoje = new Date();
          const dataPagamentoEsperada = new Date(hoje.setDate(hoje.getDate() - 30));
          const expectedDate = dataPagamentoEsperada.toLocaleDateString('pt-BR'); // Formato DD/MM/YYYY

          expect(dataPagamento.trim()).to.equal(expectedDate, `A Data Pagamento deve ser ${expectedDate}, mas é ${dataPagamento.trim()}`);

          cy.scrollTo('bottom');


        });
      });
  });

  it('Fluxo de Contas a Pagar com data de pagamento 15 dias atrás', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Contas a pagar').click();
    cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

    function getRandomNumber() {
      return Math.floor(Math.random() * 5000) + 1;
    }

    const randomNumber = getRandomNumber();

    cy.xpath("//input[contains(@maxlength,'250')]").type(randomNumber.toString());

    cy.get("#Pagador").click()
    cy.xpath("//span[@class='mat-option-text'][contains(.,'db diagnósticos teste')]").click()
    cy.xpath("(//span[contains(.,'Fornecedor')])[2]").click()
    cy.contains('Profissional').click()
    cy.get("#Pagador").type('dr. ivan automação 001 - não mexer')
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

    // Função para calcular a data de 15 dias atrás
    const getDate30DaysAgo = () => {
      const date = new Date();
      date.setDate(date.getDate() - 15);
      return date;
    };

    // Função para formatar a data no formato dd/mm/yyyy (padrão brasileiro)
    const formatDateBR = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Calcular e formatar a data de 15 dias atrás
    const dataPassada = getDate30DaysAgo();
    const dataPassadaBR = formatDateBR(dataPassada);

    cy.xpath("//button[contains(.,'Pagar')]").click()
    cy.xpath("//button[contains(.,'Dinheiro')]").click()

    // Preencher o campo de data de pagamento com a data de 30 dias atrás
    cy.get('#dataPagamento').clear().type(dataPassadaBR);

    // Verificação para garantir que o valor foi inserido corretamente
    cy.get('#dataPagamento').should('have.value', dataPassadaBR);

    cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
    cy.xpath("//span[@class='mat-option-text'][contains(.,'Caixa Dinheiro')]").click()

    cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click()
    cy.contains('Parcela salva com sucesso !').should('be.visible')
    cy.contains('Ok').click()

    cy.contains('Extrato').click()

    cy.get("#typeDatePicker").click()
    cy.xpath("//label[@role='button'][contains(.,'Data da Baixa')]").click()
    cy.xpath("//button[@color='primary'][contains(.,'Filtrar')]").click()
    //selecione a conta dinheiro
    cy.get(':nth-child(9) > .col-7 > .account-table__label--one-line').click()


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

          // Armazenar a data de baixa para comparação posterior
          cy.wrap(dataBaixa.trim()).as('dataBaixa');
        });
      });
    });

    cy.xpath("//th[@role='columnheader'][contains(.,' Data Pagamento ')]")
      .invoke('index')
      .then((columnIndex) => {
        cy.get('.col-md-12 table tbody tr').first().find('td').eq(columnIndex).invoke('text').then((dataPagamento) => {
          // Calcula a data esperada (30 dias antes da data atual)
          const hoje = new Date();
          const dataPagamentoEsperada = new Date(hoje.setDate(hoje.getDate() - 15));
          const expectedDate = dataPagamentoEsperada.toLocaleDateString('pt-BR'); // Formato DD/MM/YYYY

          expect(dataPagamento.trim()).to.equal(expectedDate, `A Data Pagamento deve ser ${expectedDate}, mas é ${dataPagamento.trim()}`);

          cy.scrollTo('bottom');


        });
      });
  });

  it('Fluxo de Contas a Pagar com data de pagamento 5 dias atrás', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('Contas a pagar').click();
    cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

    function getRandomNumber() {
      return Math.floor(Math.random() * 5000) + 1;
    }

    const randomNumber = getRandomNumber();

    cy.xpath("//input[contains(@maxlength,'250')]").type(randomNumber.toString());

    cy.get("#Pagador").click()
    cy.xpath("//span[@class='mat-option-text'][contains(.,'db diagnósticos teste')]").click()
    cy.xpath("(//span[contains(.,'Fornecedor')])[2]").click()
    cy.contains('Profissional').click()
    cy.get("#Pagador").type('dr. ivan automação 001 - não mexer')
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

    // Função para calcular a data de 5 dias atrás
    const getDate30DaysAgo = () => {
      const date = new Date();
      date.setDate(date.getDate() - 5);
      return date;
    };

    // Função para formatar a data no formato dd/mm/yyyy (padrão brasileiro)
    const formatDateBR = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Calcular e formatar a data de 15 dias atrás
    const dataPassada = getDate30DaysAgo();
    const dataPassadaBR = formatDateBR(dataPassada);

    cy.xpath("//button[contains(.,'Pagar')]").click()
    cy.xpath("//button[contains(.,'Dinheiro')]").click()

    // Preencher o campo de data de pagamento com a data de 30 dias atrás
    cy.get('#dataPagamento').clear().type(dataPassadaBR);

    // Verificação para garantir que o valor foi inserido corretamente
    cy.get('#dataPagamento').should('have.value', dataPassadaBR);

    cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
    cy.xpath("//span[@class='mat-option-text'][contains(.,'Caixa Dinheiro')]").click()

    cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click()
    cy.contains('Parcela salva com sucesso !').should('be.visible')
    cy.contains('Ok').click()

    cy.contains('Extrato').click()

    cy.get("#typeDatePicker").click()
    cy.xpath("//label[@role='button'][contains(.,'Data da Baixa')]").click()
    cy.xpath("//button[@color='primary'][contains(.,'Filtrar')]").click()
    //selecione a conta dinheiro
    cy.get(':nth-child(9) > .col-7 > .account-table__label--one-line').click()


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

          // Armazenar a data de baixa para comparação posterior
          cy.wrap(dataBaixa.trim()).as('dataBaixa');
        });
      });
    });

    cy.xpath("//th[@role='columnheader'][contains(.,' Data Pagamento ')]")
      .invoke('index')
      .then((columnIndex) => {
        cy.get('.col-md-12 table tbody tr').first().find('td').eq(columnIndex).invoke('text').then((dataPagamento) => {
          // Calcula a data esperada (30 dias antes da data atual)
          const hoje = new Date();
          const dataPagamentoEsperada = new Date(hoje.setDate(hoje.getDate() - 5));
          const expectedDate = dataPagamentoEsperada.toLocaleDateString('pt-BR'); // Formato DD/MM/YYYY

          expect(dataPagamento.trim()).to.equal(expectedDate, `A Data Pagamento deve ser ${expectedDate}, mas é ${dataPagamento.trim()}`);

          cy.scrollTo('bottom');


        });
      });
  });

});

