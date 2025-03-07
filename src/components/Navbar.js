/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Navbar component from the homepage
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import logoImage from '../../src/logoDavideTaddia.jpeg';

const Navbar = ({ onHireMeClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Scroll Management
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Listener for the scroll event
    window.addEventListener('scroll', handleScroll);
    
    // Remove event listener when the cleanup is true
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleHireMeClick = () => {
    setMenuOpen(false);  
    onHireMeClick();
  };

  // Fallback logo
  const LogoFallback = () => (
    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-dark-highlight font-bold text-xl bg-transparent rounded-full border-2 border-dark-highlight">
      <span className="font-mono">ED</span>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300">
      <nav className={`max-w-[1440px] w-full mx-auto px-4 md:px-6 py-4 flex items-center justify-between navbar-green-black rounded-lg ${
        scrolled ? 'mt-2 shadow-lg' : 'mt-4'
      }`}>
        <div className="flex items-center">
          <a href="/" className="flex items-center">
          {!logoError ? (
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-dark-highlight flex items-center justify-center">
                <img 
                  src={logoImage}
                  alt="Logo Davide Taddia"
                  className="w-full h-full object-cover"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <LogoFallback />
            )}
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-action focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-4 lg:gap-6">
            <a href="/masteryhub" className="text-action hover:text-primary transition-colors">00 MasteryHub</a>
            <a href="/wikidedia" className="text-action hover:text-primary transition-colors">01 WikIDEDIA</a>
            <a href="/servicehub" className="text-action hover:text-primary transition-colors">02 ServiceHub</a>
          </div>

          <button 
            onClick={handleHireMeClick}
            className="btn-primary px-6 py-3 rounded-lg transition-colors pulse-animation text-xl font-bold"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-16 right-4 left-4 card-bg shadow-lg rounded-lg p-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a 
                href="/masteryhub" 
                className="text-action hover:text-primary py-2"
                onClick={() => setMenuOpen(false)}
              >
                00 MasteryHub
              </a>
              <a 
                href="/wikidedia" 
                className="text-action hover:text-primary py-2"
                onClick={() => setMenuOpen(false)}
              >
                01 WikIDEDIA
              </a>
              <a 
                href="/servicehub" 
                className="text-action hover:text-primary py-2"
                onClick={() => setMenuOpen(false)}
              >
                02 ServiceHub
              </a>
              <button 
                onClick={handleHireMeClick}
                className="btn-primary px-4 py-2 rounded-lg transition-colors pulse-animation mt-2 text-xl font-bold"
              >
                Let's Talk
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;