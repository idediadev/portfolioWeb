/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Properly centered Login component with full size
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState } from 'react';
import { X, LogIn, AlertCircle } from 'lucide-react';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login logic - replace with actual authentication
      if (email === 'admin@example.com' && password === 'admin123') {
        // Success - simulate login
        console.log('Login successful');
        
        // Close the modal after login
        if (onClose) onClose();
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
      <div className="relative bg-gray-900 rounded-lg shadow-xl max-w-md w-full mx-auto" style={{border: '1px solid rgba(0, 255, 127, 0.3)'}}>
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close login form"
        >
          <X size={24} />
        </button>
        
        {/* Form header */}
        <div className="pt-8 pb-4 px-6 text-center">
          <h2 className="text-green-400 text-3xl mb-2 font-bold">Login</h2>
          <p className="text-gray-300">Sign in to access your account</p>
        </div>
        
        {/* Login form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {/* Error message */}
          {errorMessage && (
            <div className="bg-red-900 bg-opacity-50 border border-red-500 text-white p-4 rounded-lg flex items-center">
              <AlertCircle size={18} className="mr-2 text-red-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          
          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-green-400 mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-green-400 focus:outline-none transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
          
          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-green-400 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-green-400 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center mt-2"
            style={{marginTop: '1.5rem'}}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              <span className="flex items-center">
                <LogIn size={20} className="mr-2" />
                Sign In
              </span>
            )}
          </button>
        </form>
        
        {/* Development section */}
        <div className="px-6 py-4 border-t border-gray-800 bg-gray-800 bg-opacity-30">
          <p className="text-sm text-gray-400">Demo credentials:</p>
          <p className="text-sm text-gray-400">Email: admin@example.com</p>
          <p className="text-sm text-gray-400">Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;