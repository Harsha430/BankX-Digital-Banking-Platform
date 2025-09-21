@echo off
echo Waiting for backend to start...
echo.

:WAIT_LOOP
timeout /t 2 /nobreak > nul
echo Testing connection...
curl -s http://localhost:8080/ping > nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Backend is ready!
    goto TEST_ENDPOINTS
) else (
    echo ⏳ Still waiting...
    goto WAIT_LOOP
)

:TEST_ENDPOINTS
echo.
echo Testing all endpoints...
echo.

echo 1. Testing ping endpoint:
curl -s http://localhost:8080/ping
echo.

echo 2. Testing health endpoint:
curl -s http://localhost:8080/health
echo.

echo 3. Testing API health endpoint:
curl -s http://localhost:8080/api/test/health
echo.

echo 4. Testing registration endpoint:
curl -s -X POST http://localhost:8080/api/customers/register -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"username\":\"testuser\",\"password\":\"test123\"}"
echo.

echo 5. Testing login endpoint:
curl -s -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@bankx.com\",\"password\":\"admin123\"}"
echo.

echo ========================================
echo All tests completed!
echo Backend is ready for frontend connection.
echo ========================================
pause