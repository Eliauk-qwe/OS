import { useState, useEffect, useRef } from 'react';

/**
 * useLazyLoad Hook - 图片懒加载
 * 使用Intersection Observer API实现图片懒加载
 * 需求：8.2
 * 
 * @param {Object} options - Intersection Observer选项
 * @returns {Object} { ref, isVisible } - ref用于绑定元素，isVisible表示元素是否可见
 */
const useLazyLoad = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 检查浏览器是否支持Intersection Observer
    if (!('IntersectionObserver' in window)) {
      // 如果不支持，直接设置为可见
      setIsVisible(true);
      return;
    }

    // 默认选项
    const defaultOptions = {
      root: null, // 使用视口作为根元素
      rootMargin: '50px', // 提前50px开始加载
      threshold: 0.01, // 元素1%可见时触发
      ...options
    };

    // 创建Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 一旦元素可见，停止观察
          observer.unobserve(entry.target);
        }
      });
    }, defaultOptions);

    // 开始观察元素
    observer.observe(element);

    // 清理函数
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return { ref: elementRef, isVisible };
};

export default useLazyLoad;
