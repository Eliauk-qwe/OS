import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MenuCard, CartSummary, OrderForm } from '../components/features';
import { Modal, Button } from '../components/common';
import { menuItems } from '../constants/menuData';
import { submitOrder, formatOrderData } from '../services/orderService';

/**
 * OrderPage - 在线订餐页面
 * 提供在线订餐功能
 * 需求：4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7
 */
const Order = () => {
  const { items, totalPrice, addItem, updateQuantity, removeItem } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);

  // 处理添加到购物车
  const handleAddToCart = (menuItem, quantity = 1) => {
    addItem(menuItem, quantity);
  };

  // 处理订单提交
  const handleOrderSubmit = async (customerInfo) => {
    setIsSubmitting(true);

    try {
      // 格式化订单数据
      const orderData = formatOrderData({
        items,
        customerInfo,
        deliveryMethod,
        notes: customerInfo.notes
      });

      // 提交订单
      const result = await submitOrder(orderData);
      
      setOrderResult(result);
      setShowResultModal(true);
    } catch (error) {
      setOrderResult({
        success: false,
        message: '订单提交失败，请稍后重试'
      });
      setShowResultModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 关闭结果模态框
  const handleCloseResultModal = () => {
    setShowResultModal(false);
    // 如果订单成功，可以清空购物车或跳转到其他页面
    // if (orderResult?.success) {
    //   clearCart();
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            在线订餐
          </h1>
          <p className="text-gray-600">
            选择您喜欢的菜品，享受美味送到家
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* 左侧：菜单选择区域 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 菜单分类 */}
            {Object.entries(
              menuItems.reduce((acc, item) => {
                if (!acc[item.category]) {
                  acc[item.category] = [];
                }
                acc[item.category].push(item);
                return acc;
              }, {})
            ).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {category === 'noodles' && '刀削面系列'}
                  {category === 'sides' && '小菜'}
                  {category === 'drinks' && '饮品'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {items.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onAddToCart={handleAddToCart}
                      showAddButton={true}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 右侧：购物车和订单表单 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 购物车摘要 - 固定在顶部 */}
            <div className="lg:sticky lg:top-24">
              <CartSummary
                items={items}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
                totalPrice={totalPrice}
              />

              {/* 订单表单 - 仅在购物车有商品时显示 */}
              {items.length > 0 && (
                <div className="mt-6">
                  <OrderForm
                    onSubmit={handleOrderSubmit}
                    deliveryMethod={deliveryMethod}
                    onDeliveryMethodChange={setDeliveryMethod}
                    isSubmitting={isSubmitting}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 订单结果模态框 */}
      <Modal isOpen={showResultModal} onClose={handleCloseResultModal}>
        <div className="text-center p-6">
          {orderResult?.success ? (
            <>
              {/* 成功图标 */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                订单提交成功！
              </h3>
              <p className="text-gray-600 mb-4">
                {orderResult.message}
              </p>
              {orderResult.orderId && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">订单号</p>
                  <p className="text-lg font-mono font-semibold text-gray-800">
                    {orderResult.orderId}
                  </p>
                </div>
              )}
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
                订单提交失败
              </h3>
              <p className="text-gray-600 mb-4">
                {orderResult?.message || '请稍后重试'}
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

export default Order;
