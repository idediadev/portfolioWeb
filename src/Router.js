import React, { useState, useEffect } from 'react';
import App from './App';
import MasteryHubPage from './pages/MasteryHubPage';
import WikiDEDIAPage from './pages/WikiDEDIAPage'; // Importiamo la nuova pagina

// Un semplice router personalizzato per il sito
const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  useEffect(() => {
    // Gestione dei cambiamenti nella history del browser
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    // Intercetta i clic sui link per gestire la navigazione SPA
    const handleLinkClick = (event) => {
      // Trova il tag <a> più vicino (se esiste)
      let anchor = event.target;
      while (anchor && anchor.tagName !== 'A') {
        anchor = anchor.parentElement;
      }
      
      // Se è un link interno, gestisci la navigazione
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
        
        // Usa history API per cambiare URL senza ricaricare la pagina
        window.history.pushState(null, '', path);
        setCurrentPath(path);
        
        // Scroll alla cima della pagina
        window.scrollTo(0, 0);
      }
    };
    
    // Ascolta i clic su tutta la pagina
    document.addEventListener('click', handleLinkClick);
    
    // Ascolta i cambiamenti nella history (back/forward del browser)
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);
  
  // Mappa i percorsi alle componenti corrispondenti
  const renderRoute = () => {
    // Verifica se il percorso inizia con /wikidedia per gestire sottopercorsi
    if (currentPath.startsWith('/wikidedia')) {
      // Passa il percorso completo e lascia che WikiDEDIAPage gestisca internamente la navigazione
      return <WikiDEDIAPage path={currentPath} />;
    }
    
    // Gestisci gli altri percorsi
    switch (currentPath) {
      case '/masteryhub':
        return <MasteryHubPage />;
      case '/masteryhub':
        return <MasteryHubPage />;
      case '/servicehub':
      return <App initialSection="servicehub" />;
        
      default:
        // Homepage o percorsi non riconosciuti tornano alla home
        return <App />;
    }
  };
  
  return renderRoute();
};

export default Router;