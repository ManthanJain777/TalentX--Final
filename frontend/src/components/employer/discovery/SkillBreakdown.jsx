import React from 'react';
import { motion } from 'framer-motion';

const SkillBreakdown = ({ breakdown }) => {
  const categories = [
    { label: 'Verified Skills', key: 'skills', weight: '40%' },
    { label: 'Project Relevance', key: 'projects', weight: '25%' },
    { label: 'Assessment Scores', key: 'assessments', weight: '20%' },
    { label: 'Certifications', key: 'certifications', weight: '10%' },
    { label: 'Profile Completeness', key: 'profile', weight: '5%' },
  ];

  return (
    <div className="space-y-3">
      {categories.map((cat, i) => (
        <div key={cat.key} className="space-y-1">
          <div className="flex justify-between items-end text-xs">
            <span className="text-ink-soft">{cat.label} <span className="text-ink-faint text-[10px]">({cat.weight})</span></span>
            <span className="font-mono text-ink">{breakdown[cat.key]}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-ink/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${breakdown[cat.key]}%` }}
              transition={{ duration: 1, delay: 0.1 * i, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillBreakdown;
