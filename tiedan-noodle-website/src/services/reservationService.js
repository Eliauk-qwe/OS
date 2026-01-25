import { validatePhone, validateRequired, validateDateRange } from '../utils/validation';
import { getBusinessHoursByDay, isOpenOnDate } from '../constants/storeInfo';

/**
 * reservationService - 预约服务
 * 处理预约提交和验证
 * 需求：5.5, 5.6
 */

/**
 * 获取可用的预约日期（未来7天）
 * @returns {Array<Date>} 可用日期数组
 */
export const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // 检查该日期是否营业
    if (isOpenOnDate(date)) {
      dates.push(date);
    }
  }

  return dates;
};

/**
 * 获取指定日期的可用时间段
 * @param {Date} date - 日期对象
 * @returns {Array<string>} 可用时间段数组
 */
export const getAvailableTimes = (date) => {
  if (!date || !isOpenOnDate(date)) {
    return [];
  }

  const dayOfWeek = date.getDay();
  const hours = getBusinessHoursByDay(dayOfWeek);
  
  if (!hours.isOpen) {
    return [];
  }

  // 解析营业时间
  const [openHour, openMinute] = hours.open.split(':').map(Number);
  const [closeHour, closeMinute] = hours.close.split(':').map(Number);

  const times = [];
  let currentHour = openHour;
  let currentMinute = openMinute;

  // 生成30分钟间隔的时间段
  while (
    currentHour < closeHour || 
    (currentHour === closeHour && currentMinute < closeMinute)
  ) {
    const timeString = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
    times.push(timeString);

    // 增加30分钟
    currentMinute += 30;
    if (currentMinute >= 60) {
      currentMinute = 0;
      currentHour += 1;
    }
  }

  return times;
};

/**
 * 验证预约数据
 * @param {Object} reservationData - 预约数据
 * @returns {Object} 验证结果 {isValid, errors}
 */
export const validateReservation = (reservationData) => {
  const errors = [];

  // 验证日期
  if (!reservationData.date) {
    errors.push({
      field: 'date',
      message: '请选择预约日期'
    });
  } else {
    const dateValidation = validateDateRange(reservationData.date);
    if (!dateValidation.isValid) {
      errors.push({
        field: 'date',
        message: dateValidation.error
      });
    }

    // 检查日期是否营业
    if (!isOpenOnDate(new Date(reservationData.date))) {
      errors.push({
        field: 'date',
        message: '所选日期不营业'
      });
    }
  }

  // 验证时间
  if (!reservationData.time) {
    errors.push({
      field: 'time',
      message: '请选择预约时间'
    });
  } else if (reservationData.date) {
    // 验证时间是否在营业时间内
    const availableTimes = getAvailableTimes(new Date(reservationData.date));
    if (!availableTimes.includes(reservationData.time)) {
      errors.push({
        field: 'time',
        message: '所选时间不在营业时间内'
      });
    }
  }

  // 验证就餐人数
  if (!reservationData.partySize || reservationData.partySize < 1) {
    errors.push({
      field: 'partySize',
      message: '请选择就餐人数'
    });
  } else if (reservationData.partySize > 20) {
    errors.push({
      field: 'partySize',
      message: '就餐人数不能超过20人，如需预约大型聚餐请致电咨询'
    });
  }

  // 验证客户信息
  if (!reservationData.customerInfo) {
    errors.push({
      field: 'customerInfo',
      message: '请填写联系人信息'
    });
  } else {
    const { name, phone } = reservationData.customerInfo;

    // 验证姓名
    const nameValidation = validateRequired(name, '联系人姓名');
    if (!nameValidation.isValid) {
      errors.push({
        field: 'name',
        message: nameValidation.error
      });
    }

    // 验证电话
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
      errors.push({
        field: 'phone',
        message: phoneValidation.error
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * 提交预约（模拟API调用）
 * @param {Object} reservationData - 预约数据
 * @returns {Promise<Object>} 预约响应
 */
export const submitReservation = async (reservationData) => {
  // 先验证预约
  const validation = validateReservation(reservationData);
  if (!validation.isValid) {
    return {
      success: false,
      message: '预约信息不完整或有误',
      errors: validation.errors
    };
  }

  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 模拟成功响应
  const reservationId = `RES${Date.now()}`;
  const date = new Date(reservationData.date);
  const dateString = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

  return {
    success: true,
    reservationId,
    message: `预约成功！期待您在${dateString} ${reservationData.time}光临`,
    reservationDetails: {
      reservationId,
      date: reservationData.date,
      time: reservationData.time,
      partySize: reservationData.partySize,
      customerInfo: reservationData.customerInfo,
      timestamp: new Date().toISOString()
    }
  };
};

/**
 * 格式化预约数据用于提交
 * @param {Object} params - 参数对象
 * @returns {Object} 格式化的预约数据
 */
export const formatReservationData = ({ date, time, partySize, customerInfo }) => {
  return {
    date: date instanceof Date ? date.toISOString() : date,
    time,
    partySize: parseInt(partySize, 10),
    customerInfo: {
      name: customerInfo.name?.trim(),
      phone: customerInfo.phone?.trim()
    },
    timestamp: new Date()
  };
};
