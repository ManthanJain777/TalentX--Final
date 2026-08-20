import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  disabled,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = "rounded-full font-body font-semibold text-sm transition-colors flex items-center justify-center gap-2 relative overflow-hidden cursor-pointer select-none";
  
  const sizeClasses = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5",
    lg: "px-8 py-3 text-base"
  };

  const variants = {
    primary: "bg-cover text-white hover:bg-cover-deep shadow-soft hover:shadow-medium border border-transparent active:bg-cover-deep",
    secondary: "bg-white/70 backdrop-blur-md border border-cover/15 text-cover hover:bg-cover hover:text-white shadow-xs",
    gold: "bg-gold text-white hover:bg-gold-soft shadow-soft hover:shadow-medium active:bg-gold-soft",
    outline: "bg-transparent text-cover border border-cover/20 hover:bg-cover/5 active:bg-cover/10",
    risk: "bg-risk text-white hover:bg-risk/90 shadow-soft hover:shadow-medium",
    ghost: "text-cover hover:bg-cover/5 active:bg-cover/10"
  };

  const isClickable = !disabled && !loading;

  return (
    <motion.button 
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={isClickable ? { scale: 1.02, y: -1 } : {}}
      whileTap={isClickable ? { scale: 0.97, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variants[variant] || variants.primary} ${className} group ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''}`} 
      {...props}
    >
      {variant === 'primary' && isClickable && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-soft/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />}
        <span>{children}</span>
        {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
      </span>
    </motion.button>
  );
};

export default Button;
export { Button };
