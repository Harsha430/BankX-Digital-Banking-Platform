import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthFlow = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('AuthFlow - Current state:', {
      user,
      isAuthenticated,
      loading,
      currentPath: location.pathname
    });

    // If user just logged in and we're still on login page, redirect to dashboard
    if (isAuthenticated && location.pathname === '/login') {
      console.log('AuthFlow - Redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    }
  }, [user, isAuthenticated, loading, location.pathname, navigate]);

  return null; // This component doesn't render anything
};

export default AuthFlow;