import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Animate active timeline line scaleY
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 60%',
          scrub: true,
        }
      }
    );

    // 2. Animate timeline cards and markers
    const items = itemsRef.current?.querySelectorAll('.timeline-item');
    if (items) {
      items.forEach((item) => {
        const marker = item.querySelector('.timeline-marker');
        const card = item.querySelector('.timeline-card');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          }
        });

        tl.fromTo(marker,
          { scale: 0, backgroundColor: '#E2E8F0' },
          { scale: 1, backgroundColor: '#2563EB', duration: 0.35, ease: 'back.out(1.7)' }
        )
        .fromTo(card,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out' },
          '-=0.15'
        );
      });
    }
  }, []);

  const experiences = [
    {
      company: "MaxRemind Inc",
      role: "Angular Developer",
      period: "2023 - Present",
      logoLetter: "M",
      details: [
        "Voice-controlled EHR: Integrated voice interface commands enabling practitioners to hands-free navigate charting structures.",
        "OpenAI Whisper Integration: Built a speech-to-text pipeline mapping clinical dialogue transcripts into specific SOAP note templates.",
        "Real-time Wound Assessment: Structured image calculation modules calculating surface area and tissue progress over time.",
        "Image Annotation Systems: Engineered interactive canvas utility scopes for marking anatomical anomalies on diagnostic scans.",
        "Consent Forms & Editors: Developed compliance-locked digital signature forms and secure text editor modules."
      ]
    },
    {
      company: "Fiverr",
      role: "Web Developer",
      period: "2021 - 2023",
      logoLetter: "F",
      details: [
        "Custom Websites: Designed and delivered clean React and Angular client templates with optimal layout structures.",
        "Angular Solutions: Managed dashboard state logic and responsive grid matrices utilizing RxJS.",
        "React Development: Created multiple SPAs using Vite, Next.js, and lightweight layout packages.",
        "MUI Migration: Conducted library upgrades to Material UI, establishing WCAG accessibility standards.",
        "Client Solutions: Maintained top-tier client ratings by ensuring responsive UI layouts and clean codebases."
      ]
    }
  ];

  return (
    <section 
      id="timeline" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-secondarySurface relative overflow-hidden select-none"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accentColor/5 border border-accentColor/10 w-fit mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accentColor" />
            <span className="font-sans font-bold text-[10px] text-accentColor tracking-wider uppercase">Professional Path</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-geist font-black tracking-tight text-textPrimary leading-tight">
            Work Experience
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative pl-8 md:pl-0" ref={itemsRef}>
          
          {/* Background Line Track */}
          <div className="absolute left-[15px] md:left-1/2 top-4 bottom-4 w-[2px] bg-borderColor/60 -translate-x-[1px]" />
          
          {/* Active Animating Active Line */}
          <div 
            ref={lineRef}
            className="absolute left-[15px] md:left-1/2 top-4 bottom-4 w-[2px] bg-accentColor origin-top scale-y-0 -translate-x-[1px]"
          />

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index} 
                className="timeline-item relative grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 last:mb-0"
              >
                
                {/* Left column for Even, right for Odd on Desktop */}
                <div className={`md:col-span-5 flex flex-col md:text-right ${
                  isEven ? 'order-1 md:order-1' : 'order-1 md:order-7 md:text-left'
                }`}>
                  <div className="timeline-card glass-panel p-6 rounded-2xl border border-borderColor/60 shadow-soft">
                    <div className="flex items-center justify-between md:flex-row-reverse gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accentColor/5 border border-borderColor flex items-center justify-center font-geist font-black text-accentColor text-base shadow-sm">
                        {exp.logoLetter}
                      </div>
                      <div className={isEven ? 'md:text-right' : 'md:text-left'}>
                        <h3 className="font-geist font-black text-lg text-textPrimary leading-tight">{exp.company}</h3>
                        <p className="font-sans font-bold text-xs text-accentColor mt-0.5">{exp.role}</p>
                      </div>
                    </div>
                    <span className="inline-block px-2.5 py-1 rounded-full bg-primaryBg border border-borderColor text-[10px] font-sans font-bold text-textSecondary mb-4">
                      {exp.period}
                    </span>
                    <ul className="space-y-2.5 text-[11px] text-textSecondary leading-relaxed text-left">
                      {exp.details.map((detail, idx) => {
                        const [title, desc] = detail.split(': ');
                        return (
                          <li key={idx} className="flex gap-2">
                            <CheckCircle2 size={13} className="text-accentColor shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-textPrimary font-semibold">{title}</strong>: {desc}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Marker Column */}
                <div className="absolute left-0 md:left-1/2 top-4 w-8 h-8 rounded-full border-4 border-secondarySurface bg-white flex items-center justify-center shadow-md z-10 -translate-x-[15px] md:-translate-x-1/2">
                  <div className="timeline-marker w-2 h-2 rounded-full bg-borderColor scale-0" />
                </div>

                {/* Spacing dummy column */}
                <div className={`hidden md:block md:col-span-5 ${
                  isEven ? 'order-7' : 'order-1'
                }`} />

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
