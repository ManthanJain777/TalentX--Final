import React, { useRef } from 'react';

const SpotlightCard = ({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(212, 175, 55, 0.15)',
  style = {},
  ...props 
}) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div 
      ref={divRef} 
      onMouseMove={handleMouseMove} 
      className={`relative overflow-hidden rounded-2xl border border-cover/15 bg-white/80 backdrop-blur-xl transition-all duration-300 group hover:border-gold/40 hover:shadow-xl ${className}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        '--spotlight-color': spotlightColor,
        ...style
      }}
      {...props}
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)`
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
export { SpotlightCard };
