import React, { useState } from 'react';
import { accountAPI } from '../../services/api';
import './AccountForm.css';

const AccountForm = ({ user, onAccountCreated, onClose }) => {
  const [formData, setFormData] = useState({
    accountType: 'SAVINGS',
    initialBalance: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const accountTypes = [
    { value: 'SAVINGS', label: 'Savings Account', description: 'Earn interest on your deposits' },
    { value: 'CURRENT', label: 'Current Account', description: 'For business and frequent transactions' },
    { value: 'WALLET', label: 'Digital Wallet', description: 'Quick payments and transfers' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const initialBalance = formData.initialBalance ? parseFloat(formData.initialBalance) : 0;
      
      const result = await accountAPI.createAccount(
        user.id,
        formData.accountType,
        initialBalance
      );
      
      setSuccess(`${formData.accountType} account created successfully! Account Number: ${result.accountNumber}`);
      
      // Reset form
      setFormData({
        accountType: 'SAVINGS',
        initialBalance: ''
      });
      
      if (onAccountCreated) {
        onAccountCreated(result);
      }
      
      // Close form after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-form-overlay">
      <div className="account-form-container">
        <div className="account-form-header">
          <h2>Create New Account</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="account-form-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Account Type</label>
              <div className="account-type-options">
                {accountTypes.map(type => (
                  <div 
                    key={type.value}
                    className={`account-type-option ${formData.accountType === type.value ? 'selected' : ''}`}
                    onClick={() => setFormData({...formData, accountType: type.value})}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value={type.value}
                      checked={formData.accountType === type.value}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <div className="account-type-info">
                      <h4>{type.label}</h4>
                      <p>{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="initialBalance">Initial Balance (₹) - Optional</label>
              <input
                type="number"
                id="initialBalance"
                name="initialBalance"
                value={formData.initialBalance}
                onChange={handleChange}
                placeholder="Enter initial deposit amount"
                min="0"
                step="0.01"
                disabled={loading}
              />
              <small className="form-help">Leave empty for zero balance account</small>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="create-button"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;