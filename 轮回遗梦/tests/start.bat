@echo off
setlocal
cd /d "%~dp0"
set "LHYM_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if exist "%LHYM_NODE%" goto run
set "LHYM_NODE="
for /f "delims=" %%N in ('where node.exe 2^>nul') do if not defined LHYM_NODE set "LHYM_NODE=%%N"
if defined LHYM_NODE goto run
echo Node.js was not found.
pause
exit /b 1
:run
"%LHYM_NODE%" "%~dp0runtime.cjs" "%~dp0smoke.json"
set "LHYM_EXIT=%ERRORLEVEL%"
echo.
echo Simulation exited with code %LHYM_EXIT%.
echo Reports: "%~dp0smoke-reports"
pause
exit /b %LHYM_EXIT%
