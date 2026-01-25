import Hero from '../components/features/Hero';
import ImageGallery from '../components/features/ImageGallery';

/**
 * HomePage - 首页
 * 
 * 功能：
 * - Hero区域：品牌介绍、特色展示、CTA按钮
 * - ImageGallery：店铺照片展示（至少3张）
 * - 响应式布局
 * 
 * 需求：1.1, 1.2, 1.3
 */
const Home = () => {
  // 店铺照片数据（实际项目中应该从API或常量文件获取）
  const storeImages = [
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero区域 */}
      <Hero />

      {/* 店铺照片展示 */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <ImageGallery 
          images={storeImages} 
          layout="grid"
          title="店铺风采"
        />
      </section>

      {/* 额外的介绍区域 */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              为什么选择我们
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">👨‍🍳</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  传统工艺
                </h3>
                <p className="text-gray-600">
                  传承数十年的刀削面制作技艺，每一碗都是匠心之作
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🥘</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  秘制汤底
                </h3>
                <p className="text-gray-600">
                  精选老母鸡，文火慢炖8小时，汤鲜味美，营养丰富
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  新鲜食材
                </h3>
                <p className="text-gray-600">
                  每日新鲜采购，严格把控食材质量，确保每一口都安心
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
