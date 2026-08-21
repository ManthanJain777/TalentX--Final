import React from 'react';
import { motion } from 'framer-motion';

const MorphingMenuButton = ({ isOpen, onClick, className = '' }) => {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`relative w-10 h-10 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border border-[#C7A868]/30 shadow-md bg-gradient-to-br from-[#142544] to-[#0D1424] text-[#C7A868] hover:border-[#C7A868] hover:shadow-[0_0_20px_rgba(199,168,104,0.35)] cursor-pointer group ${className}`}
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      title={isOpen ? 'Close menu' : 'Open menu'}
    >
      {/* Top Line */}
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 7.5 : 0,
          width: isOpen ? 18 : 20,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        className="h-[2.5px] rounded-full bg-gradient-to-r from-[#C7A868] to-[#E5CF98] shadow-xs group-hover:from-white group-hover:to-[#C7A868] transition-colors"
      />
      
      {/* Middle Line */}
      <motion.span
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
          width: 14,
          x: isOpen ? 10 : 0
        }}
        transition={{ duration: 0.18 }}
        className="h-[2.5px] rounded-full bg-gradient-to-r from-[#C7A868] to-[#E5CF98] shadow-xs self-start ml-2 group-hover:from-white group-hover:to-[#C7A868] transition-colors"
      />

      {/* Bottom Line */}
      <motion.span
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -7.5 : 0,
          width: isOpen ? 18 : 20,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        className="h-[2.5px] rounded-full bg-gradient-to-r from-[#C7A868] to-[#E5CF98] shadow-xs group-hover:from-white group-hover:to-[#C7A868] transition-colors"
      />
    </motion.button>
  );
};

export default MorphingMenuButton;
export { MorphingMenuButton };
