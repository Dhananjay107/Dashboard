import { useState, useEffect, useMemo } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import ordersData from '../data/ordersData';
import MobileNavbar from './MobileNavbar';

const MobileResponsiveOrdersPage = () => {
  const { isDarkMode } = useDarkMode();
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  
  const itemsPerPage = 8;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter and search functionality
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

    return filtered;
  }, [searchTerm, statusFilter, priorityFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

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

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="p-4">
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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Navbar with Sidebar */}
      <MobileNavbar />

      <div className="p-4 space-y-4">
        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`rounded-xl shadow-sm border p-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.pending}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.completed}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revenue</p>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${(stats.totalRevenue/1000).toFixed(0)}K</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search and Filters */}
        <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Filter Controls */}
          <div className="grid grid-cols-2 gap-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option value="All Status">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
            </select>

            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className={`px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option value="All Priority">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Mobile Orders List - All Data Displayed */}
        <div className="space-y-3">
          {currentOrders.map((order) => (
            <div key={order.id} className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              {/* Order Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${order.status === 'Completed' ? 'bg-green-500' : order.status === 'Pending' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {order.id}
                  </span>
                </div>
                <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {order.amount}
                </span>
              </div>
              
              {/* Customer Info */}
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">
                    {order.customer.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {order.customer}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {order.email}
                  </div>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="mb-3">
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Product: <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{order.product}</span>
                </div>
              </div>
              
              {/* Status and Priority */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                    {order.priority}
                  </span>
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {new Date(order.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Page {currentPage} of {totalPages}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  currentPage === 1
                    ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                    : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`
                }`}
              >
                Prev
              </button>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                    : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileResponsiveOrdersPage;
