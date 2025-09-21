import { useDarkMode } from '../contexts/DarkModeContext';

const Charts = () => {
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
  const chartHeight = 110;

  return (
    <div className={`rounded-xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Projections vs Actuals</h3>
      
      {/* Chart Container */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className={`absolute left-0 top-0 h-full flex flex-col justify-between text-sm z-10 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>30M</span>
          <span>20M</span>
          <span>10M</span>
          <span>0</span>
        </div>
        
        {/* Grid lines */}
        <div className="absolute left-10 right-0 top-0" style={{ height: chartHeight }}>
          <div className="relative h-full">
            <div className={`absolute top-0 left-0 right-0 h-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
            <div className={`absolute top-1/3 left-0 right-0 h-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
            <div className={`absolute top-2/3 left-0 right-0 h-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
            <div className={`absolute bottom-0 left-0 right-0 h-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
          </div>
        </div>
        
        {/* Chart Area */}
        <div className="ml-10 relative">
          {/* Bars */}
          <div className="flex items-end justify-between h-full space-x-6" style={{ height: chartHeight }}>
            {projectionData.map((data, index) => (
              <div key={index} className="flex flex-col items-center w-4">
                <div className="flex flex-col justify-end w-full" style={{ height: `${chartHeight - 20}px` }}>
                  {/* Stacked bars */}
                  <div className="w-full flex flex-col">
                    {/* Projections (top, light gray) */}
                    <div 
                      className={`w-full rounded-t-sm ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
                      style={{ height: `${((data.projection - data.actual) / maxValue) * (chartHeight - 20)}px` }}
                    ></div>
                    {/* Actuals (bottom, dark gray) */}
                    <div 
                      className={`w-full rounded-b-sm ${isDarkMode ? 'bg-blue-600' : 'bg-[#CDDEE9]'}`}
                      style={{ height: `${(data.actual / maxValue) * (chartHeight - 20)}px` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* X-axis labels (outside background) */}
          <div className="flex justify-between mt-2 ml-1 mr-1">
            {projectionData.map((data, index) => (
              <span key={index} className={`text-xs w-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {data.month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
