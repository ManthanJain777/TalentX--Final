import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Check } from 'lucide-react';

const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const predefinedSkills = [
  'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt',
  'Java', 'Spring Boot', 'Kotlin', 'Scala',
  'Python', 'Django', 'Flask', 'FastAPI',
  'Node.js', 'Express', 'NestJS',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Cassandra',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Terraform',
  'TypeScript', 'JavaScript', 'Go', 'Rust', 'Ruby on Rails', 'C#', '.NET',
  'GraphQL', 'REST API', 'gRPC', 'WebSockets',
  'Figma', 'UI/UX', 'Tailwind CSS', 'SASS'
];

const SkillManager = ({ skills, setSkills }) => {
  const [newSkill, setNewSkill] = useState('');
  const [selectedProficiency, setSelectedProficiency] = useState('Advanced');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setNewSkill(val);
    if (val.trim()) {
      const filtered = predefinedSkills.filter(s => s.toLowerCase().includes(val.toLowerCase()) && !skills.find(existing => existing.name === s));
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (skillName) => {
    setNewSkill(skillName);
    setShowSuggestions(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.find((s) => s.name.toLowerCase() === newSkill.trim().toLowerCase())) {
      setSkills([
        ...skills,
        { name: newSkill.trim(), proficiency: selectedProficiency, verified: false },
      ]);
      setNewSkill('');
      setShowSuggestions(false);
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
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-display font-semibold text-ink">Skills</h3>
          <p className="text-xs text-ink-faint font-mono">Add and verify your core competencies</p>
        </div>
        <span className="text-xs font-mono text-gold">{skills.length} skills</span>
      </div>

      {/* Add Skill */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4 relative">
        <div className="flex-1 relative">
          <input
            value={newSkill}
            onChange={handleInputChange}
            onFocus={() => {
              if (newSkill.trim() && suggestions.length > 0) setShowSuggestions(true);
            }}
            placeholder="Type a skill..."
            className="w-full bg-white/50 border border-cover/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gold/30"
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
          />
          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-cover/10 shadow-xl rounded-xl max-h-48 overflow-y-auto"
              >
                {suggestions.map(s => (
                  <li 
                    key={s} 
                    onClick={() => handleSuggestionClick(s)}
                    className="px-4 py-2 text-sm text-ink hover:bg-gold/10 hover:text-gold-dark cursor-pointer transition-colors"
                  >
                    {s}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
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
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-ink/10 hover:border-gold-soft/30 transition-all cursor-default"
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
