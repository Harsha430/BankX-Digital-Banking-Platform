import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Filter, 
  Download, 
  Search,
  Calendar,
  DollarSign,
  CreditCard,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../AuthContext';
import { transactionAPI, accountAPI } from '../api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState('deposit');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [accountsData] = await Promise.all([
        accountAPI.getAccountsByCustomerId(user?.id)
      ]);
      setAccounts(accountsData);
      
      // Fetch transactions for all accounts
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
        setTransactions(allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleTransaction = async (type, accountId, amount, toAccountId = null) => {
    try {
      let result;
      switch (type) {
        case 'deposit':
          result = await transactionAPI.deposit(accountId, amount);
          break;
        case 'withdraw':
          result = await transactionAPI.withdraw(accountId, amount);
          break;
        case 'transfer':
          result = await transactionAPI.transfer(accountId, toAccountId, amount);
          break;
        default:
          throw new Error('Invalid transaction type');
      }
      
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);
      setShowTransactionModal(false);
      fetchData();
    } catch (error) {
      console.error('Transaction error:', error);
      toast.error(error.response?.data || `${type} failed`);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'CREDIT':
        return <ArrowUpRight className="text-green-600" size={20} />;
      case 'DEBIT':
        return <ArrowDownLeft className="text-red-600" size={20} />;
      case 'TRANSFER':
        return <ArrowUpRight className="text-blue-600" size={20} />;
      default:
        return <DollarSign size={20} />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.referenceId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.amount?.toString().includes(searchTerm);
    const matchesFilter = filterType === 'all' || transaction.type === filterType.toUpperCase();
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="transactions-page" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)', minHeight: '100vh' }}>
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading transactions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="transactions-page" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="header-content">
            <h1 className="page-title">Transactions</h1>
            <p className="page-subtitle">View and manage your transaction history</p>
          </div>
          
          <div className="header-actions">
            <Button 
              variant="secondary" 
              icon={RefreshCw}
              onClick={fetchData}
            >
              Refresh
            </Button>
            <Button 
              variant="primary" 
              icon={Plus}
              onClick={() => setShowTransactionModal(true)}
            >
              New Transaction
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="stats-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="stat-card-small">
            <div className="stat-content">
              <ArrowUpRight className="stat-icon text-green-600" size={24} />
              <div>
                <div className="stat-value">
                  {transactions.filter(t => t.type === 'CREDIT').length}
                </div>
                <div className="stat-label">Credits</div>
              </div>
            </div>
          </Card>
          
          <Card className="stat-card-small">
            <div className="stat-content">
              <ArrowDownLeft className="stat-icon text-red-600" size={24} />
              <div>
                <div className="stat-value">
                  {transactions.filter(t => t.type === 'DEBIT').length}
                </div>
                <div className="stat-label">Debits</div>
              </div>
            </div>
          </Card>
          
          <Card className="stat-card-small">
            <div className="stat-content">
              <ArrowUpRight className="stat-icon text-blue-600" size={24} />
              <div>
                <div className="stat-value">
                  {transactions.filter(t => t.type === 'TRANSFER').length}
                </div>
                <div className="stat-label">Transfers</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="filters-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="filters-card">
            <div className="filters-content">
              <div className="search-box">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterType('all')}
                >
                  All
                </button>
                <button
                  className={`filter-btn ${filterType === 'credit' ? 'active' : ''}`}
                  onClick={() => setFilterType('credit')}
                >
                  Credits
                </button>
                <button
                  className={`filter-btn ${filterType === 'debit' ? 'active' : ''}`}
                  onClick={() => setFilterType('debit')}
                >
                  Debits
                </button>
                <button
                  className={`filter-btn ${filterType === 'transfer' ? 'active' : ''}`}
                  onClick={() => setFilterType('transfer')}
                >
                  Transfers
                </button>
              </div>
              
              <Button variant="secondary" icon={Download} size="sm">
                Export
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          className="transactions-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="transactions-card">
            {filteredTransactions.length > 0 ? (
              <div className="transactions-list">
                {filteredTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id || index}
                    className="transaction-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <div className="transaction-icon">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    
                    <div className="transaction-details">
                      <div className="transaction-main">
                        <span className="transaction-type">
                          {transaction.type}
                        </span>
                        <span className="transaction-reference">
                          Ref: {transaction.referenceId}
                        </span>
                      </div>
                      <div className="transaction-meta">
                        <span className="transaction-date">
                          {formatDate(transaction.createdAt)}
                        </span>
                        <span className="transaction-status">
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="transaction-accounts">
                      {transaction.fromAccount && (
                        <div className="account-info">
                          <span className="account-label">From:</span>
                          <span className="account-number">
                            ****{transaction.fromAccount.accountNumber?.slice(-4)}
                          </span>
                        </div>
                      )}
                      {transaction.toAccount && (
                        <div className="account-info">
                          <span className="account-label">To:</span>
                          <span className="account-number">
                            ****{transaction.toAccount.accountNumber?.slice(-4)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`transaction-amount ${transaction.type.toLowerCase()}`}>
                      {transaction.type === 'CREDIT' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <CreditCard size={48} />
                </div>
                <h3 className="empty-title">No Transactions Found</h3>
                <p className="empty-description">
                  {searchTerm || filterType !== 'all' 
                    ? 'No transactions match your current filters.'
                    : 'You haven\'t made any transactions yet. Start by making a deposit or transfer.'
                  }
                </p>
                {!searchTerm && filterType === 'all' && (
                  <Button 
                    variant="primary" 
                    icon={Plus}
                    onClick={() => setShowTransactionModal(true)}
                  >
                    Make First Transaction
                  </Button>
                )}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Transaction Modal */}
        {showTransactionModal && (
          <TransactionModal
            accounts={accounts}
            onClose={() => setShowTransactionModal(false)}
            onTransaction={handleTransaction}
          />
        )}
      </div>
    </div>
  );
};

// Transaction Modal Component
const TransactionModal = ({ accounts, onClose, onTransaction }) => {
  const [type, setType] = useState('deposit');
  const [fromAccount, setFromAccount] = useState(accounts.length > 0 ? accounts[0].id.toString() : '');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Set default from account when accounts are available
  useEffect(() => {
    if (accounts.length > 0 && !fromAccount) {
      setFromAccount(accounts[0].id.toString());
    }
  }, [accounts, fromAccount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!fromAccount && (type === 'withdraw' || type === 'transfer')) {
      toast.error('Please select a source account');
      return;
    }

    if (!toAccount && (type === 'deposit' || type === 'transfer')) {
      toast.error(type === 'deposit' ? 'Please select a destination account' : 'Please enter recipient account number');
      return;
    }

    setLoading(true);
    try {
      let toAccountId = toAccount;

      // For transfers, if toAccount is an account number (string), find the account ID
      if (type === 'transfer' && isNaN(toAccount)) {
        try {
          const account = await accountAPI.getAccountByNumber(toAccount);
          toAccountId = account.id;
        } catch (error) {
          toast.error('Recipient account not found');
          setLoading(false);
          return;
        }
      }

      await onTransaction(
        type,
        type === 'deposit' ? toAccount : fromAccount,
        parseFloat(amount),
        type === 'transfer' ? toAccountId : null
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal-content large"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="modal-header">
          <h2>New Transaction</h2>
          <Button variant="secondary" size="sm" onClick={onClose}>×</Button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Transaction Type</label>
            <div className="transaction-type-tabs">
              <button
                type="button"
                className={`tab-btn ${type === 'deposit' ? 'active' : ''}`}
                onClick={() => setType('deposit')}
              >
                <ArrowUpRight size={16} />
                Deposit
              </button>
              <button
                type="button"
                className={`tab-btn ${type === 'withdraw' ? 'active' : ''}`}
                onClick={() => setType('withdraw')}
              >
                <ArrowDownLeft size={16} />
                Withdraw
              </button>
              <button
                type="button"
                className={`tab-btn ${type === 'transfer' ? 'active' : ''}`}
                onClick={() => setType('transfer')}
              >
                <ArrowUpRight size={16} />
                Transfer
              </button>
            </div>
          </div>
          
          {(type === 'withdraw' || type === 'transfer') && (
            <div className="form-group">
              <label className="form-label">From Account</label>
              <select
                className="form-input"
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
                required
              >
                <option value="">Select account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.accountType} - ****{account.accountNumber?.slice(-4)} 
                    (${account.balance?.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {type === 'deposit' && (
            <div className="form-group">
              <label className="form-label">To Account</label>
              <select
                className="form-input"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                required
              >
                <option value="">Select account</option>
                {accounts.map((account) => (
                  <option
                    key={account.id}
                    value={account.id}
                  >
                    {account.accountType} - ****{account.accountNumber?.slice(-4)} ($${account.balance?.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
          )}

          {type === 'transfer' && (
            <div className="form-group">
              <label className="form-label">To Account Number</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter recipient account number"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                required
              />
              <small className="form-help">Enter the full account number of the recipient</small>
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0.01"
              step="0.01"
              required
            />
          </div>
          
          <div className="modal-actions">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit" loading={loading}>
              {type === 'deposit' ? 'Deposit' : type === 'withdraw' ? 'Withdraw' : 'Transfer'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Transactions;
