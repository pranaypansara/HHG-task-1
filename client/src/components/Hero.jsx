import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BuilderCard from './BuilderCard';
import alexChenAvatar from '../assets/images/alex_chen_avatar.png';

export default function Hero() {
  const handleScrollToGenerator = () => {
    const generatorSection = document.getElementById('generator-section');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-73px)] w-full grid grid-cols-1 lg:grid-cols-2">
      {/* Left Column: Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24 bg-brand-green-darkest border-r border-brand-green-medium/10"
      >
        <div className="max-w-xl">
          <span className="font-mono text-xs font-bold tracking-widest text-emerald-500/80 uppercase">
            IDENTITY MODULE
          </span>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none mt-6 mb-8 uppercase tracking-tight">
            BUILD YOUR <br />
            <span className="italic text-brand-yellow font-bold">HH GOA</span> <br />
            BUILDER CARD
          </h1>

          <p className="text-gray-400 font-sans text-base md:text-lg leading-relaxed mb-10 max-w-md">
            Generate your official digital credential for the builder ecosystem. Instant, personalized, and designed to share.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToGenerator}
            className="flex items-center space-x-3 bg-brand-yellow hover:bg-brand-yellow-dark text-brand-green-darkest px-6 py-4 font-mono text-xs font-bold tracking-widest rounded-sm shadow-lg shadow-brand-yellow/10 transition-colors duration-300 group"
          >
            <span>GENERATE YOURS</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>
      </motion.div>

      {/* Right Column: Visual Preview */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="relative flex items-center justify-center p-8 bg-brand-green-dark overflow-hidden min-h-[450px] lg:min-h-0"
      >
        {/* Decorative Grid Lines in Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-emerald-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-emerald-500 rounded-full"></div>
        </div>

        {/* Vertical Monospace Text Code */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 pointer-events-none">
          <span 
            className="font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] text-emerald-500/40 uppercase whitespace-nowrap block"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            GEN-01 // TO-H3D
          </span>
        </div>

        {/* Card Container */}
        <motion.div 
          whileHover={{ 
            y: -10, 
            rotateY: 5,
            rotateX: -5,
            scale: 1.02
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative z-10 cursor-grab active:cursor-grabbing"
          style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        >
          <BuilderCard 
            name="Alex Chen" 
            builderTitle="PIXEL ARCHITECT"
            role="FULL STACK DEVELOPER" 
            college="ABCD UNIVERSITY" 
            status="STILL SHIPPING" 
            image={alexChenAvatar}
            variant="hero"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
