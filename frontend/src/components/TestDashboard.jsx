import React from 'react';
import { useAuth } from '../context/AuthContext';

const TestDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>🎉 Dashboard Loaded Successfully!</h1>
      
      <div style={{ 
        background: '#f0f8ff', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Authentication Status</h2>
        <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
        <p><strong>User Name:</strong> {user?.name || 'Not available'}</p>
        <p><strong>User Email:</strong> {user?.email || 'Not available'}</p>
        <p><strong>User ID:</strong> {user?.id || 'Not available'}</p>
      </div>

      <div style={{ 
        background: '#f0fff0', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Next Steps</h2>
        <ul>
          <li>✅ Backend connection working</li>
          <li>✅ Login successful</li>
          <li>✅ JWT token received</li>
          <li>✅ Dashboard loading</li>
          <li>🔄 Loading account data...</li>
        </ul>
      </div>

      <div style={{ 
        background: '#fff8f0', 
        padding: '20px', 
        borderRadius: '8px'
      }}>
        <h2>User Object Debug</h2>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TestDashboard;