import PropTypes from 'prop-types';
import { Button } from '../common';

/**
 * CartSummary组件 - 购物车摘要
 * 显示购物车中的所有商品、数量调整、删除功能和总价
 * 需求：4.3
 */
const CartSummary = ({ items, onUpdateQuantity, onRemove, totalPrice }) => {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p className="text-gray-500 text-lg">购物车是空的</p>
        <p className="text-gray-400 text-sm mt-2">快去选择您喜欢的菜品吧！</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* 标题 */}
      <div className="bg-red-600 text-white px-6 py-4">
        <h2 className="text-xl font-semibold">购物车</h2>
        <p className="text-red-100 text-sm mt-1">共 {items.length} 种商品</p>
      </div>

      {/* 商品列表 */}
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.menuItem.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              {/* 商品图片 */}
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* 商品信息 */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {item.menuItem.name}
                </h3>
                <p className="text-red-600 font-medium mb-2">
                  ¥{item.menuItem.price.toFixed(2)}
                </p>

                {/* 数量控制 */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                      aria-label="减少数量"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="px-4 py-1 bg-white text-gray-800 font-medium min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                      aria-label="增加数量"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  {/* 小计 */}
                  <span className="text-gray-600 text-sm">
                    小计: <span className="font-semibold text-gray-800">¥{(item.menuItem.price * item.quantity).toFixed(2)}</span>
                  </span>
                </div>

                {/* 备注 */}
                {item.notes && (
                  <p className="text-sm text-gray-500 mt-2">
                    备注: {item.notes}
                  </p>
                )}
              </div>

              {/* 删除按钮 */}
              <button
                onClick={() => onRemove(item.menuItem.id)}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="删除商品"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 总价 */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">商品总额</span>
          <span className="text-gray-800 font-medium">¥{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-semibold">
          <span className="text-gray-800">合计</span>
          <span className="text-red-600">¥{totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

CartSummary.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      menuItem: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
      }).isRequired,
      quantity: PropTypes.number.isRequired,
      notes: PropTypes.string
    })
  ).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired
};

export default CartSummary;
