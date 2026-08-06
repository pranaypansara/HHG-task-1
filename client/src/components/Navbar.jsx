import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const handleScrollToGenerator = () => {
    const generatorSection = document.getElementById('generator-section');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-brand-green-darkest/80 border-b border-brand-green-medium/20 px-6 py-4 md:px-12 flex justify-between items-center"
    >
      <div className="flex items-center">
        <span className="font-serif text-2xl font-bold tracking-tight text-brand-yellow">
          HH Goa 2026
        </span>
      </div>

      <div className="hidden md:flex items-center space-x-8 font-mono text-sm tracking-widest text-emerald-500/80">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-brand-yellow transition-colors duration-200"
        >
          GitHub
        </a>
        <a 
          href="#" 
          className="hover:text-brand-yellow transition-colors duration-200"
        >
          HHG
        </a>
      </div>

      <div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScrollToGenerator}
          className="bg-brand-yellow hover:bg-brand-yellow-dark text-brand-green-darkest px-5 py-2 font-mono text-xs font-bold tracking-widest rounded-sm transition-colors duration-300"
        >
          CREATE CARD
        </motion.button>
      </div>
    </motion.nav>
  );
}
