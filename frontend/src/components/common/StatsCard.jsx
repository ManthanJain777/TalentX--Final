import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, trend, colorClass = 'text-verified', icon: Icon, iconBg = 'bg-cover/5', style = {} }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-card p-6 group relative overflow-hidden transition-all duration-400 hover:shadow-2xl hover:shadow-gold/20"
      style={style}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none group-hover:bg-gold/20 transition-colors duration-500" />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="meta-label flex items-center gap-1.5 font-mono text-xs text-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {title}
          </p>
          <motion.p 
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="stat-number mt-1 text-2xl sm:text-3xl font-display font-bold text-cover tracking-tight"
          >
            {value}
          </motion.p>
          <p className={`text-xs font-mono font-medium mt-1.5 flex items-center gap-1.5 ${colorClass}`}>
            <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
            {trend}
          </p>
        </div>
        <div className={`p-3 rounded-2xl ${iconBg} border border-gold-soft/20 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300 shadow-xs group-hover:scale-110`}>
          {Icon && <Icon className="w-5 h-5 text-gold transition-transform duration-300 group-hover:rotate-6" />}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
export { StatsCard };
