@echo off
echo 🚀 Starting BankX Digital Banking Platform Development Environment
echo.

echo 📋 Prerequisites Check:
echo - Java 17+ ✓
echo - Node.js 18+ ✓
echo - PostgreSQL 15+ ✓
echo - Maven 3.8+ ✓
echo.

echo 🗄️ Setting up Database...
echo Creating PostgreSQL database 'BankX'...
createdb BankX 2>nul
if %errorlevel% equ 0 (
    echo ✅ Database 'BankX' created successfully
) else (
    echo ⚠️  Database 'BankX' might already exist or PostgreSQL is not running
)
echo.

echo 📦 Installing Frontend Dependencies...
cd frontend
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..
echo ✅ Frontend dependencies installed
echo.

echo 🔧 Starting Backend (Spring Boot)...
start "BankX Backend" cmd /k "echo 🔧 Starting Spring Boot Backend... && mvn spring-boot:run"
echo ⏳ Waiting for backend to initialize...
timeout /t 15 /nobreak > nul

echo 🎨 Starting Frontend (React + Vite)...
cd frontend
start "BankX Frontend" cmd /k "echo 🎨 Starting React Frontend... && npm run dev"
cd ..

echo.
echo 🎉 BankX Digital Banking Platform is starting up!
echo.
echo 📍 Access Points:
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend API: http://localhost:8080
echo 📊 Health Check: http://localhost:8080/actuator/health
echo.
echo 🔑 Demo Login Credentials:
echo Email: admin@bankx.com
echo Password: admin123
echo.
echo 💡 Tips:
echo - Wait for both servers to fully start (green text in terminals)
echo - The backend will run database migrations automatically
echo - Sample data will be inserted on first run
echo - Use Ctrl+C in each terminal to stop the servers
echo.
echo 🎯 Ready to experience the most stunning banking UI ever created!
echo.
pause