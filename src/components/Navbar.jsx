import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Flame, ShoppingBag } from 'lucide-react';

/**
 * Floating glassmorphic header with a live cart badge that
 * scale-pops (GSAP) whenever the item count changes.
 */
export default function Navbar({ cartCount, onCartOpen }) {
  const badgeRef = useRef(null);
  const prevCount = useRef(cartCount);

  // Entrance animation on mount.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-shell', {
        y: -48,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, []);

  // Pop the badge whenever the count changes.
  useEffect(() => {
    if (cartCount === prevCount.current || !badgeRef.current) {
      prevCount.current = cartCount;
      return;
    }
    prevCount.current = cartCount;
    gsap.fromTo(
      badgeRef.current,
      { scale: 0.4 },
      { scale: 1, duration: 0.55, ease: 'elastic.out(1.1, 0.45)' }
    );
  }, [cartCount]);

  return (
    <header className="nav-shell fixed inset-x-0 top-4 z-40 mx-auto w-[min(92%,64rem)]">
      <nav className="glass flex items-center justify-between rounded-2xl px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-red-600 shadow-glow-amber">
            <Flame className="h-5 w-5 text-slate-950" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Glass<span className="heading-gradient">Bite</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          <a href="#menu" className="transition-colors hover:text-amber-300">
            Menu
          </a>
          <a href="#menu" className="transition-colors hover:text-amber-300">
            Combos
          </a>
          <a href="#menu" className="transition-colors hover:text-amber-300">
            About
          </a>
        </div>

        <button
          type="button"
          onClick={onCartOpen}
          aria-label={`Open cart, ${cartCount} items`}
          className="group relative flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:border-amber-400/40 hover:bg-white/15 hover:shadow-glow-amber"
        >
          <ShoppingBag className="h-4.5 w-4.5 text-amber-300 transition-transform duration-300 group-hover:-rotate-12" />
          <span className="hidden sm:inline">Cart</span>
          <span
            ref={badgeRef}
            className="grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-red-500 px-1 text-[11px] font-bold text-slate-950 will-change-transform"
          >
            {cartCount}
          </span>
        </button>
      </nav>
    </header>
  );
}
