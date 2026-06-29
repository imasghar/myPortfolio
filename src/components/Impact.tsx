import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Mic, Users, LayoutGrid, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Impact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const impacts = [
    {
      title: "AI-Powered EHR Features",
      desc: "Built computer vision layers and semantic analysis data structures mapping diagnostic records.",
      metric: "99.2% Accuracy",
      icon: <Brain className="text-accentColor" size={18} />
    },
    {
      title: "Voice-Enabled Workflows",
      desc: "Integrated serverless Whisper audio dictation models, translating clinician comments directly into charts.",
      metric: "2.2h Saved Daily",
      icon: <Mic className="text-secondaryAccent" size={18} />
    },
    {
      title: "Enhanced Patient Engagement",
      desc: "Developed secure patient-facing health portals (PHR), allowing direct record downloads.",
      metric: "50k Active Users",
      icon: <Users className="text-successColor" size={18} />
    },
    {
      title: "Enterprise EHR Modules",
      desc: "Created highly responsive frontend dashboards for diagnosis billing and treatment scheduling.",
      metric: "20+ Shipped Modules",
      icon: <LayoutGrid className="text-purple-500" size={18} />
    }
  ];

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.impact-card');
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
      ref={containerRef}
      className="py-24 lg:py-32 bg-primaryBg relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-successColor/5 border border-successColor/10 w-fit mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-successColor" />
            <span className="font-sans font-bold text-[10px] text-successColor tracking-wider uppercase">Key Contributions</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-geist font-black tracking-tight text-textPrimary leading-tight mb-4">
            Impact Highlights
          </h2>
          <p className="font-sans text-sm text-textSecondary font-medium max-w-lg mx-auto">
            Core clinical achievements and product results shipped directly to active enterprise environments.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((item, idx) => (
            <div 
              key={idx} 
              className="impact-card glass-panel p-6 rounded-3xl border border-borderColor/60 flex flex-col justify-between h-[280px] shadow-soft hover:-translate-y-1 transition-transform duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white border border-borderColor flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <CheckCircle size={16} className="text-successColor/70" />
                </div>
                <h3 className="font-geist font-black text-base text-textPrimary tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-textSecondary leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Metric */}
              <div className="border-t border-borderColor/50 pt-4 flex items-center justify-between">
                <span className="font-sans text-[10px] text-textSecondary font-semibold uppercase tracking-wider">Metrics Achieved</span>
                <span className="font-geist font-black text-xs text-accentColor">{item.metric}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
