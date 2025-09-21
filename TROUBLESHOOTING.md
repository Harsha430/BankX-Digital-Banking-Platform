# BankX Frontend-Backend Connection Troubleshooting Guide

## Current Issues and Solutions

### 1. 403 Forbidden Error on Registration

**Problem:** Registration endpoint returns 403 Forbidden
**Root Cause:** Security configuration not allowing registration endpoint

**Solution Applied:**
- Updated `SecurityConfig.java` to explicitly allow `/api/customers/register`
- Added proper CORS configuration for frontend origins

### 2. Authentication Issues

**Problem:** Login not working properly
**Root Causes:**
- Password not being hashed during registration
- Login endpoint using hardcoded credentials instead of proper authentication

**Solutions Applied:**
- Added `PasswordEncoder` to `CustomerService` for proper password hashing
- Updated `AuthController` to use proper authentication flow
- Added demo admin user creation in `DataInitializer`

### 3. Database Connection Issues

**Problem:** Backend may not be connecting to PostgreSQL
**Check:**
```bash
# Verify PostgreSQL is running
pg_isready -h localhost -p 5432

# Check if database exists
psql -h localhost -p 5432 -U postgres -l | grep BankX
```

**Solution:**
- Ensure PostgreSQL is running on port 5432
- Create database if it doesn't exist:
```sql
CREATE DATABASE "BankX";
```

## Step-by-Step Startup Process

### 1. Start PostgreSQL Database
```bash
# Windows (if using PostgreSQL service)
net start postgresql-x64-14

# Or start manually if installed locally
pg_ctl -D "C:\Program Files\PostgreSQL\14\data" start
```

### 2. Start Backend
```bash
# From project root
mvn clean install
mvn spring-boot:run
```

**Verify backend is running:**
- Open: http://localhost:8080/api/test/health
- Should return: `{"status":"OK","message":"Backend is running","timestamp":...}`

### 3. Start Frontend
```bash
# From frontend directory
cd frontend
npm install
npm run dev
```

**Verify frontend is running:**
- Open: http://localhost:5173
- Should show login page with connection test in top-right corner

## Testing the Connection

### 1. Backend Health Check
```bash
curl http://localhost:8080/api/test/health
```

### 2. Test Registration
```bash
curl -X POST http://localhost:8080/api/customers/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "phone": 1234567890,
    "address": "123 Test St"
  }'
```

### 3. Test Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@bankx.com",
    "password": "admin123"
  }'
```

## Common Error Solutions

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Solution:** Backend CORS is configured for `http://localhost:5173`. Ensure frontend is running on this port.

### Error: "Connection refused" or "Network Error"
**Solution:** 
1. Check if backend is running: `curl http://localhost:8080/api/test/health`
2. Check if PostgreSQL is running: `pg_isready -h localhost -p 5432`
3. Verify application.properties database settings

### Error: "403 Forbidden" on any endpoint
**Solution:**
1. Check if endpoint is properly configured in SecurityConfig
2. Verify JWT token is being sent correctly
3. Check user roles and permissions

### Error: "Invalid credentials" on login
**Solution:**
1. Use demo credentials: admin@bankx.com / admin123
2. Check if admin user was created in database
3. Verify password encoding is working

## Database Verification

### Check if admin user exists:
```sql
-- Connect to database
psql -h localhost -p 5432 -U postgres -d BankX

-- Check customers table
SELECT * FROM customers WHERE email = 'admin@bankx.com';

-- Check credentials table
SELECT id, username, role FROM credentials WHERE username = 'admin';
```

## Frontend Debug Features

The frontend includes a connection test component (visible in development mode) that shows:
- Backend connection status
- API response details
- Error information

## Manual Testing Steps

1. **Start Services:**
   - PostgreSQL database
   - Backend (port 8080)
   - Frontend (port 5173)

2. **Test Backend:**
   - Visit: http://localhost:8080/api/test/health
   - Should return JSON with status "OK"

3. **Test Frontend:**
   - Visit: http://localhost:5173
   - Check connection test in top-right corner
   - Should show "SUCCESS" status

4. **Test Registration:**
   - Click "Sign Up" on login page
   - Fill out registration form
   - Submit and check for success message

5. **Test Login:**
   - Use admin@bankx.com / admin123
   - Should redirect to dashboard
   - Check if accounts and transactions load

## Environment Variables

Create `.env` file in frontend directory:
```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENV=development
```

## Production Deployment Notes

1. Update API_BASE_URL in frontend/src/services/api.js
2. Configure proper CORS origins in SecurityConfig.java
3. Use environment variables for database connection
4. Enable HTTPS in production
5. Set up proper JWT secret key
6. Configure production database settings

## Contact Information

If issues persist:
1. Check browser console for JavaScript errors
2. Check backend logs for Java exceptions
3. Verify all dependencies are installed
4. Ensure ports 8080 and 5173 are not blocked by firewall