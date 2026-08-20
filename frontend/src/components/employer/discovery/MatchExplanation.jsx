import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Info } from 'lucide-react';

const MatchExplanation = ({ explanation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { label: 'Verified Skills', key: 'skills' },
    { label: 'Project Relevance', key: 'projects' },
    { label: 'Assessment Scores', key: 'assessments' },
    { label: 'Certifications', key: 'certifications' },
    { label: 'Profile Completeness', key: 'profile' },
  ];

  return (
    <div className="border border-ink/10 rounded-xl overflow-hidden glass-2 transition-colors hover:border-gold-soft/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white/30 hover:bg-white/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-gold" />
          <span className="font-medium text-sm text-ink">Why this Match?</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-ink-faint" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-3">
              <div className="h-px w-full bg-ink/5 mb-3" />
              {categories.map(cat => (
                <div key={cat.key} className="text-sm">
                  <span className="font-medium text-ink block mb-0.5">{cat.label}:</span>
                  <span className="text-ink-soft text-xs">{explanation[cat.key]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchExplanation;
