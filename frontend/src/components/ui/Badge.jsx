import React from 'react';

const Badge = ({
  children,
  variant = 'primary', // 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'proof'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  className = '',
  dot = false,
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] gap-1 font-medium',
    md: 'px-2.5 py-1 text-xs gap-1.5 font-medium',
    lg: 'px-3.5 py-1.5 text-sm gap-2 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-purple-600/15 text-purple-300 border border-purple-500/30',
    success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
    info: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
    neutral: 'bg-white/10 text-white/80 border border-white/15',
    proof: 'bg-gradient-to-r from-purple-900/40 to-indigo-900/40 text-purple-200 border border-purple-400/40 shadow-[0_0_15px_rgba(94,14,215,0.2)]',
  };

  const dotColors = {
    primary: 'bg-purple-400 shadow-[0_0_8px_#A855F7]',
    success: 'bg-emerald-400 shadow-[0_0_8px_#10B981]',
    warning: 'bg-amber-400 shadow-[0_0_8px_#F59E0B]',
    danger: 'bg-rose-400 shadow-[0_0_8px_#EF4444]',
    info: 'bg-blue-400 shadow-[0_0_8px_#3B82F6]',
    neutral: 'bg-white/60',
    proof: 'bg-purple-300 shadow-[0_0_8px_#C084FC]',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full backdrop-blur-md tracking-wide
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColors[variant]}`} />
      )}
      {Icon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
export { Badge };
