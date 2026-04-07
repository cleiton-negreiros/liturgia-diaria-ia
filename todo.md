# Liturgia Diária com IA - TODO

## Fase 1: Estrutura Base e Navegação

- [x] Configurar tab bar com 3 abas (Home, Favoritos, Configurações)
- [x] Criar ScreenContainer para todas as telas
- [x] Implementar navegação entre abas
- [x] Configurar tema com paleta de cores litúrgica

## Fase 2: Tela Home - Liturgia do Dia

- [x] Criar tela Home com exibição de data e dia da semana
- [x] Implementar exibição do tempo litúrgico
- [x] Criar cards/seções para cada parte da liturgia (Entrada, Leitura 1, Salmo, Leitura 2, Evangelho, Comunhão)
- [x] Implementar scroll vertical entre seções
- [x] Adicionar botão de navegação para dia anterior/próximo
- [x] Adicionar botão de favorito (coração)
- [x] Adicionar botão de compartilhamento
- [ ] Integrar com API de liturgia católica (CNBB ou similar)
- [x] Implementar cache local de liturgias

## Fase 3: Tela de Análise Teológica

- [x] Criar tela de análise teológica
- [x] Implementar indicador de carregamento
- [ ] Integrar com OpenAI para gerar análise
- [ ] Estruturar prompt para análise baseada em tradição e magistério
- [x] Exibir comentário geral, análise por leitura, conexões litúrgicas
- [ ] Adicionar botão de copiar análise
- [ ] Adicionar botão de compartilhamento
- [ ] Implementar cache de análises geradas
- [ ] Tratamento de erros na requisição à IA

## Fase 4: Tela de Favoritos

- [x] Criar tela de favoritos
- [x] Implementar persistência de favoritos com AsyncStorage
- [x] Exibir lista de datas com liturgias favoritas
- [ ] Adicionar busca por data
- [ ] Adicionar filtro por tempo litúrgico
- [ ] Implementar swipe para remover dos favoritos
- [x] Ordenação por data (mais recente primeiro)
- [x] Tap para abrir liturgia do dia

## Fase 5: Tela de Configurações

- [x] Criar tela de configurações
- [x] Implementar toggle de tema (Light/Dark)
- [x] Adicionar seletor de tamanho de fonte
- [x] Adicionar seletor de idioma
- [x] Implementar notificações diárias
- [x] Adicionar seletor de hora para notificação
- [x] Adicionar seção "Sobre"
- [ ] Adicionar links de privacidade e termos
- [x] Persistir configurações com AsyncStorage

## Fase 6: Integração com APIs e Backend

- [ ] Configurar variáveis de ambiente para OpenAI API
- [ ] Criar função para requisitar análise teológica
- [ ] Implementar tratamento de erros e retry
- [ ] Otimizar requisições para reduzir custos
- [ ] Testar integração com API de liturgia
- [ ] Testar integração com OpenAI

## Fase 7: Polimento e Testes

- [x] Revisar UI/UX em ambos os modos (light/dark)
- [ ] Testar responsividade em diferentes tamanhos de tela
- [x] Testar acessibilidade (VoiceOver, tamanho de texto)
- [ ] Testar performance (scroll, carregamento)
- [ ] Testar fluxos de usuário completos
- [ ] Corrigir bugs encontrados
- [x] Otimizar imagens e assets
- [ ] Revisar copy e mensagens de erro

## Fase 8: Branding e Finalização

- [x] Gerar logo customizado do app
- [x] Atualizar app.config.ts com branding
- [x] Configurar ícones para iOS e Android
- [x] Configurar splash screen
- [x] Revisar app name e descrição
- [ ] Criar checkpoint final
- [ ] Entregar ao usuário
