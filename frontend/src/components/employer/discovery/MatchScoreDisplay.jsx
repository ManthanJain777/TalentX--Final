import React from 'react';
import { motion } from 'framer-motion';

const MatchScoreDisplay = ({ score, size = 64 }) => {
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = 'text-red-500';
  let strokeClass = 'stroke-red-500';
  if (score >= 80) {
    colorClass = 'text-gold';
    strokeClass = 'stroke-gold';
  } else if (score >= 60) {
    colorClass = 'text-amber-500';
    strokeClass = 'stroke-amber-500';
  }

  return (
    <div className="relative flex items-center justify-center flex-col gap-1" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-ink/10 fill-none"
          strokeWidth={strokeWidth}
        />
        {/* Progress Ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`${strokeClass} fill-none`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      {/* Score Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-mono font-bold ${colorClass}`} style={{ fontSize: size * 0.28 }}>
          {score}%
        </span>
      </div>
    </div>
  );
};

export default MatchScoreDisplay;
