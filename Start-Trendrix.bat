@echo off
setlocal

REM Start Trendrix frontend + open browser
cd /d "%~dp0"

REM Start server in a new window
start "Trendrix Server" cmd /c "npm run dev"

REM Give server a moment to start
timeout /t 2 /nobreak >nul

REM Open site
start "" "http://localhost:3000"

endlocal
