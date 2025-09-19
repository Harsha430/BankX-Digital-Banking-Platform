# 🔌 BankX API Documentation

## 🚀 Base URL
```
http://localhost:8080/api
```

## 🔐 Authentication
All API endpoints (except login) require JWT authentication:
```
Authorization: Bearer <your-jwt-token>
```

## 📋 Endpoints

### 👤 Customer Management

#### Get Customer by ID
```http
GET /api/customers/{id}
```
**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "admin@bankx.com",
  "phone": 5551234567,
  "address": "123 Main Street, New York, NY 10001",
  "kycStatus": "VERIFIED",
  "createdAt": "2023-01-15T10:00:00Z"
}
```

#### Create Customer
```http
POST /api/customers/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": 5551234567,
  "address": "123 Main Street",
  "password": "securePassword123"
}
```

### 💳 Account Management

#### Get All Accounts for Customer
```http
GET /api/accounts/customer/{customerId}
```

#### Get Account by ID
```http
GET /api/accounts/{id}
```
**Response:**
```json
{
  "id": 1,
  "accountNumber": "123456789012",
  "accountType": "SAVINGS",
  "balance": 85430.50,
  "customer": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe"
  }
}
```

#### Create Account
```http
POST /api/accounts/customer/{customerId}
```
**Request Body:**
```json
{
  "accountType": "SAVINGS"
}
```

### 📈 Transaction Management

#### Get All Transactions
```http
GET /api/transactions
```

#### Get Transaction by ID
```http
GET /api/transactions/{id}
```

#### Get Transactions by Account
```http
GET /api/transactions/account/{accountId}
```

#### Create Transaction
```http
POST /api/transactions
```
**Request Body:**
```json
{
  "fromAccount": {
    "id": 1
  },
  "toAccount": {
    "id": 2
  },
  "amount": 100.00,
  "type": "TRANSFER"
}
```

## 📊 Response Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request |
| 401  | Unauthorized |
| 403  | Forbidden |
| 404  | Not Found |
| 500  | Internal Server Error |

## 🔍 Error Response Format
```json
{
  "timestamp": "2025-09-19T10:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/transactions"
}
```

## 📝 Data Models

### Customer
```json
{
  "id": "UUID",
  "name": "string",
  "email": "string",
  "phone": "number",
  "address": "string",
  "kycStatus": "VERIFIED | PENDING",
  "createdAt": "datetime"
}
```

### Account
```json
{
  "id": "number",
  "accountNumber": "string",
  "accountType": "SAVINGS | CURRENT | WALLET",
  "balance": "decimal",
  "customer": "Customer"
}
```

### Transaction
```json
{
  "id": "number",
  "fromAccount": "Account",
  "toAccount": "Account",
  "amount": "decimal",
  "type": "CREDIT | DEBIT | TRANSFER",
  "status": "SUCCESS | PENDING | FAILED",
  "referenceId": "string",
  "createdAt": "datetime"
}
```

## 🧪 Testing with cURL

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bankx.com","password":"admin123"}'
```

### Get Accounts
```bash
curl -X GET http://localhost:8080/api/accounts/customer/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Transaction
```bash
curl -X POST http://localhost:8080/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "fromAccount": {"id": 1},
    "toAccount": {"id": 2},
    "amount": 100.00,
    "type": "TRANSFER"
  }'
```