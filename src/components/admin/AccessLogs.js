import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Search, Filter, Eye, Download, RefreshCw, Activity, MapPin, Target } from 'lucide-react';

const AccessLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    user: '',
    page: '',
    dateFrom: '',
    dateTo: new Date().toISOString().split('T')[0]
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Log types with their colors for visual distinction
  const logTypes = {
    pageview: { color: 'bg-blue-900/50 text-blue-400', icon: <Eye size={14} className="mr-1" /> },
    login: { color: 'bg-green-900/50 text-green-400', icon: <User size={14} className="mr-1" /> },
    api: { color: 'bg-purple-900/50 text-purple-400', icon: <Activity size={14} className="mr-1" /> },
    error: { color: 'bg-red-900/50 text-red-400', icon: <Activity size={14} className="mr-1" /> }
  };

  // Load logs data on mount
  useEffect(() => {
    loadLogs();
  }, []);

  // Filter logs when search term or filters change
  useEffect(() => {
    filterLogs();
  }, [searchTerm, filters, logs]);

  // Load logs from localStorage or generate mock data
  const loadLogs = () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate with localStorage
      
      let logsData = localStorage.getItem('accessLogs');
      
      if (!logsData) {
        // Generate mock logs if none exist
        const mockLogs = generateMockLogs(50);
        localStorage.setItem('accessLogs', JSON.stringify(mockLogs));
        logsData = JSON.stringify(mockLogs);
      }
      
      const parsedLogs = JSON.parse(logsData);
      setLogs(parsedLogs);
      setFilteredLogs(parsedLogs);
    } catch (error) {
      console.error('Error loading logs data:', error);
      setLogs([]);
      setFilteredLogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate random mock logs for demonstration
  const generateMockLogs = (count) => {
    const mockUsers = [
      { id: 'admin-user', name: 'Administrator' },
      { id: 'guest-user', name: 'Guest User' },
      { id: 'visitor-1', name: 'Anonymous Visitor' },
      { id: 'visitor-2', name: 'John Doe' },
      { id: 'visitor-3', name: 'Jane Smith' }
    ];
    
    const mockPages = [
      { path: '/', title: 'Home Page' },
      { path: '/masteryhub', title: 'MasteryHub' },
      { path: '/wikidedia', title: 'WikiDEDIA' },
      { path: '/servicehub', title: 'ServiceHub' },
      { path: '/contact', title: 'Contact Form' }
    ];
    
    const logTypes = ['pageview', 'login', 'api', 'error'];
    
    const mockLogs = [];
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
      // Generate a random date within the last 30 days
      const date = new Date(now);
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const page = mockPages[Math.floor(Math.random() * mockPages.length)];
      const logType = logTypes[Math.floor(Math.random() * logTypes.length)];
      
      mockLogs.push({
        id: `log-${Date.now()}-${i}`,
        timestamp: date.toISOString(),
        userId: user.id,
        userName: user.name,
        type: logType,
        page: page.path,
        pageTitle: page.title,
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        details: logType === 'error' ? 'Error: Failed to load resource' : ''
      });
    }
    
    // Sort by timestamp descending (newest first)
    return mockLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  // Filter logs based on search term and filters
  const filterLogs = () => {
    let result = [...logs];
    
    // Apply search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(log => 
        log.userName.toLowerCase().includes(search) ||
        log.page.toLowerCase().includes(search) ||
        log.pageTitle.toLowerCase().includes(search) ||
        log.ipAddress.includes(search) ||
        (log.details && log.details.toLowerCase().includes(search))
      );
    }
    
    // Apply user filter
    if (filters.user) {
      result = result.filter(log => log.userId === filters.user || log.userName === filters.user);
    }
    
    // Apply page filter
    if (filters.page) {
      result = result.filter(log => log.page === filters.page);
    }
    
    // Apply date range filters
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      result = result.filter(log => new Date(log.timestamp) >= fromDate);
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      result = result.filter(log => new Date(log.timestamp) <= toDate);
    }
    
    setFilteredLogs(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      user: '',
      page: '',
      dateFrom: '',
      dateTo: new Date().toISOString().split('T')[0]
    });
    setFilteredLogs(logs);
  };

  // Export logs as CSV
  const exportLogs = () => {
    // Get visible logs (based on filters)
    const dataToExport = filteredLogs;
    
    // Create CSV header
    const headers = ['Timestamp', 'User', 'Type', 'Page', 'IP Address', 'Details'];
    
    // Convert logs to CSV rows
    const rows = dataToExport.map(log => [
      log.timestamp,
      log.userName,
      log.type,
      log.page,
      log.ipAddress,
      log.details || ''
    ]);
    
    // Combine header and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `access-logs-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get unique users for filter dropdown
  const getUniqueUsers = () => {
    const uniqueUsers = [...new Set(logs.map(log => log.userId))];
    return uniqueUsers.map(userId => {
      const log = logs.find(log => log.userId === userId);
      return { id: userId, name: log?.userName || userId };
    });
  };

  // Get unique pages for filter dropdown
  const getUniquePages = () => {
    return [...new Set(logs.map(log => log.page))];
  };

  // Format datetime for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  // Calculate pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  if (isLoading && logs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Top controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white"
            placeholder="Search logs..."
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 rounded flex items-center ${
              showFilters ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Filter size={16} className="mr-1" />
            <span>Filters</span>
          </button>
          
          <button
            onClick={loadLogs}
            className="px-3 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded flex items-center"
            title="Refresh logs"
          >
            <RefreshCw size={16} className="mr-1" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <button
            onClick={exportLogs}
            className="px-3 py-2 bg-green-600/20 text-green-400 hover:bg-green-600/30 rounded flex items-center"
            title="Export logs as CSV"
          >
            <Download size={16} className="mr-1" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
      
      {/* Filters panel */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Advanced Filters</h3>
            <button
              onClick={resetFilters}
              className="text-gray-400 hover:text-white text-sm"
            >
              Reset All
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* User filter */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">User</label>
              <select
                name="user"
                value={filters.user}
                onChange={handleFilterChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
              >
                <option value="">All Users</option>
                {getUniqueUsers().map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Page filter */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">Page</label>
              <select
                name="page"
                value={filters.page}
                onChange={handleFilterChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
              >
                <option value="">All Pages</option>
                {getUniquePages().map(page => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Date from filter */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">From Date</label>
              <input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
              />
            </div>
            
            {/* Date to filter */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">To Date</label>
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Logs count and pagination info */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
        <div>
          Showing {Math.min(filteredLogs.length, indexOfFirstLog + 1)} - {Math.min(indexOfLastLog, filteredLogs.length)} of {filteredLogs.length} logs
        </div>
        
        <div>
          Page {currentPage} of {totalPages || 1}
        </div>
      </div>
      
      {/* Logs table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400 mb-4">No logs found matching your filters</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {currentLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm text-white flex items-center">
                          <Clock size={14} className="mr-1 text-gray-400" />
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(log.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{log.userName}</div>
                      <div className="text-xs text-gray-400">{log.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        logTypes[log.type]?.color || 'bg-gray-700 text-gray-400'
                      }`}>
                        {logTypes[log.type]?.icon}
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{log.page}</div>
                      <div className="text-xs text-gray-400">{log.pageTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white flex items-center">
                        <MapPin size={14} className="mr-1 text-gray-400" />
                        {log.ipAddress}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {log.details || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-l-md border ${
                currentPage === 1
                  ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Previous
            </button>
            
            {/* Page numbers */}
            <div className="hidden sm:flex">
              {[...Array(totalPages).keys()].map(number => {
                // Only show a window of 5 pages centered on current page
                if (
                  number + 1 === 1 ||
                  number + 1 === totalPages ||
                  (number + 1 >= currentPage - 2 && number + 1 <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      className={`px-4 py-1 border-t border-b border-r ${
                        currentPage === number + 1
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {number + 1}
                    </button>
                  );
                } else if (
                  (number + 1 === currentPage - 3 && currentPage > 4) ||
                  (number + 1 === currentPage + 3 && currentPage < totalPages - 3)
                ) {
                  // Show ellipsis
                  return (
                    <button
                      key={number + 1}
                      className="px-4 py-1 border-t border-b border-r bg-gray-700 border-gray-600 text-gray-300"
                      disabled
                    >
                      ...
                    </button>
                  );
                }
                return null;
              })}
            </div>
            
            {/* Mobile pagination - just show current/total */}
            <div className="sm:hidden px-4 py-1 border-t border-b bg-gray-700 border-gray-600 text-gray-300">
              {currentPage} / {totalPages}
            </div>
            
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-r-md border ${
                currentPage === totalPages
                  ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AccessLogs;