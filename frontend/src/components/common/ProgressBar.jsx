import React from 'react';

const ProgressBar = ({
  value = 0,
  max = 100,
  label = '',
  showValue = true,
  variant = 'gradient', // gradient | gold | verified | risk
  size = 'md',
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const fillVariants = {
    gradient: 'bg-gradient-to-r from-cover via-cover-light to-gold',
    gold: 'bg-gradient-to-r from-gold to-gold-soft',
    verified: 'bg-gradient-to-r from-verified to-emerald-400',
    risk: 'bg-gradient-to-r from-risk to-red-400',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs font-semibold text-ink mb-1.5 font-sans">
          {label && <span>{label}</span>}
          {showValue && <span className="font-mono text-ink-soft">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-cover/8 rounded-full overflow-hidden p-0.5 border border-cover/10 ${sizeClasses[size] || sizeClasses.md}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${fillVariants[variant] || fillVariants.gradient}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
export { ProgressBar };
