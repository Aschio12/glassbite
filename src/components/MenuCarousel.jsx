import { useRef, useEffect } from 'react';
import { formatPrice } from '../data/menuData.js';
import { Plus } from 'lucide-react';
import gsap from 'gsap';

export default function MenuCarousel({ items, onOpen, onAdd }) {
  const scrollRef = useRef(null);

  // Animate items in when the category changes
  useEffect(() => {
    if (scrollRef.current) {
      gsap.fromTo(
        scrollRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="w-full text-center py-20 text-slate-400 font-medium">
        No items found in this category.
      </div>
    );
  }

  return (
    <div className="w-full relative mt-12 pb-12">
      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 md:gap-16 px-8 md:px-20 py-10"
        style={{ scrollBehavior: 'smooth' }}
      >
        {items.map((item) => (
          <div 
            key={item.id} 
            className="snap-center shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] flex flex-col items-center group relative cursor-pointer"
            onClick={() => onOpen(item)}
          >
            {/* The Platter / Base - Gives the hotel feel without being a generic card */}
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-4/5 h-8 bg-slate-900/50 rounded-[100%] blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] -z-10 transition-all duration-500 group-hover:bg-amber-900/40 group-hover:blur-2xl" />

            {/* High Quality Image */}
            <div className="relative w-full aspect-square mb-8 flex justify-center items-center">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-[90%] object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-4"
                loading="lazy"
              />
            </div>

            {/* Content Text (Dark Hotel Vibe) */}
            <div className="text-center w-full flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="font-display text-3xl font-extrabold text-white tracking-tight drop-shadow-md mb-2 group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-300 text-sm md:text-base max-w-sm mb-4 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between w-full max-w-[200px] mt-2">
                <span className="text-2xl font-bold text-amber-500">{formatPrice(item.price)}</span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(item);
                  }}
                  className="bg-slate-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 p-3 rounded-full text-white shadow-lg shadow-black/50 transition-all duration-300 transform hover:scale-110 hover:rotate-90 group/btn"
                >
                  <Plus className="w-5 h-5 group-hover/btn:text-black" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fade Edges for Scroll affordance */}
      <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />
    </div>
  );
}
