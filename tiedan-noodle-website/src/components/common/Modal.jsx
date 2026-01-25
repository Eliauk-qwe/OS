import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Modal组件 - 通用模态框组件
 * 
 * 功能：
 * - 模态框容器和背景遮罩
 * - 关闭按钮和ESC键关闭功能
 * - 焦点管理（打开时捕获焦点，关闭时恢复）
 * 
 * 需求：2.5
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  size = 'medium',
  className = '' 
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);
  
  // 尺寸样式
  const sizeStyles = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'max-w-7xl'
  };
  
  // 处理ESC键关闭
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 阻止背景滚动
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  // 焦点管理
  useEffect(() => {
    if (isOpen) {
      // 保存当前焦点元素
      previousActiveElement.current = document.activeElement;
      
      // 将焦点移到模态框
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      // 恢复之前的焦点
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);
  
  // 处理背景点击关闭
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div 
        ref={modalRef}
        className={`
          relative w-full ${sizeStyles[size]} bg-white rounded-lg shadow-xl
          transform transition-all
          max-h-[90vh] overflow-y-auto
          ${className}
        `}
        tabIndex={-1}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="关闭"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        {/* 模态框内容 */}
        <div className="p-6">
          {title && (
            <h2 
              id="modal-title"
              className="text-2xl font-bold text-gray-900 mb-4 pr-8"
            >
              {title}
            </h2>
          )}
          
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  className: PropTypes.string
};

export default Modal;
