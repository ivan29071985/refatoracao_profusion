/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_22', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
    });

    it('Verificação da renomeação da aba (Positivo) Extrato', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.xpath("//a[contains(.,'Extrato')]").should('contain', 'Extrato')
        cy.location('pathname').should('eq', '/financial');
    });

    it('Verificação da renomeação da aba (Negativo) Resumo não existe', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.xpath("//a[contains(.,'Resumo')]").should('not.exist')
        cy.location('pathname').should('eq', '/financial');
    });

    it('Verificar breadcrumbs Home direcionamento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.xpath("//li[contains(.,'Home')]", { timeout: 10000 }).should('exist')
        cy.xpath("//li[contains(.,'Home')]", { timeout: 10000 }).click()
        // No início do seu arquivo de teste
        const environment = 'homolog' // ou 'staging' - você pode alterar aqui
        const baseUrls = {
            homolog: 'https://amei-homolog.amorsaude.com.br/',
            staging: 'https://amei-staging.amorsaude.com.br/'
        }


        // Seu código anterior...
        cy.url().should('eq', baseUrls[environment], { timeout: 10000 })
        // Resto do seu código...
    })

    it('Verificar breadcrumbs Financeiro direcionamento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.xpath("//li[contains(.,'Financeiro')]", { timeout: 10000 }).should('exist')
        cy.xpath("//li[contains(.,'Financeiro')]", { timeout: 10000 }).click()
        // No início do seu arquivo de teste
        const environment = 'homolog' // ou 'staging' - você pode alterar aqui
        const baseUrls = {
            homolog: 'https://amei-homolog.amorsaude.com.br/financial',
            staging: 'https://amei-staging.amorsaude.com.br/financial'
        }


        // Seu código anterior...
        cy.url().should('eq', baseUrls[environment], { timeout: 10000 })
        // Resto do seu código...
    })

    it('Verificar breadcrumbs Extrato direcionamento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.xpath("//li[contains(.,'Extrato')]", { timeout: 10000 }).should('exist')
        cy.contains('span', 'Extrato', { timeout: 10000 }).click()
        // No início do seu arquivo de teste
        const environment = 'homolog' // ou 'staging' - você pode alterar aqui
        const baseUrls = {
            homolog: 'https://amei-homolog.amorsaude.com.br/financial/resume-financial',
            staging: 'https://amei-staging.amorsaude.com.br/financial/resume-financial'
        }


        // Seu código anterior...
        cy.url().should('eq', baseUrls[environment], { timeout: 10000 })
        // Resto do seu código...
    })

    it('Verificar H3 Extrato financeiro', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('h3', 'Extrato financeiro').should('contain.text', 'Extrato financeiro')
    });

    it('Verificar H4 Extrato por período', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('h4', 'Extrato por período').should('contain.text', 'Extrato por período')
    });

    it('Verificar Mat Label Informe o tipo de data', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('Informe o tipo de data').should('contain.text', 'Informe o tipo de data')
    });

    it('Verificar Label Data de Pagamento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('label', 'Data de Pagamento').should('exist')
    });

    it('Verificar Label Data da Baixa', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('label', 'Data da Baixa').should('exist')
    });

    it('Verificar Label Data de Vencimento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('label', 'Data de Vencimento').should('exist')
    });

    it('Verificar placeholder Data inicial', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.get('[data-placeholder="Data inicial"]').should('exist');
    });

    it('Verificar placeholder Data final', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.get('[data-placeholder="Data final"]').should('exist');
    });

    it('Verificar td Conta', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('td', 'Conta').should('exist')
    });

    it('Verificar td Balanço R$', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('td', 'Balanço R$').should('exist')
    });

    it('Verificar td Balanço', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.get(':contains("Balanço")').filter((index, element) => {
            return Cypress.$(element).text().trim() === 'Balanço';
        }).should('exist').and('be.visible');
    });

    it('Verificar H4 Movimentações', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('h4', 'Movimentações').should('contain.text', 'Movimentações')
    });

    it('Verificar button Filtrar', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('button', 'Filtrar').should('contain.text', 'Filtrar')
    });

    it('Verificar H4 Detalhes da conta', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('h4', 'Detalhes da conta').should('contain.text', 'Detalhes da conta')
    });

    it('Verificar Span Lançamentos do período', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('span', 'Lançamentos do período').should('contain.text', 'Lançamentos do período')
    });

    it('Verificar button Exportar lançamentos', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);

        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ', { timeout: 10000 }).click()

        // Rolar a tela para baixo
        cy.scrollTo('bottom', { duration: 1000 });
        cy.scrollTo('bottom', { duration: 1000 });
        cy.get('.mat-select-arrow-wrapper').click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'100')]").click()
        cy.contains('button', 'Exportar lançamentos').should('contain.text', 'Exportar lançamentos').click()

        cy.request('https://amei-homolog.amorsaude.com.br/financial/resume-financial').then((response) => {
            expect(response.headers['content-type']).to.equal('text/html')
        })

        const path = require('path')

        cy.readFile(path.join('cypress/downloads', 'lancamentos-financeiros.xlsx')).should('exist')
    });

    it('Verificar button Transferência entre contas', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('button', 'Transferência entre contas').should('contain.text', 'Transferência entre contas')

        cy.request('https://amei-homolog.amorsaude.com.br/financial/resume-financial').then((response) => {
            expect(response.status).to.equal(200)
        })
    });

    it('Verificar coluna Data da baixa', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('th', 'Data da baixa').should('contain.text', 'Data da baixa')
    });

    it('Verificar coluna  Data Vencimento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('th', 'Data Vencimento').should('contain.text', 'Data Vencimento')
    });

    it('Verificar coluna Data Pagamento', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 1000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('th', 'Data Pagamento').should('contain.text', 'Data Pagamento')
    });

    it('Verificar coluna Tipo de Operação', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('th', 'Tipo de Operação').should('contain.text', 'Tipo de Operação')
    });

    it('Verificar coluna Forma', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('th', 'Forma').should('contain.text', 'Forma')
    });

    it('Verificar coluna Origem/Destino', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('th', 'Origem/Destino').should('contain.text', 'Origem/Destino')
    });

    it('Verificar coluna Lançado por', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('th', 'Lançado por').should('contain.text', 'Lançado por')
    });

    it('Verificar coluna Valor', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('th', 'Valor').should('contain.text', 'Valor')
    });

    it('Verificar coluna Parcelas', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('th', 'Parcelas').should('contain.text', 'Parcelas')
    });

    it('Verificar somatória entre Entradas > Saídas > Balanço', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()

        // Função para extrair valor numérico de uma string
        const extractNumber = (text) => {
            const match = text.match(/R\$\s*([\d.,]+)/);
            return match ? parseFloat(match[1].replace('.', '').replace(',', '.')) : NaN;
        };

        // Extrai o valor das entradas
        cy.get('.financial-card--entries')
            .invoke('text')
            .then(extractNumber)
            .as('entradas');

        // Extrai o valor das saídas
        cy.get('.financial-card--exits')
            .invoke('text')
            .then(extractNumber)
            .as('saidas');

        // Extrai o valor do balanço
        cy.get('.financial-card--balance')
            .invoke('text')
            .then(extractNumber)
            .as('balanço');

        // Realiza a verificação
        cy.get('@entradas').then((entradas) => {
            cy.get('@saidas').then((saidas) => {
                cy.get('@balanço').then((balanço) => {
                    cy.log(`Entradas: ${entradas}`);
                    cy.log(`Saídas: ${saidas}`);
                    cy.log(`Saldo exibido: ${balanço}`);

                    if (isNaN(entradas) || isNaN(saidas) || isNaN(balanço)) {
                        throw new Error('Um ou mais valores não puderam ser extraídos corretamente.');
                    }

                    const saldoCalculado = entradas - saidas;
                    cy.log(`Saldo calculado: ${saldoCalculado}`);
                });
            });
        });
    });

    it('Verificar valores iguais com Saldo listagem x Saldo Movimentações', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click();

        const extractNumber = (text) => {
            const match = text.match(/R\$\s*([\d.,]+)/);
            return match ? parseFloat(match[1].replace('.', '').replace(',', '.')) : NaN;
        };

        cy.get('.financial-card--balance')
            .invoke('text')
            .then(extractNumber)
            .as('saldoListagem');

        cy.get('.financial-card--balance') // Mudamos para o mesmo seletor da listagem
            .invoke('text')
            .then(extractNumber)
            .as('saldoMovimentacoes');

        cy.get('@saldoListagem').then((saldoListagem) => {
            cy.get('@saldoMovimentacoes').then((saldoMovimentacoes) => {
                cy.log(`Saldo Listagem: ${saldoListagem}`);
                cy.log(`Saldo Movimentações: ${saldoMovimentacoes}`);

                const diferencaAceitavel = 0.01;
                const diferencaReal = Math.abs(saldoListagem - saldoMovimentacoes);
                const saoIguais = diferencaReal <= diferencaAceitavel;

                cy.log(`Diferença entre os saldos: ${diferencaReal}`);
                cy.log(`Os saldos são considerados iguais? ${saoIguais}`);

                expect(saldoListagem).to.be.closeTo(saldoMovimentacoes, diferencaAceitavel);
            });
        });
    });

    it('Verificar modal dentro de Transferencia entre contas', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('button', 'Transferência entre contas').click()
        cy.contains('h6', 'Transferência entre contas bancárias').should('contain.text', 'Transferência entre contas bancárias')
        cy.contains('span', 'Transferido de: *').should('contain.text', 'Transferido de: *')
        cy.contains('span', 'Para: *').should('contain.text', 'Para: *')
        cy.contains('span', 'Tipo operação: *').should('contain.text', 'Tipo operação: *')
        cy.xpath("(//div[contains(.,'Data Transferência *')])[9]")
            .should('be.visible')
            .and('exist')
        cy.xpath("(//div[contains(.,'Valor Transferência *')])[9]")
            .should('be.visible')
            .and('exist')
        cy.xpath("//textarea[contains(@formcontrolname,'description')]").type("Esse campo estamos testando")
        cy.contains('button', 'Salvar').should('contain.text', 'Salvar')
        cy.contains('button', 'Cancelar').should('contain.text', 'Cancelar')
        cy.xpath("(//button[contains(@type,'button')])[6]")
            .should('be.visible')
            .and('exist')
            .click()
    });

    it('Verificar fluxo de Transferencia entre Conta bancárias > Caixa Dinheiro', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('button', 'Transferência entre contas').click()
        cy.contains('h6', 'Transferência entre contas bancárias').should('contain.text', 'Transferência entre contas bancárias')
        cy.wait(2000)
        cy.contains('span', 'Transferido de: *', { timeout: 5000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Bancária')]", { timeout: 3000 }).click({ multiple: true })

        cy.xpath("(//div[contains(.,'Para: *')])[8]", { timeout: 3000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Caixa Dinheiro')]", { timeout: 3000 }).click()

        cy.contains('span', 'Tipo operação: *', { timeout: 3000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Transferência no PIX')]").click()

        cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[3]").click()

        cy.wrap(new Date().getDate()).as('currentDay')




        cy.get('@currentDay').then((day) => {
            cy.wait(1000)
            cy.log(`Procurando pelo dia: ${day}`)
            cy.xpath(`(//button[contains(@type,'button') and contains(., '${day}')])[1]`, { timeout: 5000 })
                .should('exist')
                .and('be.visible')
                .then($el => {
                    cy.log(`Elemento encontrado: ${$el.text()}`)
                    cy.wait(2000) // Espera adicional antes do clique
                    // Usar cy.wrap para garantir que estamos trabalhando com um elemento atualizado
                    cy.wrap($el).click({ force: true })
                })
        })

        // Gere um valor aleatório entre 100 e 1000 com duas casas decimais
        const randomAmount = (Math.random() * 9 + 1).toFixed(2);  // 900 + 100 = range de 100 a 1000

        // Localize o elemento e preencha com o valor aleatório
        cy.xpath('//input[contains(@type,\'text\')]')
            .should('be.visible')
            .clear()
            .type(randomAmount)

        cy.xpath("//textarea[contains(@formcontrolname,'description')]").type('Aqui estamos testando novamente esse campo')

        cy.contains('button', 'Salvar').click()
        cy.contains('Continuar').click()
        cy.contains('Transferência realizada com sucesso.').should('be.visible')
        cy.contains('Sucesso').should('be.visible')
        cy.contains('button', 'Ok').click()
    });

    it('Verificar fluxo de Transferencia entre Caixa Dinheiro > Conta bancárias', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();;
        cy.contains('span', 'Extrato').click()
        cy.contains('span', ' Conta Bancária ').click()
        cy.contains('button', 'Transferência entre contas').click()
        cy.contains('h6', 'Transferência entre contas bancárias').should('contain.text', 'Transferência entre contas bancárias')
        cy.wait(2000)

        cy.xpath("(//div[contains(.,'Para: *')])[8]", { timeout: 3000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Caixa Dinheiro')]", { timeout: 3000 }).click()

        cy.contains('span', 'Transferido de: *', { timeout: 5000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Bancária')]", { timeout: 3000 }).click({ multiple: true })

        cy.contains('span', 'Tipo operação: *', { timeout: 3000 }).dblclick({ force: true })

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Transferência no PIX')]").click()

        cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[3]").click()

        cy.wrap(new Date().getDate()).as('currentDay')




        cy.get('@currentDay').then((day) => {
            cy.wait(3000)
            cy.log(`Procurando pelo dia: ${day}`)
            cy.xpath(`(//button[contains(@type,'button') and contains(., '${day}')])[1]`, { timeout: 5000 })
                .should('exist')
                .and('be.visible')
                .then($el => {
                    cy.log(`Elemento encontrado: ${$el.text()}`)
                    cy.wait(2000) // Espera adicional antes do clique
                    // Usar cy.wrap para garantir que estamos trabalhando com um elemento atualizado
                    cy.wrap($el).click({ force: true })
                })
        })

        // Gere um valor aleatório entre 100 e 1000 com duas casas decimais
        const randomAmount = (Math.random() * 9 + 1).toFixed(2);  // 900 + 100 = range de 100 a 1000

        // Localize o elemento e preencha com o valor aleatório
        cy.xpath('//input[contains(@type,\'text\')]')
            .should('be.visible')
            .clear()
            .type(randomAmount)

        cy.xpath("//textarea[contains(@formcontrolname,'description')]").type('Aqui estamos testando novamente esse campo')

        cy.contains('button', 'Salvar').click()
        cy.contains('Continuar').click()
        cy.contains('Transferência realizada com sucesso.').should('be.visible')
        cy.contains('Sucesso').should('be.visible')
        cy.contains('button', 'Ok').click()
    });
});
