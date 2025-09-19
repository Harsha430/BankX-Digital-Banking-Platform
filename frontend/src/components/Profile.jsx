import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell,
  CreditCard,
  Settings,
  Edit3,
  Camera,
  Check,
  X,
  AlertCircle,
  Lock,
  Smartphone,
  Globe
} from 'lucide-react';
import anime from 'animejs';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    kycStatus: 'VERIFIED',
    joinDate: '2023-01-15',
    lastLogin: '2025-09-19T10:30:00Z',
    profileImage: null
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    biometricAuth: true,
    loginAlerts: true
  });

  useEffect(() => {
    // Animate profile sections
    anime({
      targets: '.profile-section',
      translateY: [30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 600,
      easing: 'easeOutExpo'
    });

    // Animate profile avatar
    anime({
      targets: '.profile-avatar',
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutBack'
    });
  }, []);

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
        return 'success';
      case 'PENDING':
        return 'warning';
      default:
        return 'error';
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  return (
    <div className="profile-page">
      {/* Header */}
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <h1 className="gradient-text">My Profile</h1>
          <p className="header-subtitle">Manage your account settings and preferences</p>
        </div>
      </motion.div>

      <div className="profile-container">
        {/* Profile Card */}
        <motion.div 
          className="profile-card profile-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="profile-header">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <div className="avatar-image">
                  <User size={48} />
                </div>
                <motion.button 
                  className="avatar-edit-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera size={16} />
                </motion.button>
                <div className="avatar-glow"></div>
              </div>
              
              <div className="profile-info">
                <h2>{userProfile.name}</h2>
                <p className="profile-email">{userProfile.email}</p>
                <div className={`kyc-status ${getKycStatusColor(userProfile.kycStatus)}`}>
                  <Check size={14} />
                  <span>KYC {userProfile.kycStatus}</span>
                </div>
              </div>
            </div>

            <motion.button 
              className={`edit-profile-btn ${isEditing ? 'active' : ''}`}
              onClick={() => setIsEditing(!isEditing)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEditing ? <X size={18} /> : <Edit3 size={18} />}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </motion.button>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-label">Member Since</span>
              <span className="stat-value">{formatDate(userProfile.joinDate)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Last Login</span>
              <span className="stat-value">{formatDate(userProfile.lastLogin)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Account Status</span>
              <span className="stat-value active">Active</span>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div 
          className="profile-tabs profile-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <motion.div 
          className="profile-content profile-section"
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'personal' && (
            <div className="personal-info">
              <h3>Personal Information</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input 
                      type="text" 
                      value={userProfile.name}
                      disabled={!isEditing}
                      className={isEditing ? 'editable' : ''}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input 
                      type="email" 
                      value={userProfile.email}
                      disabled={!isEditing}
                      className={isEditing ? 'editable' : ''}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-wrapper">
                    <Phone size={18} className="input-icon" />
                    <input 
                      type="tel" 
                      value={userProfile.phone}
                      disabled={!isEditing}
                      className={isEditing ? 'editable' : ''}
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <div className="input-wrapper">
                    <MapPin size={18} className="input-icon" />
                    <input 
                      type="text" 
                      value={userProfile.address}
                      disabled={!isEditing}
                      className={isEditing ? 'editable' : ''}
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="form-actions">
                  <motion.button 
                    className="save-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Check size={18} />
                    Save Changes
                  </motion.button>
                  <motion.button 
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={18} />
                    Cancel
                  </motion.button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="security-settings">
              <h3>Security Settings</h3>
              
              <div className="security-options">
                <div className="security-item">
                  <div className="security-info">
                    <div className="security-icon">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <h4>Two-Factor Authentication</h4>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <motion.label 
                    className="toggle-switch"
                    whileTap={{ scale: 0.95 }}
                  >
                    <input 
                      type="checkbox" 
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: e.target.checked
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </motion.label>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <div className="security-icon">
                      <Lock size={20} />
                    </div>
                    <div>
                      <h4>Biometric Authentication</h4>
                      <p>Use fingerprint or face recognition</p>
                    </div>
                  </div>
                  <motion.label 
                    className="toggle-switch"
                    whileTap={{ scale: 0.95 }}
                  >
                    <input 
                      type="checkbox" 
                      checked={securitySettings.biometricAuth}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        biometricAuth: e.target.checked
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </motion.label>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <div className="security-icon">
                      <AlertCircle size={20} />
                    </div>
                    <div>
                      <h4>Login Alerts</h4>
                      <p>Get notified of new login attempts</p>
                    </div>
                  </div>
                  <motion.label 
                    className="toggle-switch"
                    whileTap={{ scale: 0.95 }}
                  >
                    <input 
                      type="checkbox" 
                      checked={securitySettings.loginAlerts}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        loginAlerts: e.target.checked
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </motion.label>
                </div>
              </div>

              <div className="security-actions">
                <motion.button 
                  className="security-action-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Lock size={18} />
                  Change Password
                </motion.button>
                <motion.button 
                  className="security-action-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Shield size={18} />
                  Security Audit
                </motion.button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notification-settings">
              <h3>Notification Preferences</h3>
              
              <div className="notification-options">
                <div className="notification-item">
                  <div className="notification-info">
                    <div className="notification-icon">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4>Email Notifications</h4>
                      <p>Receive updates via email</p>
                    </div>
                  </div>
                  <motion.label 
                    className="toggle-switch"
                    whileTap={{ scale: 0.95 }}
                  >
                    <input 
                      type="checkbox" 
                      checked={securitySettings.emailNotifications}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        emailNotifications: e.target.checked
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </motion.label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <div className="notification-icon">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4>SMS Notifications</h4>
                      <p>Receive updates via text message</p>
                    </div>
                  </div>
                  <motion.label 
                    className="toggle-switch"
                    whileTap={{ scale: 0.95 }}
                  >
                    <input 
                      type="checkbox" 
                      checked={securitySettings.smsNotifications}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        smsNotifications: e.target.checked
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </motion.label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="preferences-settings">
              <h3>Account Preferences</h3>
              
              <div className="preferences-grid">
                <div className="preference-item">
                  <label>Language</label>
                  <div className="select-wrapper">
                    <Globe size={18} className="select-icon" />
                    <select>
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>

                <div className="preference-item">
                  <label>Currency</label>
                  <div className="select-wrapper">
                    <CreditCard size={18} className="select-icon" />
                    <select>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>JPY (¥)</option>
                    </select>
                  </div>
                </div>

                <div className="preference-item">
                  <label>Time Zone</label>
                  <div className="select-wrapper">
                    <Globe size={18} className="select-icon" />
                    <select>
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>
                </div>

                <div className="preference-item">
                  <label>Theme</label>
                  <div className="select-wrapper">
                    <Settings size={18} className="select-icon" />
                    <select>
                      <option>Dark Mode</option>
                      <option>Light Mode</option>
                      <option>Auto</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;