import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const AnimatedNumber = ({ value, suffix = '', duration = 1500, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const start = performance.now();
      const target = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
      const isCurrency = typeof value === 'string' && value.includes('$');

      const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        
        let display = isCurrency ? '$' + current : current;
        if (typeof value === 'string' && value.includes('%')) display = current + '%';
        if (typeof value === 'string' && value.includes('+')) display = current + '+';
        
        setDisplayValue(display);
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setDisplayValue(value);
        }
      };
      requestAnimationFrame(update);
    }
  }, [isInView, value, duration, hasAnimated]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {hasAnimated ? displayValue : 0}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;
