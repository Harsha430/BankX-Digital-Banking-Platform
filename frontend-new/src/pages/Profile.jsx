import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Shield, 
  Calendar,
  CreditCard,
  Activity,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../AuthContext';
import { customerAPI, accountAPI } from '../api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Profile = () => {
  const { user } = useAuth();
  const [customerData, setCustomerData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    fetchCustomerData();
  }, [user]);

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      const [customer, accountsData] = await Promise.all([
        customerAPI.getCustomerById(user?.id),
        accountAPI.getAccountsByCustomerId(user?.id)
      ]);
      
      setCustomerData(customer);
      setAccounts(accountsData);
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        address: customer.address || ''
      });
    } catch (error) {
      console.error('Error fetching customer data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      name: customerData.name || '',
      email: customerData.email || '',
      phone: customerData.phone || '',
      address: customerData.address || ''
    });
  };

  const handleSave = async () => {
    try {
      // Note: The backend doesn't have an update customer endpoint in CustomerController
      // This would need to be added to the backend
      toast.info('Profile update feature coming soon!');
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getKycStatusColor = (status) => {
    switch (status) {
      case 'VERIFIED':
        return 'text-green-600 bg-green-100';
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100';
      case 'REJECTED':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + (account.balance || 0), 0);
  };

  if (loading) {
    return (
      <div className="profile-page" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)', minHeight: '100vh' }}>
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="header-content">
            <h1 className="page-title">My Profile</h1>
            <p className="page-subtitle">Manage your personal information and account settings</p>
          </div>
          
          <div className="header-actions">
            {editing ? (
              <>
                <Button variant="secondary" icon={X} onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="primary" icon={Save} onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="primary" icon={Edit} onClick={handleEdit}>
                Edit Profile
              </Button>
            )}
          </div>
        </motion.div>

        <div className="profile-grid">
          {/* Main Profile Card */}
          <motion.div
            className="profile-main"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  <User size={48} />
                </div>
                <div className="profile-info">
                  <h2 className="profile-name">{customerData?.name}</h2>
                  <p className="profile-email">{customerData?.email}</p>
                  <div className={`kyc-status ${getKycStatusColor(customerData?.kycStatus)}`}>
                    <Shield size={16} />
                    KYC {customerData?.kycStatus}
                  </div>
                </div>
              </div>

              <div className="profile-details">
                <div className="detail-section">
                  <h3 className="section-title">Personal Information</h3>
                  
                  <div className="detail-grid">
                    <div className="detail-item">
                      <div className="detail-icon">
                        <User size={20} />
                      </div>
                      <div className="detail-content">
                        <label className="detail-label">Full Name</label>
                        {editing ? (
                          <input
                            type="text"
                            className="form-input"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        ) : (
                          <span className="detail-value">{customerData?.name}</span>
                        )}
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-icon">
                        <Mail size={20} />
                      </div>
                      <div className="detail-content">
                        <label className="detail-label">Email Address</label>
                        {editing ? (
                          <input
                            type="email"
                            className="form-input"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        ) : (
                          <span className="detail-value">{customerData?.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-icon">
                        <Phone size={20} />
                      </div>
                      <div className="detail-content">
                        <label className="detail-label">Phone Number</label>
                        {editing ? (
                          <input
                            type="tel"
                            className="form-input"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        ) : (
                          <span className="detail-value">{customerData?.phone || 'Not provided'}</span>
                        )}
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-icon">
                        <MapPin size={20} />
                      </div>
                      <div className="detail-content">
                        <label className="detail-label">Address</label>
                        {editing ? (
                          <textarea
                            className="form-input"
                            rows="3"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                          />
                        ) : (
                          <span className="detail-value">{customerData?.address || 'Not provided'}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3 className="section-title">Account Information</h3>
                  
                  <div className="detail-grid">
                    <div className="detail-item">
                      <div className="detail-icon">
                        <Shield size={20} />
                      </div>
                      <div className="detail-content">
                        <label className="detail-label">Customer ID</label>
                        <span className="detail-value customer-id">{customerData?.id}</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-icon">
                        <Calendar size={20} />
                      </div>
                      <div className="detail-content">
                        <label className="detail-label">Member Since</label>
                        <span className="detail-value">
                          {customerData?.createdAt ? formatDate(customerData.createdAt) : 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-icon">
                        <Activity size={20} />
                      </div>
                      <div className="detail-content">
                        <label className="detail-label">KYC Status</label>
                        <span className={`detail-value kyc-badge ${getKycStatusColor(customerData?.kycStatus)}`}>
                          {customerData?.kycStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Account Summary */}
          <motion.div
            className="profile-sidebar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="account-summary-card">
              <div className="summary-header">
                <h3 className="summary-title">Account Summary</h3>
                <CreditCard size={24} className="summary-icon" />
              </div>

              <div className="summary-stats">
                <div className="stat-item">
                  <div className="stat-value">
                    ${getTotalBalance().toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="stat-label">Total Balance</div>
                </div>

                <div className="stat-item">
                  <div className="stat-value">{accounts.length}</div>
                  <div className="stat-label">Active Accounts</div>
                </div>
              </div>

              <div className="accounts-list">
                <h4 className="accounts-title">Your Accounts</h4>
                {accounts.map((account) => (
                  <div key={account.id} className="account-item-small">
                    <div className="account-info">
                      <span className="account-type">{account.accountType}</span>
                      <span className="account-number">
                        ****{account.accountNumber?.slice(-4)}
                      </span>
                    </div>
                    <div className="account-balance">
                      ${account.balance?.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-actions">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => window.location.href = '/accounts'}
                >
                  Manage Accounts
                </Button>
              </div>
            </Card>

            {/* Security Card */}
            <Card className="security-card">
              <div className="security-header">
                <h3 className="security-title">Security & Settings</h3>
                <Settings size={24} className="security-icon" />
              </div>

              <div className="security-items">
                <div className="security-item">
                  <div className="security-info">
                    <span className="security-label">Two-Factor Authentication</span>
                    <span className="security-status disabled">Disabled</span>
                  </div>
                  <Button variant="secondary" size="sm">Enable</Button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <span className="security-label">Password</span>
                    <span className="security-status">Last changed 30 days ago</span>
                  </div>
                  <Button variant="secondary" size="sm">Change</Button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <span className="security-label">Login Notifications</span>
                    <span className="security-status enabled">Enabled</span>
                  </div>
                  <Button variant="secondary" size="sm">Settings</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
