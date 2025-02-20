describe('fu_47', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar Fluxo Abertura de Grade do Profissional', () => {
    cy.visit('/')
    cy.get('#register').click()
    cy.contains('span', 'Lista de profissionais').click()
    cy.contains('div', 'Procure por CPF ou nome').type('34921977879 {enter}')
    cy.contains('span', 'edit').click()
    cy.contains('span', 'Horários de atendimento').click()
    cy.contains('button', 'Incluir').click()

    const today = new Date();
    const dayOfWeek = today.getDay()

    const checkboxSelectorMap = {
        0: "//span[@class='checkbox-label'][contains(.,'Domingo')]",         // Supondo que o id do checkbox de domingo seja 'checkbox-domingo'
        1: "//span[@class='checkbox-label'][contains(.,'Segunda-feira')]",   // Supondo que o id do checkbox de segunda seja 'checkbox-segunda'
        2: "//span[@class='checkbox-label'][contains(.,'Terça-feira')]",     // Supondo que o id do checkbox de terça seja 'checkbox-terca'
        3: "//span[@class='checkbox-label'][contains(.,'Quarta-feira')]",    // Supondo que o id do checkbox de quarta seja 'checkbox-quarta'
        4: "//span[@class='checkbox-label'][contains(.,'Quinta-feira')]",    // Supondo que o id do checkbox de quinta seja 'checkbox-quinta'
        5: "//span[@class='checkbox-label'][contains(.,'Sexta-feira')]",     // Supondo que o id do checkbox de sexta seja 'checkbox-sexta'
        6: "//span[@class='checkbox-label'][contains(.,'Sábado')]"           // Supondo que o id do checkbox de sábado seja 'checkbox-sabado'
    };

    const checkboxSelector = checkboxSelectorMap[dayOfWeek];
    if (checkboxSelector) {
        cy.xpath(checkboxSelector).click();
    } else {
        throw new Error('Não foi possível determinar o checkbox correspondente ao dia da semana atual.');
    }

    cy.get('#horaInicial').type('08:00')
    cy.get('#horaFinal').type('23:30')
    cy.contains('div', 'Áreas de atuação').click()
    cy.contains('span', ' Área de Atuação - Teste Automação ').click()
    cy.contains('div', 'Limitar procedimentos realizados no período').click()
    cy.contains('span', ' Consulta Áreas de Atuação ').click()
    cy.contains('button', ' Confirmar ').click({ force: true })
    cy.contains('h2', 'Grade criada com sucesso.').should('be.visible')
    cy.contains('button', 'Ok').click()
});

  it('Fluxo de Contas a Pagar com data de pagamento 30 dias atrás', () => {
    cy.visit('/');   
  });
});

