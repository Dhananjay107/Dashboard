import { useState, useEffect, useMemo } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import ordersData from '../data/ordersData';

const ResponsiveOrderPage = () => {
  const { isDarkMode } = useDarkMode();
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  
  const itemsPerPage = 10;

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

  // Prevent hydration mismatch by not rendering until mounted
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
    <div className="p-4 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Orders
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and track all your orders ({filteredOrders.length} total)
          </p>
        </div>
        
        <button className={`px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2 shadow-lg w-full sm:w-auto justify-center`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="font-semibold">Add Order</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-all duration-200`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Orders</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
              <p className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>+12% from last month</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-all duration-200`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.pending}</p>
              <p className={`text-xs ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Needs attention</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-all duration-200`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stats.completed}</p>
              <p className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>+8% from last month</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-all duration-200`}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revenue</p>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>${(stats.totalRevenue/1000).toFixed(0)}K</p>
              <p className={`text-xs ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>${stats.avgOrderValue.toFixed(0)} avg</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-xl shadow-sm border p-4 sm:p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders, customers, products, emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`}
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
          
          {/* Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
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
              className={`px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option value="All Priority">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button className={`px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium transition-all duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
              Export
            </button>

            <button className={`px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium transition-all duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
              Bulk Actions
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className={`rounded-xl shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto desktop-only">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {currentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${order.status === 'Completed' ? 'bg-green-500' : order.status === 'Pending' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {order.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-semibold">
                          {order.customer.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {order.customer}
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {order.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {order.product}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {order.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className={`text-blue-600 hover:text-blue-900 ${isDarkMode ? 'hover:text-blue-400' : ''}`}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden mobile-only">
          {currentOrders.map((order) => (
            <div key={order.id} className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} last:border-b-0`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${order.status === 'Completed' ? 'bg-green-500' : order.status === 'Pending' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {order.id}
                  </span>
                </div>
                <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {order.amount}
                </span>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-semibold">
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
              
              <div className="mb-3">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                  {order.product}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
                    {order.priority}
                  </span>
                </div>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                currentPage === 1
                  ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                  : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`
              }`}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`
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
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
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
  );
};

export default ResponsiveOrderPage;
