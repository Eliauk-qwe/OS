import { NavLink } from 'react-router-dom';

/**
 * Navigation组件 - 导航菜单
 * 
 * @param {Object} props
 * @param {boolean} props.isMobile - 是否为移动端
 * @param {boolean} props.isOpen - 移动端菜单是否打开
 * @param {Function} props.onClose - 关闭菜单回调
 */
const Navigation = ({ isMobile, isOpen = false, onClose }) => {
  // 导航项配置
  const navItems = [
    { path: '/', label: '首页' },
    { path: '/menu', label: '菜单' },
    { path: '/store-info', label: '店铺信息' },
    { path: '/order', label: '在线订餐' },
    { path: '/reservation', label: '预约' },
  ];

  // 处理导航链接点击
  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  // 桌面端导航样式
  if (!isMobile) {
    return (
      <nav className="flex items-center space-x-1 md:space-x-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm md:text-base font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-red-600 text-white'
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    );
  }

  // 移动端导航样式
  return (
    <nav
      className={`absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="container mx-auto px-4 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-red-600 text-white'
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
