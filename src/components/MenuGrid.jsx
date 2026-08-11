import { Plus } from 'lucide-react';

export default function MenuGrid({ items, onOpen, onAdd }) {
  return (
    <div className="mx-auto grid w-full max-w-[100rem] grid-cols-1 border-t border-l border-[#1a1a1a] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => {
        const isGrayscale = index % 2 === 0;
        return (
          <div
            key={item.id}
            className="group relative flex cursor-pointer flex-col border-b border-r border-[#1a1a1a] bg-[#050505] transition-colors duration-300 hover:bg-[#0a0a0a]"
            onClick={() => onOpen(item)}
          >
            {/* Edge to edge Image with brutalist hover effect */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black flex items-center justify-center p-8">
              <img
                src={item.image}
                alt={item.name}
                className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 group-hover:scale-105 ${isGrayscale ? 'opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0' : ''}`}
              />
            </div>

            {/* Stark Typography Content */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="font-display text-3xl uppercase leading-none tracking-tight text-white group-hover:text-amber-500 transition-colors">
                  {item.name}
                </h3>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                  {item.category} • {item.specs?.size || 'Standard'}
                </p>
                <div className="mt-4 bg-amber-500 w-fit px-3 py-1 font-display text-xl font-black text-black">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-xs font-black uppercase text-gray-400 group-hover:text-white transition-colors">
                  View Details
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(item);
                  }}
                  className="flex h-12 w-12 items-center justify-center border border-[#1a1a1a] bg-black text-white transition-colors hover:bg-amber-500 hover:text-black hover:border-amber-500"
                  aria-label={`Add ${item.name} to cart`}
                >
                  <Plus className="h-6 w-6" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
