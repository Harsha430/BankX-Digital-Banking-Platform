@echo off
echo ========================================
echo BankX Backend Clean Restart
echo ========================================
echo.

echo Step 1: Stopping all Java processes...
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
mvn compile -DskipTests
if %errorlevel% neq 0 (
    echo ERROR: Maven compile failed!
    pause
    exit /b 1
)

echo Step 4: Starting backend with minimal configuration...
echo.
echo Backend starting with:
echo - PostgreSQL database only
echo - No Redis caching
echo - No Kafka messaging  
echo - No email notifications (temporarily)
echo.
echo Starting backend now...
echo.

mvn spring-boot:run -DskipTests

pause