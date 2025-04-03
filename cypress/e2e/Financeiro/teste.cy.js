describe('Teste de Pagamento com Cartão', () => {
  beforeEach(() => {
    cy.setupAndLogin();
  });

  it('deve realizar o pagamento com cartão e simular o TEF', () => {
  
    const baseUrl = Cypress.env('currentBaseUrl');
    cy.visit(baseUrl);
    cy.wait(2000);
    cy.get('#schedule', { timeout: 20000 }).click();
    cy.get('span').contains('Check-in').click();
    cy.wait(2000);
    cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click();
    cy.get('button').contains('Receber').click();
    cy.get('button').contains('Cartão de Débito').click();
    cy.get('button').contains('Pagar').click();

    
      

    });
  });
