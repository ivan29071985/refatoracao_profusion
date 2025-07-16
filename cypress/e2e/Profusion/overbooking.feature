Scenario: Validar o botão cadastrar
Given que o usuário esteja na tela home
When ele clicar no botão cadastrar
And efetuar um reload na tela
Then o usuário deverá receber uma mensagem informando 'sucesso'

Scenario: Validar 