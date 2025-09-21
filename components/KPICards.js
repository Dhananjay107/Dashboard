import { useDarkMode } from '../contexts/DarkModeContext';

const KPICards = () => {
  const { isDarkMode } = useDarkMode();
  const kpiData = [
    {
      title: 'Customers',
      value: '3,781',
      change: '+11.01%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Orders',
      value: '1,219',
      change: '-0.03%',
      trend: 'down',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      title: 'Revenue',
      value: '$695',
      change: '+15.03%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      title: 'Growth',
      value: '30.1%',
      change: '+6.08%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {kpiData.map((kpi, index) => (
        <div key={index} className={`rounded-md shadow-sm border p-3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className={`p-1 rounded ${isDarkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
              <div className="text-blue-600">
                {kpi.icon}
              </div>
            </div>
          </div>
          <div>
            <h3 className={`text-xs font-medium mb-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{kpi.title}</h3>
            <div className="flex items-center">
              <p className={`text-base font-bold mr-10 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{kpi.value}</p>
              <div className={`flex items-center text-xs font-medium ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.trend === 'up' ? (
                  <svg className="w-2.5 h-2.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ) : (
                  <svg className="w-2.5 h-2.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h-8m0 0v-8m0 8l8-8 4 4 6-6" />
                  </svg>
                )}
                {kpi.change}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
