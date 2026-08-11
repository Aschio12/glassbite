import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2000&auto=format&fit=crop';

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-word', { yPercent: 100, opacity: 0, duration: 1, stagger: 0.1 })
        .from('.hero-img', { scale: 1.1, opacity: 0, duration: 1.2 }, '-=0.8')
        .from('.hero-cta', { x: -20, opacity: 0, duration: 0.6 }, '-=0.6');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-[90vh] flex-col overflow-hidden brutal-border-b">
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Typography Block */}
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-12 brutal-border-r">
          <div className="overflow-hidden">
            <h1 className="hero-word text-display-giant text-7xl text-white sm:text-8xl md:text-[8rem] lg:text-[10rem]">
              JUICY.
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-word text-display-giant text-7xl text-amber-500 sm:text-8xl md:text-[8rem] lg:text-[10rem]">
              CHEESY.
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-word text-display-giant text-7xl text-white sm:text-8xl md:text-[8rem] lg:text-[10rem]">
              BETTER.
            </h1>
          </div>

          <p className="hero-cta mt-8 max-w-sm text-sm font-bold uppercase tracking-widest text-gray-400">
            Premium ingredients, wood-fired precision, and no compromises. The ultimate fast-food experience.
          </p>

          <a
            href="#menu"
            className="hero-cta mt-10 inline-flex w-fit items-center gap-4 bg-amber-500 px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-105 active:scale-95"
          >
            Order Now
            <ArrowRight className="h-5 w-5" strokeWidth={3} />
          </a>
        </div>

        {/* Right Image Block */}
        <div className="relative flex flex-1 items-center justify-center bg-[#0a0a0a] overflow-hidden min-h-[50vh]">
          <img
            src={HERO_IMAGE}
            alt="Premium Burger"
            className="hero-img absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
          />
          {/* overlay vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
        </div>
      </div>
    </section>
  );
}
