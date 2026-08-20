import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const GlassMorphCard = ({ 
  children, 
  className = '', 
  hover = true, 
  glow = false,
  padding = 'p-6',
  magnetic = false,
  ...props 
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!magnetic || !cardRef.current) return;

    const card = cardRef.current;
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.01)`;
    };
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    };
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magnetic]);

  return (
    <motion.div
      ref={cardRef}
      className={`
        glass-morph ${padding}
        ${hover ? 'hover:shadow-xl' : ''}
        ${glow ? 'pulse-glow' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      <div className="shine-track" />
      {children}
    </motion.div>
  );
};

export default GlassMorphCard;
