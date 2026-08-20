import React from 'react';
import GlassCard from './GlassCard';

const StatsCard = ({
  title,
  value,
  change,
  changeType = 'positive', // 'positive' | 'negative' | 'neutral'
  icon: Icon,
  subtitle,
  className = '',
}) => {
  return (
    <GlassCard className={`relative overflow-hidden group ${className}`} padding="p-5">
      {/* Background radial gradient accent */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-purple-600/10 blur-2xl group-hover:bg-purple-600/20 transition-all duration-500 pointer-events-none" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-white/50 tracking-wider uppercase">{title}</p>
          <h4 className="text-2xl lg:text-3xl font-bold text-white mt-1.5 tracking-tight">{value}</h4>
        </div>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-purple-600/15 border border-purple-500/30 text-purple-400 group-hover:scale-110 group-hover:border-purple-400/50 transition-all duration-300">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(change !== undefined || subtitle) && (
        <div className="mt-3.5 flex items-center gap-2 text-xs">
          {change !== undefined && (
            <span
              className={`font-semibold px-1.5 py-0.5 rounded-md ${
                changeType === 'positive'
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : changeType === 'negative'
                  ? 'text-rose-400 bg-rose-500/10'
                  : 'text-white/60 bg-white/5'
              }`}
            >
              {changeType === 'positive' && '+'}
              {change}
            </span>
          )}
          {subtitle && <span className="text-white/50 truncate">{subtitle}</span>}
        </div>
      )}
    </GlassCard>
  );
};

export default StatsCard;
export { StatsCard };
