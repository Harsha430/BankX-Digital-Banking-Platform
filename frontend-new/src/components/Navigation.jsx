import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  LayoutDashboard, 
  ArrowUpDown, 
  User, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home,
  Wallet
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import Button from './ui/Button';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/accounts', icon: Wallet, label: 'Accounts' },
    { path: '/transactions', icon: ArrowUpDown, label: 'Transactions' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <Link to="/dashboard" className="navbar-brand">
            <CreditCard size={28} className="brand-icon" />
            <span className="brand-text">BankX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-only">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="navbar-right">
          {/* Notification Button */}
          <Button variant="secondary" size="sm" icon={Bell} className="notification-btn">
            <span className="notification-badge">3</span>
          </Button>
          
          {/* User Menu */}
          <div className="user-menu">
            <div className="user-info">
              <div className="user-avatar">
                <User size={20} />
              </div>
              <div className="user-details desktop-only">
                <span className="user-name">{user?.name?.split(' ')[0]}</span>
                <span className="user-role">Customer</span>
              </div>
            </div>
            
            <div className="user-actions">
              <Button 
                variant="secondary" 
                size="sm" 
                icon={Settings}
                onClick={() => window.location.href = '/profile'}
              />
              <Button 
                variant="secondary" 
                size="sm" 
                icon={LogOut} 
                onClick={handleLogout}
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="secondary"
            size="sm"
            icon={mobileMenuOpen ? X : Menu}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn mobile-only"
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="mobile-nav"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="mobile-nav-content">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
            
            <div className="mobile-nav-divider" />
            
            <button
              className="mobile-nav-link"
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = '/profile';
              }}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
            
            <button
              className="mobile-nav-link logout"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;
