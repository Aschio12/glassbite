import { Plus } from 'lucide-react';

export default function MenuGrid({ items, onOpen, onAdd }) {
  return (
    <div className="mx-auto grid w-full max-w-[100rem] grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-20">
      {items.map((item, index) => {
        const isDarker = index % 3 === 0;
        return (
          <div
            key={item.id}
            className="group relative flex cursor-pointer flex-col burgerhub-card hover:-translate-y-2"
            onClick={() => onOpen(item)}
          >
            {/* Glowing Image Section */}
            <div className="relative aspect-[4/3] w-full flex items-center justify-center p-8 burgerhub-radial-glow overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className={`relative z-10 h-full w-full object-contain animate-float transition-all duration-500 group-hover:scale-110 drop-shadow-[0_15px_30px_rgba(255,107,0,0.15)] ${
                  isDarker
                    ? 'brightness-[0.6] contrast-125 saturate-50 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100'
                    : ''
                }`}
              />
            </div>

            {/* Vibrant Typography Content */}
            <div className="flex flex-1 flex-col justify-between p-6 bg-[#111111]">
              <div className="text-center">
                <h3 className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-orange-500 transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {item.category} • {item.specs?.size || 'Standard'}
                </p>
                <div className="mt-4 text-2xl font-black text-orange-500">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(item);
                  }}
                  className="flex h-12 w-full max-w-[200px] items-center justify-center burgerhub-button-primary"
                  aria-label={`Add ${item.name} to cart`}
                >
                  <span className="font-bold uppercase tracking-wider mr-2">Add to Order</span>
                  <Plus className="h-5 w-5" strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
