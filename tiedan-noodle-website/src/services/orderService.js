import { validatePhone, validateRequired } from '../utils/validation';

/**
 * orderService - 订单服务
 * 处理订单提交和验证
 * 需求：4.6, 4.7
 */

/**
 * 验证订单数据
 * @param {Object} orderData - 订单数据
 * @returns {Object} 验证结果 {isValid, errors}
 */
export const validateOrder = (orderData) => {
  const errors = [];

  // 验证购物车不为空
  if (!orderData.items || orderData.items.length === 0) {
    errors.push({
      field: 'items',
      message: '购物车不能为空'
    });
  }

  // 验证客户信息
  if (!orderData.customerInfo) {
    errors.push({
      field: 'customerInfo',
      message: '请填写客户信息'
    });
  } else {
    const { name, phone, address } = orderData.customerInfo;

    // 验证姓名
    const nameValidation = validateRequired(name, '姓名');
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

    // 如果是外卖配送，验证地址
    if (orderData.deliveryMethod === 'delivery') {
      const addressValidation = validateRequired(address, '配送地址');
      if (!addressValidation.isValid) {
        errors.push({
          field: 'address',
          message: addressValidation.error
        });
      }
    }
  }

  // 验证配送方式
  if (!orderData.deliveryMethod) {
    errors.push({
      field: 'deliveryMethod',
      message: '请选择配送方式'
    });
  } else if (!['pickup', 'delivery'].includes(orderData.deliveryMethod)) {
    errors.push({
      field: 'deliveryMethod',
      message: '配送方式无效'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * 提交订单（模拟API调用）
 * @param {Object} orderData - 订单数据
 * @returns {Promise<Object>} 订单响应
 */
export const submitOrder = async (orderData) => {
  // 先验证订单
  const validation = validateOrder(orderData);
  if (!validation.isValid) {
    return {
      success: false,
      message: '订单信息不完整或有误',
      errors: validation.errors
    };
  }

  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 模拟成功响应
  const orderId = `ORD${Date.now()}`;
  const estimatedTime = orderData.deliveryMethod === 'pickup' ? 20 : 45;

  return {
    success: true,
    orderId,
    estimatedTime,
    message: orderData.deliveryMethod === 'pickup'
      ? `订单提交成功！预计${estimatedTime}分钟后可到店取餐`
      : `订单提交成功！预计${estimatedTime}分钟内送达`,
    orderDetails: {
      orderId,
      items: orderData.items,
      totalPrice: orderData.totalPrice,
      deliveryMethod: orderData.deliveryMethod,
      customerInfo: orderData.customerInfo,
      notes: orderData.notes,
      timestamp: new Date().toISOString()
    }
  };
};

/**
 * 计算订单总价
 * @param {Array} items - 购物车商品列表
 * @returns {number} 总价
 */
export const calculateTotalPrice = (items) => {
  return items.reduce((sum, item) => {
    return sum + (item.menuItem.price * item.quantity);
  }, 0);
};

/**
 * 格式化订单数据用于提交
 * @param {Object} params - 参数对象
 * @returns {Object} 格式化的订单数据
 */
export const formatOrderData = ({ items, customerInfo, deliveryMethod, notes }) => {
  return {
    items: items.map(item => ({
      id: item.menuItem.id,
      name: item.menuItem.name,
      price: item.menuItem.price,
      quantity: item.quantity,
      notes: item.notes || ''
    })),
    customerInfo: {
      name: customerInfo.name?.trim(),
      phone: customerInfo.phone?.trim(),
      address: customerInfo.address?.trim() || ''
    },
    deliveryMethod,
    notes: notes?.trim() || '',
    totalPrice: calculateTotalPrice(items),
    timestamp: new Date()
  };
};
