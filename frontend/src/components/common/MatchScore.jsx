import React from 'react';

const MatchScore = ({
  score = 94,
  size = 72,
  strokeWidth = 6,
  showLabel = true,
  label = 'MATCH',
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = (val) => {
    if (val >= 90) return 'text-gold';
    if (val >= 75) return 'text-verified';
    if (val >= 60) return 'text-pending';
    return 'text-risk';
  };

  const getStrokeColor = (val) => {
    if (val >= 90) return '#8B6B23';
    if (val >= 75) return '#1D8A5F';
    if (val >= 60) return '#B9821E';
    return '#C0424D';
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(20, 37, 68, 0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getStrokeColor(score)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            className={`font-mono font-bold leading-none ${getScoreColor(score)}`}
            style={{ fontSize: size * 0.28 }}
          >
            {score}%
          </span>
        </div>
      </div>

      {showLabel && (
        <span className="font-mono text-[10px] font-bold text-ink-soft tracking-wider uppercase mt-1">
          {label}
        </span>
      )}
    </div>
  );
};

export default MatchScore;
export { MatchScore };
