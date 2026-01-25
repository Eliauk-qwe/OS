/**
 * 菜单数据
 * 包含所有菜品信息，按分类组织
 */

export const menuItems = [
  // 刀削面系列
  {
    id: 'noodle-1',
    name: '铁蛋鸡汤刀削面',
    description: '精选老母鸡熬制高汤，配以手工刀削面，汤鲜面劲道',
    price: 28,
    category: 'noodles',
    image: '/image/menu/mian-1.jpg',
    isSignature: true,
    available: true
  },
  {
    id: 'noodle-2',
    name: '铁蛋干拌刀削面',
    description: '手工刀削面配特制干拌酱料，香浓入味，口感劲道',
    price: 30,
    category: 'noodles',
    image: '/image/menu/mian-2.jpg',
    isSignature: true,
    available: true
  },
  {
    id: 'noodle-3',
    name: '炸酱面',
    description: '传统北方炸酱面，肉酱香浓，唇齿留香',
    price: 29,
    category: 'noodles',
    image: '/image/menu/main-3.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'noodle-4',
    name: '油泼面',
    description: '陕西特色油泼面，热油激发葱蒜辣椒香气，香辣过瘾',
    price: 32,
    category: 'noodles',
    image: '/image/menu/mian-4.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'noodle-5',
    name: '西红柿鸡蛋刀削面',
    description: '新鲜西红柿与鸡蛋完美融合，酸甜开胃，营养丰富',
    price: 28,
    category: 'noodles',
    image: '/image/menu/mian-5.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'noodle-6',
    name: '剁椒刀削面',
    description: '湖南剁椒配刀削面，香辣鲜爽，辣而不燥',
    price: 35,
    category: 'noodles',
    image: '/image/menu/mian-6.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'noodle-7',
    name: '二合一刀削面',
    description: '任选两种浇头组合，双重口味一次满足，丰富多样',
    price: 35,
    category: 'noodles',
    image: '/image/menu/mian-7.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'noodle-8',
    name: '三合一刀削面',
    description: '任选三种浇头组合，多重风味层次丰富，超值享受',
    price: 35,
    category: 'noodles',
    image: '/image/menu/mian-8.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'noodle-9',
    name: '四合一刀削面',
    description: '任选四种浇头组合，极致丰盛，满足你的味蕾探索',
    price: 35,
    category: 'noodles',
    image: '/image/menu/mian-9.jpg',
    isSignature: false,
    available: true
  },

  // 小菜系列
  {
    id: 'side-1',
    name: '凉拌黄瓜',
    description: '清爽开胃，酸甜可口',
    price: 8,
    category: 'sides',
    image: '/image/menu/cai-1.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'side-2',
    name: '老醋花生',
    description: '山西老陈醋调制，香脆可口',
    price: 10,
    category: 'sides',
    image: '/image/menu/cai-2.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'side-3',
    name: '拍黄瓜',
    description: '蒜香浓郁，清脆爽口',
    price: 8,
    category: 'sides',
    image: '/image/menu/cai-3.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'side-4',
    name: '凉拌木耳',
    description: '黑木耳配特制调料，营养健康',
    price: 12,
    category: 'sides',
    image: '/image/menu/cai-4.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'side-5',
    name: '麻辣豆干',
    description: '香辣入味，越嚼越香',
    price: 10,
    category: 'sides',
    image: '/image/menu/cai-5.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'side-6',
    name: '卤鸡蛋',
    description: '秘制卤汁，入味十足',
    price: 5,
    category: 'sides',
    image: '/image/menu/cai-6.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'side-7',
    name: '虎皮青椒',
    description: '青椒煎至虎皮状，配特制酱汁',
    price: 12,
    category: 'sides',
    image: '/image/menu/cai-7.jpg',
    isSignature: false,
    available: true
  },

  // 饮品系列
  {
    id: 'drink-1',
    name: '酸梅汤',
    description: '传统配方，生津止渴',
    price: 8,
    category: 'drinks',
    image: '/image/menu/yin-1.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'drink-2',
    name: '豆浆',
    description: '现磨豆浆，营养健康',
    price: 6,
    category: 'drinks',
    image: '/image/menu/yin-2.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'drink-3',
    name: '冰糖雪梨',
    description: '润肺止咳，清甜可口',
    price: 10,
    category: 'drinks',
    image: '/image/menu/yin-3.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'drink-4',
    name: '可乐',
    description: '经典碳酸饮料',
    price: 5,
    category: 'drinks',
    image: '/image/menu/yin-4.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'drink-5',
    name: '雪碧',
    description: '清爽柠檬味',
    price: 5,
    category: 'drinks',
    image: '/image/menu/yin-5.jpg',
    isSignature: false,
    available: true
  },
  {
    id: 'drink-6',
    name: '矿泉水',
    description: '纯净水',
    price: 3,
    category: 'drinks',
    image: '/image/menu/yin-6.jpg',
    isSignature: false,
    available: true
  }
];

/**
 * 菜品分类定义
 */
export const categories = [
  {
    id: 'noodles',
    name: '刀削面系列',
    description: '精选老母鸡熬制高汤，手工刀削面'
  },
  {
    id: 'sides',
    name: '小菜',
    description: '精选凉菜小食，开胃爽口'
  },
  {
    id: 'drinks',
    name: '饮品',
    description: '各式饮品，解渴消暑'
  }
];

/**
 * 根据分类获取菜单项
 * @param {string} category - 分类ID
 * @returns {Array} 该分类下的所有菜单项
 */
export const getMenuItemsByCategory = (category) => {
  return menuItems.filter(item => item.category === category && item.available);
};

/**
 * 获取主打产品
 * @returns {Array} 所有主打产品
 */
export const getSignatureItems = () => {
  return menuItems.filter(item => item.isSignature && item.available);
};

/**
 * 根据ID获取菜单项
 * @param {string} id - 菜单项ID
 * @returns {Object|undefined} 菜单项对象
 */
export const getMenuItemById = (id) => {
  return menuItems.find(item => item.id === id);
};

/**
 * 获取所有可用菜单项
 * @returns {Array} 所有可用的菜单项
 */
export const getAvailableMenuItems = () => {
  return menuItems.filter(item => item.available);
};
