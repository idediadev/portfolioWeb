/*
@author       : Davide Taddia (Enhanced by AI Assistant)
@version      : 0.2
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Improved Authentication Context with session persistence
@email        : davide.taddia2@studio.unibo.it
*/
import React, { createContext, useState, useEffect, useContext } from 'react';
import { API_URL } from '../config';

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
  const [lastChecked, setLastChecked] = useState(null);

  // Check for existing authentication on init and when dependencies change
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Main function to check authentication status
  const checkAuthStatus = async () => {
    setLoading(true);
    
    try {
      // First check local storage for admin data
      const adminData = localStorage.getItem('adminData');
      
      if (adminData) {
        const parsedData = JSON.parse(adminData);
        
        // Check if admin session is still valid (max 24 hours)
        const sessionTimestamp = parsedData.sessionTimestamp || 0;
        const now = Date.now();
        const sessionAgeHours = (now - sessionTimestamp) / (1000 * 60 * 60);
        
        if (sessionAgeHours < 24) {
          // Admin session is valid
          setUser(parsedData);
          setIsAuthenticated(true);
          setIsAdmin(true);
          setLastChecked(now);
          
          // Update the session timestamp to keep it fresh
          refreshAdminSession(parsedData);
          
          setLoading(false);
          return;
        } else {
          // Admin session expired, clean up
          localStorage.removeItem('adminData');
        }
      }
      
      // Next check for auth token for API verification
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          // Verify token with server
          const response = await fetch(`${API_URL}/auth/verify`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setIsAuthenticated(true);
            setIsAdmin(data.user.role === 'admin');
            setLastChecked(Date.now());
          } else {
            // Invalid token, clean up
            localStorage.removeItem('authToken');
            setUser(null);
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('API Error:', error);
          // Keep the session if API is unavailable (offline mode)
        }
      } else {
        // No token, user is not authenticated
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Authentication check error:', error);
      // Reset auth state on error
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh admin session data
  const refreshAdminSession = (adminData) => {
    const updatedData = {
      ...adminData,
      sessionTimestamp: Date.now()
    };
    localStorage.setItem('adminData', JSON.stringify(updatedData));
  };

  // Direct admin login function (for AdminLogin component)
  const loginAdmin = (username, password) => {
    // In a real app, we would validate against server
    // For now, we'll check against adminData or default credentials
    
    try {
      // Check existing admin data first
      const existingAdminData = localStorage.getItem('adminData');
      
      if (existingAdminData) {
        const parsedData = JSON.parse(existingAdminData);
        
        if (username === parsedData.username && password === parsedData.password) {
          // Refresh session timestamp
          refreshAdminSession(parsedData);
          
          // Update state
          setUser(parsedData);
          setIsAuthenticated(true);
          setIsAdmin(true);
          
          return { success: true, user: parsedData };
        }
      }
      
      // For initial setup / default credentials
      if (username === 'admin' && password === 'admin123') {
        // Create a new admin profile
        const newAdminData = {
          id: 'admin-' + Date.now(),
          name: 'Administrator',
          username: 'admin',
          password: 'admin123', // This is only for development
          role: 'admin',
          sessionTimestamp: Date.now()
        };
        
        // Save to local storage
        localStorage.setItem('adminData', JSON.stringify(newAdminData));
        
        // Update state
        setUser(newAdminData);
        setIsAuthenticated(true);
        setIsAdmin(true);
        
        return { success: true, user: newAdminData, isDefault: true };
      }
      
      // Login failed
      return { success: false, message: 'Invalid admin credentials' };
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, message: 'Login error' };
    }
  };

  // Standard login function via API
  const login = async (email, password) => {
    try {
      // First check if it's admin login
      const adminResult = loginAdmin(email, password);
      if (adminResult.success) {
        return adminResult;
      }
      
      // Otherwise try regular API login
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      
      // Save auth token
      localStorage.setItem('authToken', data.token);
      
      // Update state
      setUser(data.user);
      setIsAuthenticated(true);
      setIsAdmin(data.user.role === 'admin');
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  // Update admin credentials function
  const updateAdminCredentials = (newUsername, newPassword) => {
    try {
      if (!isAdmin || !user) {
        return { success: false, message: 'Only admins can update credentials' };
      }
      
      // Get current admin data
      const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
      
      // Update credentials
      const updatedAdminData = {
        ...adminData,
        username: newUsername || adminData.username,
        password: newPassword || adminData.password,
        sessionTimestamp: Date.now()
      };
      
      // Save updated data
      localStorage.setItem('adminData', JSON.stringify(updatedAdminData));
      
      // Update user state
      setUser(updatedAdminData);
      
      return { success: true, message: 'Admin credentials updated' };
    } catch (error) {
      console.error('Update admin credentials error:', error);
      return { success: false, message: 'Failed to update credentials' };
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Clear local storage
      localStorage.removeItem('adminData');
      localStorage.removeItem('authToken');
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, message: error.message };
    }
  };

  // For dev/testing: simulate login
  const simulateLogin = (role = 'guest') => {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('Simulate login only works in development mode');
      return { success: false };
    }
    
    const mockUser = {
      id: role === 'admin' ? 'admin-dev' : 'guest-dev',
      name: role === 'admin' ? 'Admin User' : 'Guest User',
      username: role === 'admin' ? 'admin_dev' : 'guest_dev',
      role: role,
      sessionTimestamp: Date.now()
    };
    
    if (role === 'admin') {
      localStorage.setItem('adminData', JSON.stringify(mockUser));
    }
    
    setUser(mockUser);
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
    
    return { success: true, user: mockUser };
  };

  // Auth context value
  const value = {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    lastChecked,
    login,
    loginAdmin,
    logout,
    checkAuthStatus,
    updateAdminCredentials,
    simulateLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;