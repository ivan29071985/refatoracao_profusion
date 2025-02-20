
/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />

describe('Fluxo Completo no Amei', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
    });

    it('Validar Fluxo Abertura de Grade do Profissional', () => {
        cy.visit('/')
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais').click()
        cy.wait(3000)
        cy.contains('div', 'Procure por CPF ou nome').type('322.354.320-18{enter}', { timeout: 20000 })
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

    it('Validar Fluxo de Grade do Profissional em Duplicidade', () => {
        cy.visit('/')
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais').click()
        cy.wait(3000)
        cy.contains('div', 'Procure por CPF ou nome').type('322.354.320-18{enter}')
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
        cy.contains('h2', 'Erro ao incluir grade.').should('be.visible')
    })

    it('Validar Fluxo Completo no Agendamento Cartão de Todos por grade Semanal', () => {

        cy.visit('/');

       
        cy.get('#schedule', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.contains('span', 'Agendar atendimento').click();

        cy.wait(1000);

        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });

        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');

        const today = new Date();
        const weekDay = today.getDay();

        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();

        cy.get('#cpf').type('34921977879');
        cy.wait(3000);
        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();


    });

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Dinheiro com busca por CPF (Não tef)', () => {
        cy.visit('/')
        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('349.219.778-79');
        cy.get('#search-button', { timeout: 10000 }).click()
        cy.xpath("//button[contains(.,'edit')]").click();
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });

        cy.wait(2000)

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.wait(3000)

        cy.get('#proposalAreaExpertise').click({ force: true })

        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação', { timeout: 2000 }).should('exist').click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Hemograma')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Hemograma')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });

        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Forne Lab ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.contains('button', 'Adicionar').click()
        cy.wait(3000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')

        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('button', 'Dinheiro').click()

        // Pegar o valor do pagamento e usar no campo de valor recebido
        cy.get('input[name="valorPagamento"]')
            .invoke('val')
            .then((valorPagamento) => {
                // Remove o R$ e espaços, e garante que use vírgula como separador decimal
                const valor = valorPagamento
                    .replace('R$ ', '')
                    .replace('.', ',')

                // Preenche o valor recebido com o mesmo valor do pagamento
                cy.xpath("//input[@name='valorRecebido']")
                    .clear()
                    .type(valor)

                // Verifica se foi preenchido corretamente (com vírgula)
                cy.xpath("//input[@name='valorRecebido']")

            })
        cy.contains('button', 'Pagar').click()
        cy.contains('button', 'Ok').click()

    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Dinheiro com busca por Nome (Não tef)', () => {
        cy.visit('/')
        // Listar Paciente que eu quero
        cy.get('#patient').click()

        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })

        cy.wait(3000)

        cy.xpath("(//input[contains(@type,'radio')])[2]").click({ force: true })

        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('Ivan Barros');

        cy.get('#search-button', { timeout: 10000 }).click()

        cy.xpath("(//button[contains(.,'edit')])[2]").click()

        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()

        cy.xpath("//span[contains(.,'Propostas')]").click();

        cy.xpath("//button[contains(.,'Nova Proposta')]").click();

        cy.wait(3000)

        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });

        cy.wait(3000)

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.wait(2000)

        cy.get('#proposalAreaExpertise').click({ force: true })

        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.get('#proposalProfessionalRequesting').click()

        cy.contains('span', ' Dr. Ivan Barros ').click()

        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')

        cy.get('#proposalProcedure').type('Hemograma')

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Hemograma')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });

        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Forne Lab ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('button', 'Dinheiro').click()

        // Pegar o valor do pagamento e usar no campo de valor recebido
        cy.get('input[name="valorPagamento"]')
            .invoke('val')
            .then((valorPagamento) => {
                // Remove o R$ e espaços, e garante que use vírgula como separador decimal
                const valor = valorPagamento
                    .replace('R$ ', '')
                    .replace('.', ',')

                // Preenche o valor recebido com o mesmo valor do pagamento
                cy.xpath("//input[@name='valorRecebido']")
                    .clear()
                    .type(valor)

                // Verifica se foi preenchido corretamente (com vírgula)
                cy.xpath("//input[@name='valorRecebido']")

            })
        cy.contains('button', 'Pagar').click()
        cy.contains('button', 'Ok').click()
    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Credito com busca por CPF (Não tef)', () => {
        cy.visit('/')
        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('349.219.778-79');
        cy.get('#search-button', { timeout: 10000 }).click()
        cy.xpath("//button[contains(.,'edit')]").click();
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });

        cy.wait(2000)

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.wait(3000)

        cy.get('#proposalAreaExpertise').click({ force: true })

        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Hemograma')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Hemograma')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });

        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Forne Lab ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.contains('button', 'Adicionar').click()
        cy.wait(3000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')

        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains('2').click()
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()

    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Credito com busca por Nome (Não tef)', () => {
        cy.visit('/')
        // Listar Paciente que eu quero
        cy.get('#patient').click()

        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })

        cy.wait(3000)

        cy.xpath("(//input[contains(@type,'radio')])[2]").click({ force: true })

        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('Ivan Barros');

        cy.get('#search-button', { timeout: 10000 }).click()

        cy.xpath("(//button[contains(.,'edit')])[2]").click()



        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()

        cy.xpath("//span[contains(.,'Propostas')]").click();

        cy.xpath("//button[contains(.,'Nova Proposta')]").click();

        cy.wait(3000)

        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });

        cy.wait(3000)

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.wait(2000)

        cy.get('#proposalAreaExpertise').click({ force: true })

        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.get('#proposalProfessionalRequesting').click()

        cy.contains('span', ' Dr. Ivan Barros ').click()

        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')

        cy.get('#proposalProcedure').type('Hemograma')

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Hemograma')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });

        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Forne Lab ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')

        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains('2').click()
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()
    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Pix com busca por CPF (Não tef)', () => {
        cy.visit('/')
        // Listar Paciente que eu quero
        cy.get('#patient').click()

        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })

        cy.wait(3000)

        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('349.219.778-79');

        cy.get('#search-button', { timeout: 10000 }).click()

        cy.xpath("//button[contains(.,'edit')]").click();

        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()

        cy.xpath("//span[contains(.,'Propostas')]").click();

        cy.xpath("//button[contains(.,'Nova Proposta')]").click();

        cy.wait(3000)

        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });

        cy.wait(3000)

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.wait(2000)

        cy.get('#proposalAreaExpertise').click({ force: true })

        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.get('#proposalProfessionalRequesting').click()

        cy.contains('span', ' Dr. Ivan Barros ').click()

        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')

        cy.get('#proposalProcedure').type('Hemograma')

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Hemograma')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });

        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Forne Lab ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')

        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('button', 'PIX').click()

        cy.xpath("(//div[contains(.,'Conta Vinculada *')])[10]").click({ force: true })
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Automação')]").click()

        // Preenche o campo de valor recebido
        cy.xpath("//input[@name='valorRecebido']")
            .clear()
            .type('358,00')

        cy.contains('button', 'Pagar').click()
        cy.contains('button', 'Ok').click()
    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Pix com busca por Nome (Não tef)', () => {
        cy.visit('/')
        // Listar Paciente que eu quero
        cy.get('#patient').click()

        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })

        cy.wait(3000)

        cy.xpath("(//input[contains(@type,'radio')])[2]").click({ force: true })

        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('Ivan Barros');

        cy.get('#search-button', { timeout: 10000 }).click()

        cy.xpath("(//button[contains(.,'edit')])[2]").click()

        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()

        cy.xpath("//span[contains(.,'Propostas')]").click();

        cy.xpath("//button[contains(.,'Nova Proposta')]").click();

        cy.wait(3000)

        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });

        cy.wait(3000)

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.wait(2000)

        cy.get('#proposalAreaExpertise').click({ force: true })

        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.get('#proposalProfessionalRequesting').click()

        cy.contains('span', ' Dr. Ivan Barros ').click()

        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')

        cy.get('#proposalProcedure').type('Hemograma')

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Hemograma')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });

        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Forne Lab ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')

        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('button', 'PIX').click()

        cy.xpath("(//div[contains(.,'Conta Vinculada *')])[10]").click({ force: true })
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Automação')]").click()

        // Preenche o campo de valor recebido
        cy.xpath("//input[@name='valorRecebido']")
            .clear()
            .type('358,00')

        cy.contains('button', 'Pagar').click()
        cy.contains('button', 'Ok').click()
    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Debito com busca por CPF (Não tef)', () => {
        cy.visit('/')
        // Listar Paciente que eu quero
        cy.get('#patient').click()

        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })

        cy.wait(3000)

        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('349.219.778-79');

        cy.get('#search-button', { timeout: 10000 }).click()

        cy.xpath("//button[contains(.,'edit')]").click();

        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()

        cy.xpath("//span[contains(.,'Propostas')]").click();

        cy.xpath("//button[contains(.,'Nova Proposta')]").click();

        cy.wait(3000)

        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });

        cy.wait(3000)

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.wait(2000)

        cy.get('#proposalAreaExpertise').click({ force: true })

        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.get('#proposalProfessionalRequesting').click()

        cy.contains('span', ' Dr. Ivan Barros ').click()

        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')

        cy.get('#proposalProcedure').type('Hemograma')

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Hemograma')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });

        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Forne Lab ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')

        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.get('button').contains('Cartão de Débito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Conta Débito').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()
    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Debito com busca por Nome (Não tef)', () => {
        cy.visit('/')
        // Listar Paciente que eu quero
        cy.get('#patient').click()

        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })

        cy.wait(3000)

        cy.xpath("(//input[contains(@type,'radio')])[2]").click({ force: true })

        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('Ivan Barros');

        cy.get('#search-button', { timeout: 10000 }).click()

        cy.xpath("(//button[contains(.,'edit')])[2]").click()

        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()

        cy.xpath("//span[contains(.,'Propostas')]").click();

        cy.xpath("//button[contains(.,'Nova Proposta')]").click();

        cy.wait(3000)

        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });

        cy.wait(3000)

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.wait(2000)

        cy.get('#proposalAreaExpertise').click({ force: true })

        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.get('#proposalProfessionalRequesting').click()

        cy.contains('span', ' Dr. Ivan Barros ').click()

        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')

        cy.get('#proposalProcedure').type('Hemograma')

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Hemograma')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });

        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Forne Lab ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')

        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.get('button').contains('Cartão de Débito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Conta Débito').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()
    })

    it.only('Validar Fluxo Checkin com Parcelamento no Cartão Crédito (Não tef)', () => {
        cy.visit('/')
        cy.get('#schedule', { timeout: 15000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(3000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains('2').click()
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()
        cy.xpath("//th[@role='columnheader'][contains(.,'Parcela')]", { timeout: 20000 }).should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Vencimento')]", { timeout: 20000 }).should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Valor Total')]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[1]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[1]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//mat-icon[@role='img'][contains(.,'expand_more')])[1]", { timeout: 20000 }).click()
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[2]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Baixado')])[1]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Forma de Pagamento')])[1]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Pagamento')])[1]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Baixa')])[1]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[2]", { timeout: 20000 }).should('be.visible')
    });

    it('Validar Fluxo Checkin no Cartão Débito (Não tef)', () => {
        cy.visit('/')
        cy.get('#schedule', { timeout: 15000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(5000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Cartão de Débito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Conta Débito').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()
        cy.xpath("//th[@role='columnheader'][contains(.,'Parcela')]").should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Vencimento')]").should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Valor Total')]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[1]").should('be.visible')
        cy.xpath("(//mat-icon[@role='img'][contains(.,'expand_more')])[1]").click()
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[2]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Baixado')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Forma de Pagamento')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Pagamento')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Baixa')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[2]").should('be.visible')
    });

    it('Validar Fluxo Checkin no PIX (Não tef)', () => {
        cy.visit('/')
        cy.get('#schedule', { timeout: 15000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(5000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click({ force: true })
        cy.get('button').contains('Receber', { timeout: 15000 }).click()
        cy.get('button').contains('PIX').click()
        cy.xpath("//input[@name='valorRecebido']").type('3,33')
        cy.xpath("(//div[contains(.,'Conta Vinculada *')])[10]", { timeout: 2000 }).click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Conta Automação ')]").click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Ok').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.xpath("//th[@role='columnheader'][contains(.,'Parcela')]").should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Vencimento')]").should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Valor Total')]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[1]").should('be.visible')
        cy.xpath("(//mat-icon[@role='img'][contains(.,'expand_more')])[1]").click()
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[2]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Baixado')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Forma de Pagamento')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Pagamento')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Baixa')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[2]").should('be.visible')
    });

    it('Validar Fluxo Checkin no Dinheiro (Não tef)', () => {
        cy.visit('/')
        cy.get('#schedule', { timeout: 15000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(5000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click({ force: true })
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Dinheiro').click()
        cy.xpath("//input[@name='valorRecebido']").type('3,33')
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Ok').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')

    });

    it('Validar Fluxo de Parcelas na tela Cartões', () => {
        cy.visit('/')
        cy.get('#financial', { timeout: 15000 }).click()
        cy.get('span').contains('Cartões').click()

        const today = new Date()
        const formattedDate = today.toLocaleDateString('pt-BR')

        cy.get('#dataDe').type(formattedDate)


        cy.get('div.ng-tns-c3071216597-8 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click({ force: true })
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Data de Pagamento')]").click()

        cy.get('button').contains('Buscar').click({ force: true })

        cy.xpath("(//div[contains(.,'10')])[15]", { timeout: 20000 }).click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'50')]").click()


        const expectedColumns = [
            'Pagador',
            'Id transação',
            'Data pagamento',
            'Valor pagamento',
            'Taxa %',
            'Valor baixa',
            'Parcelas',
            'Data baixa',
            'Data Venc.',
            'Status'
        ]

        expectedColumns.forEach(column => {
            cy.contains('th', column).should('be.visible')
        })

        cy.xpath(`(//td[@role='cell'][contains(.,'${formattedDate}')])[1]`, { timeout: 20000 }).should('be.visible')



        const timeout = { timeout: 20000 };

        const parseMoneyValue = (text) => {
            if (!text) return 0;
            const cleanValue = text
                .replace('Valor Bruto: ', '')
                .replace('R$', '')
                .replace(/\./g, '')
                .replace(',', '.')
                .trim();
            return Number(parseFloat(cleanValue).toFixed(2));
        };

        let somaTotal = 0;

        cy.get('tbody > tr > .cdk-column-valuePayer', timeout)
            .should('have.length.at.least', 1)
            .each(($cell, index) => {
                const value = parseMoneyValue($cell.text());
                // Mantém apenas 2 casas decimais na soma
                somaTotal = Number((somaTotal + value).toFixed(2));
                cy.log(`Linha ${index + 1}: R$ ${value}`);
            })
            .then(() => {
                cy.log(`Soma total: R$ ${somaTotal}`);

                cy.get('[style="background-color: #fff; width: 100%;"] > div.ng-tns-c3071216597-8 > :nth-child(1)')
                    .invoke('text')
                    .then(valorBrutoText => {
                        const valorBruto = Number(parseMoneyValue(valorBrutoText));
                        cy.log(`Valor Bruto encontrado: R$ ${valorBruto}`);
                        expect(somaTotal).to.equal(valorBruto);
                    });
            });

    });

    it('Validar Fluxo de Remoção no Horário da Grade do Profissional', () => {
        cy.visit('/')
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais').click()
        cy.wait(3000)
        cy.contains('div', 'Procure por CPF ou nome').type('Ivan Saude {enter}')
        cy.contains('span', 'edit').click()
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.contains('span', 'Horários de atendimento').click()
        cy.wait(1000)
        cy.xpath("//button[@class='mat-focus-indicator col-button-close mat-icon-button mat-button-base']").click({ force: true })
        // (//mat-icon[@role='img'][contains(.,'close')])[2] - quando obter mais de uma grade
        cy.contains('button', 'Sim').click()
        cy.contains('h2', 'Grade deletada com sucesso.').should('be.visible')
        cy.contains('button', 'Ok').click()
    })

});
