import React from 'react';
import { motion } from 'framer-motion';

const MatchScoreDisplay = ({ score = 0, size = 64 }) => {
  const strokeWidth = size * 0.09;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const safeScore = Math.max(0, Math.min(100, score || 0));
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  let colorClass = 'text-[#C7A868]';
  let strokeColor = '#C7A868';
  if (safeScore >= 90) {
    colorClass = 'text-emerald-600';
    strokeColor = '#059669';
  } else if (safeScore >= 75) {
    colorClass = 'text-[#8B6B23]';
    strokeColor = '#8B6B23';
  } else if (safeScore < 50 && safeScore > 0) {
    colorClass = 'text-amber-600';
    strokeColor = '#D97706';
  }

  return (
    <div className="relative flex items-center justify-center flex-col" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-[#142544]/10 fill-none"
          strokeWidth={strokeWidth}
        />
        {/* Progress Ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="fill-none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      {/* Score Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-mono font-extrabold leading-none ${colorClass}`} style={{ fontSize: size * 0.28 }}>
          {safeScore}%
        </span>
        <span className="text-[8px] font-mono text-[#93979F] font-bold uppercase tracking-wider mt-0.5">
          Match
        </span>
      </div>
    </div>
  );
};

export default MatchScoreDisplay;
export { MatchScoreDisplay };
