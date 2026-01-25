# 布局组件和响应式系统 - 使用指南

## 概述

本文档介绍Task 3实现的布局组件和响应式系统的使用方法。

## 组件列表

### 1. useResponsive Hook

**位置**: `src/hooks/useResponsive.js`

**用途**: 检测当前视口宽度和设备类型

**使用方法**:
```jsx
import useResponsive from '../hooks/useResponsive';

function MyComponent() {
  const { width, deviceType, isMobile, isTablet, isDesktop } = useResponsive();
  
  return (
    <div>
      <p>当前宽度: {width}px</p>
      <p>设备类型: {deviceType}</p>
      {isMobile && <p>这是移动端视图</p>}
      {isTablet && <p>这是平板端视图</p>}
      {isDesktop && <p>这是桌面端视图</p>}
    </div>
  );
}
```

**返回值**:
- `width`: 当前视口宽度（数字）
- `deviceType`: 设备类型字符串（'mobile' | 'tablet' | 'desktop'）
- `isMobile`: 是否为移动端（布尔值）
- `isTablet`: 是否为平板端（布尔值）
- `isDesktop`: 是否为桌面端（布尔值）

**断点定义**:
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: >= 1024px

---

### 2. Header 组件

**位置**: `src/components/layout/Header.jsx`

**用途**: 网站顶部导航栏，固定在页面顶部

**Props**:
- `transparent` (boolean, 可选): 是否使用透明背景，默认为false

**使用方法**:
```jsx
import { Header } from '../components/layout';

// 普通Header（白色背景）
<Header />

// 透明背景Header（适用于首页Hero区域）
<Header transparent={true} />
```

**特性**:
- 固定定位（fixed），始终显示在页面顶部
- 显示品牌Logo和名称
- 桌面端显示完整导航菜单
- 移动端显示汉堡菜单按钮
- 汉堡菜单有动画效果
- 响应式高度（移动端64px，桌面端80px）

**注意事项**:
- 由于Header使用fixed定位，页面主内容需要添加顶部padding
- 建议使用 `pt-16 md:pt-20` 类（已在App.jsx中配置）

---

### 3. Navigation 组件

**位置**: `src/components/layout/Navigation.jsx`

**用途**: 导航菜单，支持桌面端和移动端两种样式

**Props**:
- `isMobile` (boolean, 必需): 是否为移动端
- `isOpen` (boolean, 可选): 移动端菜单是否打开
- `onClose` (function, 可选): 关闭菜单的回调函数

**使用方法**:
```jsx
import Navigation from '../components/layout/Navigation';

// 桌面端导航
<Navigation isMobile={false} />

// 移动端导航
<Navigation 
  isMobile={true} 
  isOpen={isMobileMenuOpen}
  onClose={() => setIsMobileMenuOpen(false)}
/>
```

**导航项**:
- 首页 (/)
- 菜单 (/menu)
- 店铺信息 (/store-info)
- 在线订餐 (/order)
- 预约 (/reservation)

**特性**:
- 使用React Router的NavLink实现路由导航
- 自动高亮当前页面
- 移动端菜单有展开/收起动画
- 点击导航项后自动关闭移动端菜单
- 活动状态：红色背景，白色文字
- Hover状态：红色背景和文字

---

### 4. Footer 组件

**位置**: `src/components/layout/Footer.jsx`

**用途**: 网站底部，显示品牌信息、联系方式和快速链接

**Props**: 无

**使用方法**:
```jsx
import { Footer } from '../components/layout';

<Footer />
```

**内容区域**:
1. **品牌信息**: 品牌名称和标语
2. **联系方式**: 电话号码（可点击拨打）、营业时间
3. **快速链接**: 菜单、订餐、预约页面链接
4. **版权信息**: 动态显示当前年份

**特性**:
- 深色背景（gray-800）
- 响应式网格布局（移动端单列，桌面端三列）
- 电话号码使用tel:链接
- 链接有hover效果
- 自动更新年份

---

## 页面组件

### 已创建的页面

1. **Home** (`src/pages/Home.jsx`) - 首页
2. **Menu** (`src/pages/Menu.jsx`) - 菜单页
3. **StoreInfo** (`src/pages/StoreInfo.jsx`) - 店铺信息页
4. **Order** (`src/pages/Order.jsx`) - 订餐页
5. **Reservation** (`src/pages/Reservation.jsx`) - 预约页
6. **NotFound** (`src/pages/NotFound.jsx`) - 404页面
7. **LayoutDemo** (`src/pages/LayoutDemo.jsx`) - 布局演示页

### 访问布局演示页

访问 `http://localhost:5173/layout-demo` 查看响应式系统的实时演示。

演示页面显示：
- 当前视口宽度
- 当前设备类型
- 设备类型状态（Mobile/Tablet/Desktop）
- 布局组件说明
- 响应式断点说明

---

## 路由配置

**位置**: `src/App.jsx`

所有路由已在App.jsx中配置：

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/menu" element={<Menu />} />
  <Route path="/store-info" element={<StoreInfo />} />
  <Route path="/order" element={<Order />} />
  <Route path="/reservation" element={<Reservation />} />
  <Route path="/layout-demo" element={<LayoutDemo />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 样式系统

### Tailwind CSS配置

项目使用Tailwind CSS进行样式设计，主要使用的颜色：

- **主色**: Red-600 (#DC2626) - 品牌色
- **背景色**: White, Gray-50, Gray-800
- **文字色**: Gray-800, Gray-600, Gray-400

### 响应式类

常用的响应式前缀：
- `sm:` - ≥640px
- `md:` - ≥768px
- `lg:` - ≥1024px
- `xl:` - ≥1280px

### 自定义CSS变量

在 `src/index.css` 中定义了全局CSS变量（如果需要）。

---

## 可访问性（A11y）

### 已实现的可访问性特性

1. **语义化HTML**:
   - 使用 `<header>`, `<nav>`, `<main>`, `<footer>` 标签
   - 正确的标题层级（h1, h2, h3）

2. **ARIA属性**:
   - 汉堡菜单按钮有 `aria-label` 和 `aria-expanded`
   - 提供清晰的按钮标签

3. **键盘导航**:
   - 所有链接和按钮可通过Tab键访问
   - Focus状态有明显的视觉反馈（focus:ring）

4. **触摸目标**:
   - 汉堡菜单按钮尺寸为44x44px
   - 导航链接有足够的padding

5. **颜色对比**:
   - 文字和背景有足够的对比度
   - 符合WCAG标准

---

## 测试指南

### 手动测试清单

#### 桌面端测试（≥1024px）
- [ ] Header显示完整导航菜单
- [ ] 导航链接水平排列
- [ ] 当前页面高亮显示
- [ ] 点击导航链接正确跳转
- [ ] Footer三列布局显示

#### 平板端测试（768-1023px）
- [ ] Header显示完整导航菜单
- [ ] 布局适当调整
- [ ] Footer布局适配

#### 移动端测试（<768px）
- [ ] Header显示汉堡菜单按钮
- [ ] 点击汉堡按钮展开/收起菜单
- [ ] 汉堡按钮有动画效果
- [ ] 移动端菜单垂直排列
- [ ] 点击导航项后菜单自动关闭
- [ ] Footer单列布局，居中对齐

#### 响应式测试
- [ ] 调整浏览器窗口大小，布局自动调整
- [ ] 旋转设备（横屏/竖屏），布局适配
- [ ] 在不同设备上测试（手机、平板、桌面）

#### 导航测试
- [ ] 所有导航链接正确工作
- [ ] 当前页面在导航中高亮
- [ ] 404页面正确显示
- [ ] 404页面的"返回首页"按钮工作

#### 可访问性测试
- [ ] 使用Tab键可以访问所有交互元素
- [ ] Focus状态有明显的视觉反馈
- [ ] 使用屏幕阅读器测试（可选）

---

## 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 运行ESLint检查
npm run lint
```

---

## 常见问题

### Q: 为什么主内容被Header遮挡？
A: Header使用fixed定位，需要在主内容区域添加顶部padding。在App.jsx中已配置 `pt-16 md:pt-20`。

### Q: 如何修改导航项？
A: 编辑 `src/components/layout/Navigation.jsx` 中的 `navItems` 数组。

### Q: 如何修改品牌颜色？
A: 主要使用Tailwind的red-600颜色。如需修改，可以在 `tailwind.config.js` 中自定义颜色。

### Q: 移动端菜单不关闭怎么办？
A: 确保传递了 `onClose` 回调函数，并在Header组件中正确管理 `isMobileMenuOpen` 状态。

### Q: 如何添加新页面？
A: 
1. 在 `src/pages/` 创建新的页面组件
2. 在 `src/App.jsx` 中导入组件
3. 在 `<Routes>` 中添加新的 `<Route>`
4. 在 `Navigation.jsx` 中添加导航链接（如需要）

---

## 下一步

Task 3已完成，下一步是Task 4：创建常量数据和工具函数。

需要实现：
- 菜单数据（menuData.js）
- 店铺信息（storeInfo.js）
- 验证工具函数（validation.js）
- 格式化工具函数（formatters.js）

---

## 相关文件

- 任务总结: `TASK_3_SUMMARY.md`
- 项目结构: `PROJECT_STRUCTURE.md`
- 设计文档: `.kiro/specs/tiedan-noodle-website/design.md`
- 需求文档: `.kiro/specs/tiedan-noodle-website/requirements.md`
