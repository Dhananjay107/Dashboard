import { useRouter } from 'next/router';
import { useDarkMode } from '../contexts/DarkModeContext';
import MobileNavbar from './MobileNavbar';
import ResponsiveOrderPage from './ResponsiveOrderPage';
import MobileDashboard from './MobileDashboard';

const UltraResponsiveLayout = ({ children }) => {
  const { isDarkMode } = useDarkMode();
  const router = useRouter();

  // Check current page
  const isOrderPage = router.pathname === '/orders';
  const isDashboardPage = router.pathname === '/';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} mobile-layout`}>
      {/* Mobile Navbar */}
      <MobileNavbar />
      
      {/* Main Content with proper top padding for fixed navbar */}
      <main className="pt-20 pb-6">
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
          {isOrderPage ? (
            <ResponsiveOrderPage />
          ) : isDashboardPage ? (
            <MobileDashboard />
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  );
};

export default UltraResponsiveLayout;
