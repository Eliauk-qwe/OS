import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AppProvider } from './context/AppContext';
import { Header, Footer } from './components/layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import StoreInfo from './pages/StoreInfo';
import Order from './pages/Order';
import Reservation from './pages/Reservation';
import NotFound from './pages/NotFound';
import './App.css';

/**
 * App组件 - 应用主组件
 * 集成路由、状态管理和布局
 * 需求：7.1, 7.2, 7.3
 */
function App() {
  return (
    <Router>
      <AppProvider>
        <CartProvider>
          <div className="App flex flex-col min-h-screen">
            {/* Header在所有页面显示 */}
            <Header />
            
            {/* 主内容区域 - 添加顶部padding以避免被固定的header遮挡 */}
            <main className="flex-grow pt-16 md:pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/store-info" element={<StoreInfo />} />
                <Route path="/order" element={<Order />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {/* Footer在所有页面显示 */}
            <Footer />
          </div>
        </CartProvider>
      </AppProvider>
    </Router>
  );
}

export default App;
