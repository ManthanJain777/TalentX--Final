import React from 'react';
import { motion } from 'framer-motion';
import { Inbox, Sparkles } from 'lucide-react';

const EmptyState = ({ 
  title = "No Records Found", 
  description = "No items matching your criteria in the database.",
  message,
  icon,
  action
}) => {
  const displayTitle = message || title;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center p-10 sm:p-14 text-center rounded-2xl border border-cover/10 bg-white/70 backdrop-blur-md shadow-xs space-y-4 my-4"
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-cover/5 border border-cover/10 flex items-center justify-center text-gold shadow-sm">
          {icon || <Inbox className="w-8 h-8 text-gold/70" />}
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1 -right-1 text-gold"
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </div>

      <div className="max-w-md space-y-1">
        <h3 className="text-lg font-display font-bold text-cover tracking-tight">{displayTitle}</h3>
        {description && (
          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed font-sans">{description}</p>
        )}
      </div>

      {action && (
        <div className="pt-2">
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
