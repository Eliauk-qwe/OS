import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * AppContext - 全局应用状态管理
 * 管理移动端菜单状态、当前页面等全局状态
 * 需求：7.5
 */

// 创建Context
const AppContext = createContext(null);

/**
 * AppProvider组件
 * 提供全局应用状态和操作方法
 */
export const AppProvider = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('/');

  // 操作方法
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const updateCurrentPage = useCallback((page) => {
    setCurrentPage(page);
    // 切换页面时关闭移动端菜单
    setIsMobileMenuOpen(false);
  }, []);

  const value = useMemo(() => ({
    // 状态
    isMobileMenuOpen,
    currentPage,
    // 操作方法
    toggleMobileMenu,
    closeMobileMenu,
    openMobileMenu,
    setCurrentPage: updateCurrentPage
  }), [isMobileMenuOpen, currentPage, toggleMobileMenu, closeMobileMenu, openMobileMenu, updateCurrentPage]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * useApp Hook
 * 在组件中使用全局应用状态和方法
 * @returns {Object} 应用状态和方法
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
