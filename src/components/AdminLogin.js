/*
@author       : Davide Taddia
@version      : 0.2
@copyright    : IdediaDEV (Davide Taddia) - 2025  
@license      : GPL-3.0 
@description  : Admin Login component - FIXED
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState, useEffect } from 'react';
import { X, LogIn, User, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

const AdminLogin = ({ onClose, onLoginSuccess, adminOnly = false }) => {
  // State for login form and password change
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // State for password change
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newUsername, setNewUsername] = useState('admin_');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // ✅ DEFINISCO adminData come stato locale
  const [adminData, setAdminData] = useState(null);
  
  // Get auth context functions
  const { loginAdmin, updateAdminCredentials } = useAuth();

  // Check if admin has already set up credentials
  useEffect(() => {
    const storedAdminData = localStorage.getItem('adminData');
    if (storedAdminData) {
      try {
        const parsedData = JSON.parse(storedAdminData);
        setAdminData(parsedData); // ✅ USO setAdminData invece di assegnazione diretta
        
        if (parsedData.initialSetupComplete === true) {
          // Setup already completed, no action needed
        } else if (parsedData.username === 'admin' && parsedData.password === 'admin123') {
          // Default credentials detected, show password change form
          setShowPasswordChange(true);
        }
      } catch (error) {
        console.error('Error parsing admin data:', error);
      }
    }
  }, []);

  // Validate username format
  const validateUsername = (username) => {
    if (!username.startsWith('admin_')) {
      return 'Username must start with "admin_"';
    }
    
    const suffix = username.substring(6); // Get the part after "admin_"
    if (suffix.length === 0) {
      return 'Username must include characters after "admin_"';
    }
    
    if (!/^[a-zA-Z0-9]+$/.test(suffix)) {
      return 'Username can only contain alphanumeric characters after "admin_"';
    }
    
    return null; // No error
  };
  
  // Validate password strength
  const validatePassword = (password) => {
    // For production, use stronger password requirements
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    
    if (!/[a-z]/.test(password) || 
        !/[A-Z]/.test(password) || 
        !/[0-9]/.test(password)) {
      return 'Password must include lowercase, uppercase, and numbers';
    }
    
    return null; // No error
  };

  // Handle initial login with credentials
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await loginAdmin(username, password);
      
      if (result.success) {
        if (result.isDefault) {
          // Show password change form if using default credentials
          setShowPasswordChange(true);
        } else {
          // Login successful
          setSuccess('Login successful!');
          
          // ✅ CREO userData qui invece di usare adminData non definita
          const userData = {
            id: result.user?.id || '1',
            username: result.user?.username || username,
            role: 'administrator',
            loginTime: new Date().toISOString()
          };
          
          setAdminData(userData); // ✅ AGGIORNO lo stato
          
          // Call the success callback
          if (onLoginSuccess) {
            onLoginSuccess(userData); // ✅ USO userData invece di adminData
          }
          
          // Close modal after short delay
          setTimeout(() => {
            if (onClose) onClose();
          }, 1000);
        }
      } else {
        throw new Error(result.message || 'Invalid administrator credentials');
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Validate username
    const usernameError = validateUsername(newUsername);
    if (usernameError) {
      setError(usernameError);
      return;
    }
    
    // Validate password
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    
    // Verify passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Update admin credentials
      const result = await updateAdminCredentials(newUsername, newPassword);
      
      if (result.success) {
        setSuccess('Admin account setup complete!');
        
        // ✅ CREO newAdminData qui
        const newAdminData = {
          id: '1',
          username: newUsername,
          role: 'administrator',
          initialSetupComplete: true,
          loginTime: new Date().toISOString()
        };
        
        // Update local admin data to mark setup as complete
        try {
          localStorage.setItem('adminData', JSON.stringify(newAdminData));
          setAdminData(newAdminData); // ✅ AGGIORNO lo stato
        } catch (error) {
          console.error('Error updating admin data:', error);
        }
        
        // Call success callback after short delay
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(newAdminData); // ✅ USO newAdminData
          }
          
          if (onClose) onClose();
        }, 1500);
      } else {
        throw new Error(result.message || 'Failed to update admin credentials');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during setup');
    } finally {
      setIsLoading(false);
    }
  };

  // Display success message
  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-lg shadow-xl border border-green-500/30 max-w-md w-full mx-auto p-8 text-center">
          <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-green-400 text-2xl mb-4">{success}</h2>
          <p className="text-gray-300">Redirecting you to the dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Initial login form
  const renderLoginForm = () => (
    <>
      <div className="px-6 pt-6 pb-4 flex items-center justify-center flex-col">
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <User size={24} className="text-green-400" />
        </div>
        <h2 className="text-green-400 text-2xl font-bold flex items-center">
          <span className="mr-2">Admin Login</span>
        </h2>
      </div>
      
      <form onSubmit={handleLogin} className="px-6 pb-4 space-y-4">
        {/* Error message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-white p-3 rounded text-sm flex items-center">
            <AlertCircle size={16} className="mr-2 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-green-400 text-sm mb-1">Username</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={16} className="text-gray-400" />
            </div>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-green-400 focus:outline-none"
              placeholder="Enter admin username"
            />
          </div>
        </div>
        
        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-green-400 text-sm mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={16} className="text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-green-400 focus:outline-none"
              placeholder="Enter password"
            />
          </div>
        </div>
        
        {/* Default credentials info for dev/testing */}
        {process.env.NODE_ENV !== 'production' && (
          <p className="text-gray-400 text-xs">
            Default credentials: username "admin" / password "admin123"
          </p>
        )}
        
        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-500 text-black font-medium py-2 px-4 rounded flex items-center justify-center transition-colors"
        >
          {isLoading ? (
            <span>Logging in...</span>
          ) : (
            <>
              <LogIn size={18} className="mr-2" />
              <span>Login</span>
            </>
          )}
        </button>
      </form>
    </>
  );

  // Password change form
  const renderPasswordChangeForm = () => (
    <>
      <div className="px-6 pt-6 pb-4 flex items-center justify-center flex-col">
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
          <Lock size={24} className="text-green-400" />
        </div>
        <h2 className="text-green-400 text-2xl font-bold mb-2">Security Setup</h2>
        <p className="text-gray-400 text-center">
          You must change the default admin credentials before proceeding
        </p>
      </div>
      
      <form onSubmit={handlePasswordChange} className="px-6 pb-4 space-y-4">
        {/* Error message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-white p-3 rounded text-sm flex items-center">
            <AlertCircle size={16} className="mr-2 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {/* New Username */}
        <div>
          <label htmlFor="new-username" className="block text-green-400 text-sm mb-1">New Admin Username</label>
          <div className="relative">
            <input
              id="new-username"
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="block w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-green-400 focus:outline-none"
              placeholder="admin_yourname"
            />
          </div>
          <p className="text-gray-400 text-xs mt-1">
            Must start with "admin_" followed by alphanumeric characters
          </p>
        </div>
        
        {/* New Password */}
        <div>
          <label htmlFor="new-password" className="block text-green-400 text-sm mb-1">New Password</label>
          <div className="relative">
            <input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full pr-10 px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-green-400 focus:outline-none"
              placeholder="Enter new secure password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          
          {/* Password requirements */}
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-xs">
              <span className={newPassword.length >= 8 ? "text-green-400" : "text-gray-500"}>
                • At least 8 characters
              </span>
            </div>
            <div className="flex items-center text-xs">
              <span className={/[a-z]/.test(newPassword) ? "text-green-400" : "text-gray-500"}>
                • Lowercase letters (a-z)
              </span>
            </div>
            <div className="flex items-center text-xs">
              <span className={/[A-Z]/.test(newPassword) ? "text-green-400" : "text-gray-500"}>
                • Uppercase letters (A-Z)
              </span>
            </div>
            <div className="flex items-center text-xs">
              <span className={/[0-9]/.test(newPassword) ? "text-green-400" : "text-gray-500"}>
                • Numbers (0-9)
              </span>
            </div>
          </div>
        </div>
        
        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm-password" className="block text-green-400 text-sm mb-1">Confirm Password</label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full pr-10 px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-green-400 focus:outline-none"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {newPassword && confirmPassword && newPassword !== confirmPassword && (
            <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
          )}
        </div>
        
        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-500 text-black font-medium py-2 px-4 rounded flex items-center justify-center transition-colors mt-4"
        >
          {isLoading ? (
            <span>Processing...</span>
          ) : (
            <span>Set Up Administrator Account</span>
          )}
        </button>
      </form>
    </>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="bg-gray-900 rounded-lg shadow-xl border border-green-500/30 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        {/* Render appropriate form based on state */}
        {showPasswordChange ? renderPasswordChangeForm() : renderLoginForm()}
        
        {/* Admin notice */}
        <div className="px-6 py-4 bg-gray-800/50 rounded-b-lg border-t border-gray-700 text-sm text-gray-400">
          This login is only for site administrators. Guests do not need to log in to browse content.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;