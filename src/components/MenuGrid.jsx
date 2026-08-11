import { Plus } from 'lucide-react';

export default function MenuGrid({ items, onOpen, onAdd }) {
  return (
    <div className="mx-auto grid w-full max-w-[100rem] grid-cols-1 gap-12 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => {
        const isGrayscale = index % 2 === 0;
        return (
          <div
            key={item.id}
            className="group relative flex cursor-pointer flex-col rounded-3xl transition-transform duration-500 hover:-translate-y-2"
            onClick={() => onOpen(item)}
          >
            {/* Edge to edge Image with brutalist hover effect */}
            <div className="relative aspect-[4/3] w-full flex items-center justify-center p-8">
              {/* Glowing shadow effect for a surprise enhancement */}
              <div className="absolute inset-8 rounded-full bg-amber-500/0 blur-2xl transition-all duration-500 group-hover:bg-amber-500/20"></div>
              <img
                src={item.image}
                alt={item.name}
                className={`relative z-10 h-full w-full object-contain animate-float transition-all duration-500 group-hover:scale-110 ${isGrayscale ? 'opacity-80 grayscale group-hover:opacity-100 group-hover:grayscale-0' : ''}`}
              />
            </div>

            {/* Stark Typography Content */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="text-center">
                <h3 className="font-display text-3xl uppercase leading-none tracking-tight text-white group-hover:text-amber-500 transition-colors">
                  {item.name}
                </h3>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                  {item.category} • {item.specs?.size || 'Standard'}
                </p>
                <div className="mt-6 inline-block border-2 border-amber-500 px-4 py-2 font-display text-xl font-black text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(item);
                  }}
                  className="flex h-14 w-full max-w-[200px] items-center justify-center border-2 border-[#1a1a1a] bg-black text-white transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-black"
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
