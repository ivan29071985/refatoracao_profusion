
/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />

describe('Profusion - Sala de espera > Visão Médico', () => {
    beforeEach(() => {
        cy.loginDrBarros(); // Usa o comando customizado
    });


    it('Validar url', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        const environment = Cypress.env('environment') || Cypress.env('CYPRESS_ENV');

        // Mapeamento de ambientes para domínios (sem duplicações)
        const domainMap = {
          'staging': 'https://amei-staging.amorsaude.com.br',
          'homologacao': 'https://amei-homolog.amorsaude.com.br',
          'producao': 'https://amei.amorsaude.com.br'
        };
        
        const baseDomain = domainMap[environment] || Cypress.env('currentBaseUrl');
        
        // Verificação da URL
        cy.url().should('include', `${baseDomain}/waiting-room-v2`);
    })

    it('Validar bread Home', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//a[@routerlink='/home'][contains(.,'Home')]").click()
        const environment = Cypress.env('environment') || Cypress.env('CYPRESS_ENV');

        // Mapeamento de ambientes para domínios
        const domainMap = {
          'staging': 'https://amei-staging.amorsaude.com.br',
          'homologacao': 'https://amei-homolog.amorsaude.com.br',
          'producao': 'https://amei.amorsaude.com.br'
        };
        
        const baseDomain = domainMap[environment] || Cypress.env('currentBaseUrl');
        
        // Verificar apenas o domínio base, sem o caminho específico
        cy.url().should('include', baseDomain);
    });

    it('Validar bread Sala de espera', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//a[@routerlink='/waiting-room'][contains(.,'Sala de espera')]").click()
        const environment = Cypress.env('environment') || Cypress.env('CYPRESS_ENV');

        // Mapeamento de ambientes para domínios
        const domainMap = {
          'staging': 'https://amei-staging.amorsaude.com.br',
          'homologacao': 'https://amei-homolog.amorsaude.com.br',
          'producao': 'https://amei.amorsaude.com.br'
        };
        
        const baseDomain = domainMap[environment] || Cypress.env('currentBaseUrl');
        
        // Verificar apenas o domínio base, sem o caminho específico
        cy.url().should('include', baseDomain);
    });

    it('Validar bread Atendimento médico', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//a[@class='text-gray-medium'][contains(.,'Atendimento médico')]").click()
        cy.url().should('include', 'https://amei-staging.amorsaude.com.br/waiting-room-v2/medical-care')
    });

    it('Validar título Sala de espera', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//h3[contains(.,'Sala de espera')]").should('have.text', 'Sala de espera');
    });

    it('Validar subtítulo Atendimento médico', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//h3[contains(.,'Atendimento médico')]").should('contain.text', 'Atendimento médico')
    });

    it('Validar input data com data valida', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.wait(5000)
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth() + 1; // +1 porque getMonth() retorna 0-11
        const validDate = currentDay > 1 ? currentDay - 1 : 1;
        // Garante que a data tenha 2 dígitos
        const formatDate = (num) => String(num).padStart(2, '0');
        cy.get('#data_espera')
            .should('exist')
            .clear()
            .type(`${formatDate(validDate)}/${formatDate(currentMonth)}/${today.getFullYear()}`)
            .should('have.value', `${formatDate(validDate)}/${formatDate(currentMonth)}/${today.getFullYear()}`);
    });

    it('Validar input data sem data de preenchimento', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.get('#data_espera')
            .should('exist')
            .clear()
        cy.xpath("//input[contains(@placeholder,'Profissionais')]").click()
        cy.xpath("//mat-error[@aria-atomic='true'][contains(.,'*Campo obrigatório.')]").should('be.visible')
    });

    it('Validar sem grade para visualização', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const formatDate = (num) => String(num).padStart(2, '0');
        cy.get('#data_espera')
            .should('exist')
            .clear()
            .type(`${formatDate(tomorrow.getDate())}/${formatDate(tomorrow.getMonth() + 1)}/${tomorrow.getFullYear()}`)
            .should('have.value', `${formatDate(tomorrow.getDate())}/${formatDate(tomorrow.getMonth() + 1)}/${tomorrow.getFullYear()}`);
        cy.xpath("//button[contains(.,'Pesquisar')]").click()
        cy.xpath("//p[@class='text-start'][contains(.,'Nenhum resultado encontrado!')]").should('be.visible')
    });

    it('Validar input area de atuação', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.get('[data-placeholder="Área de atuação"]').click()
        cy.contains(' Área de Atuação - Teste Automação ').should('be.visible')
        // Verifica se NÃO existem outras opções (adapte conforme necessário)
        cy.contains(' Alergia e imunologia ').should('not.exist')
    });

    it('Validar input Profissionais', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//input[contains(@placeholder,'Profissionais')]").click()
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").should('be.visible')
        cy.contains('Dr. Roger').should('not.exist')
    });

    it('Validar input Status', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//input[contains(@placeholder,'Status')]").should('exist')
    });

    it('Validar check Todos', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//input[contains(@placeholder,'Status')]").click()
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Todos')]").should('be.visible')        
    });

    it('Validar check Em atendimento', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//input[contains(@placeholder,'Status')]").click()
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Em atendimento')]").should('be.visible')        
    });

    it('Validar check Aguardando acolhimento assistido', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//input[contains(@placeholder,'Status')]").click()
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Aguardando acolhimento assistido')]").should('be.visible')        
    });

    it('Validar check Aguardando atendimento', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//input[contains(@placeholder,'Status')]").click()
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Aguardando atendimento')]").scrollIntoView().should('be.visible')        
    });

    it('Validar check Marcado - confirmado', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//input[contains(@placeholder,'Status')]").click()
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Marcado - confirmado')]").scrollIntoView().should('be.visible')        
    });

    it('Validar check Não compareceu', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//input[contains(@placeholder,'Status')]").click()
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Não compareceu')]").scrollIntoView().should('be.visible')        
    });

    it('Validar check Atendimento pausado', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//input[contains(@placeholder,'Status')]").click()
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Atendimento pausado')]").scrollIntoView().should('be.visible')        
    });

    it('Validar check Agendado', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//input[contains(@placeholder,'Status')]").click()
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Agendado')]").scrollIntoView().should('be.visible')        
    });

    it('Validar check Atendimento Não Finalizado', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//input[contains(@placeholder,'Status')]").click()
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Atendimento Não Finalizado')]").scrollIntoView().should('be.visible')        
    });

    it('Validar check Atendido', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//input[contains(@placeholder,'Status')]").click()
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Atendido')]").scrollIntoView().should('be.visible')        
    });

    it('Validar botão Pesquisar', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible')
    });

    it('Validar coluna Hora', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//th[@scope='col'][contains(.,'Hora')]", { timeout: 20000 }).should('be.visible')
    });

    it('Validar coluna Chegada', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//th[@scope='col'][contains(.,'Chegada')]", { timeout: 20000 }).should('be.visible')
    });

    it('Validar coluna Idade', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//th[@scope='col'][contains(.,'Idade')]", { timeout: 20000 }).should('be.visible')
    });

    it('Validar coluna Nome Paciente', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//th[@scope='col'][contains(.,'Nome Paciente')]", { timeout: 20000 }).should('be.visible')
    });

    it('Validar coluna Profissional', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//th[@scope='col'][contains(.,'Profissional')]", { timeout: 20000 }).should('be.visible')
    });

    it('Validar coluna Area de atuação', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//th[@scope='col'][contains(.,'Área de atuação')]", { timeout: 20000 }).should('be.visible')
    });

    it(' Validar coluna Procedimento', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//th[@scope='col'][contains(.,'Procedimento')]", { timeout: 20000 }).should('be.visible')
    });

    it(' Validar coluna Tempo de espera', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//th[@scope='col '][contains(.,'Tempo de espera')]", { timeout: 20000 }).should('be.visible')
    });

    it(' Validar coluna Tempo de pausa', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()

        cy.xpath("//th[@scope='col '][contains(.,'Tempo de pausa')]", { timeout: 20000 }).should('be.visible')
    });

    it('Validar coluna Status', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//th[@scope='col'][contains(.,'Status')]", { timeout: 20000 }).should('be.visible')
    });

    it('Validar coluna Ação', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("//th[@scope='col'][contains(.,'Ação')]", { timeout: 20000 }).should('be.visible')
    });

    it('Validar botão Atender', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.xpath("(//button[@color='primary'][contains(.,'Atender')])[1]", { timeout: 20000 }).should('be.visible')
    });

    it('Validar paginação', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#waiting-room', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.contains('span', 'Atendimento médico').click()
        cy.wait(3000)
        cy.xpath("(//div[contains(.,'5')])[13]", { timeout: 20000 }).click({ force: true })
        cy.xpath("//mat-option[contains(.,'10')]").should('be.visible')
        cy.xpath("//mat-option[contains(.,'25')]").should('be.visible')
        cy.xpath("//mat-option[contains(.,'50')]").should('be.visible')
    });

})