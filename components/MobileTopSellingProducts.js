import { useDarkMode } from '../contexts/DarkModeContext';

const MobileTopSellingProducts = () => {
  const { isDarkMode } = useDarkMode();
  const products = [
    { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
    { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
    { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
    { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
    { name: 'Marco Shoes', price: '$79.49', quantity: 64, amount: '$1,965.81' }
  ];

  return (
    <div className="space-y-3">
      {products.map((product, index) => (
        <div key={index} className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {product.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {product.name}
                </h4>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {product.price}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {product.amount}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {product.quantity} sold
              </p>
            </div>
          </div>
          
          {/* Progress bar for quantity */}
          <div className={`w-full h-1 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
            <div 
              className={`h-1 rounded-full transition-all duration-1000 ${
                isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
              }`}
              style={{ 
                width: `${(product.quantity / 184) * 100}%` // 184 is max quantity
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileTopSellingProducts;
