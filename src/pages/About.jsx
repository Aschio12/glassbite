import { useEffect } from 'react';
import gsap from 'gsap';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative flex flex-col items-center justify-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
        <h1 className="about-reveal font-display text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">GlassBite</span> Philosophy
        </h1>
        
        <p className="about-reveal text-xl md:text-2xl font-light text-gray-300 leading-relaxed mb-12">
          We believe that fast food shouldn't mean compromised quality. 
          Every ingredient is meticulously sourced, every recipe is perfected, 
          and every meal is an experience.
        </p>

        <div className="about-reveal grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
          <div className="group p-8 rounded-3xl bg-transparent transition-all duration-500 hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
              <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">Pure Ingredients</h3>
            <p className="text-gray-400 leading-relaxed">
              No artificial preservatives, colors, or flavors. Just real, honest food crafted with passion.
            </p>
          </div>
          
          <div className="group p-8 rounded-3xl bg-transparent transition-all duration-500 hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
              <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">Masterfully Crafted</h3>
            <p className="text-gray-400 leading-relaxed">
              Our chefs treat every burger like a canvas, ensuring the perfect balance of texture and taste.
            </p>
          </div>
          
          <div className="group p-8 rounded-3xl bg-transparent transition-all duration-500 hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
              <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">No Compromises</h3>
            <p className="text-gray-400 leading-relaxed">
              We never cut corners. From our custom-baked brioche buns to our perfectly seared patties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
