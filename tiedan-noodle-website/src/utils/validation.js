/**
 * 表单验证工具函数
 * 提供各种输入验证功能
 */

/**
 * 验证中国大陆手机号格式
 * 规则：11位数字，以1开头
 * @param {string} phone - 手机号码
 * @returns {boolean} 是否有效
 */
export const validatePhone = (phone) => {
  if (!phone) return false;
  
  // 移除所有空格和连字符
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  // 中国大陆手机号正则：1开头，第二位是3-9，共11位数字
  const phoneRegex = /^1[3-9]\d{9}$/;
  
  return phoneRegex.test(cleanPhone);
};

/**
 * 验证必填字段
 * @param {any} value - 字段值
 * @returns {boolean} 是否有效（非空）
 */
export const validateRequired = (value) => {
  if (value === null || value === undefined) return false;
  
  // 字符串类型：去除空格后检查
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  
  // 数组类型：检查长度
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  
  // 其他类型：直接返回true（存在即有效）
  return true;
};

/**
 * 验证姓名
 * 规则：2-20个字符，可以是中文、英文或数字
 * @param {string} name - 姓名
 * @returns {boolean} 是否有效
 */
export const validateName = (name) => {
  if (!name) return false;
  
  const trimmedName = name.trim();
  
  // 长度检查：2-20个字符
  if (trimmedName.length < 2 || trimmedName.length > 20) {
    return false;
  }
  
  // 允许中文、英文字母、数字和空格
  const nameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9\s]+$/;
  
  return nameRegex.test(trimmedName);
};

/**
 * 验证地址
 * 规则：5-100个字符
 * @param {string} address - 地址
 * @returns {boolean} 是否有效
 */
export const validateAddress = (address) => {
  if (!address) return false;
  
  const trimmedAddress = address.trim();
  
  // 长度检查：5-100个字符
  return trimmedAddress.length >= 5 && trimmedAddress.length <= 100;
};

/**
 * 验证日期是否在未来7天内
 * @param {Date} date - 要验证的日期
 * @returns {boolean} 是否有效
 */
export const validateDateRange = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  // 日期必须是今天或之后
  if (targetDate < today) {
    return false;
  }
  
  // 计算7天后的日期
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 7);
  
  // 日期必须在7天内
  return targetDate <= maxDate;
};

/**
 * 验证时间是否在营业时间内
 * @param {string} time - 时间字符串 (HH:MM 格式)
 * @param {string} openTime - 开始营业时间 (HH:MM 格式)
 * @param {string} closeTime - 结束营业时间 (HH:MM 格式)
 * @returns {boolean} 是否有效
 */
export const validateTimeInRange = (time, openTime, closeTime) => {
  if (!time || !openTime || !closeTime) return false;
  
  // 将时间字符串转换为分钟数（从00:00开始）
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  const timeMinutes = timeToMinutes(time);
  const openMinutes = timeToMinutes(openTime);
  const closeMinutes = timeToMinutes(closeTime);
  
  // 检查时间是否在营业时间范围内
  return timeMinutes >= openMinutes && timeMinutes <= closeMinutes;
};

/**
 * 验证就餐人数
 * 规则：1-20人
 * @param {number} partySize - 就餐人数
 * @returns {boolean} 是否有效
 */
export const validatePartySize = (partySize) => {
  const size = Number(partySize);
  
  if (isNaN(size)) return false;
  
  return size >= 1 && size <= 20 && Number.isInteger(size);
};

/**
 * 验证邮箱格式
 * @param {string} email - 邮箱地址
 * @returns {boolean} 是否有效
 */
export const validateEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(email);
};

/**
 * 验证数量
 * 规则：正整数，1-99
 * @param {number} quantity - 数量
 * @returns {boolean} 是否有效
 */
export const validateQuantity = (quantity) => {
  const qty = Number(quantity);
  
  if (isNaN(qty)) return false;
  
  return qty >= 1 && qty <= 99 && Number.isInteger(qty);
};

/**
 * 获取验证错误消息
 * @param {string} field - 字段名称
 * @param {string} type - 验证类型
 * @returns {string} 错误消息
 */
export const getValidationMessage = (field, type) => {
  const messages = {
    required: `请填写${field}`,
    phone: '请输入有效的手机号码（11位数字，以1开头）',
    name: '姓名应为2-20个字符',
    address: '地址应为5-100个字符',
    dateRange: '请选择未来7天内的日期',
    timeRange: '请选择营业时间内的时段',
    partySize: '就餐人数应为1-20人',
    email: '请输入有效的邮箱地址',
    quantity: '数量应为1-99的整数'
  };
  
  return messages[type] || `${field}格式不正确`;
};

/**
 * 验证订单数据
 * @param {Object} orderData - 订单数据
 * @returns {Object} 验证结果 {isValid, errors}
 */
export const validateOrderData = (orderData) => {
  const errors = [];
  
  // 验证购物车项
  if (!orderData.items || orderData.items.length === 0) {
    errors.push({ field: 'items', message: '购物车不能为空' });
  }
  
  // 验证客户信息
  if (!validateRequired(orderData.customerInfo?.name)) {
    errors.push({ field: 'name', message: getValidationMessage('姓名', 'required') });
  } else if (!validateName(orderData.customerInfo.name)) {
    errors.push({ field: 'name', message: getValidationMessage('姓名', 'name') });
  }
  
  if (!validateRequired(orderData.customerInfo?.phone)) {
    errors.push({ field: 'phone', message: getValidationMessage('电话', 'required') });
  } else if (!validatePhone(orderData.customerInfo.phone)) {
    errors.push({ field: 'phone', message: getValidationMessage('电话', 'phone') });
  }
  
  // 如果是配送，验证地址
  if (orderData.deliveryMethod === 'delivery') {
    if (!validateRequired(orderData.customerInfo?.address)) {
      errors.push({ field: 'address', message: getValidationMessage('地址', 'required') });
    } else if (!validateAddress(orderData.customerInfo.address)) {
      errors.push({ field: 'address', message: getValidationMessage('地址', 'address') });
    }
  }
  
  // 验证配送方式
  if (!['pickup', 'delivery'].includes(orderData.deliveryMethod)) {
    errors.push({ field: 'deliveryMethod', message: '请选择配送方式' });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * 验证预约数据
 * @param {Object} reservationData - 预约数据
 * @param {string} openTime - 营业开始时间
 * @param {string} closeTime - 营业结束时间
 * @returns {Object} 验证结果 {isValid, errors}
 */
export const validateReservationData = (reservationData, openTime, closeTime) => {
  const errors = [];
  
  // 验证日期
  if (!validateRequired(reservationData.date)) {
    errors.push({ field: 'date', message: getValidationMessage('日期', 'required') });
  } else if (!validateDateRange(reservationData.date)) {
    errors.push({ field: 'date', message: getValidationMessage('日期', 'dateRange') });
  }
  
  // 验证时间
  if (!validateRequired(reservationData.time)) {
    errors.push({ field: 'time', message: getValidationMessage('时间', 'required') });
  } else if (openTime && closeTime && !validateTimeInRange(reservationData.time, openTime, closeTime)) {
    errors.push({ field: 'time', message: getValidationMessage('时间', 'timeRange') });
  }
  
  // 验证人数
  if (!validateRequired(reservationData.partySize)) {
    errors.push({ field: 'partySize', message: getValidationMessage('就餐人数', 'required') });
  } else if (!validatePartySize(reservationData.partySize)) {
    errors.push({ field: 'partySize', message: getValidationMessage('就餐人数', 'partySize') });
  }
  
  // 验证客户信息
  if (!validateRequired(reservationData.customerInfo?.name)) {
    errors.push({ field: 'name', message: getValidationMessage('姓名', 'required') });
  } else if (!validateName(reservationData.customerInfo.name)) {
    errors.push({ field: 'name', message: getValidationMessage('姓名', 'name') });
  }
  
  if (!validateRequired(reservationData.customerInfo?.phone)) {
    errors.push({ field: 'phone', message: getValidationMessage('电话', 'required') });
  } else if (!validatePhone(reservationData.customerInfo.phone)) {
    errors.push({ field: 'phone', message: getValidationMessage('电话', 'phone') });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
