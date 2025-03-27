'use client';

import React from 'react';
import Stars from '@/components/Stars';
import Asteroid from '@/components/Asteroid';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Research from '@/components/Research';
import Talks from '@/components/Talks';
import Connect from '@/components/Connect';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Asteroid3D from '@/components/Asteroid3D';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Space Background */}
      <Stars />
      
      {/* Floating Asteroids */}
      <Asteroid position="top-right" size="small" delay={1} />
      <Asteroid position="bottom-left" size="medium" delay={2} />
      <Asteroid position="random" size="large" delay={3} />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        
        <About />
        
        <div className="relative overflow-hidden">
          <Projects />
          <Asteroid position="top-left" size="medium" className="hidden lg:block" />
        </div>
        
        <div className="relative overflow-hidden">
          <Research />
          <div className="absolute right-0 top-20 z-0 opacity-80 hidden lg:block">
            <Asteroid3D className="w-64 h-64" />
          </div>
        </div>
        
        <Talks />
        
        <Connect />
        
        <Footer />
      </div>
    </main>
  );
}
