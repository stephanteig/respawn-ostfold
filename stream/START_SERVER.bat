@echo off
title Respawn Ostfold — Overlay Server
color 0A
echo.
echo  RESPAWN OSTFOLD — OVERLAY SERVER
echo  ===================================
echo.
echo  Starter server...
echo.

cd /d "%~dp0"

where node >nul 2>&1
if %errorlevel% neq 0 (
  echo  FEIL: Node.js er ikke installert!
  echo  Last ned fra https://nodejs.org
  echo.
  pause
  exit /b
)

node server.js

pause
