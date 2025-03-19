/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('fu_165', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar URL de Cartões menu Saldo', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()
    cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/financial/cards')
  });

  it('Validar bread Home', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()
    cy.contains('a', 'Home').click()
    cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/')
  });

  it('Validar bread Financeiro', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()
    cy.contains('a', 'Financeiro').click()
    cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/financial')
  });

  it('Validar bread Cartões', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()
    cy.contains('a', 'Cartões').click()
    cy.url().should('eq', 'https://amei-homolog.amorsaude.com.br/financial/cards')
  });

  it('Validar título Baixa de Cartões de Crédito e Débito H3', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()
    cy.contains('h3', 'Baixa de Cartões de Crédito e Débito').should('be.visible')
  })

  it('Validar seletor Selecione o cartão', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.xpath("(//div[contains(.,'Selecione o cartão')])[10]").should('be.visible')
  });

  it('Validar checkbox Baixados', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.xpath("//label[@class='mat-checkbox-layout'][contains(.,'Baixados')]").should('be.visible')
  });

  it('Validar checkbox Pendentes', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.xpath("//label[@class='mat-checkbox-layout'][contains(.,'Pendentes')]").should('be.visible')
  });

  it('Validar checkbox Pendentes', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.xpath("//label[@class='mat-checkbox-layout'][contains(.,'Cancelados')]").should('be.visible')
  });

  it('Validar checkbox Cancelados', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.xpath("//label[@class='mat-checkbox-layout'][contains(.,'Cancelados')]").should('be.visible')

  });

  it('Validar input data De', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.get('#dataDe').should('be.visible')

  });

  it('Validar input data Até', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.get('#dataFim').should('be.visible')

  });

  it('Validar button Exportar', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.contains('button', 'Exportar').should('be.visible')

  });

  it('Validar seletor Selecione o tipo de data', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.xpath("(//div[contains(.,'Selecione o tipo de data *')])[11]").should('be.visible')

  });

  it('Validar input Transação', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.xpath("//input[contains(@formcontrolname,'transaction')]").should('be.visible')

  });

  it('Validar input Autorização', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.xpath("//input[contains(@formcontrolname,'autorization')]").should('be.visible')

  });

  it('Validar input Pagador', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.get('#Pagador').should('be.visible')

  });

  it('Validar seletor selecione a bandeira', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.xpath("(//div[contains(.,'Selecione a bandeira')])[10]").should('be.visible')

  });

  it('Validar button Buscar', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.contains('button', 'Buscar').should('be.visible')

  });

  it('Validar button Limpar Filtros', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    cy.contains('button', 'Limpar Filtros').should('be.visible')

  });

  it('Validar somatoria da coluna Data pagamento', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    // data inicial
    cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[1]").click()
    // Calcular a data 5 dias antes
    const today = new Date();
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - 5);
    const targetDay = previousDate.getDate().toString();

    // Clicar no botão específico usando eq()
    cy.xpath(`//button[@type='button'][contains(.,'${targetDay}')]`)
      .should('have.length.gt', 0) // Verifica se encontrou elementos
      .eq(0) // Seleciona o primeiro elemento
      .should('be.visible')
      .then($button => {
        // Verificar se o botão está habilitado antes de clicar
        if (!$button.prop('disabled')) {
          cy.wrap($button).click();
          cy.log(`Clicou no dia ${targetDay} (5 dias antes de hoje)`);
        } else {
          throw new Error(`O botão para o dia ${targetDay} está desabilitado`);
        }
      });

    // data final
    cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[2]").click()
    const currentDay = today.getDate().toString();

    // Primeiro abrir o seletor de data
    cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[2]")
      .should('exist')
      .click({ force: true })
      .then(() => {
        // Aguardar o calendário aparecer e clicar no dia atual
        cy.xpath(`//button[@type='button'][contains(.,'${currentDay}')]`)
          .filter(':visible')  // Pegar apenas o botão visível
          .should('exist')
          .click({ force: true });

        cy.log(`Selecionado o dia atual: ${currentDay}`);
      });

    cy.get('#mat-select-value-3 > .mat-select-placeholder').click()

    cy.xpath("//span[@class='mat-option-text'][contains(.,'Data de Pagamento')]").click()

    cy.contains('button', 'Buscar').click()

    let totalSum = 0;

    // Somar os valores
    cy.get('tr').each(($row) => {
      const valueMatch = $row.text().match(/R\$\s*(\d+,\d{2})/);
      if (valueMatch) {
        const value = parseFloat(valueMatch[1].replace(',', '.'));
        if (!isNaN(value)) {
          totalSum += value;
          cy.log(`Valor encontrado: R$ ${valueMatch[1]}`);
        }
      }
    }).then(() => {
      const formattedTotal = parseFloat(totalSum.toFixed(2));
      cy.log(`Soma total calculada: R$ ${formattedTotal.toString().replace('.', ',')}`);

      // Encontrar o valor bruto
      cy.contains('Valor Bruto')  // ou o seletor específico que localiza o valor bruto
        .invoke('text')
        .then((text) => {
          cy.log('Texto completo encontrado:', text);

          // Expressão regex mais flexível para encontrar o valor
          const bruttoMatch = text.match(/R\$\s*[\d.]+,\d{2}/);

          if (!bruttoMatch) {
            cy.log('Texto completo onde procuramos o valor:', text);
            throw new Error('Valor bruto não encontrado. Texto encontrado: ' + text);
          }

          const bruttoText = bruttoMatch[0].replace('R$', '').trim();
          const bruttoValue = parseFloat(bruttoText.replace('.', '').replace(',', '.'));

          cy.log(`Valor bruto encontrado: ${bruttoText}`);
          cy.log(`Valor bruto convertido: ${bruttoValue}`);

          // Comparar os valores
          expect(formattedTotal).to.equal(bruttoValue,
            `Soma (R$ ${formattedTotal.toString().replace('.', ',')}) deve igual ao valor bruto (R$ ${bruttoText})`);
        });
    });



  });

  it('Validar fluxo para visualizar Taxa %', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    // data inicial
    cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[1]").click()
    // Calcular a data 5 dias antes
    const today = new Date();
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - 5);
    const targetDay = previousDate.getDate().toString();

    // Clicar no botão específico usando eq()
    cy.xpath(`//button[@type='button'][contains(.,'${targetDay}')]`)
      .should('have.length.gt', 0) // Verifica se encontrou elementos
      .eq(0) // Seleciona o primeiro elemento
      .should('be.visible')
      .then($button => {
        // Verificar se o botão está habilitado antes de clicar
        if (!$button.prop('disabled')) {
          cy.wrap($button).click();
          cy.log(`Clicou no dia ${targetDay} (5 dias antes de hoje)`);
        } else {
          throw new Error(`O botão para o dia ${targetDay} está desabilitado`);
        }
      });

    // data final
    cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[2]").click()
    const currentDay = today.getDate().toString();

    // Primeiro abrir o seletor de data
    cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[2]")
      .should('exist')
      .click({ force: true })
      .then(() => {
        // Aguardar o calendário aparecer e clicar no dia atual
        cy.xpath(`//button[@type='button'][contains(.,'${currentDay}')]`)
          .filter(':visible')  // Pegar apenas o botão visível
          .should('exist')
          .click({ force: true });

        cy.log(`Selecionado o dia atual: ${currentDay}`);
      });

    cy.get('#mat-select-value-3 > .mat-select-placeholder').click({force:true})

    cy.xpath("//span[@class='mat-option-text'][contains(.,'Data de Pagamento')]").click()

    cy.contains('button', 'Buscar').click()

    cy.xpath("(//button[contains(.,'info_outline')])[1]").click()

    // Validar cabeçalhos em azul
    cy.contains('Nome').should('be.visible');
    cy.xpath("//th[@role='columnheader'][contains(.,'Valor Liquido')]").should('be.visible');
    cy.xpath("//th[@role='columnheader'][contains(.,'Valor Bruto')]").should('be.visible')

    // Função para converter valor em texto para número (ajustada)
    const convertToNumber = (text) => {
      // Remove espaços extras e verifica se é negativo
      const cleanText = text.trim();
      const isNegative = cleanText.startsWith('-');

      // Remove R$ e - e converte para número
      const value = parseFloat(cleanText
        .replace('R$', '')
        .replace('-R$', '')
        .replace('-', '')
        .trim()
        .replace(',', '.'));

      return isNegative ? -value : value;
    };

    let totalLiquido = 0;

    // Debug para ver cada valor antes da soma
    cy.get('tr').each(($row, index) => {
      const cells = $row.find('td');
      // Ignorar cabeçalho e linha de total
      if (cells.length > 0 && !$row.text().includes('Total:')) {
        const valorText = cells.last().text().trim();
        const valorLiquido = convertToNumber(valorText);

        if (!isNaN(valorLiquido)) {
          // Log antes de somar
          cy.log(`Processando linha ${index}:`);
          cy.log(`  Texto original: "${valorText}"`);
          cy.log(`  Valor convertido: ${valorLiquido}`);

          totalLiquido += valorLiquido;

          // Log após somar
          cy.log(`  Soma parcial: ${totalLiquido}`);
        }
      }
    }).then(() => {
      // Formatar o total calculado
      const totalFormatado = totalLiquido.toFixed(2).replace('.', ',');
      cy.log(`Total final calculado: R$ ${totalFormatado}`);

      // Verificar se o total calculado é 4,00
      expect(Math.abs(totalLiquido - 4.00)).to.be.lessThan(0.01,
        `O total calculado (R$ ${totalFormatado}) deve ser R$ 4,00`);
    });





  });

  it('Validar fraseologia no modal visualizar Taxa %', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    // data inicial
    cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[1]").click()
    // Calcular a data 5 dias antes
    const today = new Date();
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - 5);
    const targetDay = previousDate.getDate().toString();

    // Clicar no botão específico usando eq()
    cy.xpath(`//button[@type='button'][contains(.,'${targetDay}')]`)
      .should('have.length.gt', 0) // Verifica se encontrou elementos
      .eq(0) // Seleciona o primeiro elemento
      .should('be.visible')
      .then($button => {
        // Verificar se o botão está habilitado antes de clicar
        if (!$button.prop('disabled')) {
          cy.wrap($button).click();
          cy.log(`Clicou no dia ${targetDay} (5 dias antes de hoje)`);
        } else {
          throw new Error(`O botão para o dia ${targetDay} está desabilitado`);
        }
      });

    // data final
    cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[2]").click()
    const currentDay = today.getDate().toString();

    // Primeiro abrir o seletor de data
    cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[2]")
      .should('exist')
      .click({ force: true })
      .then(() => {
        // Aguardar o calendário aparecer e clicar no dia atual
        cy.xpath(`//button[@type='button'][contains(.,'${currentDay}')]`)
          .filter(':visible')  // Pegar apenas o botão visível
          .should('exist')
          .click({ force: true });

        cy.log(`Selecionado o dia atual: ${currentDay}`);
      });

    cy.get('#mat-select-value-3 > .mat-select-placeholder').click()

    cy.xpath("//span[@class='mat-option-text'][contains(.,'Data de Pagamento')]").click()

    cy.contains('button', 'Buscar').click()

    cy.xpath("(//button[contains(.,'info_outline')])[1]").click({force:true})

    // Validar texto exato da mensagem
    cy.contains("* O valor da taxa de cartão cobrado da franquia incide sobre a margem bruta + valor destinado aos royalties")
      .should('contain.text', '* O valor da taxa de cartão cobrado da franquia incide sobre a margem bruta + valor destinado aos royalties')

  });

  it('Validar coluna nome', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click();
    cy.contains('span', 'Cartões').click()

    // data inicial
    cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[1]").click()
    // Calcular a data 5 dias antes
    const today = new Date();
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - 5);
    const targetDay = previousDate.getDate().toString();

    // Clicar no botão específico usando eq()
    cy.xpath(`//button[@type='button'][contains(.,'${targetDay}')]`)
      .should('have.length.gt', 0) // Verifica se encontrou elementos
      .eq(0) // Seleciona o primeiro elemento
      .should('be.visible')
      .then($button => {
        // Verificar se o botão está habilitado antes de clicar
        if (!$button.prop('disabled')) {
          cy.wrap($button).click();
          cy.log(`Clicou no dia ${targetDay} (5 dias antes de hoje)`);
        } else {
          throw new Error(`O botão para o dia ${targetDay} está desabilitado`);
        }
      });

    // data final
    cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[2]").click()
    const currentDay = today.getDate().toString();

    // Primeiro abrir o seletor de data
    cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[2]")
      .should('exist')
      .click({ force: true })
      .then(() => {
        // Aguardar o calendário aparecer e clicar no dia atual
        cy.xpath(`//button[@type='button'][contains(.,'${currentDay}')]`)
          .filter(':visible')  // Pegar apenas o botão visível
          .should('exist')
          .click({ force: true });

        cy.log(`Selecionado o dia atual: ${currentDay}`);
      });

    cy.get('#mat-select-value-3 > .mat-select-placeholder').click()

    cy.xpath("//span[@class='mat-option-text'][contains(.,'Data de Pagamento')]").click()

    cy.contains('button', 'Buscar').click()

    cy.xpath("(//button[contains(.,'info_outline')])[1]").click()

    cy.xpath("//th[@role='columnheader'][contains(.,'Nome')]").should('be.visible')

  });

});

