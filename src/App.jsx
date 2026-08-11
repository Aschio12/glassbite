import { useCallback, useEffect, useMemo, useState } from 'react';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import MenuGrid from './components/MenuGrid.jsx';
import ItemModal from './components/ItemModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Marquee from './components/Marquee.jsx';
import { MENU_ITEMS } from './data/menuData.js';

const lineKey = (item, addOns) =>
  `${item.id}|${addOns
    .map((a) => a.id)
    .sort()
    .join(',')}`;

export default function App() {
  const [category, setCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const filteredItems = useMemo(
    () =>
      category === 'all'
        ? MENU_ITEMS
        : MENU_ITEMS.filter((item) => item.category === category),
    [category]
  );

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

  const overlayOpen = selectedItem !== null || cartOpen;

  // Body scroll lock while the modal or drawer is open.
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [overlayOpen]);

  // Escape closes whatever overlay is open.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (selectedItem) setSelectedItem(null);
      else if (cartOpen) setCartOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedItem, cartOpen]);

  const handleCheckout = useCallback(() => {
    setCart([]);
    setCartOpen(false);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main className="pt-20">
        <Hero />
        <Marquee />

        <section id="menu" className="w-full pb-32">
          <CategoryFilter active={category} onChange={setCategory} />
          <MenuGrid
            items={filteredItems}
            onOpen={setSelectedItem}
            onAdd={(item) => addToCart(item)}
          />
        </section>
      </main>

      <footer className="brutal-border-t bg-[#050505] py-24 text-center text-gray-500">
        <p className="mb-4 font-display text-4xl font-black uppercase text-white">Glassbite</p>
        <p className="text-xs uppercase tracking-widest">© {new Date().getFullYear()} No Compromises.</p>
      </footer>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAdd={addToCart}
        />
      )}

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
