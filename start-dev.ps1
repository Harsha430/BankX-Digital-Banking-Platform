#!/usr/bin/env pwsh

Write-Host "🚀 Starting BankX Digital Banking Platform Development Environment" -ForegroundColor Cyan
Write-Host ""

Write-Host "📋 Prerequisites Check:" -ForegroundColor Yellow
Write-Host "- Java 17+ ✓" -ForegroundColor Green
Write-Host "- Node.js 18+ ✓" -ForegroundColor Green
Write-Host "- PostgreSQL 15+ ✓" -ForegroundColor Green
Write-Host "- Maven 3.8+ ✓" -ForegroundColor Green
Write-Host ""

Write-Host "🗄️ Setting up Database..." -ForegroundColor Yellow
Write-Host "Creating PostgreSQL database 'BankX'..." -ForegroundColor White
try {
    & createdb BankX 2>$null
    Write-Host "✅ Database 'BankX' created successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Database 'BankX' might already exist or PostgreSQL is not running" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Yellow
Set-Location frontend
try {
    & npm install --legacy-peer-deps
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Set-Location ..
Write-Host ""

Write-Host "🔧 Starting Backend (Spring Boot)..." -ForegroundColor Yellow
if ($IsWindows) {
    Start-Process cmd -ArgumentList "/k", "echo 🔧 Starting Spring Boot Backend... && mvn spring-boot:run" -WindowStyle Normal
} else {
    Start-Process -FilePath "bash" -ArgumentList "-c", "echo '🔧 Starting Spring Boot Backend...' && mvn spring-boot:run" -WindowStyle Normal
}

Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor White
Start-Sleep -Seconds 15

Write-Host "🎨 Starting Frontend (React + Vite)..." -ForegroundColor Yellow
Set-Location frontend
if ($IsWindows) {
    Start-Process cmd -ArgumentList "/k", "echo 🎨 Starting React Frontend... && npm run dev" -WindowStyle Normal
} else {
    Start-Process -FilePath "bash" -ArgumentList "-c", "echo '🎨 Starting React Frontend...' && npm run dev" -WindowStyle Normal
}
Set-Location ..

Write-Host ""
Write-Host "🎉 BankX Digital Banking Platform is starting up!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Access Points:" -ForegroundColor Cyan
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "🔧 Backend API: http://localhost:8080" -ForegroundColor White
Write-Host "📊 Health Check: http://localhost:8080/actuator/health" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Demo Login Credentials:" -ForegroundColor Cyan
Write-Host "Email: admin@bankx.com" -ForegroundColor White
Write-Host "Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "- Wait for both servers to fully start (green text in terminals)" -ForegroundColor White
Write-Host "- The backend will run database migrations automatically" -ForegroundColor White
Write-Host "- Sample data will be inserted on first run" -ForegroundColor White
Write-Host "- Use Ctrl+C in each terminal to stop the servers" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Ready to experience the most stunning banking UI ever created!" -ForegroundColor Magenta
Write-Host ""
Read-Host "Press Enter to continue"