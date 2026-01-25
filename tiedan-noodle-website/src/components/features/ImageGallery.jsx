import { useState, useRef, useEffect } from 'react';
import Modal from '../common/Modal';

/**
 * ImageGallery组件 - 图片展示画廊
 * 
 * 功能：
 * - 支持轮播和网格两种布局模式
 * - 图片懒加载
 * - 点击放大查看
 * - 显示加载占位符
 * - 响应式设计
 * 
 * 需求：1.3, 8.2, 8.3
 * 
 * @param {Object} props
 * @param {string[]} props.images - 图片URL数组
 * @param {'carousel' | 'grid'} props.layout - 布局模式，默认为'grid'
 * @param {string} props.title - 可选的标题
 */
const ImageGallery = ({ images = [], layout = 'grid', title }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const observerRef = useRef(null);

  // 设置Intersection Observer进行懒加载
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src && !loadedImages.has(src)) {
              img.src = src;
              setLoadedImages((prev) => new Set([...prev, src]));
              observerRef.current.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadedImages]);

  // 为图片元素设置observer
  const setImageRef = (element) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  // 处理图片点击
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  // 关闭模态框
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // 轮播：上一张
  const handlePrevious = () => {
    if (layout === 'carousel') {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (selectedImage) {
      const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedImage(images[newIndex]);
    }
  };

  // 轮播：下一张
  const handleNext = () => {
    if (layout === 'carousel') {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else if (selectedImage) {
      const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedImage(images[newIndex]);
    }
  };

  // 如果没有图片，显示提示
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        暂无图片
      </div>
    );
  }

  // 网格布局
  if (layout === 'grid') {
    return (
      <div className="w-full">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            {title}
          </h2>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              onClick={() => handleImageClick(image, index)}
            >
              {/* 加载占位符 */}
              <div className="absolute inset-0 bg-gray-200 animate-pulse">
                <div className="flex items-center justify-center h-full">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* 实际图片 */}
              <img
                ref={setImageRef}
                data-src={image}
                alt={`店铺照片 ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />

              {/* 悬停遮罩 */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* 图片放大模态框 */}
        {selectedImage && (
          <Modal isOpen={true} onClose={handleCloseModal}>
            <div className="relative">
              <img
                src={selectedImage}
                alt="放大查看"
                className="max-w-full max-h-[80vh] mx-auto rounded-lg"
              />
              
              {/* 导航按钮 */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="上一张"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="下一张"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* 图片计数 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }

  // 轮播布局
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          {title}
        </h2>
      )}

      <div className="relative max-w-4xl mx-auto">
        {/* 轮播图片容器 */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
          {/* 加载占位符 */}
          <div className="absolute inset-0 bg-gray-200 animate-pulse">
            <div className="flex items-center justify-center h-full">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* 当前图片 */}
          <img
            ref={setImageRef}
            data-src={images[currentIndex]}
            alt={`店铺照片 ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            onClick={() => handleImageClick(images[currentIndex], currentIndex)}
            loading="lazy"
          />

          {/* 导航按钮 */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                aria-label="上一张"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                aria-label="下一张"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* 指示器 */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-orange-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`跳转到第 ${index + 1} 张`}
              />
            ))}
          </div>
        )}

        {/* 图片放大模态框 */}
        {selectedImage && (
          <Modal isOpen={true} onClose={handleCloseModal}>
            <div className="relative">
              <img
                src={selectedImage}
                alt="放大查看"
                className="max-w-full max-h-[80vh] mx-auto rounded-lg"
              />
              
              {/* 导航按钮 */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="上一张"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="下一张"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* 图片计数 */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
