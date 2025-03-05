/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Navbar component from the homepage
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState } from 'react';

// Per importare correttamente il logo
let logo;
try {
  logo = require('../assets/images/logoDavideTaddia.jpeg');
} catch (error) {
  console.warn('Logo image not found, using fallback');
  // Placeholder in caso di mancanza del logo
  logo = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAiIHk9IjUwIiBmb250LXNpemU9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzAwZmY3ZiI+RFQ8L3RleHQ+PC9zdmc+';
}

const Navbar = ({ onHireMeClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHireMeClick = () => {
    setMenuOpen(false);
    onHireMeClick();
  };

  return (
    <nav className="wiki-nav w-full py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <a href="/" className="flex items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-emerald-300 flex items-center justify-center">
            <img 
              src={logo}
              alt="Logo Davide Taddia"
              className="w-full h-full object-cover"
            />
          </div>
        </a>
      </div>

      {/* Mobile menu button */}
      <button 
        className="md:hidden text-emerald-300 focus:outline-none mobile-menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex gap-6">
          <a href="/masteryhub" className="text-emerald-300 hover:text-emerald-400 transition-colors font-mono">00 MasteryHub</a>
          <a href="/wikidedia" className="text-emerald-300 hover:text-emerald-400 transition-colors font-mono">01 WikiDEDIA</a>
          <a href="/servicehub" className="text-emerald-300 hover:text-emerald-400 transition-colors font-mono">02 ServiceHub</a>
        </div>

        <button 
          onClick={handleHireMeClick}
          className="pulse-animation bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-xl font-bold"
        >
          Let's Talk
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 left-4 z-50 bg-black border border-emerald-600/30 shadow-lg p-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a 
              href="/masteryhub" 
              className="text-emerald-300 hover:text-emerald-400 py-2 font-mono"
              onClick={() => setMenuOpen(false)}
            >
              00 MasteryHub
            </a>
            <a 
              href="/wikidedia" 
              className="text-emerald-300 hover:text-emerald-400 py-2 font-mono"
              onClick={() => setMenuOpen(false)}
            >
              01 WikiDEDIA
            </a>
            <a 
              href="/servicehub" 
              className="text-emerald-300 hover:text-emerald-400 py-2 font-mono"
              onClick={() => setMenuOpen(false)}
            >
              02 ServiceHub
            </a>
            <button 
              onClick={handleHireMeClick}
              className="pulse-animation bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-2 text-xl font-bold"
            >
              Let's Talk
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;