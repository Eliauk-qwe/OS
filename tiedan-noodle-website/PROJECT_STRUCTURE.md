# 铁蛋鸡汤刀削面餐厅网站 - 项目结构

## 技术栈

- **前端框架**: React 18+ (使用函数组件和Hooks)
- **样式方案**: Tailwind CSS (用于快速响应式开发)
- **状态管理**: React Context API + useReducer (轻量级状态管理)
- **路由**: React Router v6
- **构建工具**: Vite (快速开发和构建)

## 目录结构

```
tiedan-noodle-website/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 可复用UI组件
│   │   ├── common/        # 通用组件（Button, Input, Card等）
│   │   ├── layout/        # 布局组件（Header, Footer, Navigation）
│   │   └── features/      # 功能组件（MenuCard, OrderForm等）
│   ├── pages/             # 页面组件
│   │   ├── Home.jsx       # 首页
│   │   ├── Menu.jsx       # 菜单页面
│   │   ├── StoreInfo.jsx  # 店铺信息页面
│   │   ├── Order.jsx      # 在线订餐页面
│   │   └── Reservation.jsx # 预约页面
│   ├── context/           # React Context状态管理
│   │   ├── CartContext.jsx # 购物车状态
│   │   └── AppContext.jsx  # 全局应用状态
│   ├── hooks/             # 自定义Hooks
│   │   ├── useForm.js     # 表单处理Hook
│   │   ├── useResponsive.js # 响应式检测Hook
│   │   └── useLazyLoad.js  # 图片懒加载Hook
│   ├── services/          # API服务
│   │   ├── orderService.js # 订单服务
│   │   └── reservationService.js # 预约服务
│   ├── utils/             # 工具函数
│   │   ├── validation.js  # 表单验证函数
│   │   └── formatters.js  # 格式化函数
│   ├── constants/         # 常量定义
│   │   ├── menuData.js    # 菜单数据
│   │   └── storeInfo.js   # 店铺信息
│   ├── styles/            # 全局样式
│   ├── App.jsx            # 主应用组件
│   ├── main.jsx           # 应用入口
│   └── index.css          # 全局CSS（包含Tailwind指令和CSS变量）
├── .eslintrc.cjs          # ESLint配置
├── .gitignore             # Git忽略文件
├── index.html             # HTML模板
├── package.json           # 项目依赖
├── postcss.config.js      # PostCSS配置
├── tailwind.config.js     # Tailwind CSS配置
├── vite.config.js         # Vite配置
└── README.md              # 项目说明
```

## 品牌配色方案

项目使用温馨、传统的中式餐饮风格配色：

### 主色（Primary）
- **主色**: `#f5ac23` - 温暖的金黄色
- **用途**: 主要按钮、重要标题、品牌元素

### 辅助色（Secondary）
- **辅助色**: `#a98d66` - 温暖的棕色
- **用途**: 次要按钮、背景、装饰元素

### 强调色（Accent）
- **强调色**: `#ef4444` - 中国红
- **用途**: 特殊促销、重要提示、主打产品标识

### 中性色（Neutral）
- **用途**: 文字、边框、背景

## 字体方案

- **无衬线字体**: Noto Sans SC, PingFang SC, Microsoft YaHei
- **衬线字体**: Noto Serif SC, SimSun
- **最小字体大小**: 14px（确保可读性）

## 响应式断点

- **移动端**: < 768px
- **平板端**: 768px - 1023px
- **桌面端**: ≥ 1024px

## CSS变量

项目在 `src/index.css` 中定义了完整的CSS变量系统，包括：

- 品牌颜色
- 字体大小
- 间距
- 触摸目标最小尺寸（44px）
- 边框圆角
- 阴影
- 过渡动画
- Z-index层级

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 运行ESLint检查
npm run lint
```

## 设计原则

1. **响应式优先**: 从移动端设计开始，逐步增强到桌面端
2. **可访问性**: 确保所有交互元素可通过键盘访问，最小触摸目标44x44px
3. **性能优化**: 使用图片懒加载、代码分割等技术
4. **一致性**: 使用统一的设计系统和组件库
5. **用户体验**: 提供流畅的动画和即时反馈

## 需求映射

本项目实现了以下需求：

- **需求 10.1**: 一致的品牌配色方案
- **需求 10.2**: 一致的字体样式
- **需求 10.4**: 一致的间距和布局规则
- **需求 6.5**: 文字可读性（字体大小≥14px）
- **需求 6.6**: 触摸目标尺寸（≥44x44px）

## 下一步

项目初始化和基础配置已完成。接下来的任务包括：

1. 创建通用UI组件库（Button, Input, Select, Modal）
2. 实现布局组件和响应式系统
3. 创建常量数据和工具函数
4. 实现各个页面组件
5. 添加状态管理
6. 性能优化和测试
