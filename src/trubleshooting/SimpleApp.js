import React, { useState } from 'react';

const SimpleApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  return (
    <div style={{ 
      backgroundColor: isDarkMode ? '#1a1a1a' : 'white',
      color: isDarkMode ? 'white' : 'black',
      padding: '20px',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Simple App Test</h1>
      
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          padding: '10px 20px',
          backgroundColor: isDarkMode ? 'white' : 'black',
          color: isDarkMode ? 'black' : 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Toggle Dark Mode
      </button>
      
      <p style={{ marginTop: '20px' }}>
        This is a simplified version of the App component. If you can see this, the problem is elsewhere.
      </p>
    </div>
  );
};

export default SimpleApp;