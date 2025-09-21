# BankX Frontend - Backend Integration Guide

## Overview
This document outlines how the BankX frontend integrates with the Spring Boot backend, including API endpoints, data structures, and form implementations.

## Backend API Integration

### Authentication APIs
- **POST** `/api/auth/login` - User login with email/password
- **POST** `/api/auth/logout` - User logout
- **GET** `/api/auth/me` - Get current authenticated user
- **POST** `/api/customers/register` - User registration

### Customer APIs
- **GET** `/api/customers/{id}` - Get customer by ID
- **DELETE** `/api/customers/{id}` - Delete customer (Admin only)

### Account APIs
- **GET** `/api/accounts/{id}` - Get account by ID
- **GET** `/api/accounts/customer/{customerId}` - Get all accounts for a customer
- **POST** `/api/accounts/customer/{customerId}` - Create new account
- **PUT** `/api/accounts/{id}/type` - Update account type
- **DELETE** `/api/accounts/{id}` - Delete account

### Transaction APIs
- **GET** `/api/transactions` - Get all transactions (Admin only)
- **GET** `/api/transactions/reference/{referenceId}` - Get transaction by reference ID
- **GET** `/api/transactions/account/{accountId}` - Get transactions for an account
- **POST** `/api/transactions/deposit` - Deposit money
- **POST** `/api/transactions/withdraw` - Withdraw money
- **POST** `/api/transactions/transfer` - Transfer money between accounts

## Data Models

### User Authentication (UserAuth)
```java
{
  "id": 1,
  "username": "string",
  "password": "string", // Encrypted
  "role": "ADMIN" | "CUSTOMER",
  "customer": Customer
}
```

### Customer
```java
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "number",
  "address": "string",
  "kycStatus": "VERIFIED" | "PENDING",
  "createdAt": "datetime"
}
```

### Account
```java
{
  "id": "number",
  "accountNumber": "string", // 12-digit auto-generated
  "accountType": "SAVINGS" | "CURRENT" | "WALLET",
  "balance": "decimal",
  "customer": Customer
}
```

### Transaction
```java
{
  "id": "number",
  "fromAccount": Account,
  "toAccount": Account,
  "amount": "decimal",
  "type": "DEBIT" | "CREDIT" | "TRANSFER",
  "status": "SUCCESS" | "FAILED" | "PENDING",
  "referenceId": "string", // Auto-generated
  "createdAt": "datetime"
}
```

## Frontend Components

### Authentication Forms

#### LoginForm.jsx
- Integrates with `/api/auth/login`
- Validates email and password
- Stores JWT token and user data in localStorage
- Handles authentication errors

#### RegisterForm.jsx
- Integrates with `/api/customers/register`
- Collects all required customer and auth data
- Validates form data including password confirmation
- Maps to `CreateCustomerAccountRequest` DTO

### Transaction Management

#### TransactionForm.jsx
- Multi-tab form for Deposit, Withdraw, Transfer
- Loads user accounts dynamically
- Integrates with transaction APIs
- Real-time form validation
- Success/error handling

### Account Management

#### AccountForm.jsx
- Account type selection (Savings, Current, Wallet)
- Optional initial balance
- Integrates with account creation API
- Visual account type descriptions

## API Service Layer

### api.js Structure
```javascript
// Base configuration with interceptors
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' }
});

// Authentication APIs
export const authAPI = {
  login, logout, getCurrentUser, register
};

// Account APIs
export const accountAPI = {
  getAccountsByCustomer, getAccountById, 
  createAccount, updateAccountType, deleteAccount
};

// Transaction APIs
export const transactionAPI = {
  getAllTransactions, getTransactionsByAccount,
  getTransactionByReference, deposit, withdraw, transfer
};

// Customer APIs
export const customerAPI = {
  getCustomerById, deleteCustomer
};
```

## Authentication Flow

1. **Login Process:**
   - User enters email/password in LoginForm
   - Frontend calls `/api/auth/login`
   - Backend validates credentials
   - Returns JWT token and user data
   - Frontend stores token and redirects to dashboard

2. **Token Management:**
   - JWT token stored in localStorage
   - Axios interceptor adds token to all requests
   - Automatic logout on 401 responses
   - Token refresh handling

3. **Protected Routes:**
   - AuthContext manages authentication state
   - ProtectedRoute component guards private pages
   - Automatic redirect to login if not authenticated

## Form Validation

### Frontend Validation
- Real-time field validation
- Password strength checking
- Email format validation
- Required field validation
- Custom error messages

### Backend Validation
- Bean validation annotations (@NotBlank, @Email)
- Business logic validation
- Database constraint validation
- Comprehensive error responses

## Error Handling

### API Error Responses
```javascript
try {
  const response = await api.post('/endpoint', data);
  return response.data;
} catch (error) {
  throw new Error(error.response?.data || 'Operation failed');
}
```

### User Feedback
- Toast notifications for success/error
- Form-specific error messages
- Loading states during API calls
- Graceful fallback to mock data

## Security Features

### Frontend Security
- JWT token storage and management
- Automatic token cleanup on logout
- CORS configuration for API calls
- Input sanitization and validation

### Backend Integration
- JWT authentication middleware
- Role-based access control
- HTTPS enforcement (production)
- Request rate limiting

## Development Setup

### Prerequisites
- Node.js 16+ and npm
- Java 17+ and Maven
- Running backend server on port 8080

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Integration
1. Ensure backend is running on `http://localhost:8080`
2. Update API base URL in `api.js` if needed
3. Configure CORS in backend for frontend origin
4. Test API endpoints with provided credentials

## Demo Credentials
- **Email:** admin@bankx.com
- **Password:** admin123

## Testing Integration

### Manual Testing
1. Register new user account
2. Login with credentials
3. Create different account types
4. Perform deposit/withdraw/transfer operations
5. View transaction history
6. Test error scenarios

### API Testing
- Use provided `test-backend.http` file
- Test all endpoints with proper authentication
- Verify data persistence
- Check error responses

## Production Considerations

### Environment Variables
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
```

### Build Configuration
- Update API URLs for production
- Configure proper CORS origins
- Enable HTTPS
- Set up proper error logging
- Implement token refresh mechanism

## Troubleshooting

### Common Issues
1. **CORS Errors:** Ensure backend CORS configuration includes frontend origin
2. **401 Unauthorized:** Check JWT token validity and format
3. **Network Errors:** Verify backend server is running and accessible
4. **Form Validation:** Check DTO field names match frontend form fields
5. **Data Loading:** Verify API endpoints return expected data structure

### Debug Tips
- Check browser network tab for API calls
- Verify JWT token in localStorage
- Check backend logs for errors
- Use React DevTools for state debugging
- Test API endpoints directly with tools like Postman