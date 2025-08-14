/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Routing for the pages created in the src/pages/.
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState, useEffect } from 'react';
import App from './App';
import MasteryHubPage from './pages/MasteryHubPage';
import ServiceHubPage from './pages/ServiceHubPage';
import WikiTADD from './pages/WikiTADDpage'; 
import AdminRoutes from './AdminRoutes';

// A simple custom router for the site
const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  useEffect(() => {
    // Handle browser history changes
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    // Intercept link clicks to handle SPA navigation
    const handleLinkClick = (event) => {
      // Find the closest <a> tag (if it exists)
      let anchor = event.target;
      while (anchor && anchor.tagName !== 'A') {
        anchor = anchor.parentElement;
      }
      
      // If it's an internal link, handle the navigation
      if (
        anchor && 
        anchor.href && 
        anchor.href.startsWith(window.location.origin) &&
        !anchor.hasAttribute('target') &&
        !anchor.hasAttribute('download') &&
        anchor.getAttribute('rel') !== 'external'
      ) {
        event.preventDefault();
        
        const path = anchor.href.replace(window.location.origin, '');
        
        // Use history API to change URL without reloading the page
        window.history.pushState(null, '', path);
        setCurrentPath(path);
        
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    };
    
    // Listen for clicks on the entire page
    document.addEventListener('click', handleLinkClick);
    
    // Listen for history changes (back/forward browser buttons)
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  
  // Map paths to their corresponding components
  const renderRoute = () => {
    // Admin routes
    if (currentPath.startsWith('/admin')) {
      return <AdminRoutes />;
    }
    
    // Handle specific routes
    switch (currentPath) {
      case '/masteryhub':
        return <MasteryHubPage />;
      
      case '/wikitadd':
        return <WikiTADD />;
      
      case '/madebyme':
        // Future MadeByMe page
        return <App initialSection="madebyme" />;
        
      case '/servicehub':
        return <ServiceHubPage />;
        
      default:
        // Homepage or unrecognized paths return to home
        return <App />;
    }
  };
  
  return renderRoute();
};

export default Router;