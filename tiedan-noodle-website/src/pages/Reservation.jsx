import { useState } from 'react';
import { ReservationForm } from '../components/features';
import { Modal, Button } from '../components/common';
import { submitReservation, formatReservationData } from '../services/reservationService';
import { storeInfo } from '../constants/storeInfo';

/**
 * ReservationPage - 预约页面
 * 提供预约座位功能
 * 需求：5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 */
const Reservation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationResult, setReservationResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);

  // 处理预约提交
  const handleReservationSubmit = async (reservationData) => {
    setIsSubmitting(true);

    try {
      // 格式化预约数据
      const formattedData = formatReservationData(reservationData);

      // 提交预约
      const result = await submitReservation(formattedData);
      
      setReservationResult(result);
      setShowResultModal(true);
    } catch (error) {
      setReservationResult({
        success: false,
        message: '预约提交失败，请稍后重试'
      });
      setShowResultModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 关闭结果模态框
  const handleCloseResultModal = () => {
    setShowResultModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            预约座位
          </h1>
          <p className="text-gray-600">
            提前预约，免去等待，享受美食
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* 左侧：预约表单 */}
          <div>
            <ReservationForm
              onSubmit={handleReservationSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* 右侧：店铺信息和预约说明 */}
          <div className="space-y-6">
            {/* 店铺信息卡片 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">店铺信息</h2>
              
              <div className="space-y-4">
                {/* 地址 */}
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">地址</p>
                    <p className="text-gray-800">{storeInfo.address.full}</p>
                  </div>
                </div>

                {/* 电话 */}
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">联系电话</p>
                    <a href={`tel:${storeInfo.mobile}`} className="text-gray-800 hover:text-red-600 transition-colors">
                      {storeInfo.mobile}
                    </a>
                  </div>
                </div>

                {/* 营业时间 */}
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">营业时间</p>
                    <p className="text-gray-800">{storeInfo.businessHours.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 预约说明卡片 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">预约说明</h2>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>预约时间范围：未来7天内的营业时间</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>请提前至少1小时预约，以便我们为您准备</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>预约成功后请准时到店，超过15分钟将自动取消</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>如需取消或修改预约，请提前致电联系</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p>大型聚餐（超过20人）请提前致电咨询</p>
                </div>
              </div>
            </div>

            {/* 特色展示 */}
            {storeInfo.features && storeInfo.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">我们的特色</h2>
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
        </div>
      </div>

      {/* 预约结果模态框 */}
      <Modal isOpen={showResultModal} onClose={handleCloseResultModal}>
        <div className="text-center p-6">
          {reservationResult?.success ? (
            <>
              {/* 成功图标 */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                预约成功！
              </h3>
              <p className="text-gray-600 mb-4">
                {reservationResult.message}
              </p>
              {reservationResult.reservationId && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">预约号</p>
                  <p className="text-lg font-mono font-semibold text-gray-800">
                    {reservationResult.reservationId}
                  </p>
                </div>
              )}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-left">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">温馨提示：</span>
                  请保存好您的预约号，到店时出示即可。如需取消或修改，请提前致电 {storeInfo.mobile}
                </p>
              </div>
              <Button
                variant="primary"
                size="large"
                onClick={handleCloseResultModal}
                className="w-full"
              >
                确定
              </Button>
            </>
          ) : (
            <>
              {/* 失败图标 */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                预约失败
              </h3>
              <p className="text-gray-600 mb-4">
                {reservationResult?.message || '请稍后重试'}
              </p>
              <Button
                variant="primary"
                size="large"
                onClick={handleCloseResultModal}
                className="w-full"
              >
                确定
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Reservation;
