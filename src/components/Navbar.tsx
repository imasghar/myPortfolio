import React, { useEffect, useState } from 'react';
import { Magnetic } from './Magnetic';
import { Activity, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-4 glass-panel-heavy border-b border-borderColor shadow-soft' 
        : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Magnetic range={40} strength={0.25}>
          <a href="#" className="flex items-center gap-2 group clickable">
            <div className="w-8 h-8 rounded-lg bg-accentColor flex items-center justify-center text-white shadow-md shadow-accentColor/20 group-hover:scale-105 transition-transform duration-300">
              <Activity size={18} className="animate-pulse" />
            </div>
            <span className="font-geist font-bold tracking-tight text-textPrimary text-lg">
              Asghar<span className="text-accentColor">.hc</span>
            </span>
          </a>
        </Magnetic>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Magnetic key={link.name} range={30} strength={0.2}>
              <a 
                href={link.href} 
                className="font-sans font-medium text-sm text-textSecondary hover:text-accentColor transition-colors duration-200 clickable"
              >
                {link.name}
              </a>
            </Magnetic>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Magnetic range={40} strength={0.3}>
            <a 
              href="#contact" 
              className="px-5 py-2.5 rounded-full bg-accentColor text-white font-sans font-semibold text-sm shadow-md hover:bg-accentColor/95 hover:shadow-lg hover:shadow-accentColor/10 transition-all duration-200 clickable"
            >
              Schedule a Call
            </a>
          </Magnetic>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-textPrimary hover:text-accentColor transition-colors duration-200 clickable"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-primaryBg/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 px-6 py-12 transition-all duration-300 border-t border-borderColor">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="font-geist font-bold text-2xl text-textSecondary hover:text-accentColor transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="w-full max-w-xs text-center px-6 py-4 rounded-full bg-accentColor text-white font-sans font-semibold text-lg shadow-md"
          >
            Schedule a Call
          </a>
        </div>
      )}
    </nav>
  );
};
