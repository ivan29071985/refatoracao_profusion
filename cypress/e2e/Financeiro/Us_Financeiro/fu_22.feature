Feature: Visão "Extrato" na aba "Resumo" do menu "Financeiro"

    Eu, usuário do financeiro da franquia, gostaria de visualizar o extrato das contas em um range de datas específicas, 
    para que possa comparar os lançamentos com os extratos dos bancos.


# Cenários de Teste Expandidos - Extrato Financeiro (Formato Gherkin)

## Critério 1: Renomeação da aba "Resumo" para "Extrato"

Scenario: Verificação da renomeação da aba (Positivo)
    Given o usuário acessa o menu "Financeiro"
    When visualiza as abas disponíveis
    Then deve ver uma aba chamada "Extrato" no lugar de "Resumo"

Scenario: Consistência da renomeação em diferentes telas (Negativo)
    Given o usuário navega por diferentes telas do sistema
    When acessa áreas que antes referenciavam "Resumo"
    Then não deve encontrar nenhuma menção à "Resumo", apenas "Extrato"

Scenario: Atualização de atalhos e favoritos (Alternativo)
    Given o usuário tinha a aba "Resumo" em seus favoritos
    When acessa a lista de favoritos após a atualização
    Then deve ver "Extrato" no lugar de "Resumo" sem perder o atalho

## Critério 2: Visualização de lançamentos por range de datas e banco

Scenario: Filtragem correta por data e banco (Positivo)
    Given o usuário está na aba "Extrato"
    When seleciona um range de datas e um banco específico
    Then deve visualizar apenas os lançamentos correspondentes a esse período e banco

Scenario: Tentativa de visualização sem selecionar banco (Negativo)
    Given o usuário está na aba "Extrato"
    When seleciona um range de datas mas não escolhe um banco
    Then o sistema deve solicitar a seleção de um banco antes de exibir os lançamentos

Scenario: Alternância rápida entre bancos (Alternativo)
    Given o usuário está visualizando o extrato de um banco específico
    When muda a seleção para outro banco
    Then o sistema deve atualizar instantaneamente os lançamentos sem necessidade de recarregar a página

## Critério 3: Escolha do tipo de data para visualização

Scenario: Seleção de "Data de Pagamento" (Positivo)
    Given o usuário está na aba "Extrato"
    When seleciona "Data de Pagamento" como tipo de data
    Then os lançamentos exibidos devem refletir as datas em que as compras foram realizadas

Scenario: Seleção de "Data de Baixa" (Positivo)
    Given o usuário está na aba "Extrato"
    When seleciona "Data de Baixa" como tipo de data
    Then os lançamentos exibidos devem refletir as datas em que as transações ocorreram de fato no caixa/banco

Scenario: Seleção de "Data de Vencimento" (Positivo)
    Given o usuário está na aba "Extrato"
    When seleciona "Data de Vencimento" como tipo de data
    Then os lançamentos exibidos devem refletir as datas máximas para pagamento/recebimento

Scenario: Mudança de tipo de data com lançamentos ausentes (Negativo)
    Given o usuário está visualizando lançamentos por "Data de Pagamento"
    When muda para "Data de Baixa" e não há registros de baixa para alguns lançamentos
    Then o sistema deve alertar sobre lançamentos que não aparecem devido à mudança de tipo de data

Scenario: Comparação entre tipos de data (Alternativo)
    Given o usuário está na aba "Extrato"
    When solicita uma visão comparativa dos três tipos de data
    Then o sistema deve exibir uma visualização lado a lado dos lançamentos para cada tipo de data

## Critério 4: Exibição de somatórias e balanço

Scenario: Cálculo correto de somatórias e balanço (Positivo)
    Given o usuário selecionou um período e tipo de data
    When visualiza o extrato
    Then deve ver uma linha com a somatória de entradas, outra com saídas, e o balanço (diferença entre as duas)

Scenario: Atualização dinâmica das somatórias (Negativo)
    Given o usuário está visualizando as somatórias e o balanço
    When um novo lançamento é adicionado em tempo real
    Then as somatórias e o balanço devem ser atualizados automaticamente

Scenario: Detalhamento das somatórias por categoria (Alternativo)
    Given o usuário está visualizando as somatórias
    When clica em uma opção de "Detalhar somatórias"
    Then o sistema deve exibir um breakdown das somatórias por categorias de lançamentos

## Critério 5: Seleção de datas passadas e futuras

Scenario: Visualização de lançamentos passados (Positivo)
    Given o usuário seleciona um range de datas passadas
    When visualiza o extrato
    Then deve ver todos os lançamentos realizados entre as datas selecionadas

Scenario: Visualização de lançamentos futuros (Positivo)
    Given o usuário seleciona um range de datas futuras
    When visualiza o extrato
    Then deve ver os lançamentos previstos, incluindo recebíveis de cartão de crédito/débito

Scenario: Distinção visual entre lançamentos realizados e previstos (Alternativo)
    Given o usuário selecionou um range que inclui datas passadas e futuras
    When visualiza o extrato
    Then o sistema deve exibir uma clara distinção visual entre lançamentos realizados e previstos

## Critério 6: Limitação do range de datas para 90 dias

Scenario: Seleção de range dentro do limite (Positivo)
    Given o usuário está selecionando datas na aba "Extrato"
    When escolhe um range de exatamente 90 dias
    Then o sistema deve permitir a seleção e exibir os lançamentos

Scenario: Tentativa de selecionar range maior que 90 dias (Negativo)
    Given o usuário está selecionando datas na aba "Extrato"
    When tenta escolher um range maior que 90 dias
    Then o sistema deve impedir a seleção e exibir uma mensagem sobre o limite de 90 dias

Scenario: Sugestão automática de ajuste de datas (Alternativo)
    Given o usuário tenta selecionar um range maior que 90 dias
    When o sistema impede a seleção
    Then deve sugerir automaticamente um ajuste para o range máximo permitido de 90 dias

## Critério 7: Download de planilha CSV

Scenario: Download bem-sucedido da planilha (Positivo)
    Given o usuário está visualizando o extrato com lançamentos
    When clica na opção de download em CSV
    Then uma planilha em formato CSV deve ser baixada com todos os lançamentos exibidos na tela

Scenario: Tentativa de download sem lançamentos (Negativo)
    Given o usuário está na aba "Extrato" sem nenhum lançamento exibido
    When tenta fazer o download da planilha CSV
    Then o sistema deve alertar que não há dados para exportar

Scenario: Personalização de colunas para download (Alternativo)
    Given o usuário está prestes a fazer o download da planilha
    When é apresentada uma opção para selecionar colunas específicas
    Then o usuário deve poder escolher quais informações incluir no CSV antes do download

## Critério 8: Limites de datas mínima e máxima

Scenario: Seleção dentro dos limites permitidos (Positivo)
    Given o usuário está selecionando datas na aba "Extrato"
    When escolhe datas dentro do range permitido (presente -180 dias até presente +90 dias)
    Then o sistema deve permitir a seleção e exibir os lançamentos

Scenario: Tentativa de selecionar data anterior ao limite mínimo (Negativo)
    Given o usuário tenta selecionar uma data anterior a 180 dias da data atual
    When confirma a seleção
    Then o sistema deve exibir uma mensagem informando que o extrato deve ser solicitado via chat

Scenario: Solicitação de extrato estendido via chat (Alternativo)
    Given o usuário precisa de um extrato anterior ao limite de 180 dias
    When seleciona uma opção de "Solicitar extrato estendido"
    Then o sistema deve abrir automaticamente um chat com o suporte para esta solicitação

## Critério 9: Funcionalidade de transferência entre contas

Scenario: Acesso à funcionalidade independente do status do cadeado (Positivo)
    Given o usuário está na aba "Extrato"
    When procura pela funcionalidade de "Transferência entre Contas"
    Then deve encontrá-la disponível, independentemente do status do cadeado (aberto ou fechado)

Scenario: Realização de transferência com cadeado fechado (Negativo)
    Given o cadeado está fechado na interface
    When o usuário tenta realizar uma transferência entre contas
    Then o sistema deve permitir a operação normalmente, sem bloqueios relacionados ao status do cadeado

Scenario: Notificação sobre o status do cadeado durante transferência (Alternativo)
    Given o usuário inicia uma transferência entre contas
    When o sistema detecta que o cadeado está fechado
    Then deve exibir uma notificação informativa sobre o status do cadeado, sem impedir a transação

## Critério 10: Limites de data para transferência entre contas

Scenario: Transferência dentro do limite de 90 dias (Positivo)
    Given o usuário está na funcionalidade de "Transferência entre Contas"
    When seleciona uma data dentro do range de 90 dias a partir da data atual
    Then o sistema deve permitir a transferência

Scenario: Tentativa de transferência fora do limite de 90 dias (Negativo)
    Given o usuário está na funcionalidade de "Transferência entre Contas"
    When tenta selecionar uma data fora do range de 90 dias (passado ou futuro)
    Then o sistema deve impedir a seleção e exibir uma mensagem sobre o limite de 90 dias

Scenario: Agendamento recorrente de transferências (Alternativo)
    Given o usuário deseja configurar transferências recorrentes
    When configura uma transferência para repetir mensalmente dentro do limite de 90 dias
    Then o sistema deve permitir o agendamento e criar entradas futuras até o limite de 90 dias

## Critério 11: Inclusão de todos os tipos de movimentos financeiros

Scenario: Visualização abrangente de movimentos financeiros (Positivo)
    Given o usuário está na aba "Extrato"
    When visualiza os lançamentos
    Then deve ver movimentos gerados por todas as fontes (Check-in, Propostas, Contas a Pagar, Contas a Receber, Transferência entre Contas, Cartões, Repasse e Splits)

Scenario: Filtragem por tipo de movimento (Negativo)
    Given o usuário está visualizando todos os movimentos no extrato
    When tenta filtrar por um tipo de movimento que não existe no período selecionado
    Then o sistema deve exibir uma mensagem informando que não há lançamentos desse tipo no período

Scenario: Rastreamento de origem do movimento (Alternativo)
    Given o usuário está visualizando um lançamento específico no extrato
    When clica em uma opção de "Ver detalhes" ou "Rastrear origem"
    Then o sistema deve exibir informações detalhadas sobre a origem do movimento (ex: qual tela gerou, usuário responsável, etc.)