import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGE = '/images/hero_burger_v3.png';

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
    <section ref={sectionRef} className="relative flex min-h-[90vh] flex-col overflow-hidden bg-[#050505]">
      <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col lg:flex-row">
        {/* Left Typography Block */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 lg:px-16 lg:max-w-2xl">
          <div className="overflow-hidden">
            <h1 className="hero-word text-display-giant text-6xl text-white sm:text-7xl md:text-8xl lg:text-9xl lowercase capitalize-first py-2">
              Delicious.
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-word text-display-giant text-6xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-[0_0_15px_rgba(255,107,0,0.4)] lowercase capitalize-first py-2">
              Cravable.
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-word text-display-giant text-6xl text-white sm:text-7xl md:text-8xl lg:text-9xl lowercase capitalize-first py-2">
              Better.
            </h1>
          </div>

          <p className="hero-cta mt-8 max-w-md text-lg text-gray-300 leading-relaxed">
            Experience the ultimate culinary romance. Premium, hand-crafted burgers and wood-fired pizzas made with passion, precision, and zero compromises. Fall in love at first bite.
          </p>

          <a
            href="#menu"
            className="hero-cta mt-10 inline-flex w-fit items-center gap-4 burgerhub-button-primary px-10 py-5 text-lg"
          >
            Order Now
            <ArrowRight className="h-6 w-6" strokeWidth={3} />
          </a>
        </div>

        {/* Right Image Block */}
        <div className="relative flex flex-1 items-center justify-center burgerhub-radial-glow overflow-hidden min-h-[50vh]">
          <img
            src={HERO_IMAGE}
            alt="Premium Burger"
            className="hero-img absolute inset-0 h-full w-full object-contain transition-transform duration-700 p-4 lg:p-12 animate-float drop-shadow-[0_20px_50px_rgba(255,107,0,0.2)]"
          />
          {/* Vignette Overlay for soft edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#050505_100%)] pointer-events-none opacity-80" />
        </div>
      </div>
    </section>
  );
}
