/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : dark-light mode toggle button
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const DarkLightModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  
  // Aggiunto effect per rilevare lo scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Aggiungi event listener
    window.addEventListener('scroll', handleScroll);
    
    // Rimuovi event listener al cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button 
      onClick={toggleDarkMode}
      className={`relative w-16 h-16 rounded-full bg-gradient-to-r transition-all duration-500 ease-in-out 
        flex items-center justify-center
        focus:outline-none
        transform hover:scale-105
        shadow-lg
        overflow-hidden
        dark:from-indigo-800 dark:to-indigo-600
        from-blue-300 to-blue-500
        ${scrolled ? 'theme-toggle-scrolled' : ''}`}
    >
      {/* Sole per Modalità Chiara */}
      <div className={`absolute transition-all duration-500 ease-in-out 
        ${isDarkMode ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
        flex items-center justify-center`}>
        <Sun className="text-yellow-500 w-8 h-8" />
      </div>

      {/* Luna per Modalità Scura */}
      <div className={`absolute transition-all duration-500 ease-in-out 
        ${isDarkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
        flex items-center justify-center`}>
        <Moon className="text-gray-200 w-8 h-8" />
      </div>
    </button>
  );
};

export default DarkLightModeToggle;