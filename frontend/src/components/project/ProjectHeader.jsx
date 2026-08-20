import React from 'react';
import { motion } from 'framer-motion';
import HealthIndicator from './HealthIndicator';

const ProjectHeader = ({ project }) => {
  const completedMilestones = project.milestones.filter(m => m.completed).length;
  const totalMilestones = project.milestones.length;
  const progress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-2 p-6 flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-mono border border-gold/20 uppercase tracking-wider">
            {project.status}
          </span>
          <p className="text-sm text-ink-soft font-mono truncate">
            {project.client} <span className="mx-1">×</span> {project.freelancer}
          </p>
        </div>
        <h2 className="font-display font-bold text-2xl text-ink truncate mb-4">{project.title}</h2>
        
        {/* Progress Bar */}
        <div className="max-w-md">
          <div className="flex justify-between items-center text-xs mb-1.5 text-ink-soft">
            <span className="font-mono">Overall Progress</span>
            <span className="font-mono">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-ink/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-gold-soft to-gold"
            />
          </div>
        </div>
      </div>

      <div className="flex items-start md:items-end flex-col justify-between shrink-0">
        <HealthIndicator status={project.health} />
        <p className="text-xs text-ink-faint font-mono mt-4 md:mt-0">
          Due: {new Date(project.endDate).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectHeader;
