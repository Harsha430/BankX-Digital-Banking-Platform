import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Zap, Shield, Fingerprint, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import anime from 'animejs';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: 'admin@bankx.com',
    password: 'admin123'
  });

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Animate floating elements
    anime({
      targets: '.floating-element',
      translateY: [-20, 20],
      rotate: [0, 5, -5, 0],
      duration: 4000,
      loop: true,
      easing: 'easeInOutSine',
      delay: anime.stagger(500)
    });

    // Animate login form
    anime({
      targets: '.login-form',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: 300
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Welcome to BankX! 🚀');
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="login-bg">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-gradient-3"></div>
        
        {/* Floating Elements */}
        <div className="floating-element element-1">
          <Shield size={40} />
        </div>
        <div className="floating-element element-2">
          <Fingerprint size={35} />
        </div>
        <div className="floating-element element-3">
          <Smartphone size={30} />
        </div>
      </div>

      <div className="login-container">
        {/* Left Side - Branding */}
        <motion.div 
          className="login-branding"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="brand-logo">
            <div className="logo-icon">
              <Zap size={48} />
            </div>
            <div className="brand-text">
              <h1 className="gradient-text">BankX</h1>
              <p>Digital Banking Platform</p>
            </div>
          </div>
          
          <div className="brand-features">
            <motion.div 
              className="feature-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Shield className="feature-icon" />
              <div>
                <h3>Bank-Grade Security</h3>
                <p>256-bit encryption & multi-factor authentication</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="feature-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Zap className="feature-icon" />
              <div>
                <h3>Lightning Fast</h3>
                <p>Instant transfers and real-time notifications</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="feature-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Smartphone className="feature-icon" />
              <div>
                <h3>Mobile First</h3>
                <p>Seamless experience across all devices</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div 
          className="login-form-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="login-form glass">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <motion.input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                  required
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <motion.input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Enter your password"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>

              <motion.button
                type="submit"
                className="login-btn"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner small"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <div className="btn-glow"></div>
                  </>
                )}
              </motion.button>
            </form>

            <div className="form-divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <motion.button 
                className="social-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
                Google
              </motion.button>
              <motion.button 
                className="social-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Fingerprint size={20} />
                Biometric
              </motion.button>
            </div>

            <div className="form-footer">
              <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;