import React from 'react';

export default function BuilderCard({ 
  image = null,
  name = '', 
  builderTitle = '', 
  role = '', 
  status = '', 
  college = '', 
  variant = 'generator',
  cardRef = null
}) {
  // Determine displayed values, substituting placeholders if empty
  const isHero = variant === 'hero';
  
  const displayName = name.trim() 
    ? name 
    : (isHero ? 'ALEX CHEN' : 'YOUR NAME');
    
  const displayTitle = builderTitle.trim() 
    ? builderTitle 
    : (isHero ? 'PIXEL ARCHITECT' : 'BUILDER TITLE');
    
  const displayRole = role.trim() 
    ? role 
    : (isHero ? 'FULL STACK DEVELOPER' : 'ROLE / TECH STACK');
    
  const displayStatus = status.trim() 
    ? status 
    : (isHero ? 'STILL SHIPPING' : 'CURRENT STATUS');
    
  const displayCollege = college.trim() 
    ? college 
    : (isHero ? 'ABCD UNIVERSITY' : 'COLLEGE / COMPANY');

  return (
    <div 
      ref={cardRef}
      className="relative w-[360px] h-[520px] bg-brand-green-card border-[3px] border-brand-yellow p-3 rounded-sm shadow-2xl flex flex-col select-none"
      style={{
        boxShadow: '0 25px 60px rgba(2, 22, 14, 0.95), inset 0 0 50px rgba(16, 185, 129, 0.05)'
      }}
    >
      {/* Inner thin gold border container */}
      <div className="w-full h-full border border-brand-yellow/30 rounded-md p-4 flex flex-col justify-between">
        
        {/* Card Header */}
        <div className="text-center">
          <h3 className="font-mono text-[10px] tracking-[0.25em] text-brand-yellow font-bold uppercase">
            HH GOA 2026
          </h3>
        </div>

        {/* Uploaded Photo container (Roughly 45-50% card height) */}
        <div className="relative w-full h-[210px] rounded-2xl overflow-hidden border border-brand-yellow/30 bg-brand-green-dark/30 flex items-center justify-center mt-3">
          {image ? (
            <img 
              src={image} 
              alt="Builder Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-emerald-500/20">
              <svg className="w-16 h-16 stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
              </svg>
            </div>
          )}
        </div>

        {/* Name Section */}
        <div className="text-center mt-3.5 px-1">
          <h2 className="font-serif text-2xl font-bold tracking-wide text-brand-yellow uppercase truncate max-w-full">
            {displayName}
          </h2>
        </div>

        {/* Builder Title Pill */}
        <div className="flex justify-center mt-1.5">
          <div className="px-5 py-0.5 border border-brand-yellow text-brand-yellow font-mono text-[9px] font-bold tracking-[0.18em] rounded-full uppercase bg-brand-yellow/5">
            {displayTitle}
          </div>
        </div>

        {/* Fields block list */}
        <div className="flex flex-col w-full mt-3.5">
          
          {/* Role */}
          <div className="border-t border-brand-yellow/20 w-full my-1.5"></div>
          <div className="pl-6">
            <p className="font-mono text-[8.5px] text-brand-yellow/70 tracking-widest uppercase">
              ROLE / TECH STACK
            </p>
            <p className="font-mono text-[11px] text-white tracking-wider font-semibold uppercase mt-0.5 truncate max-w-[260px]">
              {displayRole}
            </p>
          </div>

          {/* Status */}
          <div className="border-t border-brand-yellow/20 w-full my-1.5"></div>
          <div className="pl-6">
            <p className="font-mono text-[8.5px] text-brand-yellow/70 tracking-widest uppercase">
              STATUS
            </p>
            <p className="font-mono text-[11px] text-white tracking-wider font-semibold uppercase mt-0.5 truncate max-w-[260px]">
              {displayStatus}
            </p>
          </div>

          {/* College / Company */}
          <div className="border-t border-brand-yellow/20 w-full my-1.5"></div>
          <div className="pl-6">
            <p className="font-mono text-[8.5px] text-brand-yellow/70 tracking-widest uppercase">
              COLLEGE / COMPANY
            </p>
            <p className="font-mono text-[11px] text-white tracking-wider font-semibold uppercase mt-0.5 truncate max-w-[260px]">
              {displayCollege}
            </p>
          </div>
          
          <div className="border-t border-brand-yellow/20 w-full my-1.5"></div>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-widest text-brand-yellow px-1 mt-auto pt-1">
          <span>#FRAMEINGOA</span>
          <span>GOA • OCT 2026</span>
        </div>

      </div>
    </div>
  );
}
