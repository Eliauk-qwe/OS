import { Link } from 'react-router-dom';
import Button from '../common/Button';

/**
 * Hero组件 - 首页英雄区域
 * 
 * 功能：
 * - 大图背景展示
 * - 品牌标语和介绍文案
 * - CTA按钮（查看菜单）
 * - 响应式设计
 * 
 * 需求：1.1, 1.2
 */
const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl"></div>
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 text-center">
        {/* 品牌标志和名称 */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            铁蛋鸡汤刀削面
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
        </div>

        {/* 品牌标语 */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-10">
          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 mb-4">
            传承经典，匠心独运
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            精选优质食材，传统手工刀削，配以秘制鸡汤底料
          </p>
        </div>

        {/* 特色介绍 */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              鸡汤刀削面的特点
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🍜</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">手工刀削</h3>
                  <p className="text-sm text-gray-600">传统技艺，现场制作</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🍗</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">秘制鸡汤</h3>
                  <p className="text-sm text-gray-600">精心熬制，营养丰富</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">优质食材</h3>
                  <p className="text-sm text-gray-600">新鲜健康，品质保证</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/menu">
            <Button 
              variant="primary" 
              size="large"
              className="min-w-[200px]"
            >
              查看菜单
            </Button>
          </Link>
          <Link to="/order">
            <Button 
              variant="secondary" 
              size="large"
              className="min-w-[200px]"
            >
              立即订餐
            </Button>
          </Link>
        </div>
      </div>

      {/* 底部波浪装饰 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 md:h-16"
        >
          <path 
            d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
