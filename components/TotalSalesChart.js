import { useDarkMode } from '../contexts/DarkModeContext';

const TotalSalesChart = () => {
  const { isDarkMode } = useDarkMode();
  const salesData = [
    { source: 'Direct', amount: '$300.56', percentage: 47.1, color: 'bg-gray-900' },
    { source: 'Affiliate', amount: '$135.18', percentage: 21.1, color: 'bg-green-500' },
    { source: 'Sponsored', amount: '$154.02', percentage: 24.0, color: 'bg-purple-500' },
    { source: 'E-mail', amount: '$48.96', percentage: 7.8, color: 'bg-blue-400' }
  ];

  const totalPercentage = salesData.reduce((sum, item) => sum + item.percentage, 0);
  const remainingPercentage = 100 - totalPercentage;

  return (
    <div className="max-w-2xl">
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total Sales</h3>
      
      <div className="flex items-center justify-center">
        {/* Donut Chart */}
        <div className="relative w-35 h-35 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={isDarkMode ? '#374151' : '#e5e7eb'}
              strokeWidth="8"
            />
            
            {/* Data segments */}
            {salesData.map((item, index) => {
              const startAngle = salesData.slice(0, index).reduce((sum, prev) => sum + (prev.percentage / 100) * 360, 0);
              const endAngle = startAngle + (item.percentage / 100) * 360;
              
              const startAngleRad = (startAngle * Math.PI) / 180;
              const endAngleRad = (endAngle * Math.PI) / 180;
              
              const x1 = 50 + 40 * Math.cos(startAngleRad);
              const y1 = 50 + 40 * Math.sin(startAngleRad);
              const x2 = 50 + 40 * Math.cos(endAngleRad);
              const y2 = 50 + 40 * Math.sin(endAngleRad);
              
              const largeArcFlag = item.percentage > 50 ? 1 : 0;
              
              const pathData = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={item.color === 'bg-gray-900' ? '#1f2937' : 
                        item.color === 'bg-green-500' ? '#10b981' :
                        item.color === 'bg-purple-500' ? '#8b5cf6' : '#60a5fa'}
                />
              );
            })}
            
            {/* Center circle for donut effect */}
            <circle
              cx="50"
              cy="50"
              r="25"
              fill={isDarkMode ? '#1f2937' : 'white'}
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>47.1%</div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Direct</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-3">
        {salesData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 ${item.color} rounded-full mr-3`}></div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.source}</span>
            </div>
            <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalSalesChart;
