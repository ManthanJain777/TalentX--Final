import React from 'react';
import { motion } from 'framer-motion';

const StatusBadge = ({ status = 'ACTIVE', className = '' }) => {
  const normalized = (status || '').toLowerCase();
  
  let dotClass = 'dot-pending';
  let textClass = 'text-pending';
  let bgClass = 'bg-pending/5 border-pending/20';
  let pulse = false;

  if (normalized.includes('active') || normalized.includes('verified') || normalized.includes('success') || normalized.includes('open') || normalized.includes('available')) {
    dotClass = 'dot-verified bg-emerald-500';
    textClass = 'text-emerald-700';
    bgClass = 'bg-emerald-50 border-emerald-200';
    pulse = true;
  } else if (normalized.includes('risk') || normalized.includes('dispute') || normalized.includes('rejected') || normalized.includes('suspended')) {
    dotClass = 'dot-risk bg-red-500';
    textClass = 'text-red-700';
    bgClass = 'bg-red-50 border-red-200';
  } else {
    dotClass = 'dot-pending bg-amber-500';
    textClass = 'text-amber-700';
    bgClass = 'bg-amber-50 border-amber-200';
  }

  return (
    <motion.span 
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono font-semibold uppercase tracking-wider ${bgClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass} ${pulse ? 'animate-pulse' : ''}`} />
      <span className={textClass}>{status}</span>
    </motion.span>
  );
};

export default StatusBadge;
export { StatusBadge };
