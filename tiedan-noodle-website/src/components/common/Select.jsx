import React from 'react';
import PropTypes from 'prop-types';

/**
 * Select组件 - 通用下拉选择组件
 * 
 * 功能：
 * - 下拉选择功能
 * - 显示label和错误消息
 * - 响应式样式
 * 
 * 需求：4.5, 5.2
 */
const Select = ({
  options = [],
  value,
  onChange,
  error,
  label,
  placeholder = '请选择',
  required = false,
  disabled = false,
  name,
  id,
  className = '',
  ...rest
}) => {
  // 生成唯一ID（如果没有提供）
  const selectId = id || `select-${name || Math.random().toString(36).substr(2, 9)}`;
  
  // 选择框样式
  const selectClasses = `
    w-full px-4 py-3 text-base border rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed
    appearance-none bg-white
    cursor-pointer
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
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          className={selectClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* 自定义下拉箭头 */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
          <svg 
            className="fill-current h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p 
          id={`${selectId}-error`}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string,
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

export default Select;
