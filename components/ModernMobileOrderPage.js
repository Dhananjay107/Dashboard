import { useState, useEffect, useMemo } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import ordersData from '../data/ordersData';

const ModernMobileOrderPage = () => {
  const { isDarkMode } = useDarkMode();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullToRefreshY, setPullToRefreshY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  
  const itemsPerPage = 8; // Optimized for mobile

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Pull to refresh functionality
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setPullToRefreshY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (window.scrollY === 0 && e.touches[0].clientY > pullToRefreshY) {
      const pullDistance = e.touches[0].clientY - pullToRefreshY;
      if (pullDistance > 0) {
        setIsPulling(true);
        // Don't preventDefault to avoid passive event listener issues
      }
    }
  };

  const handleTouchEnd = async () => {
    if (isPulling && window.scrollY === 0) {
      setIsRefreshing(true);
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsRefreshing(false);
    }
    setIsPulling(false);
    setPullToRefreshY(0);
  };

  // Enhanced touch interactions
  const handleOrderCardPress = (order) => {
    setSelectedOrder(selectedOrder?.id === order.id ? null : order);
  };

  // Filter and search functionality
  const filteredOrders = useMemo(() => {
    return ordersData.filter(order => {
      const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.product.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All Status' || order.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || order.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchTerm, statusFilter, priorityFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priorityFilter]);

  // Statistics calculations
  const stats = useMemo(() => {
    const total = ordersData.length;
    const pending = ordersData.filter(order => order.status === 'Pending').length;
    const completed = ordersData.filter(order => order.status === 'Completed').length;
    const processing = ordersData.filter(order => order.status === 'Processing').length;
    const totalRevenue = ordersData
      .filter(order => order.status === 'Completed')
      .reduce((sum, order) => sum + parseFloat(order.amount.replace('$', '')), 0);

    return { total, pending, completed, processing, totalRevenue };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Refunded':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'Pending':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Processing':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="p-4 space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-48"></div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-300 rounded-xl h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to Refresh Indicator */}
      {(isPulling || isRefreshing) && (
        <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-b-xl shadow-lg px-4 py-2 transition-all duration-300`}>
          <div className="flex items-center space-x-2">
            {isRefreshing ? (
              <>
                <svg className="w-4 h-4 animate-spin text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Refreshing...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pull to refresh</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Content Header - No longer sticky */}
      <div className="p-4 space-y-4">
        {/* Title and Filter Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
              Orders
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
              {filteredOrders.length} orders found
            </p>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl transition-all duration-200 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders, customers, products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} shadow-sm`}
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className={`rounded-2xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-all duration-300 hover:shadow-md`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Orders</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
                <p className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>+12% this month</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-all duration-300 hover:shadow-md`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.pending}</p>
                <p className={`text-xs ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Needs attention</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-all duration-300 hover:shadow-md`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.completed}</p>
                <p className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>+8% this month</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-all duration-300 hover:shadow-md`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revenue</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${(stats.totalRevenue/1000).toFixed(0)}K</p>
                <p className={`text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>+15% this month</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className={`mx-4 mb-4 rounded-2xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-all duration-300`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Filters</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
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
            </div>
            
            <button className={`w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="font-semibold">Add New Order</span>
            </button>
          </div>
        </div>
      )}

      {/* Orders List */}
      <div className="px-4 space-y-3 pb-6">
        {currentOrders.map((order, index) => (
          <div 
            key={order.id} 
            className={`rounded-2xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-all duration-300 hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${selectedOrder?.id === order.id ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              animationDelay: `${index * 50}ms`,
              animation: isLoaded ? 'slideInUp 0.5s ease-out forwards' : 'none'
            }}
            onClick={() => handleOrderCardPress(order)}
          >
            {/* Order Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-sm`}>
                  <span className="text-white text-sm font-bold">
                    {order.customer.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {order.id}
                  </h3>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {order.customer}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {order.amount}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {order.date}
                </p>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="mb-3">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {order.product}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {order.email}
              </p>
            </div>
            
            {/* Status and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="ml-1">{order.status}</span>
                </span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                  {order.priority}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button className={`px-3 py-1.5 text-xs rounded-lg transition-all duration-200 ${isDarkMode ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}>
                  View
                </button>
                <button className={`px-3 py-1.5 text-xs rounded-lg transition-all duration-200 ${isDarkMode ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={`sticky bottom-0 ${isDarkMode ? 'bg-gray-900/95 backdrop-blur-md' : 'bg-gray-50/95 backdrop-blur-md'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} p-4`}>
          <div className="flex items-center justify-between">
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length}
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 text-xs rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-500 hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} shadow-sm`}
              >
                Prev
              </button>
              <span className={`px-3 py-2 text-xs rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} shadow-sm`}>
                {currentPage} / {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 text-xs rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-500 hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} shadow-sm`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ModernMobileOrderPage;
