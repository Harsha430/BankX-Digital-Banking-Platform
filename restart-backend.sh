#!/bin/bash

echo "Restarting BankX Backend..."
echo

echo "Stopping any existing backend processes..."
pkill -f "spring-boot:run" 2>/dev/null
sleep 2

echo "Cleaning project..."
mvn clean

echo "Starting backend..."
echo "Backend will be available at: http://localhost:8080"
echo "Health check: http://localhost:8080/health"
echo

mvn spring-boot:run