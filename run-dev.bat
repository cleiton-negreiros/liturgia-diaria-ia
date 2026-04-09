@echo off
REM Script para executar npm run dev com porta correta no Windows

echo.
echo ========================================
echo  Liturgia Diária com IA - Dev Server
echo ========================================
echo.

REM Definir portas
set EXPO_PORT=8081
set NODE_PORT=3000

echo.
echo Iniciando servidor de desenvolvimento...
echo Servidor Node.js: http://localhost:%NODE_PORT%/
echo Expo Metro (App): http://localhost:%EXPO_PORT%/
echo.
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

REM Executar npm run dev
npm run dev

pause
