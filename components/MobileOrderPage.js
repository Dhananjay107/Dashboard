import { useState, useEffect, useMemo } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import ordersData from '../data/ordersData';

const MobileOrderPage = () => {
  const { isDarkMode } = useDarkMode();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  
  const itemsPerPage = 5; // Reduced for mobile

  useEffect(() => {
    setIsMounted(true);
    setIsLoaded(true);
  }, []);

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
    const totalRevenue = ordersData
      .filter(order => order.status === 'Completed')
      .reduce((sum, order) => sum + parseFloat(order.amount.replace('$', '')), 0);

    return { total, pending, completed, totalRevenue };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-48"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-300 rounded-lg h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Orders
        </h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage and track all your orders
        </p>
      </div>

      {/* Stats Cards - 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.pending}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.completed}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revenue</p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${(stats.totalRevenue/1000).toFixed(0)}K</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
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
              className={`px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option>All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          
          <button className={`w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="font-semibold">Add New Order</span>
          </button>
        </div>
      </div>

      {/* Orders List - Mobile Cards */}
      <div className="space-y-3">
        {currentOrders.map((order) => (
          <div key={order.id} className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {order.id}
                </h3>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {order.customer}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {order.product}
                </p>
              </div>
              <div className={`text-right`}>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {order.amount}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {order.date}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(order.priority)}`}>
                  {order.priority}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button className={`px-3 py-1 text-xs rounded-lg ${isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  View
                </button>
                <button className={`px-3 py-1 text-xs rounded-lg ${isDarkMode ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Pagination */}
      <div className={`flex items-center justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <div className="text-xs">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-xs rounded-lg disabled:opacity-50 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-500'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
          >
            Prev
          </button>
          <span className={`px-3 py-1 text-xs rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
            {currentPage} / {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-xs rounded-lg disabled:opacity-50 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-500'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileOrderPage;
