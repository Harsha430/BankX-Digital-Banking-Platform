@echo off
echo Testing BankX Backend Connection...
echo.

echo Testing simple health endpoint...
curl -s http://localhost:8080/health
if %errorlevel% == 0 (
    echo ✅ Simple health check: PASSED
) else (
    echo ❌ Simple health check: FAILED
)

echo.
echo Testing API health endpoint...
curl -s http://localhost:8080/api/test/health
if %errorlevel% == 0 (
    echo ✅ API health check: PASSED
) else (
    echo ❌ API health check: FAILED
)

echo.
echo Testing registration endpoint...
curl -s -X POST http://localhost:8080/api/customers/register -H "Content-Type: application/json" -d "{\"name\":\"Test\",\"email\":\"test@test.com\",\"username\":\"test\",\"password\":\"test123\"}" > nul
if %errorlevel% == 0 (
    echo ✅ Registration endpoint: ACCESSIBLE
) else (
    echo ❌ Registration endpoint: FAILED
)

echo.
echo Testing login endpoint...
curl -s -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@bankx.com\",\"password\":\"admin123\"}" > nul
if %errorlevel% == 0 (
    echo ✅ Login endpoint: ACCESSIBLE
) else (
    echo ❌ Login endpoint: FAILED
)

echo.
echo Connection test completed!
pause