import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero3D } from './Hero3D';
import { Particles } from './Particles';
import { Magnetic } from './Magnetic';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headlineText = "Building Intelligent Healthcare Experiences For The Future.";

  useEffect(() => {
    const chars = headlineRef.current?.querySelectorAll('.char');
    if (!chars) return;

    // 1. Entrance animation
    const tl = gsap.timeline();
    tl.fromTo(chars, 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.015 }
    );
    
    tl.fromTo(subheadlineRef.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      "-=0.55"
    );

    tl.fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      "-=0.4"
    );

    // 2. Scroll animation (ScrollTrigger)
    gsap.to(chars, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom 25%',
        scrub: true,
      },
      y: -50,
      opacity: 0.1,
      stagger: 0.008,
      ease: 'none',
    });

  }, []);

  const renderCharacters = (text: string) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className="char inline-block origin-bottom"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 lg:py-0 overflow-hidden mesh-gradient select-none"
    >
      <Particles />
      
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accentColor/5 rounded-full filter blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondaryAccent/5 rounded-full filter blur-[80px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 w-full z-10 relative items-center">
        {/* Left Side: Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accentColor/5 border border-accentColor/10 w-fit mb-6 shadow-sm">
            <Sparkles size={12} className="text-accentColor animate-pulse" />
            <span className="font-sans font-bold text-[11px] text-accentColor tracking-wider uppercase">Senior Frontend Architect</span>
          </div>

          {/* Headline */}
          <h1 
            ref={headlineRef} 
            className="text-[40px] md:text-[60px] lg:text-[70px] leading-[1.05] font-black tracking-tighter text-textPrimary mb-6 overflow-hidden flex flex-wrap"
            style={{ fontWeight: 900, letterSpacing: '-0.05em' }}
          >
            {renderCharacters(headlineText)}
          </h1>

          {/* Subheading */}
          <p 
            ref={subheadlineRef} 
            className="text-lg md:text-xl text-textSecondary font-sans font-medium max-w-xl mb-10 leading-relaxed"
          >
            Frontend Engineer specializing in Angular, AI-driven Healthcare Systems, Enterprise EHR Platforms, and modern digital experiences.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-5">
            <Magnetic range={45} strength={0.3}>
              <a 
                href="#projects" 
                className="px-8 py-4 rounded-full bg-textPrimary text-white font-sans font-semibold text-sm shadow-md hover:bg-black hover:shadow-lg transition-all duration-200 flex items-center gap-2 group clickable"
              >
                View Projects 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </Magnetic>

            <Magnetic range={45} strength={0.3}>
              <a 
                href="#contact" 
                className="px-8 py-4 rounded-full glass-panel text-textPrimary hover:bg-secondarySurface/95 font-sans font-semibold text-sm shadow-sm transition-all duration-200 clickable"
              >
                Schedule a Call
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right Side: Interactive 3D Ecosystem */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <Hero3D />
        </div>
      </div>
    </section>
  );
};
