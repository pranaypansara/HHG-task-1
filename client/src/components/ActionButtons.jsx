import React from 'react';
import { Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}

export default function ActionButtons({
  onGenerate,
  onDownload,
  onShare,
  isGenerating = false,
  isDownloading = false,
  generated = false,
}) {
  const disabled = isGenerating || isDownloading;

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[340px] mt-6">
      {/* Generate Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        disabled={isGenerating}
        onClick={onGenerate}
        className="w-full flex items-center justify-center space-x-2 bg-brand-green-neon hover:bg-brand-green-light text-brand-green-darkest py-3 px-6 font-mono text-xs font-bold tracking-widest rounded-sm shadow-md transition-all duration-300"
      >
        {isGenerating ? (
          <div className="flex items-center space-x-2">
            <Spinner />
            <span>GENERATING...</span>
          </div>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>GENERATE BUILDER CARD</span>
          </>
        )}
      </motion.button>

      {/* Download + Share row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        {/* Download Button */}
        <motion.button
          whileHover={generated ? { scale: 1.03 } : undefined}
          whileTap={generated ? { scale: 0.97 } : undefined}
          disabled={!generated || disabled}
          onClick={onDownload}
          className={`w-full sm:flex-1 flex items-center justify-center space-x-2 bg-brand-yellow hover:bg-brand-yellow-dark text-brand-green-darkest py-3 px-6 font-mono text-xs font-bold tracking-widest rounded-sm shadow-md transition-all duration-300 ${
            !generated || disabled ? 'opacity-40 cursor-not-allowed grayscale' : ''
          }`}
        >
          {isDownloading ? (
            <div className="flex items-center space-x-2">
              <Spinner />
              <span>DOWNLOADING...</span>
            </div>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>DOWNLOAD</span>
            </>
          )}
        </motion.button>

        {/* Share on X Button */}
        <motion.button
          whileTap={generated ? { scale: 0.97 } : undefined}
          disabled={!generated || disabled}
          onClick={onShare}
          className={`w-full sm:flex-1 flex items-center justify-center space-x-2 bg-transparent hover:bg-white/5 border border-white/40 hover:border-white text-white py-3 px-6 font-mono text-xs font-bold tracking-widest rounded-sm transition-all duration-300 ${
            !generated || disabled ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
          <span>SHARE ON X</span>
        </motion.button>
      </div>
    </div>
  );
}