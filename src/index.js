/*
@author       : Davide Taddia (Enhanced by AI Assistant)
@version      : 0.2
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Enhanced index.js with improved authentication support
@email        : davide.taddia2@studio.unibo.it
*/
import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router';
import { AuthProvider } from './components/AuthContext';
import './styles/styles.css';
import './styles/masteryhub.css';
import './styles/transitions.css';
import './styles/wikidedia.css';
import './styles/auth.css';

const container = document.getElementById('root');
const root = createRoot(container);

// Wrap the application with AuthProvider to provide authentication state to all components
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);