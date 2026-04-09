@echo off
echo ========================================
echo  Liturgia Diária com IA - Deploy Vercel
echo ========================================
echo.

REM Verificar se Vercel CLI está instalado
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Vercel CLI não encontrado. Instalando...
    npm install -g vercel
)

echo.
echo Fazendo build do projeto...
npm run build:web

if %ERRORLEVEL% NEQ 0 (
    echo Erro ao fazer build!
    pause
    exit /b 1
)

echo.
echo Build concluído! Iniciando deploy...
echo.

REM Deploy para produção
vercel --prod

echo.
echo Deploy concluído!
echo.

pause
