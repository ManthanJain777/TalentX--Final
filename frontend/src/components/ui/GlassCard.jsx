import React from 'react';

const GlassCard = ({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  padding = 'p-6',
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl
        bg-white/[0.05] backdrop-blur-xl
        border border-white/[0.08]
        shadow-[0_8px_32px_rgba(0,0,0,0.37)]
        ${hoverEffect ? 'transition-all duration-300 hover:bg-white/[0.08] hover:border-purple-500/30 hover:shadow-[0_12px_40px_rgba(94,14,215,0.18)] hover:-translate-y-0.5' : ''}
        ${glow ? 'shadow-[0_0_50px_rgba(94,14,215,0.2)] border-purple-500/40' : ''}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
export { GlassCard };
