
/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />

describe('Validação Profusion - Pós-consulta', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
    });


    it('Validar url Pós-consulta', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.url().should('include', 'https://amei-staging.amorsaude.com.br/waiting-room-v2/after-appointment')
    })

    it('Validar bread Home', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.xpath("//a[@routerlink='/home'][contains(.,'Home')]").click()

        cy.url().should('include', 'https://amei-staging.amorsaude.com.br/')
    });

    it('Validar bread Sala de espera', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.xpath("//a[@routerlink='/waiting-room'][contains(.,'Sala de espera')]").click()

        cy.url().should('include', 'https://amei-staging.amorsaude.com.br/waiting-room-v2')
    });

    it('Validar bread Pós-consulta', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.xpath("//a[@class='text-gray-medium'][contains(.,'Pós-consulta')]").click()

        cy.url().should('include', 'https://amei-staging.amorsaude.com.br/waiting-room-v2/after-appointment')

    });

    it('Validar título Sala de espera', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.xpath("//h3[contains(.,'Sala de espera')]").should('have.text', 'Sala de espera');
    });

    it('Validar subtítulo Pós-consulta', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.xpath("//h3[@class='fs-5 fw-bold text-gray-medium m-0'][contains(.,'Pós-consulta')]").should('contain.text', 'Pós-consulta')
    });

    it('Validar input data com data valida', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

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
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.wait(5000)

        cy.get('#data_espera')
            .should('exist')
            .clear()

        cy.xpath("//input[contains(@placeholder,'Profissionais')]").click()

        cy.xpath("//mat-error[@aria-atomic='true'][contains(.,'*Campo obrigatório.')]").should('be.visible')

    });

    it('Validar sem grade para visualização', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.wait(5000)

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

    it('Validar selector Proposta Gerada', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.xpath("(//div[contains(.,'Proposta Gerada')])[10]").click();

        cy.xpath("//span[@class='mat-option-text'][contains(.,'Sim')]").should('be.visible')
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Não')]").should('be.visible')

    });

    it('Validar input area de atuação', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.xpath("//input[contains(@placeholder,'Área de atuação')]").click();

        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Acupuntura')]").should('be.visible');
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Anestesiologia')]").should('be.visible');
    });

    it('Validar input Profissionais', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.xpath("//input[contains(@placeholder,'Profissionais')]").should('be.visible')


    });

    it('Validar input Status', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.xpath("//input[contains(@placeholder,'Status')]").click()

        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Todos')]").should('be.visible')

        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Em atendimento pós-consulta')]").should('be.visible')

        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Em espera pós-consulta')]").should('be.visible')

        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Atendido pós-consulta')]").should('be.visible')

        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Não compareceu pós-consulta')]").should('be.visible')
    });

    it('Validar botão Pesquisar', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Pós-consulta').click()

        cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible')
    });

})