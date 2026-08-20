import React from 'react';
import { motion } from 'framer-motion';

const HealthIndicator = ({ status }) => {
  // status: 'green', 'yellow', 'red'
  const config = {
    green: { color: 'bg-[#1D8A5F]', text: 'text-[#1D8A5F]', label: 'On Track', shadow: 'shadow-[#1D8A5F]/20' },
    yellow: { color: 'bg-[#B9821E]', text: 'text-[#B9821E]', label: 'At Risk', shadow: 'shadow-[#B9821E]/20' },
    red: { color: 'bg-[#C0424D]', text: 'text-[#C0424D]', label: 'Critical', shadow: 'shadow-[#C0424D]/20' },
  };

  const current = config[status] || config.green;

  return (
    <div className="flex items-center gap-2 group relative cursor-help">
      <div className="relative flex h-3 w-3">
        <motion.span 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${current.color} opacity-75`}
        />
        <span className={`relative inline-flex rounded-full h-3 w-3 ${current.color} shadow-lg ${current.shadow}`} />
      </div>
      <span className={`text-sm font-medium ${current.text}`}>{current.label}</span>
      
      {/* Tooltip */}
      <div className="absolute top-full right-0 mt-2 w-48 p-2 bg-ink text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
        {status === 'green' && 'Project is on schedule and within budget.'}
        {status === 'yellow' && 'Milestone is approaching deadline or budget is high.'}
        {status === 'red' && 'Milestone is overdue or budget exceeded.'}
      </div>
    </div>
  );
};

export default HealthIndicator;
