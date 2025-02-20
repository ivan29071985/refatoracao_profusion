/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_104', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
      });

    it('Validar nomenclatura da completo da Unidade epecífica ', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', {timeout:10000} ).click();
        cy.contains('Cadeado').click()
        cy.wait(2000)
        cy.contains('Pesquisar').click({ force: true })
        cy.xpath("//span[@class='datatable-header-cell-label draggable'][contains(.,'Unidade')]").should('be.visible')
        cy.xpath("(//span[@class='ng-star-inserted'][contains(.,'Unidade Teste / Treinamento')])[1]").should('be.visible')
    });

    it('Validar se não contem nomenclatura incompleta', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', {timeout:10000} ).click();
        cy.contains('Cadeado').click()
        cy.wait(2000)
        cy.contains('Pesquisar').click({ force: true })

        // O texto exato que estamos procurando
        const textoEsperado = 'e Teste / Trein'

        // Localiza o elemento que contém o texto (ajuste o seletor conforme necessário)
        cy.xpath("(//span[@class='ng-star-inserted'][contains(.,'Unidade Teste / Treinamento')])[1]").then(($el) => {
            const textoAtual = $el.text().trim()

            // Compara o texto atual com o texto esperado
            if (textoAtual === textoEsperado) {
                cy.log(`O texto encontrado é exatamente igual a "${textoEsperado}"`)
            } else {
                cy.log(`O texto encontrado ("${textoAtual}") não é exatamente igual a "${textoEsperado}"`)
            }

            // Assertion para garantir que o teste falhe se os textos não forem iguais
            expect(textoAtual).to.not.equal(textoEsperado,
                `O texto não deveria ser exatamente igual a "${textoEsperado}", mas é.`)
        })
    })

})

