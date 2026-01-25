/**
 * 店铺信息常量
 * 包含餐厅的基本信息、营业时间、联系方式等
 */

export const storeInfo = {
  // 基本信息
  name: '铁蛋鸡汤刀削面',
  slogan: '传承经典，匠心熬制',
  description: '铁蛋鸡汤刀削面秉承传统工艺，精选优质老母鸡，文火慢熬8小时，汤色金黄，鲜香浓郁。手工刀削面现做现煮，面条劲道爽滑，每一口都是对传统美食的致敬。',
  
  // 联系方式
  phone: '15399189170',
  mobile: '15399189170',
  email: '1552356639@qq.com',
  
  // 地址信息
  address: {
    province: '陕西省',
    city: '西安市',
    district: '未央区',
    street: '景云路',
    full: '陕西省西安市未央区铁蛋鸡汤刀削面（景云路）店',
    navigation: '西安市未央区恒大帝景二期㇏10栋3-126号一层商铺' // 导航专用详细地址
  },
  
  // 地理坐标（用于地图显示 - 西安未央区）
  coordinates: {
    lat: 34.3127,
    lng: 108.9398
  },
  
  // 营业时间
  businessHours: {
    weekday: '08:30 - 次日02:30',
    weekend: '08:30 - 次日02:30',
    description: '每天 08:30-次日02:30'
  },
  
  // 详细营业时间（用于预约时间验证）
  detailedHours: {
    monday: { open: '08:30', close: '02:30', isOpen: true },
    tuesday: { open: '08:30', close: '02:30', isOpen: true },
    wednesday: { open: '08:30', close: '02:30', isOpen: true },
    thursday: { open: '08:30', close: '02:30', isOpen: true },
    friday: { open: '08:30', close: '02:30', isOpen: true },
    saturday: { open: '08:30', close: '02:30', isOpen: true },
    sunday: { open: '08:30', close: '02:30', isOpen: true }
  },
  
  // 社交媒体（可选）
  social: {
    wechat: 'tiedan-noodle',
    weibo: '@铁蛋鸡汤刀削面',
    douyin: '@铁蛋鸡汤刀削面'
  },
  
  // 特色标签
  features: [
    '传统工艺',
    '手工刀削',
    '8小时熬汤',
    '现做现煮',
    '老母鸡汤'
  ],
  
  // 店铺照片
  photos: [
    '/images/store/storefront.jpg',
    '/images/store/interior-1.jpg',
    '/images/store/interior-2.jpg',
    '/images/store/kitchen.jpg',
    '/images/store/dining-area.jpg'
  ]
};

/**
 * 获取完整地址
 * @returns {string} 完整地址字符串
 */
export const getFullAddress = () => {
  return storeInfo.address.full;
};

/**
 * 获取电话号码（格式化）
 * @returns {string} 格式化的电话号码
 */
export const getFormattedPhone = () => {
  return storeInfo.phone;
};

/**
 * 获取手机号码（格式化）
 * @returns {string} 格式化的手机号码
 */
export const getFormattedMobile = () => {
  const mobile = storeInfo.mobile;
  // 格式化为 138-0013-8000
  return `${mobile.slice(0, 3)}-${mobile.slice(3, 7)}-${mobile.slice(7)}`;
};

/**
 * 获取营业时间描述
 * @returns {string} 营业时间描述
 */
export const getBusinessHoursDescription = () => {
  return storeInfo.businessHours.description;
};

/**
 * 获取地图链接（高德地图）
 * @returns {string} 地图链接URL
 */
export const getMapUrl = () => {
  // 使用导航专用的详细地址
  const query = encodeURIComponent(storeInfo.address.navigation);
  const city = encodeURIComponent(storeInfo.address.city);
  // 高德地图搜索URL - 使用详细地址进行精准定位
  return `https://www.amap.com/search?query=${query}&city=${city}`;
};

/**
 * 获取拨号链接
 * @param {string} type - 'phone' 或 'mobile'
 * @returns {string} tel: 协议链接
 */
export const getTelLink = (type = 'mobile') => {
  const number = type === 'mobile' ? storeInfo.mobile : storeInfo.phone;
  return `tel:${number}`;
};

/**
 * 根据星期几获取营业时间
 * @param {number} dayOfWeek - 星期几 (0=周日, 1=周一, ..., 6=周六)
 * @returns {Object} 营业时间对象 {open, close, isOpen}
 */
export const getBusinessHoursByDay = (dayOfWeek) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = days[dayOfWeek];
  return storeInfo.detailedHours[dayName];
};

/**
 * 检查指定日期是否营业
 * @param {Date} date - 日期对象
 * @returns {boolean} 是否营业
 */
export const isOpenOnDate = (date) => {
  const dayOfWeek = date.getDay();
  const hours = getBusinessHoursByDay(dayOfWeek);
  return hours.isOpen;
};

/**
 * 获取指定日期的营业时间
 * @param {Date} date - 日期对象
 * @returns {Object} 营业时间对象 {open, close}
 */
export const getOpeningHours = (date) => {
  const dayOfWeek = date.getDay();
  const hours = getBusinessHoursByDay(dayOfWeek);
  return {
    open: hours.open,
    close: hours.close
  };
};
