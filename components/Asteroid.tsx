'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AsteroidProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'random';
  size?: 'small' | 'medium' | 'large';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function Asteroid({
  position = 'random',
  size = 'medium',
  delay = 0,
  duration = 20,
  className = '',
}: AsteroidProps) {
  // Update to use 5 asteroids instead of 7
  const [asteroidImage, setAsteroidImage] = useState('/asteroid/1.png');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Determine size in pixels
  const sizeMap = {
    small: 60,
    medium: 100,
    large: 150
  };
  
  const pixelSize = sizeMap[size];
  
  // Update random number generation for 5 asteroids
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    setAsteroidImage(`/asteroid/${randomNumber}.png`);
  }, []);
  
  // Generate random position if 'random'
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    if (position === 'random') {
      container.style.top = `${Math.random() * 80 + 10}%`;
      container.style.left = `${Math.random() * 80 + 10}%`;
    } else {
      // Set position based on prop
      if (position.includes('top')) {
        container.style.top = '10%';
      } else {
        container.style.top = '70%';
      }
      
      if (position.includes('left')) {
        container.style.left = '10%';
      } else {
        container.style.left = '80%';
      }
    }
  }, [position]);
  
  // Custom animation variants
  const variants = {
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`asteroid absolute ${className}`}
      style={{ zIndex: -5 }}
    >
      <motion.div
        variants={variants}
        animate="rotate"
        className="relative"
        style={{ width: pixelSize, height: pixelSize }}
      >
        <Image
          src={asteroidImage}
          alt="Asteroid"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </div>
  );
} 