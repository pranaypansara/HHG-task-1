import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-brand-green-darkest border-t border-brand-green-medium/20 px-6 py-8 md:px-12 flex flex-col md:flex-row items-center justify-between font-mono text-[10px] text-emerald-500/40 uppercase tracking-widest gap-4">
      <div>
        <span>© {new Date().getFullYear()} HH Goa 2026 Builder Ecosystem</span>
      </div>
      
      <div className="flex space-x-6 text-[11px]">
        <a 
          href="#" 
          className="hover:text-brand-yellow transition-colors duration-200"
        >
          Privacy Policy
        </a>
        <span>•</span>
        <a 
          href="#" 
          className="hover:text-brand-yellow transition-colors duration-200"
        >
          Terms of Use
        </a>
      </div>

      <div>
        <span>SHIPPED BY THE BAY</span>
      </div>
    </footer>
  );
}
