import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CATEGORIES } from '../data/menuData.js';

/**
 * Glowing glass pill filters with a GSAP-animated active indicator
 * that slides and resizes beneath the selected pill.
 */
export default function CategoryFilter({ active, onChange }) {
  const wrapRef = useRef(null);
  const indicatorRef = useRef(null);

  const moveIndicator = (animate = true) => {
    const wrap = wrapRef.current;
    const indicator = indicatorRef.current;
    if (!wrap || !indicator) return;
    const activeBtn = wrap.querySelector(`[data-category="${active}"]`);
    if (!activeBtn) return;
    gsap.to(indicator, {
      x: activeBtn.offsetLeft,
      width: activeBtn.offsetWidth,
      duration: animate ? 0.45 : 0,
      ease: 'power3.out',
    });
  };

  useEffect(() => {
    moveIndicator(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    // Position instantly on mount and keep aligned on resize.
    moveIndicator(false);
    const onResize = () => moveIndicator(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={wrapRef}
      role="tablist"
      aria-label="Menu categories"
      className="relative mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-2xl p-2 bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl shadow-2xl"
    >
      {/* Sliding active indicator */}
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="absolute bottom-1.5 left-0 top-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_15px_rgba(52,211,153,0.5)] will-change-transform"
        style={{ width: 0 }}
      />
      {CATEGORIES.map((cat) => {
        const isActive = cat.id === active;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-category={cat.id}
            onClick={() => onChange(cat.id)}
            className={`relative z-10 whitespace-nowrap rounded-xl px-5 py-2.5 font-display text-sm font-semibold transition-colors duration-300 ${
              isActive ? 'text-slate-950' : 'text-slate-300 hover:text-emerald-400'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
