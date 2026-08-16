import { useState, useEffect, useMemo } from 'react';
import Hero from '../components/Hero.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import MenuGrid from '../components/MenuGrid.jsx';
import ItemModal from '../components/ItemModal.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import { fetchCategories, fetchMenuItems } from '../utils/api.js';

export default function Home({ onAddToCart }) {
  const [category, setCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [categories, setCategories] = useState([{ id: 'all', label: 'All Menu' }]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [cats, items] = await Promise.all([
          fetchCategories(),
          fetchMenuItems('all') // Always fetch all items to allow local filtering, or we could fetch dynamically
        ]);
        setCategories([{ id: 'all', label: 'All Menu' }, ...cats]);
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredItems = useMemo(
    () =>
      category === 'all'
        ? menuItems
        : menuItems.filter((item) => item.category === category),
    [category, menuItems]
  );

  return (
    <>
      <main className="pt-20">
        <Hero />

        <section id="menu" className="w-full pb-32 pt-12">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
            </div>
          ) : (
            <>
              <CategoryFilter categories={categories} active={category} onChange={setCategory} />
              
              <MenuGrid
                items={filteredItems}
                onOpen={setSelectedItem}
                onAdd={(item) => onAddToCart(item)}
              />
            </>
          )}
        </section>
      </main>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAdd={onAddToCart}
        />
      )}
    </>
  );
}
