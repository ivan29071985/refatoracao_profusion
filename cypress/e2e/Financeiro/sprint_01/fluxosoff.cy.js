
/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />

describe('Fluxo Completo no Amei', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
    });


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
    
    it('Fluxo de Contas a Pagar - Dinheiro', () => {
        cy.visit('/')
        cy.get('#financial').click();
        cy.contains('Contas a pagar').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@maxlength,'250')]").type(randomNumber.toString());

        cy.get("#Pagador").click()
        cy.xpath("(//span[contains(.,'Fornecedor')])[2]").click()
        cy.contains('Profissional').click()
        cy.get("#Pagador").type('dr. ivan barros')
        cy.get('section > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #observationHeader')
            .type('Teste voltado para escrita no campo Observação')
        cy.xpath("//button[contains(.,'Adicionar itens')]").click()
        cy.xpath("//input[@data-placeholder='Digite o nome do Item']").type('Teste Campo')
        cy.get('#selectPlanoContas').click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Administrativas - Aluguel de Imóvel -')]").click()
        cy.xpath("//input[@prefix='R$ ']").clear().type('10')
        cy.xpath("(//input[contains(@type,'number')])[3]").type('1')
        cy.xpath("(//input[contains(@type,'number')])[4]").type('1')
        cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.contains("Dia").click()
        cy.get("#adicionarParcelas").click()
        cy.contains('Contas a pagar cadastrada com sucesso').should('be.visible')
        cy.contains('Ok').click()
        cy.contains('Pagar').click()
        cy.contains('Pesquisar').click()

        cy.contains(randomNumber.toString())
            .parent()
            .find('img[id^="editarParcela"]')
            .click({ force: true });

        // Função para calcular a data de 30 dias atrás
        const getDate30DaysAgo = () => {
            const date = new Date();
            date.setDate(date.getDate() - 30);
            return date;
        };

        // Função para formatar a data no formato dd/mm/yyyy (padrão brasileiro)
        const formatDateBR = (date) => {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        // Calcular e formatar a data de 15 dias atrás
        const dataPassada = getDate30DaysAgo();
        const dataPassadaBR = formatDateBR(dataPassada);

        cy.xpath("//button[contains(.,'Pagar')]").click()
        cy.xpath("//button[contains(.,'Dinheiro')]").click()

        // Preencher o campo de data de pagamento com a data de 30 dias atrás
        cy.get('#dataPagamento').clear().type(dataPassadaBR);

        // Verificação para garantir que o valor foi inserido corretamente
        cy.get('#dataPagamento').should('have.value', dataPassadaBR);

        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Conta Automação ')]").click()

        cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click()
        cy.contains('Parcela salva com sucesso !').should('be.visible')
        cy.contains('Ok').click()
    });

    it('Fluxo de Contas a Pagar - PIX', () => {
        cy.visit('/')
        cy.get('#financial').click();
        cy.contains('Contas a pagar').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@maxlength,'250')]").type(randomNumber.toString());

        cy.get("#Pagador").click()
        cy.xpath("(//span[contains(.,'Fornecedor')])[2]").click()
        cy.contains('Profissional').click()
        cy.get("#Pagador").type('dr. ivan barros')
        cy.get('section > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #observationHeader')
            .type('Teste voltado para escrita no campo Observação')
        cy.xpath("//button[contains(.,'Adicionar itens')]").click()
        cy.xpath("//input[@data-placeholder='Digite o nome do Item']").type('Teste Campo')
        cy.get('#selectPlanoContas').click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Administrativas - Aluguel de Imóvel -')]").click()
        cy.xpath("//input[@prefix='R$ ']").clear().type('10')
        cy.xpath("(//input[contains(@type,'number')])[3]").type('1')
        cy.xpath("(//input[contains(@type,'number')])[4]").type('1')
        cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.contains("Dia").click()
        cy.get("#adicionarParcelas").click()
        cy.contains('Contas a pagar cadastrada com sucesso').should('be.visible')
        cy.contains('Ok').click()
        cy.contains('Pagar').click()
        cy.contains('Pesquisar').click()

        cy.contains(randomNumber.toString())
            .parent()
            .find('img[id^="editarParcela"]')
            .click({ force: true });

        // Função para calcular a data de 30 dias atrás
        const getDate30DaysAgo = () => {
            const date = new Date();
            date.setDate(date.getDate() - 30);
            return date;
        };

        // Função para formatar a data no formato dd/mm/yyyy (padrão brasileiro)
        const formatDateBR = (date) => {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        // Calcular e formatar a data de 15 dias atrás
        const dataPassada = getDate30DaysAgo();
        const dataPassadaBR = formatDateBR(dataPassada);

        cy.xpath("//button[contains(.,'Pagar')]").click()
        cy.xpath("//button[contains(.,'PIX')]").click()

        cy.xpath("(//div[contains(.,'Contas Correntes *')])[10]").click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Automação')]").click()

        cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click()
        cy.contains('Parcela salva com sucesso !').should('be.visible')
        cy.contains('Ok').click()
    });

    it('Validar Fluxo Checkin com Parcelamento no Cartão Crédito (Não tef)', () => {
        cy.visit('/')
        cy.get('#schedule', { timeout: 15000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(3000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()

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

});


