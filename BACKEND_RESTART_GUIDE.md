# Backend Restart and Connection Fix Guide

## Current Issue
The backend is returning 403 Forbidden errors even for public endpoints. This indicates that the security configuration changes haven't been applied yet.

## Solution: Restart Backend

### Step 1: Stop Current Backend
If the backend is running, stop it:
- Press `Ctrl+C` in the terminal where it's running
- Or close the terminal/command prompt

### Step 2: Clean and Restart Backend
```bash
# Clean the project
mvn clean

# Compile and start
mvn spring-boot:run
```

### Step 3: Verify Backend is Working
After restart, test these endpoints:

#### Simple Health Check (No Authentication)
```bash
curl http://localhost:8080/health
```
**Expected Response:**
```json
{
  "status": "OK",
  "message": "Backend is running",
  "timestamp": 1234567890
}
```

#### API Health Check
```bash
curl http://localhost:8080/api/test/health
```
**Expected Response:**
```json
{
  "status": "OK",
  "message": "Backend is running",
  "timestamp": 1234567890
}
```

### Step 4: Test Registration
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

### Step 5: Test Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@bankx.com",
    "password": "admin123"
  }'
```

## What Was Fixed

### 1. Security Configuration
- Added `/api/test/**` to permitted URLs
- Added `/health` to permitted URLs
- Proper CORS configuration

### 2. Test Endpoints
- Created `TestController` with `/api/test/health`
- Created `HealthController` with `/health`
- Both endpoints are now public (no authentication required)

### 3. Database Initialization
- Admin user will be created automatically
- Proper password encoding
- Sample accounts created

## Troubleshooting

### If Backend Still Returns 403:
1. **Check if PostgreSQL is running:**
   ```bash
   pg_isready -h localhost -p 5432
   ```

2. **Check application.properties:**
   - Database URL: `jdbc:postgresql://localhost:5432/BankX`
   - Username: `postgres`
   - Password: `00000`

3. **Create database if it doesn't exist:**
   ```sql
   CREATE DATABASE "BankX";
   ```

4. **Check backend logs for errors:**
   Look for any startup errors in the console

### If Database Connection Fails:
1. **Start PostgreSQL service:**
   ```bash
   # Windows
   net start postgresql-x64-14
   
   # Linux/Mac
   sudo service postgresql start
   ```

2. **Verify database exists:**
   ```bash
   psql -h localhost -p 5432 -U postgres -l | grep BankX
   ```

### If Frontend Still Shows Connection Error:
1. **Clear browser cache and localStorage**
2. **Restart frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Check browser console for errors**

## Expected Behavior After Restart

1. **Backend Health Check:** ✅ Returns 200 OK
2. **Frontend Connection Test:** ✅ Shows "SUCCESS" status
3. **Registration:** ✅ Creates new users
4. **Login:** ✅ Works with admin@bankx.com / admin123
5. **Dashboard:** ✅ Loads with real data
6. **Transactions:** ✅ All operations work

## Quick Verification Checklist

- [ ] PostgreSQL is running
- [ ] Backend starts without errors
- [ ] Health endpoint returns 200 OK
- [ ] Frontend connection test shows SUCCESS
- [ ] Can register new user
- [ ] Can login with admin credentials
- [ ] Dashboard loads with account data

## If Issues Persist

1. **Check firewall settings** - ports 8080 and 5432 should be open
2. **Verify Java version** - should be Java 17+
3. **Check Maven dependencies** - run `mvn dependency:resolve`
4. **Review application logs** for any startup errors
5. **Ensure no other services are using port 8080**

The key is to **restart the backend** after making the security configuration changes!