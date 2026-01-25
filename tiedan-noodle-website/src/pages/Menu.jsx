import React, { useState } from 'react';
import { MenuCard } from '../components/features';
import Modal from '../components/common/Modal';
import { menuItems, categories, getMenuItemsByCategory } from '../constants/menuData';

/**
 * MenuPage - 菜单页面
 * 
 * 功能：
 * - 分类导航（刀削面、小菜、饮品）
 * - 按分类展示菜品网格
 * - 集成Modal显示菜品详情
 * - 响应式布局（移动端单列，平板端双列，桌面端三列）
 * 
 * 需求：2.1, 2.4, 2.5
 */
const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 获取要显示的菜单项
  const displayedItems = selectedCategory === 'all' 
    ? menuItems.filter(item => item.available)
    : getMenuItemsByCategory(selectedCategory);
  
  // 处理菜品点击 - 打开详情模态框
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  
  // 关闭模态框
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">
            美味菜单
          </h1>
          <p className="text-center text-gray-600">
            精选食材，匠心烹制
          </p>
        </div>
      </div>
      
      {/* 分类导航 */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto scrollbar-hide" role="navigation" aria-label="菜单分类">
            {/* 全部分类 */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`
                px-6 py-4 text-base font-medium whitespace-nowrap
                transition-colors border-b-2 min-w-[44px] min-h-[44px]
                ${selectedCategory === 'all'
                  ? 'text-primary border-primary'
                  : 'text-gray-600 border-transparent hover:text-primary hover:border-gray-300'
                }
              `}
              aria-current={selectedCategory === 'all' ? 'page' : undefined}
            >
              全部
            </button>
            
            {/* 各个分类 */}
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-6 py-4 text-base font-medium whitespace-nowrap
                  transition-colors border-b-2 min-w-[44px] min-h-[44px]
                  ${selectedCategory === category.id
                    ? 'text-primary border-primary'
                    : 'text-gray-600 border-transparent hover:text-primary hover:border-gray-300'
                  }
                `}
                aria-current={selectedCategory === category.id ? 'page' : undefined}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* 菜品网格 */}
      <div className="container mx-auto px-4 py-8">
        {/* 分类描述 */}
        {selectedCategory !== 'all' && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600">
              {categories.find(c => c.id === selectedCategory)?.description}
            </p>
          </div>
        )}
        
        {/* 菜品网格 - 响应式布局 */}
        {displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map(item => (
              <MenuCard
                key={item.id}
                item={item}
                onClick={handleItemClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">暂无可用菜品</p>
          </div>
        )}
      </div>
      
      {/* 菜品详情模态框 */}
      {selectedItem && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          size="large"
          title={selectedItem.name}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* 菜品图片 */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23f3f4f6" width="400" height="400"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E暂无图片%3C/text%3E%3C/svg%3E';
                }}
              />
              
              {/* 主打产品标识 */}
              {selectedItem.isSignature && (
                <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full text-base font-semibold shadow-lg">
                  招牌推荐
                </div>
              )}
            </div>
            
            {/* 菜品信息 */}
            <div className="flex flex-col">
              {/* 价格 */}
              <div className="mb-4">
                <span className="text-4xl font-bold text-primary">
                  ¥{selectedItem.price}
                </span>
              </div>
              
              {/* 描述 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">菜品介绍</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
              
              {/* 分类标签 */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {categories.find(c => c.id === selectedItem.category)?.name}
                </span>
              </div>
              
              {/* 可用状态 */}
              <div className="mt-auto">
                {selectedItem.available ? (
                  <div className="flex items-center text-green-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">现在可点</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">暂时售罄</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Menu;
