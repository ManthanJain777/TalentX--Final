import React from 'react';
import { motion } from 'framer-motion';
import CandidateCard from './CandidateCard';

const DiscoveryGrid = ({ candidates, onInvite }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-soft">
          Showing <span className="font-medium text-ink">{candidates.length}</span> candidates based on your filters
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-ink/10 text-xs font-medium text-ink hover:bg-ink/5 transition-colors disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-ink/10 text-xs font-medium text-ink hover:bg-ink/5 transition-colors">
            Next
          </button>
        </div>
      </div>

      {/* Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        {candidates.map(candidate => (
          <motion.div key={candidate.id} variants={item}>
            <CandidateCard candidate={candidate} onInvite={onInvite} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DiscoveryGrid;
