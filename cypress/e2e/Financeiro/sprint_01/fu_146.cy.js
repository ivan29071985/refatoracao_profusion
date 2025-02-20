/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { time } = require('console');


describe('fu_146', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar fluxo de pesquisa em Royalties com alteração nas datas', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    // Obter data atual para data final
    const dataFim = new Date()
    // Criar data inicial (30 dias antes)
    const dataInicio = new Date(dataFim)
    dataInicio.setDate(dataInicio.getDate() - 30)

    // Formatar as datas para o padrão dd/mm/yyyy
    const formatarData = (data) => {
      const dia = String(data.getDate()).padStart(2, '0')
      const mes = String(data.getMonth() + 1).padStart(2, '0')
      const ano = data.getFullYear()
      return `${dia}/${mes}/${ano}`
    }

    // Limpar e preencher os campos
    cy.xpath("//input[contains(@formcontrolname,'data_inicio')]")
      .clear()
      .type(formatarData(dataInicio))

    cy.xpath("//input[contains(@formcontrolname,'data_fim')]")
      .clear()
      .type(formatarData(dataFim))

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
  });

  it('Validar fluxo de pesquisa em Royalties sem alterações nas datas', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()
    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
  });

  it('Validar breadcrumb Home', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()
    cy.xpath("//a[@routerlink='/home'][contains(.,'Home')]").click()
    cy.url({ timeout: 10000 }).should('eq', 'https://amei-staging.amorsaude.com.br/')
  });

  it('Validar breadcrumb Financeiro', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()
    cy.xpath("//a[@routerlink='/financial/'][contains(.,'Financeiro')]").click()
    cy.url({ timeout: 10000 }).should('eq', 'https://amei-staging.amorsaude.com.br/financial')
  });

  it('Validar breadcrumb Royalties', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()
    cy.xpath("//a[@routerlink='/financial/royalties'][contains(.,'Royalties')]").click()
    cy.url({ timeout: 10000 }).should('eq', 'https://amei-staging.amorsaude.com.br/financial/royalties')
  });

  it('Validar botão Pesquisar', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()
    cy.xpath("//span[@class='mdc-button__label'][contains(.,'Pesquisar')]").should('contain.text', 'Pesquisar')
  });

  it('Validar título Royalties', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()
    cy.xpath("//h3[contains(.,'Royalties')]").should('contain.text', 'Royalties')
  });

  it('Validar subtítulo Receitas x Saídas', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()

    cy.xpath("//h4[contains(.,'Receitas x Saídas')]")
      .should('be.visible')
      .and('have.text', 'Receitas x Saídas')
      .and('exist')
  });

  it('Validar exibição da coluna Data', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.contains('th', 'Data')
      .should('be.visible')
      .and('exist')
  })

  it('Validar exibição da coluna Venda Bruta', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.contains('th', 'Venda Bruta')
      .should('be.visible')
      .and('exist')
  })

  it('Validar exibição da coluna Royalties', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.contains('th', 'Royalties')
      .should('be.visible')
      .and('exist')
  })

  it('Validar exibição da coluna Splits realizados', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.contains('th', 'Splits realizados')
      .should('be.visible')
      .and('exist')
  })

  it('Validar exibição da coluna Transf. contas', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.contains('th', 'Transf. contas')
      .should('be.visible')
      .and('exist')
  })

  it('Validar exibição da coluna Total', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.contains('th', 'Total')
      .should('be.visible')
      .and('exist')
  })

  it('Validar exibição da coluna Status', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.contains('th', 'Status')
      .should('be.visible')
      .and('exist')
  })

  it('Validar exportação', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()

    cy.xpath("//mat-icon[@svgicon='download']//*[name()='svg']").click()

    // Valida a requisição e o tipo do conteúdo
    cy.request('https://amei-staging.amorsaude.com.br/financial/resume-financial')
      .then((response) => {
        expect(response.headers['content-type']).to.equal('text/html')
      })

    // Valida se o arquivo foi baixado
    const path = require('path')

    cy.readFile(path.join('cypress/downloads', 'Royalties.xlsx'))
      .should('exist')

    cy.contains('h2', 'Arquivo gerado com sucesso!').should('contain', 'Arquivo gerado com sucesso!')
  })

  it('Validar título do gráfico', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.contains('Vendas x Cancelamentos')
      .should('be.visible')
      .then($el => {
        cy.log('Título do gráfico encontrado:', $el.text())
      })
  })

  it('Validar legenda de Vendas', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.contains('Vendas')
      .should('be.visible')
      .then($el => {
        cy.log('Legenda de Vendas encontrada:', $el.text())
      })
  })

  it('Validar legenda de Cancelamentos', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.contains('Cancelamentos')
      .should('be.visible')
      .then($el => {
        cy.log('Legenda de Cancelamentos encontrada:', $el.text())
      })
  })

  it('Validar presença do gráfico', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.get('svg') // ou seletor mais específico para o gráfico
      .should('be.visible')
      .then($el => {
        cy.log('Gráfico encontrado')
      })
  })

  it('Validar que existem dois percentuais numéricos', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.wait(3000)
    // Verificar o primeiro percentual
    cy.get('.chart-legend > :nth-child(1) > :nth-child(1)') // ajuste o seletor conforme necessário
      .invoke('text')
      .then((texto) => {
        // Verifica se o texto é um número seguido de %
        expect(texto).to.match(/^\d+%$/)
        cy.log('Primeiro percentual encontrado:', texto)
      })

    // Verificar o segundo percentual
    cy.get('.chart-legend > :nth-child(1) > :nth-child(2)') // ajuste o seletor conforme necessário
      .invoke('text')
      .then((texto) => {
        // Verifica se o texto é um número seguido de %
        expect(texto).to.match(/^\d+%$/)
        cy.log('Segundo percentual encontrado:', texto)
      })
  })

  it('Validar título Cancelamentos', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()
    cy.xpath("//h4[contains(.,'Cancelamentos')]").should('be.visible')
  })

  it('Validar exibição da coluna Data em Cancelamento', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()

    cy.xpath("(//th[contains(.,'Data')])[2]")
      .scrollIntoView()
      .should('be.visible')
      .then($el => {
        cy.log('Coluna Data em Cancelamentos encontrada:', $el.text())
      })
  })

  it('Validar exibição da coluna Dinheiro / PIX em Cancelamento', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()

    cy.xpath("(//th[contains(.,'Dinheiro / PIX')])[1]")
      .scrollIntoView()
      .should('be.visible')
      .then($el => {
        cy.log('Coluna Dinheiro / PIX em Cancelamentos encontrada:', $el.text())
      })
  })

  it('Validar exibição da coluna Dinheiro / PIX em Cancelamento', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()

    cy.xpath("(//th[contains(.,'Dinheiro / PIX')])[1]")
      .scrollIntoView()
      .should('be.visible')
      .then($el => {
        cy.log('Coluna Dinheiro / PIX em Cancelamentos encontrada:', $el.text())
      })
  })

  it('Validar exibição da coluna Cartão em Cancelamento', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()

    cy.xpath("(//th[contains(.,'Cartão')])[1]")
      .scrollIntoView()
      .should('be.visible')
      .then($el => {
        cy.log('Coluna Cartão em Cancelamentos encontrada:', $el.text())
      })
  })

  it('Validar exibição da coluna Royalties - Cartão em Cancelamento', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()

    cy.xpath("//th[contains(.,'Royalties - Cartão')]")
      .scrollIntoView()
      .should('be.visible')
      .then($el => {
        cy.log('Coluna Royalties - Cartão em Cancelamentos encontrada:', $el.text())
      })
  })

  it('Validar exibição da coluna Estorno - Royalties em Cancelamento', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()

    cy.xpath("//th[contains(.,'Estorno - Royalties')]")
      .scrollIntoView()
      .should('be.visible')
      .then($el => {
        cy.log('Coluna Estorno - Royalties em Cancelamentos encontrada:', $el.text())
      })
  })

  it('Validar exibição da coluna Total em Cancelamento', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()

    cy.xpath("(//th[contains(.,'Total')])[2]")
      .scrollIntoView()
      .should('be.visible')
      .then($el => {
        cy.log('Coluna Total em Cancelamentos encontrada:', $el.text())
      })
  })

  it('Validar menu (engrenagem)', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', { timeout: 10000 }).click()
    cy.contains('span', 'Royalties').click()

    cy.xpath("//input[contains(@placeholder,'Regionais*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()
    cy.xpath("//input[contains(@placeholder,'Unidades*')]").click()
    cy.xpath("(//span[@class='mat-checkbox-inner-container'])[1]").click()

    cy.contains('button', 'Pesquisar').click()

    cy.xpath("//span[@aria-haspopup='menu']")
    .should('be.visible')
    .click()
  });
})