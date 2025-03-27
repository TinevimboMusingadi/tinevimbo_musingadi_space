'use client';

import { motion } from 'framer-motion';
import { FaBrain, FaRobot, FaAtom, FaChartLine, FaNetworkWired } from 'react-icons/fa';

const researchAreas = [
  {
    id: 1,
    title: "Mechanistic Interpretability",
    icon: <FaBrain className="text-3xl text-purple-400" />,
    description: "Exploring the inner workings of neural networks to understand how they process information and make decisions."
  },
  {
    id: 2,
    title: "Neuro-Symbolic Reasoning",
    icon: <FaNetworkWired className="text-3xl text-blue-400" />,
    description: "Combining neural networks with symbolic reasoning to create more robust and interpretable AI systems."
  },
  {
    id: 3,
    title: "Reinforcement Learning",
    icon: <FaRobot className="text-3xl text-green-400" />,
    description: "Developing agents that learn optimal behaviors through interaction with their environment."
  },
  {
    id: 4,
    title: "Active Inference",
    icon: <FaChartLine className="text-3xl text-orange-400" />,
    description: "Investigating frameworks where agents actively sample their environment to minimize surprise and uncertainty."
  },
  {
    id: 5,
    title: "Physics Informed Neural Networks",
    icon: <FaAtom className="text-3xl text-cyan-400" />,
    description: "Building neural networks that respect physical laws and constraints for scientific applications."
  }
];

export default function Research() {
  return (
    <section id="research" className="py-20 space-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
            Research Interests
          </h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Areas I'm passionate about exploring as I prepare for my academic journey.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10 }}
              className="bg-gray-900/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 bg-gray-800/50 p-4 rounded-full">
                  {area.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-300">
                  {area.description}
                </p>
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
          <a 
            href="#projects" 
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-indigo-500/20"
          >
            See Related Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
} 