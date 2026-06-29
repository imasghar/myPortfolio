import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Activity, Shield, Cpu, PenTool, BookOpen, Tractor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  detailedDesc: string;
  metrics: string[];
  tech: string[];
  icon: React.ReactNode;
  bgGradient: string;
}

export const ProjectShowcase: React.FC = () => {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const horizontalRowRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "maximus-ehr",
      title: "Maximus EHR",
      category: "Enterprise System",
      desc: "Complete healthcare management ecosystem integrating clinical charting, diagnosis routing, and secure workloads.",
      detailedDesc: "A core medical interface coordinating thousands of patient records daily. It supports multi-tenant healthcare locations, real-time lab diagnostic status updates, and custom patient billing cycles. Optimized query mechanisms yield sub-100ms response timelines on millions of data nodes.",
      metrics: ["HIPAA Compliant", "99.9% Uptime", "15k Clinicians"],
      tech: ["Angular", "RxJS", "REST API", "PrimeNG"],
      icon: <Shield className="text-accentColor" size={24} />,
      bgGradient: "from-blue-50 to-sky-50/50"
    },
    {
      id: "phr-portal",
      title: "Patient Health Record",
      category: "Patient Portal",
      desc: "Self-service health portal allowing patients to securely download labs and communicate with doctors.",
      detailedDesc: "An encrypted, user-facing patient portal where individuals track long-term health telemetry. Integrates with vitals APIs, medical billing systems, and live message portals. Designed for seamless mobile responsiveness, enabling elderly patients to easily navigate clinical documentation.",
      metrics: ["98% Patient Rating", "50k Active Users", "AES-256 Lock"],
      tech: ["React", "TailwindCSS", "TypeScript", "Chart.js"],
      icon: <Activity className="text-successColor" size={24} />,
      bgGradient: "from-emerald-50 to-teal-50/50"
    },
    {
      id: "ai-voice-ehr",
      title: "AI Voice EHR",
      category: "AI Integration",
      desc: "Dictation utility transcribing clinician speech into structured EHR record templates in real time.",
      detailedDesc: "Voice translation tool built on OpenAI Whisper. It records doctor-patient dialogues, filters back-end ambient room noise, and automatically parses transcribed notes into structured SOAP medical template sections. Saves doctors an average of 2 hours of typing daily.",
      metrics: ["Whisper Engine", "98.7% Accuracy", "0.2s Audio Lag"],
      tech: ["React", "Web Audio API", "Whisper", "Express"],
      icon: <Cpu className="text-purple-500" size={24} />,
      bgGradient: "from-purple-50 to-indigo-50/50"
    },
    {
      id: "consent-forms",
      title: "Consent Platform",
      category: "Clinical Flow",
      desc: "Compliance tool for collecting digital signatures, managing templates, and securing patient consent.",
      detailedDesc: "Electronic form package streamlining hospital check-ins. Utilizes HTML5 Canvas for high-fidelity hand-drawn signature capture. Generates cryptographically sealed PDF approvals, creating auditable time-stamps that guarantee legal security.",
      metrics: ["100% Paperless", "Signature Lock", "Audit Trailed"],
      tech: ["Angular", "Canvas API", "SCSS", "Node.js"],
      icon: <PenTool className="text-orange-500" size={24} />,
      bgGradient: "from-orange-50 to-amber-50/50"
    },
    {
      id: "ehr-training",
      title: "EHR Training Portal",
      category: "Interactive App",
      desc: "Gamified simulation platform training clinical staff on EHR workflows without exposing live databases.",
      detailedDesc: "Interactive learning hub with mockup EHR clinical dashboards. It uses guided scenarios to test staff competence in patient admissions, prescription validation, and emergency protocols. Offers customized performance reports and certificates.",
      metrics: ["15k Trained Staff", "92% Completion", "Zero Risk Sandbox"],
      tech: ["React", "GSAP", "TailwindCSS", "TypeScript"],
      icon: <BookOpen className="text-pink-500" size={24} />,
      bgGradient: "from-pink-50 to-rose-50/50"
    },
    {
      id: "agrocropify",
      title: "AgroCropify",
      category: "IoT Intelligence",
      desc: "Smart agricultural telemetry dashboard tracking crop health metrics and soil telemetry.",
      detailedDesc: "A satellite mapping and IoT-sensor dashboard predicting crop harvest timelines. It reads soil moisture logs, temperature feeds, and weather forecasts to recommend optimal fertilization schedules. Yields a 12% increase in agricultural efficiency.",
      metrics: ["500+ Sensors", "12% Yield Boost", "IoT Integrated"],
      tech: ["React", "Leaflet Maps", "Chart.js", "Express"],
      icon: <Tractor className="text-emerald-600" size={24} />,
      bgGradient: "from-emerald-50 to-green-50/50"
    }
  ];

  useEffect(() => {
    const horizontalRow = horizontalRowRef.current;
    const scrollSection = scrollSectionRef.current;
    if (!horizontalRow || !scrollSection) return;

    // Calculate displacement (horizontal scroll length)
    const getScrollAmount = () => {
      return horizontalRow.scrollWidth - window.innerWidth;
    };

    let scrollTween = gsap.to(horizontalRow, {
      x: () => -getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: scrollSection,
        pin: true,
        scrub: 0.8,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
    };
  }, []);

  // Soft tilt effect on cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) translateY(-8px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <div ref={scrollSectionRef} className="relative overflow-hidden select-none bg-primaryBg">
      
      {/* Horizontal Scroll sticky wrapper */}
      <div className="h-screen w-full flex flex-col justify-center sticky top-0 py-12">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 w-full mb-8 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accentColor/5 border border-accentColor/10 w-fit mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accentColor" />
            <span className="font-sans font-bold text-[10px] text-accentColor tracking-wider uppercase">Project Showcase</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-geist font-black tracking-tight text-textPrimary">
              Featured Work
            </h2>
            <p className="text-xs text-textSecondary font-sans font-bold uppercase tracking-wider hidden md:block">
              Scroll Down to Traverse Projects ➜
            </p>
          </div>
        </div>

        {/* Row wrapper */}
        <div 
          ref={horizontalRowRef} 
          className="flex gap-8 px-6 md:px-24 w-max h-[440px] items-center"
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setActiveProject(project)}
              className="w-[320px] md:w-[380px] h-[380px] rounded-2xl glass-panel border border-borderColor bg-gradient-to-br p-6 flex flex-col justify-between shadow-soft hover:shadow-glass hover:border-accentColor/30 transition-all duration-300 ease-out cursor-pointer group"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
              }}
            >
              {/* Category / Icon */}
              <div className="flex items-center justify-between" style={{ transform: 'translateZ(20px)' }}>
                <span className="font-sans font-bold text-[10px] text-textSecondary uppercase tracking-widest bg-white border border-borderColor px-2.5 py-1 rounded-full">
                  {project.category}
                </span>
                <div className="p-2 rounded-xl bg-white border border-borderColor/60 group-hover:scale-105 transition-transform duration-300">
                  {project.icon}
                </div>
              </div>

              {/* Title & Desc */}
              <div className="my-4" style={{ transform: 'translateZ(30px)' }}>
                <h3 className="font-geist font-black text-xl text-textPrimary tracking-tight mb-2 group-hover:text-accentColor transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="font-sans text-xs text-textSecondary leading-relaxed line-clamp-3">
                  {project.desc}
                </p>
              </div>

              {/* Metrics & Badges */}
              <div style={{ transform: 'translateZ(10px)' }}>
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="font-sans text-[9px] font-bold text-textPrimary px-2 py-0.5 rounded bg-white border border-borderColor">
                      {t}
                    </span>
                  ))}
                </div>
                {/* Metrics */}
                <div className="flex justify-between border-t border-borderColor/50 pt-3">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <span key={idx} className="font-sans font-bold text-[9px] text-accentColor flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-accentColor" />
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immersive Details Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-textPrimary/10 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl glass-panel-heavy rounded-3xl border border-borderColor overflow-hidden relative shadow-glass max-h-[85vh] flex flex-col">
            
            {/* Header Color Accent */}
            <div className="h-2 w-full bg-accentColor" />

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto no-scrollbar flex-1 flex flex-col gap-6">
              
              {/* Top Row */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="font-sans font-bold text-[10px] text-accentColor uppercase tracking-widest bg-accentColor/5 px-3 py-1 rounded-full border border-accentColor/10">
                    {activeProject.category}
                  </span>
                  <h3 className="font-geist font-black text-2xl md:text-3xl text-textPrimary tracking-tight mt-3">
                    {activeProject.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveProject(null)}
                  className="p-2 rounded-full hover:bg-slate-100 border border-borderColor transition-colors duration-200 clickable"
                >
                  <X size={18} className="text-textSecondary" />
                </button>
              </div>

              {/* Detailed narrative */}
              <div>
                <h4 className="font-sans font-bold text-[11px] text-textSecondary uppercase tracking-wider mb-2">Project Overview</h4>
                <p className="font-sans text-sm text-textSecondary leading-relaxed font-medium">
                  {activeProject.detailedDesc}
                </p>
              </div>

              {/* Metrics Detail */}
              <div>
                <h4 className="font-sans font-bold text-[11px] text-textSecondary uppercase tracking-wider mb-3">Live Metrics & Impact</h4>
                <div className="grid grid-cols-3 gap-3">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="bg-primaryBg border border-borderColor p-3.5 rounded-2xl text-center">
                      <span className="font-geist font-black text-xs md:text-sm text-accentColor">{m.split(' ')[0]}</span>
                      <span className="block text-[8px] md:text-[9px] text-textSecondary font-sans font-semibold uppercase tracking-wider mt-1">
                        {m.split(' ').slice(1).join(' ') || 'Standard'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology details */}
              <div>
                <h4 className="font-sans font-bold text-[11px] text-textSecondary uppercase tracking-wider mb-3">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t, idx) => (
                    <span key={idx} className="font-sans text-[11px] font-bold text-textPrimary px-3 py-1.5 rounded-xl bg-primaryBg border border-borderColor shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-8 py-5 border-t border-borderColor/60 bg-primaryBg/30 backdrop-blur-sm flex justify-end shrink-0">
              <button 
                onClick={() => setActiveProject(null)}
                className="px-5 py-2.5 rounded-full border border-borderColor text-textSecondary font-sans font-bold text-xs hover:bg-slate-50 transition-all duration-200 clickable"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
