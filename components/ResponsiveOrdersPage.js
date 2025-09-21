import OrderPage from './OrderPage';
import LayoutWithoutRightSidebar from './LayoutWithoutRightSidebar';
import MobileResponsiveOrdersPage from './MobileResponsiveOrdersPage';

const ResponsiveOrdersPage = () => {
  return (
    <>
      {/* Mobile Layout - Hidden on desktop */}
      <div className="lg:hidden">
        <MobileResponsiveOrdersPage />
      </div>

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden lg:block">
        <LayoutWithoutRightSidebar>
          <OrderPage />
        </LayoutWithoutRightSidebar>
      </div>
    </>
  );
};

export default ResponsiveOrdersPage;