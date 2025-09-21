import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  CreditCard, 
  Wallet, 
  PiggyBank,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Settings,
  Lock,
  Unlock
} from 'lucide-react';
import { accountAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AccountForm from './accounts/AccountForm';
import LoadingSpinner from './LoadingSpinner';
import anime from 'animejs';
import './Accounts.css';

const Accounts = () => {
  const [showBalances, setShowBalances] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const accountsData = await accountAPI.getAccountsByCustomer(user.id);
        setAccounts(accountsData);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [user]);

  const handleAccountCreated = (newAccount) => {
    setAccounts(prev => [...prev, newAccount]);
    setShowAccountForm(false);
  };

  useEffect(() => {
    if (!loading && accounts.length > 0) {
      // Animate account cards
      anime({
        targets: '.account-card',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        duration: 800,
        easing: 'easeOutExpo'
      });

      // Animate floating elements
      anime({
        targets: '.floating-icon',
        translateY: [-10, 10],
        rotate: [0, 5, -5, 0],
        duration: 4000,
        loop: true,
        easing: 'easeInOutSine',
        delay: anime.stagger(1000)
      });
    }
  }, [loading, accounts]);

  const getAccountIcon = (type) => {
    switch (type) {
      case 'SAVINGS':
        return <PiggyBank size={24} />;
      case 'CURRENT':
        return <CreditCard size={24} />;
      case 'WALLET':
        return <Wallet size={24} />;
      default:
        return <CreditCard size={24} />;
    }
  };

  const formatBalance = (balance) => {
    return showBalances ? `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••';
  };

  const getAccountTypeLabel = (type) => {
    switch (type) {
      case 'SAVINGS':
        return 'Savings Account';
      case 'CURRENT':
        return 'Current Account';
      case 'WALLET':
        return 'Digital Wallet';
      default:
        return 'Account';
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" text="Loading your accounts..." />;
  }

  return (
    <div className="accounts-page">
      {/* Floating Background Elements */}
      <div className="floating-elements">
        <div className="floating-icon icon-1">
          <CreditCard size={40} />
        </div>
        <div className="floating-icon icon-2">
          <PiggyBank size={35} />
        </div>
        <div className="floating-icon icon-3">
          <Wallet size={30} />
        </div>
      </div>

      {/* Header */}
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <h1 className="gradient-text">My Accounts</h1>
          <p className="header-subtitle">Manage your financial accounts</p>
        </div>
        <div className="header-actions">
          <motion.button 
            className="visibility-toggle"
            onClick={() => setShowBalances(!showBalances)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showBalances ? <EyeOff size={18} /> : <Eye size={18} />}
            {showBalances ? 'Hide' : 'Show'} Balances
          </motion.button>
          <motion.button 
            className="action-btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAccountForm(true)}
          >
            <Plus size={18} />
            Add Account
          </motion.button>
        </div>
      </motion.div>

      {/* Account Summary */}
      <motion.div 
        className="account-summary"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="summary-card total-balance">
          <div className="summary-header">
            <h3>Total Balance</h3>
            <div className="balance-trend positive">
              <ArrowUpRight size={16} />
              <span>+5.2%</span>
            </div>
          </div>
          <div className="summary-value">
            ₹{formatBalance(accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0))}
          </div>
          <p>Across all accounts</p>
        </div>

        <div className="summary-card active-accounts">
          <div className="summary-header">
            <h3>Active Accounts</h3>
            <div className="status-indicator active">
              <div className="status-dot"></div>
              All Active
            </div>
          </div>
          <div className="summary-value">{accounts.length}</div>
          <p>All verified & secured</p>
        </div>

        <div className="summary-card monthly-activity">
          <div className="summary-header">
            <h3>Monthly Activity</h3>
            <div className="activity-trend">
              <ArrowUpRight size={16} />
              <span>This month</span>
            </div>
          </div>
          <div className="summary-value">
            {accounts.reduce((sum, acc) => sum + (acc.monthlyTransactions || 0), 0)}
          </div>
          <p>This month</p>
        </div>
      </motion.div>

      {/* Accounts Grid */}
      <motion.div 
        className="accounts-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {accounts.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '60px 20px',
            background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
            borderRadius: '16px',
            margin: '20px 0'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏦</div>
            <h3 style={{ color: '#4338ca', marginBottom: '16px' }}>No Accounts Yet</h3>
            <p style={{ color: '#6366f1', marginBottom: '24px' }}>
              Create your first bank account to start your digital banking journey!
            </p>
            <motion.button 
              className="action-btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAccountForm(true)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Plus size={18} style={{ marginRight: '8px' }} />
              Create Your First Account
            </motion.button>
          </div>
        ) : (
          accounts.map((account, index) => (
          <motion.div 
            key={account.id}
            className={`account-card ${account.cardColor}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -8 }}
            onClick={() => setSelectedAccount(account)}
          >
            {/* Card Background Effects */}
            <div className="card-bg-effects">
              <div className="card-gradient-1"></div>
              <div className="card-gradient-2"></div>
            </div>

            {/* Card Header */}
            <div className="card-header">
              <div className="account-type">
                <div className="account-icon">
                  {getAccountIcon(account.type)}
                </div>
                <div className="account-info">
                  <h4>{account.accountName}</h4>
                  <span>{getAccountTypeLabel(account.type)}</span>
                </div>
              </div>
              <div className="card-menu">
                <MoreVertical size={20} />
              </div>
            </div>

            {/* Account Number */}
            <div className="account-number">
              <span className="number-label">Account Number</span>
              <span className="number-value">{account.accountNumber}</span>
            </div>

            {/* Balance */}
            <div className="account-balance">
              <span className="balance-label">Available Balance</span>
              <div className="balance-value">
                {formatBalance(account.balance)}
              </div>
            </div>

            {/* Card Details */}
            <div className="card-details">
              <div className="detail-item">
                <span className="detail-label">Interest Rate</span>
                <span className="detail-value">{account.interestRate}% APY</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Transaction</span>
                <span className="detail-value">{account.lastTransaction}</span>
              </div>
            </div>

            {/* Card Actions */}
            <div className="card-actions">
              <motion.button 
                className="card-action-btn transfer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUpRight size={16} />
                Transfer
              </motion.button>
              <motion.button 
                className="card-action-btn settings"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings size={16} />
                Settings
              </motion.button>
            </div>

            {/* Security Status */}
            <div className="security-status">
              <Lock size={14} />
              <span>Secured with 256-bit encryption</span>
            </div>

            {/* Card Glow Effect */}
            <div className="card-glow"></div>
          </motion.div>
          ))
        )}

        {/* Add New Account Card - only show if user has accounts */}
        {accounts.length > 0 && (
        <motion.div 
          className="account-card add-account"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -8 }}
        >
          <div className="add-account-content">
            <div className="add-icon">
              <Plus size={32} />
            </div>
            <h4>Open New Account</h4>
            <p>Start your journey with a new account</p>
            <motion.button 
              className="add-account-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAccountForm(true)}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="quick-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <motion.button 
            className="quick-action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUpRight size={20} />
            <span>Transfer Money</span>
          </motion.button>
          <motion.button 
            className="quick-action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CreditCard size={20} />
            <span>Request Card</span>
          </motion.button>
          <motion.button 
            className="quick-action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings size={20} />
            <span>Account Settings</span>
          </motion.button>
          <motion.button 
            className="quick-action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lock size={20} />
            <span>Security Center</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Account Form Modal */}
      {showAccountForm && (
        <AccountForm
          user={user}
          onAccountCreated={handleAccountCreated}
          onClose={() => setShowAccountForm(false)}
        />
      )}
    </div>
  );
};

export default Accounts;