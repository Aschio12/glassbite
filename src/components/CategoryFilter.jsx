export default function CategoryFilter({ categories = [], active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="mx-auto flex w-full max-w-7xl flex-wrap justify-center gap-6 px-6 py-12 md:gap-12"
    >
      {categories.map((cat) => {
        const isActive = cat.id === active;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-category={cat.id}
            onClick={() => onChange(cat.id)}
            className={`font-display text-2xl uppercase tracking-wider transition-all duration-300 md:text-4xl ${
              isActive
                ? 'text-orange-500 underline decoration-orange-500 decoration-4 underline-offset-8 drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
