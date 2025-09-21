import { useDarkMode } from '../contexts/DarkModeContext';

const TopSellingProducts = () => {
  const { isDarkMode } = useDarkMode();
  const products = [
    { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
    { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
    { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
    { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
    { name: 'Marco Shoes', price: '$79.49', quantity: 64, amount: '$1,965.81' }
  ];

  return (
    <div className="h-80">
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Top Selling Products</h3>
      
      <div className="overflow-x-auto h-full">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <th className={`text-left py-2 px-4 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Name</th>
              <th className={`text-left py-2 px-4 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Price</th>
              <th className={`text-left py-2 px-4 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Quantity</th>
              <th className={`text-left py-2 px-4 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className={`border-b hover:bg-gray-50 ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100'}`}>
                <td className="py-2 px-4">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-lg mr-3 flex items-center justify-center ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</span>
                  </div>
                </td>
                <td className={`py-2 px-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{product.price}</td>
                <td className={`py-2 px-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{product.quantity}</td>
                <td className={`py-2 px-4 text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingProducts;
