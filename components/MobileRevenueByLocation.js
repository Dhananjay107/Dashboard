import { useDarkMode } from '../contexts/DarkModeContext';
import { useEffect, useState } from 'react';

const MobileRevenueByLocation = () => {
  const { isDarkMode } = useDarkMode();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const locations = [
    { city: 'New York', revenue: '72K', percentage: 100 },
    { city: 'San Francisco', revenue: '39K', percentage: 54 },
    { city: 'Sydney', revenue: '25K', percentage: 35 },
    { city: 'Singapore', revenue: '61K', percentage: 85 }
  ];

  return (
    <div className="space-y-4">
      {/* World Map */}
      <div className="relative">
        <svg viewBox="0 0 200 100" className={`w-full h-20 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
          {/* Simplified world map outline */}
          <path
            d="M20,30 Q30,20 40,25 Q50,15 60,20 Q70,10 80,15 Q90,8 100,12 Q110,5 120,8 Q130,6 140,10 Q150,8 160,12 Q170,10 180,15 Q185,20 190,25 L190,35 Q185,40 180,45 Q170,50 160,55 Q150,60 140,65 Q130,70 120,75 Q110,80 100,85 Q90,90 80,85 Q70,80 60,75 Q50,70 40,65 Q30,60 20,55 Q15,50 20,45 Z"
            fill="currentColor"
            opacity="0.3"
          />
          
          {/* Location markers */}
          <circle cx="35" cy="35" r="3" fill="#000000" />
          <circle cx="45" cy="30" r="3" fill="#000000" />
          <circle cx="120" cy="45" r="3" fill="#000000" />
          <circle cx="140" cy="60" r="3" fill="#000000" />
        </svg>
      </div>

      {/* Location List */}
      <div className="space-y-3">
        {locations.map((location, index) => (
          <div key={index} className={`rounded-lg p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{location.city}</span>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{location.revenue}</span>
            </div>
            <div className={`w-full h-1 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
              <div 
                className={`h-1 rounded-full transition-all duration-1000 ease-out ${
                  isAnimated ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  width: isAnimated ? `${location.percentage}%` : '0%', 
                  backgroundColor: '#CDDEE9',
                  transitionDelay: `${index * 200}ms`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileRevenueByLocation;
