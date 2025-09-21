import { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import MobileNavbar from './MobileNavbar';

const MobileCustomersPage = () => {
  const { isDarkMode } = useDarkMode();
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const customers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      status: 'Active',
      totalOrders: 12,
      totalSpent: '$2,450',
      joinDate: '2024-01-15',
      avatar: 'JS'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 234-5678',
      status: 'Active',
      totalOrders: 8,
      totalSpent: '$1,890',
      joinDate: '2024-02-03',
      avatar: 'SJ'
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1 (555) 345-6789',
      status: 'Inactive',
      totalOrders: 3,
      totalSpent: '$450',
      joinDate: '2023-12-20',
      avatar: 'MD'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      email: 'emily.wilson@email.com',
      phone: '+1 (555) 456-7890',
      status: 'Active',
      totalOrders: 15,
      totalSpent: '$3,200',
      joinDate: '2023-11-08',
      avatar: 'EW'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+1 (555) 567-8901',
      status: 'VIP',
      totalOrders: 25,
      totalSpent: '$5,800',
      joinDate: '2023-08-15',
      avatar: 'DB'
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'VIP':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isMounted) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-32"></div>
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
      <MobileNavbar />

      <div className="p-4 space-y-6">
        {/* Customers Header */}
        <div className={`rounded-xl shadow-lg border p-4 ${isDarkMode ? 'bg-gradient-to-r from-green-900 to-blue-900 border-gray-700' : 'bg-gradient-to-r from-green-600 to-blue-600 border-green-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                Customers 👥
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-green-100' : 'text-green-100'}`}>
                Manage your customer relationships
              </p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                {customers.length}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-green-300' : 'text-green-300'}`}>
                Total customers
              </p>
            </div>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className={`rounded-xl shadow-sm border p-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="text-center">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active</p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {customers.filter(c => c.status === 'Active').length}
              </p>
            </div>
          </div>
          <div className={`rounded-xl shadow-sm border p-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="text-center">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>VIP</p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {customers.filter(c => c.status === 'VIP').length}
              </p>
            </div>
          </div>
          <div className={`rounded-xl shadow-sm border p-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="text-center">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>New</p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search customers..."
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
            
            {/* Filter */}
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            >
              <option value="All">All Customers</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
        </div>

        {/* Add Customer Button */}
        <button className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg flex items-center justify-center space-x-2`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add New Customer</span>
        </button>

        {/* Customers List */}
        <div className="space-y-3">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              {/* Customer Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">
                      {customer.avatar}
                    </span>
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {customer.name}
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {customer.email}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                  {customer.status}
                </span>
              </div>

              {/* Customer Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {customer.phone}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Orders</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {customer.totalOrders}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Spent</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {customer.totalSpent}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Member Since</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {new Date(customer.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-3">
                <button className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                  View Orders
                </button>
                <button className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                  Edit
                </button>
                <button className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileCustomersPage;
