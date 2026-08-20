import React from 'react';

const MatchScore = ({
  score = 95,
  size = 'md', // 'sm' | 'md' | 'lg'
  breakdown = null, // { skills: 98, experience: 94, velocity: 90, culture: 92 }
  showLabel = true,
  className = '',
}) => {
  const getColor = (s) => {
    if (s >= 90) return 'text-purple-400 stroke-[#7C3AED]';
    if (s >= 75) return 'text-emerald-400 stroke-[#10B981]';
    if (s >= 60) return 'text-amber-400 stroke-[#F59E0B]';
    return 'text-rose-400 stroke-[#EF4444]';
  };

  const getBgGlow = (s) => {
    if (s >= 90) return 'shadow-[0_0_20px_rgba(94,14,215,0.3)] border-purple-500/40 bg-purple-950/20';
    if (s >= 75) return 'shadow-[0_0_20px_rgba(16,185,129,0.2)] border-emerald-500/40 bg-emerald-950/20';
    if (s >= 60) return 'shadow-[0_0_20px_rgba(245,158,11,0.2)] border-amber-500/40 bg-amber-950/20';
    return 'shadow-[0_0_20px_rgba(239,68,68,0.2)] border-rose-500/40 bg-rose-950/20';
  };

  const strokeDash = 2 * Math.PI * 40;
  const strokeOffset = strokeDash - (strokeDash * score) / 100;

  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${getBgGlow(score)} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-xs font-bold text-white">{score}%</span>
        {showLabel && <span className="text-[10px] text-white/60 font-medium">AI Match</span>}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            className="stroke-white/10"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            className={`${getColor(score)} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeDasharray={strokeDash}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-xl font-extrabold text-white tracking-tight">{score}%</span>
          {showLabel && <span className="text-[10px] uppercase font-mono text-purple-300 font-semibold tracking-wider">Match</span>}
        </div>
      </div>

      {breakdown && (
        <div className="w-full space-y-1.5 pt-2">
          {Object.entries(breakdown).map(([key, val]) => (
            <div key={key} className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between text-white/70">
                <span className="capitalize">{key}</span>
                <span className="font-semibold text-white">{val}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full transition-all duration-700"
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchScore;
export { MatchScore };
