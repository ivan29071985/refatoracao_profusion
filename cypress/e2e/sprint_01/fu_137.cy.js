/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_137', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });


  it('Validar Venda Bruta Total', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar', { timeout: 10000 }).click()

      .wait(5000)

    cy.get("div.card-content-item.bg-1").should("contain", "Venda bruta total",)

    const extractNumber = (text) => {
      const match = text.match(/R\$\s*([\d.,]+)/);
      return match ? parseFloat(match[1].replace('.', '').replace(',', '.')) : NaN;
    };

    cy.get("div.card-content-item.bg-1")
      .invoke('text')
      .then(extractNumber)
      .then((value) => {
        cy.log('Valor Bruto Total:', value)
      })
      .as('valorBrutoTotal');
  })

  it('Validar Valor Total Royalties', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar', { timeout: 10000 }).click()

      .wait(5000)

    cy.xpath("//div[contains(@class,'card-content-item bg-2')]").should("contain", "Valor total royalties",)

    const extractNumber = (text) => {
      const match = text.match(/R\$\s*([\d.,]+)/);
      return match ? parseFloat(match[1].replace('.', '').replace(',', '.')) : NaN;
    };

    cy.get("div.card-content-item.bg-2")
      .invoke('text')
      .then(extractNumber)
      .then((value) => {
        cy.log('Valor total royalties:', value)
      })
      .as('Valortotalroyalties');
  })

  it('Validar Valor Splits realizados', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar', { timeout: 10000 }).click()

      .wait(5000)

    cy.xpath("//span[contains(.,'Splits realizados')]").should("contain", "Splits realizados",)

    const extractNumber = (text) => {
      const match = text.match(/R\$\s*([\d.,]+)/);
      return match ? parseFloat(match[1].replace('.', '').replace(',', '.')) : NaN;
    };

    cy.get("div.card-content-item.bg-3")
      .invoke('text')
      .then(extractNumber)
      .then((value) => {
        cy.log('Splits realizados:', value)
      })
      .as('Splitsrealizados');
  })

  it('Validar Valor Splits realizados', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar', { timeout: 10000 }).click()

      .wait(5000)

    cy.xpath("//span[contains(.,'Valor a receber')]").should("contain", "Valor a receber",)

    const extractNumber = (text) => {
      const match = text.match(/R\$\s*([\d.,]+)/);
      return match ? parseFloat(match[1].replace('.', '').replace(',', '.')) : NaN;
    };

    cy.get("div.card-content-item.bg-4")
      .invoke('text')
      .then(extractNumber)
      .then((value) => {
        cy.log('Valor a receber:', value)
      })
      .as('Valorareceber');
  })

  it('Validar Valor TEF', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar', { timeout: 10000 }).click()

      .wait(5000)

    cy.xpath("//span[contains(.,'TEF')]").should("contain", "TEF",)

    const extractNumber = (text) => {
      const match = text.match(/R\$\s*([\d.,]+)/);
      return match ? parseFloat(match[1].replace('.', '').replace(',', '.')) : NaN;
    };

    cy.xpath("//div[@class='second-card-content'][contains(.,'TEF')]")
      .invoke('text')
      .then(extractNumber)
      .then((value) => {
        cy.log('Valor TEF:', value)
      })
      .as('valorTEF');
  })

  it('Validar Valor Não TEF', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar', { timeout: 10000 }).click()

      .wait(5000)

    cy.xpath("//span[contains(.,'Não TEF')]").should("contain", "Não TEF",)

    const extractNumber = (text) => {
      const match = text.match(/R\$\s*([\d.,]+)/);
      return match ? parseFloat(match[1].replace('.', '').replace(',', '.')) : NaN;
    };

    cy.xpath("//div[@class='second-card-content'][contains(.,'Não TEF')]")
      .invoke('text')
      .then(extractNumber)
      .then((value) => {
        cy.log('Valor Não TEF:', value)
      })
      .as('NãoTEF');
  })

  it('Validar Valor Dinehiro', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar', { timeout: 10000 }).click()

      .wait(5000)

    cy.xpath("//span[contains(.,'Dinheiro')]").should("contain", "Dinheiro",)

    const extractNumber = (text) => {
      const match = text.match(/R\$\s*([\d.,]+)/);
      return match ? parseFloat(match[1].replace('.', '').replace(',', '.')) : NaN;
    };

    cy.xpath("//span[contains(.,'Dinheiro')]")
      .invoke('text')
      .then(extractNumber)
      .then((value) => {
        cy.log('Valor Dinheiro:', value)
      })
      .as('Dinheiro');
  })

  it('Validar Valor PIX', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar', { timeout: 10000 }).click()

      .wait(5000)

    cy.xpath("//span[contains(.,'PIX')]").should("contain", "PIX",)

    const extractNumber = (text) => {
      const match = text.match(/R\$\s*([\d.,]+)/);
      return match ? parseFloat(match[1].replace('.', '').replace(',', '.')) : NaN;
    };

    cy.xpath("//div[@class='second-card-content'][contains(.,'PIX')]")
      .invoke('text')
      .then(extractNumber)
      .then((value) => {
        cy.log('Valor PIX:', value)
      })
      .as('valorPIX');
  })

  it('Validar Valor Vendas Gráfico', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar', { timeout: 10000 }).click()

      .wait(5000)

    // Verificar valor vermelho (cancelamentos)
    cy.xpath("//span[contains(.,'%')]")
      .first()
      .invoke('text')
      .then((text) => {
        const cancelamentos = text.match(/(\d+)%/)[1]
        cy.log('Cancelamentos %:', cancelamentos)
      })
      .as('percentualCancelamentos');
  })

  it('Validar Valor Cancelamentos Gráfico', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar', { timeout: 10000 }).click()

      .wait(5000)

    // Verificar valor azul (vendas)
    cy.xpath("//span[contains(.,'%')]")
      .last()
      .invoke('text')
      .then((text) => {
        const vendas = text.match(/(\d+)%/)[1]
        cy.log('Vendas %:', vendas)
      })
      .as('percentualVendas');
  })

  it('Validar Soma das Formas de Pagamento', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar', { timeout: 10000 }).click()

      .wait(5000)

    const extractNumber = (text) => {
      const match = text.match(/[+-]?R\$\s*([\d.]+,\d{2})/);
      return match ? parseFloat(match[1].replace('.', '').replace(',', '.')) : NaN;
    };


    let valores = {};

    // Função para capturar um valor específico
    const capturarValor = (xpath, tipo) => {
      return cy.xpath(xpath)
        .invoke('text')
        .then(extractNumber)
        .then(value => {
          valores[tipo] = value;
          cy.log(`${tipo}:`, value);
        });
    };

    // Captura os valores em sequência
    cy.wrap(null).then(() => {
      return capturarValor("//div[@class='second-card-content'][contains(.,'TEF')]", 'tef')
        .then(() => capturarValor("//div[@class='second-card-content'][contains(.,'Não TEF')]", 'naoTef'))
        .then(() => capturarValor("//div[@class='second-card-content'][contains(.,'Dinheiro')]", 'dinheiro'))
        .then(() => capturarValor("//div[@class='second-card-content'][contains(.,'PIX')]", 'pix'))
        .then(() => {
          const somaValores = valores.tef + valores.naoTef + valores.dinheiro + valores.pix;
          cy.log('Soma dos valores individuais:', somaValores);

          return cy.get("div.card-content-item.bg-1")
            .invoke('text')
            .then((text) => {
              cy.log('Texto do valor total:', text);
              const valorBrutoTotal = extractNumber(text);
              cy.log('Valor Bruto Total:', valorBrutoTotal);

              const diferenca = Math.abs(somaValores - valorBrutoTotal);
              expect(diferenca).to.be.lessThan(0.01,
                `A soma dos valores individuais (${somaValores.toFixed(2)}) deve ser igual ao valor bruto total (${valorBrutoTotal.toFixed(2)})`);
            });
        });
    });
  });

})
