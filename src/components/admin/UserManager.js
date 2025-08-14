import React, { useState, useEffect } from 'react';
import { User, Trash, Edit, Plus, Save, X, AlertCircle, CheckCircle, EyeOff, Eye, Lock } from 'lucide-react';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  // Form for new/edited user
  const emptyUser = {
    id: null,
    name: '',
    email: '',
    password: '',
    role: 'guest'
  };
  
  const [formData, setFormData] = useState(emptyUser);
  const [showPassword, setShowPassword] = useState(false);

  // Load users data on mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Load users from localStorage
  const loadUsers = () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate with localStorage
      
      // Generate some mock users if none exist
      let usersData = localStorage.getItem('users');
      
      if (!usersData) {
        // Create default users
        const defaultUsers = [
          {
            id: 'admin-' + Date.now(),
            name: 'Administrator',
            email: 'admin@example.com',
            role: 'admin',
            lastLogin: new Date().toISOString()
          },
          {
            id: 'guest-' + Date.now(),
            name: 'Guest User',
            email: 'guest@example.com',
            role: 'guest',
            lastLogin: new Date(Date.now() - 86400000).toISOString() // Yesterday
          }
        ];
        
        localStorage.setItem('users', JSON.stringify(defaultUsers));
        usersData = JSON.stringify(defaultUsers);
      }
      
      setUsers(JSON.parse(usersData));
    } catch (error) {
      console.error('Error loading users data:', error);
      setMessage({
        type: 'error',
        text: 'Failed to load users data.'
      });
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Save users data to localStorage
  const saveUsers = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      localStorage.setItem('users', JSON.stringify(users));
      
      setMessage({
        type: 'success',
        text: 'Users saved successfully!'
      });
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setMessage(prev => prev?.type === 'success' ? null : prev);
      }, 3000);
    } catch (error) {
      console.error('Error saving users data:', error);
      setMessage({
        type: 'error',
        text: 'Failed to save users data. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Initialize form for editing a user
  const handleEditUser = (user) => {
    setFormData({
      ...user,
      password: '' // Don't show existing password
    });
    setEditingUser(user.id);
    setShowUserForm(true);
  };

  // Create new user
  const handleCreateNewUser = () => {
    setFormData(emptyUser);
    setEditingUser(null);
    setShowUserForm(true);
    setShowPassword(true); // Show password field for new users
  };

  // Handle form submission
  const handleSubmitUser = () => {
    if (!formData.name.trim() || !formData.email.trim() || (!editingUser && !formData.password.trim())) {
      setMessage({
        type: 'error',
        text: 'Name, email, and password are required fields.'
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid email address.'
      });
      return;
    }
    
    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map(user => {
        if (user.id !== editingUser) return user;
        
        return {
          ...user,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password ? formData.password : user.password // Only update if provided
        };
      });
      
      setUsers(updatedUsers);
    } else {
      // Add new user
      const newUser = {
        ...formData,
        id: `user-${Date.now()}`,
        lastLogin: null
      };
      
      setUsers([...users, newUser]);
    }
    
    setShowUserForm(false);
    setFormData(emptyUser);
    setEditingUser(null);
    
    // Save changes
    setTimeout(() => saveUsers(), 100);
  };

  // Handle user deletion
  const handleDeleteUser = (userId) => {
    // Don't allow deleting the last admin
    const adminUsers = users.filter(user => user.role === 'admin');
    const isLastAdmin = adminUsers.length === 1 && adminUsers[0].id === userId;
    
    if (isLastAdmin) {
      setMessage({
        type: 'error',
        text: 'Cannot delete the last administrator account.'
      });
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
      
      // Save changes
      setTimeout(() => saveUsers(), 100);
    }
  };

  // Format datetime for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Status messages */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          message.type === 'success' 
            ? 'bg-green-900/30 border border-green-500/30 text-green-400' 
            : 'bg-red-900/30 border border-red-500/30 text-red-400'
        }`}>
          {message.type === 'success' ? 
            <CheckCircle size={20} className="mr-3 flex-shrink-0" /> : 
            <AlertCircle size={20} className="mr-3 flex-shrink-0" />
          }
          <span>{message.text}</span>
        </div>
      )}
      
      {/* Top actions */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={handleCreateNewUser}
          className="px-4 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New User
        </button>
        
        <button
          onClick={saveUsers}
          disabled={isLoading}
          className="px-6 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-70 text-white rounded-lg flex items-center"
        >
          {isLoading ? (
            <span className="flex items-center">
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Saving...
            </span>
          ) : (
            <>
              <Save size={18} className="mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
      
      {/* Users list */}
      {!showUserForm && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {users.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400 mb-4">No users found</p>
              <button
                onClick={handleCreateNewUser}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded inline-flex items-center"
              >
                <Plus size={18} className="mr-1" />
                Add First User
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                            <User size={20} className="text-gray-300" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              ID: {user.id.substring(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-green-900/50 text-green-400' 
                            : 'bg-blue-900/50 text-blue-400'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-indigo-400 hover:text-indigo-300 mr-3"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {/* User form */}
      {showUserForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg text-white font-medium">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h3>
            <button
              onClick={() => {
                setShowUserForm(false);
                setFormData(emptyUser);
                setEditingUser(null);
              }}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                placeholder="e.g. John Doe"
              />
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                placeholder="e.g. user@example.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Password */}
            <div>
              <label className="block text-gray-300 mb-2">
                {editingUser ? 'New Password (leave blank to keep unchanged)' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 pr-10 text-white"
                  placeholder={editingUser ? "Leave blank to keep unchanged" : "Enter password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {/* Role */}
            <div>
              <label className="block text-gray-300 mb-2">User Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'guest'})}
                  className={`p-3 rounded border ${
                    formData.role === 'guest' 
                      ? 'bg-blue-900/50 border-blue-500 text-blue-400' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-650'
                  }`}
                >
                  <User size={18} className="mx-auto mb-1" />
                  <div className="text-xs">Guest</div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'admin'})}
                  className={`p-3 rounded border ${
                    formData.role === 'admin' 
                      ? 'bg-green-900/50 border-green-500 text-green-400' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-650'
                  }`}
                >
                  <Lock size={18} className="mx-auto mb-1" />
                  <div className="text-xs">Administrator</div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Form actions */}
          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={() => {
                setShowUserForm(false);
                setFormData(emptyUser);
                setEditingUser(null);
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitUser}
              disabled={!formData.name.trim() || !formData.email.trim() || (!editingUser && !formData.password.trim())}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 text-white rounded flex items-center"
            >
              <Save size={18} className="mr-2" />
              {editingUser ? 'Update User' : 'Add User'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;