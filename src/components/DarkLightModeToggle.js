/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : dark-light mode toggle button
@email        : davide.taddia2@studio.unibo.it
*/
import React from 'react';
import { Sun, Moon } from 'lucide-react';

const DarkLightModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button 
      onClick={toggleDarkMode}
      className="relative w-16 h-16 rounded-full bg-gradient-to-r transition-all duration-500 ease-in-out 
        flex items-center justify-center
        focus:outline-none
        transform hover:scale-105
        shadow-lg
        overflow-hidden
        dark:from-indigo-800 dark:to-indigo-600
        from-blue-300 to-blue-500"
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
      
      {/* Rimosso il cursore bianco del toggle */}
    </button>
  );
};

export default DarkLightModeToggle;