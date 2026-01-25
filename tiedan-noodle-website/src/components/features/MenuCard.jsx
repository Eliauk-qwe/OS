import React from 'react';
import PropTypes from 'prop-types';

/**
 * MenuCard组件 - 菜单项卡片
 * 
 * 功能：
 * - 显示菜品图片、名称、描述、价格
 * - 主打产品特殊标识
 * - 点击放大功能
 * - 响应式卡片布局
 * 
 * 需求：2.2, 2.3, 2.5
 */
const MenuCard = ({ 
  item, 
  onAddToCart, 
  onClick,
  showAddButton = false 
}) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(item);
    }
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation(); // 防止触发卡片点击
    if (onAddToCart) {
      onAddToCart(item);
    }
  };
  
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md overflow-hidden
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={handleCardClick}
      role="article"
      aria-label={`${item.name} - ${item.price}元`}
    >
      {/* 图片容器 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
          onError={(e) => {
            // 图片加载失败时显示占位符
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E暂无图片%3C/text%3E%3C/svg%3E';
          }}
        />
        
        {/* 主打产品标识 */}
        {item.isSignature && (
          <div className="absolute top-2 right-2 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            招牌
          </div>
        )}
        
        {/* 不可用标识 */}
        {!item.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-bold">暂时售罄</span>
          </div>
        )}
      </div>
      
      {/* 内容区域 */}
      <div className="p-4">
        {/* 菜品名称 */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {item.name}
        </h3>
        
        {/* 菜品描述 */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
          {item.description}
        </p>
        
        {/* 价格和按钮区域 */}
        <div className="flex items-center justify-between">
          {/* 价格 */}
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-primary">
              ¥{item.price}
            </span>
          </div>
          
          {/* 添加到购物车按钮 */}
          {showAddButton && item.available && (
            <button
              onClick={handleAddToCart}
              className="
                px-4 py-2 bg-primary text-white rounded-lg
                hover:bg-primary-dark transition-colors
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                min-w-[44px] min-h-[44px]
                font-medium text-sm
              "
              aria-label={`添加${item.name}到购物车`}
            >
              加入购物车
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isSignature: PropTypes.bool.isRequired,
    available: PropTypes.bool.isRequired
  }).isRequired,
  onAddToCart: PropTypes.func,
  onClick: PropTypes.func,
  showAddButton: PropTypes.bool
};

export default MenuCard;
