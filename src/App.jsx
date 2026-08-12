import { useCallback, useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Location from './pages/Location.jsx';
import Footer from './components/Footer.jsx';

const lineKey = (item, addOns) =>
  `${item.id}|${addOns
    .map((a) => a.id)
    .sort()
    .join(',')}`;

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

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

  // Body scroll lock while the drawer is open. (Home modal handles its own or we can just rely on this if we lift state, but we didn't).
  // Actually, we moved selectedItem to Home, so this only locks for Cart. That's fine for now, or Home can use a lock too.
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [overlayOpen]);

  // Escape closes Cart
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
    <div className="relative min-h-screen flex flex-col">
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/location" element={<Location />} />
        </Routes>
      </div>

      <Footer />

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
