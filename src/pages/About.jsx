import { useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal.jsx';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-hidden relative bg-black">
      {/* Background glow and floating elements */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-orange-600/5 blur-[50px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-48 h-48 bg-amber-500/5 blur-[60px] rounded-full animate-pulse delay-1000 pointer-events-none" />

      {/* Hero Section */}
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center relative w-full">
        <div className="mx-auto max-w-5xl px-6 relative z-10 text-center">
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white mb-8 leading-[1.15]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">GlassBite</span> <br className="hidden md:block" /> Philosophy
            </h1>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-2xl md:text-3xl font-light text-gray-300 leading-relaxed mb-16 max-w-3xl mx-auto">
              We believe that fast food shouldn't mean compromised quality. 
              Every ingredient is meticulously sourced, every recipe is perfected, 
              and every meal is an experience.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            <ScrollReveal direction="up" delay={0.3}>
              <div className="group p-8 rounded-3xl bg-transparent transition-all duration-500 hover:-translate-y-2 border border-white/0 hover:border-white/5 hover:bg-white/[0.02]">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                  <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">Pure Ingredients</h3>
                <p className="text-gray-400 leading-relaxed">
                  No artificial preservatives, colors, or flavors. Just real, honest food crafted with passion.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4}>
              <div className="group p-8 rounded-3xl bg-transparent transition-all duration-500 hover:-translate-y-2 border border-white/0 hover:border-white/5 hover:bg-white/[0.02]">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                  <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">Masterfully Crafted</h3>
                <p className="text-gray-400 leading-relaxed">
                  Our chefs treat every burger like a canvas, ensuring the perfect balance of texture and taste.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.5}>
              <div className="group p-8 rounded-3xl bg-transparent transition-all duration-500 hover:-translate-y-2 border border-white/0 hover:border-white/5 hover:bg-white/[0.02]">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                  <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">No Compromises</h3>
                <p className="text-gray-400 leading-relaxed">
                  We never cut corners. From our custom-baked brioche buns to our perfectly seared patties.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* The Process Section */}
      <div className="mx-auto max-w-5xl px-6 mt-20 pb-32 w-full">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-normal text-white">Our Process</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-6 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="space-y-12">
          {['The Sourcing', 'The Preparation', 'The Experience'].map((step, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? "right" : "left"} delay={0.1}>
              <div className="process-step flex flex-col md:flex-row gap-8 items-center bg-white/[0.01] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.03] transition-colors">
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
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Chefs Section */}
      <div className="w-full bg-black/50 py-32 border-y border-white/5 relative z-10">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter text-white">The Masters</h2>
              <div className="w-16 h-1 bg-orange-500 mx-auto mt-6 rounded-full" />
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="group">
                <div className="w-full aspect-[4/5] bg-white/5 rounded-3xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581459524458-15c0e442c4b7?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-3xl font-display font-black text-white uppercase">Chef Marcus</h3>
                    <p className="text-orange-500 font-bold tracking-widest text-sm">HEAD CHEF</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <div className="group">
                <div className="w-full aspect-[4/5] bg-white/5 rounded-3xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-3xl font-display font-black text-white uppercase">Chef Elena</h3>
                    <p className="text-orange-500 font-bold tracking-widest text-sm">PASTRY & DESSERTS</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-4xl mx-auto px-6 pb-32 text-center">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="bg-gradient-to-tr from-orange-900/40 to-black border border-orange-500/20 p-12 rounded-[3rem] relative overflow-hidden">
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
        </ScrollReveal>
      </div>
    </div>
  );
}
