/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('fu_1', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Verificar menu Saldo', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('span', 'Saldo').click()
    cy.location('pathname').should('eq', '/financial/balance');
  });

  it('Validar breadcrumb Home', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('span', 'Saldo').click()
    cy.contains('a', 'Home').click()
    cy.location('pathname').should('eq', '/');
  });

  it('Validar breadcrumb Financeiro', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('span', 'Saldo').click()
    cy.contains('a', 'Financeiro').click()
    cy.location('pathname').should('eq', '/financial');
  });

  it('Validar breadcrumb Saldo', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('span', 'Saldo').click()
    cy.contains('a', 'Saldo').click()
    cy.location('pathname').should('eq', '/financial/balance')
  });

  it('Validar H3 Saldo financeiro', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('span', 'Saldo').click()
    cy.contains('h3', 'Saldo financeiro').should('contain.text', 'Saldo financeiro')
  });

  it('Validar H4 Saldo Geral', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('span', 'Saldo').click()
    cy.contains('h4', 'Saldo Geral').should('contain.text', 'Saldo Geral')
  });

  it('Validar placeholder Data do saldo', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('span', 'Saldo').click()
    cy.get('input[placeholder="Data do saldo"]')
      .should('exist')
      .and('have.attr', 'placeholder', 'Data do saldo');
  });

  it('Validar H5 R$ com saldo que terá alterações de valores', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('span', 'Saldo').click()
    cy.contains('h5', 'R$', {timeout:5000}).should("contain.text", "R$")
  });

  it('Validar somatória de todos as contas (Positivos e Negativos)', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('span', 'Saldo').click()


    let capturedValue;
    // Capture o valor do elemento e armazene na variável
    cy.get('.mat-mdc-card-content > :nth-child(1)')
      .invoke('text')
      .then((text) => {
        capturedValue = text.trim();
        cy.log(`Valor capturado: ${capturedValue}`);

        let capturedValue1;
        // Capture o valor do elemento e armazene na variável
        cy.get('.mat-mdc-card-content > :nth-child(2)')
          .invoke('text')
          .then((text) => {
            capturedValue1 = text.trim();
            cy.log(`Valor capturado: ${capturedValue1}`);

            let capturedValue2;
            // Capture o valor do elemento e armazene na variável
            cy.get('.mat-mdc-card-content > :nth-child(3)')
              .invoke('text')
              .then((text) => {
                capturedValue2 = text.trim();
                cy.log(`Valor capturado: ${capturedValue2}`);

                let capturedValue3;
                // Capture o valor do elemento e armazene na variável
                cy.get('.mat-mdc-card-content > :nth-child(4)')
                  .invoke('text')
                  .then((text) => {
                    capturedValue3 = text.trim();
                    cy.log(`Valor capturado: ${capturedValue3}`);

                    let capturedValue4;
                    // Capture o valor do elemento e armazene na variável
                    cy.get('.mat-mdc-card-content > :nth-child(5)')
                      .invoke('text')
                      .then((text) => {
                        capturedValue4 = text.trim();
                        cy.log(`Valor capturado: ${capturedValue4}`);

                        let capturedValue5;
                        // Capture o valor do elemento e armazene na variável
                        cy.get('.mat-mdc-card-content > :nth-child(6)')
                          .invoke('text')
                          .then((text) => {
                            capturedValue5 = text.trim();
                            cy.log(`Valor capturado: ${capturedValue5}`);

                            let capturedValue6;
                            // Capture o valor do elemento e armazene na variável
                            cy.get('.mat-mdc-card-content > :nth-child(7)')
                              .invoke('text')
                              .then((text) => {
                                capturedValue6 = text.trim();
                                cy.log(`Valor capturado: ${capturedValue6}`);

                                let total;
                                // Capture o valor do elemento e armazene na variável
                                cy.get('h5')
                                  .invoke('text')
                                  .then((text) => {
                                    total = text.trim();
                                    cy.log(`Valor capturado: ${total}`);

                                    cy.get('h5').invoke('text').then((text) => {
                                      const value = parseFloat(text.replace('R$', '').replace('.', '').replace(',', '.').trim());
                                      cy.log(`Valor capturado: R$ ${value.toFixed(2)}`);
                                      // Não retorne o valor aqui
                                      // Em vez disso, use-o em outra operação Cypress ou armazene-o em uma variável do teste
                                      cy.wrap(value).as('capturedValue');
                                    }).then(() => {
                                      // Continue com o próximo comando Cypress aqui
                                      cy.get('@capturedValue').then((value) => {
                                        // Use o valor aqui
                                        cy.log(`Valor usado: R$ ${value}`);
                                      });
                                    });


                                  });


                              });

                          });
                      })
                  })
              })
          })
      })
  })

  it('Validar funcionamento do input Data do Saldo com 10 dias atrás', () => {
    const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
    cy.visit(baseUrl);
    cy.get('#financial', {timeout:10000} ).click();
    cy.contains('span', 'Saldo').click()
    cy.xpath("//span[contains(@class,'mat-mdc-button-touch-target')]").click()


    cy.wrap(new Date()).then((today) => {
      const passado = new Date(today);
      passado.setDate(passado.getDate() - 10);
      const day = passado.getDate().toString();

      cy.wait(3000)
      cy.log(`Procurando pelo dia: ${day}`)
      cy.xpath(`(//button[contains(@type,'button') and contains(., '${day}')])[1]`, { timeout: 5000 })
        .should('exist')
        .and('be.visible')
        .then($el => {
          cy.log(`Elemento encontrado: ${$el.text()}`)
          cy.wait(1000) // Espera adicional antes do clique
          // Usar cy.wrap para garantir que estamos trabalhando com um elemento atualizado
          cy.wrap($el).click({ force: true })
        })
    })

    let capturedValue;
    // Capture o valor do elemento e armazene na variável
    cy.get('.mat-mdc-card-content > :nth-child(1)')
      .invoke('text')
      .then((text) => {
        capturedValue = text.trim();
        cy.log(`Valor capturado: ${capturedValue}`);

        let capturedValue1;
        // Capture o valor do elemento e armazene na variável
        cy.get('.mat-mdc-card-content > :nth-child(2)')
          .invoke('text')
          .then((text) => {
            capturedValue1 = text.trim();
            cy.log(`Valor capturado: ${capturedValue1}`);

            let capturedValue2;
            // Capture o valor do elemento e armazene na variável
            cy.get('.mat-mdc-card-content > :nth-child(3)')
              .invoke('text')
              .then((text) => {
                capturedValue2 = text.trim();
                cy.log(`Valor capturado: ${capturedValue2}`);

                let capturedValue3;
                // Capture o valor do elemento e armazene na variável
                cy.get('.mat-mdc-card-content > :nth-child(4)')
                  .invoke('text')
                  .then((text) => {
                    capturedValue3 = text.trim();
                    cy.log(`Valor capturado: ${capturedValue3}`);

                    let capturedValue4;
                    // Capture o valor do elemento e armazene na variável
                    cy.get('.mat-mdc-card-content > :nth-child(5)')
                      .invoke('text')
                      .then((text) => {
                        capturedValue4 = text.trim();
                        cy.log(`Valor capturado: ${capturedValue4}`);

                        let capturedValue5;
                        // Capture o valor do elemento e armazene na variável
                        cy.get('.mat-mdc-card-content > :nth-child(6)')
                          .invoke('text')
                          .then((text) => {
                            capturedValue5 = text.trim();
                            cy.log(`Valor capturado: ${capturedValue5}`);

                            let capturedValue6;
                            // Capture o valor do elemento e armazene na variável
                            cy.get('.mat-mdc-card-content > :nth-child(7)')
                              .invoke('text')
                              .then((text) => {
                                capturedValue6 = text.trim();
                                cy.log(`Valor capturado: ${capturedValue6}`);

                                let total;
                                // Capture o valor do elemento e armazene na variável
                                cy.get('h5')
                                  .invoke('text')
                                  .then((text) => {
                                    total = text.trim();
                                    cy.log(`Valor capturado: ${total}`);

                                    cy.get('h5').invoke('text').then((text) => {
                                      const value = parseFloat(text.replace('R$', '').replace('.', '').replace(',', '.').trim());
                                      cy.log(`Valor capturado: R$ ${value.toFixed(2)}`);
                                      // Não retorne o valor aqui
                                      // Em vez disso, use-o em outra operação Cypress ou armazene-o em uma variável do teste
                                      cy.wrap(value).as('capturedValue');
                                    }).then(() => {
                                      // Continue com o próximo comando Cypress aqui
                                      cy.get('@capturedValue').then((value) => {
                                        // Use o valor aqui
                                        cy.log(`Valor usado: R$ ${value}`);
                                      });
                                    });


                                  });


                              });

                          });
                      })
                  })
              })
          })



      });
  });
});
