import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <span className="loading"></span>
      </div>
    );
  }

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return children;
};

export default ProtectedRoute;
