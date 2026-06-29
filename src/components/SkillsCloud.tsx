import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Code, Database, HeartPulse } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillNode {
  name: string;
  x: number;
  y: number;
  ox: number; // Original coordinate X
  oy: number; // Original coordinate Y
  vx: number; // Velocity X
  vy: number; // Velocity Y
  element: HTMLDivElement | null;
}

interface SkillGroup {
  title: string;
  color: string;
  icon: React.ReactNode;
  skills: string[];
}

export const SkillsCloud: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  const skillGroups: SkillGroup[] = [
    {
      title: "Frontend Development",
      color: "bg-blue-500/10 text-blue-600 border-blue-200/50 hover:bg-blue-500/15",
      icon: <Code size={16} />,
      skills: ["Angular", "React", "TypeScript", "SCSS", "Bootstrap"]
    },
    {
      title: "Backend Services",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-200/50 hover:bg-emerald-500/15",
      icon: <Database size={16} />,
      skills: ["Node.js", "Express", "MongoDB"]
    },
    {
      title: "Healthcare Domain",
      color: "bg-rose-500/10 text-rose-600 border-rose-200/50 hover:bg-rose-500/15",
      icon: <HeartPulse size={16} />,
      skills: ["EHR", "Patient Portals", "Medical Workflows"]
    },
    {
      title: "AI & Speech Engines",
      color: "bg-purple-500/10 text-purple-600 border-purple-200/50 hover:bg-purple-500/15",
      icon: <Brain size={16} />,
      skills: ["OpenAI", "Whisper", "Voice Systems"]
    }
  ];

  const nodesRef = useRef<{ [key: string]: SkillNode }>({});
  const requestRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    const updatePhysics = () => {
      const repelRadius = 150;
      const repelStrength = 0.95;
      const springFactor = 0.085;
      const friction = 0.82;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      Object.values(nodesRef.current).forEach((node) => {
        if (!node.element) return;

        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.hypot(dx, dy);

        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius;
          node.vx += (dx / dist) * force * repelStrength;
          node.vy += (dy / dist) * force * repelStrength;
        }

        // Return force hook
        node.vx += (node.ox - node.x) * springFactor;
        node.vy += (node.oy - node.y) * springFactor;

        node.vx *= friction;
        node.vy *= friction;

        node.x += node.vx;
        node.y += node.vy;

        node.element.style.transform = `translate3d(${node.x - node.ox}px, ${node.y - node.oy}px, 0)`;
      });

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const registerNode = (name: string, element: HTMLDivElement | null) => {
    if (!element || nodesRef.current[name]) return;
    
    const rect = element.getBoundingClientRect();
    const parentRect = containerRef.current?.getBoundingClientRect();
    if (!parentRect) return;

    const x = rect.left - parentRect.left + rect.width / 2;
    const y = rect.top - parentRect.top + rect.height / 2;

    nodesRef.current[name] = {
      name,
      x,
      y,
      ox: x,
      oy: y,
      vx: 0,
      vy: 0,
      element
    };
  };

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="py-24 lg:py-32 bg-primaryBg relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accentColor/5 border border-accentColor/10 w-fit mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accentColor" />
            <span className="font-sans font-bold text-[10px] text-accentColor tracking-wider uppercase">Interactive Stack</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-geist font-black tracking-tight text-textPrimary leading-tight mb-4">
            Skills Cloud
          </h2>
          <p className="font-sans text-sm text-textSecondary font-medium max-w-lg mx-auto">
            Hover and move your cursor across the skill nodes to interact with Ghulam Asghar's technical competencies.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {skillGroups.map((group, groupIdx) => (
            <div 
              key={groupIdx} 
              onMouseEnter={() => setHoveredGroup(group.title)}
              onMouseLeave={() => setHoveredGroup(null)}
              className={`p-6 rounded-3xl border transition-all duration-500 flex flex-col justify-between h-[280px] shadow-soft ${
                hoveredGroup === group.title 
                  ? 'glass-panel-heavy border-accentColor/30 -translate-y-1' 
                  : 'glass-panel border-borderColor/60'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-white border border-borderColor flex items-center justify-center text-textPrimary shadow-sm">
                    {group.icon}
                  </div>
                  <h3 className="font-geist font-black text-sm text-textPrimary tracking-tight">
                    {group.title}
                  </h3>
                </div>
                <div className="w-full border-t border-borderColor/45 my-3" />
              </div>

              {/* Tag Cloud */}
              <div className="flex flex-wrap gap-2.5 items-end justify-start mt-2">
                {group.skills.map((skill) => (
                  <div 
                    key={skill}
                    ref={(el) => registerNode(skill, el)}
                    className={`clickable px-3.5 py-2 rounded-2xl border text-[11px] font-sans font-bold transition-all duration-200 shadow-sm hover:shadow-md ${group.color}`}
                    style={{ willChange: 'transform' }}
                  >
                    {skill}
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
