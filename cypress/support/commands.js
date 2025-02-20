// commands.js
Cypress.Commands.add('setupAndLogin', (email = 'ivan.santos+1@amorsaude.com', password = 'Iv@n198529') => {
    // Gera um identificador único para a sessão
    const sessionId = `login_${Date.now()}`;
    
    const environment = Cypress.env('environment');
    const baseUrl = environment === 'staging'
      ? Cypress.env('baseUrl').staging
      : Cypress.env('baseUrl').homologacao;
    Cypress.env('currentBaseUrl', baseUrl);
  
    cy.session(sessionId, () => {
      const currentBaseUrl = Cypress.env('currentBaseUrl');
      
      cy.visit(`${currentBaseUrl}`);
      cy.get('#E-mail').type(email);
      cy.get('#Senha').type(password, { log: false });
      cy.contains('Entrar', {timeout:1000} ).click();
      cy.contains('span', /Automação (Staging|Homolog)/, { timeout: 10000 }).click({ force: true });
      cy.contains('button', ' Entrar ', {timeout:10000} ).click();
      cy.get('#schedule', { timeout: 10000 }).should('exist');
    }, {
      validate: () => {
        cy.get('#schedule', { timeout: 10000 }).should('exist');
      },
      cacheAcrossSpecs: true
    });
  });

//*********************************************************************/

// Em commands.js
Cypress.Commands.add('loginDrBarros', () => {
  cy.get('#E-mail').type('ivan.santos+drbarros@amorsaude.com');
  cy.get('#Senha').type('Iv@n198529', { log: false });

  cy.contains('Entrar', { timeout: 1000 }).click();
  cy.contains('span', /Automação (Staging|Homolog)/, { timeout: 10000 }).click({ force: true });
  cy.contains('button', ' Entrar ', { timeout: 10000 }).click();
});