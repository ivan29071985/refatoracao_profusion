/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_93', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
      });

    it('Verificar somatória de valor em repasse de 5 dias atrás da data atual', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();
        cy.contains('Repasse').click()
        cy.xpath("(//span[contains(@class,'mat-mdc-button-touch-target')])[1]").click()

        // Pega a data atual
        const today = new Date();

        // Subtrai 5 dias
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() - 5);

        // Obtém o dia como número
        const targetDay = targetDate.getDate();

        cy.xpath(`//button[contains(@class,'mat-calendar-body-cell')][not(contains(@class,'disabled'))][normalize-space()='${targetDay}']`)
        .should('be.visible')
        .click({ force: true }, {timeout:10000});

        cy.get('#pesquisar').click({force:true})

        let somaColuna;
        let valorTotalExibido;

        // Primeiro vamos pegar todos os valores da coluna e somar
        cy.get('td')
            .filter(':contains("R$")')
            .then($elements => {
                let total = 0;

                // Itera sobre cada elemento encontrado
                $elements.each((index, element) => {
                    const value = parseFloat(
                        element.textContent
                            .replace('R$', '')
                            .replace(',', '.')
                            .trim()
                    );

                    if (!isNaN(value)) {
                        total += value;
                    }
                });

                // Guarda a soma em uma variável
                somaColuna = total;
                cy.wrap(somaColuna).as('somaColuna');

                // Xpath corrigido e timeout aumentado
                cy.xpath('//span[contains(@class, "ng-tns-c")][contains(.,"Valor total a pagar: R$")]', { timeout: 10000 })
                    .invoke('text')
                    .then(spanText => {
                        valorTotalExibido = parseFloat(
                            spanText
                                .replace('Valor total a pagar: R$', '')
                                .replace(',', '.')
                                .trim()
                        );

                        cy.wrap(valorTotalExibido).as('valorTotalExibido');

                        // Faz a validação
                        expect(somaColuna).to.equal(valorTotalExibido);

                        // Log dos valores
                        cy.log(`Soma da coluna: R$ ${somaColuna.toFixed(2)}`);
                        cy.log(`Valor exibido no span: R$ ${valorTotalExibido.toFixed(2)}`);
                    });
            });

    });
})

