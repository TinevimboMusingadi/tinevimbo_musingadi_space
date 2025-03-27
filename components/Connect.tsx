'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaTwitter, FaGithub, FaFacebook } from 'react-icons/fa';

const socialLinks = [
  {
    id: 1,
    name: 'Email',
    icon: <FaEnvelope className="text-2xl" />,
    url: 'mailto:tine2musi1@gmail.com',
    color: 'hover:text-red-400',
  },
  {
    id: 2,
    name: 'LinkedIn',
    icon: <FaLinkedin className="text-2xl" />,
    url: 'www.linkedin.com/in/kingtine',
    color: 'hover:text-blue-500',
  },
  {
    id: 3,
    name: 'Twitter',
    icon: <FaTwitter className="text-2xl" />,
    url: 'https://x.com/king_tine11',
    color: 'hover:text-sky-400',
  },
  {
    id: 4,
    name: 'GitHub',
    icon: <FaGithub className="text-2xl" />,
    url: 'https://github.com/TinevimboMusingadi',
    color: 'hover:text-gray-300',
  },
  {
    id: 5,
    name: 'Facebook',
    icon: <FaFacebook className="text-2xl" />,
    url: 'https://facebook.com/tinevimbo.musingadi',
    color: 'hover:text-blue-600',
  },
];

export default function Connect() {
  return (
    <section id="connect" className="py-20 space-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
            Let's Connect
          </h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Interested in collaborating, learning more about my work, or just saying hi?
            Feel free to reach out through any of these channels.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-4xl mx-auto"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-all ${link.color} text-gray-300`}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              custom={index}
            >
              <div className="mb-3">
                {link.icon}
              </div>
              <span>{link.name}</span>
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 text-center"
        >
          <div className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-xl max-w-2xl mx-auto border border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-indigo-300">Let's Work Together</h3>
            <p className="text-gray-300 mb-6">
              Whether you're looking for a machine learning enthusiast, researcher, or collaborator, 
              I'm always open to exciting new opportunities and projects.
            </p>
            <a 
              href="mailto:tine2musi1@gmail.com" 
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-indigo-500/20"
            >
              Send Me a Message
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 