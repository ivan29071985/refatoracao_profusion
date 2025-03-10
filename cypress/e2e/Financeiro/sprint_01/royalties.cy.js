describe('Royalties', () => {
  beforeEach(() => {
    cy.setupAndLogin(); // Usa o comando customizado
  });

  it('Validar Big Numbers Venda bruta total na tela de Royalties ', () => {

    let valorBrutoTotal;

    cy.visit('/');
    cy.get('#financial').click();
    
    cy.get('span').contains('Royalties', { timeout: 20000 }).click();
    
    cy.get('[data-mat-icon-name="info-icon"]', { timeout: 20000 })
      .should('be.visible')
      .first()
      .click({ force: true });
    
    // Intercept the request
    cy.intercept('GET', '**/api/v1/royalties/infos-financials**').as('getValores');
    cy.wait('@getValores', { timeout: 10000 });
    
    const extrairValor = (texto) => {
      // Melhorando a extração para lidar com diferentes formatos
      const match = texto.match(/R\$\s*([\d.,]+)/);
      if (!match) return 0;
      const valorStr = match[1];
      // Tratando números com pontos e vírgulas no formato brasileiro
      return parseFloat(valorStr.replace(/\./g, '').replace(',', '.'));
    };
    
    // Captura o valor da venda bruta total
    cy.xpath('//div[contains(@class,"card-content-item") and contains(.,"Venda bruta total")]')
      .invoke('text')
      .then((vendaBrutaTexto) => {
        cy.log(`Texto completo venda bruta: "${vendaBrutaTexto}"`);
        const vendaBruta = extrairValor(vendaBrutaTexto);
        cy.log(`Venda Bruta extraída: ${vendaBruta}`);
        
        // Armazena o valor bruto total na variável
        valorBrutoTotal = vendaBruta;
        
        // Armazena os valores das formas de pagamento
        let tef = 0;
        let naoTef = 0;
        let dinheiro = 0;
        let pix = 0;
        
        // Captura o valor TEF
        cy.xpath('//div[contains(@class,"second-card-content") and contains(.,"TEF")]')
          .invoke('text')
          .then((tefTexto) => {
            cy.log(`Texto completo TEF: "${tefTexto}"`);
            tef = extrairValor(tefTexto);
            cy.log(`TEF extraído: ${tef}`);
            
            // Captura o valor Não TEF
            cy.xpath('//div[contains(@class,"second-card-content") and contains(.,"Não TEF")]')
              .invoke('text')
              .then((naoTefTexto) => {
                cy.log(`Texto completo Não TEF: "${naoTefTexto}"`);
                naoTef = extrairValor(naoTefTexto);
                cy.log(`Não TEF extraído: ${naoTef}`);
                
                // Captura o valor Dinheiro
                cy.xpath('//div[contains(@class,"second-card-content") and contains(.,"Dinheiro")]')
                  .invoke('text')
                  .then((dinheiroTexto) => {
                    cy.log(`Texto completo Dinheiro: "${dinheiroTexto}"`);
                    dinheiro = extrairValor(dinheiroTexto);
                    cy.log(`Dinheiro extraído: ${dinheiro}`);
                    
                    // Captura o valor PIX
                    cy.xpath('//div[contains(@class,"second-card-content") and contains(.,"PIX")]')
                      .invoke('text')
                      .then((pixTexto) => {
                        cy.log(`Texto completo PIX: "${pixTexto}"`);
                        pix = extrairValor(pixTexto);
                        cy.log(`PIX extraído: ${pix}`);
                        
                        // Calcula a soma das formas de pagamento
                        const somaFormasPagamento = tef + naoTef + dinheiro + pix;
                        
                        // Formata os valores para exibição com 2 casas decimais
                        const somaFormatada = somaFormasPagamento.toFixed(2);
                        const valorBrutoFormatado = valorBrutoTotal.toFixed(2);
                        
                        // Exibe a verificação de forma clara
                        cy.log(`A soma das formas de pagamento (TEF + Não TEF + Dinheiro + PIX = ${somaFormatada}) deve ser igual à Venda bruta total (${valorBrutoFormatado})`);
                        
                        // Verificação
                        expect(parseFloat(somaFormatada)).to.equal(parseFloat(valorBrutoFormatado), 
                          `A soma das formas de pagamento (TEF: ${tef.toFixed(2)} + Não TEF: ${naoTef.toFixed(2)} + Dinheiro: ${dinheiro.toFixed(2)} + PIX: ${pix.toFixed(2)} = ${somaFormatada}) deve ser igual à Venda bruta total (${valorBrutoFormatado})`);
                      });
                  });
              });
          });
      });
  });
});







