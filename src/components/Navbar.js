import React, { useState } from 'react';
import '../styles/styles.css';
import logo from '../assets/images/logoDavideTaddia.jpeg';

const Navbar = ({ onHireMeClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleHireMeClick = () => {
    setMenuOpen(false);  // Close mobile menu if open
    onHireMeClick();
  };

  return (
    <nav className={`w-full mx-auto px-4 md:px-6 py-4 flex items-center justify-between navbar-gradient ${darkMode ? 'dark' : ''}`}>
      <div className="flex items-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-emerald-300 flex items-center justify-center">
          <img 
            src={logo}
            alt="Logo Davide Taddia"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mobile menu button */}
      <button 
        className="md:hidden text-emerald-300 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex gap-4 lg:gap-6">
          <a href="#masteryhub" className="text-emerald-300 hover:text-emerald-400 transition-colors">00 MasteryHub</a>
          <a href="#madebyme" className="text-emerald-300 hover:text-emerald-400 transition-colors">01 MadebyMe</a>
          <a href="#servicehub" className="text-emerald-300 hover:text-emerald-400 transition-colors">02 ServiceHub</a>
        </div>

        <button 
          onClick={handleHireMeClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors pulse-animation text-xl font-bold"
        >
          HIRE ME
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 left-4 z-50 bg-neutral-800 shadow-lg rounded-lg p-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a 
              href="#masteryhub" 
              className="text-emerald-300 hover:text-emerald-400 py-2"
              onClick={() => setMenuOpen(false)}
            >
              00 MasteryHub
            </a>
            <a 
              href="#madebyme" 
              className="text-emerald-300 hover:text-emerald-400 py-2"
              onClick={() => setMenuOpen(false)}
            >
              01 MadebyMe
            </a>
            <a 
              href="#servicehub" 
              className="text-emerald-300 hover:text-emerald-400 py-2"
              onClick={() => setMenuOpen(false)}
            >
              02 ServiceHub
            </a>
            <button 
              onClick={handleHireMeClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors pulse-animation mt-2 text-xl font-bold"
            >
              HIRE ME
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;