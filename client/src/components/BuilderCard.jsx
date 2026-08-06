import React from 'react';

export default function BuilderCard({ 
  name = '', 
  role = '', 
  college = '', 
  status = '', 
  image = null, 
  variant = 'generator',
  cardRef = null
}) {
  // Format the name: split by spaces to stack it like "ALEX \n CHEN" if it's the hero card
  // or if it's two words, to give it that bold display-serif look.
  const nameParts = name.trim().split(/\s+/);
  const displayFirst = nameParts[0] || 'YOUR';
  const displayLast = nameParts.slice(1).join(' ') || 'NAME';

  // Generate a mock hash for the generator card based on name length or generic hex
  const getHash = () => {
    if (variant === 'hero') return '#TransInGoa';
    if (!name) return '2F793E1BCA';
    // Simple deterministic hash
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hex = Math.abs(hash).toString(16).toUpperCase().substring(0, 10);
    return hex.padEnd(10, 'F');
  };

  return (
    <div 
      ref={cardRef}
      className="relative w-[340px] h-[470px] bg-brand-green-card border-2 border-emerald-500/30 rounded-lg p-6 shadow-2xl flex flex-col justify-between overflow-hidden group select-none"
      style={{
        boxShadow: '0 20px 50px rgba(2, 22, 14, 0.9), inset 0 0 40px rgba(16, 185, 129, 0.05)'
      }}
    >
      {/* Background Grid & Rings */}
      <div className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-500 group-hover:opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Radial concentric rings centered at avatar (cx=170, cy=112) */}
          <circle cx="170" cy="112" r="90" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="170" cy="112" r="115" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="1 8" />
          {/* Vertical axis line */}
          <line x1="170" y1="0" x2="170" y2="470" stroke="#10b981" strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Avatar Section */}
      <div className="relative flex flex-col items-center mt-4">
        {/* Decorative circle outline */}
        <div className="absolute -inset-2 rounded-full border border-emerald-500/20 animate-spin-slow pointer-events-none"></div>
        <div className="absolute -inset-1.5 rounded-full border border-brand-yellow/30 pointer-events-none"></div>

        {/* Profile Image container */}
        <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-brand-yellow bg-brand-green-dark flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt="Builder Avatar" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-emerald-500/40">
              {/* Default avatar SVG */}
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Name Section */}
      <div className="flex flex-col items-center text-center mt-2 z-10">
        <h2 className="font-serif text-[28px] leading-tight font-extrabold text-brand-yellow tracking-wide uppercase max-w-full truncate px-2">
          {variant === 'hero' ? (
            <>
              <div>ALEX</div>
              <div>CHEN</div>
            </>
          ) : (
            <>
              <div className="truncate max-w-[280px]">{displayFirst}</div>
              <div className="truncate max-w-[280px]">{displayLast}</div>
            </>
          )}
        </h2>
      </div>

      {/* Info Details Section */}
      <div className="mt-auto z-10">
        <div className="w-full border-t border-brand-yellow/20 my-3"></div>

        {variant === 'hero' ? (
          <div className="grid grid-cols-2 gap-4 pb-2">
            <div>
              <p className="font-mono text-[9px] text-emerald-500/50 tracking-wider uppercase">BUILDER TITLE</p>
              <p className="font-sans text-xs font-bold text-brand-yellow uppercase tracking-wide mt-0.5">
                {role || 'PIXEL ARCHITECT'}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] text-emerald-500/50 tracking-wider uppercase">CURRENT STATUS</p>
              <p className="font-sans text-xs font-bold text-white uppercase tracking-wide mt-0.5">
                {status || 'STILL SHIPPING'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 pb-2">
            <div>
              <p className="font-mono text-[9px] text-emerald-500/50 tracking-wider uppercase">ROLE</p>
              <p className="font-sans text-[11px] font-bold text-brand-yellow uppercase tracking-wide mt-0.5 truncate max-w-[140px]">
                {role || 'ROLE / TECH STACK'}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] text-emerald-500/50 tracking-wider uppercase">STATUS</p>
              <p className="font-sans text-[11px] font-bold text-brand-yellow uppercase tracking-wide mt-0.5 truncate max-w-[140px]">
                {status || 'SHIPPING CODE'}
              </p>
            </div>
            <div className="col-span-2">
              <p className="font-mono text-[9px] text-emerald-500/50 tracking-wider uppercase">AFFILIATION</p>
              <p className="font-sans text-[11px] font-bold text-white uppercase tracking-wide mt-0.5 truncate max-w-[290px]">
                {college || 'COLLEGE / COMPANY'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-emerald-500/50 border-t border-brand-green-medium/40 pt-2 z-10">
        <span className={variant === 'hero' ? 'text-brand-yellow' : 'text-emerald-500/70 font-semibold'}>
          {getHash()}
        </span>
        <span className="text-white/60">
          GOA • OCT 2026
        </span>
      </div>
    </div>
  );
}
