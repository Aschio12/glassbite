import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 60, damping: 15 } 
  },
};

export default function MenuGrid({ items, onOpen, onAdd }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-16 pt-8"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          className="group relative flex flex-col overflow-visible cursor-pointer transition-all duration-500 hover:-translate-y-4"
          onClick={() => onOpen(item)}
        >
          <div className="relative h-64 sm:h-72 w-full overflow-hidden flex items-center justify-center p-4">
            <div className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-full overflow-hidden drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] shadow-[0_0_15px_rgba(255,255,255,0.05)] border-4 border-[#1a1a1a]">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors drop-shadow-md">
                  {item.name}
                </h3>
              </div>
              <p className="font-mono text-lg font-bold text-white shrink-0">
                ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="mt-auto pt-6 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {item.specs?.size}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(item);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-emerald-400 hover:text-black border border-white/20"
                aria-label={`Add ${item.name} to cart`}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
