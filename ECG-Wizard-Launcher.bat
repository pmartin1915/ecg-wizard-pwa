@echo off
cls
echo ================================================================
echo                    ECG WIZARD - PROFESSIONAL PWA
echo            Educational ECG Classification System - REAL AI
echo ================================================================
echo.
echo Starting ECG Wizard...
echo.

:: Check if we're in the right directory
if not exist "package.json" (
    echo ERROR: Please run this from the ECG Wizard directory!
    echo Looking for: package.json
    pause
    exit /b 1
)

:: Check Node.js installation
echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found! Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✓ Node.js found
)

:: Check Python installation
echo [2/5] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found! Please install Python first.
    echo Download from: https://python.org/
    pause
    exit /b 1
) else (
    echo ✓ Python found
)

:: Install npm dependencies if needed
echo [3/5] Checking npm dependencies...
if not exist "node_modules" (
    echo Installing npm packages... (this may take a minute)
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install npm packages!
        pause
        exit /b 1
    )
) else (
    echo ✓ Dependencies ready
)

:: Start REAL AI backend server
echo [4/5] Starting REAL AI backend server...
cd backend
start "ECG-Real-AI-Backend" cmd /k "python real_ai_backend.py"
cd ..
timeout /t 3 /nobreak >nul

:: Start frontend PWA
echo [5/5] Starting ECG Wizard PWA...
echo.
echo ================================================================
echo   ECG Wizard is starting up!
echo   
echo   Backend API: http://localhost:8000
echo   Frontend PWA: http://localhost:3000
echo   
echo   The browser will open automatically...
echo   Close this window to stop the ECG Wizard.
echo ================================================================
echo.

:: Open browser after a short delay
timeout /t 2 /nobreak >nul
start http://localhost:3000

:: Start React development server
npm start

:: Cleanup message when user closes
echo.
echo ECG Wizard stopped. Thank you for using ECG Wizard!
pause