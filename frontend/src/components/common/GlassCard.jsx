import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', gold = false, style = {}, onClick, ...props }) => {
  const baseClass = gold ? 'glass-2 glass-2-gold' : 'glass-2';

  return (
    <motion.div 
      onClick={onClick}
      whileHover={{ y: -3, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
      transition={{ duration: 0.3 }}
      className={`${baseClass} ${className} transition-shadow duration-300 hover:shadow-xl hover:shadow-cover/5`}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
export { GlassCard };
