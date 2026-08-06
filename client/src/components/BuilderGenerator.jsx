import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import FormSection from './FormSection';
import BuilderCard from './BuilderCard';
import ActionButtons from './ActionButtons';
import { generateCard, downloadCardImage, openShareOnX } from '../utils/api';

export default function BuilderGenerator() {
  const [name, setName] = useState('');
  const [builderTitle, setBuilderTitle] = useState('');
  const [role, setRole] = useState('');
  const [college, setCollege] = useState('');
  const [status, setStatus] = useState('Shipping Code');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [card, setCard] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#fcd34d', '#10b981', '#063c27', '#ffffff'],
    });
  };

  const handleGenerate = async () => {
    if (!file) {
      alert('Please upload a photo first.');
      return;
    }
    if (!name.trim() || !builderTitle.trim() || !role.trim() || !college.trim()) {
      alert('Please fill in your name, builder title, role and college/company.');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateCard({
        file,
        name,
        builderTitle,
        role,
        status,
        college,
      });
      setCard(result);
      triggerConfetti();
    } catch (error) {
      console.error('Error generating card:', error);
      alert(error.message || 'Failed to generate your Builder Card. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!card) return;
    setIsDownloading(true);
    try {
      await downloadCardImage(card.imageUrl);
    } catch (error) {
      console.error('Error downloading card:', error);
      alert('Failed to download the Builder Card. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (!card) return;
    openShareOnX(card.shareUrl);
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
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="px-6 py-16 md:px-12 lg:px-20 bg-brand-green-darkest flex flex-col justify-start"
      >
        <div className="max-w-lg w-full">
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-white mb-8 uppercase tracking-wide">
            Create Your Builder Card
          </h2>

          <FormSection
            name={name} setName={setName}
            builderTitle={builderTitle} setBuilderTitle={setBuilderTitle}
            role={role} setRole={setRole}
            college={college} setCollege={setCollege}
            status={status} setStatus={setStatus}
            image={image} setImage={setImage}
            file={file} setFile={setFile}
          />
        </div>
      </motion.div>

      {/* Right Column: Live Card Preview & Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
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
              builderTitle={builderTitle}
              role={role}
              college={college}
              status={status}
              image={image}
              variant="generator"
            />
          </div>

          <div className="flex flex-col items-center w-full">
            <ActionButtons
              onGenerate={handleGenerate}
              onDownload={handleDownload}
              onShare={handleShare}
              isGenerating={isGenerating}
              isDownloading={isDownloading}
              generated={!!card}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}