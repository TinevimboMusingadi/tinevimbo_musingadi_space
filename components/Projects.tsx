'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaCode, FaRobot, FaWater, FaCloud, FaTimes, FaGithub, FaYoutube, FaExternalLinkAlt } from 'react-icons/fa';
import { SiPython, SiTensorflow, SiPytorch, SiReact, SiNextdotjs, SiOpenai } from 'react-icons/si';
import { getProjectContent, getAllProjects, optimizeImage } from '@/app/utils/contentManager';
import type { ProjectContent, Skill, IconName } from '@/types/project';
import { MDXRemote } from 'next-mdx-remote';
import { getProjects, getProjectById } from '@/app/utils/projects';
import projectsData from '@/public/content/projects/projects.json';

// Icon mapping
const iconMap: Record<IconName, React.ReactElement> = {
  SiPython: <SiPython className="text-2xl" />,
  SiTensorflow: <SiTensorflow className="text-2xl" />,
  SiPytorch: <SiPytorch className="text-2xl" />,
  SiReact: <SiReact className="text-2xl" />,
  SiNextdotjs: <SiNextdotjs className="text-2xl" />,
  SiOpenai: <SiOpenai className="text-2xl" />
};

// Categories
const categories = [
  { id: "all", label: "All Projects" },
  { id: "hybrid-engineering", label: "Hybrid Engineering" },
  { id: "applied-ml", label: "Applied ML & DL" },
  { id: "software-ai", label: "Software & AI Agents" },
  { id: "llm-agents", label: "LLM, ML & Agents" }
];

// Project Canvas Component
const ProjectCanvas = ({ 
  project, 
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious 
}: { 
  project: ProjectContent, 
  onClose: () => void,
  onNext: () => void,
  onPrevious: () => void,
  hasNext: boolean,
  hasPrevious: boolean
}) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const sections = [
    { id: 'overview', label: 'Overview', icon: <FaCode className="text-xl" /> },
    { id: 'details', label: 'Technical Details', icon: <FaRobot className="text-xl" /> },
    { id: 'gallery', label: 'Gallery', icon: <FaExternalLinkAlt className="text-xl" /> },
    { id: 'resources', label: 'Resources & Links', icon: <FaGithub className="text-xl" /> }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div 
              className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-indigo-400 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300 prose-hr:border-gray-700"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
            <style jsx global>{`
              .prose {
                max-width: none;
              }
              .prose h1 {
                font-size: 2.5rem;
                font-weight: 700;
                margin-top: 2rem;
                margin-bottom: 1.5rem;
                color: #fff;
                border-bottom: 2px solid #4f46e5;
                padding-bottom: 0.5rem;
              }
              .prose h2 {
                font-size: 2rem;
                font-weight: 600;
                margin-top: 1.75rem;
                margin-bottom: 1rem;
                color: #fff;
              }
              .prose h3 {
                font-size: 1.5rem;
                font-weight: 600;
                margin-top: 1.5rem;
                margin-bottom: 1rem;
                color: #fff;
              }
              .prose p {
                margin-top: 1rem;
                margin-bottom: 1rem;
                line-height: 1.7;
              }
              .prose img {
                border-radius: 0.75rem;
                margin: 2rem 0;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                transition: transform 0.3s ease;
              }
              .prose img:hover {
                transform: scale(1.02);
              }
              .prose video {
                border-radius: 0.75rem;
                margin: 2rem 0;
                width: 100%;
                max-width: 800px;
                margin-left: auto;
                margin-right: auto;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              }
              .prose iframe {
                border-radius: 0.75rem;
                margin: 2rem 0;
                width: 100%;
                aspect-ratio: 16/9;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              }
              .prose pre {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 0.75rem;
                padding: 1.5rem;
                overflow-x: auto;
                margin: 2rem 0;
              }
              .prose code {
                background: rgba(0, 0, 0, 0.2);
                padding: 0.2rem 0.4rem;
                border-radius: 0.25rem;
                font-size: 0.875em;
                color: #e5e7eb;
              }
              .prose ul, .prose ol {
                margin-top: 1rem;
                margin-bottom: 1rem;
                padding-left: 1.5rem;
              }
              .prose li {
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
              }
              .prose blockquote {
                border-left: 4px solid #4f46e5;
                margin: 2rem 0;
                padding-left: 1rem;
                color: #e5e7eb;
                font-style: italic;
              }
              .prose hr {
                border-color: #374151;
                margin: 2rem 0;
              }
              .prose table {
                width: 100%;
                margin: 2rem 0;
                border-collapse: collapse;
              }
              .prose th, .prose td {
                padding: 0.75rem;
                border: 1px solid #374151;
                text-align: left;
              }
              .prose th {
                background: rgba(79, 70, 229, 0.1);
                font-weight: 600;
              }
            `}</style>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-indigo-400">Technical Challenges</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  {project.details?.challenges?.map((challenge: string, index: number) => (
                    <li key={index} className="leading-relaxed">{challenge}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-indigo-400">Key Learnings</h3>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  {project.details?.learnings?.map((learning: string, index: number) => (
                    <li key={index} className="leading-relaxed">{learning}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Technologies Used</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.skills?.map((skill: Skill, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-indigo-900/30 hover:bg-indigo-900/50 transition-colors"
                  >
                    {iconMap[skill.iconName as IconName] || skill.icon}
                    <span className="text-indigo-200">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.galleryImages?.map((image: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={optimizeImage(image, { width: 400, height: 225 })}
                    alt={`${project.title} gallery ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaExternalLinkAlt className="text-white text-2xl" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fullscreen Image View */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center"
                  onClick={() => setSelectedImage(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    className="relative w-[90vw] h-[90vh]"
                  >
                    <Image
                      src={optimizeImage(selectedImage, { quality: 90 })}
                      alt="Fullscreen view"
                      fill
                      className="object-contain"
                    />
                    <button
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                      }}
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'resources':
        return (
          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6 text-indigo-400">Project Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all transform hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                      <FaGithub className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Source Code</h4>
                      <p className="text-sm text-gray-400">View project repository</p>
                    </div>
                  </a>
                )}
                {project.links?.youtube && (
                  <a
                    href={project.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-red-900/30 hover:bg-red-900/50 transition-all transform hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-900/50 flex items-center justify-center">
                      <FaYoutube className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Project Overview</h4>
                      <p className="text-sm text-gray-400">Watch project overview</p>
                    </div>
                  </a>
                )}
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-red-900/30 hover:bg-red-900/50 transition-all transform hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-900/50 flex items-center justify-center">
                      <FaYoutube className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Demo Video</h4>
                      <p className="text-sm text-gray-400">Watch project demonstration</p>
                    </div>
                  </a>
                )}
                {project.links?.documentation && (
                  <a
                    href={project.links.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-indigo-900/30 hover:bg-indigo-900/50 transition-all transform hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-full bg-indigo-900/50 flex items-center justify-center">
                      <FaExternalLinkAlt className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold">MIT Solve</h4>
                      <p className="text-sm text-gray-400">View project details</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md"
    >
      <div className="min-h-screen px-4 py-8">
        <div className="relative max-w-6xl mx-auto bg-gray-900/90 rounded-2xl overflow-hidden shadow-2xl">
          {/* Project Navigation */}
          <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
            <button
              onClick={onPrevious}
              className={`p-2 rounded-full ${
                hasPrevious 
                  ? 'bg-black/50 hover:bg-black/70 text-white' 
                  : 'bg-black/30 text-gray-500 cursor-not-allowed'
              } transition-colors`}
              disabled={!hasPrevious}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            <button
              onClick={onNext}
              className={`p-2 rounded-full ${
                hasNext 
                  ? 'bg-black/50 hover:bg-black/70 text-white' 
                  : 'bg-black/30 text-gray-500 cursor-not-allowed'
              } transition-colors`}
              disabled={!hasNext}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Featured Image */}
          <div className="h-[400px] relative">
            <Image
              src={optimizeImage(project.image, { width: 1200, height: 400 })}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/30" />
            
            {/* Project Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900">
              <div className="flex items-center gap-3 text-sm text-indigo-400 mb-2">
                {project.icon}
                <span>{categories.find(c => c.id === project.category)?.label}</span>
              </div>
              <h2 className="text-4xl font-bold text-white">{project.title}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Section Navigation */}
            <div className="flex flex-wrap gap-4 mb-8">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    activeSection === section.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  {section.icon}
                  {section.label}
                </button>
              ))}
            </div>

            {/* Section Content */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState<ProjectContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<ProjectContent | null>(null);
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Convert the static projects data to the required format
        const allProjects = Object.entries(projectsData).map(([id, project]: [string, any]) => ({
          ...project,
          id,
          icon: React.createElement(
            project.icon === 'FaWater' ? FaWater :
            project.icon === 'FaCloud' ? FaCloud :
            project.icon === 'FaRobot' ? FaRobot :
            FaCode,
            { className: "text-2xl" }
          )
        }));
        
        if (allProjects.length === 0) {
          setError("No projects found");
        }
        setProjects(allProjects);
      } catch (err) {
        console.error("Error loading projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, []);
  
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  const currentProjectIndex = selectedProject 
    ? filteredProjects.findIndex(p => p.id === selectedProject.id)
    : -1;

  const handleNextProject = () => {
    if (currentProjectIndex < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[currentProjectIndex + 1]);
    }
  };

  const handlePreviousProject = () => {
    if (currentProjectIndex > 0) {
      setSelectedProject(filteredProjects[currentProjectIndex - 1]);
    }
  };
  
  return (
    <>
    <section id="projects" className="py-20 space-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
            Projects
          </h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Exploring the intersection of AI, science, and engineering to solve complex problems.
          </p>
        </motion.div>
        
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              <p className="mt-4 text-gray-400">Loading projects...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-all ${
                activeCategory === category.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-indigo-500/10 transition-all hover:-translate-y-2"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gray-800 animate-pulse" /> {/* Loading placeholder */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  {project.icon}
                  <h3 className="text-xl font-semibold ml-2">{project.title}</h3>
                </div>
                      <p className="text-gray-300 mb-6">{project.description}</p>
                
                      <button 
                        onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center text-indigo-400 hover:text-indigo-300"
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                      </button>
              </div>
            </motion.div>
          ))}
        </div>
            </>
          )}
      </div>
    </section>

      {/* Project Canvas Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectCanvas 
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNext={handleNextProject}
            onPrevious={handlePreviousProject}
            hasNext={currentProjectIndex < filteredProjects.length - 1}
            hasPrevious={currentProjectIndex > 0}
          />
        )}
      </AnimatePresence>
    </>
  );
} 