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

// API functions
export const authAPI = {
  login: async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@bankx.com' && password === 'admin123') {
      return {
        success: true,
        user: mockData.user,
        token: 'mock-jwt-token-' + Date.now()
      };
    }
    
    throw new Error('Invalid credentials');
  }
};

export const accountAPI = {
  getAccounts: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData.accounts;
  },
  
  getAccountById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.accounts.find(acc => acc.id === id);
  }
};

export const transactionAPI = {
  getTransactions: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let transactions = [...mockData.transactions];
    
    if (filters.type && filters.type !== 'ALL') {
      transactions = transactions.filter(t => t.type === filters.type);
    }
    
    if (filters.search) {
      transactions = transactions.filter(t => 
        t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.id.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    return transactions;
  },
  
  getTransactionById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.transactions.find(t => t.id === id);
  }
};

export const userAPI = {
  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.user;
  },
  
  updateProfile: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...mockData.user, ...userData };
  }
};

export default api;