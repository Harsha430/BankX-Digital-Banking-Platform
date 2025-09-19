import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  CreditCard, 
  ArrowLeftRight, 
  User, 
  LogOut,
  Menu,
  X,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import anime from 'animejs';
import './Navbar.css';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Animate logo on mount
    anime({
      targets: '.logo-icon',
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      duration: 2000,
      easing: 'easeInOutQuad'
    });

    // Animate nav items
    anime({
      targets: '.nav-item',
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo'
    });
  }, []);

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard', color: '#8b5cf6' },
    { path: '/accounts', icon: CreditCard, label: 'Accounts', color: '#06b6d4' },
    { path: '/transactions', icon: ArrowLeftRight, label: 'Transactions', color: '#10b981' },
    { path: '/profile', icon: User, label: 'Profile', color: '#ec4899' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div 
          className="mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <motion.nav 
        className={`navbar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
        initial={{ x: window.innerWidth <= 1024 ? -280 : 0 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
      {/* Background Effects */}
      <div className="nav-bg-effects">
        <div className="nav-gradient-1"></div>
        <div className="nav-gradient-2"></div>
        <div className="nav-gradient-3"></div>
      </div>

      {/* Header */}
      <div className="nav-header">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="logo-icon">
            <Zap size={32} />
          </div>
          {!isCollapsed && (
            <motion.div 
              className="logo-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="gradient-text">BankX</h1>
              <span className="logo-subtitle">Digital Banking</span>
            </motion.div>
          )}
        </motion.div>

        <motion.button
          className="collapse-btn"
          onClick={() => {
            if (window.innerWidth <= 1024) {
              setIsMobileOpen(!isMobileOpen);
            } else {
              setIsCollapsed(!isCollapsed);
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {(isCollapsed && !isMobileOpen) || (!isCollapsed && !isMobileOpen) ? <Menu size={20} /> : <X size={20} />}
        </motion.button>
      </div>

      {/* Navigation Items */}
      <div className="nav-items">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.path}
              className="nav-item"
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <Link 
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{ '--item-color': item.color }}
              >
                <div className="nav-icon">
                  <Icon size={20} />
                  {isActive && <div className="active-indicator"></div>}
                </div>
                {!isCollapsed && (
                  <motion.span 
                    className="nav-label"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* User Section */}
      <div className="nav-footer">
        <motion.div 
          className="user-section"
          whileHover={{ scale: 1.02 }}
        >
          <div className="user-avatar">
            <div className="avatar-glow"></div>
            <User size={20} />
          </div>
          {!isCollapsed && (
            <div className="user-info">
              <span className="user-name">{user?.name || 'User'}</span>
              <span className="user-role">Premium User</span>
            </div>
          )}
        </motion.div>

        <motion.button
          className="logout-btn"
          onClick={() => {
            logout();
            toast.success('Logged out successfully');
            navigate('/login');
          }}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </motion.button>
      </div>
    </motion.nav>
    </>
  );
};

export default Navbar;