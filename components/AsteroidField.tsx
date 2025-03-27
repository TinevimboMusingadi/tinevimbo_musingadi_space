'use client';

import Asteroid from './Asteroid';

interface AsteroidFieldProps {
  count?: number;
  className?: string;
}

export default function AsteroidField({ count = 3, className = '' }: AsteroidFieldProps) {
  // Generate random delays between 0-10 seconds
  const getRandomDelay = () => Math.random() * 10;
  
  // Generate random duration between 15-30 seconds
  const getRandomDuration = () => Math.random() * 15 + 15;
  
  // Generate random size
  const getRandomSize = () => {
    const sizes = ['small', 'medium', 'large'] as const;
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  return (
    <div className={`relative ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Asteroid
          key={index}
          position="random"
          size={getRandomSize()}
          delay={getRandomDelay()}
          duration={getRandomDuration()}
        />
      ))}
    </div>
  );
} 