import { storeInfo, getMapUrl, getTelLink, getFormattedMobile } from '../constants/storeInfo';

/**
 * StoreInfoPage - 店铺信息页面
 * 展示店铺地址、营业时间、联系方式
 * 需求：3.1, 3.2, 3.3, 3.4, 3.5
 */
const StoreInfo = () => {
  const mapUrl = getMapUrl();
  const telLink = getTelLink('mobile');
  const phoneTelLink = getTelLink('phone');
  const formattedMobile = getFormattedMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* 页面标题 */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            店铺信息
          </h1>
          <p className="text-gray-600">
            欢迎光临{storeInfo.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* 左侧：基本信息 */}
          <div className="space-y-6">
            {/* 地址信息卡片 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start mb-4">
                <svg className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">店铺地址</h2>
                  <p className="text-gray-700 mb-3">{storeInfo.address.full}</p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    打开地图导航
                  </a>
                </div>
              </div>
            </div>

            {/* 联系方式卡片 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start mb-4">
                <svg className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">联系方式</h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">固定电话：</span>
                      <a
                        href={phoneTelLink}
                        className="text-gray-800 hover:text-red-600 font-medium transition-colors"
                      >
                        {storeInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">手机号码：</span>
                      <a
                        href={telLink}
                        className="text-gray-800 hover:text-red-600 font-medium transition-colors"
                      >
                        {formattedMobile}
                      </a>
                    </div>
                    {storeInfo.email && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">电子邮箱：</span>
                        <a
                          href={`mailto:${storeInfo.email}`}
                          className="text-gray-800 hover:text-red-600 font-medium transition-colors"
                        >
                          {storeInfo.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 营业时间卡片 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start mb-4">
                <svg className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">营业时间</h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">周一至周五：</span>
                      <span className="text-gray-800 font-medium">{storeInfo.businessHours.weekday}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">周六至周日：</span>
                      <span className="text-gray-800 font-medium">{storeInfo.businessHours.weekend}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-red-50 rounded-md">
                    <p className="text-sm text-red-800">
                      <span className="font-semibold">温馨提示：</span>
                      节假日营业时间可能有所调整，请提前致电咨询
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 特色标签 */}
            {storeInfo.features && storeInfo.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">店铺特色</h2>
                <div className="flex flex-wrap gap-2">
                  {storeInfo.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 右侧：地图 */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="text-xl font-semibold text-gray-800">店铺位置</h2>
              </div>
              {/* 地图iframe - 使用高德地图 */}
              <div className="relative w-full h-96 md:h-[500px]">
                <iframe
                  title="店铺位置地图"
                  src={`https://www.amap.com/search?query=${encodeURIComponent(storeInfo.address.navigation)}&city=${encodeURIComponent(storeInfo.address.city)}`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 text-center">
                  点击地图可查看详细位置信息
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部描述 */}
        {storeInfo.description && (
          <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                关于{storeInfo.name}
              </h2>
              <p className="text-gray-700 leading-relaxed text-center">
                {storeInfo.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreInfo;
