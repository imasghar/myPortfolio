import React from 'react';
import { Activity, Code, Cpu, Database, Flame, GitBranch, Shield, Zap } from 'lucide-react';

export const Trust: React.FC = () => {
  const items = [
    { name: 'Angular', icon: <Flame size={16} className="text-red-500" /> },
    { name: 'React', icon: <Zap size={16} className="text-blue-500" /> },
    { name: 'Node.js', icon: <Code size={16} className="text-green-500" /> },
    { name: 'OpenAI', icon: <Cpu size={16} className="text-purple-500" /> },
    { name: 'Bootstrap', icon: <Code size={16} className="text-indigo-500" /> },
    { name: 'SCSS', icon: <Code size={16} className="text-pink-500" /> },
    { name: 'MongoDB', icon: <Database size={16} className="text-emerald-500" /> },
    { name: 'Healthcare', icon: <Activity size={16} className="text-rose-500" /> },
    { name: 'EHR', icon: <Shield size={16} className="text-accentColor" /> },
    { name: 'AI', icon: <Cpu size={16} className="text-sky-500" /> },
    { name: 'TypeScript', icon: <Code size={16} className="text-blue-600" /> },
    { name: 'GitHub', icon: <GitBranch size={16} className="text-slate-800" /> },
  ];

  return (
    <section className="py-10 border-y border-borderColor bg-secondarySurface overflow-hidden select-none">
      <div className="relative flex overflow-x-hidden">
        {/* Continuous scrolling marquee lists */}
        <div className="animate-marquee flex gap-16 items-center">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3 font-sans font-semibold text-textSecondary text-sm md:text-base">
              <div className="opacity-85">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <div className="animate-marquee flex gap-16 items-center" aria-hidden="true">
          {items.map((item, index) => (
            <div key={`dup-${index}`} className="flex items-center gap-3 font-sans font-semibold text-textSecondary text-sm md:text-base">
              <div className="opacity-85">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Soft edge gradient fades */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-primaryBg to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-primaryBg to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
