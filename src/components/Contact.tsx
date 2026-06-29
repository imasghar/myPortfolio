import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  const contactItems = [
    { label: "Email Address", val: "ghulamashgar@example.com", href: "mailto:ghulamashgar@example.com", icon: <Mail size={16} /> },
    { label: "LinkedIn", val: "linkedin.com/in/ghulam-asghar", href: "https://linkedin.com", icon: <Linkedin size={16} /> },
    { label: "GitHub Profile", val: "github.com/ghulamashgar", href: "https://github.com", icon: <Github size={16} /> },
    { label: "HQ Location", val: "Dallas, Texas, USA", href: "#", icon: <MapPin size={16} /> },
  ];

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="py-24 lg:py-32 bg-primaryBg relative overflow-hidden select-none flex items-center justify-center min-h-[80vh]"
    >
      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 grid-bg pointer-events-none opacity-60 z-0" 
        style={{
          animation: 'gridMove 30s linear infinite',
        }}
      />
      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
      `}</style>

      {/* Ambient glow rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accentColor/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
        
        {/* Contact glass panel container */}
        <div 
          ref={cardRef}
          className="glass-panel-heavy rounded-[32px] border border-borderColor p-8 md:p-12 flex flex-col items-center text-center shadow-glass"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accentColor/5 border border-accentColor/10 w-fit mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accentColor animate-ping" />
            <span className="font-sans font-bold text-[10px] text-accentColor tracking-wider uppercase">Open to select opportunities</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-geist font-black tracking-tight text-textPrimary leading-[1.1] max-w-2xl mb-8">
            Let's Build The Next Generation Of <span className="text-accentColor">Healthcare Technology</span>.
          </h2>

          <p className="font-sans text-sm md:text-base text-textSecondary font-medium max-w-lg mb-10 leading-relaxed">
            Have a project focused on EHR architectures, medical workflows, or voice AI dictation systems? Let's collaborate to build an elite product experience.
          </p>

          {/* Contact tags grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl mb-10 text-left">
            {contactItems.map((item, idx) => (
              <a 
                key={idx}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass-panel p-4 rounded-2xl border border-borderColor/60 flex items-center justify-between hover:border-accentColor/30 hover:-translate-y-0.5 transition-all duration-300 shadow-soft clickable"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primaryBg border border-borderColor flex items-center justify-center text-textSecondary">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-[8px] font-sans font-bold text-textSecondary uppercase tracking-widest">{item.label}</span>
                    <span className="text-xs font-sans font-bold text-textPrimary">{item.val}</span>
                  </div>
                </div>
                {item.href !== '#' && <ArrowUpRight size={14} className="text-textSecondary/70" />}
              </a>
            ))}
          </div>

          {/* Get in touch button */}
          <Magnetic range={50} strength={0.25}>
            <a 
              href="mailto:ghulamashgar@example.com" 
              className="px-8 py-4.5 rounded-full bg-accentColor text-white font-sans font-semibold text-sm shadow-md hover:bg-accentColor/95 hover:shadow-lg hover:shadow-accentColor/10 transition-all duration-200 flex items-center gap-2 group clickable"
            >
              Get in Touch
              <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </Magnetic>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-[9px] text-textSecondary font-sans font-medium tracking-wider uppercase">
          © {new Date().getFullYear()} Ghulam Asghar. All Rights Reserved.
        </div>

      </div>
    </section>
  );
};
