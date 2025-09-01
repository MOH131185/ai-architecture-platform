import React from 'react';

const GeneratingScreen = () => {
  return (
    <div style={{
      padding: '40px',
      textAlign: 'center'
    }}>
      <div style={{
        display: 'inline-block',
        border: '4px solid rgba(102, 126, 234, 0.2)',
        borderLeftColor: '#667eea',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite'
      }}></div>
      <h2 style={{marginTop: '20px', color: '#333'}}>Generating Your Design...</h2>
      <p style={{color: '#666'}}>Please wait a moment while we process your request.</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GeneratingScreen;
