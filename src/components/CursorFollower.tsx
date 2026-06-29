import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const CursorFollower: React.FC = () => {
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch screens
    if (window.matchMedia('(hover: none)').matches) {
      return;
    }

    const follower = followerRef.current;
    if (!follower) return;

    // Set initial position out of view
    gsap.set(follower, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target or parent is clickable
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.clickable') ||
        target.classList.contains('clickable');

      if (isClickable) {
        follower.classList.add('hovering');
      } else {
        follower.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return <div ref={followerRef} className="cursor-follower" />;
};
