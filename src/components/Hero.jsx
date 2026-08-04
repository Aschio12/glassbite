import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Sparkles, Timer } from 'lucide-react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80&auto=format&fit=crop';

/**
 * High-energy hero. The food item floats above a glass pedestal and
 * follows the cursor / touch position with a lerped 3D tilt (gsap.quickTo),
 * so all motion stays transform-only at 60fps.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const floatRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const floatEl = floatRef.current;

    const ctx = gsap.context(() => {
      // Entrance choreography.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-kicker', { y: 24, opacity: 0, duration: 0.7 }, 0.35)
        .from('.hero-title-line', { y: 60, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.4')
        .from('.hero-sub', { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.45')
        .from('.hero-float-wrap', { scale: 0.7, opacity: 0, duration: 1.1, ease: 'back.out(1.4)' }, '-=0.9')
        .from('.hero-stat', { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.5');

      // Idle float loop (independent of pointer tilt).
      gsap.to('.hero-float-idle', {
        y: -18,
        duration: 2.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
      gsap.to(glowRef.current, {
        scale: 1.12,
        opacity: 0.85,
        duration: 2.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, section);

    // Lerped pointer tracking — quickTo keeps this allocation-free per frame.
    const rotateXTo = gsap.quickTo(floatEl, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const rotateYTo = gsap.quickTo(floatEl, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const xTo = gsap.quickTo(floatEl, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(floatEl, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleMove = (clientX, clientY) => {
      const rect = section.getBoundingClientRect();
      const nx = (clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const ny = (clientY - rect.top) / rect.height - 0.5;
      rotateYTo(nx * 26);
      rotateXTo(ny * -20);
      xTo(nx * 36);
      yTo(ny * 26);
    };

    const onPointerMove = (e) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      const t = e.touches[0];
      if (t) handleMove(t.clientX, t.clientY);
    };
    const onLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      xTo(0);
      yTo(0);
    };

    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('touchmove', onTouchMove, { passive: true });
    section.addEventListener('pointerleave', onLeave);

    return () => {
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('touchmove', onTouchMove);
      section.removeEventListener('pointerleave', onLeave);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32"
    >
      {/* Ambient neon orbs */}
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-[28rem] w-[28rem] rounded-full bg-red-600/15 blur-3xl" />

      <div className="mx-auto grid w-[min(92%,72rem)] items-center gap-14 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <p className="hero-kicker mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
            Fire-crafted fast food
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="hero-title-line block">Taste the</span>
            <span className="hero-title-line heading-gradient text-glow-amber block">Glass</span>
            <span className="hero-title-line block">Revolution</span>
          </h1>
          <p className="hero-sub mt-6 max-w-md text-base leading-relaxed text-slate-400 sm:text-lg">
            Burgers that drip, pizzas that pull, shakes that glow. Order through
            the most cinematic glass kitchen on the web — hot at your door in minutes.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="hero-cta group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-red-500 px-7 py-3.5 font-display text-sm font-bold text-slate-950 shadow-glow-amber transition-transform duration-300 hover:scale-[1.04] active:scale-95"
            >
              Order Now
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <div className="hero-cta glass-soft flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm text-slate-300">
              <Timer className="h-4 w-4 text-amber-300" />
              Avg. delivery · 22 min
            </div>
          </div>

          <div className="mt-10 flex gap-8">
            {[
              ['4.9★', '12k reviews'],
              ['120+', 'daily combos'],
              ['100%', 'flame grilled'],
            ].map(([value, label]) => (
              <div key={label} className="hero-stat">
                <p className="font-display text-xl font-bold text-amber-300">{value}</p>
                <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating hero food item */}
        <div className="hero-float-wrap perspective-1200 relative mx-auto hidden aspect-square w-full max-w-md items-center justify-center sm:flex">
          {/* Glow bed */}
          <div
            ref={glowRef}
            className="absolute inset-8 rounded-full bg-gradient-to-br from-amber-500/35 via-orange-500/20 to-red-600/25 blur-3xl will-change-transform"
          />
          {/* Glass pedestal ring */}
          <div className="glass absolute bottom-6 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-[50%] opacity-80" />

          <div ref={floatRef} className="preserve-3d relative will-change-transform">
            <div className="hero-float-idle preserve-3d relative">
              <div className="glass-strong preserve-3d rounded-[2.5rem] p-4 shadow-glow-amber">
                <img
                  src={HERO_IMAGE}
                  alt="Ember Classic Smash burger"
                  className="backface-hidden h-auto w-full rounded-[2rem] object-cover"
                  style={{ transform: 'translateZ(46px)' }}
                  loading="eager"
                />
                {/* Floating glass price chip */}
                <div
                  className="glass absolute -right-5 top-8 rounded-2xl px-4 py-2 will-change-transform"
                  style={{ transform: 'translateZ(80px)' }}
                >
                  <p className="font-display text-lg font-bold text-amber-300">$12.90</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Ember Classic</p>
                </div>
                {/* Floating kcal chip */}
                <div
                  className="glass absolute -left-6 bottom-10 rounded-2xl px-4 py-2 will-change-transform"
                  style={{ transform: 'translateZ(64px)' }}
                >
                  <p className="font-display text-sm font-bold text-red-300">780 kcal</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">double stack</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
