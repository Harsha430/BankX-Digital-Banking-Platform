import React, { useState, useEffect } from 'react';
import { transactionAPI, accountAPI } from '../../services/api';
import './TransactionForm.css';

const TransactionForm = ({ user, onTransactionComplete, onClose }) => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [depositForm, setDepositForm] = useState({
    accountId: '',
    amount: ''
  });

  const [withdrawForm, setWithdrawForm] = useState({
    accountId: '',
    amount: ''
  });

  const [transferForm, setTransferForm] = useState({
    fromAccountId: '',
    toAccountId: '',
    amount: ''
  });

  useEffect(() => {
    loadAccounts();
  }, [user]);

  const loadAccounts = async () => {
    try {
      const userAccounts = await accountAPI.getAccountsByCustomer(user.id);
      setAccounts(userAccounts);
      
      // Set default account if available
      if (userAccounts.length > 0) {
        setDepositForm(prev => ({ ...prev, accountId: userAccounts[0].id }));
        setWithdrawForm(prev => ({ ...prev, accountId: userAccounts[0].id }));
        setTransferForm(prev => ({ ...prev, fromAccountId: userAccounts[0].id }));
      }
    } catch (error) {
      console.error('Error loading accounts:', error);
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await transactionAPI.deposit(
        parseInt(depositForm.accountId),
        parseFloat(depositForm.amount)
      );
      
      setSuccess(`Deposit successful! Transaction ID: ${result.referenceId || 'N/A'}`);
      setDepositForm({ accountId: depositForm.accountId, amount: '' });
      
      if (onTransactionComplete) {
        onTransactionComplete(result);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await transactionAPI.withdraw(
        parseInt(withdrawForm.accountId),
        parseFloat(withdrawForm.amount)
      );
      
      setSuccess(`Withdrawal successful! Transaction ID: ${result.referenceId || 'N/A'}`);
      setWithdrawForm({ accountId: withdrawForm.accountId, amount: '' });
      
      if (onTransactionComplete) {
        onTransactionComplete(result);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await transactionAPI.transfer(
        parseInt(transferForm.fromAccountId),
        parseInt(transferForm.toAccountId),
        parseFloat(transferForm.amount)
      );
      
      setSuccess(`Transfer successful! Transaction ID: ${result.referenceId || 'N/A'}`);
      setTransferForm({ 
        fromAccountId: transferForm.fromAccountId, 
        toAccountId: '', 
        amount: '' 
      });
      
      if (onTransactionComplete) {
        onTransactionComplete(result);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatAccountDisplay = (account) => {
    return `${account.accountType} - ****${account.accountNumber?.slice(-4) || account.id} (₹${account.balance?.toFixed(2) || '0.00'})`;
  };

  return (
    <div className="transaction-form-overlay">
      <div className="transaction-form-container">
        <div className="transaction-form-header">
          <h2>New Transaction</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="transaction-tabs">
          <button 
            className={`tab-button ${activeTab === 'deposit' ? 'active' : ''}`}
            onClick={() => setActiveTab('deposit')}
          >
            Deposit
          </button>
          <button 
            className={`tab-button ${activeTab === 'withdraw' ? 'active' : ''}`}
            onClick={() => setActiveTab('withdraw')}
          >
            Withdraw
          </button>
          <button 
            className={`tab-button ${activeTab === 'transfer' ? 'active' : ''}`}
            onClick={() => setActiveTab('transfer')}
          >
            Transfer
          </button>
        </div>

        <div className="transaction-form-content">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {activeTab === 'deposit' && (
            <form onSubmit={handleDeposit}>
              <div className="form-group">
                <label>Deposit To Account</label>
                <select
                  value={depositForm.accountId}
                  onChange={(e) => setDepositForm({...depositForm, accountId: e.target.value})}
                  required
                  disabled={loading}
                >
                  <option value="">Select Account</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {formatAccountDisplay(account)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Amount (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={depositForm.amount}
                  onChange={(e) => setDepositForm({...depositForm, amount: e.target.value})}
                  placeholder="Enter amount"
                  required
                  disabled={loading}
                />
              </div>

              <button type="submit" className="transaction-button" disabled={loading}>
                {loading ? 'Processing...' : 'Deposit Money'}
              </button>
            </form>
          )}

          {activeTab === 'withdraw' && (
            <form onSubmit={handleWithdraw}>
              <div className="form-group">
                <label>Withdraw From Account</label>
                <select
                  value={withdrawForm.accountId}
                  onChange={(e) => setWithdrawForm({...withdrawForm, accountId: e.target.value})}
                  required
                  disabled={loading}
                >
                  <option value="">Select Account</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {formatAccountDisplay(account)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Amount (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={withdrawForm.amount}
                  onChange={(e) => setWithdrawForm({...withdrawForm, amount: e.target.value})}
                  placeholder="Enter amount"
                  required
                  disabled={loading}
                />
              </div>

              <button type="submit" className="transaction-button withdraw" disabled={loading}>
                {loading ? 'Processing...' : 'Withdraw Money'}
              </button>
            </form>
          )}

          {activeTab === 'transfer' && (
            <form onSubmit={handleTransfer}>
              <div className="form-group">
                <label>From Account</label>
                <select
                  value={transferForm.fromAccountId}
                  onChange={(e) => setTransferForm({...transferForm, fromAccountId: e.target.value})}
                  required
                  disabled={loading}
                >
                  <option value="">Select Source Account</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {formatAccountDisplay(account)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>To Account</label>
                <select
                  value={transferForm.toAccountId}
                  onChange={(e) => setTransferForm({...transferForm, toAccountId: e.target.value})}
                  required
                  disabled={loading}
                >
                  <option value="">Select Destination Account</option>
                  {accounts
                    .filter(account => account.id !== parseInt(transferForm.fromAccountId))
                    .map(account => (
                    <option key={account.id} value={account.id}>
                      {formatAccountDisplay(account)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Amount (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={transferForm.amount}
                  onChange={(e) => setTransferForm({...transferForm, amount: e.target.value})}
                  placeholder="Enter amount"
                  required
                  disabled={loading}
                />
              </div>

              <button type="submit" className="transaction-button transfer" disabled={loading}>
                {loading ? 'Processing...' : 'Transfer Money'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;