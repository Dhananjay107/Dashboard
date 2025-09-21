import KPICards from './KPICards';
import Charts from './Charts';
import RevenueTrendChart from './RevenueTrendChart';
import RevenueByLocation from './RevenueByLocation';
import TopSellingProducts from './TopSellingProducts';
import TotalSalesChart from './TotalSalesChart';
import { useDarkMode } from '../contexts/DarkModeContext';

const Dashboard = () => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>eCommerce</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <KPICards />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <Charts />
        </div> 
      </div>

      {/* Revenue Charts Section */}
      <div className="mt-8">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1">
            <RevenueTrendChart />
          </div>
          <div className="flex-shrink-0">
            <RevenueByLocation />
          </div>
        </div>
      </div>

      {/* Products and Sales Section */}
      <div className="mt-8">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-[4]">
            <div className={`rounded-xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <TopSellingProducts />
            </div>
          </div>
          <div className="flex-1">
            <div className={`rounded-xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <TotalSalesChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
