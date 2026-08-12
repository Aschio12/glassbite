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
          <div className="group p-8 rounded-3xl bg-transparent transition-all duration-500 hover:-translate-y-2 border border-white/0 hover:border-white/5 hover:bg-white/[0.02]">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
              <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">Pure Ingredients</h3>
            <p className="text-gray-400 leading-relaxed">
              No artificial preservatives, colors, or flavors. Just real, honest food crafted with passion.
            </p>
          </div>
          
          <div className="group p-8 rounded-3xl bg-transparent transition-all duration-500 hover:-translate-y-2 border border-white/0 hover:border-white/5 hover:bg-white/[0.02]">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
              <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">Masterfully Crafted</h3>
            <p className="text-gray-400 leading-relaxed">
              Our chefs treat every burger like a canvas, ensuring the perfect balance of texture and taste.
            </p>
          </div>
          
          <div className="group p-8 rounded-3xl bg-transparent transition-all duration-500 hover:-translate-y-2 border border-white/0 hover:border-white/5 hover:bg-white/[0.02]">
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

      {/* Parallax Image Section */}
      <div className="w-full h-[60vh] mt-32 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/images/hero_burger.jpg')] bg-cover bg-center bg-fixed opacity-30 brightness-50 saturate-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-white drop-shadow-2xl">
            Taste the <span className="text-orange-500">Difference</span>
          </h2>
        </div>
      </div>

      {/* The Process Section */}
      <div className="mx-auto max-w-5xl px-6 py-32 w-full">
        <div className="text-center mb-16">
          <h2 className="about-reveal text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter text-white">Our Process</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-6 rounded-full" />
        </div>

        <div className="space-y-12">
          {['The Sourcing', 'The Preparation', 'The Experience'].map((step, i) => (
            <div key={i} className="about-reveal flex flex-col md:flex-row gap-8 items-center bg-white/[0.01] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.03] transition-colors">
              <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center text-3xl font-black text-white shadow-[0_0_30px_rgba(255,107,0,0.3)]">
                0{i + 1}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">{step}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {i === 0 && "We travel the world to find the highest quality ingredients. From locally sourced organic produce to premium wagyu beef, we never settle for second best."}
                  {i === 1 && "Every dish is prepared to order. Our chefs use advanced culinary techniques to ensure maximum flavor extraction and perfect textures in every single bite."}
                  {i === 2 && "The moment our food hits your table, it's a sensory journey. The aroma, the visual presentation, and the explosive flavors combine into pure magic."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-4xl mx-auto px-6 pb-32 text-center">
        <div className="about-reveal bg-gradient-to-tr from-orange-900/40 to-black border border-orange-500/20 p-12 rounded-[3rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero_burger.jpg')] bg-cover opacity-10 mix-blend-overlay" />
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 relative z-10">
            Ready to <span className="text-orange-500">Bite?</span>
          </h2>
          <p className="text-gray-300 mb-8 relative z-10 max-w-lg mx-auto">
            Join us at our flagship location in Addis Ababa and experience the future of premium dining.
          </p>
          <a href="/menu" className="burgerhub-button-primary inline-flex items-center gap-2 relative z-10">
            EXPLORE THE MENU
          </a>
        </div>
      </div>
    </div>
  );
}
