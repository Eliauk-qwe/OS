import React from 'react';
import PropTypes from 'prop-types';

/**
 * Input组件 - 通用输入框组件
 * 
 * 功能：
 * - 支持不同类型（text, tel, number等）
 * - 显示label和错误消息
 * - 实现焦点状态样式
 * 
 * 需求：9.1, 9.3
 */
const Input = ({
  type = 'text',
  value,
  onChange,
  error,
  label,
  placeholder,
  required = false,
  disabled = false,
  name,
  id,
  className = '',
  ...rest
}) => {
  // 生成唯一ID（如果没有提供）
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;
  
  // 输入框样式
  const inputClasses = `
    w-full px-4 py-3 text-base border rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value, e);
    }
  };
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      
      {error && (
        <p 
          id={`${inputId}-error`}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string
};

export default Input;
