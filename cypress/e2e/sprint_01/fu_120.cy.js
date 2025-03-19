/// <reference types="cypress" />
/// <reference types="cypress-xpath" />


describe('fu_120', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
      });
    

    it('Validar a data atual no campo de data final', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Extrato').click()

        // Obtém a data atual formatada no padrão brasileiro (dd/mm/yyyy)
        const dataAtual = new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        cy.get("input[placeholder='Data final']")
            .should('have.value', dataAtual);
    });

    it('Validar se o campo data final não contem uma outra data', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Extrato').click();

        // Obtém a data atual formatada no padrão brasileiro (dd/mm/yyyy)
        const dataAtual = new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Captura o valor do campo e compara com a data atual
        cy.get("input[placeholder='Data final']")
            .invoke('val')
            .then((valorCampo) => {
                // Log para debug
                cy.log(`Data do campo: ${valorCampo}`);
                cy.log(`Data atual esperada: ${dataAtual}`);

                // Compara as datas
                expect(valorCampo).to.equal(dataAtual, `A data do campo (${valorCampo}) deve ser igual à data atual (${dataAtual})`);

                // Opcional: Converter e comparar como objetos Date para maior precisão
                const dataCampo = new Date(valorCampo.split('/').reverse().join('-'));
                const dataAtualObj = new Date(dataAtual.split('/').reverse().join('-'));

                expect(dataCampo.getTime()).to.equal(dataAtualObj.getTime(),
                    'As datas devem ser exatamente iguais quando convertidas para timestamp');
            });
    });

    it('Deve conter 30 dias retroativos da data atual no campo de data inicial', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Extrato').click()

        // Obtém a data atual
        const dataAtual = new Date();

        // Obtém a data 30 dias atrás
        const dataInicial = new Date();
        dataInicial.setDate(dataInicial.getDate() - 30);


        const dataInicialFormatada = dataInicial.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Verifica o campo de data inicial (30 dias atrás)
        cy.get("input[placeholder='Data inicial']")
            .should('have.value', dataInicialFormatada);

    });

    it('Deve conter 90 dias retroativos da data atual no campo de data inicial', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Extrato').click()

        // Obtém a data atual
        const dataAtual = new Date();

        // Obtém a data 90 dias atrás
        const dataInicial = new Date();
        dataInicial.setDate(dataInicial.getDate() - 90);

        // Formata as datas no padrão brasileiro (dd/mm/yyyy)
        const dataAtualFormatada = dataAtual.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const dataInicialFormatada = dataInicial.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Limpa o campo e digite a data inicial (90 dias atrás)
        cy.get("input[placeholder='Data inicial']")
            .clear()
            .type(dataInicialFormatada);

        // Limpa o campo e digite a data final (atual)
        cy.get("input[placeholder='Data final']")
            .clear()
            .type(dataAtualFormatada);

        // Log para debug se necessário
        cy.log(`Data Inicial digitada (90 dias atrás): ${dataInicialFormatada}`);
        cy.log(`Data Final digitada (atual): ${dataAtualFormatada}`);

        cy.xpath("//button[@color='primary'][contains(.,'Filtrar')]").click()

    });

    it('Deve conter 91 dias retroativos visualizando modal com mensagem de erro', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Extrato').click()

        // Obtém a data atual
        const dataAtual = new Date();

        // Obtém a data 90 dias atrás
        const dataInicial = new Date();
        dataInicial.setDate(dataInicial.getDate() - 91);

        // Formata as datas no padrão brasileiro (dd/mm/yyyy)
        const dataAtualFormatada = dataAtual.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const dataInicialFormatada = dataInicial.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Limpa o campo e digite a data inicial (90 dias atrás)
        cy.get("input[placeholder='Data inicial']")
            .clear()
            .type(dataInicialFormatada);

        // Limpa o campo e digite a data final (atual)
        cy.get("input[placeholder='Data final']")
            .clear()
            .type(dataAtualFormatada);

        // Log para debug se necessário
        cy.log(`Data Inicial digitada (90 dias atrás): ${dataInicialFormatada}`);
        cy.log(`Data Final digitada (atual): ${dataAtualFormatada}`);

        cy.xpath("//button[@color='primary'][contains(.,'Filtrar')]").click()

        cy.contains('h2', 'É permitido análises de até 90 dias!').should('be.visible').and('contain.text', 'É permitido análises de até 90 dias!')

    });

    it('Deve conter modal com mensagem de erro para data anterior', () => {

        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Extrato').click();

        // Obtém a data atual
        const dataAtual = new Date();

        // Obtém a data 120 dias atrás
        const dataInicial = new Date();
        dataInicial.setDate(dataInicial.getDate() - 120);

        // Formata as datas no padrão brasileiro (dd/mm/yyyy)
        const dataAtualFormatada = dataAtual.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const dataInicialFormatada = dataInicial.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Log para debug das datas calculadas
        cy.log(`Data Inicial (120 dias atrás): ${dataInicialFormatada}`);
        cy.log(`Data Final (atual): ${dataAtualFormatada}`);

        // Limpa e preenche o campo de data inicial
        cy.get("input[placeholder='Data inicial']")
            .clear()
            .type(dataInicialFormatada);

        // Limpa e preenche o campo de data final
        cy.get("input[placeholder='Data final']")
            .clear()
            .type(dataAtualFormatada);

        // Verifica se existe o mat-error e valida o formato da mensagem
        cy.get('mat-error')
            .should('be.visible')
            .then($error => {
                const mensagem = $error.text();
                cy.log('Mensagem de erro encontrada:', mensagem);

                // Verifica se a mensagem segue o padrão esperado
                expect(mensagem).to.match(/A data não pode ser anterior a \d{2}\/\d{2}\/\d{4}\./);

                // Extrai a data da mensagem para log
                const dataMatch = mensagem.match(/(\d{2}\/\d{2}\/\d{4})/);
                if (dataMatch) {
                    cy.log('Data limite encontrada na mensagem:', dataMatch[1]);
                }
            });
    });

    it('Deve conter modal com mensagem de erro para data posterior', () => {

        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Extrato').click();

        // Obtém a data atual
        const dataAtual = new Date();

        // Obtém a data 120 dias atrás
        const dataInicial = new Date();
        dataInicial.setDate(dataInicial.getDate() - 120);

        // Formata as datas no padrão brasileiro (dd/mm/yyyy)
        const dataAtualFormatada = dataAtual.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const dataInicialFormatada = dataInicial.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Log para debug das datas calculadas
        cy.log(`Data Inicial (120 dias atrás): ${dataInicialFormatada}`);
        cy.log(`Data Final (atual): ${dataAtualFormatada}`);

        // Limpa e preenche o campo de data inicial
        cy.get("input[placeholder='Data inicial']")
            .clear()
            .type(dataInicialFormatada);

        // Limpa e preenche o campo de data final
        cy.get("input[placeholder='Data final']")
            .clear()
            .type(dataAtualFormatada);

        // Verifica se existe o mat-error e valida o formato da mensagem
        cy.get('mat-error')
            .should('be.visible')
            .then($error => {
                const mensagem = $error.text();
                cy.log('Mensagem de erro encontrada:', mensagem);

                // Verifica se a mensagem segue o padrão esperado
                expect(mensagem).to.match(/A data não pode ser anterior a \d{2}\/\d{2}\/\d{4}\./);

                // Extrai a data da mensagem para log
                const dataMatch = mensagem.match(/(\d{2}\/\d{2}\/\d{4})/);
                if (dataMatch) {
                    cy.log('Data limite encontrada na mensagem:', dataMatch[1]);
                }
            });
    });

    it('Validar modal de erro ao deixar o campo data inicial vazio', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Extrato').click();

        cy.xpath("//input[contains(@placeholder,'Data inicial')]").clear()

        // Verifica se a mensagem de erro está presente
        cy.contains('Selecione uma data inicial!').should('be.visible')
    });

    it('Validar modal de erro ao deixar o campo data final vazio', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Extrato').click();

        cy.xpath("//input[contains(@placeholder,'Data final')]").clear()
        cy.contains('Selecione uma data Final!').should('be.visible')
    });

});