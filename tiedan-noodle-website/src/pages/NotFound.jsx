import { Link } from 'react-router-dom';

/**
 * NotFound - 404页面
 * 当用户访问不存在的页面时显示
 */
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          页面未找到
        </h2>
        <p className="text-gray-500 mb-8">
          抱歉，您访问的页面不存在。
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
