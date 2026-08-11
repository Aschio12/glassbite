import { useEffect, useMemo, useRef, useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { formatPrice } from '../data/menuData.js';

export default function ItemModal({ item, onClose, onAdd }) {
  const overlayRef = useRef(null);
  const [selectedAddOns, setSelectedAddOns] = useState(() => new Set());
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedAddOns(new Set());
    setQuantity(1);
  }, [item]);

  const toggleAddOn = (id) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const total = useMemo(() => {
    const addOnsTotal = item.addOns
      .filter((a) => selectedAddOns.has(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    return (item.price + addOnsTotal) * quantity;
  }, [item, selectedAddOns, quantity]);

  const handleAdd = () => {
    const addOns = item.addOns.filter((a) => selectedAddOns.has(a.id));
    onAdd(item, addOns, quantity);
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        className="relative flex max-h-full w-full max-w-5xl flex-col md:flex-row overflow-y-auto border-2 border-[#222222] bg-[#111111]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center bg-black border border-[#222222] text-white transition-colors hover:bg-orange-500 hover:text-black hover:border-orange-500"
        >
          <X className="h-6 w-6" strokeWidth={2.5} />
        </button>

        {/* Visual side */}
        <div className="relative aspect-square w-full md:w-1/2 bg-black border-b md:border-b-0 md:border-r border-[#222222]">
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <div className="absolute left-6 top-6 bg-orange-500 px-4 py-2 font-display text-xl font-black uppercase text-black">
            {item.category}
          </div>
        </div>

        {/* Details side */}
        <div className="flex w-full md:w-1/2 flex-col p-6 sm:p-10">
          <div className="mb-8 pr-12">
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
              {item.title}
            </h2>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-gray-400">
              {item.description}
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span className="border border-[#222222] px-3 py-2">
              {item.specs.calories} kcal
            </span>
            <span className="border border-[#222222] px-3 py-2">
              {item.specs.prepTime}
            </span>
            <span className="border border-[#222222] px-3 py-2">
              {item.specs.size}
            </span>
          </div>

          {/* Add-ons */}
          {item.addOns && item.addOns.length > 0 && (
            <div className="mb-8">
              <p className="mb-4 text-sm font-black uppercase tracking-widest text-orange-500">
                Customizations
              </p>
              <div className="space-y-3">
                {item.addOns.map((addOn) => {
                  const checked = selectedAddOns.has(addOn.id);
                  return (
                    <label
                      key={addOn.id}
                      className={`flex cursor-pointer items-center justify-between border px-4 py-3 text-sm uppercase transition-all duration-200 ${
                        checked
                          ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                          : 'border-[#222222] bg-black hover:border-gray-600 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-4 font-bold">
                        <div className={`grid h-5 w-5 place-items-center border ${checked ? 'border-orange-500 bg-orange-500' : 'border-[#222222] bg-transparent'}`}>
                          {checked && <div className="h-2 w-2 bg-black" />}
                        </div>
                        {addOn.label}
                      </span>
                      <span className="font-bold">
                        +{formatPrice(addOn.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity + total */}
          <div className="mt-auto flex flex-col sm:flex-row items-center gap-4 pt-8">
            <div className="flex h-16 w-full sm:w-auto items-center justify-between border border-[#222222] bg-black px-4">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="grid h-8 w-8 place-items-center text-gray-500 transition-colors hover:text-orange-500"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-12 text-center font-display text-2xl font-black text-white">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="grid h-8 w-8 place-items-center text-gray-500 transition-colors hover:text-orange-500"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex h-16 flex-1 w-full items-center justify-center bg-white px-6 font-display text-xl font-black uppercase text-black transition-colors hover:bg-orange-500"
            >
              Add to Cart — {formatPrice(total)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
