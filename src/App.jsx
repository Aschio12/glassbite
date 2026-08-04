import { useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import MenuGrid from './components/MenuGrid.jsx';
import ItemModal from './components/ItemModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
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
    <div className="bg-mesh min-h-screen">
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero />

        <section id="menu" className="mx-auto w-[min(92%,72rem)] px-2 pb-32">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
              The menu
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Served on <span className="heading-gradient text-glow-amber">Glass</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
              Every dish floats on its own glass pedestal. Hover to feel it,
              tap to build it your way.
            </p>
          </div>

          <CategoryFilter active={category} onChange={setCategory} />
          <MenuGrid
            items={filteredItems}
            onOpen={setSelectedItem}
            onAdd={(item) => addToCart(item)}
          />
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-500">
        GlassBite — crafted with glass, fire & 60fps motion.
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
