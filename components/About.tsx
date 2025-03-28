'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlay, FaPause, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

// Static profile images
const profileImages = [
  '/profile/1.jpg',
  '/profile/2.jpg',
  '/profile/3.jpg',
  '/profile/4.jpg',
  '/profile/20230515_122219.jpg'
];

// Add the Sparkle component
const Sparkle = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: [0, 1, 0.8, 1, 0],
      opacity: [0, 1, 0.8, 1, 0],
      rotate: [0, 90, 180, 270, 360]
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      repeatDelay: 1
    }}
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-lg transform scale-150 opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur-md" />
  </motion.div>
);

export default function About() {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [profileImages, setProfileImages] = useState<string[]>(['/profile/default.jpg']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Use static profile images
        const images = [
          '/profile/1.jpg',
          '/profile/2.jpg',
          '/profile/3.jpg',
          '/profile/4.jpg',
          '/profile/20230515_122219.jpg'
        ];
        setProfileImages(images);
      } catch (error) {
        console.error('Error setting up profile images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Function to get next image index
  const getNextImageIndex = useCallback((currentIndex: number) => {
    return currentIndex + 1 >= profileImages.length ? 0 : currentIndex + 1;
  }, [profileImages.length]);

  // Function to get previous image index
  const getPrevImageIndex = useCallback((currentIndex: number) => {
    return currentIndex - 1 < 0 ? profileImages.length - 1 : currentIndex - 1;
  }, [profileImages.length]);

  // Handle slideshow
  useEffect(() => {
    let slideshowTimer: NodeJS.Timeout;

    if (isPlaying && fullscreenImage) {
      slideshowTimer = setInterval(() => {
        const nextIndex = getNextImageIndex(profileImages.indexOf(fullscreenImage));
        setFullscreenImage(profileImages[nextIndex]);
      }, 3000);
    }

    return () => {
      if (slideshowTimer) {
        clearInterval(slideshowTimer);
      }
    };
  }, [isPlaying, fullscreenImage, getNextImageIndex]);

  const handlePrevImage = () => {
    if (!fullscreenImage) return;
    const prevIndex = getPrevImageIndex(profileImages.indexOf(fullscreenImage));
    setFullscreenImage(profileImages[prevIndex]);
  };

  const handleNextImage = () => {
    if (!fullscreenImage) return;
    const nextIndex = getNextImageIndex(profileImages.indexOf(fullscreenImage));
    setFullscreenImage(profileImages[nextIndex]);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="about" className="py-20 space-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
            About Me
          </h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <motion.div 
                className="relative h-96 w-full overflow-hidden rounded-2xl shadow-2xl shadow-indigo-500/20 cursor-pointer group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setFullscreenImage(profileImages[0]);
                  document.body.style.overflow = 'hidden';
                }}
              >
                <Image
                  src={isLoading ? '/profile/default.jpg' : profileImages[0]}
                  alt="Tinevimbo Musingadi"
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                    isLoading ? 'animate-pulse' : ''
                  }`}
                  priority
                />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-xl" />
                  <div className="absolute inset-0 border-2 border-purple-500/50 rounded-2xl shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:shadow-[0_0_30px_rgba(147,51,234,0.7)] transition-shadow duration-300" />
                </div>
                
                {/* Sparkle Effect */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkle />
                </div>

                {/* View More Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm">
                  Click to view more
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Hi, I'm King Tine, an aspiring ML engineer from Zimbabwe! I am an incoming freshman studying Computer Science at HIT. Right now, I'm on a gap year after high school, focusing on learning AI, advanced programming topics, and mathematics.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                My goal is to build models that tackle some of the greatest challenges in science. Big ambitions, indeed! But I've been making some progress!
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4 text-indigo-300">Interests and Research</h3>
              <p className="text-lg leading-relaxed mb-4">
                As I prepare for college, I've developed a keen interest in areas like:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Mechanistic Interpretability</li>
                <li>Neuro-Symbolic Reasoning</li>
                <li>Reinforcement Learning</li>
                <li>Active Inference</li>
                <li>Physics informed Neural Networks</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-8 mb-4 text-indigo-300">Current Projects</h3>
              <p className="text-lg leading-relaxed">
                On the engineering side, I've been busy developing Vector Notebook, a data science agentic tool. Here, I'm exploring the applications of Large Language Models (LLMs) to create agents that can perform modeling, machine learning, and data science tasks. While I acknowledge that this is an ambitious dream and a learning experience, it's been an exciting journey.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Check out <a href="http://type1ai.co" className="text-indigo-400 hover:text-indigo-300 underline" target="_blank" rel="noopener noreferrer">Latentia.co.zw</a> my AI startup to follow my progress!
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={() => {
              setFullscreenImage(null);
              setIsPlaying(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[90vh] max-w-7xl mx-auto"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={fullscreenImage}
                alt="Profile view"
                fill
                className="object-contain rounded-lg"
                priority
              />
              
              {/* Navigation and Control Buttons */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 pointer-events-none">
                <button
                  onClick={handlePrevImage}
                  className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors pointer-events-auto"
                >
                  <FaChevronLeft className="text-2xl" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors pointer-events-auto"
                >
                  <FaChevronRight className="text-2xl" />
                </button>
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all transform hover:scale-110"
              >
                {isPlaying ? (
                  <FaPause className="text-4xl" />
                ) : (
                  <FaPlay className="text-4xl" />
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  setFullscreenImage(null);
                  setIsPlaying(false);
                  document.body.style.overflow = 'auto';
                }}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>

              {/* Image Counter and Instructions */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="text-white bg-black/50 px-4 py-2 rounded-lg">
                  {profileImages.indexOf(fullscreenImage) + 1} / {profileImages.length}
                </div>
                <div className="text-white bg-black/50 px-4 py-2 rounded-lg">
                  {isPlaying ? 'Click to pause' : 'Click to play slideshow'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 