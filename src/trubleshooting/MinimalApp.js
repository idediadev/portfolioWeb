import React from 'react';

const MinimalApp = () => {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      color: 'black',
      padding: '20px',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px'
    }}>
      Test di rendering - Se vedi questo messaggio, il problema è in uno dei componenti
    </div>
  );
};

export default MinimalApp;