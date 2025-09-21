import { useState, useEffect } from 'react';
import KPICards from './KPICards';
import MobileCharts from './MobileCharts';
import MobileRevenueChart from './MobileRevenueChart';
import MobileRevenueByLocation from './MobileRevenueByLocation';
import MobileTopSellingProducts from './MobileTopSellingProducts';
import MobileTotalSalesChart from './MobileTotalSalesChart';
import { useDarkMode } from '../contexts/DarkModeContext';

const MobileDashboard = () => {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
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

  if (!isLoaded) {
    return (
      <div className="pt-20 p-4">
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
    <div className="pt-20 p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          eCommerce Dashboard
        </h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Monitor your business performance
        </p>
      </div>

      {/* Mobile Tabs */}
      <div className={`rounded-2xl shadow-sm border p-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="grid grid-cols-4 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-1 px-3 py-3 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'} shadow-sm`
                  : `${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
              }`}
            >
              {getIcon(tab.icon)}
              <span className="text-xs font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className={`rounded-2xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Key Metrics
              </h2>
              <KPICards />
            </div>

            {/* Charts */}
            <div className={`rounded-2xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Analytics Overview
              </h2>
              <MobileCharts />
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-6">
            {/* Revenue Trend Chart */}
            <div className={`rounded-2xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Revenue Trends
              </h2>
              <MobileRevenueChart />
            </div>

            {/* Revenue by Location */}
            <div className={`rounded-2xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Revenue by Location
              </h2>
              <MobileRevenueByLocation />
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Top Selling Products */}
            <div className={`rounded-2xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Top Selling Products
              </h2>
              <MobileTopSellingProducts />
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="space-y-6">
            {/* Total Sales Chart */}
            <div className={`rounded-2xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Total Sales
              </h2>
              <MobileTotalSalesChart />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileDashboard;
