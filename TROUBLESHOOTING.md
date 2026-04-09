# 🆘 Guia de Troubleshooting

## Erro: 'pnpm' não é reconhecido como um comando

Se você receber este erro ao executar `npm run dev`:

```
'pnpm' não é reconhecido como um comando interno
ou externo, um programa operável ou um arquivo em lotes.
```

### ✅ Solução: Instalar pnpm globalmente

O projeto usa `pnpm` como package manager. Você precisa instalá-lo:

```cmd
npm install -g pnpm
```

Depois verifique se foi instalado:

```cmd
pnpm --version
```

Agora tente novamente:

```cmd
npm run dev
```

---

## Erro: Vercel ainda está usando commit antigo

Se o Vercel continuar falhando com erro de "No Output Directory named 'public'", significa que ele está usando um commit antigo.

### ✅ Solução 1: Limpar cache do Vercel (Recomendado)

1. Acesse https://vercel.com/dashboard
2. Selecione seu projeto `liturgia-diaria-ia`
3. Vá em **Deployments**
4. Clique no último deployment
5. Clique em **Redeploy** (botão com ícone de reload)
6. **Desative** "Use existing Build Cache"
7. Clique em **Redeploy**

### ✅ Solução 2: Reconectar repositório

1. Vá em **Settings** → **Git**
2. Clique em **Disconnect** ao lado de "Connected Git Repository"
3. Clique em **Connect Git Repository** novamente
4. Selecione o repositório `liturgia-diaria-ia`
5. Faça um novo **Redeploy**

---

## Erro: npm warn Unknown project config "node-linker"

Este é apenas um aviso, não é um erro. Você pode ignorar. Se quiser remover, execute:

```cmd
npm install -g npm@latest
```

---

## Verificar se tudo está funcionando

Após instalar `pnpm` e executar `npm run dev`, você deve ver:

```
[1] Waiting on http://localhost:8081
```

Abra seu navegador em **http://localhost:8081/** e você deve ver o app com:
- ✅ Tela Home com liturgia do dia
- ✅ Abas: Home, Favoritos, Configurações
- ✅ Botões de Favorito e Compartilhamento

---

## Ainda não funciona?

Se nenhuma solução acima funcionou:

1. **Verifique as versões instaladas**:
   ```cmd
   node --version
   npm --version
   pnpm --version
   git --version
   ```

2. **Limpe o cache**:
   ```cmd
   npm cache clean --force
   pnpm store prune
   ```

3. **Reinstale as dependências**:
   ```cmd
   cd C:\liturgia-diaria-ia
   rm -r node_modules
   npm install
   ```

4. **Tente novamente**:
   ```cmd
   npm run dev
   ```

---

## 📞 Precisa de ajuda?

Se o problema persistir, me avise com:
- A mensagem de erro completa
- Resultado de `node --version`, `npm --version`, `pnpm --version`
- O que você estava tentando fazer quando o erro ocorreu
