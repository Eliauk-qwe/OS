import useResponsive from '../hooks/useResponsive';

/**
 * LayoutDemo - 布局组件演示页面
 * 用于测试和展示响应式布局系统
 */
const LayoutDemo = () => {
  const { width, deviceType, isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 响应式信息面板 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            响应式系统信息
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-gray-600 mb-1">视口宽度</p>
              <p className="text-2xl font-bold text-blue-600">{width}px</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-sm text-gray-600 mb-1">设备类型</p>
              <p className="text-2xl font-bold text-green-600 capitalize">
                {deviceType}
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isMobile
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              Mobile {isMobile ? '✓' : '✗'}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isTablet
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              Tablet {isTablet ? '✓' : '✗'}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDesktop
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              Desktop {isDesktop ? '✓' : '✗'}
            </span>
          </div>
        </div>

        {/* 布局组件说明 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            布局组件说明
          </h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-red-600 pl-4">
              <h3 className="font-bold text-lg mb-2">Header 组件</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>固定在页面顶部</li>
                <li>显示品牌Logo和名称</li>
                <li>桌面端：显示完整导航菜单</li>
                <li>移动端：显示汉堡菜单按钮</li>
                <li>支持透明背景选项</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-bold text-lg mb-2">Navigation 组件</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>包含所有主要页面链接</li>
                <li>高亮显示当前页面</li>
                <li>移动端：下拉菜单样式</li>
                <li>桌面端：水平导航栏</li>
                <li>点击后自动关闭移动端菜单</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="font-bold text-lg mb-2">Footer 组件</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>显示品牌信息和联系方式</li>
                <li>显示快速链接</li>
                <li>显示版权信息</li>
                <li>响应式网格布局</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 响应式断点说明 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            响应式断点
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <div>
                <p className="font-semibold text-blue-800">Mobile</p>
                <p className="text-sm text-blue-600">单列布局，汉堡菜单</p>
              </div>
              <span className="text-blue-600 font-mono">&lt; 768px</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <div>
                <p className="font-semibold text-green-800">Tablet</p>
                <p className="text-sm text-green-600">两列布局，简化导航</p>
              </div>
              <span className="text-green-600 font-mono">768px - 1023px</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
              <div>
                <p className="font-semibold text-purple-800">Desktop</p>
                <p className="text-sm text-purple-600">多列布局，完整导航</p>
              </div>
              <span className="text-purple-600 font-mono">≥ 1024px</span>
            </div>
          </div>
        </div>

        {/* 测试提示 */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="font-semibold text-yellow-800 mb-2">
            💡 测试提示
          </p>
          <p className="text-yellow-700 text-sm">
            调整浏览器窗口大小或使用开发者工具的设备模拟器来测试响应式布局。
            观察Header、Navigation和Footer组件如何根据不同的屏幕尺寸调整布局。
          </p>
        </div>
      </div>
    </div>
  );
};

export default LayoutDemo;
