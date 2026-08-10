import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import FloatingItem from './FloatingItem.jsx';

/**
 * Menu carousel container. Re-runs a GSAP stagger entrance every time the
 * filtered item set changes. Uses native CSS scroll snapping for smooth 
 * swipe/scroll interactions responsive to screen size.
 */
export default function MenuCarousel({ items, onOpen, onAdd }) {
  const carouselRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.carousel-item',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: { each: 0.1, from: 'start' },
          clearProps: 'transform,opacity',
        }
      );
    }, carouselRef);
    return () => ctx.revert();
  }, [items]);

  return (
    <div className="relative mt-16 w-full max-w-7xl mx-auto">
      {/* Scrollable Container */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-8 hide-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.length === 0 && (
          <div className="w-full text-center py-20 text-slate-500">
            No items found in this category.
          </div>
        )}
        
        {items.map((item) => (
          <div 
            key={item.id} 
            className="carousel-item snap-center shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <FloatingItem item={item} onOpen={onOpen} onAdd={onAdd} />
          </div>
        ))}
      </div>
      
      {/* CSS to hide webkit scrollbars for the carousel */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
