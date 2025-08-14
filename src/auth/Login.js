/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Componente per il login degli utenti
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { X, LogIn, AlertCircle } from 'lucide-react';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSimulateOptions, setShowSimulateOptions] = useState(false);
  
  const { login, simulateLogin } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      await login(email, password);
      onClose(); // Chiudi il modal dopo il login
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Per ambienti di sviluppo/test
  const handleSimulateLogin = (role) => {
    simulateLogin(role);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="card-bg p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-primary text-3xl mb-2">Login</h2>
          <p className="text-current opacity-80">Sign in to access your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="bg-red-900/50 border border-red-500 text-current p-4 rounded-lg flex items-center">
              <AlertCircle size={18} className="mr-2 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-primary mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-current focus:border-dark-highlight focus:outline-none transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-primary mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-700 border border-neutral-600 rounded-lg p-3 text-current focus:border-dark-highlight focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center font-bold py-3 px-6 rounded-lg transition-colors"
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
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 pt-6 border-t border-neutral-700">
            <button
              onClick={() => setShowSimulateOptions(!showSimulateOptions)}
              className="text-sm text-gray-400 hover:text-primary transition-colors"
            >
              {showSimulateOptions ? 'Hide Dev Options' : 'Show Dev Options'}
            </button>
            
            {showSimulateOptions && (
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-sm text-gray-400">Development Mode: Simulate Login</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSimulateLogin('admin')}
                    className="flex-1 py-2 px-4 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
                  >
                    Login as Admin
                  </button>
                  <button
                    onClick={() => handleSimulateLogin('guest')}
                    className="flex-1 py-2 px-4 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30 transition-colors"
                  >
                    Login as Guest
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;