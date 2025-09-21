import { useState, useEffect, useMemo } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import ordersData from '../data/ordersData';

const UltraResponsiveOrderPage = () => {
  const { isDarkMode } = useDarkMode();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('cards'); // cards, list
  const [selectedOrders, setSelectedOrders] = useState([]);
  
  const itemsPerPage = 8;

  useEffect(() => {
    setIsMounted(true);
    setIsLoaded(true);
  }, []);

  // Filter, search, and sort functionality
  const filteredOrders = useMemo(() => {
    let filtered = ordersData.filter(order => {
      const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All Status' || order.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || order.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });

    // Sort orders
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'amount':
          aValue = parseFloat(a.amount.replace('$', ''));
          bValue = parseFloat(b.amount.replace('$', ''));
          break;
        case 'customer':
          aValue = a.customer.toLowerCase();
          bValue = b.customer.toLowerCase();
          break;
        case 'status':
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, priorityFilter, sortBy, sortOrder]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priorityFilter, sortBy, sortOrder]);

  // Statistics calculations
  const stats = useMemo(() => {
    const total = ordersData.length;
    const pending = ordersData.filter(order => order.status === 'Pending').length;
    const completed = ordersData.filter(order => order.status === 'Completed').length;
    const processing = ordersData.filter(order => order.status === 'Processing').length;
    const totalRevenue = ordersData
      .filter(order => order.status === 'Completed')
      .reduce((sum, order) => sum + parseFloat(order.amount.replace('$', '')), 0);
    const avgOrderValue = totalRevenue / completed || 0;

    return { total, pending, completed, processing, totalRevenue, avgOrderValue };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Refunded':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleOrderSelection = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const selectAllOrders = () => {
    if (selectedOrders.length === currentOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(currentOrders.map(order => order.id));
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="p-4 mobile-spacing">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-48"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-300 rounded-xl h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 mobile-spacing space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Orders
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and track all your orders ({filteredOrders.length} total)
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className={`flex rounded-lg p-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                viewMode === 'cards'
                  ? `${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'} shadow-sm`
                  : `${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                viewMode === 'list'
                  ? `${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'} shadow-sm`
                  : `${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`
              }`}
            >
              List
            </button>
          </div>
          
          {/* Add Order Button */}
          <button className={`px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2 shadow-lg`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="font-semibold">Add Order</span>
          </button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className={`rounded-2xl shadow-sm border p-4 sm:p-5 mobile-card ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-all duration-200`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mobile-text`}>Total Orders</p>
              <p className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mobile-text`}>{stats.total}</p>
              <p className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'} mobile-text`}>+12% from last month</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl shadow-sm border p-4 sm:p-5 mobile-card ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-all duration-200`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mobile-text`}>Pending</p>
              <p className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mobile-text`}>{stats.pending}</p>
              <p className={`text-xs ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} mobile-text`}>Needs attention</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl shadow-sm border p-4 sm:p-5 mobile-card ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-all duration-200`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mobile-text`}>Completed</p>
              <p className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mobile-text`}>{stats.completed}</p>
              <p className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'} mobile-text`}>+8% from last month</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl shadow-sm border p-4 sm:p-5 mobile-card ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-all duration-200`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mobile-text`}>Revenue</p>
              <p className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mobile-text`}>${(stats.totalRevenue/1000).toFixed(0)}K</p>
              <p className={`text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mobile-text`}>${stats.avgOrderValue.toFixed(0)} avg</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className={`rounded-2xl shadow-sm border p-4 sm:p-6 mobile-card ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders, customers, products, emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mobile-focus ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`}
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center mobile-touch-action"
              >
                <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Cancelled</option>
              <option>Refunded</option>
            </select>
            
            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className={`px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option>All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="customer">Sort by Customer</option>
              <option value="status">Sort by Status</option>
            </select>
            
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={`px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                {selectedOrders.length} orders selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className={`px-3 py-1.5 text-xs rounded-lg ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                Export
              </button>
              <button className={`px-3 py-1.5 text-xs rounded-lg ${isDarkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                Mark Complete
              </button>
              <button className={`px-3 py-1.5 text-xs rounded-lg ${isDarkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Display */}
      {viewMode === 'cards' ? (
        // Card View
        <div className="space-y-4">
          {currentOrders.map((order) => (
            <div key={order.id} className={`rounded-2xl shadow-sm border p-5 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-all duration-200`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleOrderSelection(order.id)}
                    className={`mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                  />
                  <div>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {order.id}
                    </h3>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {order.customer}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {order.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {order.amount}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    {order.product}
                  </p>
                  <div className="flex space-x-2">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className={`px-4 py-2 text-xs rounded-lg font-medium transition-all duration-200 ${isDarkMode ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}>
                    View
                  </button>
                  <button className={`px-4 py-2 text-xs rounded-lg font-medium transition-all duration-200 ${isDarkMode ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}>
                    Edit
                  </button>
                  <button className={`px-4 py-2 text-xs rounded-lg font-medium transition-all duration-200 ${isDarkMode ? 'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className={`rounded-2xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === currentOrders.length && currentOrders.length > 0}
                      onChange={selectAllOrders}
                      className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Order</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Customer</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Product</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Amount</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date</span>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {currentOrders.map((order) => (
                  <tr key={order.id} className={`hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors duration-150`}>
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleOrderSelection(order.id)}
                        className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {order.id}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {order.priority}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {order.customer}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {order.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {order.product}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {order.amount}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <button className={`px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 ${isDarkMode ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}>
                          View
                        </button>
                        <button className={`px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 ${isDarkMode ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}>
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Advanced Pagination */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <div className="text-sm">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-500 hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
          >
            Previous
          </button>
          
          {/* Page Numbers */}
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              if (pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                    currentPage === pageNum
                      ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`
                      : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-500 hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-500 hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UltraResponsiveOrderPage;
