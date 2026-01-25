/**
 * 格式化工具函数
 * 提供各种数据格式化功能
 */

/**
 * 格式化价格
 * @param {number} price - 价格（元）
 * @param {boolean} showSymbol - 是否显示货币符号
 * @returns {string} 格式化后的价格字符串
 */
export const formatPrice = (price, showSymbol = true) => {
  if (price === null || price === undefined || isNaN(price)) {
    return showSymbol ? '¥0.00' : '0.00';
  }
  
  const formattedPrice = Number(price).toFixed(2);
  
  return showSymbol ? `¥${formattedPrice}` : formattedPrice;
};

/**
 * 格式化日期
 * @param {Date|string} date - 日期对象或日期字符串
 * @param {string} format - 格式类型 ('full', 'date', 'time', 'datetime')
 * @returns {string} 格式化后的日期字符串
 */
export const formatDate = (date, format = 'full') => {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  
  // 星期几
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const weekday = weekdays[dateObj.getDay()];
  
  switch (format) {
    case 'full':
      // 2024年1月15日 周一
      return `${year}年${parseInt(month)}月${parseInt(day)}日 ${weekday}`;
    
    case 'date':
      // 2024-01-15
      return `${year}-${month}-${day}`;
    
    case 'time':
      // 14:30
      return `${hours}:${minutes}`;
    
    case 'datetime':
      // 2024-01-15 14:30:00
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    case 'short':
      // 01月15日
      return `${parseInt(month)}月${parseInt(day)}日`;
    
    case 'chinese':
      // 2024年1月15日
      return `${year}年${parseInt(month)}月${parseInt(day)}日`;
    
    default:
      return `${year}-${month}-${day}`;
  }
};

/**
 * 格式化时间
 * @param {string} time - 时间字符串 (HH:MM 或 HH:MM:SS)
 * @returns {string} 格式化后的时间字符串
 */
export const formatTime = (time) => {
  if (!time) return '';
  
  // 如果已经是 HH:MM 格式，直接返回
  if (/^\d{2}:\d{2}$/.test(time)) {
    return time;
  }
  
  // 如果是 HH:MM:SS 格式，截取前5位
  if (/^\d{2}:\d{2}:\d{2}$/.test(time)) {
    return time.substring(0, 5);
  }
  
  return time;
};

/**
 * 格式化电话号码
 * @param {string} phone - 电话号码
 * @param {string} format - 格式类型 ('dashed', 'spaced', 'plain')
 * @returns {string} 格式化后的电话号码
 */
export const formatPhone = (phone, format = 'dashed') => {
  if (!phone) return '';
  
  // 移除所有非数字字符
  const cleanPhone = phone.replace(/\D/g, '');
  
  // 手机号（11位）
  if (cleanPhone.length === 11) {
    switch (format) {
      case 'dashed':
        // 138-0013-8000
        return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 7)}-${cleanPhone.slice(7)}`;
      
      case 'spaced':
        // 138 0013 8000
        return `${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 7)} ${cleanPhone.slice(7)}`;
      
      case 'plain':
      default:
        // 13800138000
        return cleanPhone;
    }
  }
  
  // 固定电话（10位，带区号）
  if (cleanPhone.length === 10) {
    switch (format) {
      case 'dashed':
        // 010-1234-5678
        return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 7)}-${cleanPhone.slice(7)}`;
      
      case 'spaced':
        // 010 1234 5678
        return `${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 7)} ${cleanPhone.slice(7)}`;
      
      case 'plain':
      default:
        return cleanPhone;
    }
  }
  
  // 其他情况，返回原始清理后的号码
  return cleanPhone;
};

/**
 * 格式化数量
 * @param {number} quantity - 数量
 * @returns {string} 格式化后的数量字符串
 */
export const formatQuantity = (quantity) => {
  if (quantity === null || quantity === undefined || isNaN(quantity)) {
    return '0';
  }
  
  return String(Math.floor(Number(quantity)));
};

/**
 * 格式化订单号
 * @param {string} orderId - 订单ID
 * @returns {string} 格式化后的订单号
 */
export const formatOrderId = (orderId) => {
  if (!orderId) return '';
  
  // 如果订单号很长，可以分段显示
  // 例如：20240115143000123 -> 2024-0115-1430-00123
  if (orderId.length >= 17) {
    return `${orderId.slice(0, 4)}-${orderId.slice(4, 8)}-${orderId.slice(8, 12)}-${orderId.slice(12)}`;
  }
  
  return orderId;
};

/**
 * 格式化预计时间
 * @param {number} minutes - 分钟数
 * @returns {string} 格式化后的时间描述
 */
export const formatEstimatedTime = (minutes) => {
  if (!minutes || isNaN(minutes)) {
    return '未知';
  }
  
  const mins = Number(minutes);
  
  if (mins < 60) {
    return `${mins}分钟`;
  }
  
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  
  if (remainingMins === 0) {
    return `${hours}小时`;
  }
  
  return `${hours}小时${remainingMins}分钟`;
};

/**
 * 格式化地址（缩短显示）
 * @param {string} address - 完整地址
 * @param {number} maxLength - 最大长度
 * @returns {string} 格式化后的地址
 */
export const formatAddress = (address, maxLength = 30) => {
  if (!address) return '';
  
  if (address.length <= maxLength) {
    return address;
  }
  
  return `${address.substring(0, maxLength)}...`;
};

/**
 * 格式化营业时间
 * @param {string} openTime - 开始时间
 * @param {string} closeTime - 结束时间
 * @returns {string} 格式化后的营业时间
 */
export const formatBusinessHours = (openTime, closeTime) => {
  if (!openTime || !closeTime) return '';
  
  return `${formatTime(openTime)} - ${formatTime(closeTime)}`;
};

/**
 * 格式化百分比
 * @param {number} value - 数值（0-1 或 0-100）
 * @param {boolean} isDecimal - 是否为小数形式（0-1）
 * @returns {string} 格式化后的百分比字符串
 */
export const formatPercentage = (value, isDecimal = true) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }
  
  const percentage = isDecimal ? value * 100 : value;
  
  return `${percentage.toFixed(0)}%`;
};

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的文件大小
 */
export const formatFileSize = (bytes) => {
  if (!bytes || isNaN(bytes)) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

/**
 * 格式化相对时间（多久之前）
 * @param {Date|string} date - 日期对象或日期字符串
 * @returns {string} 相对时间描述
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const now = new Date();
  const diffMs = now - dateObj;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSeconds < 60) {
    return '刚刚';
  }
  
  if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`;
  }
  
  if (diffHours < 24) {
    return `${diffHours}小时前`;
  }
  
  if (diffDays < 7) {
    return `${diffDays}天前`;
  }
  
  // 超过7天，显示具体日期
  return formatDate(dateObj, 'chinese');
};

/**
 * 格式化货币（支持多种货币）
 * @param {number} amount - 金额
 * @param {string} currency - 货币类型 ('CNY', 'USD', 'EUR')
 * @returns {string} 格式化后的货币字符串
 */
export const formatCurrency = (amount, currency = 'CNY') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    amount = 0;
  }
  
  const symbols = {
    CNY: '¥',
    USD: '$',
    EUR: '€'
  };
  
  const symbol = symbols[currency] || '¥';
  const formattedAmount = Number(amount).toFixed(2);
  
  return `${symbol}${formattedAmount}`;
};
