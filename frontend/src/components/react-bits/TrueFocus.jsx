import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TrueFocus = ({
  words = [],
  manualMode = false,
  blurAmount = 4,
  borderColor = '#C7A868',
  glowColor = 'rgba(199, 168, 104, 0.35)',
  animationDuration = 0.4,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={`relative inline-flex flex-wrap items-center gap-3 ${className}`}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            onMouseEnter={() => setCurrentIndex(index)}
            className="relative cursor-pointer select-none px-2 py-1 transition-all duration-300 font-display font-bold"
            style={{
              filter: isActive ? 'none' : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.4,
            }}
          >
            {isActive && (
              <motion.span
                layoutId="trueFocusBorder"
                transition={{ duration: animationDuration, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 rounded-lg border-2"
                style={{
                  borderColor: borderColor,
                  boxShadow: `0 0 16px ${glowColor}`,
                }}
              />
            )}
            <span className="relative z-10">{word}</span>
          </span>
        );
      })}
    </div>
  );
};

export default TrueFocus;
export { TrueFocus };
