import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import MenuCard from './MenuCard.jsx';

/**
 * Menu grid container. Re-runs a GSAP stagger entrance every time the
 * filtered item set changes; each run is wrapped in gsap.context and
 * reverted on cleanup so no tweens leak between filter switches.
 */
export default function MenuGrid({ items, onOpen, onAdd }) {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.menu-card',
        { y: 56, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: { each: 0.07, from: 'start' },
          clearProps: 'transform,opacity',
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [items]);

  return (
    <div
      ref={gridRef}
      className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => (
        <MenuCard key={item.id} item={item} onOpen={onOpen} onAdd={onAdd} />
      ))}
    </div>
  );
}
