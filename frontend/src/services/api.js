import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock data for demo purposes (replace with real API calls)
const mockData = {
  accounts: [
    {
      id: 1,
      accountNumber: '****1234',
      fullAccountNumber: '123456789012',
      type: 'SAVINGS',
      balance: 85430.50,
      accountName: 'Primary Savings',
      status: 'ACTIVE',
      interestRate: 2.5,
      lastTransaction: '2 hours ago',
      monthlyTransactions: 24,
      cardColor: 'gradient-primary'
    },
    {
      id: 2,
      accountNumber: '****5678',
      fullAccountNumber: '567890123456',
      type: 'CURRENT',
      balance: 12750.25,
      accountName: 'Business Current',
      status: 'ACTIVE',
      interestRate: 0.0,
      lastTransaction: '5 hours ago',
      monthlyTransactions: 156,
      cardColor: 'gradient-secondary'
    },
    {
      id: 3,
      accountNumber: '****9012',
      fullAccountNumber: '901234567890',
      type: 'WALLET',
      balance: 2249.75,
      accountName: 'Digital Wallet',
      status: 'ACTIVE',
      interestRate: 1.0,
      lastTransaction: '1 day ago',
      monthlyTransactions: 89,
      cardColor: 'gradient-success'
    },
    {
      id: 4,
      accountNumber: '****3456',
      fullAccountNumber: '345678901234',
      type: 'SAVINGS',
      balance: 45680.90,
      accountName: 'Emergency Fund',
      status: 'ACTIVE',
      interestRate: 3.2,
      lastTransaction: '3 days ago',
      monthlyTransactions: 12,
      cardColor: 'gradient-warning'
    }
  ],
  
  transactions: [
    { 
      id: 'TXN-20250919-1234', 
      type: 'CREDIT', 
      amount: 2500.00, 
      description: 'Salary Deposit - Tech Corp', 
      date: '2025-09-19T10:30:00Z',
      status: 'SUCCESS',
      account: 'Savings Account',
      category: 'Income',
      fromAccount: null,
      toAccount: { id: 1, accountNumber: '****1234' }
    },
    { 
      id: 'TXN-20250918-5678', 
      type: 'DEBIT', 
      amount: 150.75, 
      description: 'Grocery Shopping - SuperMart', 
      date: '2025-09-18T15:45:00Z',
      status: 'SUCCESS',
      account: 'Current Account',
      category: 'Food & Dining',
      fromAccount: { id: 2, accountNumber: '****5678' },
      toAccount: null
    },
    { 
      id: 'TXN-20250917-9012', 
      type: 'TRANSFER', 
      amount: 1000.00, 
      description: 'Transfer to Emergency Fund', 
      date: '2025-09-17T09:15:00Z',
      status: 'SUCCESS',
      account: 'Savings Account',
      category: 'Transfer',
      fromAccount: { id: 1, accountNumber: '****1234' },
      toAccount: { id: 4, accountNumber: '****3456' }
    },
    { 
      id: 'TXN-20250916-3456', 
      type: 'DEBIT', 
      amount: 89.99, 
      description: 'Netflix Subscription', 
      date: '2025-09-16T12:00:00Z',
      status: 'SUCCESS',
      account: 'Current Account',
      category: 'Entertainment',
      fromAccount: { id: 2, accountNumber: '****5678' },
      toAccount: null
    },
    { 
      id: 'TXN-20250915-7890', 
      type: 'DEBIT', 
      amount: 45.50, 
      description: 'Coffee & Breakfast - Cafe Luna', 
      date: '2025-09-15T08:30:00Z',
      status: 'PENDING',
      account: 'Current Account',
      category: 'Food & Dining',
      fromAccount: { id: 2, accountNumber: '****5678' },
      toAccount: null
    },
    { 
      id: 'TXN-20250914-2345', 
      type: 'CREDIT', 
      amount: 125.00, 
      description: 'Cashback Reward', 
      date: '2025-09-14T16:20:00Z',
      status: 'SUCCESS',
      account: 'Wallet',
      category: 'Rewards',
      fromAccount: null,
      toAccount: { id: 3, accountNumber: '****9012' }
    },
    { 
      id: 'TXN-20250913-6789', 
      type: 'DEBIT', 
      amount: 299.99, 
      description: 'Online Shopping - TechStore', 
      date: '2025-09-13T14:10:00Z',
      status: 'FAILED',
      account: 'Current Account',
      category: 'Shopping',
      fromAccount: { id: 2, accountNumber: '****5678' },
      toAccount: null
    },
    { 
      id: 'TXN-20250912-4567', 
      type: 'CREDIT', 
      amount: 3200.00, 
      description: 'Freelance Payment - Design Project', 
      date: '2025-09-12T11:15:00Z',
      status: 'SUCCESS',
      account: 'Current Account',
      category: 'Income',
      fromAccount: null,
      toAccount: { id: 2, accountNumber: '****5678' }
    },
    { 
      id: 'TXN-20250911-8901', 
      type: 'DEBIT', 
      amount: 1200.00, 
      description: 'Rent Payment', 
      date: '2025-09-11T09:00:00Z',
      status: 'SUCCESS',
      account: 'Current Account',
      category: 'Bills & Utilities',
      fromAccount: { id: 2, accountNumber: '****5678' },
      toAccount: null
    },
    { 
      id: 'TXN-20250910-2468', 
      type: 'TRANSFER', 
      amount: 500.00, 
      description: 'Transfer to Wallet', 
      date: '2025-09-10T14:30:00Z',
      status: 'SUCCESS',
      account: 'Savings Account',
      category: 'Transfer',
      fromAccount: { id: 1, accountNumber: '****1234' },
      toAccount: { id: 3, accountNumber: '****9012' }
    }
  ],

  user: {
    id: '1',
    name: 'John Doe',
    email: 'admin@bankx.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    kycStatus: 'VERIFIED',
    joinDate: '2023-01-15',
    lastLogin: '2025-09-19T10:30:00Z',
    profileImage: null
  }
};

// Test backend connection
export const testAPI = {
  healthCheck: async () => {
    try {
      // Try the simplest ping endpoint first
      const response = await axios.get('http://localhost:8080/ping');
      return response.data;
    } catch (error) {
      console.error('Ping failed:', error);
      // Try the health endpoint
      try {
        const response = await axios.get('http://localhost:8080/health');
        return response.data;
      } catch (healthError) {
        console.error('Health check also failed:', healthError);
        // Try the API endpoint as last resort
        try {
          const response = await api.get('/test/health');
          return response.data;
        } catch (apiError) {
          console.error('All health checks failed:', apiError);
          throw error;
        }
      }
    }
  }
};

// API functions
export const authAPI = {
  login: async (email, password) => {
    try {
      console.log('Attempting login with:', { email, password: '***' });
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
        message: response.data.message
      };
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw new Error(error.response?.data || 'Invalid credentials');
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local storage even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: true };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      console.log('Attempting registration with:', userData);
      const response = await api.post('/customers/register', userData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      
      let errorMessage = 'Registration failed';
      if (error.response?.status === 403) {
        errorMessage = 'Registration is not allowed. Please check server configuration.';
      } else if (error.response?.data) {
        errorMessage = typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data);
      }
      
      throw new Error(errorMessage);
    }
  }
};

export const accountAPI = {
  getAccountsByCustomer: async (customerId) => {
    try {
      console.log('Fetching accounts for customer:', customerId);
      const response = await api.get(`/accounts/customer/${customerId}`);
      console.log('Accounts response:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching accounts:', error);
      console.error('Error details:', error.response?.data);
      // Return empty array instead of mock data for new users
      return [];
    }
  },
  
  getAccountById: async (id) => {
    try {
      console.log('Fetching account by ID:', id);
      const response = await api.get(`/accounts/${id}`);
      console.log('Account response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching account:', error);
      console.error('Error details:', error.response?.data);
      return null;
    }
  },

  createAccount: async (customerId, accountType, initialBalance = 0) => {
    try {
      const response = await api.post(`/accounts/customer/${customerId}`, null, {
        params: { accountType, initialBalance }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error);
      throw new Error(error.response?.data || 'Failed to create account');
    }
  },

  updateAccountType: async (accountId, accountType) => {
    try {
      const response = await api.put(`/accounts/${accountId}/type`, null, {
        params: { accountType }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating account type:', error);
      throw new Error(error.response?.data || 'Failed to update account type');
    }
  },

  deleteAccount: async (accountId) => {
    try {
      await api.delete(`/accounts/${accountId}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting account:', error);
      throw new Error(error.response?.data || 'Failed to delete account');
    }
  }
};

export const transactionAPI = {
  getAllTransactions: async () => {
    try {
      console.log('Fetching all transactions');
      const response = await api.get('/transactions');
      console.log('Transactions response:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching all transactions:', error);
      console.error('Error details:', error.response?.data);
      // Return empty array for new users instead of mock data
      return [];
    }
  },

  getTransactionsByAccount: async (accountId) => {
    try {
      console.log('Fetching transactions for account:', accountId);
      const response = await api.get(`/transactions/account/${accountId}`);
      console.log('Account transactions response:', response.data);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching account transactions:', error);
      console.error('Error details:', error.response?.data);
      return [];
    }
  },
  
  getTransactionByReference: async (referenceId) => {
    try {
      console.log('Fetching transaction by reference:', referenceId);
      const response = await api.get(`/transactions/reference/${referenceId}`);
      console.log('Transaction response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      console.error('Error details:', error.response?.data);
      return null;
    }
  },

  deposit: async (accountId, amount) => {
    try {
      const response = await api.post('/transactions/deposit', null, {
        params: { accountId, amount }
      });
      return response.data;
    } catch (error) {
      console.error('Deposit error:', error);
      throw new Error(error.response?.data || 'Deposit failed');
    }
  },

  withdraw: async (accountId, amount) => {
    try {
      const response = await api.post('/transactions/withdraw', null, {
        params: { accountId, amount }
      });
      return response.data;
    } catch (error) {
      console.error('Withdrawal error:', error);
      throw new Error(error.response?.data || 'Withdrawal failed');
    }
  },

  transfer: async (fromAccountId, toAccountId, amount) => {
    try {
      const response = await api.post('/transactions/transfer', null, {
        params: { fromAccountId, toAccountId, amount }
      });
      return response.data;
    } catch (error) {
      console.error('Transfer error:', error);
      throw new Error(error.response?.data || 'Transfer failed');
    }
  }
};

export const customerAPI = {
  getCustomerById: async (customerId) => {
    try {
      console.log('Fetching customer by ID:', customerId);
      const response = await api.get(`/customers/${customerId}`);
      console.log('Customer response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      console.error('Error details:', error.response?.data);
      return null;
    }
  },
  
  deleteCustomer: async (customerId) => {
    try {
      await api.delete(`/customers/${customerId}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw new Error(error.response?.data || 'Failed to delete customer');
    }
  }
};

export default api;