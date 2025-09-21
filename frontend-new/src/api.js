import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

// Authentication API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Customer API
export const customerAPI = {
  getCustomerById: async (customerId) => {
    const response = await api.get(`/customers/${customerId}`);
    return response.data;
  },

  registerCustomer: async (customerData) => {
    const response = await api.post('/customers/register', customerData);
    return response.data;
  },

  deleteCustomer: async (customerId) => {
    const response = await api.delete(`/customers/${customerId}`);
    return response.data;
  }
};

// Account API
export const accountAPI = {
  getAccountsByCustomerId: async (customerId) => {
    const response = await api.get(`/accounts/customer/${customerId}`);
    return response.data;
  },

  getAccountById: async (accountId) => {
    const response = await api.get(`/accounts/${accountId}`);
    return response.data;
  },

  createAccount: async (customerId, accountType, initialBalance = 0) => {
    const response = await api.post(`/accounts/customer/${customerId}`, null, {
      params: { accountType, initialBalance }
    });
    return response.data;
  },

  updateAccountType: async (accountId, accountType) => {
    const response = await api.put(`/accounts/${accountId}/type`, null, {
      params: { accountType }
    });
    return response.data;
  },

  deleteAccount: async (accountId) => {
    const response = await api.delete(`/accounts/${accountId}`);
    return response.data;
  },

  getAccountByNumber: async (accountNumber) => {
    const response = await api.get(`/accounts/number/${accountNumber}`);
    return response.data;
  }
};

// Transaction API
export const transactionAPI = {
  getAllTransactions: async () => {
    const response = await api.get('/transactions');
    return response.data;
  },

  getTransactionByReference: async (referenceId) => {
    const response = await api.get(`/transactions/reference/${referenceId}`);
    return response.data;
  },

  getTransactionsByAccount: async (accountId) => {
    const response = await api.get(`/transactions/account/${accountId}`);
    return response.data;
  },

  deposit: async (accountId, amount) => {
    const response = await api.post('/transactions/deposit', null, {
      params: { accountId, amount }
    });
    return response.data;
  },

  withdraw: async (accountId, amount) => {
    const response = await api.post('/transactions/withdraw', null, {
      params: { accountId, amount }
    });
    return response.data;
  },

  transfer: async (fromAccountId, toAccountId, amount) => {
    const response = await api.post('/transactions/transfer', null, {
      params: { fromAccountId, toAccountId, amount }
    });
    return response.data;
  }
};

// Test API
export const testAPI = {
  healthCheck: async () => {
    const response = await api.get('/test/health');
    return response.data;
  },

  echo: async (data) => {
    const response = await api.post('/test/echo', data);
    return response.data;
  }
};

// Simple API
export const simpleAPI = {
  ping: async () => {
    const response = await api.get('/ping');
    return response.data;
  },

  echo: async (data) => {
    const response = await api.post('/echo', data);
    return response.data;
  }
};

export default api;
