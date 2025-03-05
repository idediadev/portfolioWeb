/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : this js file manage the styles.
@email        : davide.taddia2@studio.unibo.it
*/
import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router'; 
import './styles/styles.css';
import './styles/masteryhub.css';
import './styles/transitions.css';
import './styles/wikidedia.css'; 

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);