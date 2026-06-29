import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Brain, Layers, Briefcase, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(leftRef.current,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );

    gsap.fromTo(rightRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );

    const cards = statsRef.current?.querySelectorAll('.stat-card');
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          }
        }
      );
    }
  }, []);

  const stats = [
    { label: "Experience", val: "3+ Years", desc: "Leading frontend interfaces", icon: <Briefcase className="text-accentColor" size={18} /> },
    { label: "Modules Shipped", val: "20+ Modules", desc: "In production EHR engines", icon: <Layers className="text-secondaryAccent" size={18} /> },
    { label: "Domain Expertise", val: "Healthcare", desc: "HIPAA compliance & EHR workflows", icon: <ShieldCheck className="text-successColor" size={18} /> },
    { label: "AI Implementations", val: "Cognitive", desc: "Speech-to-text workflows", icon: <Brain className="text-purple-500" size={18} /> },
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-24 lg:py-32 bg-primaryBg relative overflow-hidden select-none"
    >
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-accentColor/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Avatar Container */}
        <div ref={leftRef} className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-[300px] h-[300px] md:w-[360px] md:h-[360px] flex items-center justify-center">
            {/* SVG Blob background */}
            <svg viewBox="0 0 200 200" className="absolute w-full h-full opacity-10 text-accentColor fill-current">
              <path d="M40.1,-63.9C52.4,-57.2,63.1,-46.8,70.5,-34C77.9,-21.2,81.9,-6.1,79.9,8.4C77.9,22.9,69.9,36.8,59.9,47.9C49.9,59,37.9,67.3,24.6,71.2C11.3,75.1,-3.3,74.5,-17.7,70.8C-32.2,67.2,-46.5,60.6,-57.1,49.8C-67.6,39,-74.5,24.1,-77.8,7.9C-81,-8.3,-80.7,-25.7,-73.4,-39C-66.1,-52.3,-51.9,-61.4,-37.6,-67C-23.3,-72.6,-8.8,-74.6,3.6,-80C16.1,-85.4,32.2,-94.3,40.1,-63.9Z" transform="translate(100 100)" />
            </svg>

            {/* Stylized Avatar Card */}
            <div className="w-[85%] h-[85%] rounded-3xl glass-panel relative overflow-hidden flex items-center justify-center p-6 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-accentColor/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative w-full h-full rounded-2xl bg-secondarySurface border border-borderColor flex flex-col items-center justify-center p-6 text-center shadow-soft">
                <div className="w-14 h-14 rounded-2xl bg-accentColor/10 flex items-center justify-center text-accentColor mb-4 shadow-sm">
                  <Award size={28} />
                </div>
                <h3 className="font-geist font-black text-xl text-textPrimary tracking-tight">Ghulam Asghar</h3>
                <p className="font-sans font-bold text-[10px] text-accentColor uppercase tracking-wider mt-1">Senior Frontend Engineer</p>
                <div className="w-full border-t border-borderColor/60 my-4" />
                <p className="font-sans text-[11px] text-textSecondary leading-relaxed">
                  Building intelligent frontend architectures at the intersection of medical compliance, design details, and AI capability.
                </p>
                {/* Decorative border lines */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full border border-borderColor/40 opacity-40 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full border border-borderColor/20 opacity-30 group-hover:scale-125 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Narrative and Stats */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div ref={rightRef}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-successColor/5 border border-successColor/10 w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-successColor" />
              <span className="font-sans font-bold text-[10px] text-successColor tracking-wider uppercase">Healthcare Tech Specialist</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-geist font-black tracking-tight text-textPrimary mb-6 leading-tight">
              Engineering products where <span className="text-accentColor">healthcare</span> meets <span className="text-secondaryAccent">intelligence</span>.
            </h2>
            
            <p className="font-sans text-sm md:text-base text-textSecondary leading-relaxed mb-5 font-medium">
              Over the past 3+ years, I have specialized in building robust, compliant, and highly polished enterprise applications for the healthcare sector. I design and build highly optimized Electronic Health Record (EHR) modules, patient portals, and voice-assisted clinical workflow tools.
            </p>
            
            <p className="font-sans text-sm md:text-base text-textSecondary leading-relaxed mb-10 font-medium">
              At <strong className="text-textPrimary font-bold">MaxRemind Inc</strong>, my work bridges the gap between complex medical regulatory compliance and high-fidelity user experiences. I specialize in integrating voice APIs like OpenAI Whisper to streamline clinical documentation and optimize medical assessment systems.
            </p>
          </div>

          {/* Stats Cards */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="stat-card glass-panel p-5 rounded-2xl border border-borderColor/60 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 shadow-soft cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans font-bold text-[10px] text-textSecondary uppercase tracking-wider">{stat.label}</span>
                  <div className="p-1.5 rounded-lg bg-primaryBg border border-borderColor group-hover:scale-105 transition-transform duration-300">{stat.icon}</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-geist font-black tracking-tight text-textPrimary">{stat.val}</div>
                  <p className="text-[10px] text-textSecondary mt-0.5">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
