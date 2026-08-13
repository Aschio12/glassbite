import { useState, useMemo } from 'react';
import Hero from '../components/Hero.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import MenuGrid from '../components/MenuGrid.jsx';
import ItemModal from '../components/ItemModal.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import { MENU_ITEMS } from '../data/menuData.js';

export default function Home({ onAddToCart }) {
  const [category, setCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(
    () =>
      category === 'all'
        ? MENU_ITEMS
        : MENU_ITEMS.filter((item) => item.category === category),
    [category]
  );

  return (
    <>
      <main className="pt-20">
        <Hero />

        <section id="menu" className="w-full pb-32 pt-12">
          <ScrollReveal direction="up" delay={0.1}>
            <CategoryFilter active={category} onChange={setCategory} />
          </ScrollReveal>
          
          <MenuGrid
            items={filteredItems}
            onOpen={setSelectedItem}
            onAdd={(item) => onAddToCart(item)}
          />
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
