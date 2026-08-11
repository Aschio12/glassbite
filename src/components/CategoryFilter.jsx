import { CATEGORIES } from '../data/menuData.js';

export default function CategoryFilter({ active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="mx-auto flex w-full max-w-7xl flex-wrap justify-center gap-6 px-6 py-12 md:gap-12"
    >
      {CATEGORIES.map((cat) => {
        const isActive = cat.id === active;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-category={cat.id}
            onClick={() => onChange(cat.id)}
            className={`font-display text-2xl uppercase tracking-wider transition-colors duration-200 md:text-4xl ${
              isActive
                ? 'text-amber-500 underline decoration-amber-500 decoration-4 underline-offset-8'
                : 'text-gray-600 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
