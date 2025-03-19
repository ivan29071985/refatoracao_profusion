
/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />

describe('Permissoes', () => {


    it.only('Validar permissão', () => {
        // Intercept antes das requests
        //cy.intercept('POST', '/api/v1/security/refresh-token?clinicId=483').as('refreshToken')
        cy.intercept(
            {
                method: 'POST',
                url: '/api/v1/security/refresh-token?clinicId=483',
            },
            (req) => {
                const url = new URL(req.url);
                url.searchParams.set('automated_test', 'true');

                req.url = url.toString();
                req.continue();
            }
        ).as('refreshToken');


        cy.visit('/')
        // Login UI 
        cy.get('#E-mail').type('ivan.santos+1@amorsaude.com')
        cy.get('#Senha').type('Iv@n198529', { log: false })
        cy.contains('Entrar').click()
        cy.contains('span', ' Unidade Teste / Treinamento ', { timeout: 10000 }).click({ force: true })
        cy.contains('button', ' Entrar ', { timeout: 10000 }).click()



        // UI Flow
        cy.get('#setting', { timeout: 10000 }).click()
        cy.xpath("//span[contains(.,'Perfis de acesso')]", { timeout: 10000 }).click({ force: true })
        cy.xpath("(//button[contains(.,'edit')])[4]").click()
        cy.xpath("(//mat-panel-title[contains(.,'Cadastro')])[2]").click()
        cy.xpath("//mat-panel-title[contains(.,'Tabela de Preços Parcerias')]").click()
        cy.xpath("//mat-panel-title[contains(.,'Tabela de Preços Editar')]").click()
        cy.xpath("//label[contains(@for,'checkbox_1177')]").click()
        cy.xpath("//button[contains(.,'Atualizar perfil de acesso')]").click()
        cy.contains('Ok', { timeout: 10000 }).click()

        cy.wait(5000)

        //sempre colocar o reload nao esquecer
        cy.reload()
        cy.wait('@refreshToken')
    })

    it('Validar permissão Tela Saldo Ativa', () => {
        // Intercept antes das requests
        //cy.intercept('POST', '/api/v1/security/refresh-token?clinicId=483').as('refreshToken')
        cy.intercept(
            {
                method: 'POST',
                url: '/api/v1/security/refresh-token?clinicId=483',
            },
            (req) => {
                const url = new URL(req.url);
                url.searchParams.set('automated_test', 'true');

                req.url = url.toString();
                req.continue();
            }
        ).as('refreshToken');


        cy.visit('/')
        // Login UI 
        cy.get('#E-mail').type('ivan.santos+1@amorsaude.com')
        cy.get('#Senha').type('Iv@n198529', { log: false })
        cy.contains('Entrar').click()
        cy.contains('span', ' Unidade Teste / Treinamento ', { timeout: 10000 }).click({ force: true })
        cy.contains('button', ' Entrar ', { timeout: 10000 }).click()

        cy.get('#financial').click()

        //sempre colocar o reload nao esquecer
        cy.reload()
        cy.wait('@refreshToken')

        //sempre colocar o reload nao esquecer
        cy.reload()
        cy.wait('@refreshToken')

        //sempre colocar o reload nao esquecer
        cy.reload()
        cy.wait('@refreshToken')

        cy.get('#financial').click()
        cy.xpath("//span[contains(.,'Saldo')]").click({ force: true })

        cy.contains('Saldo financeiro').should('contain.text', 'Saldo financeiro')



    })

    it('Validar permissão Tela Saldo Desativada', () => {
        // Intercept antes das requests
        //cy.intercept('POST', '/api/v1/security/refresh-token?clinicId=483').as('refreshToken')
        cy.intercept(
            {
                method: 'POST',
                url: '/api/v1/security/refresh-token?clinicId=483',
            },
            (req) => {
                const url = new URL(req.url);
                url.searchParams.set('automated_test', 'true');

                req.url = url.toString();
                req.continue();
            }
        ).as('refreshToken');


        cy.visit('/')
        // Login UI 
        cy.get('#E-mail').type('ivan.santos+1@amorsaude.com')
        cy.get('#Senha').type('Iv@n198529', { log: false })
        cy.contains('Entrar').click()
        cy.contains('span', ' Unidade Teste / Treinamento ', { timeout: 10000 }).click({ force: true })
        cy.contains('button', ' Entrar ', { timeout: 10000 }).click()

        // UI Flow
        cy.get('#setting', { timeout: 10000 }).click()
        cy.xpath("//span[contains(.,'Perfis de acesso')]", { timeout: 10000 }).click({ force: true })
        cy.xpath("(//button[contains(.,'edit')])[4]").click()
        cy.xpath("//mat-panel-title[contains(.,'Financeiro')]").click()
        cy.xpath("(//mat-panel-title[contains(.,'Saldo')])[1]").click()
        cy.xpath("//label[contains(@for,'checkbox_1173')]").click()

        cy.xpath("//button[@color='primary'][contains(.,'Atualizar perfil de acesso')]").click()

        cy.xpath("//button[@type='button'][contains(.,'Ok')]", { timeout: 10000 }).click()

        cy.wait(5000)

        //sempre colocar o reload nao esquecer
        cy.reload()
        cy.wait('@refreshToken')

        //sempre colocar o reload nao esquecer
        cy.reload()
        cy.wait('@refreshToken')

        //sempre colocar o reload nao esquecer
        cy.reload()
        cy.wait('@refreshToken')

        //sempre colocar o reload nao esquecer
        cy.reload()
        cy.wait('@refreshToken')



        cy.get('#financial').click()
        cy.xpath("//span[contains(.,'Saldo')]").click({ force: true })

        cy.contains('h2', 'Sem permissão para rota Painel Financeiro.').should('contain.text', 'Sem permissão para rota Painel Financeiro.')
    })

    it('Validar permissão Tela Saldo Ativada', () => {
        // Intercept antes das requests
        //cy.intercept('POST', '/api/v1/security/refresh-token?clinicId=483').as('refreshToken')
        cy.intercept(
            {
                method: 'POST',
                url: '/api/v1/security/refresh-token?clinicId=483',
            },
            (req) => {
                const url = new URL(req.url);
                url.searchParams.set('automated_test', 'true');

                req.url = url.toString();
                req.continue();
            }
        ).as('refreshToken');


        cy.visit('/')
        // Login UI 
        cy.get('#E-mail').type('ivan.santos+1@amorsaude.com')
        cy.get('#Senha').type('Iv@n198529', { log: false })
        cy.contains('Entrar').click()
        cy.contains('span', ' Unidade Teste / Treinamento ', { timeout: 10000 }).click({ force: true })
        cy.contains('button', ' Entrar ', { timeout: 10000 }).click()

        // UI Flow
        cy.get('#setting', { timeout: 10000 }).click()
        cy.xpath("//span[contains(.,'Perfis de acesso')]", { timeout: 10000 }).click({ force: true })
        cy.xpath("(//button[contains(.,'edit')])[4]").click()
        cy.xpath("//mat-panel-title[contains(.,'Financeiro')]").click()
        cy.xpath("(//mat-panel-title[contains(.,'Saldo')])[1]").click()
        cy.xpath("//label[contains(@for,'checkbox_1173')]").click()

        cy.xpath("//button[@color='primary'][contains(.,'Atualizar perfil de acesso')]").click()

        cy.xpath("//button[@type='button'][contains(.,'Ok')]", { timeout: 10000 }).click()

        cy.wait(5000)

        //sempre colocar o reload nao esquecer
        cy.reload()
        cy.wait('@refreshToken')

        //sempre colocar o reload nao esquecer
        cy.reload()
        cy.wait('@refreshToken')

        //sempre colocar o reload nao esquecer
        cy.reload()
        cy.wait('@refreshToken')

        //sempre colocar o reload nao esquecer
        cy.reload()
        cy.wait('@refreshToken')



        cy.get('#financial').click()
        cy.xpath("//span[contains(.,'Saldo')]").click({ force: true })

        cy.contains('Saldo financeiro').should('contain.text', 'Saldo financeiro')
    })

})