import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setVisible(true);
    
    // Scroll lock while loading
    document.body.style.overflow = 'hidden';
    
    // Ensure loader text and overlay are reset for subsequent loads
    gsap.set('.loader-burger', { scale: 1 });
    gsap.set('.loader-text', { opacity: 1, y: 0 });
    gsap.set('.loader-overlay', { yPercent: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setVisible(false);
      }
    });

    tl.to('.loader-burger', {
      scale: 1.1,
      duration: 0.6,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    })
    .to('.loader-text', {
      opacity: 0,
      y: 10,
      duration: 0.3,
    }, '-=0.3')
    .to('.loader-overlay', {
      yPercent: -100,
      duration: 0.6,
      ease: 'power4.inOut',
    }, '+=0.1');

    return () => {
      document.body.style.overflow = '';
      tl.kill();
    };
  }, [location.pathname]); // Trigger on every route change

  if (!visible) return null;

  return (
    <div className="loader-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]">
      {/* Sleek glowing burger icon */}
      <div className="loader-burger relative flex flex-col items-center justify-center gap-1">
        <div className="h-3 w-16 rounded-t-full bg-orange-500 shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
        <div className="h-2 w-18 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)] ml-1 mr-1" style={{ width: '70px' }} />
        <div className="h-2 w-16 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
        <div className="h-3 w-16 rounded-b-full bg-orange-500 shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
      </div>
      <div className="loader-text mt-8 font-display text-2xl font-black uppercase tracking-widest text-white">
        Glass<span className="text-orange-500">Bite</span>
      </div>
    </div>
  );
}
