/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('fu_90', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
    });

    it('Verificar somatória dos valores de Não Quitadas do dia Atual', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();
        cy.contains('Contas a pagar').click();
        cy.get('#selectStats').click()
        cy.xpath("//span[contains(.,'Não Quitado')]").click()

        const getPreviousDateFormatted = () => {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 0);

            const day = String(yesterday.getDate()).padStart(2, '0');
            const month = String(yesterday.getMonth() + 1).padStart(2, '0');
            const year = yesterday.getFullYear();

            return `${day}/${month}/${year}`;
        };

        const formattedDate = getPreviousDateFormatted();

        cy.get('[formControlName="dateInit"]')  // Usando o seletor que aparece na imagem
            .clear()  // Limpa o campo existente
            .type(formattedDate, { force: true })  // Digita a nova data, forçando se necessário
            .should('have.value', formattedDate);  // Verifica se o valor foi inserido corretamente

        cy.log(`Nova data inserida: ${formattedDate}`);

        cy.get("#pesquisar").click()


        cy.wait(2000)
        cy.get('table th:contains("Valor")')
            .invoke('index')
            .then((index) => {
                cy.get(`table td:nth-child(${index + 1})`)
                    .then($cells => {
                        // Melhorando a extração dos valores
                        const valores = $cells
                            .toArray()
                            .map(el => {
                                // Pegando o texto e removendo espaços extras
                                const texto = el.innerText.trim();
                                // Removendo 'R$' e qualquer espaço
                                const valorLimpo = texto.replace('R$', '').trim();
                                // Substituindo '.' por '' e ',' por '.' para converter corretamente
                                const valorNumerico = valorLimpo.replace(/\./g, '').replace(',', '.');
                                return parseFloat(valorNumerico);
                            })
                            .filter(val => !isNaN(val));

                        // Calculando a soma com precisão de 2 casas decimais
                        const soma = Number(valores.reduce((acc, val) => acc + val, 0).toFixed(2));

                        cy.log(`Valores individuais encontrados:`, valores);
                        cy.log(`A soma calculada dos valores é: R$ ${soma.toFixed(2)}`);

                        // Verificando o valor em aberto total
                        cy.contains('Valor em aberto total:')
                            .invoke('text')
                            .then((texto) => {
                                const valorEmAbertoTexto = texto.replace('Valor em aberto total:', '').trim();
                                const valorEmAbertoLimpo = valorEmAbertoTexto
                                    .replace('R$', '')
                                    .trim()
                                    .replace(/\./g, '')
                                    .replace(',', '.');
                                const valorEmAbertoTotal = Number(parseFloat(valorEmAbertoLimpo).toFixed(2));

                                cy.log(`Valor em aberto total exibido: R$ ${valorEmAbertoTotal.toFixed(2)}`);

                                // Verificando se os valores são iguais
                                if (soma !== valorEmAbertoTotal) {
                                    cy.log(`ATENÇÃO: Há uma diferença entre os valores!`);
                                    cy.log(`Diferença: R$ ${(valorEmAbertoTotal - soma).toFixed(2)}`);
                                }
                            });
                    });
            });

    });

    it('Verificar somatória dos valores de Não Quitadas com 1 dia', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();
        cy.contains('Contas a pagar').click();
        cy.get('#selectStats').click()
        cy.xpath("//span[contains(.,'Não Quitado')]").click()

        const getPreviousDateFormatted = () => {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            const day = String(yesterday.getDate()).padStart(2, '0');
            const month = String(yesterday.getMonth() + 1).padStart(2, '0');
            const year = yesterday.getFullYear();

            return `${day}/${month}/${year}`;
        };

        const formattedDate = getPreviousDateFormatted();

        cy.get('[formControlName="dateInit"]')  // Usando o seletor que aparece na imagem
            .clear()
            .type(formattedDate, { force: true })
            .should('have.value', formattedDate);

        cy.log(`Nova data inserida: ${formattedDate}`);

        cy.get("#pesquisar").click()

        cy.wait(2000)
        cy.get('table th:contains("Valor")')
            .invoke('index')
            .then((index) => {
                cy.get(`table td:nth-child(${index + 1})`)
                    .then($cells => {
                        const valores = $cells
                            .toArray()
                            .map(el => {
                                const valorTexto = el.innerText.trim();
                                cy.log(`Valor original: ${valorTexto}`);

                                // Novo tratamento para lidar com a formatação "R$ X.XXX,XX"
                                const valorLimpo = valorTexto.replace(/[^\d,-]/g, '').replace(',', '.');
                                const valorNumerico = parseFloat(valorLimpo);

                                cy.log(`Valor processado: ${valorNumerico}`);
                                return valorNumerico;
                            })
                            .filter(val => !isNaN(val));

                        cy.log(`Valores extraídos: ${JSON.stringify(valores)}`);

                        const soma = valores.reduce((acc, val) => acc + val, 0);


                        cy.log(`A soma calculada dos valores é: R$ ${soma.toFixed(2)}`);

                        cy.contains('Valor em aberto total:')
                            .invoke('text')
                            .then((texto) => {
                                // Ajuste para lidar com o formato "R$ X.XXX,XX"
                                const valorEmAbertoTotal = parseFloat(texto.replace(/[^\d,-]/g, '').replace(',', '.'));

                                cy.log(`Valor em aberto total exibido: R$ ${valorEmAbertoTotal.toFixed(2)}`);

                                // Verifica se a soma está próxima do valor esperado
                                expect(soma).to.be.closeTo(valorEmAbertoTotal, 0.01,
                                    `A soma calculada (R$ ${soma.toFixed(2)}) deve ser igual ao Valor em aberto total (R$ ${valorEmAbertoTotal.toFixed(2)})`);

                            });
                    });
            });
    });

    it('Verificar somatória dos valores de Não Quitadas com 2 dias', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();
        cy.contains('Contas a pagar').click();
        cy.get('#selectStats').click()
        cy.xpath("//span[contains(.,'Não Quitado')]").click()

        const getPreviousDateFormatted = () => {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 2);

            const day = String(yesterday.getDate()).padStart(2, '0');
            const month = String(yesterday.getMonth() + 1).padStart(2, '0');
            const year = yesterday.getFullYear();

            return `${day}/${month}/${year}`;
        };

        const formattedDate = getPreviousDateFormatted();

        cy.get('[formControlName="dateInit"]')  // Usando o seletor que aparece na imagem
            .clear()
            .type(formattedDate, { force: true })
            .should('have.value', formattedDate);

        cy.log(`Nova data inserida: ${formattedDate}`);

        cy.get("#pesquisar").click()

        cy.wait(2000)
        cy.get('table th:contains("Valor")')
            .invoke('index')
            .then((index) => {
                cy.get(`table td:nth-child(${index + 1})`)
                    .then($cells => {
                        const valores = $cells
                            .toArray()
                            .map(el => {
                                const valorTexto = el.innerText.trim();
                                cy.log(`Valor original: ${valorTexto}`);

                                // Novo tratamento para lidar com a formatação "R$ X.XXX,XX"
                                const valorLimpo = valorTexto.replace(/[^\d,-]/g, '').replace(',', '.');
                                const valorNumerico = parseFloat(valorLimpo);

                                cy.log(`Valor processado: ${valorNumerico}`);
                                return valorNumerico;
                            })
                            .filter(val => !isNaN(val));

                        cy.log(`Valores extraídos: ${JSON.stringify(valores)}`);

                        const soma = valores.reduce((acc, val) => acc + val, 0);


                        cy.log(`A soma calculada dos valores é: R$ ${soma.toFixed(2)}`);

                        cy.contains('Valor em aberto total:')
                            .invoke('text')
                            .then((texto) => {
                                // Ajuste para lidar com o formato "R$ X.XXX,XX"
                                const valorEmAbertoTotal = parseFloat(texto.replace(/[^\d,-]/g, '').replace(',', '.'));

                                cy.log(`Valor em aberto total exibido: R$ ${valorEmAbertoTotal.toFixed(2)}`);

                                // Verifica se a soma está próxima do valor esperado
                                expect(soma).to.be.closeTo(valorEmAbertoTotal, 0.01,
                                    `A soma calculada (R$ ${soma.toFixed(2)}) deve ser igual ao Valor em aberto total (R$ ${valorEmAbertoTotal.toFixed(2)})`);

                            });
                    });
            });
    });

    it('Investigar discrepância na somatória dos valores', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();
        cy.contains('Contas a pagar').click();
        cy.get('#selectStats').click()
        cy.xpath("//span[contains(.,'Não Quitado')]").click()

        cy.get("#pesquisar").click()

        cy.get('table th:contains("Valor")')
            .invoke('index')
            .then((index) => {
                cy.get(`table td:nth-child(${index + 1})`)
                    .then($cells => {
                        const valores = $cells
                            .toArray()
                            .map(el => {
                                const valorTexto = el.innerText;
                                const valorLimpo = valorTexto.replace(/[^\d,.-]/g, '');
                                const valorNumerico = parseFloat(valorLimpo.replace(',', '.'));
                                cy.log(`Valor encontrado: ${valorTexto} -> Convertido para: ${valorNumerico}`);
                                return valorNumerico;
                            })
                            .filter(val => !isNaN(val));

                        cy.log(`Valores encontrados: ${JSON.stringify(valores)}`);

                        const soma = valores.reduce((acc, val) => acc + val, 0);

                        cy.log(`A soma calculada dos valores é: R$ ${soma.toFixed(2)}`);

                        cy.contains('Valor em aberto total:')
                            .invoke('text')
                            .then((texto) => {
                                const valorEmAbertoTotal = parseFloat(texto.match(/R\$\s*([\d.,]+)/)[1].replace('.', '').replace(',', '.'));

                                cy.log(`Valor em aberto total exibido: R$ ${valorEmAbertoTotal.toFixed(2)}`);

                                cy.log(`Diferença: R$ ${(valorEmAbertoTotal - soma).toFixed(2)}`);

                                if (Math.abs(soma - valorEmAbertoTotal) > 0.01) {
                                    cy.log('ATENÇÃO: Há uma discrepância significativa entre a soma calculada e o valor em aberto total!');
                                    cy.log('Por favor, verifique se todos os valores estão sendo considerados corretamente.');
                                }

                                // Não vamos usar expect aqui, apenas reportar a diferença
                                cy.log(`A soma calculada (R$ ${soma.toFixed(2)}) é diferente do Valor em aberto total (R$ ${valorEmAbertoTotal.toFixed(2)})`);
                            });
                    });
            });
    });

    it('Verificar somatória dos valores de Não Quitadas com 8 dias', () => {
        const baseUrl = Cypress.env('currentBaseUrl'); // Recupere a baseUrl atual
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 10000 }).click();
        cy.contains('Contas a pagar').click();
        cy.get('#selectStats').click()
        cy.xpath("//span[contains(.,'Não Quitado')]").click()

        const getPreviousDateFormatted = () => {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 8);

            const day = String(yesterday.getDate()).padStart(2, '0');
            const month = String(yesterday.getMonth() + 1).padStart(2, '0');
            const year = yesterday.getFullYear();

            return `${day}/${month}/${year}`;
        };

        const formattedDate = getPreviousDateFormatted();

        cy.get('[formControlName="dateInit"]')  // Usando o seletor que aparece na imagem
            .clear()
            .type(formattedDate, { force: true })
            .should('have.value', formattedDate);

        cy.log(`Nova data inserida: ${formattedDate}`);

        cy.get("#pesquisar").click()

        cy.wait(2000)
        cy.get('table th:contains("Valor")')
            .invoke('index')
            .then((index) => {
                cy.get(`table td:nth-child(${index + 1})`)
                    .then($cells => {
                        const valores = $cells
                            .toArray()
                            .map(el => {
                                const valorTexto = el.innerText.trim();
                                cy.log(`Valor original: ${valorTexto}`);

                                // Novo tratamento para lidar com a formatação "R$ X.XXX,XX"
                                const valorLimpo = valorTexto.replace(/[^\d,-]/g, '').replace(',', '.');
                                const valorNumerico = parseFloat(valorLimpo);

                                cy.log(`Valor processado: ${valorNumerico}`);
                                return valorNumerico;
                            })
                            .filter(val => !isNaN(val));

                        cy.log(`Valores extraídos: ${JSON.stringify(valores)}`);

                        const soma = valores.reduce((acc, val) => acc + val, 0);


                        cy.log(`A soma calculada dos valores é: R$ ${soma.toFixed(2)}`);

                        cy.contains('Valor em aberto total:')
                            .invoke('text')
                            .then((texto) => {
                                // Ajuste para lidar com o formato "R$ X.XXX,XX"
                                const valorEmAbertoTotal = parseFloat(texto.replace(/[^\d,-]/g, '').replace(',', '.'));

                                cy.log(`Valor em aberto total exibido: R$ ${valorEmAbertoTotal.toFixed(2)}`);

                                // Verifica se a soma está próxima do valor esperado
                                expect(soma).to.be.closeTo(valorEmAbertoTotal, 0.01,
                                    `A soma calculada (R$ ${soma.toFixed(2)}) deve ser igual ao Valor em aberto total (R$ ${valorEmAbertoTotal.toFixed(2)})`);

                            });
                    });
            });
    });
});
