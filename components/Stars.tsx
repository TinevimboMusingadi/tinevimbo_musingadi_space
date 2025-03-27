'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function Stars() {
  const starsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!starsRef.current) return;
    
    const container = starsRef.current;
    const stars: Star[] = [];
    const starCount = Math.floor(window.innerWidth * window.innerHeight / 1500);
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2;
      const opacity = Math.random() * 0.8 + 0.2;
      
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.opacity = `${opacity}`;
      
      container.appendChild(star);
      
      stars.push({
        x: parseFloat(star.style.left),
        y: parseFloat(star.style.top),
        size,
        opacity,
        speed: Math.random() * 0.05 + 0.01
      });
    }
    
    // Twinkle stars
    const twinkleInterval = setInterval(() => {
      const starsElements = container.querySelectorAll('.star');
      starsElements.forEach((starEl) => {
        if (Math.random() > 0.99) {
          const currentOpacity = parseFloat((starEl as HTMLElement).style.opacity);
          const newOpacity = currentOpacity > 0.5 ? Math.random() * 0.3 + 0.1 : Math.random() * 0.8 + 0.2;
          (starEl as HTMLElement).style.opacity = `${newOpacity}`;
        }
      });
    }, 100);
    
    return () => {
      clearInterval(twinkleInterval);
    };
  }, []);
  
  return <div ref={starsRef} className="fixed inset-0 -z-10 overflow-hidden" />;
} 