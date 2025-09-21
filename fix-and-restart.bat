@echo off
echo ========================================
echo BankX Backend Fix and Restart Script
echo ========================================
echo.

echo Step 1: Stopping any existing backend processes...
taskkill /f /im java.exe 2>nul
timeout /t 3 /nobreak > nul

echo Step 2: Cleaning Maven project...
mvn clean
if %errorlevel% neq 0 (
    echo ERROR: Maven clean failed!
    pause
    exit /b 1
)

echo Step 3: Compiling project...
mvn compile
if %errorlevel% neq 0 (
    echo ERROR: Maven compile failed!
    pause
    exit /b 1
)

echo Step 4: Starting backend in development mode...
echo.
echo Backend will start with:
echo - All security disabled for development
echo - CORS enabled for all origins
echo - Test endpoints available
echo.
echo Available test endpoints:
echo - http://localhost:8080/ping
echo - http://localhost:8080/health
echo - http://localhost:8080/api/test/health
echo.
echo Starting backend now...
echo.

start "BankX Backend" cmd /k "mvn spring-boot:run -Dspring-boot.run.profiles=dev"

echo Waiting for backend to start...
timeout /t 10 /nobreak > nul

echo Step 5: Testing connection...
echo.

echo Testing ping endpoint...
curl -s http://localhost:8080/ping
if %errorlevel% == 0 (
    echo ✅ Ping test: PASSED
) else (
    echo ❌ Ping test: FAILED
)

echo.
echo Testing health endpoint...
curl -s http://localhost:8080/health
if %errorlevel% == 0 (
    echo ✅ Health test: PASSED
) else (
    echo ❌ Health test: FAILED
)

echo.
echo ========================================
echo Backend restart completed!
echo.
echo If tests passed, you can now:
echo 1. Start the frontend: cd frontend && npm run dev
echo 2. Visit: http://localhost:5173
echo 3. Check connection test in top-right corner
echo.
echo If tests failed, check the backend console for errors.
echo ========================================
echo.
pause