'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  // We're always using dark mode for the space theme, this is mostly for aesthetics
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Animation for the toggle button
  const variants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 180 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-800/70 backdrop-blur-sm border border-gray-700 text-gray-300 hover:text-white shadow-lg hover:shadow-indigo-500/20"
      whileHover={variants.whileHover}
      whileTap={variants.whileTap}
      initial={variants.initial}
      animate={variants.animate}
      transition={{ duration: 0.3 }}
    >
      {isDark ? (
        <FaMoon className="w-5 h-5" />
      ) : (
        <FaSun className="w-5 h-5" />
      )}
    </motion.button>
  );
} 