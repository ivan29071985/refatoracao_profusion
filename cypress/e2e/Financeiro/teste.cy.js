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

  it('Validar Fluxo de Cadastro - Pacientes', () => {

    const cpf = gerarCpfValido();

    // Função simples para gerar CPF válido
    function gerarCpfValido() {
      const numeros = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

      // Calcula primeiro dígito
      let soma = 0;
      for (let i = 0; i < 9; i++) {
        soma += numeros[i] * (10 - i);
      }
      let resto = (soma * 10) % 11;
      const digito1 = resto === 10 ? 0 : resto;

      // Calcula segundo dígito
      soma = 0;
      for (let i = 0; i < 9; i++) {
        soma += numeros[i] * (11 - i);
      }
      soma += digito1 * 2;
      resto = (soma * 10) % 11;
      const digito2 = resto === 10 ? 0 : resto;

      // Monta o CPF completo
      return numeros.join('') + digito1 + digito2;
    }

    const baseUrl = Cypress.env('currentBaseUrl');
    cy.visit(baseUrl);
    cy.wait(2000);
    cy.get('#patient').click()
    cy.get('span').contains('Lista de pacientes').click()
    cy.get('button').contains('Incluir').click()
    cy.wait(1000)
    cy.get('#cpf-input').type(cpf)

    cy.get('button').contains('Prosseguir').click()

  });
});
