import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Lock, UserPlus, Shield, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { customerAPI } from '../api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone ? parseInt(formData.phone.replace(/\D/g, '')) : null,
        address: formData.address,
        username: formData.username,
        password: formData.password
      };

      const response = await customerAPI.registerCustomer(registrationData);
      
      toast.success('Registration successful! Please login with your credentials.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Shield, title: 'Secure Banking', desc: 'Bank-grade security for all your transactions' },
    { icon: CheckCircle, title: 'Instant Setup', desc: 'Get started with your account in minutes' },
    { icon: UserPlus, title: 'Easy Management', desc: 'Manage multiple accounts from one dashboard' }
  ];

  return (
    <div className="register-container" style={{ background: 'linear-gradient(135deg, #111827 0%, #1e293b 100%)', minHeight: '100vh' }}>
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

      <div className="register-content">
        {/* Left Side - Branding & Features */}
        <motion.div 
          className="register-left"
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
              Join thousands of customers who trust BankX for their banking needs. 
              Create your account today and experience the future of digital banking.
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

        {/* Right Side - Registration Form */}
        <motion.div 
          className="register-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="register-card">
            <div className="register-header">
              <h2 className="register-title">Create Account</h2>
              <p className="register-subtitle">Join BankX and start your digital banking journey</p>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-row">
                <Input
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  icon={User}
                  required
                  error={errors.name}
                />
              </div>

              <div className="form-row">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                  required
                  error={errors.email}
                />
              </div>

              <div className="form-row">
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={Phone}
                  error={errors.phone}
                />
              </div>

              <div className="form-row">
                <Input
                  label="Address"
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  icon={MapPin}
                  error={errors.address}
                />
              </div>

              <div className="form-row">
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  icon={User}
                  required
                  error={errors.username}
                />
              </div>

              <div className="form-row">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  icon={Lock}
                  required
                  error={errors.password}
                />
              </div>

              <div className="form-row">
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  icon={Lock}
                  required
                  error={errors.confirmPassword}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                icon={UserPlus}
                className="register-button"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="register-footer">
              <p className="login-link">
                Already have an account?{' '}
                <Link to="/login" className="link">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="terms-notice">
              <p>
                By creating an account, you agree to our{' '}
                <a href="#" className="link">Terms of Service</a> and{' '}
                <a href="#" className="link">Privacy Policy</a>.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
