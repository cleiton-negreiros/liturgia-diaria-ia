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


---

## Erro: Port NaN is being used by another process

Se você receber este erro ao executar `npm run dev`:

```
Port NaN is being used by another process
Input is required, but 'npx expo' is in non-interactive mode.
Required input:
> Use port 11000 instead?
Skipping dev server
```

Isso significa que a porta `8081` (padrão) já está sendo usada por outro processo.

### ✅ Solução 1: Usar uma porta diferente (Recomendado)

A forma mais simples é usar uma porta diferente:

```cmd
set EXPO_PORT=3000
npm run dev
```

Depois acesse: **http://localhost:3000/**

Ou você pode usar qualquer outra porta (5000, 8000, 9000, etc.):

```cmd
set EXPO_PORT=5000
npm run dev
```

### ✅ Solução 2: Liberar a porta 8081

Se você quer usar a porta 8081 especificamente:

1. **Descubra qual processo está usando a porta**:
   ```cmd
   netstat -ano | findstr :8081
   ```

   Você verá algo como:
   ```
   TCP    0.0.0.0:8081    0.0.0.0:0    LISTENING    1234
   ```

   O número `1234` é o PID (Process ID).

2. **Mate o processo**:
   ```cmd
   taskkill /PID 1234 /F
   ```

3. **Tente novamente**:
   ```cmd
   npm run dev
   ```

### ✅ Solução 3: Reiniciar o computador

Às vezes é mais simples:

```cmd
shutdown /r /t 0
```

Depois de reiniciar, tente:

```cmd
npm run dev
```

---

## Aviso: Unknown project config "node-linker"

Este é apenas um aviso e pode ser ignorado. Não afeta o funcionamento do app.

Se quiser remover o aviso, atualize o npm:

```cmd
npm install -g npm@latest
```
