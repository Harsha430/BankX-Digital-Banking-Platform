@echo off
echo Restarting BankX Backend...
echo.

echo Stopping any existing backend processes...
taskkill /f /im java.exe 2>nul
timeout /t 2 /nobreak > nul

echo Cleaning project...
mvn clean

echo Starting backend...
echo Backend will be available at: http://localhost:8080
echo Health check: http://localhost:8080/health
echo.

mvn spring-boot:run