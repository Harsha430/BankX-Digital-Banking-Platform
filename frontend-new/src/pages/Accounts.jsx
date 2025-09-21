import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Plus, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2, 
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../AuthContext';
import { accountAPI } from '../api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Accounts = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, [user]);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const accountsData = await accountAPI.getAccountsByCustomerId(user?.id);
      setAccounts(accountsData);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      toast.error('Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (accountType, initialBalance) => {
    try {
      await accountAPI.createAccount(user?.id, accountType, initialBalance);
      toast.success('Account created successfully!');
      setShowCreateModal(false);
      fetchAccounts();
    } catch (error) {
      console.error('Error creating account:', error);
      toast.error('Failed to create account');
    }
  };

  const handleUpdateAccountType = async (accountId, newType) => {
    try {
      await accountAPI.updateAccountType(accountId, newType);
      toast.success('Account type updated successfully!');
      setShowEditModal(false);
      fetchAccounts();
    } catch (error) {
      console.error('Error updating account:', error);
      toast.error('Failed to update account type');
    }
  };

  const handleDeleteAccount = async (accountId) => {
    if (!window.confirm('Are you sure you want to delete this account?')) return;
    
    try {
      await accountAPI.deleteAccount(accountId);
      toast.success('Account deleted successfully!');
      fetchAccounts();
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + (account.balance || 0), 0);
  };

  if (loading) {
    return (
      <div className="accounts-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading your accounts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="accounts-page" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="header-content">
            <h1 className="page-title">My Accounts</h1>
            <p className="page-subtitle">Manage your bank accounts and view balances</p>
          </div>
          
          <div className="header-actions">
            <Button 
              variant="secondary" 
              icon={balanceVisible ? EyeOff : Eye}
              onClick={() => setBalanceVisible(!balanceVisible)}
            >
              {balanceVisible ? 'Hide' : 'Show'} Balances
            </Button>
            <Button 
              variant="primary" 
              icon={Plus}
              onClick={() => setShowCreateModal(true)}
            >
              New Account
            </Button>
          </div>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="summary-card">
            <div className="summary-content">
              <div className="summary-item">
                <div className="summary-icon">
                  <DollarSign size={24} />
                </div>
                <div className="summary-details">
                  <h3>Total Balance</h3>
                  <div className="summary-value">
                    {balanceVisible ? formatCurrency(getTotalBalance()) : '••••••'}
                  </div>
                </div>
              </div>
              
              <div className="summary-item">
                <div className="summary-icon">
                  <CreditCard size={24} />
                </div>
                <div className="summary-details">
                  <h3>Active Accounts</h3>
                  <div className="summary-value">{accounts.length}</div>
                </div>
              </div>
              
              <div className="summary-item">
                <div className="summary-icon">
                  <TrendingUp size={24} />
                </div>
                <div className="summary-details">
                  <h3>This Month</h3>
                  <div className="summary-value">+2.5%</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Accounts Grid */}
        <div className="accounts-grid">
          {accounts.length > 0 ? (
            accounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 2) }}
              >
                <Card className="account-card-detailed" style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '12px', overflow: 'hidden' }}>
                  <div className={`account-header bg-gradient-to-r ${getAccountTypeColor(account.accountType)}`} style={{ color: 'white', padding: '1.5rem' }}>
                    <div className="account-type-info" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="account-type-badge" style={{
                        color: 'white',
                        background: 'rgba(255, 255, 255, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        padding: '0.375rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {account.accountType}
                      </div>
                      <CreditCard size={24} className="account-icon" style={{ color: 'white' }} />
                    </div>

                    <div className="account-balance-section" style={{ textAlign: 'right' }}>
                      <div className="account-balance-large" style={{
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: '800',
                        marginBottom: '0.25rem',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                      }}>
                        {balanceVisible ? formatCurrency(account.balance || 0) : '••••••'}
                      </div>
                      <div className="account-number" style={{
                        color: 'white',
                        opacity: '0.9',
                        fontSize: '0.875rem',
                        fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                      }}>
                        •••• •••• •••• {account.accountNumber?.slice(-4) || '0000'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="account-body" style={{ background: '#1f2937 !important', color: '#f9fafb !important' }}>
                    <div className="account-details" style={{ color: '#f9fafb !important', background: 'transparent !important' }}>
                      <div className="detail-row" style={{ background: 'transparent !important' }}>
                        <span className="detail-label" style={{ color: '#d1d5db !important', fontWeight: '600 !important', background: 'transparent !important' }}>Account ID</span>
                        <span className="detail-value" style={{ color: '#ffffff !important', fontWeight: '700 !important', background: 'transparent !important' }}>{account.id}</span>
                      </div>
                      <div className="detail-row" style={{ background: 'transparent !important' }}>
                        <span className="detail-label" style={{ color: '#d1d5db !important', fontWeight: '600 !important', background: 'transparent !important' }}>Account Number</span>
                        <span className="detail-value" style={{ color: '#ffffff !important', fontWeight: '700 !important', background: 'transparent !important' }}>{account.accountNumber}</span>
                      </div>
                      <div className="detail-row" style={{ background: 'transparent !important' }}>
                        <span className="detail-label" style={{ color: '#d1d5db !important', fontWeight: '600 !important', background: 'transparent !important' }}>Type</span>
                        <span className="detail-value" style={{ color: '#ffffff !important', fontWeight: '700 !important', background: 'transparent !important' }}>{account.accountType}</span>
                      </div>
                    </div>
                    
                    <div className="account-actions" style={{ background: 'transparent !important' }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={Eye}
                        onClick={() => window.location.href = `/accounts/${account.id}`}
                        style={{
                          color: '#ffffff !important',
                          background: '#2563eb !important',
                          border: '1px solid #3b82f6 !important',
                          padding: '0.5rem 1rem !important'
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={Edit}
                        onClick={() => {
                          setSelectedAccount(account);
                          setShowEditModal(true);
                        }}
                        style={{
                          color: '#ffffff !important',
                          background: '#059669 !important',
                          border: '1px solid #10b981 !important',
                          padding: '0.5rem 1rem !important'
                        }}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="error" 
                        size="sm"
                        icon={Trash2}
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-state-full"
            >
              <Card className="empty-state-card">
                <div className="empty-icon">
                  <CreditCard size={64} />
                </div>
                <h3 className="empty-title">No Accounts Found</h3>
                <p className="empty-description">
                  You don't have any bank accounts yet. Create your first account to get started.
                </p>
                <Button 
                  variant="primary" 
                  icon={Plus}
                  onClick={() => setShowCreateModal(true)}
                >
                  Create First Account
                </Button>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Create Account Modal */}
        {showCreateModal && (
          <CreateAccountModal
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateAccount}
          />
        )}

        {/* Edit Account Modal */}
        {showEditModal && selectedAccount && (
          <EditAccountModal
            account={selectedAccount}
            onClose={() => setShowEditModal(false)}
            onUpdate={handleUpdateAccountType}
          />
        )}
      </div>
    </div>
  );
};

// Create Account Modal Component
const CreateAccountModal = ({ onClose, onCreate }) => {
  const [accountType, setAccountType] = useState('SAVINGS');
  const [initialBalance, setInitialBalance] = useState('');
  const [loading, setLoading] = useState(false);

  const accountTypes = [
    { value: 'SAVINGS', label: 'Savings Account', desc: 'Earn interest on your deposits' },
    { value: 'CURRENT', label: 'Current Account', desc: 'For daily transactions and business' },
    { value: 'CHECKING', label: 'Checking Account', desc: 'Easy access with debit card' },
    { value: 'BUSINESS', label: 'Business Account', desc: 'For business transactions' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onCreate(accountType, parseFloat(initialBalance) || 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="modal-header">
          <h2>Create New Account</h2>
          <Button variant="secondary" size="sm" onClick={onClose}>×</Button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Account Type</label>
            <div className="account-type-grid">
              {accountTypes.map((type) => (
                <div 
                  key={type.value}
                  className={`account-type-option ${accountType === type.value ? 'selected' : ''}`}
                  onClick={() => setAccountType(type.value)}
                >
                  <h4>{type.label}</h4>
                  <p>{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Initial Balance (Optional)</label>
            <input
              type="number"
              className="form-input"
              placeholder="0.00"
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="modal-actions">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit" loading={loading}>
              Create Account
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Edit Account Modal Component
const EditAccountModal = ({ account, onClose, onUpdate }) => {
  const [accountType, setAccountType] = useState(account.accountType);
  const [loading, setLoading] = useState(false);

  const accountTypes = ['SAVINGS', 'CURRENT', 'CHECKING', 'BUSINESS'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onUpdate(account.id, accountType);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="modal-header">
          <h2>Edit Account Type</h2>
          <Button variant="secondary" size="sm" onClick={onClose}>×</Button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Account Type</label>
            <select
              className="form-input"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              {accountTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="modal-actions">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit" loading={loading}>
              Update Account
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Accounts;
