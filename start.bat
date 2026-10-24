@echo off
REM Double-click to run (Windows). Installs dependencies on first run, then starts the site.
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Please install Node 18 or newer from https://nodejs.org and run this again.
  pause
  exit /b 1
)
if not exist node_modules call npm install --no-audit --no-fund
call npm start
