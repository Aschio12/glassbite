import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { TAX_RATE, formatPrice } from '../data/menuData.js';

export const cartLineTotal = (entry) =>
  (entry.item.price + entry.addOns.reduce((s, a) => s + a.price, 0)) * entry.quantity;

/**
 * Slide-out glass cart panel. Slides in/out with GSAP, supports quantity
 * controls per line, animated removal, subtotal + 8% tax + total.
 */
export default function CartDrawer({ open, cart, onClose, onUpdateQty, onRemove, onCheckout }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const rowRefs = useRef(new Map());

  // Slide the panel in/out whenever `open` flips.
  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;
    if (open) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        panelRef.current,
        { xPercent: 110 },
        { xPercent: 0, duration: 0.55, ease: 'power4.out' }
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' });
      gsap.to(panelRef.current, { xPercent: 110, duration: 0.4, ease: 'power3.in' });
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
      duration: 0.4,
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
        className="absolute inset-0 bg-slate-950/60 opacity-0 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="glass-strong absolute bottom-0 right-0 top-0 flex w-full max-w-md translate-x-full flex-col rounded-l-3xl will-change-transform"
        style={{ transform: 'translateX(110%)' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-bold">
            <ShoppingBag className="h-5 w-5 text-emerald-400" />
            Your Order
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/10 text-slate-300 transition-colors hover:border-red-400/40 hover:text-red-300"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Line items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <ShoppingBag className="h-12 w-12 text-slate-600" />
              <p className="font-display text-lg font-semibold text-slate-300">
                Your cart is empty
              </p>
              <p className="max-w-52 text-sm text-slate-500">
                Add something delicious from the menu to get started.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((entry) => {
                const lineTotal = cartLineTotal(entry);
                return (
                  <li
                    key={entry.key}
                    ref={(el) => {
                      if (el) rowRefs.current.set(entry.key, el);
                      else rowRefs.current.delete(entry.key);
                    }}
                    className="glass-soft overflow-hidden rounded-2xl p-3.5"
                  >
                    <div className="flex gap-3.5">
                      <img
                        src={entry.item.image}
                        alt={entry.item.title}
                        className="h-16 w-16 shrink-0 rounded-xl border border-white/15 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-semibold">{entry.item.title}</p>
                          <button
                            type="button"
                            onClick={() => handleRemove(entry.key)}
                            aria-label={`Remove ${entry.item.title}`}
                            className="text-slate-500 transition-colors hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        {entry.addOns.length > 0 && (
                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            + {entry.addOns.map((a) => a.label).join(', ')}
                          </p>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="glass-soft flex items-center rounded-lg">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => onUpdateQty(entry.key, entry.quantity - 1)}
                              className="grid h-7 w-7 place-items-center text-slate-300 transition-colors hover:text-emerald-400"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold">
                              {entry.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => onUpdateQty(entry.key, entry.quantity + 1)}
                              className="grid h-7 w-7 place-items-center text-slate-300 transition-colors hover:text-emerald-400"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-display text-sm font-bold text-emerald-400">
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
          <div className="border-t border-white/10 px-6 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-400">
                <dt>Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-slate-400">
                <dt>Tax (8%)</dt>
                <dd>{formatPrice(tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2.5 font-display text-lg font-bold">
                <dt>Total</dt>
                <dd className="heading-gradient">{formatPrice(total)}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={onCheckout}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-red-500 py-3.5 font-display text-sm font-bold text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.5)] transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            >
              Checkout · {formatPrice(total)}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
