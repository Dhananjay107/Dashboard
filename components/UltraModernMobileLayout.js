import { useDarkMode } from '../contexts/DarkModeContext';

const UltraModernMobileLayout = ({ children }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} mobile-layout`}>
      {/* Main Content */}
      <main className="min-h-screen">
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen transition-colors duration-300`}>
          <div className="p-4">
            {children}
          </div>
        </div>
      </main>

      {/* Global Styles for Mobile Optimizations */}
      <style jsx global>{`
        /* Mobile-specific optimizations */
        .mobile-layout {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }

        /* Hide scrollbars on mobile */
        .mobile-layout::-webkit-scrollbar {
          display: none;
        }

        .mobile-layout {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Touch-friendly interactions */
        @media (hover: none) and (pointer: coarse) {
          .hover\\:scale-105:hover {
            transform: none;
          }
          
          .hover\\:scale-\\[1\\.02\\]:hover {
            transform: none;
          }
        }

        /* Improved touch targets */
        button, [role="button"], .cursor-pointer {
          min-height: 44px;
          min-width: 44px;
        }

        /* Smooth animations for mobile */
        * {
          transition: transform 0.2s ease-out, opacity 0.2s ease-out;
        }

        /* Prevent zoom on input focus */
        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="number"],
        select,
        textarea {
          font-size: 16px;
        }

        /* Better focus indicators for accessibility */
        button:focus-visible,
        [role="button"]:focus-visible,
        input:focus-visible,
        select:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Improved text selection */
        ::selection {
          background-color: rgba(59, 130, 246, 0.3);
        }

        /* Dark mode selection */
        @media (prefers-color-scheme: dark) {
          ::selection {
            background-color: rgba(59, 130, 246, 0.5);
          }
        }

        /* Loading states */
        .loading {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Slide animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Fade animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Scale animations */
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Bounce animation for interactive elements */
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Shake animation for errors */
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-10px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(10px);
          }
        }

        /* Utility classes for animations */
        .animate-slide-in-up {
          animation: slideInUp 0.5s ease-out forwards;
        }

        .animate-slide-in-down {
          animation: slideInDown 0.5s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out forwards;
        }

        .animate-shake {
          animation: shake 0.5s ease-out forwards;
        }

        /* Responsive text sizes */
        @media (max-width: 375px) {
          .text-2xl {
            font-size: 1.5rem;
            line-height: 2rem;
          }
          
          .text-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
        }

        /* Improved spacing for very small screens */
        @media (max-width: 320px) {
          .p-4 {
            padding: 0.75rem;
          }
          
          .px-4 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          .py-3 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
        }

        /* Better button spacing on small screens */
        @media (max-width: 375px) {
          .space-x-2 > * + * {
            margin-left: 0.25rem;
          }
          
          .space-x-3 > * + * {
            margin-left: 0.5rem;
          }
        }

        /* Improved card shadows for mobile */
        .shadow-sm {
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }

        .shadow-md {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        /* Dark mode shadow adjustments */
        @media (prefers-color-scheme: dark) {
          .shadow-sm {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
          }

          .shadow-md {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
          }

          .shadow-lg {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
          }
        }
      `}</style>
    </div>
  );
};

export default UltraModernMobileLayout;
