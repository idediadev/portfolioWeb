import React, { useEffect } from 'react';
import AdminDashboard from './components/admin/AdminDashboard';
import { useAuth } from './components/AuthContext';
import AdminLogin from './components/AdminLogin';

// Component to protect admin routes
const AdminRoutes = () => {
  const { isAuthenticated, isAdmin, loading, checkAuthStatus } = useAuth();

  // Verify authentication on mount  
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  // If user is authenticated and is admin, render the dashboard
  if (isAuthenticated && isAdmin) {
    return <AdminDashboard />;
  }
  
  // Otherwise show the login screen
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl text-green-400 font-bold mb-6 text-center">Admin Dashboard</h2>
        <p className="text-gray-300 mb-6 text-center">
          You need administrator privileges to access this area.
          Please log in with an admin account.
        </p>
        
        <div className="flex justify-center">
          <AdminLogin 
            adminOnly={true} 
            onClose={() => window.location.href = '/'} 
            onLoginSuccess={() => window.location.reload()}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;