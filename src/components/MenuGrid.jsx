import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MenuGrid({ items, onOpen, onAdd }) {
  return (
    <div className="mx-auto grid w-full max-w-[100rem] grid-cols-1 gap-10 px-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 pb-20">
      {items.map((item, index) => {
        const isDarker = index % 3 === 0;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex cursor-pointer flex-col burgerhub-card hover:-translate-y-4"
            onClick={() => onOpen(item)}
          >
            {/* Glowing Image Section */}
            <div className="relative aspect-[4/3] w-full flex items-center justify-center p-4 overflow-visible">
              <img
                src={item.image}
                alt={item.name}
                className={`relative z-10 h-full w-full object-contain animate-float transition-all duration-700 group-hover:scale-[1.15] group-hover:drop-shadow-[0_0_25px_rgba(255,107,0,0.4)] ${
                  isDarker
                    ? 'brightness-[0.65] contrast-125 saturate-50 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100'
                    : ''
                }`}
              />
            </div>

            {/* Vibrant Typography Content */}
            <div className="flex flex-1 flex-col justify-between p-6 pt-2 bg-transparent relative z-20">
              <div className="text-center">
                <h3 className="font-display text-4xl font-medium tracking-tight text-white/90 group-hover:text-orange-500 transition-colors drop-shadow-md">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 font-medium tracking-widest uppercase transition-all duration-500">
                  {item.category} • {item.specs?.size || 'Standard'}
                </p>
                <div className="mt-4 text-3xl font-black text-white group-hover:text-amber-500 transition-colors">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(item);
                  }}
                  className="flex h-12 w-full max-w-[160px] items-center justify-center rounded-full bg-white/5 text-white/80 transition-all duration-500 hover:bg-orange-500 hover:text-white hover:shadow-[0_0_20px_rgba(255,107,0,0.6)]"
                  aria-label={`Add ${item.name} to cart`}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" strokeWidth={2.5} />
                  <span className="font-medium">Add to Cart</span>
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
