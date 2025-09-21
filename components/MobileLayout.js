import { useRouter } from 'next/router';
import { useDarkMode } from '../contexts/DarkModeContext';
import MobileNavbar from './MobileNavbar';
import MobileOrderPage from './MobileOrderPage';

const MobileLayout = ({ children }) => {
  const { isDarkMode } = useDarkMode();
  const router = useRouter();

  // Check if we're on the orders page
  const isOrderPage = router.pathname === '/orders';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Navbar */}
      <MobileNavbar />
      
      {/* Main Content */}
      <main className="pb-4">
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
          {isOrderPage ? <MobileOrderPage /> : children}
        </div>
      </main>
    </div>
  );
};

export default MobileLayout;
