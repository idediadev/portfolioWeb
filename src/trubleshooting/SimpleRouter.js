import React, { useState, useEffect } from 'react';
import SimpleApp from './SimpleApp';

const SimpleRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  
  // Per ora ritorna sempre MinimalApp
  return <SimpleApp />;
};

export default SimpleRouter;