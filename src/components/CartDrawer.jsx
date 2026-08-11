import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { TAX_RATE, formatPrice } from '../data/menuData.js';

export const cartLineTotal = (entry) =>
  (entry.item.price + entry.addOns.reduce((s, a) => s + a.price, 0)) * entry.quantity;

export default function CartDrawer({ open, cart, onClose, onUpdateQty, onRemove, onCheckout }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const rowRefs = useRef(new Map());

  // Slide the panel in/out whenever `open` flips.
  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;
    if (open) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.2, ease: 'power2.out' });
      gsap.fromTo(
        panelRef.current,
        { xPercent: 110 },
        { xPercent: 0, duration: 0.4, ease: 'power4.out' }
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' });
      gsap.to(panelRef.current, { xPercent: 110, duration: 0.3, ease: 'power3.in' });
    }
  }, [open]);

  const subtotal = useMemo(() => cart.reduce((sum, e) => sum + cartLineTotal(e), 0), [cart]);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleRemove = (key) => {
    const row = rowRefs.current.get(key);
    if (!row) {
      onRemove(key);
      return;
    }
    gsap.to(row, {
      x: 90,
      opacity: 0,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => onRemove(key),
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 opacity-0"
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute bottom-0 right-0 top-0 flex w-full max-w-md translate-x-full flex-col border-l-2 border-[#1a1a1a] bg-[#050505] will-change-transform"
        style={{ transform: 'translateX(110%)' }}
      >
        <div className="flex items-center justify-between border-b-2 border-[#1a1a1a] px-6 py-6">
          <h2 className="flex items-center gap-3 font-display text-3xl font-black uppercase text-white tracking-tight">
            <ShoppingBag className="h-6 w-6 text-amber-500" strokeWidth={2.5} />
            Your Order
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-12 w-12 place-items-center bg-black border border-[#1a1a1a] text-white transition-colors hover:bg-amber-500 hover:text-black hover:border-amber-500"
          >
            <X className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Line items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag className="h-16 w-16 text-[#1a1a1a]" strokeWidth={1} />
              <p className="font-display text-2xl font-black uppercase text-gray-400 tracking-widest">
                Cart is empty
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.map((entry) => {
                const lineTotal = cartLineTotal(entry);
                return (
                  <li
                    key={entry.key}
                    ref={(el) => {
                      if (el) rowRefs.current.set(entry.key, el);
                      else rowRefs.current.delete(entry.key);
                    }}
                    className="overflow-hidden border border-[#1a1a1a] bg-black p-4"
                  >
                    <div className="flex gap-4">
                      <div className="h-20 w-20 shrink-0 border border-[#1a1a1a] bg-[#050505] p-1">
                        <img
                          src={entry.item.image}
                          alt={entry.item.title}
                          className="h-full w-full object-cover grayscale"
                        />
                      </div>
                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate font-display text-lg font-black uppercase tracking-tight text-white">{entry.item.title}</p>
                          <button
                            type="button"
                            onClick={() => handleRemove(entry.key)}
                            aria-label={`Remove ${entry.item.title}`}
                            className="text-gray-500 transition-colors hover:text-amber-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                        {entry.addOns.length > 0 && (
                          <p className="mt-1 truncate text-xs font-bold uppercase tracking-widest text-gray-500">
                            + {entry.addOns.map((a) => a.label).join(', ')}
                          </p>
                        )}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-[#1a1a1a]">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => onUpdateQty(entry.key, entry.quantity - 1)}
                              className="grid h-8 w-8 place-items-center bg-black text-white transition-colors hover:bg-amber-500 hover:text-black"
                            >
                              <Minus className="h-4 w-4" strokeWidth={2.5} />
                            </button>
                            <span className="w-8 bg-black text-center text-sm font-bold text-white">
                              {entry.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => onUpdateQty(entry.key, entry.quantity + 1)}
                              className="grid h-8 w-8 place-items-center bg-black text-white transition-colors hover:bg-amber-500 hover:text-black"
                            >
                              <Plus className="h-4 w-4" strokeWidth={2.5} />
                            </button>
                          </div>
                          <span className="font-display text-xl font-black text-amber-500">
                            {formatPrice(lineTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Totals */}
        {cart.length > 0 && (
          <div className="border-t-2 border-[#1a1a1a] bg-[#050505] px-6 py-6">
            <dl className="space-y-2 text-sm font-bold uppercase tracking-widest text-gray-400">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-white">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Tax (8%)</dt>
                <dd className="text-white">{formatPrice(tax)}</dd>
              </div>
              <div className="my-4 border-t border-[#1a1a1a]" />
              <div className="flex justify-between font-display text-2xl font-black text-white">
                <dt>Total</dt>
                <dd className="text-amber-500">{formatPrice(total)}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={onCheckout}
              className="mt-6 flex h-14 w-full items-center justify-center bg-white font-display text-xl font-black uppercase tracking-tight text-black transition-colors hover:bg-amber-500"
            >
              Checkout — {formatPrice(total)}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
