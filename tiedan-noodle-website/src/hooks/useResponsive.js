import { useState, useEffect } from 'react';

/**
 * 响应式Hook - 检测当前视口宽度和设备类型
 * 
 * 断点定义：
 * - mobile: < 768px
 * - tablet: 768px - 1023px
 * - desktop: >= 1024px
 * 
 * @returns {Object} { width, deviceType, isMobile, isTablet, isDesktop }
 */
const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    // 处理窗口resize事件
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 添加事件监听器
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 根据宽度确定设备类型
  const getDeviceType = (width) => {
    if (width < 768) return 'mobile';
    if (width >= 768 && width < 1024) return 'tablet';
    return 'desktop';
  };

  const deviceType = getDeviceType(windowWidth);

  return {
    width: windowWidth,
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
  };
};

export default useResponsive;
