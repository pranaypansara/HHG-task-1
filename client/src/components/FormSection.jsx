import React from 'react';
import UploadBox from './UploadBox';

export default function FormSection({ 
  name, setName,
  builderTitle, setBuilderTitle,
  role, setRole,
  college, setCollege,
  status, setStatus,
  image, setImage
}) {
  const statusOptions = [
    { value: 'Shipping Code', label: 'Shipping Code' },
    { value: 'Pixel Perfect', label: 'Pixel Perfect' },
    { value: 'Hustling', label: 'Hustling' },
    { value: 'Idea Phase', label: 'Idea Phase' }
  ];

  return (
    <div className="flex flex-col space-y-6 w-full max-w-lg">
      {/* Upload Image Section */}
      <div>
        <UploadBox onImageChange={setImage} selectedImage={image} />
      </div>

      {/* Name Input */}
      <div className="flex flex-col space-y-2">
        <label className="font-mono text-[10px] font-bold tracking-widest text-emerald-500/70 uppercase">
          FULL NAME
        </label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          maxLength={30}
          className="w-full bg-brand-green-darkest/40 border border-brand-green-medium/60 rounded-md px-4 py-3 font-sans text-sm text-white placeholder-emerald-500/30 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/30 outline-none transition-all duration-300"
        />
      </div>

      {/* Builder Title Input */}
      <div className="flex flex-col space-y-2">
        <label className="font-mono text-[10px] font-bold tracking-widest text-emerald-500/70 uppercase">
          BUILDER TITLE
        </label>
        <input 
          type="text" 
          value={builderTitle}
          onChange={(e) => setBuilderTitle(e.target.value)}
          placeholder="e.g. PIXEL ARCHITECT"
          maxLength={30}
          className="w-full bg-brand-green-darkest/40 border border-brand-green-medium/60 rounded-md px-4 py-3 font-sans text-sm text-white placeholder-emerald-500/30 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/30 outline-none transition-all duration-300"
        />
      </div>

      {/* Role Input */}
      <div className="flex flex-col space-y-2">
        <label className="font-mono text-[10px] font-bold tracking-widest text-emerald-500/70 uppercase">
          ROLE / TECH STACK
        </label>
        <input 
          type="text" 
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Fullstack / Next.js"
          maxLength={35}
          className="w-full bg-brand-green-darkest/40 border border-brand-green-medium/60 rounded-md px-4 py-3 font-sans text-sm text-white placeholder-emerald-500/30 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/30 outline-none transition-all duration-300"
        />
      </div>

      {/* College / Company Input */}
      <div className="flex flex-col space-y-2">
        <label className="font-mono text-[10px] font-bold tracking-widest text-emerald-500/70 uppercase">
          COLLEGE / COMPANY
        </label>
        <input 
          type="text" 
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          placeholder="Where do you build?"
          maxLength={50}
          className="w-full bg-brand-green-darkest/40 border border-brand-green-medium/60 rounded-md px-4 py-3 font-sans text-sm text-white placeholder-emerald-500/30 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/30 outline-none transition-all duration-300"
        />
      </div>

      {/* Current Status Dropdown */}
      <div className="flex flex-col space-y-2">
        <label className="font-mono text-[10px] font-bold tracking-widest text-emerald-500/70 uppercase">
          CURRENT STATUS
        </label>
        <div className="relative">
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-brand-green-darkest/40 border border-brand-green-medium/60 rounded-md px-4 py-3 font-sans text-sm text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/30 outline-none transition-all duration-300 appearance-none cursor-pointer"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-brand-green-card text-white">
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom arrow indicator */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-emerald-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
