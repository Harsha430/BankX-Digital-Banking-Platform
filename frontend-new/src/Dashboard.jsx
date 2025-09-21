import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  TrendingUp,
  DollarSign,
  Eye,
  EyeOff,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Filter,
  Download,
  Wallet,
  PieChart,
  BarChart3,
  Activity,
  Settings,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { accountAPI, transactionAPI } from './api';
import Card from './components/ui/Card';
import Button from './components/ui/Button';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for user:', user?.id);
        const accountsData = await accountAPI.getAccountsByCustomerId(user?.id);
        setAccounts(accountsData);

        // Fetch transactions for all user accounts
        if (accountsData.length > 0) {
          const allTransactions = [];
          for (const account of accountsData) {
            try {
              const accountTransactions = await transactionAPI.getTransactionsByAccount(account.id);
              allTransactions.push(...accountTransactions);
            } catch (error) {
              console.log(`No transactions found for account ${account.id}`);
            }
          }
          // Sort transactions by date (newest first) and take only recent ones
          const sortedTransactions = allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setTransactions(sortedTransactions.slice(0, 5)); // Show only 5 most recent
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user]);



  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + (account.balance || 0), 0);
  };

  const getAccountTypeColor = (type) => {
    const colors = {
      SAVINGS: 'from-emerald-500 to-emerald-600',
      CURRENT: 'from-blue-500 to-blue-600',
      CHECKING: 'from-purple-500 to-purple-600',
      BUSINESS: 'from-orange-500 to-orange-600'
    };
    return colors[type] || 'from-gray-500 to-gray-600';
  };

  // Helper functions for transaction display
  const getTransactionType = (transaction) => {
    if (transaction.type === 'CREDIT') return 'credit';
    if (transaction.type === 'DEBIT') return 'debit';
    if (transaction.type === 'TRANSFER') return 'debit'; // Transfers are outgoing from user perspective
    return 'debit';
  };

  const getTransactionDescription = (transaction) => {
    switch (transaction.type) {
      case 'CREDIT':
        return 'Money Received';
      case 'DEBIT':
        return 'Money Sent';
      case 'TRANSFER':
        return 'Transfer';
      default:
        return 'Transaction';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)', minHeight: '100vh' }}>

      <div className="dashboard-container">
        {/* Welcome Section */}
        <motion.div
          className="welcome-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="welcome-content">
            <h1 className="welcome-title">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="welcome-subtitle">
              Here's what's happening with your accounts today.
            </p>
          </div>

          <div className="quick-actions">
            <Button variant="primary" icon={Plus} size="sm">New Transfer</Button>
            <Button variant="secondary" icon={Download} size="sm">Export</Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="stat-card total-balance">
            <div className="stat-header">
              <div className="stat-icon">
                <Wallet size={24} />
              </div>
              <Button
                variant="secondary"
                size="sm"
                icon={balanceVisible ? EyeOff : Eye}
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="visibility-toggle"
              />
            </div>
            <div className="stat-content">
              <h3 className="stat-label">Total Balance</h3>
              <div className="stat-value">
                {balanceVisible ? formatCurrency(getTotalBalance()) : '••••••'}
              </div>
              <div className="stat-change positive">
                <TrendingUp size={16} />
                <span>+2.5% from last month</span>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-header">
              <div className="stat-icon income">
                <ArrowUpRight size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3 className="stat-label">Monthly Income</h3>
              <div className="stat-value">{formatCurrency(2700)}</div>
              <div className="stat-change positive">
                <span>+12% from last month</span>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-header">
              <div className="stat-icon expense">
                <ArrowDownLeft size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3 className="stat-label">Monthly Expenses</h3>
              <div className="stat-value">{formatCurrency(1425)}</div>
              <div className="stat-change negative">
                <span>+8% from last month</span>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-header">
              <div className="stat-icon savings">
                <PieChart size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3 className="stat-label">Savings Rate</h3>
              <div className="stat-value">47%</div>
              <div className="stat-change positive">
                <span>+3% from last month</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="dashboard-main">
          {/* Accounts Section */}
          <motion.div
            className="accounts-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="section-card">
              <div className="section-header">
                <h2 className="section-title">Your Accounts</h2>
                <Button variant="secondary" size="sm" icon={Plus}>Add Account</Button>
              </div>

              {loading && (
                <div className="loading-state">
                  <div className="loading-spinner" />
                  <p>Loading your accounts...</p>
                </div>
              )}

              {error && (
                <div className="error-state">
                  <div className="error-message">{error}</div>
                  <Button variant="primary" size="sm" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              )}

              {!loading && !error && (
                <div className="accounts-list">
                  {accounts.length > 0 ? (
                    accounts.map((account, index) => (
                      <motion.div
                        key={account.id}
                        className="account-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className={`account-card-modern bg-gradient-to-r ${getAccountTypeColor(account.accountType)}`} style={{ color: 'white' }}>
                          <div className="account-header">
                            <div className="account-type-badge" style={{ color: 'white', background: 'rgba(255, 255, 255, 0.25)', border: '1px solid rgba(255, 255, 255, 0.4)', padding: '0.375rem 0.75rem', borderRadius: '6px', fontWeight: '700' }}>
                              {account.accountType}
                            </div>
                            <CreditCard size={24} className="account-icon" style={{ color: 'white' }} />
                          </div>

                          <div className="account-balance-section">
                            <div className="account-balance-large" style={{ color: 'white', fontSize: '2rem', fontWeight: '800', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
                              {balanceVisible ? formatCurrency(account.balance || 0) : '••••••'}
                            </div>
                            <div className="account-number" style={{ color: 'white', opacity: '0.9', fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
                              •••• •••• •••• {account.accountNumber?.slice(-4) || '0000'}
                            </div>
                          </div>

                          <div className="account-actions">
                            <Button variant="secondary" size="sm">Transfer</Button>
                            <Button variant="secondary" size="sm">Details</Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">
                        <Wallet size={48} />
                      </div>
                      <h3 className="empty-title">No accounts found</h3>
                      <p className="empty-description">
                        It looks like you don't have any accounts yet. Contact support to set up your first account.
                      </p>
                      <Button variant="primary" icon={Plus}>Contact Support</Button>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            className="transactions-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="section-card">
              <div className="section-header">
                <h2 className="section-title">Recent Transactions</h2>
                <div className="section-actions">
                  <Button variant="secondary" size="sm" icon={Filter}>Filter</Button>
                  <Button variant="secondary" size="sm" icon={Calendar}>
                    {selectedPeriod === '7d' ? 'Last 7 days' :
                     selectedPeriod === '30d' ? 'Last 30 days' : 'Last 90 days'}
                  </Button>
                </div>
              </div>

              <div className="transactions-list">
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      className="transaction-item"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="transaction-icon">
                        {getTransactionType(transaction) === 'credit' ? (
                          <ArrowUpRight size={20} className="credit-icon" />
                        ) : (
                          <ArrowDownLeft size={20} className="debit-icon" />
                        )}
                      </div>

                      <div className="transaction-details">
                        <div className="transaction-description">
                          {getTransactionDescription(transaction)}
                        </div>
                        <div className="transaction-meta">
                          <span className="transaction-date">{formatDate(transaction.createdAt)}</span>
                          <span className="transaction-category">Ref: {transaction.referenceId}</span>
                        </div>
                      </div>

                      <div className={`transaction-amount ${getTransactionType(transaction)}`}>
                        {getTransactionType(transaction) === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="no-transactions" style={{
                    textAlign: 'center',
                    padding: '2rem',
                    color: '#9ca3af'
                  }}>
                    <p>No recent transactions found</p>
                  </div>
                )}
              </div>

              <div className="section-footer">
                <Button variant="secondary" className="view-all-btn">
                  View All Transactions
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* User Profile Section */}
        <motion.div
          className="profile-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="profile-card">
            <div className="profile-header">
              <h2 className="section-title">Account Information</h2>
              <Button variant="secondary" size="sm" icon={Settings}>Edit Profile</Button>
            </div>

            <div className="profile-content">
              <div className="profile-avatar-section">
                <div className="profile-avatar-large">
                  <User size={32} />
                </div>
                <div className="profile-basic">
                  <h3 className="profile-name">{user?.name}</h3>
                  <p className="profile-email">{user?.email}</p>
                  <span className="profile-status">Verified Account</span>
                </div>
              </div>

              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Customer ID</span>
                  <span className="detail-value">{user?.id}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Account Type</span>
                  <span className="detail-value">Premium Customer</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Member Since</span>
                  <span className="detail-value">January 2024</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Login</span>
                  <span className="detail-value">Today, {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
