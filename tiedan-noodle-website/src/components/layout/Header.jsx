import { useState } from 'react';
import useResponsive from '../../hooks/useResponsive';
import Navigation from './Navigation';

/**
 * Header组件 - 网站顶部导航栏
 * 
 * @param {Object} props
 * @param {boolean} props.transparent - 是否使用透明背景
 */
const Header = ({ transparent = false }) => {
  const { isMobile } = useResponsive();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        transparent && !isMobileMenuOpen
          ? 'bg-transparent'
          : 'bg-white shadow-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 品牌Logo和名称 */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center bg-white">
              <img 
                src="/image/logo.jpg" 
                alt="铁蛋鸡汤刀削面Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-bold text-gray-800">
                铁蛋鸡汤刀削面
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                传统手工 · 地道美味
              </p>
            </div>
          </div>

          {/* 桌面端导航 */}
          {!isMobile && (
            <Navigation isMobile={false} />
          )}

          {/* 移动端汉堡菜单按钮 */}
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="w-11 h-11 flex flex-col items-center justify-center space-y-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              aria-label="切换菜单"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </button>
          )}
        </div>
      </div>

      {/* 移动端导航菜单 */}
      {isMobile && (
        <Navigation
          isMobile={true}
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />
      )}
    </header>
  );
};

export default Header;
