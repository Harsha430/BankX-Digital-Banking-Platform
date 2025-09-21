import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import Register from './pages/Register';
import Dashboard from './Dashboard';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';
import ProtectedRoute from './ProtectedRoute';

// Component to handle root redirect
const RootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <span className="loading-spinner"></span>
      </div>
    );
  }

  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
};

// Layout component for authenticated pages
const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes with Navigation */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Dashboard />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Accounts />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Transactions />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout>
                  <Profile />
                </AuthenticatedLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'white',
            color: 'var(--gray-900)',
            border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            fontSize: '0.875rem',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: 'var(--success-500)',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--error-500)',
              secondary: 'white',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
