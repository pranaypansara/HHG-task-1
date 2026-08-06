import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import FormSection from './FormSection';
import BuilderCard from './BuilderCard';
import ActionButtons from './ActionButtons';

export default function BuilderGenerator() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [college, setCollege] = useState('');
  const [status, setStatus] = useState('Shipping Code');
  const [image, setImage] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const cardRef = useRef(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    setIsDownloading(true);
    try {
      // Add slight delay to make sure HMR/rendering is completely idle
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // Retains high quality print resolution
        style: {
          transform: 'scale(1)',
          borderRadius: '0px', // Standard output look
        }
      });
      
      const link = document.createElement('a');
      const filename = `${name.trim() ? name.trim().toLowerCase().replace(/\s+/g, '_') : 'builder'}_hh_goa_card.png`;
      link.download = filename;
      link.href = dataUrl;
      link.click();

      // Trigger premium celebration confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fcd34d', '#10b981', '#063c27', '#ffffff']
      });
    } catch (error) {
      console.error('Error generating card image:', error);
      alert('Failed to generate card image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    const defaultText = `Just generated my official digital credential for HH Goa 2026! 🚀\n\nRole: ${role || 'Builder'}\nStatus: ${status}\n\nGenerate yours now!`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(defaultText)}`;
    window.open(shareUrl, '_blank', 'width=550,height=420');
  };

  return (
    <section 
      id="generator-section"
      className="w-full grid grid-cols-1 lg:grid-cols-2 border-t border-brand-green-medium/20"
    >
      {/* Left Column: Form Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="px-6 py-16 md:px-12 lg:px-20 bg-brand-green-darkest flex flex-col justify-start"
      >
        <div className="max-w-lg w-full">
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-white mb-8 uppercase tracking-wide">
            Create Your Builder Card
          </h2>
          
          <FormSection 
            name={name} setName={setName}
            role={role} setRole={setRole}
            college={college} setCollege={setCollege}
            status={status} setStatus={setStatus}
            image={image} setImage={setImage}
          />
        </div>
      </motion.div>

      {/* Right Column: Live Card Preview & Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative px-6 py-16 md:px-12 lg:px-20 bg-brand-green-dark flex flex-col items-center justify-center border-l border-brand-green-medium/10 min-h-[550px] lg:min-h-0"
      >
        {/* Output View Monospace Tag */}
        <div className="absolute right-6 top-6 pointer-events-none">
          <span className="font-mono text-[10px] font-bold tracking-widest text-emerald-500/50 uppercase">
            OUTPUT_VIEW
          </span>
        </div>

        {/* Live Preview Card Wrapper */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="transform scale-95 sm:scale-100 hover:scale-[1.01] transition-transform duration-300">
            <BuilderCard 
              name={name} 
              role={role} 
              college={college} 
              status={status} 
              image={image}
              variant="generator"
            />
          </div>

          {/* Under-card hidden capture target with fixed scaling for html-to-image */}
          <div className="absolute left-[-9999px] top-[-9999px]">
            <BuilderCard 
              cardRef={cardRef}
              name={name} 
              role={role} 
              college={college} 
              status={status} 
              image={image}
              variant="generator"
            />
          </div>

          <ActionButtons 
            onDownload={handleDownload} 
            onShare={handleShare}
            isDownloading={isDownloading}
          />
        </div>
      </motion.div>
    </section>
  );
}
