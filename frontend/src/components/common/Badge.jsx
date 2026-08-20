import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-mono',
    md: 'text-xs px-2.5 py-1 font-mono font-semibold',
    lg: 'text-sm px-3.5 py-1.5 font-sans font-bold',
  };

  const variantClasses = {
    default: 'bg-cover/8 text-cover border border-cover/15',
    verified: 'badge-verified',
    success: 'badge-verified',
    pending: 'badge-pending',
    warning: 'badge-pending',
    risk: 'badge-risk',
    danger: 'badge-risk',
    gold: 'badge-gold',
    cover: 'badge-cover',
  };

  const dotColors = {
    default: 'bg-cover',
    verified: 'bg-verified',
    success: 'bg-verified',
    pending: 'bg-pending',
    warning: 'bg-pending',
    risk: 'bg-risk',
    danger: 'bg-risk',
    gold: 'bg-gold',
    cover: 'bg-cover',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full transition-all ${
        sizeClasses[size] || sizeClasses.md
      } ${variantClasses[variant] || variantClasses.default} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            dotColors[variant] || 'bg-cover'
          } ${variant === 'verified' || variant === 'success' ? 'animate-pulse' : ''}`}
        />
      )}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
export { Badge };
