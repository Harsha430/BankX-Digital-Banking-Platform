#!/bin/bash

echo "Starting BankX Full Stack Application..."
echo

# Check if backend is already running
if curl -s http://localhost:8080/api/test/health > /dev/null 2>&1; then
    echo "Backend is already running on port 8080"
else
    echo "Starting backend..."
    gnome-terminal --title="BankX Backend" -- bash -c "mvn spring-boot:run; exec bash" &
    echo "Waiting for backend to start..."
    sleep 10
fi

echo
echo "Starting frontend..."
cd frontend
gnome-terminal --title="BankX Frontend" -- bash -c "npm run dev; exec bash" &

echo
echo "Both services are starting..."
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:5173"
echo
echo "Press Enter to continue..."
read