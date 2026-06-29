import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, PenTool, Terminal, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const steps: ProcessStep[] = [
    {
      num: "01",
      title: "Discover",
      desc: "Auditing current medical interfaces, identifying HIPAA compliance boundaries, and mapping clinician clinical needs.",
      icon: <Compass size={22} className="text-accentColor" />
    },
    {
      num: "02",
      title: "Architect",
      desc: "Structuring reactive application states, drafting secure REST/GraphQL payloads, and modeling patient data flows.",
      icon: <PenTool size={22} className="text-secondaryAccent" />
    },
    {
      num: "03",
      title: "Develop",
      desc: "Building components with optimized bundle footprints, typing states with TypeScript, and conducting integration runs.",
      icon: <Terminal size={22} className="text-successColor" />
    },
    {
      num: "04",
      title: "Optimize",
      desc: "Refining core web vitals, analyzing load logs, auditing accessibility elements, and securing production builds.",
      icon: <Settings size={22} className="text-purple-500" />
    }
  ];

  useEffect(() => {
    // Stagger reveal of cards
    const cards = cardsRef.current?.querySelectorAll('.process-card');
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section 
      id="process" 
      ref={containerRef}
      className="py-24 lg:py-32 bg-secondarySurface relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accentColor/5 border border-accentColor/10 w-fit mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accentColor" />
            <span className="font-sans font-bold text-[10px] text-accentColor tracking-wider uppercase">Methodology</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-geist font-black tracking-tight text-textPrimary leading-tight mb-4">
            Development Process
          </h2>
          <p className="font-sans text-sm text-textSecondary font-medium max-w-lg mx-auto">
            A precise, structured engineering approach tailored to building intelligent and secure healthcare software products.
          </p>
        </div>

        {/* Process Steps grid */}
        <div className="relative">
          
          {/* Animated SVG Path connecting cards on Desktop */}
          <div className="absolute top-[88px] left-[12%] right-[12%] h-[2px] hidden lg:block pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background Path Track */}
              <line 
                x1="0" 
                y1="1" 
                x2="100%" 
                y2="1" 
                stroke="rgba(15,23,42,0.06)" 
                strokeWidth="2" 
                strokeDasharray="4 4"
              />
              {/* Active animated stroke overlay */}
              <line 
                x1="0" 
                y1="1" 
                x2="100%" 
                y2="1" 
                stroke="#2563EB" 
                strokeWidth="2" 
                className="animated-path"
                style={{
                  strokeDasharray: '8, 8',
                  animation: 'dashOffset 3s linear infinite'
                }}
              />
            </svg>
            <style>{`
              @keyframes dashOffset {
                to {
                  stroke-dashoffset: -40;
                }
              }
            `}</style>
          </div>

          {/* Cards container */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="process-card glass-panel p-6 rounded-3xl border border-borderColor/60 flex flex-col justify-between h-[300px] shadow-soft hover:-translate-y-1 transition-transform duration-300 group"
              >
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-geist font-black text-3xl text-textSecondary/20 tracking-tight group-hover:text-accentColor/25 transition-colors duration-300">
                    {step.num}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-white border border-borderColor flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="mt-8">
                  <h3 className="font-geist font-black text-lg text-textPrimary tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[11px] md:text-xs text-textSecondary leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
