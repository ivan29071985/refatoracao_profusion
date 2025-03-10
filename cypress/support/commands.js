// commands.js
Cypress.Commands.add('setupAndLogin', (email = 'ivan.santos+1@amorsaude.com', password = 'Iv@n198529') => {
    // Gera um identificador único para a sessão
    const sessionId = `login_${Date.now()}`;
    
    const environment = Cypress.env('environment') || Cypress.env('CYPRESS_ENV');
    const baseUrl = environment === 'staging'
      ? Cypress.env('baseUrl').staging
      : environment === 'producao' || environment === 'prod'
        ? Cypress.env('baseUrl').producao
        : Cypress.env('baseUrl').homologacao;
    Cypress.env('currentBaseUrl', baseUrl);
  
    cy.session(sessionId, () => {
      const currentBaseUrl = Cypress.env('currentBaseUrl');
      
      cy.visit(`${currentBaseUrl}`);
      cy.get('#E-mail').type(email);
      cy.get('#Senha').type(password, { log: false });
      cy.contains('Entrar', {timeout:1000} ).click();
      cy.contains('span', /Automação (Staging|Homolog|Prod)/, { timeout: 10000 }).click({ force: true });
      cy.contains('button', ' Entrar ', {timeout:10000} ).click();
      cy.get('#schedule', { timeout: 10000 }).should('exist');
    }, {
      validate: () => {
        cy.get('#schedule', { timeout: 10000 }).should('exist');
      },
      cacheAcrossSpecs: true
    });
  });

  // Tratamento global para erros não capturados
Cypress.on('uncaught:exception', (err, runnable) => {
  // Se for o erro de unshift, vamos ignorar para que o teste continue
  if (err.message.includes("Cannot read properties of undefined (reading 'unshift')")) {
    console.log('Erro de unshift detectado e ignorado');
    return false;
  }
  // Para outros erros, deixamos o Cypress decidir
  return true;
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