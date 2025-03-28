'use client';

import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaMicrophone, FaCalendarAlt, FaMapMarkerAlt, FaTimes, FaPlay, FaPause, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

/**
 * TypeScript Interfaces and Type Definitions
 * -----------------------------------------
 * These interfaces provide type safety and better code documentation:
 * 
 * 1. TalkType: Defines the basic structure for a talk
 * 2. TalkWithImages: Extends TalkType to include the images array
 * 3. FeaturedDataType: Configuration for the featured section
 * 4. ApiResponse: Structure of the API response for image fetching
 */
interface TalkType {
  id: number;
  title: string;
  event: string;
  date: string;
  location: string;
  description: string;
  imageDir: string;
}

interface TalkWithImages extends TalkType {
  images: string[];  // Extends TalkType to include array of image paths
}

interface FeaturedDataType {
  imageDir: string;  // Directory path for featured images
}

interface ApiResponse {
  images: string[];  // Array of image paths returned from API
}

/**
 * Static Data Configuration
 * ------------------------
 * - talks: Array of talk data without images
 * - featuredConfig: Configuration for featured section
 * Note: Renamed from featuredData to featuredConfig to avoid confusion with API response
 */
const talks: TalkType[] = [
  {
    id: 1,
    title: "AI Agents and the Next Paradigm",
    event: "Deep Learning Indaba X 2024",
    date: "2024",
    location: "Zimbabwe",
    description: "Discussed the evolving landscape of AI agents and their potential to transform industries.",
    imageDir: "/talks/indaba"
  },
  {
    id: 2,
    title: "Building AI Agents for Productivity",
    event: "Google Developer Group",
    date: "2024",
    location: "Zimbabwe",
    description: "Explored how AI agents can enhance productivity across various domains.",
    imageDir: "/talks/gdg"
  },
  {
    id: 3,
    title: "The Future of AI in Africa",
    event: "Zimbabwe AI Week",
    date: "December 2024",
    location: "Harare",
    description: "Discussed opportunities and challenges for AI development in the African context.",
    imageDir: "/talks/ai-week"
  }
];

const featuredConfig: FeaturedDataType = {
  imageDir: "/talks/featured"
};

// Static talk data with images
const talksWithImages: TalkWithImages[] = [
  {
    id: 1,
    title: "AI Agents and the Next Paradigm",
    event: "Deep Learning Indaba X 2024",
    date: "2024",
    location: "Zimbabwe",
    description: "Discussed the evolving landscape of AI agents and their potential to transform industries.",
    imageDir: "/talks/indaba",
    images: [
      "/talks/indaba/1.jpg",
      "/talks/indaba/2.jpg"
    ]
  },
  {
    id: 2,
    title: "Building AI Agents for Productivity",
    event: "Google Developer Group",
    date: "2024",
    location: "Zimbabwe",
    description: "Explored how AI agents can enhance productivity across various domains.",
    imageDir: "/talks/gdg",
    images: [
      "/talks/gdg/1.jpg",
      "/talks/gdg/2.jpg"
    ]
  },
  {
    id: 3,
    title: "The Future of AI in Africa",
    event: "Zimbabwe AI Week",
    date: "December 2024",
    location: "Harare",
    description: "Discussed opportunities and challenges for AI development in the African context.",
    imageDir: "/talks/ai-week",
    images: [
      "/talks/ai-week/1.jpg",
      "/talks/ai-week/2.jpg"
    ]
  }
];

// Static featured images
const featuredImages = [
  "/talks/featured/1.jpg",
  "/talks/featured/2.jpg"
];

// Add this new component for the sparkle effect
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

export default function Talks() {
  /**
   * State Management
   * ---------------
   * Updated state definitions with proper TypeScript types for better type safety
   * and improved maintainability.
   */
  const [selectedImageIndex, setSelectedImageIndex] = useState<{talkId: number, imageIndex: number} | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<{talkId: number, imageIndex: number, src: string} | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTalkImages, setCurrentTalkImages] = useState<string[]>([]);
  const [featuredFullscreen, setFeaturedFullscreen] = useState<{imageIndex: number, src: string} | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [talksWithImages, setTalksWithImages] = useState<TalkWithImages[]>(
    talks.map(talk => ({ ...talk, images: [] }))
  );
  const [featuredImages, setFeaturedImages] = useState<string[]>([]);

  // Function to get next image index
  const getNextImageIndex = useCallback((currentIndex: number) => {
    return currentIndex + 1 >= currentTalkImages.length ? 0 : currentIndex + 1;
  }, [currentTalkImages]);

  // Function to get previous image index
  const getPrevImageIndex = useCallback((currentIndex: number) => {
    return currentIndex - 1 < 0 ? currentTalkImages.length - 1 : currentIndex - 1;
  }, [currentTalkImages]);

  // Handle slideshow
  useEffect(() => {
    let slideshowTimer: NodeJS.Timeout;

    if (isPlaying) {
      if (fullscreenImage) {
        slideshowTimer = setInterval(() => {
          const nextIndex = getNextImageIndex(fullscreenImage.imageIndex);
          setFullscreenImage(prev => prev ? {
            ...prev,
            imageIndex: nextIndex,
            src: currentTalkImages[nextIndex]
          } : null);
        }, 3000);
      } else if (featuredFullscreen) {
        slideshowTimer = setInterval(() => {
          const nextIndex = getNextImageIndex(featuredFullscreen.imageIndex);
          setFeaturedFullscreen({
            imageIndex: nextIndex,
            src: featuredImages[nextIndex]
          });
        }, 3000);
      }
    }

    return () => {
      if (slideshowTimer) {
        clearInterval(slideshowTimer);
      }
    };
  }, [isPlaying, fullscreenImage, featuredFullscreen, getNextImageIndex, currentTalkImages, featuredImages]);

  const handleImageClick = (talkId: number, imageIndex: number) => {
    setSelectedImageIndex(
      selectedImageIndex?.talkId === talkId && selectedImageIndex?.imageIndex === imageIndex
        ? null
        : { talkId, imageIndex }
    );
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        // Use static featured images
        setFeaturedImages([
          '/talks/featured/1.jpg',
          '/talks/featured/2.jpg'
        ]);

        // Use static talk images
        const updatedTalks = talks.map(talk => ({
          ...talk,
          images: [
            `${talk.imageDir}/1.jpg`,
            `${talk.imageDir}/2.jpg`
          ]
        }));

        setTalksWithImages(updatedTalks);
      } catch (error) {
        console.error('Error setting up images:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, []);

  /**
   * Fullscreen Image Handling
   * ------------------------
   * Updated to use talksWithImages instead of talks to access the images array.
   * This fixes the TypeScript error about missing 'images' property.
   */
  const openFullscreen = (talkId: number, imageIndex: number, src: string) => {
    const talk = talksWithImages.find(t => t.id === talkId);
    if (talk) {
      setCurrentTalkImages(talk.images);
      setFullscreenImage({ talkId, imageIndex, src });
      setIsPlaying(false);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    setIsPlaying(false);
    document.body.style.overflow = 'auto';
  };

  const handlePrevImage = () => {
    if (!fullscreenImage) return;
    const prevIndex = getPrevImageIndex(fullscreenImage.imageIndex);
    setFullscreenImage({
      ...fullscreenImage,
      imageIndex: prevIndex,
      src: currentTalkImages[prevIndex]
    });
  };

  const handleNextImage = () => {
    if (!fullscreenImage) return;
    const nextIndex = getNextImageIndex(fullscreenImage.imageIndex);
    setFullscreenImage({
      ...fullscreenImage,
      imageIndex: nextIndex,
      src: currentTalkImages[nextIndex]
    });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Add these new functions for featured image navigation
  const handleFeaturedPrevImage = () => {
    if (!featuredFullscreen) return;
    const prevIndex = getPrevImageIndex(featuredFullscreen.imageIndex);
    setFeaturedFullscreen({
      imageIndex: prevIndex,
      src: featuredImages[prevIndex]
    });
  };

  const handleFeaturedNextImage = () => {
    if (!featuredFullscreen) return;
    const nextIndex = getNextImageIndex(featuredFullscreen.imageIndex);
    setFeaturedFullscreen({
      imageIndex: nextIndex,
      src: featuredImages[nextIndex]
    });
  };

  return (
    <>
      <section id="talks" className="py-20 space-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
              Talks & Conferences
            </h2>
            <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Sharing knowledge and insights at tech events and conferences.
            </p>
          </motion.div>

          {/* Featured Images */}
          <div className="mb-16">
            <div className="grid grid-cols-2 gap-4 h-[400px]">
              {featuredImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group"
                  onClick={() => {
                    setFeaturedFullscreen({ imageIndex: index, src: image });
                    setCurrentTalkImages(featuredImages);
                    document.body.style.overflow = 'hidden';
                  }}
                >
                  <Image
                    src={image}
                    alt={`Featured talk ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                  
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
              ))}
            </div>
          </div>
          
          <div className="space-y-12">
            {talksWithImages.map((talk, talkIndex) => (
              <motion.div
                key={talk.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Talk Images Carousel */}
                  <div className="relative h-[300px] md:h-full">
                    <div className="grid grid-cols-2 gap-2 p-4 h-full">
                      {talk.images.slice(0, 2).map((image, imgIndex) => (
                        <motion.div 
                          key={imgIndex}
                          className={`relative rounded-lg overflow-hidden transition-all duration-300 ease-in-out cursor-pointer group ${
                            selectedImageIndex?.talkId === talk.id && selectedImageIndex?.imageIndex === imgIndex 
                              ? 'col-span-2 row-span-2 z-10' 
                              : ''
                          }`}
                          onClick={() => {
                            handleImageClick(talk.id, imgIndex);
                            openFullscreen(talk.id, imgIndex, image);
                          }}
                          layout
                          whileHover={{ scale: 1.02 }}
                        >
                          <Image
                            src={image}
                            alt={`${talk.title} - Image ${imgIndex + 1}`}
                            fill
                            className={`object-cover transition-all duration-500 ${
                              selectedImageIndex?.talkId === talk.id && selectedImageIndex?.imageIndex !== imgIndex
                                ? 'scale-95 opacity-50'
                                : selectedImageIndex?.talkId === talk.id && selectedImageIndex?.imageIndex === imgIndex
                                ? 'scale-105'
                                : ''
                            }`}
                          />
                          
                          {/* Glow Effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-xl" />
                            <div className="absolute inset-0 border-2 border-purple-500/50 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:shadow-[0_0_30px_rgba(147,51,234,0.7)] transition-shadow duration-300" />
                          </div>
                          
                          {/* Sparkle Effect */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Sparkle />
                          </div>

                          {/* View More Indicator */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm">
                            Click to expand
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Talk Content */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <FaMicrophone className="text-3xl text-indigo-400 mr-3" />
                      <h3 className="text-xl md:text-2xl font-semibold">
                        {talk.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap items-center text-gray-400 mb-4">
                      <div className="flex items-center mr-6 mb-2">
                        <FaCalendarAlt className="mr-2" />
                        <span>{talk.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{talk.location}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4 inline-block px-3 py-1 text-sm rounded-full bg-indigo-900/50 text-indigo-300">
                      {talk.event}
                    </div>
                    
                    <p className="text-gray-300">
                      {talk.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 text-center"
          >
            <p className="text-gray-300 mb-6">
              Interested in having me speak at your event?
            </p>
            <a 
              href="#connect" 
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-indigo-500/20"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={closeFullscreen}
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
                src={fullscreenImage.src}
                alt="Fullscreen view"
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
                onClick={closeFullscreen}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>

              {/* Image Counter and Instructions */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="text-white bg-black/50 px-4 py-2 rounded-lg">
                  {fullscreenImage.imageIndex + 1} / {currentTalkImages.length}
                </div>
                <div className="text-white bg-black/50 px-4 py-2 rounded-lg">
                  {isPlaying ? 'Click to pause' : 'Click to play slideshow'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Fullscreen Modal */}
      <AnimatePresence>
        {featuredFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={() => {
              setFeaturedFullscreen(null);
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
                src={featuredFullscreen.src}
                alt="Fullscreen view"
                fill
                className="object-contain rounded-lg"
                priority
              />
              
              {/* Navigation and Control Buttons */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 pointer-events-none">
                <button
                  onClick={handleFeaturedPrevImage}
                  className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors pointer-events-auto"
                >
                  <FaChevronLeft className="text-2xl" />
                </button>
                <button
                  onClick={handleFeaturedNextImage}
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
                  setFeaturedFullscreen(null);
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
                  {featuredFullscreen.imageIndex + 1} / {featuredImages.length}
                </div>
                <div className="text-white bg-black/50 px-4 py-2 rounded-lg">
                  {isPlaying ? 'Click to pause' : 'Click to play slideshow'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 