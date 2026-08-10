import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Clock, Flame, Plus } from 'lucide-react';
import { formatPrice } from '../data/menuData.js';

/**
 * A completely cardless 3D interactive item floating in space.
 * Features continuous slow rotation that blends into cursor-tracking 3D tilt on hover.
 */
export default function FloatingItem({ item, onOpen, onAdd }) {
  const containerRef = useRef(null);
  const tiltRef = useRef(null);
  const floatRef = useRef(null);
  const glowRef = useRef(null);
  const addBtnRef = useRef(null);
  
  // Keep track of the continuous rotation tween so we can pause/resume it.
  const idleSpinRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const tiltEl = tiltRef.current;
    const floatEl = floatRef.current;
    const glowEl = glowRef.current;

    // Continuous idle spin around the Y axis
    idleSpinRef.current = gsap.to(tiltEl, {
      rotationY: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
    });

    // Transform-only quickTo setters — 60fps pointer tracking.
    const rotateXTo = gsap.quickTo(tiltEl, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const rotateYTo = gsap.quickTo(tiltEl, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    const floatYTo = gsap.quickTo(floatEl, 'y', { duration: 0.5, ease: 'power3.out' });
    const floatScaleTo = gsap.quickTo(floatEl, 'scale', { duration: 0.5, ease: 'power3.out' });
    const glowOpacityTo = gsap.quickTo(glowEl, 'opacity', { duration: 0.5, ease: 'power2.out' });
    const glowScaleTo = gsap.quickTo(glowEl, 'scale', { duration: 0.5, ease: 'power2.out' });

    const onMove = (e) => {
      if (idleSpinRef.current) idleSpinRef.current.pause();

      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Calculate rotation based on pointer
      const targetRotY = nx * 30;
      
      rotateYTo(targetRotY);
      rotateXTo(ny * -20);
      floatYTo(-24);
      floatScaleTo(1.1);
      glowOpacityTo(1);
      glowScaleTo(1.2);
    };

    const onLeave = () => {
      rotateXTo(0);
      floatYTo(0);
      floatScaleTo(1);
      glowOpacityTo(0.3);
      glowScaleTo(1);
      
      // Animate rotationY back to 0 then resume idle spin
      gsap.to(tiltEl, {
        rotationY: 0,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: () => {
          if (idleSpinRef.current) idleSpinRef.current.play();
        }
      });
    };

    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerleave', onLeave);
    
    return () => {
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
      if (idleSpinRef.current) idleSpinRef.current.kill();
    };
  }, []);

  const handleAdd = (e) => {
    e.stopPropagation();
    gsap.fromTo(
      addBtnRef.current,
      { scale: 0.7 },
      { scale: 1, duration: 0.5, ease: 'elastic.out(1.2, 0.45)' }
    );
    gsap.fromTo(
      floatRef.current,
      { scale: 1.15, y: -30 },
      { scale: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }
    );
    onAdd(item);
  };

  return (
    <article
      ref={containerRef}
      className="perspective-1200 group cursor-pointer relative w-full h-[500px] flex flex-col items-center justify-center shrink-0"
      onClick={() => onOpen(item)}
      aria-label={`View ${item.title}`}
    >
      {/* 3D Scene */}
      <div ref={tiltRef} className="preserve-3d relative will-change-transform flex-1 flex items-center justify-center w-full">
        {/* Ambient glow shadow cast underneath */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute top-[80%] w-[60%] h-16 rounded-[50%] bg-gradient-to-r from-amber-500/40 via-orange-500/20 to-red-500/40 opacity-30 blur-2xl will-change-transform z-0"
        />

        {/* Floating transparent product image */}
        <div
          ref={floatRef}
          className="relative z-10 w-[80%] max-w-[300px] mx-auto will-change-transform"
          style={{ transform: 'translateZ(80px)' }}
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      {/* Item Details (Floating beneath the 3D scene) */}
      <div className="relative z-20 w-[90%] mx-auto mt-4 px-4 pb-6 transition-opacity duration-300">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-extrabold text-slate-100 leading-snug drop-shadow-lg">{item.title}</h3>
          <span className="shrink-0 rounded-xl border border-amber-400/20 bg-black/40 backdrop-blur-md px-3 py-1 font-display text-sm font-bold text-amber-400 shadow-xl">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-300 drop-shadow-md">
          {item.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm">
              <Flame className="h-4 w-4 text-red-500" />
              {item.specs.calories} kcal
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm">
              <Clock className="h-4 w-4 text-amber-400" />
              {item.specs.prepTime}
            </span>
          </div>

          <button
            ref={addBtnRef}
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${item.title} to cart`}
            className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 text-slate-950 shadow-glow-amber transition-transform duration-200 hover:scale-110 active:scale-90 will-change-transform"
          >
            <Plus className="h-6 w-6" strokeWidth={3} />
          </button>
        </div>
      </div>
    </article>
  );
}
