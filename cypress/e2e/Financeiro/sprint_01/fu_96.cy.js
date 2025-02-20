/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_96', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
      });

    it('Fluxo de Contas a pagar para verificar preenchimento da data de vencimento no menu Resumo ', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', {timeout:10000} ).click();;
        cy.contains('Contas a pagar').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        // Função para gerar um número aleatório entre 1 e 5000
        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        // Gerar número aleatório
        const randomNumber = getRandomNumber();

        // Preencher o campo com o número aleatório
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
        cy.xpath("//input[@prefix='R$ ']").clear().type('1000')
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

        cy.xpath("//button[contains(.,'Pagar')]").click()
        cy.xpath("//button[contains(.,'Dinheiro')]").click()
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Caixa Dinheiro')]").click()
        cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click()
        cy.contains('Parcela salva com sucesso !').should('be.visible')
        cy.contains('Ok').click()

        cy.contains('Extrato').click()
        cy.contains('Data da Baixa').click()
        //selecione a conta
        cy.get(':nth-child(9) > .col-7 > .account-table__label--one-line').click()
        cy.get('.col-md-12').within(() => {
            cy.get('tr').eq(1).within(() => {
                cy.get('td').eq(0).invoke('text').then((dataBaixa) => {
                    // Pegar o texto da coluna Data Vencimento
                    cy.get('td').eq(1).invoke('text').as('dataVencimento');

                    // Obter a data atual
                    const dataAtual = new Date().toLocaleDateString('pt-BR');

                    cy.get('@dataVencimento').then((dataVencimento) => {
                        expect(dataVencimento.trim()).to.equal(dataAtual);
                    });
                })
            })
        })

        // Rolar a tela para baixo
        cy.scrollTo('bottom', { duration: 1000 });

        // Aguardar um momento após a rolagem (opcional, mas pode ajudar na visualização)
        cy.wait(1000);
    });

    it('Validar span Data de Cadastro com data atual', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', {timeout:10000} ).click();;
        cy.contains('Contas a pagar', { timeout: 10000 }).click();
        cy.get("#pesquisar").click()
        cy.xpath("//th[contains(.,'Data Cadastro')]")
            .should('contain.text', 'Data Cadastro')
            .should('be.visible')

        // Função para formatar a data no padrão brasileiro
        function formatarDataAtual() {
            const data = new Date();
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();
            return `${dia}/${mes}/${ano}`;
        }

        // Uso no teste
        cy.get('table')
            .find('tr')
            .eq(1)
            .find('td')
            .eq(0)
            .should('contain', formatarDataAtual())

    });

})

