import React, { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

const ProgressRing = ({ 
  value, 
  size = 60, 
  strokeWidth = 4, 
  color = '#C7A868',
  label = '',
  className = ''
}) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / 100, 1) * circumference;

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setIsAnimated(true), 200);
    }
  }, [isInView]);

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(20,37,68,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={isAnimated ? circumference - progress : circumference}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          className="font-mono text-sm font-bold text-ink"
        >
          {value}%
        </text>
      </svg>
      {label && <span className="text-xs text-ink-faint mt-1 font-mono">{label}</span>}
    </div>
  );
};

export default ProgressRing;
