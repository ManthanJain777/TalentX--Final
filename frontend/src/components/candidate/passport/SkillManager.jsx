import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Check } from 'lucide-react';

const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const SkillManager = ({ skills, setSkills }) => {
  const [newSkill, setNewSkill] = useState('');
  const [selectedProficiency, setSelectedProficiency] = useState('Advanced');

  const addSkill = () => {
    if (newSkill.trim() && !skills.find((s) => s.name === newSkill.trim())) {
      setSkills([
        ...skills,
        { name: newSkill.trim(), proficiency: selectedProficiency, verified: false },
      ]);
      setNewSkill('');
    }
  };

  const removeSkill = (name) => {
    setSkills(skills.filter((s) => s.name !== name));
  };

  const toggleVerification = (name) => {
    setSkills(
      skills.map((s) =>
        s.name === name ? { ...s, verified: !s.verified } : s
      )
    );
  };

  return (
    <div className="glass-2 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-display font-semibold text-ink">Skills</h3>
          <p className="text-xs text-ink-faint font-mono">Add and verify your core competencies</p>
        </div>
        <span className="text-xs font-mono text-gold">{skills.length} skills</span>
      </div>

      {/* Add Skill */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Type a skill..."
          className="flex-1 bg-white/50 border border-cover/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gold/30"
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
        />
        <select
          value={selectedProficiency}
          onChange={(e) => setSelectedProficiency(e.target.value)}
          className="bg-white/50 border border-cover/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gold/30 sm:w-40"
        >
          {proficiencyLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <button
          onClick={addSkill}
          className="px-4 py-2 rounded-xl bg-gold text-white hover:bg-gold-soft transition-colors flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Skill Chips */}
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full glass-2 border border-ink/10 hover:border-gold-soft/30 transition-all cursor-default"
            >
              <span className="text-sm font-medium text-ink">{skill.name}</span>
              <span className="text-[10px] font-mono text-ink-faint">{skill.proficiency}</span>
              <button
                onClick={() => toggleVerification(skill.name)}
                className={`p-0.5 rounded-full transition-colors ${
                  skill.verified
                    ? 'text-verified hover:text-verified/80'
                    : 'text-ink-faint hover:text-ink'
                }`}
              >
                <Check className={`w-3 h-3 ${skill.verified ? '' : 'opacity-30'}`} />
              </button>
              <button
                onClick={() => removeSkill(skill.name)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full hover:bg-ink/5"
              >
                <X className="w-3 h-3 text-ink-faint" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillManager;
