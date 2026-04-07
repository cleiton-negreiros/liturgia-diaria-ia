# 📖 Liturgia Diária com IA

Um aplicativo móvel que exibe a **liturgia católica diária** com **análises teológicas geradas por inteligência artificial**, baseadas na tradição e magistério da Igreja.

## ✨ Características

- 📅 **Liturgia Diária**: Acesso às leituras do dia com navegação entre datas
- 🤖 **Análise Teológica com IA**: Comentários e análises estruturadas gerados por inteligência artificial
- ❤️ **Favoritos**: Salve liturgias para consulta posterior
- 🎨 **Tema Personalizável**: Modo claro/escuro e tamanho de fonte ajustável
- 🌍 **Múltiplos Idiomas**: Suporte para Português (Brasil), Português (Portugal) e Latim
- 🔔 **Notificações**: Receba lembretes diários da liturgia
- 📱 **Responsivo**: Funciona em iOS, Android e Web

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou pnpm
- Git

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/cleiton-negreiros/iturgia-diaria-ia.git
cd iturgia-diaria-ia

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:8081`

## 📱 Testar no Dispositivo

### iOS (com Expo Go)

```bash
npm run ios
# Ou escaneie o QR code com a câmera do iPhone
```

### Android (com Expo Go)

```bash
npm run android
# Ou escaneie o QR code com Expo Go
```

### Web

```bash
npm run dev
# Acesse http://localhost:8081
```

## 🏗️ Estrutura do Projeto

```
app/
├── (tabs)/
│   ├── index.tsx          # Tela Home - Liturgia do Dia
│   ├── favorites.tsx      # Tela de Favoritos
│   ├── settings.tsx       # Tela de Configurações
│   └── _layout.tsx        # Navegação por abas
├── analysis.tsx           # Tela de Análise Teológica
└── _layout.tsx            # Layout raiz com providers

components/
├── screen-container.tsx   # Wrapper de SafeArea
├── reading-card.tsx       # Card de leitura litúrgica
├── liturgical-day-header.tsx # Cabeçalho do dia
└── ui/
    └── icon-symbol.tsx    # Mapeamento de ícones

hooks/
├── use-liturgy.ts         # Gerenciamento de dados de liturgia
├── use-favorites.ts       # Gerenciamento de favoritos
├── use-settings.ts        # Gerenciamento de configurações
└── use-colors.ts          # Tema e cores

lib/
├── types.ts               # Tipos TypeScript
├── mock-data.ts           # Dados de exemplo
└── utils.ts               # Funções utilitárias
```

## 🎨 Design e Identidade Visual

### Paleta de Cores Litúrgica

- **Ouro**: `#D4AF37` - Divindade e santidade
- **Roxo**: `#5B4B8A` - Penitência e Quaresma
- **Verde Esperança**: `#2D7A3E` - Tempo Ordinário
- **Branco**: `#FFFFFF` - Ressurreição e alegria
- **Vermelho**: `#C41E3A` - Martírio

### Logo

O logo apresenta uma cruz dourada ornamentada com um livro aberto, simbolizando a Palavra de Deus e a liturgia diária.

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# OpenAI (para análise teológica)
OPENAI_API_KEY=sk-...

# Lectionary API (para leituras)
LECTIONARY_API_KEY=...
```

## 📚 Funcionalidades Principais

### 1. Tela Home - Liturgia do Dia

- Exibe a data, dia da semana e tempo litúrgico
- Mostra todas as partes da liturgia:
  - Antífona de Entrada
  - 1ª Leitura
  - Salmo Responsorial
  - 2ª Leitura
  - Evangelho
  - Antífona de Comunhão
- Navegação entre dias (anterior, próximo, hoje)
- Botão de favorito para salvar
- Botão de compartilhamento

### 2. Análise Teológica

- Comentário geral sobre as leituras
- Análise de cada leitura
- Conexões litúrgicas e teológicas
- Baseado em tradição e magistério da Igreja

### 3. Favoritos

- Salve liturgias para consulta posterior
- Busca por data
- Filtro por tempo litúrgico
- Acesso rápido às liturgias salvas

### 4. Configurações

- **Tema**: Automático, Claro ou Escuro
- **Tamanho de Fonte**: Pequeno, Normal ou Grande
- **Idioma**: Português (Brasil), Português (Portugal) ou Latim
- **Notificações**: Ativar/desativar e configurar hora
- **Sobre**: Informações do app

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com cobertura
npm test -- --coverage
```

## 🚢 Deployment

### Vercel (Web)

```bash
# Build para produção
npm run build

# Deploy automático via GitHub
# Conecte o repositório em https://vercel.com
```

### Mobile (APK/IPA)

1. No Management UI, clique em "Publish"
2. Siga as instruções para gerar o build
3. Baixe o APK (Android) ou IPA (iOS)

Veja [DEPLOYMENT.md](./DEPLOYMENT.md) para instruções detalhadas.

## 🔗 APIs Utilizadas

### Lectionary API

Fornece as leituras litúrgicas diárias:
- Documentação: https://lectio-api.org
- Suporte para múltiplos idiomas
- Dados baseados no calendário litúrgico católico

### OpenAI API

Gera análises teológicas:
- Documentação: https://platform.openai.com/docs
- Modelo: GPT-4 (recomendado)
- Prompts estruturados para análise teológica

## 📖 Referências Teológicas

O app utiliza como base:

- **Magistério da Igreja**: Documentos do Vaticano II, Encíclicas papais
- **Tradição Católica**: Escritos dos Padres da Igreja, Doutores da Igreja
- **Liturgia das Horas**: Estrutura oficial da Igreja Católica
- **Comentários Bíblicos**: Análises de estudiosos católicos

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 📧 Contato

- **Autor**: Cleiton Negreiros
- **GitHub**: https://github.com/cleiton-negreiros
- **Email**: cleiton-negreiros@github.com

## 🙏 Agradecimentos

- Comunidade Expo e React Native
- Lectionary API pelos dados litúrgicos
- OpenAI pela tecnologia de IA
- Igreja Católica pela riqueza da liturgia

---

**Desenvolvido com ❤️ para a comunidade católica**

*"Senhor, ouvi falar de vossas obras e fiquei cheio de temor." (Habacuc 3, 2)*
