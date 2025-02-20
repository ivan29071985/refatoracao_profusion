/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('fu_162', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar URL Repasse', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();

    cy.contains('span', 'Repasse').click()

    cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/financial/new-transfer')
  });

  it('Validar bread Home', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()
    cy.contains('a', 'Home').click()
    cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/')
  });

  it('Validar bread Financeiro', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()
    cy.contains('a', 'Financeiro').click()
    cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/financial')
  });

  it('Validar bread Repasse', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()
    cy.contains('a', 'Repasse').click()
    cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/financial/new-transfer')
  });

  it('Validar título Repasse H3', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()
    cy.contains('h3', 'Repasse').should('be.visible')
  })

  it('Validar Executante / Fornecedor', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.get('#executanteControl').should('be.visible')

  });

  it('Validar input inicial', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.xpath("//input[contains(@formcontrolname,'startDueDate')]").should('be.visible')

  });

  it('Validar input final', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.xpath("//input[contains(@formcontrolname,'endDueDate')]").should('be.visible')

  });

  it('Validar Status do recebimento', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.xpath("(//div[contains(.,'Status do recebimento')])[9]").should('be.visible')

  });

  it('Validar button Pesquisar', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.get('#pesquisar').should('be.visible')

  });

  it('Validar fraseologia Valot total a pagar', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.contains('Valor total a pagar:')
      .should('be.visible')

  });

  it('Validar total em valor', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    // Alternativa mais flexível
    cy.contains(/R\$\s*\d+,\d{2}/)
      .should('be.visible')

  });

  it('Validar button Desconsolidar', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.contains('button', 'Desconsolidar').should('be.visible')

  });

  it('Validar button Consolidar', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.contains('button', 'Consolidar').should('be.visible')

  });

  it('Validar button Gerar conta à pagar', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.contains('button', 'Gerar conta à pagar').should('be.visible')

  });

  it('Validar fraseologia sem efetuar nenhuma Pesquisa (Não há resultados para pesquisa. Por favor, revise os filtros.)', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.contains('p', ' Não há resultados para pesquisa. Por favor, revise os filtros. ').should('be.visible')

  });

  it('Validar fluxo da tela Repasse com valores de Status A pagar', () => {
    const baseUrl = Cypress.env('currentBaseUrl');
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click();
    cy.xpath("//input[contains(@formcontrolname,'startDueDate')]").clear().type('01/12/2024');
    cy.get('#pesquisar').click();

    let totalSum = 0;

    cy.get('tr').each(($row) => {
      if ($row.text().includes('A pagar')) {
        const valueText = $row.text().match(/R\$\s*(\d+,\d{2})/)?.[1] || '0,00';
        const value = parseFloat(valueText.replace(',', '.'));

        if (!isNaN(value) && value > 0) {
          // Arredonda cada valor individual para 2 casas decimais
          totalSum = (totalSum + value);
          cy.log(`Valor encontrado: R$ ${valueText}`);
        }
      }
    }).then(() => {
      // Arredonda a soma final para 2 casas decimais
      totalSum = Number(totalSum.toFixed(2));
      const formattedSum = totalSum.toFixed(2).replace('.', ',');
      cy.log(`Soma total: R$ ${formattedSum}`);

      cy.contains(/R\$\s*\d+,\d{2}/)
        .should('be.visible')
        .invoke('text')
        .then((expectedText) => {
          // Arredonda o valor esperado também
          const expectedValue = Number(
            parseFloat(expectedText.replace('R$', '').trim().replace(',', '.')).toFixed(2)
          );

          // Comparação com margem de erro pequena
          const diff = Math.abs(totalSum - expectedValue);
          expect(diff).to.be.lessThan(0.01,
            `A soma calculada (R$ ${formattedSum}) deve ser igual ao valor esperado (${expectedText})`);
        });
    });
  });

  it('Validar fluxo da tela Repasse com valores de Status Conta gerada', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.xpath("//input[contains(@formcontrolname,'startDueDate')]").clear().type('01/12/2024')

    cy.get('#pesquisar').click()

    // Corrigindo a soma dos valores com encadeamento correto
    let totalSum = 0;

    cy.get('tr').each(($row) => {
      // Verifica se a linha contém 'Conta gerada'
      if ($row.text().includes('Conta gerada')) {
        // Pega o valor da célula que contém R$
        const valueText = $row.text().match(/R\$\s*(\d+,\d{2})/)?.[1] || '0,00';
        const value = parseFloat(valueText.replace(',', '.'));

        if (!isNaN(value) && value > 0) {
          totalSum += value;
          cy.log(`Valor encontrado: R$ ${valueText}`);
        }
      }
    }).then(() => {
      // Log do resultado final
      cy.log(`Soma total: R$ ${totalSum.toFixed(2).replace('.', ',')}`);
    });

  });

  it('Validar se a coluna Data Pagamento está sendo preenchido com uma dala válida', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.xpath("//input[contains(@formcontrolname,'startDueDate')]").clear().type('01/12/2024')

    cy.get('#pesquisar').click()

    // Corrigindo a soma dos valores com encadeamento correto
    let totalSum = 0;

    cy.get('tr').each(($row) => {
      // Verifica se a linha contém 'Pago'
      if ($row.text().includes('Pago')) {
        // Pega o valor da célula que contém R$
        const valueText = $row.text().match(/R\$\s*(\d+,\d{2})/)?.[1] || '0,00';
        const value = parseFloat(valueText.replace(',', '.'));

        if (!isNaN(value) && value > 0) {
          totalSum += value;
          cy.log(`Valor encontrado: R$ ${valueText}`);
        }
      }
    }).then(() => {
      // Log do resultado final
      cy.log(`Soma total: R$ ${totalSum.toFixed(2).replace('.', ',')}`);
    });

    // Validar se linhas com status "Pago" têm data de pagamento preenchida
    cy.get('tr').each(($row) => {
      // Verifica se a linha contém status "Pago"
      if ($row.text().includes('Pago')) {
        // Encontra a coluna de Data Pagamento na mesma linha
        const paymentDate = $row.find('td')
          .filter((index, td) => {
            // Encontra o índice da coluna Data Pagamento pelo cabeçalho
            const headerIndex = Cypress.$('th')
              .filter((_, th) => th.textContent.includes('Data Pagamento'))
              .index();
            return index === headerIndex;
          })
          .text()
          .trim();

        // Verifica se a data está preenchida
        expect(paymentDate, 'Data de pagamento deve estar preenchida quando status é Pago')
          .to.not.be.empty;

        // Verifica se a data está no formato correto (dd/mm/yyyy)
        if (paymentDate !== '--' && paymentDate !== '') {
          expect(paymentDate).to.match(/^\d{2}\/\d{2}\/\d{4}$/,
            'Data deve estar no formato dd/mm/yyyy');
        }

        cy.log(`Linha com status Pago - Data de Pagamento: ${paymentDate}`);
      }
    });

  });

  it('Validar tabelas com todas as colunas', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.xpath("//input[contains(@formcontrolname,'startDueDate')]").clear().type('01/12/2024')

    cy.get('#pesquisar').click()

    // Array com os nomes esperados das colunas em ordem
    const expectedColumns = [
      'ID',
      'Execução',
      'Paciente',
      'Profissional',
      'Executante',
      'Status Pagamento',
      'Data Pagamento',
      'Valor Repasse',
      'Expandir'
    ];

    // Destacar cada coluna em vermelho e validar
    cy.get('th').each(($header, index) => {
      // Adiciona destaque vermelho
      cy.wrap($header)
        .then($el => {

          // Aplica destaque vermelho
          $el.css({
            'background-color': 'red',
            'color': 'white',
            'transition': 'all 0.3s'
          });


          // Validação alternativa que mostra todas as colunas encontradas
          cy.get('th').then($headers => {
            const actualColumns = Array.from($headers).map(header => header.textContent.trim());
            cy.log('Colunas encontradas:', actualColumns);

            // Verifica se todas as colunas esperadas estão presentes
            expectedColumns.forEach(column => {
              expect(actualColumns).to.include(column,
                `A coluna "${column}" deve estar presente na tabela`);
            });

          });
        });

    });
  });

  it('Validar se a coluna Data Pagamento está sendo preenchido com uma dala válida', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Repasse').click()

    cy.xpath("//input[contains(@formcontrolname,'startDueDate')]").clear().type('01/12/2024')

    cy.get('#pesquisar').click()

    // Validar se linhas com status "Pago" têm datas correspondentes
    cy.get('tr').each(($row) => {
      // Verifica se a linha contém status "Pago"
      if ($row.text().includes('Pago')) {
        // Encontra o índice das colunas pelos cabeçalhos
        const paymentDateIndex = Cypress.$('th')
          .filter((_, th) => th.textContent.includes('Data Pagamento'))
          .index();

        const executionDateIndex = Cypress.$('th')
          .filter((_, th) => th.textContent.includes('Execução'))
          .index();

        // Pega os valores das datas
        const paymentDate = $row.find('td').eq(paymentDateIndex).text().trim();
        const executionDate = $row.find('td').eq(executionDateIndex).text().trim();

        // Log para debug
        cy.log(`Linha com status Pago:
      Data de Pagamento: ${paymentDate}
      Data de Execução: ${executionDate}`);

        // Verifica se ambas as datas estão preenchidas
        expect(paymentDate, 'Data de pagamento deve estar preenchida').to.not.be.empty;
        expect(executionDate, 'Data de execução deve estar preenchida').to.not.be.empty;

        // Verifica se as datas são iguais
        if (paymentDate !== '--' && executionDate !== '--') {
          expect(paymentDate).to.equal(executionDate,
            `Data de pagamento (${paymentDate}) deve ser igual à data de execução (${executionDate})`);
        }
      }
    });

  });
});
