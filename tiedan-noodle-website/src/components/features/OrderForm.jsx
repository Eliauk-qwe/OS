import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Button } from '../common';
import { validatePhone, validateRequired } from '../../utils/validation';

/**
 * OrderForm组件 - 订单表单
 * 收集客户信息、配送方式和备注
 * 需求：4.4, 4.5, 9.1, 9.2, 9.3, 9.4, 9.5
 */
const OrderForm = ({ onSubmit, deliveryMethod, onDeliveryMethodChange, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // 处理输入变化
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // 如果字段已被触摸过，实时验证
    if (touched[field]) {
      validateField(field, value);
    }
  };

  // 处理失去焦点
  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    validateField(field, formData[field]);
  };

  // 验证单个字段
  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'name': {
        const validation = validateRequired(value, '姓名');
        if (!validation.isValid) {
          error = validation.error;
        }
        break;
      }
      case 'phone': {
        const validation = validatePhone(value);
        if (!validation.isValid) {
          error = validation.error;
        }
        break;
      }
      case 'address': {
        if (deliveryMethod === 'delivery') {
          const validation = validateRequired(value, '配送地址');
          if (!validation.isValid) {
            error = validation.error;
          }
        }
        break;
      }
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    return error === '';
  };

  // 验证所有字段
  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;

    // 验证姓名
    const nameValidation = validateRequired(formData.name, '姓名');
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
      isValid = false;
    }

    // 验证电话
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error;
      isValid = false;
    }

    // 如果是外卖配送，验证地址
    if (deliveryMethod === 'delivery') {
      const addressValidation = validateRequired(formData.address, '配送地址');
      if (!addressValidation.isValid) {
        newErrors.address = addressValidation.error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();

    // 标记所有字段为已触摸
    setTouched({
      name: true,
      phone: true,
      address: true,
      notes: true
    });

    // 验证所有字段
    if (validateAllFields()) {
      onSubmit({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        notes: formData.notes.trim()
      });
    } else {
      // 聚焦到第一个错误字段
      const firstErrorField = Object.keys(errors).find(key => errors[key]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
    }
  };

  const deliveryOptions = [
    { value: 'pickup', label: '到店自取' },
    { value: 'delivery', label: '外卖配送' }
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">订单信息</h2>

      {/* 配送方式 */}
      <div>
        <Select
          label="配送方式"
          value={deliveryMethod}
          onChange={onDeliveryMethodChange}
          options={deliveryOptions}
          required
        />
        <p className="text-sm text-gray-500 mt-2">
          {deliveryMethod === 'pickup' 
            ? '到店自取：预计20分钟后可取餐' 
            : '外卖配送：预计45分钟内送达'}
        </p>
      </div>

      {/* 姓名 */}
      <Input
        id="name"
        type="text"
        label="姓名"
        value={formData.name}
        onChange={(value) => handleChange('name', value)}
        onBlur={() => handleBlur('name')}
        error={touched.name ? errors.name : ''}
        placeholder="请输入您的姓名"
        required
      />

      {/* 电话 */}
      <Input
        id="phone"
        type="tel"
        label="联系电话"
        value={formData.phone}
        onChange={(value) => handleChange('phone', value)}
        onBlur={() => handleBlur('phone')}
        error={touched.phone ? errors.phone : ''}
        placeholder="请输入11位手机号码"
        required
      />

      {/* 地址（仅外卖配送时显示） */}
      {deliveryMethod === 'delivery' && (
        <Input
          id="address"
          type="text"
          label="配送地址"
          value={formData.address}
          onChange={(value) => handleChange('address', value)}
          onBlur={() => handleBlur('address')}
          error={touched.address ? errors.address : ''}
          placeholder="请输入详细的配送地址"
          required
        />
      )}

      {/* 备注 */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          备注（选填）
        </label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          onBlur={() => handleBlur('notes')}
          placeholder="如有特殊要求，请在此说明"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* 提交按钮 */}
      <Button
        type="submit"
        variant="primary"
        size="large"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? '提交中...' : '提交订单'}
      </Button>

      {/* 提示信息 */}
      <p className="text-sm text-gray-500 text-center">
        提交订单即表示您同意我们的服务条款
      </p>
    </form>
  );
};

OrderForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  deliveryMethod: PropTypes.oneOf(['pickup', 'delivery']).isRequired,
  onDeliveryMethodChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

OrderForm.defaultProps = {
  isSubmitting: false
};

export default OrderForm;
