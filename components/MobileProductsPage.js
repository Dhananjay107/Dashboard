import { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import MobileNavbar from './MobileNavbar';

const MobileProductsPage = () => {
  const { isDarkMode } = useDarkMode();
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: '$129.99',
      stock: 45,
      status: 'In Stock',
      sales: 234,
      revenue: '$30,416',
      image: '🎧'
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Electronics',
      price: '$299.99',
      stock: 12,
      status: 'Low Stock',
      sales: 89,
      revenue: '$26,699',
      image: '⌚'
    },
    {
      id: 3,
      name: 'Laptop Stand',
      category: 'Accessories',
      price: '$49.99',
      stock: 78,
      status: 'In Stock',
      sales: 156,
      revenue: '$7,798',
      image: '💻'
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      price: '$79.99',
      stock: 0,
      status: 'Out of Stock',
      sales: 203,
      revenue: '$16,229',
      image: '🔊'
    },
    {
      id: 5,
      name: 'Phone Case',
      category: 'Accessories',
      price: '$24.99',
      stock: 156,
      status: 'In Stock',
      sales: 445,
      revenue: '$11,120',
      image: '📱'
    },
    {
      id: 6,
      name: 'Tablet',
      category: 'Electronics',
      price: '$399.99',
      stock: 8,
      status: 'Low Stock',
      sales: 67,
      revenue: '$26,799',
      image: '📱'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800 border-red-200';
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
        {/* Products Header */}
        <div className={`rounded-xl shadow-lg border p-4 ${isDarkMode ? 'bg-gradient-to-r from-purple-900 to-pink-900 border-gray-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                Products 📦
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-purple-100' : 'text-purple-100'}`}>
                Manage your product catalog
              </p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                {products.length}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-purple-300' : 'text-purple-300'}`}>
                Total products
              </p>
            </div>
          </div>
        </div>

        {/* Product Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className={`rounded-xl shadow-sm border p-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="text-center">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>In Stock</p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {products.filter(p => p.status === 'In Stock').length}
              </p>
            </div>
          </div>
          <div className={`rounded-xl shadow-sm border p-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="text-center">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Low Stock</p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {products.filter(p => p.status === 'Low Stock').length}
              </p>
            </div>
          </div>
          <div className={`rounded-xl shadow-sm border p-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="text-center">
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Out of Stock</p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {products.filter(p => p.status === 'Out of Stock').length}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
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
            
            {/* Filters */}
            <div className="grid grid-cols-2 gap-3">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={`px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
              </select>

              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
              >
                <option value="All">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Add Product Button */}
        <button className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg flex items-center justify-center space-x-2`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add New Product</span>
        </button>

        {/* Products List */}
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              {/* Product Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mr-3 text-2xl">
                    {product.image}
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {product.name}
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {product.category}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>

              {/* Product Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</span>
                  <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {product.price}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stock</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {product.stock} units
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sales</span>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {product.sales}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Revenue</span>
                  <span className={`text-xs font-medium text-green-600`}>
                    {product.revenue}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-3">
                <button className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                  View Details
                </button>
                <button className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                  Edit
                </button>
                <button className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                  Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileProductsPage;
