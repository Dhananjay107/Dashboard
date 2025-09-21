import { useState, useEffect, useMemo } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import ordersData from '../data/ordersData';

const OrderPage = () => {
  const { isDarkMode } = useDarkMode();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  
  const itemsPerPage = 10;

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

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-64"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl shadow-lg border p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-16 mb-4"></div>
                <div className="h-3 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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

  return (
    <div className={`p-4 sm:p-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className={`transform transition-all duration-500 delay-100 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
          <h1 className={`text-2xl sm:text-4xl font-bold bg-gradient-to-r ${isDarkMode ? 'from-white to-gray-300' : 'from-gray-900 to-gray-600'} bg-clip-text text-transparent mb-2`}>
            Orders
          </h1>
          <p className={`text-sm sm:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
            Manage and track all your orders with ease
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`group rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-blue-500' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-blue-300'} transform transition-all duration-300 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>Total Orders</p>
              <p className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-110`}>{stats.total.toLocaleString()}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <span className="text-green-700 text-sm font-bold">+12.5%</span>
            </div>
            <span className={`text-sm ml-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>from last month</span>
          </div>
        </div>

        <div className={`group rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-yellow-500' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-yellow-300'} transform transition-all duration-300 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>Pending Orders</p>
              <p className={`text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-110`}>{stats.pending}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 text-yellow-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <span className="text-yellow-700 text-sm font-bold">+5.2%</span>
            </div>
            <span className={`text-sm ml-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>from last month</span>
          </div>
        </div>

        <div className={`group rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-green-500' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-green-300'} transform transition-all duration-300 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>Completed Orders</p>
              <p className={`text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-110`}>{stats.completed}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <span className="text-green-700 text-sm font-bold">+8.7%</span>
            </div>
            <span className={`text-sm ml-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>from last month</span>
          </div>
        </div>

        <div className={`group rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-purple-300'} transform transition-all duration-300 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>Total Revenue</p>
              <p className={`text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-110`}>${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
              <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <span className="text-green-700 text-sm font-bold">+15.3%</span>
            </div>
            <span className={`text-sm ml-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>from last month</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`rounded-2xl shadow-lg border p-6 mb-8 backdrop-blur-sm ${isDarkMode ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700' : 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200'} transform transition-all duration-500 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full sm:w-72 pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 hover:bg-gray-700 focus:bg-gray-700' : 'border-gray-300 bg-white/50 text-gray-900 placeholder-gray-500 hover:bg-white focus:bg-white'} backdrop-blur-sm group-hover:shadow-md`}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} transition-colors duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 bg-white/50 text-gray-900 hover:bg-white'} backdrop-blur-sm`}
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
              className={`px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 bg-white/50 text-gray-900 hover:bg-white'} backdrop-blur-sm`}
            >
              <option>All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <button className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-lg hover:scale-105 transform ${isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'} flex items-center space-x-2`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="font-semibold">Add New Order</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className={`rounded-2xl shadow-lg border overflow-hidden backdrop-blur-sm ${isDarkMode ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700' : 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200'} transform transition-all duration-500 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gradient-to-r from-gray-700/80 to-gray-600/80' : 'bg-gradient-to-r from-gray-50/80 to-gray-100/80'} backdrop-blur-sm`}>
              <tr>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  Order ID
                </th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  Customer
                </th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  Product
                </th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  Status
                </th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  Priority
                </th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  Amount
                </th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  Date
                </th>
                <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm divide-y ${isDarkMode ? 'divide-gray-700/50' : 'divide-gray-200/50'}`}>
              {currentOrders.map((order, index) => (
                <tr 
                  key={order.id} 
                  className={`group transition-all duration-300 hover:scale-[1.01] ${isDarkMode ? 'hover:bg-gray-700/60' : 'hover:bg-gray-50/80'} transform transition-all duration-300 delay-${800 + (index * 100)} ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`text-sm font-bold bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-blue-300' : 'from-blue-600 to-blue-500'} bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105`}>
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                        {order.customer}
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                        {order.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-300`}>
                      {order.product}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full shadow-sm transition-all duration-300 hover:scale-105 ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full shadow-sm transition-all duration-300 hover:scale-105 ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`text-sm font-bold bg-gradient-to-r ${isDarkMode ? 'from-green-400 to-green-300' : 'from-green-600 to-green-500'} bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105`}>
                      {order.amount}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} transition-colors duration-300`}>
                      {order.date}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button className={`px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md ${isDarkMode ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300' : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700'}`}>
                        View
                      </button>
                      <button className={`px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md ${isDarkMode ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30 hover:text-green-300' : 'bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700'}`}>
                        Edit
                      </button>
                      <button className={`px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md ${isDarkMode ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300' : 'bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700'}`}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className={`flex items-center justify-between mt-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transform transition-all duration-500 delay-1200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-sm">
          Showing <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{startIndex + 1}</span> to <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{Math.min(endIndex, filteredOrders.length)}</span> of <span className="font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{filteredOrders.length}</span> results
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${isDarkMode ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white' : 'bg-white/50 text-gray-500 hover:bg-white hover:text-gray-700'} border backdrop-blur-sm ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
          >
            Previous
          </button>
          
          {/* Page Numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  currentPage === pageNum
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600'
                    : `${isDarkMode ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white' : 'bg-white/50 text-gray-500 hover:bg-white hover:text-gray-700'} border backdrop-blur-sm ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${isDarkMode ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white' : 'bg-white/50 text-gray-500 hover:bg-white hover:text-gray-700'} border backdrop-blur-sm ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
