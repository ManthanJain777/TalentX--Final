import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, AlertCircle } from 'lucide-react';

const MilestoneTracker = ({ milestones }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="glass-panel p-6">
      <h3 className="font-display font-semibold text-lg text-ink mb-6">Milestones</h3>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 relative"
      >
        {/* Connecting Line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-px bg-ink/10" />

        {milestones.map((milestone, i) => {
          const isOverdue = !milestone.completed && new Date(milestone.deadline) < new Date();
          
          let StatusIcon = Clock;
          let iconColor = "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
          let textColor = "text-ink";
          
          if (milestone.completed) {
            StatusIcon = Check;
            iconColor = "text-verified bg-verified/10 border-verified/20";
            textColor = "text-ink-soft";
          } else if (isOverdue) {
            StatusIcon = AlertCircle;
            iconColor = "text-red-500 bg-red-500/10 border-red-500/20";
            textColor = "text-red-500";
          }

          return (
            <motion.div key={milestone.id} variants={item} className="flex gap-4 relative z-10 group">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${iconColor} transition-colors group-hover:bg-white`}>
                <StatusIcon className="w-4 h-4" />
              </div>
              <div className="flex-1 pb-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-medium text-sm ${textColor}`}>{milestone.title}</h4>
                  <span className="text-xs font-mono text-gold font-medium">{milestone.weight}%</span>
                </div>
                <p className="text-xs text-ink-faint font-mono">
                  Due: {new Date(milestone.deadline).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MilestoneTracker;
