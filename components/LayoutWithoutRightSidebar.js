import { useState } from 'react';
import Image from 'next/image';
import { useDarkMode } from '../contexts/DarkModeContext';
import Link from 'next/link';

const LayoutWithoutRightSidebar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userProfileExpanded, setUserProfileExpanded] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-56' : 'w-16'} transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg flex flex-col h-full`}>
        <div className="p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            {sidebarOpen && (
              <span className={`ml-3 text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>ByeWind</span>
            )}
          </div>
        </div>

        <nav className="px-4 space-y-8 flex-1 overflow-y-auto scrollbar-hide pb-6">
          {/* Favorites Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Favorites</span>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Recently</span>
            </div>
          <div className="space-y-1">
            <div className={`flex items-center px-2 py-2 rounded cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-3 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
                {sidebarOpen && <span className="text-sm">Overview</span>}
            </div>
            <div className={`flex items-center px-2 py-2 rounded cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-3 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
                {sidebarOpen && <span className="text-sm">Projects</span>}
              </div>
            </div>
          </div>

          {/* Dashboards Section */}
          <div className="space-y-4">
            <div className="px-2">
              <span className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dashboards</span>
            </div>
            <div className="space-y-1">
              {/* Default - Active */}
              <Link href="/orders">
                <div className={`flex items-center px-2 py-2 rounded cursor-pointer relative ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-r ${isDarkMode ? 'bg-white' : 'bg-gray-800'}`}></div>
                  <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  {sidebarOpen && <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Default</span>}
                </div>
              </Link>
              
              {/* eCommerce */}
              <Link href="/">
                <div className={`flex items-center px-2 py-2 rounded cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <svg className={`w-3 h-3 mr-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {sidebarOpen && <span className="text-sm">eCommerce</span>}
                </div>
              </Link>
              
              {/* Projects */}
              <div className={`flex items-center px-2 py-2 rounded cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                <svg className={`w-3 h-3 mr-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                {sidebarOpen && <span className="text-sm">Projects</span>}
              </div>
              
              {/* Online Courses */}
              <div className={`flex items-center px-2 py-2 rounded cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                <svg className={`w-3 h-3 mr-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {sidebarOpen && <span className="text-sm">Online Courses</span>}
              </div>
            </div>
          </div>

          {/* Pages Section */}
          <div className="space-y-4">
            <div className="px-2">
              <span className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pages</span>
            </div>
            <div className="space-y-1">
              {/* User Profile - Expanded */}
              <div className="space-y-1">
                <div 
                  className={`flex items-center px-2 py-2 rounded cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setUserProfileExpanded(!userProfileExpanded)}
                >
                  <svg className={`w-3 h-3 mr-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {sidebarOpen && <span className="text-sm">User Profile</span>}
                </div>
                
                {/* User Profile Sub-items */}
                {userProfileExpanded && sidebarOpen && (
                  <div className="ml-6 space-y-1">
                    <div className={`flex items-center px-2 py-1 rounded cursor-pointer ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <span className="text-sm">Overview</span>
                    </div>
                    <div className={`flex items-center px-2 py-1 rounded cursor-pointer ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <span className="text-sm">Projects</span>
                    </div>
                    <div className={`flex items-center px-2 py-1 rounded cursor-pointer ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <span className="text-sm">Campaigns</span>
                    </div>
                    <div className={`flex items-center px-2 py-1 rounded cursor-pointer ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <span className="text-sm">Documents</span>
                    </div>
                    <div className={`flex items-center px-2 py-1 rounded cursor-pointer ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <span className="text-sm">Followers</span>
                    </div>
                  </div>
                )}
              </div>
              
            {/* Account */}
            <div className={`flex items-center px-2 py-2 rounded cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                <svg className={`w-3 h-3 mr-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7a4 4 0 118 0" />
                </svg>
                {sidebarOpen && <span className="text-sm">Account</span>}
              </div>

            {/* Corporate */}
            <div className={`flex items-center px-2 py-2 rounded cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                <svg className={`w-3 h-3 mr-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {sidebarOpen && <span className="text-sm">Corporate</span>}
              </div>

            {/* Blog */}
            <div className={`flex items-center px-2 py-2 rounded cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                <svg className={`w-3 h-3 mr-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {sidebarOpen && <span className="text-sm">Blog</span>}
              </div>

            {/* Social */}
            <div className={`flex items-center px-2 py-2 rounded cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                <svg className={`w-3 h-3 mr-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {sidebarOpen && <span className="text-sm">Social</span>}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`shadow-sm border-b px-6 py-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            {/* Left Section - Icons and Breadcrumb */}
            <div className="flex items-center space-x-4">
              {/* Document Icon */}
              <div className={`p-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              {/* Star Icon */}
              <div className={`p-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>

              {/* Breadcrumb Navigation */}
              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dashboards</span>
                <span className={`mx-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>/</span>
                <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Default</span>
              </div>
            </div>

            {/* Center Section - Search Bar */}
            <div className="flex-1 flex justify-center max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className={`w-full pl-10 pr-12 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>⌘/</span>
                </div>
              </div>
            </div>

            {/* Right Section - Icons */}
            <div className="flex items-center space-x-1">
              {/* Theme Toggle */}
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <svg className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>

              {/* Clock Icon */}
              <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {/* User Profile Icon */}
              <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto scrollbar-hide">
          <div className={`min-h-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LayoutWithoutRightSidebar;
