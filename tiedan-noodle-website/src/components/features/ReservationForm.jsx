import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Button } from '../common';
import { validatePhone, validateRequired } from '../../utils/validation';
import { getAvailableDates, getAvailableTimes } from '../../services/reservationService';

/**
 * ReservationForm组件 - 预约表单
 * 收集预约信息：日期、时间、人数、联系人信息
 * 需求：5.1, 5.2, 5.3, 5.4, 9.1, 9.2, 9.3, 9.4, 9.5
 */
const ReservationForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    partySize: '2',
    name: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  // 初始化可用日期
  useEffect(() => {
    const dates = getAvailableDates();
    setAvailableDates(dates);
  }, []);

  // 当日期改变时，更新可用时间
  useEffect(() => {
    if (formData.date) {
      const date = new Date(formData.date);
      const times = getAvailableTimes(date);
      setAvailableTimes(times);
      
      // 如果当前选择的时间不在新的可用时间列表中，清空时间选择
      if (formData.time && !times.includes(formData.time)) {
        setFormData(prev => ({ ...prev, time: '' }));
      }
    } else {
      setAvailableTimes([]);
    }
  }, [formData.date]);

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
      case 'date': {
        const validation = validateRequired(value, '预约日期');
        if (!validation.isValid) {
          error = validation.error;
        }
        break;
      }
      case 'time': {
        const validation = validateRequired(value, '预约时间');
        if (!validation.isValid) {
          error = validation.error;
        }
        break;
      }
      case 'partySize': {
        const size = parseInt(value, 10);
        if (!size || size < 1) {
          error = '请选择就餐人数';
        } else if (size > 20) {
          error = '就餐人数不能超过20人';
        }
        break;
      }
      case 'name': {
        const validation = validateRequired(value, '联系人姓名');
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

    // 验证日期
    const dateValidation = validateRequired(formData.date, '预约日期');
    if (!dateValidation.isValid) {
      newErrors.date = dateValidation.error;
      isValid = false;
    }

    // 验证时间
    const timeValidation = validateRequired(formData.time, '预约时间');
    if (!timeValidation.isValid) {
      newErrors.time = timeValidation.error;
      isValid = false;
    }

    // 验证人数
    const size = parseInt(formData.partySize, 10);
    if (!size || size < 1) {
      newErrors.partySize = '请选择就餐人数';
      isValid = false;
    } else if (size > 20) {
      newErrors.partySize = '就餐人数不能超过20人';
      isValid = false;
    }

    // 验证姓名
    const nameValidation = validateRequired(formData.name, '联系人姓名');
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

    setErrors(newErrors);
    return isValid;
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();

    // 标记所有字段为已触摸
    setTouched({
      date: true,
      time: true,
      partySize: true,
      name: true,
      phone: true
    });

    // 验证所有字段
    if (validateAllFields()) {
      onSubmit({
        date: new Date(formData.date),
        time: formData.time,
        partySize: parseInt(formData.partySize, 10),
        customerInfo: {
          name: formData.name.trim(),
          phone: formData.phone.trim()
        }
      });
    } else {
      // 聚焦到第一个错误字段
      const firstErrorField = Object.keys(errors).find(key => errors[key]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
    }
  };

  // 生成日期选项
  const dateOptions = availableDates.map(date => ({
    value: date.toISOString().split('T')[0],
    label: `${date.getMonth() + 1}月${date.getDate()}日 (${['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]})`
  }));

  // 生成时间选项
  const timeOptions = availableTimes.map(time => ({
    value: time,
    label: time
  }));

  // 生成人数选项
  const partySizeOptions = Array.from({ length: 20 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1}人`
  }));

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">预约信息</h2>

      {/* 预约日期 */}
      <Select
        id="date"
        label="预约日期"
        value={formData.date}
        onChange={(value) => handleChange('date', value)}
        onBlur={() => handleBlur('date')}
        options={dateOptions}
        error={touched.date ? errors.date : ''}
        placeholder="请选择日期"
        required
      />

      {/* 预约时间 */}
      <Select
        id="time"
        label="预约时间"
        value={formData.time}
        onChange={(value) => handleChange('time', value)}
        onBlur={() => handleBlur('time')}
        options={timeOptions}
        error={touched.time ? errors.time : ''}
        placeholder={formData.date ? '请选择时间' : '请先选择日期'}
        disabled={!formData.date || availableTimes.length === 0}
        required
      />

      {/* 就餐人数 */}
      <Select
        id="partySize"
        label="就餐人数"
        value={formData.partySize}
        onChange={(value) => handleChange('partySize', value)}
        onBlur={() => handleBlur('partySize')}
        options={partySizeOptions}
        error={touched.partySize ? errors.partySize : ''}
        required
      />

      {/* 联系人姓名 */}
      <Input
        id="name"
        type="text"
        label="联系人姓名"
        value={formData.name}
        onChange={(value) => handleChange('name', value)}
        onBlur={() => handleBlur('name')}
        error={touched.name ? errors.name : ''}
        placeholder="请输入您的姓名"
        required
      />

      {/* 联系电话 */}
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

      {/* 温馨提示 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">温馨提示：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>请提前至少1小时预约</li>
              <li>预约成功后请准时到店，超过15分钟将自动取消</li>
              <li>如需取消或修改预约，请提前致电联系</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 提交按钮 */}
      <Button
        type="submit"
        variant="primary"
        size="large"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? '提交中...' : '确认预约'}
      </Button>

      {/* 提示信息 */}
      <p className="text-sm text-gray-500 text-center">
        提交预约即表示您同意我们的预约政策
      </p>
    </form>
  );
};

ReservationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

ReservationForm.defaultProps = {
  isSubmitting: false
};

export default ReservationForm;
