import { useDarkMode } from '../contexts/DarkModeContext';

const RevenueTrendChart = () => {
  const { isDarkMode } = useDarkMode();
  const revenueData = [
    { month: 'Jan', current: 12, previous: 7 },
    { month: 'Feb', current: 8, previous: 18 },
    { month: 'Mar', current: 6, previous: 12 },
    { month: 'Apr', current: 10, previous: 8 },
    { month: 'May', current: 16, previous: 14 },
    { month: 'Jun', current: 20, previous: 25 }
  ];

  const maxValue = 30;
  const chartHeight = 180;

  // Calculate smooth curved path for line chart
  const getSmoothPathData = (data, type) => {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item[type] / maxValue) * 100);
      return { x, y };
    });
    
    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      
      if (next) {
        // Use cubic bezier curves for smooth lines
        const cp1x = prev.x + (curr.x - prev.x) / 3;
        const cp1y = prev.y;
        const cp2x = curr.x - (next.x - curr.x) / 3;
        const cp2y = curr.y;
        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
      } else {
        path += ` L ${curr.x},${curr.y}`;
      }
    }
    
    return path;
  };

  // Calculate smooth curved path for partial line (solid part of current week)
  const getSolidSmoothPathData = (data, type, endIndex) => {
    const points = data.slice(0, endIndex + 1).map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item[type] / maxValue) * 100);
      return { x, y };
    });
    
    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      
      if (next) {
        const cp1x = prev.x + (curr.x - prev.x) / 3;
        const cp1y = prev.y;
        const cp2x = curr.x - (next.x - curr.x) / 3;
        const cp2y = curr.y;
        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
      } else {
        path += ` L ${curr.x},${curr.y}`;
      }
    }
    
    return path;
  };

  // Calculate smooth curved path for dashed part of current week
  const getDashedSmoothPathData = (data, type, startIndex) => {
    const points = data.slice(startIndex).map((item, index) => {
      const x = ((startIndex + index) / (data.length - 1)) * 100;
      const y = 100 - ((item[type] / maxValue) * 100);
      return { x, y };
    });
    
    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      
      if (next) {
        const cp1x = prev.x + (curr.x - prev.x) / 3;
        const cp1y = prev.y;
        const cp2x = curr.x - (next.x - curr.x) / 3;
        const cp2y = curr.y;
        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
      } else {
        path += ` L ${curr.x},${curr.y}`;
      }
    }
    
    return path;
  };

  return (
    <div className={`rounded-xl shadow-sm border p-6 w-full max-w-5xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Revenue</h3>
        
        {/* KPI Cards */}
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Current Week</span>
            <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$58,211</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#CDDEE9'}}></div>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Previous Week</span>
            <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$68,768</span>
          </div>
        </div>
      </div>
      
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
        <div className="ml-10 relative" style={{ height: chartHeight }}>
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Current Week Line - Solid Part (Black) */}
            <path
              d={getSolidSmoothPathData(revenueData, 'current', 3)}
              stroke="#000000"
              strokeWidth="1.5"
              fill="none"
            />
            
            {/* Current Week Line - Dashed Part (Black) */}
            <path
              d={getDashedSmoothPathData(revenueData, 'current', 3)}
              stroke="#000000"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="2,2"
            />
            
            {/* Previous Week Line (Light Blue) */}
            <path
              d={getSmoothPathData(revenueData, 'previous')}
              stroke="#CDDEE9"
              strokeWidth="1.5"
              fill="none"
            />
            
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 ml-10 mr-0">
          {revenueData.map((data, index) => (
            <span key={index} className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {data.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueTrendChart;
