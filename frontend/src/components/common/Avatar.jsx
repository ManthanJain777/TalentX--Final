import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const Avatar = ({
  src,
  name = 'User',
  size = 'md',
  verified = false,
  online = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-bold',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const getInitials = (n) => {
    if (!n) return 'TX';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative inline-flex items-center justify-center shrink-0 cursor-default ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full object-cover border-2 border-gold/40 shadow-sm`}
        />
      ) : (
        <div
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full bg-cover text-white font-mono font-bold flex items-center justify-center border-2 border-gold/40 shadow-sm`}
        >
          {getInitials(name)}
        </div>
      )}

      {/* Verified Seal Badge */}
      {verified && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          title="Verified Talent Passport"
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-verified text-white border-2 border-white flex items-center justify-center shadow-xs"
        >
          <ShieldCheck className="w-2.5 h-2.5" />
        </motion.span>
      )}

      {/* Online indicator */}
      {!verified && online && (
        <span
          title="Online"
          className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-verified border-2 border-white shadow-xs animate-pulse"
        />
      )}
    </motion.div>
  );
};

export default Avatar;
export { Avatar };
