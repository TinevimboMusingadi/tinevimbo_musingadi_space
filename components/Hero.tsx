'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SiPython } from 'react-icons/si';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center pt-20 pb-10 px-4 space-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600">
          Tinevimbo Musingadi
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-300 mb-2">
          King Tine
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          Inventor, Incoming Computer Science Student @ Harare Institute of Technology
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12 max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl text-indigo-300 font-medium">
            Building models to solve the greatest problems in Science with Cutting edge Algorithms and ML
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a 
            href="#projects" 
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-indigo-500/20"
          >
            View My Projects
          </a>
        </motion.div>
      </motion.div>
      
      <div className="relative w-full max-w-7xl mt-16 md:mt-24">
        {/* Floating astronaut or planet can be added here */}
        <motion.div 
          className="absolute hidden md:block"
          style={{ right: '10%', top: '-50px' }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8, 
            ease: "easeInOut"
          }}
        >
          <div className="relative w-32 h-32">
            <Image
              src="/planet.png"
              alt="Space planet"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 