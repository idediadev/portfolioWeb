/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Updated UserProfile component with properly integrated Login functionality
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState } from 'react';
import { User, LogOut, ChevronDown, Settings, Shield } from 'lucide-react';
import Login from './Login'; // Import the updated Login component

const UserProfile = () => {
  // Mock authentication state (replace with actual auth context in production)
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  // Mock logout function
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setShowDropdown(false);
  };
  
  // Mock login completion handler
  const handleLoginSuccess = (userData, isAdminUser = false) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsAdmin(isAdminUser);
    setShowLogin(false);
  };

  // If the user is not authenticated, show the login button
  if (!isAuthenticated) {
    return (
      <>
        <button
          onClick={() => setShowLogin(true)}
          className="flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 py-2 px-4 rounded-lg transition-colors"
        >
          <User size={18} />
          <span>Sign In</span>
        </button>
        
        {/* Render the Login modal when showLogin is true */}
        {showLogin && (
          <Login 
            onClose={() => setShowLogin(false)} 
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </>
    );
  }

  // If user is authenticated, show the profile dropdown
  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center justify-center gap-2 ${
          isAdmin 
            ? 'bg-green-600/20 hover:bg-green-600/30 text-green-400' 
            : 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400'
        } py-2 px-4 rounded-lg transition-colors`}
      >
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-current text-black text-xs font-bold">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span>{user?.name || 'User'}</span>
        <ChevronDown size={16} />
      </button>
      
      {/* Dropdown menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-4 border-b border-gray-700">
            <p className="text-white font-medium truncate">{user?.name || 'User'}</p>
            <p className="text-gray-400 text-sm truncate">{user?.email || ''}</p>
            
            {isAdmin && (
              <div className="mt-2 flex items-center gap-1 text-green-400 text-xs">
                <Shield size={12} />
                <span>Administrator</span>
              </div>
            )}
          </div>
          
          <div className="py-1">
            <a
              href="/profile"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
              onClick={() => setShowDropdown(false)}
            >
              <User size={16} className="mr-2" />
              Profile
            </a>
            
            {isAdmin && (
              <a
                href="/admin"
                className="flex items-center px-4 py-2 text-green-400 hover:bg-gray-700 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <Settings size={16} className="mr-2" />
                Admin Dashboard
              </a>
            )}
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;