import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDarkMode } from '../contexts/DarkModeContext';

const AdvancedMobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userProfileExpanded, setUserProfileExpanded] = useState(false);
  const [accountExpanded, setAccountExpanded] = useState(false);
  const [corporateExpanded, setCorporateExpanded] = useState(false);
  const [blogExpanded, setBlogExpanded] = useState(false);
  const [socialExpanded, setSocialExpanded] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
    }
  };

  return (
    <>
      {/* Advanced Mobile Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? `${isDarkMode ? 'bg-gray-800/95 backdrop-blur-md border-b border-gray-700' : 'bg-white/95 backdrop-blur-md border-b border-gray-200'} shadow-lg` 
          : `${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`
      }`}>
        <div className="px-4 py-3">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-3">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  ByeWind
                </span>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Dashboard
                </div>
              </div>
            </Link>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <button className={`relative p-2.5 rounded-xl transition-all duration-200 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Theme Toggle */}
              <button 
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-xl transition-all duration-200 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <svg className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>

              {/* Menu Toggle */}
              <button 
                onClick={toggleMenu}
                className={`p-2.5 rounded-xl transition-all duration-200 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${isMenuOpen ? 'bg-blue-100 text-blue-600' : ''}`}
              >
                <svg className={`w-6 h-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className={`transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
            <form onSubmit={handleSearch} className="relative">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                searchFocused ? 'text-blue-500' : isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search orders, customers, products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl text-sm transition-all duration-200 focus:outline-none ${
                  searchFocused 
                    ? 'border-blue-500 shadow-lg' 
                    : isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:border-gray-500' 
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 hover:border-gray-400'
                }`}
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => setSearchValue('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </form>
          </div>
        </div>
      </header>

      {/* Advanced Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={toggleMenu}
          ></div>
          
          {/* Side Menu */}
          <div className={`fixed left-0 top-0 h-full w-80 max-w-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl transform transition-transform duration-300 ease-out`}>
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                  <div>
                    <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      ByeWind
                    </span>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Dashboard
                    </div>
                  </div>
                </div>
                <button 
                  onClick={toggleMenu}
                  className={`p-2 rounded-xl transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <svg className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Favorites Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between px-2 mb-3">
                    <span className={`text-xs uppercase tracking-wider font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Favorites
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                      Recently
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-3 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm">Overview</span>
                    </div>
                    <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-3 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm">Projects</span>
                    </div>
                  </div>
                </div>

                {/* Dashboards Section */}
                <div className="mb-6">
                  <div className="px-2 mb-3">
                    <span className={`text-xs uppercase tracking-wider font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Dashboards
                    </span>
                  </div>
                  <div className="space-y-1">
                    {/* Default - Orders */}
                    <Link href="/orders" onClick={toggleMenu}>
                      <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer relative transition-all duration-200 ${
                        router.pathname === '/orders'
                          ? `${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} ${isDarkMode ? 'text-white' : 'text-gray-800'}`
                          : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                      }`}>
                        {router.pathname === '/orders' && (
                          <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-r ${isDarkMode ? 'bg-white' : 'bg-gray-800'}`}></div>
                        )}
                        <svg className={`w-4 h-4 mr-3 ${router.pathname === '/orders' ? (isDarkMode ? 'text-gray-200' : 'text-gray-700') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                        <span className={`text-sm font-medium ${router.pathname === '/orders' ? 'font-semibold' : ''}`}>Default</span>
                      </div>
                    </Link>
                    
                    {/* eCommerce */}
                    <Link href="/" onClick={toggleMenu}>
                      <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        router.pathname === '/'
                          ? `${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} ${isDarkMode ? 'text-white' : 'text-gray-800'}`
                          : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                      }`}>
                        <svg className={`w-3 h-3 mr-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <svg className={`w-4 h-4 mr-3 ${router.pathname === '/' ? (isDarkMode ? 'text-gray-200' : 'text-gray-700') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className={`text-sm ${router.pathname === '/' ? 'font-semibold' : ''}`}>eCommerce</span>
                      </div>
                    </Link>
                    
                    {/* Projects */}
                    <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                      <svg className={`w-3 h-3 mr-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      </svg>
                      <span className="text-sm">Projects</span>
                    </div>
                    
                    {/* Online Courses */}
                    <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                      <svg className={`w-3 h-3 mr-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="text-sm">Online Courses</span>
                    </div>
                  </div>
                </div>

                {/* Pages Section */}
                <div className="mb-6">
                  <div className="px-2 mb-3">
                    <span className={`text-xs uppercase tracking-wider font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Pages
                    </span>
                  </div>
                  <div className="space-y-1">
                    {/* User Profile - Expandable */}
                    <div className="space-y-1">
                      <div 
                        className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setUserProfileExpanded(!userProfileExpanded)}
                      >
                        <svg className={`w-3 h-3 mr-3 transition-transform duration-200 ${userProfileExpanded ? 'rotate-90' : ''} ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm">User Profile</span>
                      </div>
                      
                      {/* User Profile Sub-items */}
                      {userProfileExpanded && (
                        <div className="ml-8 space-y-1">
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Overview</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Projects</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Campaigns</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Documents</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Followers</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Account - Expandable */}
                    <div className="space-y-1">
                      <div 
                        className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setAccountExpanded(!accountExpanded)}
                      >
                        <svg className={`w-3 h-3 mr-3 transition-transform duration-200 ${accountExpanded ? 'rotate-90' : ''} ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7a4 4 0 118 0" />
                        </svg>
                        <span className="text-sm">Account</span>
                      </div>
                      
                      {/* Account Sub-items */}
                      {accountExpanded && (
                        <div className="ml-8 space-y-1">
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Settings</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Billing</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Security</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Corporate - Expandable */}
                    <div className="space-y-1">
                      <div 
                        className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setCorporateExpanded(!corporateExpanded)}
                      >
                        <svg className={`w-3 h-3 mr-3 transition-transform duration-200 ${corporateExpanded ? 'rotate-90' : ''} ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm">Corporate</span>
                      </div>
                      
                      {/* Corporate Sub-items */}
                      {corporateExpanded && (
                        <div className="ml-8 space-y-1">
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">About Us</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Contact</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Careers</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Blog - Expandable */}
                    <div className="space-y-1">
                      <div 
                        className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setBlogExpanded(!blogExpanded)}
                      >
                        <svg className={`w-3 h-3 mr-3 transition-transform duration-200 ${blogExpanded ? 'rotate-90' : ''} ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">Blog</span>
                      </div>
                      
                      {/* Blog Sub-items */}
                      {blogExpanded && (
                        <div className="ml-8 space-y-1">
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Latest Posts</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Categories</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Archives</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Social - Expandable */}
                    <div className="space-y-1">
                      <div 
                        className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setSocialExpanded(!socialExpanded)}
                      >
                        <svg className={`w-3 h-3 mr-3 transition-transform duration-200 ${socialExpanded ? 'rotate-90' : ''} ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <svg className={`w-4 h-4 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        <span className="text-sm">Social</span>
                      </div>
                      
                      {/* Social Sub-items */}
                      {socialExpanded && (
                        <div className="ml-8 space-y-1">
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Twitter</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Facebook</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">LinkedIn</span>
                          </div>
                          <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                            <span className="text-sm">Instagram</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdvancedMobileNavbar;