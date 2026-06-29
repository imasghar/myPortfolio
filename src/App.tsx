import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Trust } from './components/Trust';
import { About } from './components/About';
import { Timeline } from './components/Timeline';
import { ProjectShowcase } from './components/ProjectShowcase';
import { SkillsCloud } from './components/SkillsCloud';
import { Process } from './components/Process';
import { Impact } from './components/Impact';
import { Contact } from './components/Contact';
import { CursorFollower } from './components/CursorFollower';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-primaryBg selection:bg-accentColor/10 selection:text-accentColor">
      <CursorFollower />
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <About />
        <Timeline />
        <ProjectShowcase />
        <SkillsCloud />
        <Process />
        <Impact />
        <Contact />
      </main>
    </div>
  );
}

export default App;
