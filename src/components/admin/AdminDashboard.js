import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { 
  UserCog, 
  Settings, 
  ListChecks, 
  Database, 
  Shield, 
  LogOut, 
  LayoutDashboard,
  Home,
  Users,
  Key,
  FileText,
  Activity,
  Menu,
  X,
  Eye,
  Clock,
  CheckCircle
} from 'lucide-react';
import UserManager from './UserManager';
import PasswordManager from './PasswordManager';
import CardManager from './CardManager';
import SkillManager from './SkillManager';
import ServiceManager from './ServiceManager';
import AccessLogs from './AccessLogs';

const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  // Ensure user is admin
  useEffect(() => {
    if (!isAdmin) {
      window.location.href = '/';
    }
  }, [isAdmin]);
  
  // Activity tracking for session management
  useEffect(() => {
    const trackActivity = () => {
      setLastActivity(Date.now());
    };
    
    // Track user activity events
    window.addEventListener('mousemove', trackActivity);
    window.addEventListener('keydown', trackActivity);
    window.addEventListener('click', trackActivity);
    window.addEventListener('scroll', trackActivity);
    
    // Check for session timeout every minute
    const interval = setInterval(() => {
      const inactiveTime = Date.now() - lastActivity;
      
      // Auto-logout after 30 minutes of inactivity
      if (inactiveTime > 30 * 60 * 1000) {
        console.log('Session timeout due to inactivity');
        logout();
        window.location.href = '/';
      }
    }, 60 * 1000);
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('mousemove', trackActivity);
      window.removeEventListener('keydown', trackActivity);
      window.removeEventListener('click', trackActivity);
      window.removeEventListener('scroll', trackActivity);
      clearInterval(interval);
    };
  }, [lastActivity, logout]);
  
  // Navigate back to home
  const handleGoHome = () => {
    window.location.href = '/';
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };
  
  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UserManager />;
      case 'password':
        return <PasswordManager />;
      case 'homeCards':
        return <CardManager />;
      case 'skills':
        return <SkillManager />;
      case 'services':
        return <ServiceManager />;
      case 'logs':
        return <AccessLogs />;
      default:
        return <DashboardOverview />;
    }
  };
  
  // Dashboard sidebar links
  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'users', label: 'User Management', icon: <Users size={18} /> },
    { id: 'password', label: 'Admin Password', icon: <Key size={18} /> },
    { id: 'homeCards', label: 'Home Cards', icon: <FileText size={18} /> },
    { id: 'skills', label: 'MasteryHub Skills', icon: <ListChecks size={18} /> },
    { id: 'services', label: 'ServiceHub', icon: <Database size={18} /> },
    { id: 'logs', label: 'Access Logs', icon: <Activity size={18} /> }
  ];
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile top navbar */}
      <div className="md:hidden bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield size={24} className="text-green-400" />
          <span className="font-bold text-lg">Admin Dashboard</span>
        </div>
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex md:flex-col w-64 bg-gray-800 border-r border-gray-700 h-screen sticky top-0">
          <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
            <Shield size={24} className="text-green-400" />
            <div>
              <h2 className="font-bold text-green-400">Admin Dashboard</h2>
              <p className="text-xs text-gray-400">{user?.username || 'Administrator'}</p>
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {sidebarLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-md transition-colors ${
                  activeTab === link.id 
                    ? 'bg-green-900/30 text-green-400 border-l-2 border-green-400' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-gray-700 space-y-2">
            <button
              onClick={handleGoHome}
              className="w-full flex items-center space-x-3 p-3 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <Home size={18} />
              <span>Back to Site</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-md text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>
        
        {/* Mobile Sidebar - Conditional render */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
            
            <nav className="fixed top-0 left-0 bottom-0 w-64 bg-gray-800 border-r border-gray-700 z-50 overflow-y-auto">
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield size={20} className="text-green-400" />
                  <div>
                    <h2 className="font-bold text-green-400">Admin Dashboard</h2>
                    <p className="text-xs text-gray-400">{user?.username || 'Administrator'}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4 space-y-1">
                {sidebarLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-md transition-colors ${
                      activeTab === link.id 
                        ? 'bg-green-900/30 text-green-400 border-l-2 border-green-400' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-700 space-y-2">
                <button
                  onClick={handleGoHome}
                  className="w-full flex items-center space-x-3 p-3 rounded-md text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <Home size={18} />
                  <span>Back to Site</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 rounded-md text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        )}
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

// Dashboard overview component
const DashboardOverview = () => {
  // Stats data - in a real app, this would come from an API
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPageViews: 0,
    lastLoginTime: null,
    systemStatus: 'Online'
  });
  
  // Last active pages
  const [activePages, setActivePages] = useState([]);
  
  // Load stats data on mount
  useEffect(() => {
    // Simulate API call with local storage data
    const loadStats = () => {
      try {
        // Count users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const totalUsers = users.length;
        
        // Get logs
        const logs = JSON.parse(localStorage.getItem('accessLogs') || '[]');
        const totalPageViews = logs.length;
        
        // Get last login
        const loginLogs = logs.filter(log => log.type === 'login');
        const lastLoginTime = loginLogs.length > 0 ? new Date(loginLogs[0].timestamp) : null;
        
        // Get active pages
        const pageViews = logs.filter(log => log.type === 'pageview');
        const pageStats = {};
        
        pageViews.forEach(log => {
          const page = log.page;
          pageStats[page] = (pageStats[page] || 0) + 1;
        });
        
        const activePages = Object.entries(pageStats)
          .map(([page, count]) => ({ page, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        
        setStats({
          totalUsers,
          totalPageViews,
          lastLoginTime,
          systemStatus: 'Online'
        });
        
        setActivePages(activePages);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };
    
    loadStats();
  }, []);
  
  // Format date
  const formatDate = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleString();
  };
  
  const StatCard = ({ title, value, icon }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-xl md:text-2xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className="bg-green-900/30 p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Welcome back, Administrator</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={<Users size={24} className="text-green-400" />} 
        />
        <StatCard 
          title="Page Views" 
          value={stats.totalPageViews} 
          icon={<Eye size={24} className="text-green-400" />} 
        />
        <StatCard 
          title="Last Login" 
          value={formatDate(stats.lastLoginTime)} 
          icon={<Clock size={24} className="text-green-400" />} 
        />
        <StatCard 
          title="System Status" 
          value={stats.systemStatus} 
          icon={<CheckCircle size={24} className="text-green-400" />} 
        />
      </div>
      
      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
        <h2 className="text-lg text-white font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => window.location.href = '/'}
            className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center justify-center transition-colors"
          >
            <Home size={24} className="text-green-400 mb-2" />
            <span className="text-sm">Go to Homepage</span>
          </button>
          
          <button 
            onClick={() => window.location.href = '/masteryhub'}
            className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center justify-center transition-colors"
          >
            <ListChecks size={24} className="text-green-400 mb-2" />
            <span className="text-sm">MasteryHub</span>
          </button>
          
          <button 
            onClick={() => window.location.href = '/wikidedia'}
            className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center justify-center transition-colors"
          >
            <FileText size={24} className="text-green-400 mb-2" />
            <span className="text-sm">WikiDEDIA</span>
          </button>
          
          <button 
            onClick={() => window.location.href = '/servicehub'}
            className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center justify-center transition-colors"
          >
            <Database size={24} className="text-green-400 mb-2" />
            <span className="text-sm">ServiceHub</span>
          </button>
        </div>
      </div>
      
      {/* Most Active Pages */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-lg text-white font-medium mb-4">Most Active Pages</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Views</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {activePages.map((page, index) => (
                <tr key={index} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{page.page || '/'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{page.count}</td>
                </tr>
              ))}
              {activePages.length === 0 && (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-gray-400">No page views recorded yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;