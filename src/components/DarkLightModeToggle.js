import React from 'react';
import { Sun, Cloud, Moon } from 'lucide-react';

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
      {/* Sole e Nuvole per Modalità Chiara */}
      <div className={`absolute transition-all duration-500 ease-in-out 
        ${isDarkMode ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}
        flex items-center justify-center`}>
        <Sun className="text-yellow-500 w-6 h-6" />
      </div>

      {/* Luna per Modalità Scura */}
      <div className={`absolute transition-all duration-500 ease-in-out 
        ${isDarkMode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}
        flex items-center justify-center`}>
        <Moon className="text-gray-200 w-6 h-6" />
      </div>

      {/* Cursore del Toggle */}
      <div className={`absolute w-8 h-8 bg-white rounded-full shadow-md transition-all duration-500 ease-in-out
        ${isDarkMode ? 'translate-x-5' : '-translate-x-5'}`}>
      </div>
    </button>
  );
};

export default DarkLightModeToggle;