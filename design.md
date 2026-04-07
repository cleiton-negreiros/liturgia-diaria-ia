# Design da Interface - Liturgia Diária com IA

## Visão Geral

Aplicativo móvel que exibe a liturgia diária católica com análise teológica gerada por IA. O design segue as diretrizes de interface humana da Apple (HIG), otimizado para uso com uma mão em orientação retrato (9:16).

## Paleta de Cores

A identidade visual reflete a tradição católica com tons litúrgicos:

- **Primário**: Ouro litúrgico (#D4AF37) - Representa a sacralidade e tradição
- **Secundário**: Roxo eclesiástico (#5B4B8A) - Cor de penitência e reflexão
- **Fundo**: Branco puro (#FFFFFF) em light mode, Cinza escuro (#1A1A1A) em dark mode
- **Texto**: Preto (#000000) em light mode, Branco (#FFFFFF) em dark mode
- **Destaque**: Verde esperança (#2D7A3E) para ações positivas
- **Aviso**: Vermelho litúrgico (#C41E3A) para informações importantes

## Telas Principais

### 1. Tela Home (Liturgia do Dia)

**Propósito**: Exibir a liturgia diária de forma clara e acessível.

**Conteúdo Principal**:
- Data e dia da semana em destaque no topo
- Tempo litúrgico (ex: "Quaresma", "Páscoa", "Tempo Comum")
- Seções da liturgia em abas/cards:
  - **Entrada**: Antífona de entrada e salmo
  - **Leitura 1**: Primeira leitura do Antigo Testamento
  - **Salmo Responsorial**: Salmo com refrain
  - **Leitura 2**: Segunda leitura (Epístola)
  - **Evangelho**: Leitura do Evangelho
  - **Comunhão**: Antífona de comunhão
- Botão flutuante para "Gerar Análise Teológica"

**Funcionalidade**:
- Scroll vertical para navegar entre as seções
- Botão para navegar para o dia anterior/próximo
- Botão para marcar como favorito
- Compartilhar a liturgia do dia

### 2. Tela de Análise Teológica

**Propósito**: Exibir análise e comentário gerado por IA sobre as passagens do dia.

**Conteúdo Principal**:
- Indicador de carregamento enquanto a IA processa
- **Comentário Geral**: Visão geral do tema do dia
- **Análise por Leitura**: 
  - Contexto histórico e bíblico
  - Significado teológico
  - Conexão com a tradição católica e magistério
  - Aplicação prática para a vida cristã
- **Conexões Litúrgicas**: Como as leituras se conectam entre si
- **Reflexão para Oração**: Sugestão de pontos para meditação

**Funcionalidade**:
- Scroll vertical para ler toda a análise
- Botão para copiar análise
- Botão para compartilhar
- Indicador de fonte (IA - OpenAI)

### 3. Tela de Favoritos

**Propósito**: Acessar liturgias e análises salvas anteriormente.

**Conteúdo Principal**:
- Lista de datas com liturgias marcadas como favorito
- Cada item mostra: Data, dia da semana, tempo litúrgico
- Busca por data ou tema
- Filtro por tempo litúrgico

**Funcionalidade**:
- Tap para abrir a liturgia do dia
- Swipe para remover dos favoritos
- Ordenação por data (mais recente primeiro)

### 4. Tela de Configurações

**Propósito**: Personalizar a experiência do usuário.

**Conteúdo Principal**:
- **Tema**: Light/Dark mode
- **Tamanho de Fonte**: Pequeno, Normal, Grande
- **Idioma**: Português (Brasil), Português (Portugal), Latim
- **Notificações**: Ativar/desativar lembrete diário
- **Hora da Notificação**: Selecionar hora do dia
- **Sobre**: Versão do app, créditos
- **Privacidade**: Política de privacidade

**Funcionalidade**:
- Toggles para ativar/desativar opções
- Picker para selecionar hora
- Links para políticas externas

## Fluxos de Usuário Principais

### Fluxo 1: Visualizar Liturgia do Dia
1. Usuário abre o app → Tela Home carrega automaticamente com a liturgia do dia
2. Usuário scroll para ver todas as seções
3. Usuário toca em "Gerar Análise" → Transição para Tela de Análise
4. IA processa e exibe análise (2-5 segundos)
5. Usuário pode compartilhar ou voltar

### Fluxo 2: Navegar para Outro Dia
1. Usuário está na Tela Home
2. Toca em seta "próximo" ou "anterior"
3. Liturgia do dia anterior/próximo carrega
4. Pode gerar análise para esse dia também

### Fluxo 3: Salvar Favorito
1. Usuário está visualizando uma liturgia
2. Toca no ícone de coração (favorito)
3. Confirmação visual (coração preenchido)
4. Pode acessar depois na Tela de Favoritos

### Fluxo 4: Acessar Análise Anterior
1. Usuário vai para Tela de Favoritos
2. Seleciona uma data anterior
3. Abre a liturgia com análise salva (carrega do cache)

## Componentes de Navegação

### Tab Bar (Inferior)
- **Home**: Ícone de cruz/livro - Liturgia do dia
- **Favoritos**: Ícone de coração - Liturgias salvas
- **Configurações**: Ícone de engrenagem - Preferências

## Considerações de Acessibilidade

- Texto com tamanho mínimo de 16pt para leitura confortável
- Alto contraste entre texto e fundo
- Suporte a leitura de tela (VoiceOver no iOS)
- Botões com tamanho mínimo de 44x44pt
- Descrições de ícones claras

## Animações e Transições

- Transição suave entre telas (fade in/out)
- Indicador de carregamento durante processamento de IA
- Feedback tátil ao tocar em botões
- Scroll suave entre seções

## Notas de Implementação

- Usar AsyncStorage para salvar favoritos localmente
- Cache de análises já geradas para reduzir requisições à IA
- Integração com API de liturgia católica (ex: Liturgia Diária da CNBB)
- Integração com OpenAI para análise teológica
- Suporte a dark mode automático baseado nas preferências do sistema
