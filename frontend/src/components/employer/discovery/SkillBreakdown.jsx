import React from 'react';
import { motion } from 'framer-motion';

const SkillBreakdown = ({ breakdown = {} }) => {
  const categories = [
    { label: 'Verified Skills', key: 'skills', weight: '40%' },
    { label: 'Project Relevance', key: 'projects', weight: '25%' },
    { label: 'Assessment Scores', key: 'assessments', weight: '20%' },
    { label: 'Certifications', key: 'certifications', weight: '10%' },
    { label: 'Profile Completeness', key: 'profile', weight: '5%' },
  ];

  return (
    <div className="space-y-2.5">
      {categories.map((cat, i) => {
        const val = breakdown[cat.key] !== undefined ? breakdown[cat.key] : 85;
        return (
          <div key={cat.key} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#142544] text-[12px]">
                {cat.label} <span className="text-[#93979F] font-mono text-[10px]">({cat.weight})</span>
              </span>
              <span className="font-mono font-bold text-[#8B6B23] text-xs">{val}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#142544]/5 overflow-hidden border border-[#142544]/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${val}%` }}
                transition={{ duration: 0.8, delay: 0.05 * i, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#C7A868] via-[#B89650] to-[#8B6B23]"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillBreakdown;
export { SkillBreakdown };
