/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Authentication context supporting both regular users and admins
@email        : davide.taddia2@studio.unibo.it
*/
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  // Auth state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing authentication on init
  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      
      try {
        // Check for admin authentication first
        const adminData = localStorage.getItem('adminData');
        if (adminData) {
          const parsedAdminData = JSON.parse(adminData);
          setUser(parsedAdminData);
          setIsAuthenticated(true);
          setIsAdmin(true);
        } else {
          // Check for regular user authentication
          const userData = localStorage.getItem('userData');
          if (userData) {
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
            setIsAuthenticated(true);
            setIsAdmin(false);
          } else {
            // No authentication found
            setUser(null);
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error('Error parsing authentication data:', error);
        // Clear possibly corrupted data
        localStorage.removeItem('adminData');
        localStorage.removeItem('userData');
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Regular user login
  const loginUser = (userData) => {
    if (!userData) return false;
    
    try {
      // Store user data
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      setIsAdmin(false);
      
      return true;
    } catch (error) {
      console.error('Error during user login:', error);
      return false;
    }
  };

  // Admin login
  const loginAdmin = (adminData) => {
    if (!adminData) return false;
    
    try {
      // Store admin data
      localStorage.setItem('adminData', JSON.stringify(adminData));
      
      // Update state
      setUser(adminData);
      setIsAuthenticated(true);
      setIsAdmin(true);
      
      return true;
    } catch (error) {
      console.error('Error during admin login:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Clear stored data
      if (isAdmin) {
        localStorage.removeItem('adminData');
      } else {
        localStorage.removeItem('userData');
      }
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  };

  // Check if user has specific permission
  const hasPermission = (requiredRole) => {
    if (!isAuthenticated) return false;
    if (requiredRole === 'admin' && !isAdmin) return false;
    return true;
  };

  // Auth context value
  const value = {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    loginUser,
    loginAdmin,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;