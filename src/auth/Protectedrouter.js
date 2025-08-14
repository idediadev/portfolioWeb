/*
@author       : Davide Taddia
@version      : 0.1
@copyrigth    : IdediaDEV (Davide Taddia) - 2025  
@license      : GLP-3.0 
@description  : Componente per proteggere le rotte in base alle autorizzazioni dell'utente
@email        : davide.taddia2@studio.unibo.it
*/
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Login from './Login';
import { PAGE_PERMISSIONS, USER_ROLES } from './config';
import { Lock, AlertTriangle } from 'lucide-react';

// Componente per controllare l'accesso alle rotte
const ProtectedRoute = ({ 
  component: Component, 
  pageId, 
  action = 'view',
  ...rest 
}) => {
  const { isAuthenticated, isAdmin, user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  
  // Verifica se le autorizzazioni sono definite per questa pagina
  const pagePermissions = PAGE_PERMISSIONS[pageId];
  if (!pagePermissions) {
    console.warn(`No permissions defined for page: ${pageId}`);
    return <Component {...rest} />;
  }

  // Ottieni i ruoli autorizzati per l'azione richiesta
  const allowedRoles = pagePermissions[action];
  if (!allowedRoles) {
    console.warn(`No permissions defined for action: ${action} on page: ${pageId}`);
    return <Component {...rest} />;
  }

  // Durante il caricamento mostra un indicatore
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark-highlight"></div>
      </div>
    );
  }

  // Verifica le autorizzazioni
  const userRole = isAdmin ? USER_ROLES.ADMIN : USER_ROLES.GUEST;
  const hasPermission = allowedRoles.includes(userRole);

  // Se l'utente ha i permessi, mostra il componente
  if (isAuthenticated && hasPermission) {
    return <Component {...rest} isAdmin={isAdmin} />;
  }
  
  // Se l'utente è autenticato ma non ha i permessi, mostra un messaggio di accesso negato
  if (isAuthenticated && !hasPermission) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-8 max-w-md">
          <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-red-400 text-2xl mb-4">Access Denied</h2>
          <p className="text-current mb-6">
            You don't have permission to {action} this page. 
            This action requires {allowedRoles.includes(USER_ROLES.ADMIN) ? 'admin' : 'higher'} privileges.
          </p>
          <a 
            href="/"
            className="inline-block px-4 py-2 bg-dark-highlight text-black rounded-lg hover:bg-dark-highlight/80 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }
  
  // Se l'utente non è autenticato, mostra il pulsante di login
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-8 max-w-md">
        <Lock size={48} className="text-dark-highlight mx-auto mb-4" />
        <h2 className="text-dark-highlight text-2xl mb-4">Authentication Required</h2>
        <p className="text-current mb-6">
          Please log in to {action} this page.
        </p>
        <button 
          onClick={() => setShowLogin(true)}
          className="px-6 py-3 bg-dark-highlight text-black rounded-lg hover:bg-dark-highlight/80 transition-colors"
        >
          Log In
        </button>
      </div>
      
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default ProtectedRoute;