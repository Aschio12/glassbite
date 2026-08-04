import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Clock, Flame, Plus } from 'lucide-react';
import { formatPrice } from '../data/menuData.js';

/**
 * A 3D interactive glass pedestal/platter — not a flat card.
 * The food image floats above a glass base; on hover it lifts,
 * tilts in 3D from the pointer position (lerped via gsap.quickTo)
 * and casts a soft ambient glow shadow underneath.
 */
export default function MenuCard({ item, onOpen, onAdd }) {
  const cardRef = useRef(null);
  const tiltRef = useRef(null);
  const floatRef = useRef(null);
  const glowRef = useRef(null);
  const addBtnRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const tiltEl = tiltRef.current;
    const floatEl = floatRef.current;
    const glowEl = glowRef.current;

    // Transform-only quickTo setters — 60fps pointer tracking.
    const rotateXTo = gsap.quickTo(tiltEl, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const rotateYTo = gsap.quickTo(tiltEl, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    const floatYTo = gsap.quickTo(floatEl, 'y', { duration: 0.5, ease: 'power3.out' });
    const floatScaleTo = gsap.quickTo(floatEl, 'scale', { duration: 0.5, ease: 'power3.out' });
    const glowOpacityTo = gsap.quickTo(glowEl, 'opacity', { duration: 0.5, ease: 'power2.out' });
    const glowScaleTo = gsap.quickTo(glowEl, 'scale', { duration: 0.5, ease: 'power2.out' });

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      rotateYTo(nx * 18);
      rotateXTo(ny * -14);
      floatYTo(-16);
      floatScaleTo(1.05);
      glowOpacityTo(1);
      glowScaleTo(1.15);
    };

    const onLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      floatYTo(0);
      floatScaleTo(1);
      glowOpacityTo(0.45);
      glowScaleTo(1);
    };

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
    return () => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const handleAdd = (e) => {
    e.stopPropagation();
    // Fly/pop feedback on the button itself.
    gsap.fromTo(
      addBtnRef.current,
      { scale: 0.7 },
      { scale: 1, duration: 0.5, ease: 'elastic.out(1.2, 0.45)' }
    );
    // Pop the floating image as if the item leapt into the cart.
    gsap.fromTo(
      floatRef.current,
      { scale: 1.12, y: -26 },
      { scale: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }
    );
    onAdd(item);
  };

  return (
    <article
      ref={cardRef}
      className="menu-card perspective-1200 group cursor-pointer"
      onClick={() => onOpen(item)}
      aria-label={`View ${item.title}`}
    >
      <div ref={tiltRef} className="preserve-3d relative will-change-transform">
        {/* Ambient glow shadow cast underneath the pedestal */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute inset-x-6 -bottom-3 h-16 rounded-[50%] bg-gradient-to-r from-amber-500/40 via-orange-500/30 to-red-500/40 opacity-45 blur-2xl will-change-transform"
        />

        {/* Floating product layer */}
        <div
          ref={floatRef}
          className="relative z-10 mx-auto -mb-10 w-[78%] will-change-transform"
          style={{ transform: 'translateZ(60px)' }}
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="backface-hidden aspect-[4/3] w-full rounded-3xl border border-white/25 object-cover shadow-2xl"
          />
        </div>

        {/* Glass pedestal base */}
        <div className="glass relative rounded-3xl px-5 pb-5 pt-14 transition-colors duration-300 group-hover:border-amber-300/30">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-bold leading-snug">{item.title}</h3>
            <span className="shrink-0 rounded-xl border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 font-display text-sm font-bold text-amber-300">
              {formatPrice(item.price)}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
            {item.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-red-400" />
                {item.specs.calories} kcal
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-amber-300" />
                {item.specs.prepTime}
              </span>
            </div>

            <button
              ref={addBtnRef}
              type="button"
              onClick={handleAdd}
              aria-label={`Add ${item.title} to cart`}
              className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-red-500 text-slate-950 shadow-glow-amber transition-transform duration-200 hover:scale-110 active:scale-90 will-change-transform"
            >
              <Plus className="h-5 w-5" strokeWidth={2.75} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
