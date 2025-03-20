
/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />


describe.only('Fluxo Atendimento sem Acolhimento', () => {
    beforeEach(() => {
        const baseUrl = Cypress.env('environment') === 'staging'
            ? Cypress.env('baseUrl').staging
            : Cypress.env('environment') === 'producao'
                ? Cypress.env('baseUrl').producao
                : Cypress.env('baseUrl').homologacao;

        cy.visit(`${baseUrl}/auth/login`)
        cy.loginDrBarros();
        cy.allure().severity('critical');
    });

    it('Validar Fluxo de Atendimento Médico sem Acolhimento', () => {
        cy.get('span').contains('Atendimento médico', { timeout: 20000 }).click()
        cy.wait(2000)
        cy.get('span').contains(' Atender ', { timeout: 20000 }).should('be.visible')
            .first()
            .click();

        cy.get('button').contains('Iniciar atendimento', { timeout: 20000 }).click()

        cy.wait(3000)

        cy.xpath("//textarea[@id='anamnesi_content']").type('Orientações Médicas Prezado paciente, Após nossa consulta de hoje, seguem as orientações para seu tratamento: Hidratação: É fundamental que você mantenha uma boa ingestão hídrica ao longo do dia.Recomendo o consumo de pelo menos 2 litros de água diariamente, distribuídos em pequenas quantidades várias vezes ao dia.Mantenha sempre uma garrafa de água por perto como lembrete. Atividade física: Realize exercícios físicos regulares, preferencialmente aeróbicos(caminhada, natação ou ciclismo), por no mínimo 30 minutos, 3 a 5 vezes por semana.Inicie gradualmente e aumente a intensidade conforme sua adaptação. Medicação para dor: Em caso de dor, você poderá fazer uso de dipirona 500mg a cada 8 horas, até que os sintomas diminuam.Não exceda a dose máxima de 4 comprimidos por dia. Retorno: Agende retorno em 30 dias para reavaliação. Estas medidas são importantes para seu bem - estar e melhora do quadro atual.Em caso de piora dos sintomas ou surgimento de novos sintomas, entre em contato imediatamente. Atenciosamente, Dr. [Nome do Médico] CRM[número]', { timeout: 20000 })

        cy.wait(3000)

        cy.xpath("//input[@placeholder='Buscar códigos CID-10 das Hipóteses Diagnósticas']").click()
        cy.contains('span', ' (M154) (Osteo)Artrose Erosiva ').click()
        cy.get('button').contains('Sim').click()

        cy.wait(3000)

        cy.get('button').contains('Finalizar atendimento', { timeout: 20000 }).click()

        cy.xpath("//input[contains(@value,'false')]", { timeout: 20000 }).click()
        cy.get('button').contains('Avançar', { timeout: 20000 }).click()
        cy.get('button').contains(' Finalizar atendimento ', { timeout: 20000 }).click()

// Após finalizar o atendimento
cy.url().then(currentUrl => {
    // Define as possíveis URLs para os diferentes ambientes
    const possiveisUrls = [
        '/waiting-room-v2/medical-care',
        '/appointment/',
        '?mode=create'
    ];
    
    // Verifica se pelo menos uma das possíveis URLs está contida na URL atual
    const urlValida = possiveisUrls.some(url => currentUrl.includes(url));
    expect(urlValida, `URL ${currentUrl} deveria conter uma das URLs válidas`).to.be.true;
});

    });
});