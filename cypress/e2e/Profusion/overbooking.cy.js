/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />

describe('Overbooking', () => {
    beforeEach(() => {

        cy.visit('/')
        //cy.loginIvan()
        //cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizadoo

        //cy.visit('/')
        //cy.loginIvan()
        cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizado

    })

    it('Validar abertura da grade com Overbooking 14', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(2000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
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
            cy.wait(3000)
            cy.xpath(checkboxSelector, { timeout: 20000 }).click();
        } else {
            throw new Error('Não foi possível determinar o checkbox correspondente ao dia da semana atual.');
        }

        cy.get('#horaInicial').type('16:00')
        cy.get('#horaFinal').type('18:00')
        cy.contains('div', 'Áreas de atuação').click()
        cy.wait(1000)
        cy.contains('span', ' Área de Atuação - Teste Automação ').click()
        cy.contains('div', 'Limitar procedimentos realizados no período').click()
        cy.contains('span', ' Consulta Áreas de Atuação ').click()
        cy.get('#overbooking_checkbox').click()
        cy.contains('p', 'Será adicionado mais 30% de slots para atendimento.').should('be.visible')
        cy.contains('button', ' Confirmar ').click({ force: true })

        cy.contains('h2', 'Grade criada com sucesso.').should('be.visible')
        cy.wait(1000)
        cy.contains('button', 'Ok').click()
    })

    it('Validar abertura da grade com acolhimento e overbooking 15', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(2000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
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
            cy.wait(3000)
            cy.xpath(checkboxSelector, { timeout: 20000 }).click();
        } else {
            throw new Error('Não foi possível determinar o checkbox correspondente ao dia da semana atual.');
        }

        cy.get('#horaInicial').type('11:00')
        cy.get('#horaFinal').type('12:00')
        cy.contains('div', 'Áreas de atuação').click()
        cy.wait(1000)
        cy.contains('span', ' Área de Atuação - Teste Automação ').click()
        cy.contains('div', 'Limitar procedimentos realizados no período').click()
        cy.contains('span', ' Consulta Áreas de Atuação ').click()
        cy.contains('span', ' Necessita acolhimento ').click()
        cy.get('#overbooking_checkbox').click()
        cy.contains('p', 'Será adicionado mais 30% de slots para atendimento.').should('be.visible')
        cy.contains('button', ' Confirmar ').click({ force: true })

        cy.contains('h2', 'Grade criada com sucesso.').should('be.visible')
        cy.wait(1000)
        cy.contains('button', 'Ok').click()
    })

    it('Validar abertura da grade com Overbooking em duplicidade 16', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(2000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
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
            cy.wait(3000)
            cy.xpath(checkboxSelector, { timeout: 20000 }).click();
        } else {
            throw new Error('Não foi possível determinar o checkbox correspondente ao dia da semana atual.');
        }

        cy.get('#horaInicial').type('16:00')
        cy.get('#horaFinal').type('18:00')
        cy.contains('div', 'Áreas de atuação').click()
        cy.wait(1000)
        cy.contains('span', ' Área de Atuação - Teste Automação ').click()
        cy.contains('div', 'Limitar procedimentos realizados no período').click()
        cy.contains('span', ' Consulta Áreas de Atuação ').click()
        cy.get('#overbooking_checkbox').click()
        cy.contains('p', 'Será adicionado mais 30% de slots para atendimento.').should('be.visible')
        cy.contains('button', ' Confirmar ').click({ force: true })

        cy.contains('Não foi possível criar a grade de atendimento.')
            .should('be.visible')
    })

    it('Validar edição da grade do profissional com Overbooking 17', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(2000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
        cy.contains('span', 'edit').click()
        cy.contains('span', 'Horários de atendimento').click()

        cy.wait(2000)

        const today = new Date();
        const dayOfWeek = today.getDay()

        const checkboxSelectorMap = {
            0: "//h5[@class='title'][contains(., ' Domingo ')]",
            1: "//h5[@class='title'][contains(., ' Segunda-feira ')]",
            2: "//h5[@class='title'][contains(., ' Terça-feira ')]",
            3: "//h5[@class='title'][contains(., ' Quarta-feira ')]",
            4: "//h5[@class='title'][contains(., ' Quinta-feira ')]",
            5: "//h5[@class='title'][contains(., ' Sexta-feira ')]",
            6: "//h5[@class='title'][contains(., ' Sábado ')]"
        }

        const dayOfWeekSelector = checkboxSelectorMap[dayOfWeek]
        if (dayOfWeekSelector) {
            cy.wait(3000)
            cy.xpath(dayOfWeekSelector, { timeout: 20000 })
            const xpathToEdit = `${dayOfWeekSelector}/ancestor::div[contains(@class, 'col')]//button[.//mat-icon[text()='edit']]`;
            cy.xpath(xpathToEdit).first().click()
            cy.wait(2000)
            cy.contains('span', ' Salvar ').click()

            cy.contains('h2', 'Grade atualizada com sucesso!').should('be.visible')

        } else {
            throw new Error("Não foi possível encontrar a grade");
        }
    })

    it('Validar fluxo na criação do bloqueio de agenda com Overbooking 18', () => {

        const horaInicial = '17:30'
        const horaFinal = '18:00'
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(2000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
        cy.contains('span', 'edit').click()
        cy.contains('span', 'Horários de atendimento').click()

        cy.wait(2000)

        const today = new Date();
        const dayOfWeek = today.getDay()

        const checkboxSelectorMap = {
            0: "//h5[@class='title'][contains(., ' Domingo ')]",
            1: "//h5[@class='title'][contains(., ' Segunda-feira ')]",
            2: "//h5[@class='title'][contains(., ' Terça-feira ')]",
            3: "//h5[@class='title'][contains(., ' Quarta-feira ')]",
            4: "//h5[@class='title'][contains(., ' Quinta-feira ')]",
            5: "//h5[@class='title'][contains(., ' Sexta-feira ')]",
            6: "//h5[@class='title'][contains(., ' Sábado ')]"
        }

        const dayOfWeekSelector = checkboxSelectorMap[dayOfWeek]
        if (dayOfWeekSelector) {
            cy.wait(1000)
            cy.xpath("(//button[.//span[contains(text(), 'Incluir')]])[2]").click();
            cy.get('mat-dialog-container').within(() => {
                cy.xpath('//mat-datepicker-toggle//button[@aria-label="Open calendar"]')
                    .eq(1)
                    .click()
                cy.xpath('//span[contains(@class, "mat-calendar-body-today")]/ancestor::button')
                    .first()
                    .click()
                cy.xpath('//mat-datepicker-toggle//button[@aria-label="Open calendar"]')
                    .eq(2)
                    .click()
                cy.xpath('//span[contains(@class, "mat-calendar-body-today")]/ancestor::button')
                    .first()
                    .click()
                cy.get('mat-select[formcontrolname="weekdays"]')
                    .click()
                cy.xpath('//mat-option//span[contains(@class, "mat-option-text")]')
                    .first()
                    .type('{esc}')
                cy.get('input[formcontrolname="initialTime"]')
                    .click()
                    .type(horaInicial)
                cy.get('input[formcontrolname="finalTime"]')
                    .click()
                    .type(horaFinal)
                cy.get('mat-select[formcontrolname="expertiseArea"]')
                    .click()
                cy.xpath('//mat-option//span[contains(@class, "mat-option-text")]')
                    .first()
                    .type('{esc}')
                cy.get('input[formcontrolname="description"]')
                    .type('teste')
                cy.get('button')
                    .contains('span', ' Salvar ')
                    .click()
            })
            cy.wait(3000)
            cy.contains('h2', 'Bloqueio(s) adicionado(s) com sucesso')
                .should('be.visible')
            cy.contains('button', 'Ok')
                .click()

        } else {
            throw new Error("Não foi possível encontrar a grade");
        }
    })

    it('Validar fluxo para edição do bloqueio da agenda com Overbooking 19', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(2000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
        cy.contains('span', 'edit').click()
        cy.contains('span', 'Horários de atendimento').click()

        cy.wait(2000)
        cy.xpath("(//button[.//mat-icon[contains(text(), ' edit ')]])").click({ timeout: 5000 })
        cy.get('input[formcontrolname="description"]')
            .clear()
            .type('Testando o fluxo de edição do bloqueio de grade')
        cy.get('button')
            .contains('span', ' Salvar ')
            .click()
        cy.wait(3000)
        cy.contains('h2', 'Bloqueio(s) adicionado(s) com sucesso').should('be.visible')
        cy.wait(2000)
        cy.contains('button', 'Ok')
            .click()
    })

    it('Validar a exclusão da grade do profissional 20', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(2000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
        cy.contains('span', 'edit').click()
        cy.contains('span', 'Horários de atendimento').click()

        cy.wait(2000)

        const today = new Date();
        const dayOfWeek = today.getDay()

        const checkboxSelectorMap = {
            0: "//h5[@class='title'][contains(., ' Domingo ')]",
            1: "//h5[@class='title'][contains(., ' Segunda-feira ')]",
            2: "//h5[@class='title'][contains(., ' Terça-feira ')]",
            3: "//h5[@class='title'][contains(., ' Quarta-feira ')]",
            4: "//h5[@class='title'][contains(., ' Quinta-feira ')]",
            5: "//h5[@class='title'][contains(., ' Sexta-feira ')]",
            6: "//h5[@class='title'][contains(., ' Sábado ')]"
        }

        const dayOfWeekSelector = checkboxSelectorMap[dayOfWeek]
        if (dayOfWeekSelector) {
            cy.wait(3000)
            cy.xpath(dayOfWeekSelector, { timeout: 20000 })
            const xpathDoClose = `${dayOfWeekSelector}/ancestor::div[contains(@class, 'col')]//button[.//mat-icon[text()='close']]`;
            cy.xpath(xpathDoClose).first().click();
            cy.contains('button', ' Sim ').click()
            cy.wait(2000)
            cy.contains('h2', 'Grade deletada com sucesso.').should('be.visible')

            cy.contains('button', 'Ok').click()

        } else {
            throw new Error("Não foi possível encontrar a grade");
        }
    })

    it('Validar a exclusão da grade do profissional 21', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(2000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
        cy.contains('span', 'edit').click()
        cy.contains('span', 'Horários de atendimento').click()

        cy.wait(2000)

        const today = new Date();
        const dayOfWeek = today.getDay()

        const checkboxSelectorMap = {
            0: "//h5[@class='title'][contains(., ' Domingo ')]",
            1: "//h5[@class='title'][contains(., ' Segunda-feira ')]",
            2: "//h5[@class='title'][contains(., ' Terça-feira ')]",
            3: "//h5[@class='title'][contains(., ' Quarta-feira ')]",
            4: "//h5[@class='title'][contains(., ' Quinta-feira ')]",
            5: "//h5[@class='title'][contains(., ' Sexta-feira ')]",
            6: "//h5[@class='title'][contains(., ' Sábado ')]"
        }

        const dayOfWeekSelector = checkboxSelectorMap[dayOfWeek]
        if (dayOfWeekSelector) {
            cy.wait(3000)
            cy.xpath(dayOfWeekSelector, { timeout: 20000 })
            const xpathDoClose = `${dayOfWeekSelector}/ancestor::div[contains(@class, 'col')]//button[.//mat-icon[text()='close']]`;
            cy.xpath(xpathDoClose).first().click();
            cy.contains('button', ' Sim ').click()
            cy.wait(2000)
            cy.contains('h2', 'Grade deletada com sucesso.').should('be.visible')
            cy.contains('button', 'Ok').click()

        } else {
            throw new Error("Não foi possível encontrar a grade");
        }
    })

    it('Validar a exclusão do bloqueio da agenda do profissional 22', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)

        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(2000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
        cy.contains('span', 'edit').click()
        cy.contains('span', 'Horários de atendimento').click()
        cy.wait(5000)
        cy.contains('button', ' close ')
            .click()
        cy.wait(3000)
        cy.contains('h2', 'Bloqueio deletado com sucesso')
            .should('be.visible')
        cy.contains('button', 'Ok')
            .click()
    })

    it('Validar abertura de grade com Overbooking com intervalo de 1 hora 23', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(2000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
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
            cy.wait(3000)
            cy.xpath(checkboxSelector, { timeout: 20000 }).click();
        } else {
            throw new Error('Não foi possível determinar o checkbox correspondente ao dia da semana atual.');
        }

        cy.get('#horaInicial').type('19:00')
        cy.get('#horaFinal').type('20:00')
        cy.contains('div', 'Áreas de atuação').click()
        cy.wait(1000)
        cy.contains('span', ' Área de Atuação - Teste Automação ').click()
        cy.contains('div', 'Limitar procedimentos realizados no período').click()
        cy.contains('span', ' Consulta Áreas de Atuação ').click()
        cy.get('#overbooking_checkbox').click()
        cy.contains('p', 'Será adicionado mais 30% de slots para atendimento.').should('be.visible')
        cy.contains('button', ' Confirmar ').click({ force: true })
        cy.wait(2000)
        cy.contains('h2', 'Grade criada com sucesso.').should('be.visible')
        cy.wait(1000)
        cy.contains('button', 'Ok').click()
    })

    Cypress._.times(8, (index) => {
        it(`Validar distribuição percentual de slots com Overbooking conforme horário da grade com intervalo de 1 hora 24 ${index + 1}`, () => {
            const baseUrl = Cypress.env('currentBaseUrl');
            cy.visit(baseUrl);
            cy.wait(3000); // Esperar carregamento inicial da página




            cy.get('#schedule').click()
            cy.wait(2000); // Esperar após clicar no schedule
            cy.contains('span', 'Agendar atendimento').click()
            cy.wait(2000)
            cy.get('[formcontrolname="expertiseAreas"]').should('be.visible').click();
            cy.wait(2000); // Esperar que a lista de opções seja exibida
            cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]").click({ force: true });
            cy.get('mat-select[formcontrolname="professionals"]').should('be.visible').click();
            cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
            cy.wait(2000); // Esperar após selecionar profissional

            cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible').click();
            cy.wait(2000); // Esperar o resultado da pesquisa

            cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
            cy.wait(2000);
            // Obter a data atual
            const today = new Date();
            const weekDay = today.getDay();

            // Selecionar o primeiro slot livre na coluna do dia atual
            cy.get('.cal-day-columns .cal-day-column')
                .eq(weekDay)
                .then(($column) => {
                    const slot = $column.find('.livre').first().length
                        ? $column.find('.livre').first()
                        : $column.find('.overbooking').first();

                    if (slot.length) {
                        cy.wrap(slot)
                            .should('be.visible')
                            .click()

                        // Fluxo de agendamento
                        cy.wait(3000);
                        cy.get('#cpf').type('121.685.156-54')
                        cy.wait(2000)
                        cy.contains('button', '+ Incluir procedimento').click();
                        cy.get('mat-select[id="AdProcedimento"]').click();
                        cy.contains('span', 'Consulta Áreas de Atuação').click();
                        cy.contains('button', 'Adicionar').click();
                        cy.contains('button', 'Confirmar').click();

                        // Confirmar sucesso e fechar
                        cy.contains('h2', 'Agendamento criado com sucesso').should('be.visible');
                        cy.contains('button', 'Ok').click();

                        cy.wait(2000); // Aguarde antes de tentar o próximo
                    }
                })
        })
    })

    Cypress._.times(8, (index) => {
        it(`Validar liberação de Slot ao desmarcar agendamento 25 ${index + 1}`, () => {
            const baseUrl = Cypress.env('currentBaseUrl');
            cy.visit(baseUrl);
            cy.wait(2000)
            cy.get('#schedule')
                .click()

            cy.intercept('GET', '**/api/v1/features**').as('carregarProfissionais')
            cy.wait('@carregarProfissionais')
            cy.contains('span', 'Confirmar agendamento').click()

            cy.contains('span', 'Pesquisar')
                .click()
            cy.get('mat-select[aria-label="Items per page:"]')
                .click({ timeout: 5000 })
            cy.get('mat-option').contains('50')
                .click()
            cy.contains('tr', 'Paulo Rick').within(() => {
                cy.get('button')
                    .click()
            })
            cy.get('mat-dialog-container').within(() => {
                cy.contains('div', ' Desmarcado pela clinica ')
                    .click()
                cy.get('button span')
                    .contains('Salvar')
                    .click()
            })
            cy.contains('div', 'Agendamento atualizado.')
                .should('be.visible')
            cy.contains('button', 'Ok')
                .click()
        })
    })

    it('Validar a exclusão da grade do profissional 26', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(2000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
        cy.contains('span', 'edit').click()
        cy.contains('span', 'Horários de atendimento').click()

        cy.wait(2000)

        const today = new Date();
        const dayOfWeek = today.getDay()

        const checkboxSelectorMap = {
            0: "//h5[@class='title'][contains(., ' Domingo ')]",
            1: "//h5[@class='title'][contains(., ' Segunda-feira ')]",
            2: "//h5[@class='title'][contains(., ' Terça-feira ')]",
            3: "//h5[@class='title'][contains(., ' Quarta-feira ')]",
            4: "//h5[@class='title'][contains(., ' Quinta-feira ')]",
            5: "//h5[@class='title'][contains(., ' Sexta-feira ')]",
            6: "//h5[@class='title'][contains(., ' Sábado ')]"
        }

        const dayOfWeekSelector = checkboxSelectorMap[dayOfWeek]
        if (dayOfWeekSelector) {
            cy.wait(3000)
            cy.xpath(dayOfWeekSelector, { timeout: 20000 })
            const xpathDoClose = `${dayOfWeekSelector}/ancestor::div[contains(@class, 'col')]//button[.//mat-icon[text()='close']]`;
            cy.xpath(xpathDoClose).first().click();
            cy.contains('button', ' Sim ').click()
            cy.wait(2000)
            cy.contains('button', 'Ok').click()

            cy.contains('h2', 'Grade deletada com sucesso.').should('be.visible')

        } else {
            throw new Error("Não foi possível encontrar a grade");
        }
    })

    it('Validar abertura de grade com Overbooking com intervalo de 2 horas 27', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(2000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
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
            cy.wait(3000)
            cy.xpath(checkboxSelector, { timeout: 20000 }).click();
        } else {
            throw new Error('Não foi possível determinar o checkbox correspondente ao dia da semana atual.');
        }

        cy.get('#horaInicial').type('21:00')
        cy.get('#horaFinal').type('23:00')
        cy.contains('div', 'Áreas de atuação').click()
        cy.wait(1000)
        cy.contains('span', ' Área de Atuação - Teste Automação ').click()
        cy.contains('div', 'Limitar procedimentos realizados no período').click()
        cy.contains('span', ' Consulta Áreas de Atuação ').click()
        cy.get('#overbooking_checkbox').click()
        cy.contains('p', 'Será adicionado mais 30% de slots para atendimento.').should('be.visible')
        cy.contains('button', ' Confirmar ').click({ force: true })
        cy.wait(2000)
        cy.contains('h2', 'Grade criada com sucesso.').should('be.visible')
    })

    Cypress._.times(16, (index) => {
        it(`Validar distribuição percentual de slots com Overbooking conforme horário da grade com intervalo de 2 hora 28 ${index + 1}`, () => {
            const baseUrl = Cypress.env('currentBaseUrl');
            cy.visit(baseUrl);
            cy.wait(3000); // Esperar carregamento inicial da página




            cy.get('#schedule').click()
            cy.wait(2000); // Esperar após clicar no schedule
            cy.contains('span', 'Agendar atendimento').click()
            cy.wait(2000)
            cy.get('[formcontrolname="expertiseAreas"]').should('be.visible').click();
            cy.wait(2000); // Esperar que a lista de opções seja exibida
            cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]").click({ force: true });
            cy.get('mat-select[formcontrolname="professionals"]').should('be.visible').click();
            cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
            cy.wait(2000); // Esperar após selecionar profissional

            cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible').click();
            cy.wait(2000); // Esperar o resultado da pesquisa

            cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
            cy.wait(2000);
            // Obter a data atual
            const today = new Date();
            const weekDay = today.getDay();

            // Selecionar o primeiro slot livre na coluna do dia atual
            cy.get('.cal-day-columns .cal-day-column')
                .eq(weekDay)
                .then(($column) => {
                    const slot = $column.find('.livre').first().length
                        ? $column.find('.livre').first()
                        : $column.find('.overbooking').first();

                    if (slot.length) {
                        cy.wrap(slot)
                            .should('be.visible')
                            .click();

                        // Fluxo de agendamento
                        cy.wait(3000);
                        cy.get('#cpf')
                            .type('121.685.156-54')
                            .should('have.value', '121.685.156-54');

                        cy.wait(3000);
                        cy.contains('button', '+ Incluir procedimento').click();
                        cy.get('mat-select[id="AdProcedimento"]').click();
                        cy.contains('span', 'Consulta Áreas de Atuação').click();

                        cy.wait(2000);
                        cy.contains('button', 'Adicionar').click();

                        cy.wait(2000);
                        cy.contains('button', 'Confirmar').click();

                        cy.wait(2000);
                        cy.contains('h2', 'Agendamento criado com sucesso').should('be.visible');
                        cy.contains('button', 'Ok').click();
                    } else {
                        throw new Error('Nenhum slot livre ou overbooking disponível para agendamento.');
                    }
                })
        })
    })

    Cypress._.times(16, (index) => {
        it(`Validar liberação de Slot ao desmarcar agendamento 29 ${index + 1}`, () => {
            const baseUrl = Cypress.env('currentBaseUrl');
            cy.visit(baseUrl);
            cy.wait(2000)
            cy.get('#schedule')
                .click()

            cy.intercept('GET', '**/api/v1/features**').as('carregarProfissionais')
            cy.wait('@carregarProfissionais')
            cy.contains('span', 'Confirmar agendamento').click()

            cy.contains('Pesquisar')
                .click()

            cy.wait(5000)

            cy.get('button span')
                .contains('Pesquisar')
                .click()
            cy.get('mat-select[aria-label="Items per page:"]')
                .click({ timeout: 5000 })
            cy.get('mat-option').contains('50')
                .click()

            cy.contains('tr', 'Paulo Rick').within(() => {
                cy.get('button')
                    .click()
            })
            cy.get('mat-dialog-container').within(() => {
                cy.contains('div', ' Desmarcado pela clinica ')
                    .click()
                cy.get('button span')
                    .contains('Salvar')
                    .click()
            })
            cy.contains('div', 'Agendamento atualizado.')
                .should('be.visible')
            cy.contains('button', 'Ok')
                .click()
        })
    })


    it('Validar a exclusão da grade do profissional*', () => {

        it('Validar a exclusão da grade do profissional 30', () => {
            const baseUrl = Cypress.env('currentBaseUrl');
            cy.visit(baseUrl);
            cy.wait(2000)
            cy.get('#register').click()
            cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
            cy.wait(2000)
            cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
            cy.contains('span', 'edit').click()
            cy.contains('span', 'Horários de atendimento').click()

            cy.wait(2000)

            const today = new Date();
            const dayOfWeek = today.getDay()

            const checkboxSelectorMap = {
                0: "//h5[@class='title'][contains(., ' Domingo ')]",
                1: "//h5[@class='title'][contains(., ' Segunda-feira ')]",
                2: "//h5[@class='title'][contains(., ' Terça-feira ')]",
                3: "//h5[@class='title'][contains(., ' Quarta-feira ')]",
                4: "//h5[@class='title'][contains(., ' Quinta-feira ')]",
                5: "//h5[@class='title'][contains(., ' Sexta-feira ')]",
                6: "//h5[@class='title'][contains(., ' Sábado ')]"
            }

            const dayOfWeekSelector = checkboxSelectorMap[dayOfWeek]
            if (dayOfWeekSelector) {
                cy.wait(3000)
                cy.xpath(dayOfWeekSelector, { timeout: 20000 })
                const xpathDoClose = `${dayOfWeekSelector}/ancestor::div[contains(@class, 'col')]//button[.//mat-icon[text()='close']]`;
                cy.xpath(xpathDoClose).first().click();
                cy.contains('button', ' Sim ').click()
                cy.wait(2000)
                cy.contains('button', 'Ok').click()

                cy.contains('h2', 'Grade deletada com sucesso.').should('be.visible')

            } else {
                throw new Error("Não foi possível encontrar a grade");
            }
        })

        it('Validar abertura da grade com Overbooking para fluxo de encaixe', () => {
            const baseUrl = Cypress.env('currentBaseUrl');
            cy.visit(baseUrl);
            cy.wait(2000)
            cy.get('#register').click()
            cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
            cy.wait(2000)
            cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
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
                cy.wait(3000)
                cy.xpath(checkboxSelector, { timeout: 20000 }).click();
            } else {
                throw new Error('Não foi possível determinar o checkbox correspondente ao dia da semana atual.');
            }

            cy.get('#horaInicial').type('08:00')
            cy.get('#horaFinal').type('23:50')
            cy.contains('div', 'Áreas de atuação').click()
            cy.wait(1000)
            cy.contains('span', ' Área de Atuação - Teste Automação ').click()
            cy.contains('div', 'Limitar procedimentos realizados no período').click()
            cy.contains('span', ' Consulta Áreas de Atuação ').click()
            cy.get('#overbooking_checkbox').click()
            cy.contains('p', 'Será adicionado mais 30% de slots para atendimento.').should('be.visible')
            cy.contains('button', ' Confirmar ').click({ force: true })

            cy.contains('h2', 'Grade criada com sucesso.').should('be.visible')
            cy.wait(1000)
            cy.contains('button', 'Ok').click()
        })

        it('Validar Fluxo de Encaixe para grade com Overbooking respeitando a regra de 4 encaixes por hora 1', () => {
            const baseUrl = Cypress.env('currentBaseUrl');
            cy.visit(baseUrl);
            cy.wait(3000); // Esperar carregamento inicial da página

            cy.get('#schedule', { timeout: 20000 })
                .should('be.visible')
                .click();
            cy.wait(3000); // Esperar após clicar no schedule

            cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
            cy.wait(3000);

            cy.get('[formcontrolname="expertiseAreas"]', { timeout: 20000 }).should('be.visible').click();
            cy.wait(3000); // Esperar que a lista de opções seja exibida

            cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
            cy.wait(3000); // Esperar após selecionar área

            cy.get('mat-select[formcontrolname="professionals"]').should('be.visible').click();

            cy.wait(3000); // Esperar que a lista de profissionais seja exibida

            cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
            cy.wait(3000); // Esperar após selecionar profissional

            cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible').click();
            cy.wait(3000); // Esperar o resultado da pesquisa

            cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
            cy.wait(3000);

            // Obter a data atual
            const today = new Date();
            const weekDay = today.getDay();

            // Selecionar o primeiro slot livre na coluna do dia atual
            cy.get('.cal-day-columns .cal-day-column')
                .eq(weekDay)
                .find('.livre')
                .first()
                .should('be.visible')
                .click();
            cy.wait(3000); // Esperar após selecionar horário

            // Marcar o checkbox
            cy.xpath("//label[normalize-space()='Encaixe']").should('be.visible').click();
            cy.wait(3000); // Esperar após marcar o checkbox

            // CORREÇÃO AQUI: Formatar a data como YYYY-MM-DD (formato exigido pelo Cypress para inputs de tipo date)
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0'); // +1 pois getMonth() retorna 0-11
            const day = today.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

            cy.get('[formcontrolname="date"]').clear().type(formattedDate);
            cy.wait(3000); // Esperar após digitar a data

            // Função para gerar horário de encaixe válido (com minutos não redondos e sempre no futuro)
            function getEncaixeTime(date) {
                const agora = new Date();

                // Garantir que estamos trabalhando com uma hora futura
                let horaEncaixe = Math.max(date.getHours(), agora.getHours());

                // Se estivermos na hora atual, precisamos garantir que os minutos sejam futuros
                if (horaEncaixe === agora.getHours()) {
                    horaEncaixe++;  // Avançar para a próxima hora para garantir que está no futuro
                }

                // Lista de minutos não padrão para encaixes
                const minutosEncaixe = [3, 7, 11, 19, 23, 27, 33, 37, 41, 47, 53, 57];

                // Selecionar um minuto aleatório da lista
                const minuto = minutosEncaixe[Math.floor(Math.random() * minutosEncaixe.length)];

                // Formatar para HH:mm
                return `${horaEncaixe.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
            }

            // Obter horário de encaixe
            let nextTime = getEncaixeTime(today);
            cy.log(`Tentando horário de encaixe: ${nextTime}`);

            // Digitar o horário no campo
            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
            cy.wait(3000); // Esperar mais tempo após digitar o horário (ponto crítico)

            // Função para verificar mensagens e agir de acordo
            function verificarMensagens() {
                // Verificar possíveis mensagens com assertions
                return cy.get('body').then($body => {
                    const textoBody = $body.text();

                    // Verificar mensagem de horário padrão vs encaixe
                    if (textoBody.includes('Você selecionou um horário do agendamento padrão')) {
                        // Usar assertion para verificar formalmente a presença da mensagem
                        return cy.contains('Você selecionou um horário do agendamento padrão')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar 3 segundos antes de clicar
                                cy.log('Horário padrão detectado, selecionando novo horário quebrado');
                                cy.contains('button', 'Não').should('be.visible').click();

                                cy.wait(3000); // Esperar 3 segundos após clicar no botão

                                // Gerar um horário de encaixe válido
                                nextTime = getEncaixeTime(today);
                                cy.log(`Tentando novo horário de encaixe: ${nextTime}`);

                                // Limpar e digitar o novo horário
                                cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                                cy.wait(3000); // Esperar 3 segundos após digitar o novo horário

                                // Verificar novamente
                                return verificarMensagens();
                            });
                    }

                    // Verificar se o máximo de encaixes foi atingido
                    else if (textoBody.includes('Máximo de encaixes atingido')) {
                        return cy.contains('Máximo de encaixes atingido')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar antes de clicar no Ok
                                cy.log('Máximo de encaixes atingido - Limite da regra alcançado');
                                cy.contains('button', 'Ok').should('be.visible').click();
                                cy.wait(3000); // Esperar após clicar no Ok
                                return cy.wrap(false); // Indica que não deve continuar
                            });
                    }

                    // Verificar se já existe agendamento para este horário
                    else if (textoBody.includes('Já existe um agendamento para esta data e horário')) {
                        return cy.contains('Já existe um agendamento para esta data e horário')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar antes de clicar no Ok
                                cy.log('Horário já agendado, tentando outro horário');
                                cy.contains('button', 'Ok').should('be.visible').click();
                                cy.wait(3000); // Esperar após clicar no Ok

                                // Adicionar 2 minutos e tentar novamente
                                const newDate = new Date(today.getTime() + 2 * 60 * 1000);
                                nextTime = getEncaixeTime(newDate);
                                cy.log(`Tentando novo horário: ${nextTime}`);

                                // Limpar e digitar o novo horário
                                cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                                cy.wait(3000); // Esperar mais tempo após digitar o novo horário

                                // Verificar novamente com o novo horário
                                return verificarMensagens();
                            });
                    }

                    // Se nenhuma mensagem aparecer, continuar com o agendamento
                    else {
                        cy.wait(3000); // Esperar um pouco para ter certeza de que nenhuma mensagem aparecerá
                        return cy.wrap(true); // Wrapping o valor booleano para mantê-lo na cadeia de Cypress
                    }
                });
            }

            // Verificar mensagens antes de prosseguir
            verificarMensagens().then(continuar => {
                if (continuar) {
                    // Continuar com o processo de agendamento
                    cy.log('Prosseguindo com o agendamento');

                    // Verificar e fechar qualquer modal Sweet Alert que possa estar aberto
                    cy.get('body').then($body => {
                        if ($body.find('.swal2-container').length > 0) {
                            cy.get('.swal2-container button').first().click();
                            cy.wait(2000); // Esperar o modal fechar
                        }
                    });

                    // Agora sim tenta digitar no campo CPF
                    cy.get('#cpf').should('be.visible').clear().type('34921977879', { force: true });
                    cy.wait(5000);

                    cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').should('be.visible').click();
                    cy.wait(3000); // Esperar após clicar no botão

                    cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
                    cy.wait(3000); // Esperar antes de selecionar o procedimento

                    cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
                        .first()
                        .should('be.visible')
                        .click({ force: true });
                    cy.wait(3000);

                    cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').should('be.visible').click();
                    cy.wait(2000); // Esperar após adicionar

                    cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').should('be.visible').click();
                    cy.wait(3000); // Esperar antes da mensagem de sucesso

                    // Verificar sucesso com assertion
                    cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 })
                        .should('be.visible');
                    cy.wait(3000); // Esperar antes de clicar em Ok

                    cy.contains('button', 'Ok').should('be.visible').click();
                    cy.wait(3000); // Esperar após o último clique
                } else {
                    cy.log('Não é possível prosseguir com o agendamento devido ao limite de encaixes');
                    cy.wait(3000); // Esperar antes de finalizar o teste
                }
            });
        });

        it('Validar Fluxo de Encaixe para grade com Overbooking respeitando a regra de 4 encaixes por hora 2', () => {
            const baseUrl = Cypress.env('currentBaseUrl');
            cy.visit(baseUrl);
            cy.wait(3000); // Esperar carregamento inicial da página

            cy.get('#schedule', { timeout: 20000 })
                .should('be.visible')
                .click();
            cy.wait(3000); // Esperar após clicar no schedule

            cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
            cy.wait(3000);

            cy.get('[formcontrolname="expertiseAreas"]', { timeout: 20000 }).should('be.visible').click();
            cy.wait(3000); // Esperar que a lista de opções seja exibida

            cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
            cy.wait(3000); // Esperar após selecionar área

            cy.get('mat-select[formcontrolname="professionals"]').should('be.visible').click();

            cy.wait(3000); // Esperar que a lista de profissionais seja exibida

            cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
            cy.wait(3000); // Esperar após selecionar profissional

            cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible').click();
            cy.wait(3000); // Esperar o resultado da pesquisa

            cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
            cy.wait(3000);

            // Obter a data atual
            const today = new Date();
            const weekDay = today.getDay();

            // Selecionar o primeiro slot livre na coluna do dia atual
            cy.get('.cal-day-columns .cal-day-column')
                .eq(weekDay)
                .find('.livre')
                .first()
                .should('be.visible')
                .click();
            cy.wait(3000); // Esperar após selecionar horário

            // Marcar o checkbox
            cy.xpath("//label[normalize-space()='Encaixe']").should('be.visible').click();
            cy.wait(3000); // Esperar após marcar o checkbox

            // CORREÇÃO AQUI: Formatar a data como YYYY-MM-DD (formato exigido pelo Cypress para inputs de tipo date)
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0'); // +1 pois getMonth() retorna 0-11
            const day = today.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

            cy.get('[formcontrolname="date"]').clear().type(formattedDate);
            cy.wait(3000); // Esperar após digitar a data

            // Função para gerar horário de encaixe válido (com minutos não redondos e sempre no futuro)
            function getEncaixeTime(date) {
                const agora = new Date();

                // Garantir que estamos trabalhando com uma hora futura
                let horaEncaixe = Math.max(date.getHours(), agora.getHours());

                // Se estivermos na hora atual, precisamos garantir que os minutos sejam futuros
                if (horaEncaixe === agora.getHours()) {
                    horaEncaixe++;  // Avançar para a próxima hora para garantir que está no futuro
                }

                // Lista de minutos não padrão para encaixes
                const minutosEncaixe = [3, 7, 11, 19, 23, 27, 33, 37, 41, 47, 53, 57];

                // Selecionar um minuto aleatório da lista
                const minuto = minutosEncaixe[Math.floor(Math.random() * minutosEncaixe.length)];

                // Formatar para HH:mm
                return `${horaEncaixe.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
            }

            // Obter horário de encaixe
            let nextTime = getEncaixeTime(today);
            cy.log(`Tentando horário de encaixe: ${nextTime}`);

            // Digitar o horário no campo
            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
            cy.wait(3000); // Esperar mais tempo após digitar o horário (ponto crítico)

            // Função para verificar mensagens e agir de acordo
            function verificarMensagens() {
                // Verificar possíveis mensagens com assertions
                return cy.get('body').then($body => {
                    const textoBody = $body.text();

                    // Verificar mensagem de horário padrão vs encaixe
                    if (textoBody.includes('Você selecionou um horário do agendamento padrão')) {
                        // Usar assertion para verificar formalmente a presença da mensagem
                        return cy.contains('Você selecionou um horário do agendamento padrão')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar 3 segundos antes de clicar
                                cy.log('Horário padrão detectado, selecionando novo horário quebrado');
                                cy.contains('button', 'Não').should('be.visible').click();

                                cy.wait(3000); // Esperar 3 segundos após clicar no botão

                                // Gerar um horário de encaixe válido
                                nextTime = getEncaixeTime(today);
                                cy.log(`Tentando novo horário de encaixe: ${nextTime}`);

                                // Limpar e digitar o novo horário
                                cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                                cy.wait(3000); // Esperar 3 segundos após digitar o novo horário

                                // Verificar novamente
                                return verificarMensagens();
                            });
                    }

                    // Verificar se o máximo de encaixes foi atingido
                    else if (textoBody.includes('Máximo de encaixes atingido')) {
                        return cy.contains('Máximo de encaixes atingido')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar antes de clicar no Ok
                                cy.log('Máximo de encaixes atingido - Limite da regra alcançado');
                                cy.contains('button', 'Ok').should('be.visible').click();
                                cy.wait(3000); // Esperar após clicar no Ok
                                return cy.wrap(false); // Indica que não deve continuar
                            });
                    }

                    // Verificar se já existe agendamento para este horário
                    else if (textoBody.includes('Já existe um agendamento para esta data e horário')) {
                        return cy.contains('Já existe um agendamento para esta data e horário')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar antes de clicar no Ok
                                cy.log('Horário já agendado, tentando outro horário');
                                cy.contains('button', 'Ok').should('be.visible').click();
                                cy.wait(3000); // Esperar após clicar no Ok

                                // Adicionar 2 minutos e tentar novamente
                                const newDate = new Date(today.getTime() + 2 * 60 * 1000);
                                nextTime = getEncaixeTime(newDate);
                                cy.log(`Tentando novo horário: ${nextTime}`);

                                // Limpar e digitar o novo horário
                                cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                                cy.wait(3000); // Esperar mais tempo após digitar o novo horário

                                // Verificar novamente com o novo horário
                                return verificarMensagens();
                            });
                    }

                    // Se nenhuma mensagem aparecer, continuar com o agendamento
                    else {
                        cy.wait(3000); // Esperar um pouco para ter certeza de que nenhuma mensagem aparecerá
                        return cy.wrap(true); // Wrapping o valor booleano para mantê-lo na cadeia de Cypress
                    }
                });
            }

            // Verificar mensagens antes de prosseguir
            verificarMensagens().then(continuar => {
                if (continuar) {
                    // Continuar com o processo de agendamento
                    cy.log('Prosseguindo com o agendamento');

                    // Verificar e fechar qualquer modal Sweet Alert que possa estar aberto
                    cy.get('body').then($body => {
                        if ($body.find('.swal2-container').length > 0) {
                            cy.get('.swal2-container button').first().click();
                            cy.wait(2000); // Esperar o modal fechar
                        }
                    });

                    // Agora sim tenta digitar no campo CPF
                    cy.get('#cpf').should('be.visible').clear().type('34921977879', { force: true });
                    cy.wait(5000);

                    cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').should('be.visible').click();
                    cy.wait(3000); // Esperar após clicar no botão

                    cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
                    cy.wait(3000); // Esperar antes de selecionar o procedimento

                    cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
                        .first()
                        .should('be.visible')
                        .click({ force: true });
                    cy.wait(3000);

                    cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').should('be.visible').click();
                    cy.wait(2000); // Esperar após adicionar

                    cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').should('be.visible').click();
                    cy.wait(3000); // Esperar antes da mensagem de sucesso

                    // Verificar sucesso com assertion
                    cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 })
                        .should('be.visible');
                    cy.wait(3000); // Esperar antes de clicar em Ok

                    cy.contains('button', 'Ok').should('be.visible').click();
                    cy.wait(3000); // Esperar após o último clique
                } else {
                    cy.log('Não é possível prosseguir com o agendamento devido ao limite de encaixes');
                    cy.wait(3000); // Esperar antes de finalizar o teste
                }
            });
        });

        it('Validar Fluxo de Encaixe para grade com Overbooking respeitando a regra de 4 encaixes por hora 3', () => {
            const baseUrl = Cypress.env('currentBaseUrl');
            cy.visit(baseUrl);
            cy.wait(3000); // Esperar carregamento inicial da página

            cy.get('#schedule', { timeout: 20000 })
                .should('be.visible')
                .click();
            cy.wait(3000); // Esperar após clicar no schedule

            cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
            cy.wait(3000);

            cy.get('[formcontrolname="expertiseAreas"]', { timeout: 20000 }).should('be.visible').click();
            cy.wait(3000); // Esperar que a lista de opções seja exibida

            cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
            cy.wait(3000); // Esperar após selecionar área

            cy.get('mat-select[formcontrolname="professionals"]').should('be.visible').click();

            cy.wait(3000); // Esperar que a lista de profissionais seja exibida

            cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
            cy.wait(3000); // Esperar após selecionar profissional

            cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible').click();
            cy.wait(3000); // Esperar o resultado da pesquisa

            cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
            cy.wait(3000);

            // Obter a data atual
            const today = new Date();
            const weekDay = today.getDay();

            // Selecionar o primeiro slot livre na coluna do dia atual
            cy.get('.cal-day-columns .cal-day-column')
                .eq(weekDay)
                .find('.livre')
                .first()
                .should('be.visible')
                .click();
            cy.wait(3000); // Esperar após selecionar horário

            // Marcar o checkbox
            cy.xpath("//label[normalize-space()='Encaixe']").should('be.visible').click();
            cy.wait(3000); // Esperar após marcar o checkbox

            // CORREÇÃO AQUI: Formatar a data como YYYY-MM-DD (formato exigido pelo Cypress para inputs de tipo date)
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0'); // +1 pois getMonth() retorna 0-11
            const day = today.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

            cy.get('[formcontrolname="date"]').clear().type(formattedDate);
            cy.wait(3000); // Esperar após digitar a data

            // Função para gerar horário de encaixe válido (com minutos não redondos e sempre no futuro)
            function getEncaixeTime(date) {
                const agora = new Date();

                // Garantir que estamos trabalhando com uma hora futura
                let horaEncaixe = Math.max(date.getHours(), agora.getHours());

                // Se estivermos na hora atual, precisamos garantir que os minutos sejam futuros
                if (horaEncaixe === agora.getHours()) {
                    horaEncaixe++;  // Avançar para a próxima hora para garantir que está no futuro
                }

                // Lista de minutos não padrão para encaixes
                const minutosEncaixe = [3, 7, 11, 19, 23, 27, 33, 37, 41, 47, 53, 57];

                // Selecionar um minuto aleatório da lista
                const minuto = minutosEncaixe[Math.floor(Math.random() * minutosEncaixe.length)];

                // Formatar para HH:mm
                return `${horaEncaixe.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
            }

            // Obter horário de encaixe
            let nextTime = getEncaixeTime(today);
            cy.log(`Tentando horário de encaixe: ${nextTime}`);

            // Digitar o horário no campo
            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
            cy.wait(3000); // Esperar mais tempo após digitar o horário (ponto crítico)

            // Função para verificar mensagens e agir de acordo
            function verificarMensagens() {
                // Verificar possíveis mensagens com assertions
                return cy.get('body').then($body => {
                    const textoBody = $body.text();

                    // Verificar mensagem de horário padrão vs encaixe
                    if (textoBody.includes('Você selecionou um horário do agendamento padrão')) {
                        // Usar assertion para verificar formalmente a presença da mensagem
                        return cy.contains('Você selecionou um horário do agendamento padrão')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar 3 segundos antes de clicar
                                cy.log('Horário padrão detectado, selecionando novo horário quebrado');
                                cy.contains('button', 'Não').should('be.visible').click();

                                cy.wait(3000); // Esperar 3 segundos após clicar no botão

                                // Gerar um horário de encaixe válido
                                nextTime = getEncaixeTime(today);
                                cy.log(`Tentando novo horário de encaixe: ${nextTime}`);

                                // Limpar e digitar o novo horário
                                cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                                cy.wait(3000); // Esperar 3 segundos após digitar o novo horário

                                // Verificar novamente
                                return verificarMensagens();
                            });
                    }

                    // Verificar se o máximo de encaixes foi atingido
                    else if (textoBody.includes('Máximo de encaixes atingido')) {
                        return cy.contains('Máximo de encaixes atingido')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar antes de clicar no Ok
                                cy.log('Máximo de encaixes atingido - Limite da regra alcançado');
                                cy.contains('button', 'Ok').should('be.visible').click();
                                cy.wait(3000); // Esperar após clicar no Ok
                                return cy.wrap(false); // Indica que não deve continuar
                            });
                    }

                    // Verificar se já existe agendamento para este horário
                    else if (textoBody.includes('Já existe um agendamento para esta data e horário')) {
                        return cy.contains('Já existe um agendamento para esta data e horário')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar antes de clicar no Ok
                                cy.log('Horário já agendado, tentando outro horário');
                                cy.contains('button', 'Ok').should('be.visible').click();
                                cy.wait(3000); // Esperar após clicar no Ok

                                // Adicionar 2 minutos e tentar novamente
                                const newDate = new Date(today.getTime() + 2 * 60 * 1000);
                                nextTime = getEncaixeTime(newDate);
                                cy.log(`Tentando novo horário: ${nextTime}`);

                                // Limpar e digitar o novo horário
                                cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                                cy.wait(3000); // Esperar mais tempo após digitar o novo horário

                                // Verificar novamente com o novo horário
                                return verificarMensagens();
                            });
                    }

                    // Se nenhuma mensagem aparecer, continuar com o agendamento
                    else {
                        cy.wait(3000); // Esperar um pouco para ter certeza de que nenhuma mensagem aparecerá
                        return cy.wrap(true); // Wrapping o valor booleano para mantê-lo na cadeia de Cypress
                    }
                });
            }

            // Verificar mensagens antes de prosseguir
            verificarMensagens().then(continuar => {
                if (continuar) {
                    // Continuar com o processo de agendamento
                    cy.log('Prosseguindo com o agendamento');

                    // Verificar e fechar qualquer modal Sweet Alert que possa estar aberto
                    cy.get('body').then($body => {
                        if ($body.find('.swal2-container').length > 0) {
                            cy.get('.swal2-container button').first().click();
                            cy.wait(2000); // Esperar o modal fechar
                        }
                    });

                    // Agora sim tenta digitar no campo CPF
                    cy.get('#cpf').should('be.visible').clear().type('34921977879', { force: true });
                    cy.wait(5000);

                    cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').should('be.visible').click();
                    cy.wait(3000); // Esperar após clicar no botão

                    cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
                    cy.wait(3000); // Esperar antes de selecionar o procedimento

                    cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
                        .first()
                        .should('be.visible')
                        .click({ force: true });
                    cy.wait(3000);

                    cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').should('be.visible').click();
                    cy.wait(2000); // Esperar após adicionar

                    cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').should('be.visible').click();
                    cy.wait(3000); // Esperar antes da mensagem de sucesso

                    // Verificar sucesso com assertion
                    cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 })
                        .should('be.visible');
                    cy.wait(3000); // Esperar antes de clicar em Ok

                    cy.contains('button', 'Ok').should('be.visible').click();
                    cy.wait(3000); // Esperar após o último clique
                } else {
                    cy.log('Não é possível prosseguir com o agendamento devido ao limite de encaixes');
                    cy.wait(3000); // Esperar antes de finalizar o teste
                }
            });
        });

        it('Validar Fluxo de Encaixe para grade com Overbooking respeitando a regra de 4 encaixes por hora 4', () => {
            const baseUrl = Cypress.env('currentBaseUrl');
            cy.visit(baseUrl);
            cy.wait(3000); // Esperar carregamento inicial da página

            cy.get('#schedule', { timeout: 20000 })
                .should('be.visible')
                .click();
            cy.wait(3000); // Esperar após clicar no schedule

            cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
            cy.wait(3000);

            cy.get('[formcontrolname="expertiseAreas"]', { timeout: 20000 }).should('be.visible').click();
            cy.wait(3000); // Esperar que a lista de opções seja exibida

            cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
            cy.wait(3000); // Esperar após selecionar área

            cy.get('mat-select[formcontrolname="professionals"]').should('be.visible').click();

            cy.wait(3000); // Esperar que a lista de profissionais seja exibida

            cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
            cy.wait(3000); // Esperar após selecionar profissional

            cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible').click();
            cy.wait(3000); // Esperar o resultado da pesquisa

            cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
            cy.wait(3000);

            // Obter a data atual
            const today = new Date();
            const weekDay = today.getDay();

            // Selecionar o primeiro slot livre na coluna do dia atual
            cy.get('.cal-day-columns .cal-day-column')
                .eq(weekDay)
                .find('.livre')
                .first()
                .should('be.visible')
                .click();
            cy.wait(3000); // Esperar após selecionar horário

            // Marcar o checkbox
            cy.xpath("//label[normalize-space()='Encaixe']").should('be.visible').click();
            cy.wait(3000); // Esperar após marcar o checkbox

            // CORREÇÃO AQUI: Formatar a data como YYYY-MM-DD (formato exigido pelo Cypress para inputs de tipo date)
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0'); // +1 pois getMonth() retorna 0-11
            const day = today.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

            cy.get('[formcontrolname="date"]').clear().type(formattedDate);
            cy.wait(3000); // Esperar após digitar a data

            // Função para gerar horário de encaixe válido (com minutos não redondos e sempre no futuro)
            function getEncaixeTime(date) {
                const agora = new Date();

                // Garantir que estamos trabalhando com uma hora futura
                let horaEncaixe = Math.max(date.getHours(), agora.getHours());

                // Se estivermos na hora atual, precisamos garantir que os minutos sejam futuros
                if (horaEncaixe === agora.getHours()) {
                    horaEncaixe++;  // Avançar para a próxima hora para garantir que está no futuro
                }

                // Lista de minutos não padrão para encaixes
                const minutosEncaixe = [3, 7, 11, 19, 23, 27, 33, 37, 41, 47, 53, 57];

                // Selecionar um minuto aleatório da lista
                const minuto = minutosEncaixe[Math.floor(Math.random() * minutosEncaixe.length)];

                // Formatar para HH:mm
                return `${horaEncaixe.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
            }

            // Obter horário de encaixe
            let nextTime = getEncaixeTime(today);
            cy.log(`Tentando horário de encaixe: ${nextTime}`);

            // Digitar o horário no campo
            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
            cy.wait(3000); // Esperar mais tempo após digitar o horário (ponto crítico)

            // Função para verificar mensagens e agir de acordo
            function verificarMensagens() {
                // Verificar possíveis mensagens com assertions
                return cy.get('body').then($body => {
                    const textoBody = $body.text();

                    // Verificar mensagem de horário padrão vs encaixe
                    if (textoBody.includes('Você selecionou um horário do agendamento padrão')) {
                        // Usar assertion para verificar formalmente a presença da mensagem
                        return cy.contains('Você selecionou um horário do agendamento padrão')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar 3 segundos antes de clicar
                                cy.log('Horário padrão detectado, selecionando novo horário quebrado');
                                cy.contains('button', 'Não').should('be.visible').click();

                                cy.wait(3000); // Esperar 3 segundos após clicar no botão

                                // Gerar um horário de encaixe válido
                                nextTime = getEncaixeTime(today);
                                cy.log(`Tentando novo horário de encaixe: ${nextTime}`);

                                // Limpar e digitar o novo horário
                                cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                                cy.wait(3000); // Esperar 3 segundos após digitar o novo horário

                                // Verificar novamente
                                return verificarMensagens();
                            });
                    }

                    // Verificar se o máximo de encaixes foi atingido
                    else if (textoBody.includes('Máximo de encaixes atingido')) {
                        return cy.contains('Máximo de encaixes atingido')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar antes de clicar no Ok
                                cy.log('Máximo de encaixes atingido - Limite da regra alcançado');
                                cy.contains('button', 'Ok').should('be.visible').click();
                                cy.wait(3000); // Esperar após clicar no Ok
                                return cy.wrap(false); // Indica que não deve continuar
                            });
                    }

                    // Verificar se já existe agendamento para este horário
                    else if (textoBody.includes('Já existe um agendamento para esta data e horário')) {
                        return cy.contains('Já existe um agendamento para esta data e horário')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar antes de clicar no Ok
                                cy.log('Horário já agendado, tentando outro horário');
                                cy.contains('button', 'Ok').should('be.visible').click();
                                cy.wait(3000); // Esperar após clicar no Ok

                                // Adicionar 2 minutos e tentar novamente
                                const newDate = new Date(today.getTime() + 2 * 60 * 1000);
                                nextTime = getEncaixeTime(newDate);
                                cy.log(`Tentando novo horário: ${nextTime}`);

                                // Limpar e digitar o novo horário
                                cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                                cy.wait(3000); // Esperar mais tempo após digitar o novo horário

                                // Verificar novamente com o novo horário
                                return verificarMensagens();
                            });
                    }

                    // Se nenhuma mensagem aparecer, continuar com o agendamento
                    else {
                        cy.wait(3000); // Esperar um pouco para ter certeza de que nenhuma mensagem aparecerá
                        return cy.wrap(true); // Wrapping o valor booleano para mantê-lo na cadeia de Cypress
                    }
                });
            }

            // Verificar mensagens antes de prosseguir
            verificarMensagens().then(continuar => {
                if (continuar) {
                    // Continuar com o processo de agendamento
                    cy.log('Prosseguindo com o agendamento');

                    // Verificar e fechar qualquer modal Sweet Alert que possa estar aberto
                    cy.get('body').then($body => {
                        if ($body.find('.swal2-container').length > 0) {
                            cy.get('.swal2-container button').first().click();
                            cy.wait(2000); // Esperar o modal fechar
                        }
                    });

                    // Agora sim tenta digitar no campo CPF
                    cy.get('#cpf').should('be.visible').clear().type('34921977879', { force: true });
                    cy.wait(5000);

                    cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').should('be.visible').click();
                    cy.wait(3000); // Esperar após clicar no botão

                    cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
                    cy.wait(3000); // Esperar antes de selecionar o procedimento

                    cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
                        .first()
                        .should('be.visible')
                        .click({ force: true });
                    cy.wait(3000);

                    cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').should('be.visible').click();
                    cy.wait(2000); // Esperar após adicionar

                    cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').should('be.visible').click();
                    cy.wait(3000); // Esperar antes da mensagem de sucesso

                    // Verificar sucesso com assertion
                    cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 })
                        .should('be.visible');
                    cy.wait(3000); // Esperar antes de clicar em Ok

                    cy.contains('button', 'Ok').should('be.visible').click();
                    cy.wait(3000); // Esperar após o último clique
                } else {
                    cy.log('Não é possível prosseguir com o agendamento devido ao limite de encaixes');
                    cy.wait(3000); // Esperar antes de finalizar o teste
                }
            });
        });

        it('Validar Fluxo de Encaixe para grade com Overbooking respeitando a regra de 4 encaixes por hora 5', () => {
            const baseUrl = Cypress.env('currentBaseUrl');
            cy.visit(baseUrl);
            cy.wait(3000); // Esperar carregamento inicial da página

            cy.get('#schedule', { timeout: 20000 })
                .should('be.visible')
                .click();
            cy.wait(3000); // Esperar após clicar no schedule

            cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
            cy.wait(3000);

            cy.get('[formcontrolname="expertiseAreas"]', { timeout: 20000 }).should('be.visible').click();
            cy.wait(3000); // Esperar que a lista de opções seja exibida

            cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
            cy.wait(3000); // Esperar após selecionar área

            cy.get('mat-select[formcontrolname="professionals"]').should('be.visible').click();

            cy.wait(3000); // Esperar que a lista de profissionais seja exibida

            cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
            cy.wait(3000); // Esperar após selecionar profissional

            cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible').click();
            cy.wait(3000); // Esperar o resultado da pesquisa

            cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
            cy.wait(3000);

            // Obter a data atual
            const today = new Date();
            const weekDay = today.getDay();

            // Selecionar o primeiro slot livre na coluna do dia atual
            cy.get('.cal-day-columns .cal-day-column')
                .eq(weekDay)
                .find('.livre')
                .first()
                .should('be.visible')
                .click();
            cy.wait(3000); // Esperar após selecionar horário

            // Marcar o checkbox
            cy.xpath("//label[normalize-space()='Encaixe']").should('be.visible').click();
            cy.wait(3000); // Esperar após marcar o checkbox

            // CORREÇÃO AQUI: Formatar a data como YYYY-MM-DD (formato exigido pelo Cypress para inputs de tipo date)
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0'); // +1 pois getMonth() retorna 0-11
            const day = today.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

            cy.get('[formcontrolname="date"]').clear().type(formattedDate);
            cy.wait(3000); // Esperar após digitar a data

            // Função para gerar horário de encaixe válido (com minutos não redondos e sempre no futuro)
            function getEncaixeTime(date) {
                const agora = new Date();

                // Garantir que estamos trabalhando com uma hora futura
                let horaEncaixe = Math.max(date.getHours(), agora.getHours());

                // Se estivermos na hora atual, precisamos garantir que os minutos sejam futuros
                if (horaEncaixe === agora.getHours()) {
                    horaEncaixe++;  // Avançar para a próxima hora para garantir que está no futuro
                }

                // Lista de minutos não padrão para encaixes
                const minutosEncaixe = [3, 7, 11, 19, 23, 27, 33, 37, 41, 47, 53, 57];

                // Selecionar um minuto aleatório da lista
                const minuto = minutosEncaixe[Math.floor(Math.random() * minutosEncaixe.length)];

                // Formatar para HH:mm
                return `${horaEncaixe.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
            }

            // Obter horário de encaixe
            let nextTime = getEncaixeTime(today);
            cy.log(`Tentando horário de encaixe: ${nextTime}`);

            // Digitar o horário no campo
            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
            cy.wait(3000); // Esperar mais tempo após digitar o horário (ponto crítico)

            // Função para verificar mensagens e agir de acordo
            function verificarMensagens() {
                // Verificar possíveis mensagens com assertions
                return cy.get('body').then($body => {
                    const textoBody = $body.text();

                    // Verificar mensagem de horário padrão vs encaixe
                    if (textoBody.includes('Você selecionou um horário do agendamento padrão')) {
                        // Usar assertion para verificar formalmente a presença da mensagem
                        return cy.contains('Você selecionou um horário do agendamento padrão')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar 3 segundos antes de clicar
                                cy.log('Horário padrão detectado, selecionando novo horário quebrado');
                                cy.contains('button', 'Não').should('be.visible').click();

                                cy.wait(3000); // Esperar 3 segundos após clicar no botão

                                // Gerar um horário de encaixe válido
                                nextTime = getEncaixeTime(today);
                                cy.log(`Tentando novo horário de encaixe: ${nextTime}`);

                                // Limpar e digitar o novo horário
                                cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                                cy.wait(3000); // Esperar 3 segundos após digitar o novo horário

                                // Verificar novamente
                                return verificarMensagens();
                            });
                    }

                    // Verificar se o máximo de encaixes foi atingido
                    else if (textoBody.includes('Este profissional possui limite de encaixes atingido para esta data e horário.')) {
                        return cy.contains('Este profissional possui limite de encaixes atingido para esta data e horário.')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar antes de clicar no Ok
                                cy.log('Máximo de encaixes atingido - Limite da regra alcançado');
                                cy.contains('button', 'Ok').should('be.visible').click();
                                cy.wait(3000); // Esperar após clicar no Ok
                                return cy.wrap(false); // Indica que não deve continuar
                            });
                    }

                    // Verificar se já existe agendamento para este horário
                    else if (textoBody.includes('Já existe um agendamento para esta data e horário')) {
                        return cy.contains('Já existe um agendamento para esta data e horário')
                            .should('be.visible')
                            .then(() => {
                                cy.wait(3000); // Esperar antes de clicar no Ok
                                cy.log('Horário já agendado, tentando outro horário');
                                cy.contains('button', 'Ok').should('be.visible').click();
                                cy.wait(3000); // Esperar após clicar no Ok

                                // Adicionar 2 minutos e tentar novamente
                                const newDate = new Date(today.getTime() + 2 * 60 * 1000);
                                nextTime = getEncaixeTime(newDate);
                                cy.log(`Tentando novo horário: ${nextTime}`);

                                // Limpar e digitar o novo horário
                                cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                                cy.wait(3000); // Esperar mais tempo após digitar o novo horário

                                // Verificar novamente com o novo horário
                                return verificarMensagens();
                            });
                    }

                    // Se nenhuma mensagem aparecer, continuar com o agendamento
                    else {
                        cy.wait(3000); // Esperar um pouco para ter certeza de que nenhuma mensagem aparecerá
                        return cy.wrap(true); // Wrapping o valor booleano para mantê-lo na cadeia de Cypress
                    }
                });
            }

            // Verificar mensagens antes de prosseguir
            verificarMensagens().then(continuar => {
                if (continuar) {
                    // Continuar com o processo de agendamento
                    cy.log('Prosseguindo com o agendamento');

                    // Verificar e fechar qualquer modal Sweet Alert que possa estar aberto
                    cy.get('body').then($body => {
                        if ($body.find('.swal2-container').length > 0) {
                            cy.get('.swal2-container button').first().click();
                            cy.wait(2000); // Esperar o modal fechar
                        }
                    });

                    // Agora sim tenta digitar no campo CPF
                    cy.get('#cpf').should('be.visible').clear().type('34921977879', { force: true });
                    cy.wait(5000);

                    cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').should('be.visible').click();
                    cy.wait(3000); // Esperar após clicar no botão

                    cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
                    cy.wait(3000); // Esperar antes de selecionar o procedimento

                    cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
                        .first()
                        .should('be.visible')
                        .click({ force: true });
                    cy.wait(3000);

                    cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').should('be.visible').click();
                    cy.wait(2000); // Esperar após adicionar

                    cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').should('be.visible').click();
                    cy.wait(3000); // Esperar antes da mensagem de sucesso

                    // Verificar sucesso com assertion
                    cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 })
                        .should('be.visible');
                    cy.wait(3000); // Esperar antes de clicar em Ok

                    cy.contains('button', 'Ok').should('be.visible').click();
                    cy.wait(3000); // Esperar após o último clique
                } else {
                    cy.log('Não é possível prosseguir com o agendamento devido ao limite de encaixes');
                    cy.wait(3000); // Esperar antes de finalizar o teste
                }
            });
        });

        Cypress._.times(4, (index) => {
            it(`Validar liberação de Slot ao desmarcar agendamento 25 ${index + 1}`, () => {
                const baseUrl = Cypress.env('currentBaseUrl');
                cy.visit(baseUrl);
                cy.wait(2000)
                cy.get('#schedule')
                    .click()
                cy.contains('span', 'Confirmar agendamento')
                    .click()
                cy.get('button span')
                    .contains('Pesquisar')
                    .click()
                cy.get('mat-select[aria-label="Items per page:"]')
                    .click({ timeout: 5000 })
                cy.get('mat-option').contains('50')
                    .click()
                cy.contains('tr', 'Ivan Barros').within(() => {
                    cy.get('button')
                        .click()
                })
                cy.get('mat-dialog-container').within(() => {
                    cy.contains('div', ' Desmarcado pela clinica ')
                        .click()
                    cy.get('button span')
                        .contains('Salvar')
                        .click()
                })
                cy.contains('div', 'Agendamento atualizado.')
                    .should('be.visible')
                cy.contains('button', 'Ok')
                    .click()
            })
        })

        it('Validar fluxo de exclusão da grade com Overbooking para fluxo de encaixe', () => {

            const baseUrl = Cypress.env('currentBaseUrl');
            cy.visit(baseUrl);
            cy.wait(2000)
            cy.get('#register').click()
            cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
            cy.wait(2000)
            cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
            cy.contains('span', 'edit').click()
            cy.contains('span', 'Horários de atendimento').click()

            cy.wait(2000)

            const today = new Date();
            const dayOfWeek = today.getDay()

            const checkboxSelectorMap = {
                0: "//h5[@class='title'][contains(., ' Domingo ')]",
                1: "//h5[@class='title'][contains(., ' Segunda-feira ')]",
                2: "//h5[@class='title'][contains(., ' Terça-feira ')]",
                3: "//h5[@class='title'][contains(., ' Quarta-feira ')]",
                4: "//h5[@class='title'][contains(., ' Quinta-feira ')]",
                5: "//h5[@class='title'][contains(., ' Sexta-feira ')]",
                6: "//h5[@class='title'][contains(., ' Sábado ')]"
            }

            const dayOfWeekSelector = checkboxSelectorMap[dayOfWeek]
            if (dayOfWeekSelector) {
                cy.wait(3000)
                cy.xpath(dayOfWeekSelector, { timeout: 20000 })
                const xpathDoClose = `${dayOfWeekSelector}/ancestor::div[contains(@class, 'col')]//button[.//mat-icon[text()='close']]`;
                cy.xpath(xpathDoClose).first().click();
                cy.contains('button', ' Sim ').click()
                cy.wait(2000)
                cy.contains('h2', 'Grade deletada com sucesso.').should('be.visible')

                cy.contains('button', 'Ok').click()

            } else {
                throw new Error("Não foi possível encontrar a grade");
            }
        })

    })
})
//IVAN

