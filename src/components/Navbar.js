/*
@author       : Davide Taddia
@version      : 0.2
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Navbar component with unified wikiTADD styling
@email        : davide.taddia2@studio.unibo.it
*/

import React, { useState, useEffect } from 'react';
import { User, Menu, X, Shield, LogOut, Settings } from 'lucide-react';
import AdminLogin from './AdminLogin';
import '../styles/styles.css';

// Import logo image
import logoImage from '../logoDavideTaddia.jpeg';

const Navbar = ({ onHireMeClick }) => {
  // State management
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing authentication on component mount
  useEffect(() => {
    // Check for admin auth
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      try {
        const parsedData = JSON.parse(adminData);
        setUser(parsedData);
        setIsAuthenticated(true);
        setIsAdmin(true);
      } catch (error) {
        console.error('Error parsing admin data:', error);
        localStorage.removeItem('adminData');
      }
    }
  }, []);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '#080c13';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.style.backgroundColor = '#f8f8f8';
    }
  };

  // Handle admin login success
  const handleAdminLoginSuccess = (adminData) => {
    setUser(adminData);
    setIsAuthenticated(true);
    setIsAdmin(true);
    setShowAdminLogin(false);
  };

  // Handle logout
  const handleLogout = () => {
    if (isAdmin) {
      localStorage.removeItem('adminData');
    }
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setShowUserDropdown(false);
  };

  // Handle "Let's Talk" button click
  const handleHireMeClick = () => {
    setMenuOpen(false);
    if (onHireMeClick) onHireMeClick();
  };

  // Logo fallback component
  const LogoFallback = () => (
    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-[#00FF7F] font-bold text-xl bg-transparent rounded-full border-2 border-[#00FF7F]">
      <span className="font-mono">DT</span>
    </div>
  );

  // Add an access log entry
  useEffect(() => {
    try {
      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        userId: isAuthenticated ? user.id : 'visitor',
        userName: isAuthenticated ? user.name : 'Anonymous Visitor',
        type: 'pageview',
        page: window.location.pathname,
        pageTitle: document.title,
        ipAddress: '127.0.0.1',
        userAgent: navigator.userAgent
      };
      
      const existingLogs = JSON.parse(localStorage.getItem('accessLogs') || '[]');
      existingLogs.unshift(newLog);
      localStorage.setItem('accessLogs', JSON.stringify(existingLogs.slice(0, 1000)));
    } catch (error) {
      console.error('Error logging page view:', error);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300">
      <nav className={`navbar-wikitadd-unified ${scrolled ? 'navbar-scrolled' : ''}`}>
        
        {/* Brand Section */}
        <div className="brand-section">
          <a href="/" className="flex items-center gap-3">
            {!logoError ? (
              <div className="logo-circle">
                <img 
                  src={logoImage}
                  alt="Logo Davide Taddia"
                  className="w-full h-full object-cover rounded-full"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <div className="logo-circle">
                <span className="logo-text">D</span>
              </div>
            )}
            <div className="brand-text">
              <h1>Davide Taddia</h1>
              <p>Computer Science & Developer</p>
            </div>
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="nav-links">
            <a href="/masteryhub" className="nav-link">00 MasteryHub</a>
            <a href="/wikitadd" className="nav-link">01 wikiTADD</a>
            <a href="/servicehub" className="nav-link">02 ServiceHub</a>
          </div>

          {/* Controls Section */}
          <div className="controls-section">
            
            {/* Theme Toggle - stile wikiTADD */}
            <button
              onClick={toggleTheme}
              className={`theme-toggle-wikitadd ${isDarkMode ? 'active' : ''}`}
              title="Cambia tema"
            >
              <div className="toggle-slider" />
            </button>

            {/* Admin Button - stile wikiTADD */}
            {isAuthenticated && isAdmin ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className={`admin-button-wikitadd ${showUserDropdown ? 'active' : ''}`}
                >
                  <Settings size={16} />
                  <span>Admin</span>
                  <div className="status-indicator" />
                </button>
                
                {/* User dropdown */}
                {showUserDropdown && (
                  <div className="admin-dropdown">
                    <div className="admin-dropdown-header">
                      <div className="admin-avatar">
                        <span>{user?.name?.charAt(0) || 'A'}</span>
                      </div>
                      <div>
                        <p className="admin-name">{user?.name || 'Admin'}</p>
                        <span className="admin-badge">
                          <Shield size={10} />
                          Administrator
                        </span>
                      </div>
                    </div>
                    <div className="admin-dropdown-actions">
                      <a 
                        href="/admin" 
                        className="dropdown-link"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Admin Dashboard
                      </a>
                      <button
                        onClick={handleLogout}
                        className="dropdown-logout"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAdminLogin(true)}
                className="admin-button-wikitadd"
              >
                <Shield size={16} />
                <span>Admin</span>
              </button>
            )}

            {/* CTA Button */}
            <button 
              onClick={handleHireMeClick}
              className="cta-button-wikitadd"
            >
              Let's Talk
            </button>

          </div>
        </div>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="mobile-menu-overlay">
            <div className="mobile-menu-content">
              <div className="mobile-nav-links">
                <a href="/masteryhub" onClick={() => setMenuOpen(false)}>00 MasteryHub</a>
                <a href="/wikitadd" onClick={() => setMenuOpen(false)}>01 wikiTADD</a>
                <a href="/servicehub" onClick={() => setMenuOpen(false)}>02 ServiceHub</a>
              </div>
              
              <div className="mobile-controls">
                {/* Theme toggle mobile */}
                <div className="mobile-theme-control">
                  <span>Tema scuro</span>
                  <button
                    onClick={toggleTheme}
                    className={`theme-toggle-wikitadd ${isDarkMode ? 'active' : ''}`}
                  >
                    <div className="toggle-slider" />
                  </button>
                </div>

                {/* Admin section mobile */}
                {isAuthenticated && isAdmin ? (
                  <div className="mobile-admin-section">
                    <div className="mobile-admin-info">
                      <div className="admin-avatar">
                        <span>{user?.name?.charAt(0) || 'A'}</span>
                      </div>
                      <div>
                        <p>{user?.name || 'Admin'}</p>
                        <span className="admin-badge">
                          <Shield size={12} />
                          Administrator
                        </span>
                      </div>
                    </div>
                    
                    <a 
                      href="/admin" 
                      className="mobile-admin-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      Admin Dashboard
                    </a>
                    
                    <button 
                      onClick={handleLogout}
                      className="mobile-logout-btn"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setShowAdminLogin(true);
                      setMenuOpen(false);
                    }}
                    className="mobile-admin-login"
                  >
                    <Shield size={16} />
                    Admin Login
                  </button>
                )}
                
                <button 
                  onClick={handleHireMeClick}
                  className="mobile-cta-button"
                >
                  Let's Talk
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLogin 
          onClose={() => setShowAdminLogin(false)} 
          onLoginSuccess={handleAdminLoginSuccess} 
        />
      )}
    </div>
  );
};

export default Navbar;