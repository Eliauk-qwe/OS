import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button组件 - 通用按钮组件
 * 
 * 功能：
 * - 支持variant（primary, secondary, outline）
 * - 支持size（small, medium, large）
 * - 确保最小触摸目标44x44px
 * - 添加hover和active状态样式
 * 
 * 需求：6.6, 10.5
 */
const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false, 
  children,
  type = 'button',
  className = '',
  ...rest 
}) => {
  // 基础样式 - 确保最小触摸目标44x44px
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // 尺寸样式 - 确保最小44x44px
  const sizeStyles = {
    small: 'min-h-[44px] min-w-[44px] px-4 py-2 text-sm',
    medium: 'min-h-[44px] min-w-[44px] px-6 py-3 text-base',
    large: 'min-h-[48px] min-w-[48px] px-8 py-4 text-lg'
  };
  
  // 变体样式 - 包含hover和active状态
  const variantStyles = {
    primary: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-gray-500',
    outline: 'bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100 focus:ring-red-500'
  };
  
  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string
};

export default Button;
