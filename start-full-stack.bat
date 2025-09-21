@echo off
echo Starting BankX Full Stack Application...
echo.

echo Checking if backend is already running...
curl -s http://localhost:8080/api/test/health > nul 2>&1
if %errorlevel% == 0 (
    echo Backend is already running on port 8080
) else (
    echo Starting backend...
    start "BankX Backend" cmd /k "mvn spring-boot:run"
    echo Waiting for backend to start...
    timeout /t 10 /nobreak > nul
)

echo.
echo Starting frontend...
cd frontend
start "BankX Frontend" cmd /k "npm run dev"

echo.
echo Both services are starting...
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul