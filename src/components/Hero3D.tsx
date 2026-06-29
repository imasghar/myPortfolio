import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Heart, Mic, Plus } from 'lucide-react';

interface FloatingCardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  children: React.ReactNode;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ position, rotation, children }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Continuous floating animation
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(time + position[0] * 2) * 0.12;
    groupRef.current.rotation.x = rotation[0] + Math.sin(time * 0.4 + position[1]) * 0.04;
    groupRef.current.rotation.y = rotation[1] + Math.cos(time * 0.4 + position[2]) * 0.04;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <Html transform distanceFactor={5.5} portal={{ current: document.body }} sprite>
        <div className="w-[280px] select-none pointer-events-none">
          {children}
        </div>
      </Html>
    </group>
  );
};

const Scene: React.FC = () => {
  const containerRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.35;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.35;
      targetRotation.current = { x: y, y: x };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!containerRef.current) return;
    // Smooth lerp rotation towards mouse position
    containerRef.current.rotation.x += (targetRotation.current.x - containerRef.current.rotation.x) * 0.06;
    containerRef.current.rotation.y += (targetRotation.current.y - containerRef.current.rotation.y) * 0.06;
  });

  return (
    <group ref={containerRef}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />

      {/* Card 1: Cardiac Rhythm Vitals */}
      <FloatingCard position={[-1.3, 0.9, 0]} rotation={[0.04, 0.08, -0.04]}>
        <div className="glass-panel p-4 rounded-2xl shadow-glass border border-borderColor flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Heart size={14} className="fill-emerald-600" />
              </div>
              <span className="font-sans font-semibold text-xs text-textPrimary">Cardiac Rhythm</span>
            </div>
            <span className="text-[10px] text-emerald-500 font-bold px-1.5 py-0.5 rounded-full bg-emerald-50">Active</span>
          </div>
          <div>
            <div className="text-2xl font-geist font-black tracking-tight text-textPrimary flex items-baseline gap-1">
              72 <span className="text-xs font-normal text-textSecondary">BPM</span>
            </div>
            <p className="text-[10px] text-textSecondary mt-0.5">Normal Sinus Rhythm</p>
          </div>
          <div className="h-10 w-full flex items-end gap-[3px] mt-1">
            {[35, 45, 30, 65, 80, 55, 40, 75, 50, 60, 45, 70, 85, 40, 50].map((h, i) => (
              <div 
                key={i} 
                className="bg-accentColor/80 rounded-t-sm w-full transition-all duration-300"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </FloatingCard>

      {/* Card 2: Voice EHR Transcription */}
      <FloatingCard position={[1.4, 0.6, 0.6]} rotation={[-0.04, -0.12, 0.04]}>
        <div className="glass-panel p-4 rounded-2xl border border-borderColor flex flex-col gap-3 shadow-glass">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Mic size={14} />
            </div>
            <span className="font-sans font-semibold text-xs text-textPrimary">Whisper Voice EHR</span>
          </div>
          <div className="p-2.5 rounded-xl bg-primaryBg border border-borderColor text-[10px] text-textSecondary font-sans leading-relaxed">
            "Patient reports sharp pain in lower back, radiating to left hip. Prescribed physical therapy..."
          </div>
          <div className="flex items-center justify-between text-[9px] text-textSecondary border-t border-borderColor/50 pt-2">
            <span className="flex items-center gap-1 font-medium text-accentColor">
              <span className="w-1.5 h-1.5 rounded-full bg-accentColor animate-ping" />
              Transcribing Live
            </span>
            <span>98.7% Accuracy</span>
          </div>
        </div>
      </FloatingCard>

      {/* Card 3: Computer Vision Image Annotation */}
      <FloatingCard position={[-0.9, -1.0, 0.9]} rotation={[0.08, -0.04, -0.04]}>
        <div className="glass-panel p-3 rounded-2xl border border-borderColor shadow-glass flex flex-col gap-2">
          <span className="font-sans font-semibold text-[10px] text-textSecondary">Computer Vision Assessment</span>
          <div className="relative rounded-xl overflow-hidden border border-borderColor bg-slate-950 aspect-video flex items-center justify-center text-white">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="w-10 h-10 border-2 border-emerald-500 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            </div>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-500/90 text-[8px] font-bold text-white flex items-center gap-1 backdrop-blur-sm">
              <Plus size={8} /> Fracture Detected (L2)
            </div>
          </div>
          <div className="flex items-center justify-between text-[9px]">
            <span className="text-textSecondary">Confidence Index</span>
            <span className="font-bold text-emerald-500">99.2%</span>
          </div>
        </div>
      </FloatingCard>

      {/* Card 4: Patient Demographic and Vitals Summary */}
      <FloatingCard position={[1.1, -1.1, -0.4]} rotation={[-0.06, 0.06, 0.02]}>
        <div className="glass-panel p-4 rounded-2xl border border-borderColor shadow-glass flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 border border-borderColor flex items-center justify-center font-geist font-bold text-xs text-textPrimary">
              SR
            </div>
            <div>
              <h4 className="font-sans font-bold text-xs text-textPrimary">Sarah Ramirez</h4>
              <p className="text-[9px] text-textSecondary">ID: #482-902</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
            <div className="bg-primaryBg p-1.5 rounded-lg border border-borderColor">
              <span className="text-textSecondary text-[8px] block">TEMP</span>
              <span className="font-bold text-textPrimary">98.6°F</span>
            </div>
            <div className="bg-primaryBg p-1.5 rounded-lg border border-borderColor">
              <span className="text-textSecondary text-[8px] block">STATUS</span>
              <span className="font-bold text-emerald-500">Stable</span>
            </div>
          </div>
        </div>
      </FloatingCard>
    </group>
  );
};

export const Hero3D: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[480px] lg:h-[650px] relative">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-accentColor/5 blur-[80px]" />
        <div className="absolute w-[200px] h-[200px] rounded-full bg-secondaryAccent/5 blur-[60px]" />
      </div>
    </div>
  );
};
