@echo off
echo 🚀 Starting BankX Digital Banking Platform...
echo.

echo 📊 Starting Backend (Spring Boot)...
start "BankX Backend" cmd /k "mvn spring-boot:run"

echo ⏳ Waiting for backend to start...
timeout /t 10 /nobreak > nul

echo 🎨 Starting Frontend (React + Vite)...
cd frontend
start "BankX Frontend" cmd /k "npm run dev"

echo.
echo ✅ BankX is starting up!
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:8080
echo 🔑 Login: admin@bankx.com / admin123
echo.
pause