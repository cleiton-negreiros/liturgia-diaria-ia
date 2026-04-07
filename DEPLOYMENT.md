# Guia de Deployment - Liturgia Diária com IA

## 📋 Pré-requisitos

- Conta GitHub (https://github.com/cleiton-negreiros/)
- Conta Vercel (https://vercel.com)
- Node.js 18+ instalado localmente
- Git instalado

## 🚀 Passo 1: Preparar o Projeto Localmente

### 1.1 Clonar ou Baixar o Projeto

Você pode fazer isso de duas formas:

**Opção A: Usando o Management UI**
1. Abra o projeto no Management UI
2. Clique no menu "⋯" (três pontos)
3. Selecione "Download as ZIP"
4. Extraia em seu computador

**Opção B: Clonar do GitHub (após o primeiro push)**
```bash
git clone https://github.com/cleiton-negreiros/iturgia-diaria-ia.git
cd iturgia-diaria-ia
```

### 1.2 Instalar Dependências

```bash
npm install
# ou
pnpm install
```

### 1.3 Testar Localmente

```bash
npm run dev
# Acesse http://localhost:8081
```

## 📤 Passo 2: Publicar no GitHub

### 2.1 Inicializar Repositório Git (se necessário)

```bash
cd iturgia-diaria-ia
git init
git config user.name "Seu Nome"
git config user.email "seu-email@github.com"
```

### 2.2 Adicionar Arquivos e Fazer Commit

```bash
git add .
git commit -m "Initial commit: Liturgia Diária com IA - App mobile com análise teológica via IA"
```

### 2.3 Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Nome do repositório: `iturgia-diaria-ia`
3. Descrição: "Aplicativo móvel de liturgia diária católica com análise teológica gerada por IA"
4. Selecione "Public" (ou "Private" se preferir)
5. Clique em "Create repository"

### 2.4 Fazer Push para GitHub

```bash
git branch -M main
git remote add origin https://github.com/cleiton-negreiros/iturgia-diaria-ia.git
git push -u origin main
```

## 🌐 Passo 3: Deploy na Vercel

### 3.1 Conectar Repositório

1. Acesse https://vercel.com/dashboard
2. Clique em "Add New" → "Project"
3. Clique em "Import Git Repository"
4. Busque e selecione `iturgia-diaria-ia`
5. Clique em "Import"

### 3.2 Configurar Projeto

Na página de configuração:

- **Project Name**: `iturgia-diaria-ia`
- **Framework Preset**: Selecione "Other" (Expo)
- **Root Directory**: `.` (deixe em branco ou use ponto)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 3.3 Adicionar Variáveis de Ambiente (Opcional)

Se você tiver chaves de API:

1. Clique em "Environment Variables"
2. Adicione as variáveis necessárias:
   - `OPENAI_API_KEY`: Sua chave de API do OpenAI (para análise teológica)
   - `LECTIONARY_API_KEY`: Se usar uma API de liturgia com autenticação

### 3.4 Deploy

1. Clique em "Deploy"
2. Aguarde o build completar (geralmente 2-5 minutos)
3. Seu app estará disponível em: `https://iturgia-diaria-ia.vercel.app`

## 🔄 Atualizações Futuras

Após fazer mudanças no código:

```bash
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

Vercel detectará automaticamente o push e fará o deploy da nova versão.

## 📱 Build para Mobile

Para gerar APK/IPA:

1. No Management UI, clique no botão "Publish"
2. Siga as instruções para gerar o build
3. Baixe o APK (Android) ou IPA (iOS)

## 🛠️ Troubleshooting

### Build falha na Vercel

- Verifique se todas as dependências estão em `package.json`
- Confirme que `npm run build` funciona localmente
- Verifique os logs de build na Vercel

### Variáveis de ambiente não funcionam

- Certifique-se de que estão definidas em "Settings" → "Environment Variables"
- Redeploy o projeto após adicionar variáveis
- Verifique se o código está acessando corretamente (ex: `process.env.OPENAI_API_KEY`)

### Problemas com dependências

```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install

# Ou com pnpm
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📚 Recursos Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Expo](https://docs.expo.dev)
- [GitHub Docs](https://docs.github.com)
- [Lectionary API](https://lectio-api.org)
- [OpenAI API](https://platform.openai.com/docs)

## 🎯 Próximas Etapas

1. **Integrar Lectionary API**: Substituir dados de exemplo por leituras reais
2. **Integrar OpenAI**: Gerar análises teológicas automáticas
3. **Notificações**: Implementar push notifications diárias
4. **Testes**: Adicionar testes E2E com Detox ou Appium
5. **CI/CD**: Configurar GitHub Actions para testes automáticos

---

**Última atualização**: 2026-04-07
**Versão do App**: 1.0.0
