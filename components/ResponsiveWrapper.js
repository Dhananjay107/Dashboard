import { useState, useEffect } from 'react';

const ResponsiveWrapper = ({ children, breakpoint = 'lg' }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Check for mobile devices
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      const desktop = width >= 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(desktop);
    };

    // Initial check
    checkScreenSize();

    // Add resize listener with debouncing
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScreenSize, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Provide responsive context to children
  const responsiveContext = {
    isMobile,
    isTablet,
    isDesktop,
    screenSize: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
  };

  return (
    <div 
      className={`
        responsive-wrapper
        ${isMobile ? 'mobile-layout' : ''}
        ${isTablet ? 'tablet-layout' : ''}
        ${isDesktop ? 'desktop-layout' : ''}
      `}
      data-screen-size={responsiveContext.screenSize}
    >
      {typeof children === 'function' ? children(responsiveContext) : children}
    </div>
  );
};

export default ResponsiveWrapper;
