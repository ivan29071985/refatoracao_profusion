describe('Login', () => {
  // Este teste valida o fluxo completo de recuperação de senha,
  // incluindo recebimento de email e redefinição da senha

  describe('Fluxo de recuperação de senha', () => {
    it('Deve permitir recuperar senha via email', () => {
      // Email fixo para teste
      const emailAddress = 'began-sign@zulmf88y.mailosaur.net';
      const serverId = 'zulmf88y';

      // Acessar a página inicial
      cy.visit('/');

      // Clicar no link "Esqueci a minha senha"
      cy.get('a').contains('Esqueci a minha senha').click();

      // Preencher o email na tela de recuperação
      cy.get('input[placeholder="E-mail"]').type(emailAddress);

      // Clicar no botão de enviar
      cy.get('#login').click();

      // Verificar se a tela de confirmação aparece
      cy.contains('Nova senha Solicitada').should('be.visible');
      cy.contains('Enviamos um e-mail com instruções').should('be.visible');

      // Clicar no botão "Ok" da confirmação
      cy.contains('button', 'Ok').click();

      // Verificar o recebimento do email usando Mailosaur
      cy.log('Aguardando o recebimento do email...');

      cy.mailosaurGetMessage(
        serverId,
        {
          sentTo: emailAddress
        },
        {
          timeout: 60000 // 60 segundos para receber o email
        }
      ).then(email => {
        // Logar informações do email para diagnóstico
        cy.log(`Email recebido: ${email.subject}`);

        // Verificar o assunto do email
        expect(email.subject).to.match(/recupera[çc][aã]o de senha/i);

        // Verificar o remetente do email
        expect(email.from[0].email).to.include('@amorsaude.com');

        // Logar links encontrados no email
        email.html.links.forEach((link, i) => {
          cy.log(`Link ${i + 1}: ${link.text} - ${link.href}`);
        });

        // Encontrar o link de redefinição de senha
        const resetLink = email.html.links.find(link =>
          (link.text && link.text.includes('SENHA NOVA')) ||
          (link.href && link.href.includes('reset'))
        );

        if (!resetLink) {
          throw new Error('Link de redefinição não encontrado no email');
        }

        // Acessar o link de redefinição
        cy.log(`Acessando link de redefinição: ${resetLink.href}`);
        cy.visit(resetLink.href);

        // Aguardar carregamento da página de redefinição
        cy.contains('Cadastrar nova Senha', { timeout: 10000 }).should('be.visible');

        // Função atualizada para gerar senha no formato Iv@n198529
        const generateFormattedPassword = () => {
          // Letra maiúscula inicial (como I)
          const upperCase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
          const firstChar = upperCase.charAt(Math.floor(Math.random() * upperCase.length));

          // Letras minúsculas (como v)
          const lowerCase = 'abcdefghijkmnopqrstuvwxyz';
          let middleChars = '';
          for (let i = 0; i < 2; i++) {
            middleChars += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
          }

          // Caractere especial (como @)
          const special = '@#$%&*!';
          const specialChar = special.charAt(Math.floor(Math.random() * special.length));

          // Números (como 198529)
          const numbers = '0123456789';
          let numericPart = '';
          for (let i = 0; i < 6; i++) {
            numericPart += numbers.charAt(Math.floor(Math.random() * numbers.length));
          }

          // Combinando tudo no formato Xx@123456
          return firstChar + middleChars + specialChar + numericPart;
        };

        const newPassword = generateFormattedPassword();
        cy.log(`Senha gerada: ${newPassword}`);

        // Esperar um momento para a página estabilizar
        cy.wait(1000);

        // Preencher os campos de senha
        cy.get('input[type="password"]').first().clear().type(newPassword, { force: true });
        cy.get('input[type="password"]').eq(1).clear().type(newPassword, { force: true });

        // Clicar no botão para registrar a nova senha
        cy.get('button').contains(' Registrar Senha ').click({ force: true });

        // Verificar mensagem de sucesso
        cy.contains(/senha.*alterada|alteração.*sucesso|sucesso/i, { timeout: 10000 })
          .should('be.visible')
          .then(() => {
            cy.log('✅ Fluxo de recuperação de senha concluído com sucesso!');
          });
      });
    });
  });
  
});
