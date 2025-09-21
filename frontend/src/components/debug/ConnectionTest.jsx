import React, { useState, useEffect } from 'react';
import { testAPI } from '../../services/api';

const ConnectionTest = () => {
  const [status, setStatus] = useState('testing');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setStatus('testing');
      setError(null);
      
      const response = await testAPI.healthCheck();
      setResult(response);
      setStatus('success');
    } catch (err) {
      setError({
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      setStatus('error');
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      padding: '15px', 
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 9999,
      minWidth: '300px'
    }}>
      <h4>Backend Connection Test</h4>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Status:</strong> 
        <span style={{ 
          color: status === 'success' ? 'green' : status === 'error' ? 'red' : 'orange',
          marginLeft: '5px'
        }}>
          {status.toUpperCase()}
        </span>
      </div>

      {result && (
        <div style={{ marginBottom: '10px' }}>
          <strong>Response:</strong>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '8px', 
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div style={{ marginBottom: '10px' }}>
          <strong>Error:</strong>
          <pre style={{ 
            background: '#ffe6e6', 
            padding: '8px', 
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto',
            color: 'red'
          }}>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      <button 
        onClick={testConnection}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Again
      </button>
    </div>
  );
};

export default ConnectionTest;