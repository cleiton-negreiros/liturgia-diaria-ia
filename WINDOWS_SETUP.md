# 🪟 Guia de Configuração para Windows

## Problema: "Execução de scripts foi desabilitada"

Se você receber este erro ao tentar executar `npm install`:

```
npm : O arquivo C:\Program Files\nodejs\npm.ps1 não pode ser carregado porque a 
execução de scripts foi desabilitada neste sistema.
```

### ✅ Solução 1: Usar CMD (Recomendado)

A forma mais simples é usar o **Command Prompt (CMD)** em vez do PowerShell:

1. Pressione `Win + R`
2. Digite `cmd` e pressione Enter
3. Na janela CMD, execute:
   ```cmd
   cd C:\liturgia-diaria-ia
   npm install
   npm run dev
   ```

### ✅ Solução 2: Habilitar Scripts no PowerShell

Se preferir usar PowerShell:

1. **Abra PowerShell como Administrador**:
   - Clique com botão direito no PowerShell
   - Selecione "Executar como administrador"

2. **Execute este comando**:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Confirme digitando `Y` e pressionando Enter**

4. **Agora você pode usar npm normalmente**:
   ```powershell
   cd C:\liturgia-diaria-ia
   npm install
   npm run dev
   ```

## 🚀 Próximos Passos

Após executar `npm run dev`, você verá uma mensagem como:

```
[1] Waiting on http://localhost:8081
```

Abra seu navegador e acesse: **http://localhost:8081/**

Você deve ver o app com:
- ✅ Tela Home com a liturgia do dia
- ✅ Abas: Home, Favoritos, Configurações
- ✅ Botões de Favorito e Compartilhamento
- ✅ Navegação entre datas

## 📱 Testar em Dispositivo

Se você tiver o Expo Go instalado no seu celular:

1. Escaneie o QR code que aparece no terminal
2. O app abrirá no seu dispositivo

## 🛑 Parar o Servidor

Para parar o servidor de desenvolvimento, pressione `Ctrl + C` no terminal.

## 🔗 Recursos Úteis

- [Node.js Download](https://nodejs.org/)
- [Git Download](https://git-scm.com/)
- [Expo Documentation](https://docs.expo.dev/)

---

**Dúvidas?** Verifique se você tem:
- ✅ Node.js instalado: `node --version`
- ✅ npm instalado: `npm --version`
- ✅ Git instalado: `git --version`
