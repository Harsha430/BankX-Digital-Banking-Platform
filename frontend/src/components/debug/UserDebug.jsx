import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserDebug = () => {
  const { user, isAuthenticated, loading, token } = useAuth();

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: 'white',
      padding: '15px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 9999,
      maxWidth: '400px',
      fontSize: '12px'
    }}>
      <h4>Auth Debug Info</h4>
      <div><strong>Loading:</strong> {loading ? 'true' : 'false'}</div>
      <div><strong>Authenticated:</strong> {isAuthenticated ? 'true' : 'false'}</div>
      <div><strong>Token:</strong> {token ? 'Present' : 'None'}</div>
      <div><strong>User:</strong></div>
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '8px', 
        borderRadius: '4px',
        overflow: 'auto',
        maxHeight: '200px'
      }}>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
};

export default UserDebug;