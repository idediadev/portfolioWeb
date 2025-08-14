/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Admin password management component for changing admin password
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState } from 'react';
import { Key, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const PasswordManager = () => {
  // Form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI state
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  
  // Password validation state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: 'Enter a new password',
    color: 'gray'
  });
  
  // Validate password strength
  const validatePassword = (password) => {
    // Check password length
    if (password.length < 8) {
      return {
        score: 1,
        feedback: 'Password is too short (minimum 8 characters)',
        color: 'red'
      };
    }
    
    // Check for variety of characters
    let score = 0;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    // Return score and feedback
    if (score === 1) {
      return {
        score: 2,
        feedback: 'Weak: Add uppercase, numbers, and special characters',
        color: 'red'
      };
    } else if (score === 2) {
      return {
        score: 3,
        feedback: 'Fair: Add more character variety',
        color: 'orange'
      };
    } else if (score === 3) {
      return {
        score: 4,
        feedback: 'Good: Consider adding more variety',
        color: 'yellow'
      };
    } else {
      return {
        score: 5,
        feedback: 'Strong password',
        color: 'green'
      };
    }
  };
  
  // Handle password change
  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    
    if (password) {
      setPasswordStrength(validatePassword(password));
    } else {
      setPasswordStrength({
        score: 0,
        feedback: 'Enter a new password',
        color: 'gray'
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    
    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({
        type: 'error',
        text: 'All fields are required'
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match'
      });
      return;
    }
    
    if (passwordStrength.score < 3) {
      setMessage({
        type: 'error',
        text: 'Password is too weak. ' + passwordStrength.feedback
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to change the password
      // Here we'll simulate the API call and update localStorage
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if current password is correct (in a real app this would be server-side)
      const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
      const defaultPassword = 'loremipsum'; // This is just for the demo
      
      if (currentPassword !== (adminData.password || defaultPassword)) {
        throw new Error('Current password is incorrect');
      }
      
      // Update admin data with new password
      adminData.password = newPassword;
      localStorage.setItem('adminData', JSON.stringify(adminData));
      
      // Show success message
      setMessage({
        type: 'success',
        text: 'Password changed successfully'
      });
      
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordStrength({
        score: 0,
        feedback: 'Enter a new password',
        color: 'gray'
      });
      
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to change password'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600/20 mx-auto mb-6">
        <Key size={28} className="text-green-400" />
      </div>
      
      <h2 className="text-xl text-center font-bold text-white mb-6">Change Admin Password</h2>
      
      {/* Message display */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          message.type === 'success' 
            ? 'bg-green-900/30 border border-green-500/30 text-green-400' 
            : 'bg-red-900/30 border border-red-500/30 text-red-400'
        }`}>
          {message.type === 'success' 
            ? <CheckCircle size={18} className="mr-2 flex-shrink-0" /> 
            : <AlertCircle size={18} className="mr-2 flex-shrink-0" />
          }
          <span>{message.text}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Current password */}
        <div className="mb-4">
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-300 mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              id="current-password"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              placeholder="Enter current password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        {/* New password */}
        <div className="mb-4">
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              id="new-password"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          {/* Password strength meter */}
          {newPassword && (
            <div className="mt-2">
              <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    passwordStrength.color === 'red' ? 'bg-red-500' :
                    passwordStrength.color === 'orange' ? 'bg-orange-500' :
                    passwordStrength.color === 'yellow' ? 'bg-yellow-500' :
                    passwordStrength.color === 'green' ? 'bg-green-500' :
                    'bg-gray-500'
                  }`}
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                ></div>
              </div>
              <p className={`text-xs mt-1 ${
                passwordStrength.color === 'red' ? 'text-red-400' :
                passwordStrength.color === 'orange' ? 'text-orange-400' :
                passwordStrength.color === 'yellow' ? 'text-yellow-400' :
                passwordStrength.color === 'green' ? 'text-green-400' :
                'text-gray-400'
              }`}>
                {passwordStrength.feedback}
              </p>
            </div>
          )}
        </div>
        
        {/* Confirm password */}
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-green-500 ${
                confirmPassword && newPassword !== confirmPassword
                  ? 'border-red-500'
                  : 'border-gray-600'
              }`}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
          )}
        </div>
        
        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Change Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default PasswordManager;