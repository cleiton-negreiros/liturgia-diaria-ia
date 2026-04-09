@echo off
REM Script para executar npm run dev com porta correta no Windows

echo.
echo ========================================
echo  Liturgia Diária com IA - Dev Server
echo ========================================
echo.

REM Definir porta padrão se não estiver definida
if "%EXPO_PORT%"=="" (
    set EXPO_PORT=3000
    echo Usando porta padrão: 3000
) else (
    echo Usando porta: %EXPO_PORT%
)

echo.
echo Iniciando servidor de desenvolvimento...
echo Acesse: http://localhost:%EXPO_PORT%/
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

REM Executar npm run dev com a porta definida
npm run dev

pause
