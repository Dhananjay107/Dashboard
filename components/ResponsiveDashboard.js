import { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import Dashboard from './Dashboard';
import Layout from './Layout';
import KPICards from './KPICards';
import MobileCharts from './MobileCharts';
import MobileRevenueChart from './MobileRevenueChart';
import MobileRevenueByLocation from './MobileRevenueByLocation';
import MobileTopSellingProducts from './MobileTopSellingProducts';
import MobileTotalSalesChart from './MobileTotalSalesChart';
import MobileNavbar from './MobileNavbar';

const ResponsiveDashboard = () => {
  const { isDarkMode } = useDarkMode();
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'chart' },
    { id: 'revenue', name: 'Revenue', icon: 'money' },
    { id: 'products', name: 'Products', icon: 'box' },
    { id: 'sales', name: 'Sales', icon: 'trend' },
  ];

  const getIcon = (iconName) => {
    const icons = {
      chart: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      money: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      box: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      trend: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    };
    return icons[iconName] || icons.chart;
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
    <>
      {/* Mobile Layout - Hidden on desktop */}
      <div className="lg:hidden">
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {/* Mobile Navbar with Sidebar */}
          <MobileNavbar />

          <div className="p-4 space-y-6">
            {/* Quick Stats Banner */}
            <div className={`rounded-xl shadow-lg border p-4 ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900 border-gray-700' : 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                    Welcome Back! 👋
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-blue-100' : 'text-blue-100'}`}>
                    Here's your business overview
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                    $24.5K
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-green-300' : 'text-green-300'}`}>
                    +12% this month
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Tabs */}
            <div className={`rounded-xl shadow-sm border p-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="grid grid-cols-4 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center py-3 px-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'} shadow-sm`
                        : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                    }`}
                  >
                    <div className="mb-1">
                      {getIcon(tab.icon)}
                    </div>
                    <span className="text-xs">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <KPICards />

            {/* Quick Actions */}
            <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className={`flex items-center p-3 rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>New Order</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Create order</p>
                  </div>
                </button>
                <button className={`flex items-center p-3 rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add Customer</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>New customer</p>
                  </div>
                </button>
                <button className={`flex items-center p-3 rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add Product</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>New product</p>
                  </div>
                </button>
                <button className={`flex items-center p-3 rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reports</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>View reports</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Charts based on active tab */}
            <div className="space-y-4">
              {activeTab === 'overview' && (
                <>
                  <MobileCharts />
                  <MobileTotalSalesChart />
                </>
              )}
              {activeTab === 'revenue' && (
                <>
                  <MobileRevenueChart />
                  <MobileRevenueByLocation />
                </>
              )}
              {activeTab === 'products' && (
                <MobileTopSellingProducts />
              )}
              {activeTab === 'sales' && (
                <MobileTotalSalesChart />
              )}
            </div>

            {/* Recent Activity */}
            <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>New order #1234 received</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>2 minutes ago</p>
                  </div>
                  <span className="text-green-600 text-sm font-medium">$299</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Customer John Smith registered</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Product "Wireless Headphones" updated</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Monthly report generated</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden lg:block">
        <Layout>
          <Dashboard />
        </Layout>
      </div>
    </>
  );
};

export default ResponsiveDashboard;
