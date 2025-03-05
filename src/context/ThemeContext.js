/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Theme context for dark-light mode. Must be edited
@email        : davide.taddia2@studio.unibo.it
*/
import React, { createContext, useState, useEffect, useContext } from 'react';

// Creazione del context
const ThemeContext = createContext();

// Hook personalizzato per accedere al context
export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider = ({ children }) => {
  // Stato per il tema dark/light
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Controlla le preferenze del sistema al caricamento iniziale
  useEffect(() => {
    // Controlla se è stato salvato un tema nelle preferenze
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Usa il tema salvato
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Altrimenti controlla le preferenze del sistema
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
    }
  }, []);
  
  // Aggiorna le classi del documento quando cambia il tema
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    
    // Salva il tema nelle preferenze
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  
  // Funzione per cambiare modalità
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  
  // Gestione dei cambiamenti nelle preferenze del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Funzione handler per aggiornare il tema quando cambiano le preferenze del sistema
    const handleChange = (e) => {
      // Aggiorna solo se non c'è una preferenza salvata manualmente
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };
    
    // Ascolta i cambiamenti nelle preferenze del sistema
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback per vecchi browser
      mediaQuery.addListener(handleChange);
    }
    
    // Pulizia dell'event listener
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback per vecchi browser
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  // Fornisce l'accesso al tema e alla funzione per cambiarlo
  const value = {
    isDarkMode,
    toggleDarkMode,
    // Funzione per impostare direttamente il tema
    setTheme: (theme) => {
      if (theme === 'dark' || theme === 'light') {
        setIsDarkMode(theme === 'dark');
      }
    }
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;