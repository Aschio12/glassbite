import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  
  const wrapperRef = useRef(null);
  const burgerRef = useRef(null);
  const textRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    setVisible(true);
    document.body.style.overflow = 'hidden';
    
    // Reset
    gsap.set(wrapperRef.current, { opacity: 1, display: 'flex' });
    gsap.set(burgerRef.current, { scale: 0, rotation: -45 });
    gsap.set(textRef.current, { opacity: 0, y: 20 });
    gsap.set(ringRef.current, { strokeDashoffset: 565.48 }); // 2 * pi * 90
    setProgress(0);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setVisible(false);
      }
    });

    // 1. Pop in the burger and text
    tl.to(burgerRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
    })
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.4');

    // 2. Loading progress
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const p = Math.round(counter.val);
        setProgress(p);
        const offset = 565.48 - (p / 100) * 565.48;
        gsap.set(ringRef.current, { strokeDashoffset: offset });
      }
    });

    // 3. Zoom the burger into the camera
    tl.to(textRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power3.in',
    })
    .to(burgerRef.current, {
      scale: 1.5, // subtle zoom out rather than screen-covering
      opacity: 0,
      duration: 0.8,
      ease: 'expo.in',
    }, '-=0.1')
    .to(wrapperRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    }, '-=0.4');

    // Subtle float effect for the burger while loading
    gsap.to(burgerRef.current, {
      y: -15,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    return () => {
      document.body.style.overflow = '';
      gsap.killTweensOf([burgerRef.current, textRef.current, ringRef.current, wrapperRef.current, counter]);
      tl.kill();
    };
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center">
      
      {/* Burger & Ring Container */}
      <div className="relative flex items-center justify-center w-[220px] h-[220px] mb-8">
        {/* SVG Progress Ring */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          {/* Background Ring */}
          <circle 
            cx="110" cy="110" r="90" 
            stroke="#1a1a1a" 
            strokeWidth="4" 
            fill="none" 
          />
          {/* Progress Ring */}
          <circle 
            ref={ringRef}
            cx="110" cy="110" r="90" 
            stroke="#f97316"
            strokeWidth="6" 
            fill="none"
            strokeLinecap="round"
            style={{ 
              strokeDasharray: 565.48,
              strokeDashoffset: 565.48 
            }}
            className="drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]"
          />
        </svg>

        {/* Hero Burger Image */}
        <img 
          ref={burgerRef}
          src="/images/neon_burger_logo.jpg" 
          alt="Loading Logo" 
          className="w-[140px] h-auto rounded-xl object-contain drop-shadow-2xl z-10 relative mix-blend-screen"
        />
      </div>

      {/* Text Container */}
      <div ref={textRef} className="flex flex-col items-center">
        <h1 className="font-display text-4xl font-black uppercase tracking-widest text-white mb-2">
          Glass<span className="text-orange-500">Bite</span>
        </h1>
        <div className="text-orange-500 font-bold text-sm tracking-[0.3em]">
          PREPARING {progress}%
        </div>
      </div>
    </div>
  );
}
