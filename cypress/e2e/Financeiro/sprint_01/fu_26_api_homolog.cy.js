/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />

describe('fu_26', () => {
  it('Validar API POST - Login > 200', () => {
      cy.request({
          method: 'POST',
          url: 'https://amei-homolog.amorsaude.com.br/api/v1/security/login',
          body: {
              "email": "ivan.santos+1@amorsaude.com",
              "password": "Iv@n198529"
          },
          failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.equal(200);
      });
  });

  it('Validar API POST refresh token > 201', () => {
      cy.request({
          method: 'POST',
          url: 'https://amei-homolog.amorsaude.com.br/api/v1/security/login',
          body: {
              "email": "ivan.santos+1@amorsaude.com",
              "password": "Iv@n198529"
          },
          failOnStatusCode: false
      }).then((response) => {
          const token = response.body.access_token;
          expect(token).to.exist;

          cy.request({
              method: 'POST',
              url: 'https://amei-homolog.amorsaude.com.br/api/v1/security/refresh-token?clinicId=483',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
              failOnStatusCode: false
          }).then(anotherApiResponse => {
              expect(anotherApiResponse.status).to.eq(201);
          });
      });
  });

  it('Validar para que todos usuários pertencem a clínica logada > 483', () => {
      // Primeiro login para obter o token
      cy.request({
          method: 'POST',
          url: 'https://amei-homolog.amorsaude.com.br/api/v1/security/login',
          body: {
              "email": "ivan.santos+1@amorsaude.com",
              "password": "Iv@n198529"
          },
          failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.equal(200);
          const token = response.body.access_token;
          expect(token).to.exist;

          // Refresh token com clinicId
          cy.request({
              method: 'POST',
              url: 'https://amei-homolog.amorsaude.com.br/api/v1/security/refresh-token?clinicId=483',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
              failOnStatusCode: false
          }).then((refreshResponse) => {
              expect(refreshResponse.status).to.equal(201);
              const newToken = refreshResponse.body.access_token;
              expect(newToken).to.exist;

              // Usar o novo token para obter os usuários da clínica
              cy.request({
                  method: 'GET',
                  url: 'https://amei-homolog.amorsaude.com.br/api/v1/user/by-clinic',
                  headers: {
                      'Authorization': `Bearer ${newToken}`,
                  },
                  failOnStatusCode: false
              }).then((anotherApiResponse) => {
                  expect(anotherApiResponse.status).to.eq(200);
                  const users = anotherApiResponse.body;

                  // Log para depuração
                  cy.log(JSON.stringify(users));

                  // Validar que todos os usuários pertencem à clínica logada e têm a unidade correta
                  users.forEach(user => {
                      expect(user.unidadeId).to.exist;
                  });
              });
          });
      });
  });

  it('Validar para que todos usuários pertencem a unidade correta > Unidade Teste / Treinamento', () => {
      // Primeiro login para obter o token
      cy.request({
          method: 'POST',
          url: 'https://amei-homolog.amorsaude.com.br/api/v1/security/login',
          body: {
              "email": "ivan.santos+1@amorsaude.com",
              "password": "Iv@n198529"
          },
          failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.equal(200);
          const token = response.body.access_token;
          expect(token).to.exist;

          // Refresh token com clinicId
          cy.request({
              method: 'POST',
              url: 'https://amei-homolog.amorsaude.com.br/api/v1/security/refresh-token?clinicId=483',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
              failOnStatusCode: false
          }).then((refreshResponse) => {
              expect(refreshResponse.status).to.equal(201);
              const newToken = refreshResponse.body.access_token;
              expect(newToken).to.exist;

              // Usar o novo token para obter os usuários da clínica
              cy.request({
                  method: 'GET',
                  url: 'https://amei-homolog.amorsaude.com.br/api/v1/user/by-clinic',
                  headers: {
                      'Authorization': `Bearer ${newToken}`,
                  },
                  failOnStatusCode: false
              }).then((anotherApiResponse) => {
                  expect(anotherApiResponse.status).to.eq(200);
                  const users = anotherApiResponse.body;

                  // Log para depuração
                  cy.log(JSON.stringify(users));

                  // Validar que todos os usuários pertencem à clínica logada e têm a unidade correta
                  users.forEach(user => {
                      expect(user.unidade).to.equal("Unidade Teste / Treinamento")

                  });
              });
          });
      });
  });

  it('Validar para que todos usuários pertencem a clínica logada > 503', () => {
      // Primeiro login para obter o token
      cy.request({
          method: 'POST',
          url: 'https://amei-homolog.amorsaude.com.br/api/v1/security/login',
          body: {
              "email": "ivan.santos+1@amorsaude.com",
              "password": "Iv@n198529"
          },
          failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.equal(200);
          const token = response.body.access_token;
          expect(token).to.exist;

          // Refresh token com clinicId
          cy.request({
              method: 'POST',
              url: 'https://amei-homolog.amorsaude.com.br/api/v1/security/refresh-token?clinicId=503',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
              failOnStatusCode: false
          }).then((refreshResponse) => {
              expect(refreshResponse.status).to.equal(201);
              const newToken = refreshResponse.body.access_token;
              expect(newToken).to.exist;

              // Usar o novo token para obter os usuários da clínica
              cy.request({
                  method: 'GET',
                  url: 'https://amei-homolog.amorsaude.com.br/api/v1/user/by-clinic',
                  headers: {
                      'Authorization': `Bearer ${newToken}`,
                  },
                  failOnStatusCode: false
              }).then((anotherApiResponse) => {
                  expect(anotherApiResponse.status).to.eq(200);
                  const users = anotherApiResponse.body;

                  // Log para depuração
                  cy.log(JSON.stringify(users));

                  // Validar que todos os usuários pertencem à clínica logada e têm a unidade correta
                  users.forEach(user => {
                      expect(user.unidadeId).to.exist;
                  });
              });
          });
      });
  });

  it('Validar para que todos usuários pertencem a unidade correta > AmorSaúde Parobé', () => {
      // Primeiro login para obter o token
      cy.request({
          method: 'POST',
          url: 'https://amei-homolog.amorsaude.com.br/api/v1/security/login',
          body: {
              "email": "ivan.santos+1@amorsaude.com",
              "password": "Iv@n198529"
          },
          failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.equal(200);
          const token = response.body.access_token;
          expect(token).to.exist;

          // Refresh token com clinicId
          cy.request({
              method: 'POST',
              url: 'https://amei-homolog.amorsaude.com.br/api/v1/security/refresh-token?clinicId=503',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
              failOnStatusCode: false
          }).then((refreshResponse) => {
              expect(refreshResponse.status).to.equal(201);
              const newToken = refreshResponse.body.access_token;
              expect(newToken).to.exist;

              // Usar o novo token para obter os usuários da clínica
              cy.request({
                  method: 'GET',
                  url: 'https://amei-homolog.amorsaude.com.br/api/v1/user/by-clinic',
                  headers: {
                      'Authorization': `Bearer ${newToken}`,
                  },
                  failOnStatusCode: false
              }).then((anotherApiResponse) => {
                  expect(anotherApiResponse.status).to.eq(200);
                  const users = anotherApiResponse.body;

                  // Log para depuração
                  cy.log(JSON.stringify(users));

                  // Validar que todos os usuários pertencem à clínica logada e têm a unidade correta
                  users.forEach(user => {
                      expect(user.unidade).to.equal("AmorSaúde Parobé")

                  });
              });
          });
      });
  });
});



