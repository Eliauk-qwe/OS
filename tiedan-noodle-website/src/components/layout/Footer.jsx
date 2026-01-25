/**
 * Footer组件 - 网站底部
 * 显示版权信息和联系方式
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 品牌信息 */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-3">铁蛋鸡汤刀削面</h3>
            <p className="text-gray-400 text-sm">
              传统手工制作，地道美味体验
            </p>
          </div>

          {/* 联系方式 */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-3">联系我们</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                <a
                  href="tel:13800138000"
                  className="hover:text-white transition-colors duration-200"
                >
                  电话：15399189170
                </a>
              </p>
              <p>营业时间：每天 08:30 - 次日02:30</p>
            </div>
          </div>

          {/* 快速链接 */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-3">快速链接</h4>
            <div className="space-y-2 text-sm">
              <p>
                <a
                  href="/menu"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  查看菜单
                </a>
              </p>
              <p>
                <a
                  href="/order"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  在线订餐
                </a>
              </p>
              <p>
                <a
                  href="/reservation"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  预约座位
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} 铁蛋鸡汤刀削面. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
