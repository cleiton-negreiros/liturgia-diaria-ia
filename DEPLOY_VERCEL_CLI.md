# Deploy via Vercel CLI

Se o deploy via GitHub não funcionar, você pode fazer deploy direto via Vercel CLI.

## Pré-requisitos

1. **Instalar Vercel CLI** (se não tiver):
   ```cmd
   npm install -g vercel
   ```

2. **Fazer login** (primeira vez):
   ```cmd
   vercel login
   ```

## Deploy Direto

1. **Na sua máquina, abra CMD na pasta do projeto**:
   ```cmd
   cd C:\liturgia-diaria-ia
   ```

2. **Fazer build**:
   ```cmd
   npm run build:web
   ```

3. **Fazer deploy da pasta `web-build`**:
   ```cmd
   vercel --prod
   ```

4. **Seguir as instruções**:
   - Confirmar o projeto
   - Confirmar a pasta de deploy (`web-build`)
   - Aguardar o deploy

## Resultado

Após o deploy, você receberá um URL como:
```
https://liturgia-diaria-ia.vercel.app
```

Acesse esse URL para ver seu app em produção! 🚀

## Troubleshooting

Se receber erro de "project not found", execute:
```cmd
vercel link
```

Isso vai vincular o projeto local ao projeto Vercel.
