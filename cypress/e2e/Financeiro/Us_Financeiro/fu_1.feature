Feature: Visão "Saldo" no menu "Financeiro"

    Eu, usuário do financeiro da franquia, gostaria de visualizar os saldos das contas financeiras e do caixa em uma data específica,
    para que possa comparar os valores com os
    saldos dos bancos e do caixa físico.


    # Cenários de Teste Expandidos - Saldo Financeiro (Formato Gherkin)

    ## Critério 1: Acesso à aba "Saldo"

    Scenario: Navegação bem-sucedida para a aba "Saldo" (Positivo)
        Given o usuário está logado no sistema
        When clica no menu "Financeiro"
        Then deve ver a aba "Saldo" logo abaixo de "Menu"
        And ao clicar em "Saldo", deve ser redirecionado para a página correta de saldo

    Scenario: Aba "Saldo" não visível no menu "Financeiro" (Negativo)
        Given o usuário está logado no sistema
        When acessa o menu "Financeiro"
        And a aba "Saldo" não está visível
        Then deve ser exibida uma mensagem de erro ou notificação sobre a indisponibilidade

    Scenario: Acesso à aba "Saldo" a partir de diferentes seções do sistema (Alternativo)
        Given o usuário está em outra seção do sistema financeiro
        When navega para o menu "Financeiro" e clica em "Saldo"
        Then deve ser redirecionado corretamente para a página de saldo, independentemente da seção de origem

    ## Critério 2: Exibição correta dos saldos

    Scenario: Visualização dos saldos atualizados na data presente (Positivo)
        Given o usuário acessa a aba "Saldo"
        When visualiza os saldos das contas financeiras e do caixa
        Then os valores exibidos devem refletir a somatória de todas as transações realizadas até o momento atual

    Scenario: Atualização em tempo real dos saldos (Negativo)
        Given o usuário está visualizando os saldos na aba "Saldo"
        When uma nova transação é realizada em tempo real
        Then os saldos devem ser atualizados automaticamente sem necessidade de refresh manual

    Scenario: Visualização de saldos com contas zeradas ou negativas (Alternativo)
        Given o usuário acessa a aba "Saldo"
        When visualiza os saldos das contas
        Then deve ver corretamente as contas com saldo zero ou negativo, claramente identificadas

    ## Critério 3: Seleção de data única

    Scenario: Seleção de data única bem-sucedida (Positivo)
        Given o usuário está na aba "Saldo"
        When seleciona uma única data válida no calendário
        Then o sistema deve atualizar os saldos para refletir as transações até a data selecionada

    Scenario: Tentativa de seleção de múltiplas datas (Negativo)
        Given o usuário está na aba "Saldo"
        When tenta selecionar mais de uma data no calendário
        Then o sistema deve impedir a seleção múltipla
        And manter apenas a última data selecionada como válida

    Scenario: Retorno rápido à data atual (Alternativo)
        Given o usuário selecionou uma data diferente da atual
        When clica em um botão "Voltar para hoje"
        Then o sistema deve imediatamente atualizar os saldos para a data presente

    ## Critério 4: Coerência da somatória total

    Scenario: Verificação da somatória total correta (Positivo)
        Given o usuário está visualizando a aba "Saldo"
        When observa a linha de somatória total
        Then o valor deve ser exatamente igual à soma dos saldos de todas as contas financeiras e caixa exibidos

    Scenario: Detecção de discrepância na somatória total (Negativo)
        Given há uma inconsistência entre a somatória total e os saldos individuais
        When o sistema detecta esta discrepância
        Then deve exibir um alerta visual
        And oferecer uma opção para recalcular os saldos

    Scenario: Detalhamento da composição do saldo total (Alternativo)
        Given o usuário está visualizando a somatória total
        When clica em uma opção de "Ver detalhes" ao lado do total
        Then o sistema deve exibir um breakdown mostrando como cada conta contribui para o saldo total

    ## Critério 5: Seleção de datas passadas

    Scenario: Visualização correta do saldo para data passada (Positivo)
        Given o usuário está na aba "Saldo"
        When seleciona uma data passada válida
        Then o saldo exibido deve corresponder às entradas e saídas realizadas até a data escolhida

    Scenario: Seleção de data anterior ao registro mais antigo (Negativo)
        Given o usuário está na aba "Saldo"
        When seleciona uma data anterior ao primeiro registro no sistema
        Then deve ser exibida uma mensagem informando que não há dados disponíveis para essa data
        And mostrar o saldo do registro mais antigo disponível

    Scenario: Comparação de saldos entre datas passadas (Alternativo)
        Given o usuário selecionou uma data passada
        When ativa uma opção de "Comparar com outra data"
        Then o sistema deve permitir a seleção de uma segunda data passada
        And exibir uma comparação lado a lado dos saldos nas duas datas

    ## Critério 6: Seleção de datas futuras

    Scenario: Visualização correta do saldo para data futura (Positivo)
        Given o usuário está na aba "Saldo"
        When seleciona uma data futura válida
        Then o saldo exibido deve incluir as entradas e saídas atuais mais os recebimentos futuros de cartão de crédito/débito previstos até a data selecionada

    Scenario: Seleção de data futura sem previsões (Negativo)
        Given o usuário seleciona uma data futura
        When não há recebimentos previstos de cartão para essa data
        Then o sistema deve exibir o saldo atual
        And incluir uma nota informando que não há previsões adicionais para a data selecionada

    Scenario: Visualização detalhada de recebíveis futuros (Alternativo)
        Given o usuário selecionou uma data futura
        When clica em uma opção "Ver detalhes dos recebíveis"
        Then o sistema deve exibir um breakdown dos recebimentos futuros de cartão previstos até a data selecionada

    ## Critério 7: Performance na seleção de datas

    Scenario: Resposta rápida na seleção de qualquer data (Positivo)
        Given o usuário está na aba "Saldo"
        When seleciona qualquer data válida
        Then o sistema deve carregar e exibir as informações atualizadas em menos de 1 segundo

    Scenario: Alerta de demora no carregamento (Negativo)
        Given o usuário seleciona uma data
        When o tempo de resposta excede 1 segundo
        Then o sistema deve exibir um indicador de carregamento
        And se persistir, mostrar uma mensagem explicando o atraso

    Scenario: Cache inteligente para datas frequentes (Alternativo)
        Given o usuário frequentemente verifica certas datas específicas
        When seleciona uma dessas datas frequentes
        Then o sistema deve carregar as informações quase instantaneamente, utilizando um cache inteligente

    ## Critério 8: Data mínima selecionável

    Scenario: Seleção da data mínima permitida (Positivo)
        Given o usuário está na aba "Saldo"
        When tenta selecionar datas no calendário
        Then a data mínima disponível deve ser exatamente 180 dias antes da data atual

    Scenario: Tentativa de seleção de data anterior ao limite mínimo (Negativo)
        Given o usuário está na aba "Saldo"
        When tenta selecionar ou inserir manualmente uma data anterior a 180 dias da data atual
        Then o sistema deve impedir a seleção
        And exibir uma mensagem informativa sobre o limite de data

    Scenario: Solicitação de dados históricos além do limite (Alternativo)
        Given o usuário precisa visualizar saldos anteriores ao limite de 180 dias
        When seleciona uma opção "Solicitar dados históricos"
        Then o sistema deve abrir um formulário de solicitação para a equipe de suporte
        And informar o tempo estimado para o processamento dessa solicitação especial

    ## Critério 9: Data máxima selecionável

    Scenario: Seleção da data máxima permitida (Positivo)
        Given o usuário está na aba "Saldo"
        When tenta selecionar datas futuras no calendário
        Then a data máxima disponível deve ser exatamente 90 dias após a data atual

    Scenario: Tentativa de seleção de data posterior ao limite máximo (Negativo)
        Given o usuário está na aba "Saldo"
        When tenta selecionar ou inserir manualmente uma data posterior a 90 dias da data atual
        Then o sistema deve impedir a seleção
        And exibir uma mensagem informativa sobre o limite de data futura

    Scenario: Visualização de tendências de saldo a longo prazo (Alternativo)
        Given o usuário deseja uma perspectiva de longo prazo dos saldos
        When seleciona uma opção "Visualizar tendência futura"
        Then o sistema deve exibir um gráfico de projeção de saldos para os próximos 90 dias
        And incluir um aviso de que são estimativas baseadas nos dados atuais e previsões de recebíveis






Feature: Login
    Scenario: Login bem-sucedido
        Given que estou na página de login ('https://amei-homolog.amorsaude.com.br/auth/login')
        When insiro credenciais válidas (email e senha)
        Then devo ser redirecionado para página home do AMEI