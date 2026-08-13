import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ShoppingBag } from 'lucide-react';

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
    <header className="nav-shell fixed inset-x-0 top-0 z-40 bg-[#111111]/95 backdrop-blur-md border-b border-[#222222] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-display-giant text-3xl tracking-normal text-white">
            GLASS<span className="text-orange-500 drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]">BITE</span>
          </span>
        </Link>

        <div className="hidden items-center gap-10 text-xs font-bold uppercase tracking-widest text-gray-400 md:flex">
          <Link to="/" className="transition-colors hover:text-white">
            Menu
          </Link>
          <Link to="/location" className="transition-colors hover:text-white">
            Locations
          </Link>
          <Link to="/about" className="transition-colors hover:text-white">
            About
          </Link>
        </div>

        <button
          type="button"
          onClick={onCartOpen}
          aria-label={`Open cart, ${cartCount} items`}
          className="group relative hidden md:flex items-center gap-3 px-2 py-1 transition-colors hover:text-orange-500"
        >
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline text-white group-hover:text-orange-500 transition-colors">Bag</span>
          <div className="relative">
            <ShoppingBag className="h-5 w-5 text-white group-hover:text-orange-500 transition-colors" strokeWidth={1.5} />
            <span
              ref={badgeRef}
              className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[10px] font-black text-white will-change-transform shadow-[0_0_10px_rgba(255,107,0,0.5)]"
            >
              {cartCount}
            </span>
          </div>
        </button>
      </nav>
    </header>
  );
}
