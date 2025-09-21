import { useDarkMode } from '../contexts/DarkModeContext';

const MobileCharts = () => {
  const { isDarkMode } = useDarkMode();
  const projectionData = [
    { month: 'Jan', actual: 16, projection: 20 },
    { month: 'Feb', actual: 20, projection: 24 },
    { month: 'Mar', actual: 17, projection: 21 },
    { month: 'Apr', actual: 21, projection: 27 },
    { month: 'May', actual: 14, projection: 18 },
    { month: 'Jun', actual: 20, projection: 24 }
  ];

  const maxValue = 30;
  const chartHeight = 140; // Increased for mobile

  return (
    <div className="space-y-4">
      {/* Chart Container */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className={`absolute left-0 top-0 h-full flex flex-col justify-between text-xs z-10 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>30M</span>
          <span>20M</span>
          <span>10M</span>
          <span>0</span>
        </div>
        
        {/* Grid lines */}
        <div className="absolute left-8 right-0 top-0" style={{ height: chartHeight }}>
          <div className="relative h-full">
            <div className={`absolute top-0 left-0 right-0 h-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
            <div className={`absolute top-1/3 left-0 right-0 h-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
            <div className={`absolute top-2/3 left-0 right-0 h-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
            <div className={`absolute bottom-0 left-0 right-0 h-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
          </div>
        </div>
        
        {/* Chart Area */}
        <div className="ml-8 relative">
          {/* Bars */}
          <div className="flex items-end justify-between h-full space-x-3" style={{ height: chartHeight }}>
            {projectionData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="flex flex-col justify-end w-full" style={{ height: `${chartHeight - 30}px` }}>
                  {/* Stacked bars */}
                  <div className="w-full flex flex-col">
                    {/* Projections (top, light gray) */}
                    <div 
                      className={`w-full rounded-t-sm ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                      style={{ height: `${((data.projection - data.actual) / maxValue) * (chartHeight - 30)}px` }}
                    ></div>
                    {/* Actuals (bottom, dark gray) */}
                    <div 
                      className={`w-full rounded-b-sm ${isDarkMode ? 'bg-blue-600' : 'bg-[#CDDEE9]'}`}
                      style={{ height: `${(data.actual / maxValue) * (chartHeight - 30)}px` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-3">
            {projectionData.map((data, index) => (
              <span key={index} className={`text-xs text-center flex-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {data.month}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-sm ${isDarkMode ? 'bg-blue-600' : 'bg-[#CDDEE9]'}`}></div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actual</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-sm ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Projection</span>
        </div>
      </div>
    </div>
  );
};

export default MobileCharts;
