import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Shield, TrendingUp, Users, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { authAPI } from './api';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import Input from './components/ui/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login...');
      const response = await authAPI.login(email, password);

      if (response.token && response.user) {
        console.log('Login successful');
        toast.success(`Welcome back, ${response.user.name}!`);
        login(response.user, response.token);
        navigate('/dashboard');
      } else {
        setError('Invalid response from server');
        toast.error('Login failed - Invalid response');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Shield, title: 'Bank-Grade Security', desc: 'Your data is protected with enterprise-level encryption' },
    { icon: TrendingUp, title: 'Smart Analytics', desc: 'Track your spending with intelligent insights' },
    { icon: Users, title: '24/7 Support', desc: 'Get help whenever you need it from our expert team' },
    { icon: CreditCard, title: 'Multiple Accounts', desc: 'Manage all your accounts in one secure place' }
  ];

  return (
    <div className="login-container" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)', minHeight: '100vh' }}>
      {/* Background Elements */}
      <div className="login-bg">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`shape shape-${i + 1}`}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="login-content">
        {/* Left Side - Branding & Features */}
        <motion.div
          className="login-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="brand-section">
            <motion.div
              className="brand-logo"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Shield size={48} className="logo-icon" />
              <h1 className="brand-name">BankX</h1>
            </motion.div>
            <p className="brand-tagline">
              The future of digital banking is here. Experience seamless, secure, and smart banking.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="feature-icon">
                  <feature.icon size={24} />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          className="login-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="login-card">
            <div className="login-header">
              <h2 className="login-title">Welcome Back</h2>
              <p className="login-subtitle">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
                error={error && error.includes('email') ? error : ''}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                required
                error={error && !error.includes('email') ? error : ''}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                icon={LogIn}
                className="login-button"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="login-footer">
              <p className="register-link">
                Don't have an account?{' '}
                <Link to="/register" className="link">
                  Create one here
                </Link>
              </p>
            </div>


          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
