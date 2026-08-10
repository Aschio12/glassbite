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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          className="group relative flex flex-col rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/20"
          onClick={() => onOpen(item)}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft gradient overlay at bottom of image for text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-amber-400 hover:text-black"
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
