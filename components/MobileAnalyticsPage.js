import { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import MobileNavbar from './MobileNavbar';

const MobileAnalyticsPage = () => {
  const { isDarkMode } = useDarkMode();
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'chart' },
    { id: 'traffic', name: 'Traffic', icon: 'users' },
    { id: 'sales', name: 'Sales', icon: 'trend' },
    { id: 'conversion', name: 'Conversion', icon: 'target' },
  ];

  const getIcon = (iconName) => {
    const icons = {
      chart: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      users: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      trend: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      target: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.chart;
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
        {/* Analytics Header */}
        <div className={`rounded-xl shadow-lg border p-4 ${isDarkMode ? 'bg-gradient-to-r from-purple-900 to-blue-900 border-gray-700' : 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                Analytics 📊
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-purple-100' : 'text-purple-100'}`}>
                Track your business performance
              </p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                98.5%
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-green-300' : 'text-green-300'}`}>
                +5.2% this week
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Tabs */}
        <div className={`rounded-xl shadow-sm border p-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="grid grid-cols-4 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-3 px-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? `${isDarkMode ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white'} shadow-sm`
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

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Page Views</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>12.5K</p>
                <p className={`text-xs text-green-600`}>+8.2%</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Unique Visitors</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>8.9K</p>
                <p className={`text-xs text-green-600`}>+12.1%</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bounce Rate</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>32.1%</p>
                <p className={`text-xs text-red-600`}>-2.4%</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg. Session</p>
                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>3m 42s</p>
                <p className={`text-xs text-green-600`}>+15.3%</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Content based on active tab */}
        <div className="space-y-4">
          {activeTab === 'overview' && (
            <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Traffic Overview
              </h3>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className={`text-gray-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Chart placeholder</p>
              </div>
            </div>
          )}

          {activeTab === 'traffic' && (
            <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Traffic Sources
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Organic Search</span>
                  </div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>45.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Direct</span>
                  </div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>28.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Social Media</span>
                  </div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>15.1%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Referral</span>
                  </div>
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>11.0%</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Sales Analytics
              </h3>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className={`text-gray-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sales chart placeholder</p>
              </div>
            </div>
          )}

          {activeTab === 'conversion' && (
            <div className={`rounded-xl shadow-sm border p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Conversion Funnel
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Visitors</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                      <div className="w-full h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>100%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Leads</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                      <div className="w-3/4 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Customers</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                      <div className="w-1/2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>50%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Revenue</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                      <div className="w-1/4 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>25%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileAnalyticsPage;
