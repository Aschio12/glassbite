import { useCallback, useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import BottomNav from './components/BottomNav.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import LocationPage from './pages/Location.jsx';
import Footer from './components/Footer.jsx';

const lineKey = (item, addOns) =>
  `${item.id}|${addOns
    .map((a) => a.id)
    .sort()
    .join(',')}`;

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const routerLocation = useLocation();
  const isLocationPage = routerLocation.pathname === '/location';

  const cartCount = useMemo(() => cart.reduce((sum, e) => sum + e.quantity, 0), [cart]);

  const addToCart = useCallback((item, addOns = [], quantity = 1) => {
    const key = lineKey(item, addOns);
    setCart((prev) => {
      const existing = prev.find((e) => e.key === key);
      if (existing) {
        return prev.map((e) =>
          e.key === key ? { ...e, quantity: e.quantity + quantity } : e
        );
      }
      return [...prev, { key, item, addOns, quantity }];
    });
  }, []);

  const updateQty = useCallback((key, quantity) => {
    setCart((prev) =>
      quantity < 1
        ? prev.filter((e) => e.key !== key)
        : prev.map((e) => (e.key === key ? { ...e, quantity } : e))
    );
  }, []);

  const removeLine = useCallback((key) => {
    setCart((prev) => prev.filter((e) => e.key !== key));
  }, []);

  const overlayOpen = cartOpen;

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [overlayOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (cartOpen) setCartOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [cartOpen]);

  const handleCheckout = useCallback(() => {
    setCart([]);
    setCartOpen(false);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col pb-16 md:pb-0">
      <LoadingScreen />
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <div className="flex-1 flex flex-col">
        {/* Main Routes */}
        <div style={{ display: isLocationPage ? 'none' : 'block', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        
        {/* Persistent Location Page */}
        <div 
          style={{ 
            display: isLocationPage ? 'block' : 'block', // always block so Leaflet doesn't break on resize
            position: isLocationPage ? 'static' : 'fixed',
            top: isLocationPage ? 'auto' : '-9999px',
            left: isLocationPage ? 'auto' : '-9999px',
            visibility: isLocationPage ? 'visible' : 'hidden',
            width: '100%',
            height: isLocationPage ? 'auto' : '100vh',
            zIndex: 10,
            flex: isLocationPage ? 1 : 'none'
          }}
        >
          <LocationPage />
        </div>
      </div>

      <Footer />

      <BottomNav cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeLine}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
