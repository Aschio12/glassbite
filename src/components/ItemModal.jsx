import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Clock, Flame, Minus, Plus, Ruler, X } from 'lucide-react';
import { formatPrice } from '../data/menuData.js';

/**
 * Detailed item modal with floating-ingredient depth layers:
 * copies of the item image sit at different translateZ / scale / blur
 * depths and drift in with a staggered GSAP entrance, giving a
 * parallax "exploded" feel. Includes add-ons, quantity and a live total.
 */
export default function ItemModal({ item, onClose, onAdd }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const [selectedAddOns, setSelectedAddOns] = useState(() => new Set());
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedAddOns(new Set());
    setQuantity(1);
  }, [item]);

  // Entrance animation — backdrop fade, panel rise, depth layers stagger in.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 })
        .fromTo(
          panelRef.current,
          { y: 64, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55 },
          '-=0.15'
        )
        .fromTo(
          '.depth-layer',
          { z: (i) => -160 - i * 90, opacity: 0, scale: 0.7 },
          {
            z: (i, el) => Number(el.dataset.depth),
            opacity: (i, el) => Number(el.dataset.opacity),
            scale: (i, el) => Number(el.dataset.scale),
            duration: 0.9,
            stagger: 0.09,
            ease: 'back.out(1.5)',
          },
          '-=0.3'
        )
        .fromTo('.modal-stagger', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 }, '-=0.5');
    }, panelRef);
    return () => ctx.revert();
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

  // Depth-layer configs: deeper layers are larger, dimmer and blurrier.
  const layers = [
    { depth: -70, scale: 1.35, opacity: 0.16, blur: 'blur-md' },
    { depth: -35, scale: 1.16, opacity: 0.3, blur: 'blur-sm' },
    { depth: 0, scale: 1, opacity: 1, blur: '' },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        ref={panelRef}
        className="glass-strong max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl will-change-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Visual side — floating ingredient depth layers */}
          <div className="perspective-1200 relative flex min-h-72 items-center justify-center overflow-hidden rounded-t-3xl bg-gradient-to-br from-emerald-500/15 via-transparent to-red-600/15 p-10 md:rounded-l-3xl md:rounded-tr-none">
            <div className="preserve-3d relative aspect-square w-full max-w-64">
              {layers.map((layer, i) => (
                <img
                  key={i}
                  src={item.image}
                  alt={i === layers.length - 1 ? item.name : ''}
                  aria-hidden={i !== layers.length - 1}
                  data-depth={layer.depth}
                  data-scale={layer.scale}
                  data-opacity={layer.opacity}
                  className={`depth-layer absolute inset-0 h-full w-full rounded-full border border-[#1a1a1a]/50 object-cover drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] shadow-2xl will-change-transform ${layer.blur}`}
                />
              ))}
            </div>
            <span className="glass absolute left-5 top-5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
              {item.category}
            </span>
          </div>

          {/* Details side */}
          <div className="relative p-7">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/10 text-slate-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <h2 className="modal-stagger font-display pr-10 text-2xl font-extrabold tracking-tight">
              {item.title}
            </h2>
            <p className="modal-stagger mt-2 text-sm leading-relaxed text-slate-400">
              {item.description}
            </p>

            <div className="modal-stagger mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
              <span className="glass-soft flex items-center gap-1.5 rounded-full px-3 py-1.5">
                <Flame className="h-3.5 w-3.5 text-emerald-400" /> {item.specs.calories} kcal
              </span>
              <span className="glass-soft flex items-center gap-1.5 rounded-full px-3 py-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-400" /> {item.specs.prepTime}
              </span>
              <span className="glass-soft flex items-center gap-1.5 rounded-full px-3 py-1.5">
                <Ruler className="h-3.5 w-3.5 text-emerald-300" /> {item.specs.size}
              </span>
            </div>

            {/* Add-ons */}
            <div className="modal-stagger mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Make it yours
              </p>
              <div className="space-y-2">
                {item.addOns.map((addOn) => {
                  const checked = selectedAddOns.has(addOn.id);
                  return (
                    <label
                      key={addOn.id}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-200 ${
                        checked
                          ? 'border-emerald-400/50 bg-emerald-400/10 shadow-[0_0_15px_rgba(52,211,153,0.5)]'
                          : 'border-white/10 bg-white/5 hover:border-white/25'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddOn(addOn.id)}
                          className="h-4 w-4 accent-emerald-500"
                        />
                        {addOn.label}
                      </span>
                      <span className="font-semibold text-emerald-400">
                        +{formatPrice(addOn.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Quantity + total */}
            <div className="modal-stagger mt-6 flex items-center justify-between gap-4">
              <div className="glass-soft flex items-center rounded-xl">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="grid h-10 w-10 place-items-center text-slate-300 transition-colors hover:text-emerald-400"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-display text-base font-bold">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  className="grid h-10 w-10 place-items-center text-slate-300 transition-colors hover:text-emerald-400"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 rounded-xl bg-gradient-to-r from-emerald-400 to-red-500 px-5 py-3 font-display text-sm font-bold text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.5)] transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                Add to cart · {formatPrice(total)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
