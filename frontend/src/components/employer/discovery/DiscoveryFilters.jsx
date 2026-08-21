import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, Briefcase, Sparkles, X } from 'lucide-react';

import { AnimatePresence, motion } from 'framer-motion';

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

const DiscoveryFilters = ({ filters, setFilters }) => {
  const [skillInput, setSkillInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSkillInputChange = (e) => {
    const val = e.target.value;
    setSkillInput(val);
    if (val.trim()) {
      const filtered = predefinedSkills.filter(s => s.toLowerCase().includes(val.toLowerCase()) && !filters.skills.includes(s));
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (skillName) => {
    if (!filters.skills.includes(skillName)) {
      setFilters({ ...filters, skills: [...filters.skills, skillName] });
    }
    setSkillInput('');
    setShowSuggestions(false);
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      if (!filters.skills.includes(skillInput.trim())) {
        setFilters({ ...filters, skills: [...filters.skills, skillInput.trim()] });
      }
      setSkillInput('');
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const resetFilters = () => {
    setFilters({
      keyword: '',
      skills: [],
      location: '',
      experience: 0,
      availableNow: false,
    });
  };

  return (
    <div className="p-6 sm:p-7 space-y-6 sticky top-24 rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_12px_36px_rgba(20,37,68,0.06)]">
      <div className="flex items-center justify-between border-b border-[#142544]/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#142544]/5 flex items-center justify-center text-[#C7A868]">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <h3 className="font-sans font-bold text-lg text-[#142544]">Filters</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-[#8B6B23] hover:text-[#142544] transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* Role / Keyword Search */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#142544] uppercase tracking-wider">Role or Keyword</label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#93979F]" />
          <input
            type="text"
            placeholder="e.g. Backend Engineer"
            value={filters.keyword}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            className="w-full bg-[#FAF7F0] border border-[#142544]/15 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-[#142544] placeholder:text-[#93979F] focus:outline-none focus:border-[#C7A868] focus:ring-2 focus:ring-[#C7A868]/20 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#142544] uppercase tracking-wider">Skills</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Type skill & press Enter"
            value={skillInput}
            onChange={handleSkillInputChange}
            onFocus={() => {
              if (skillInput.trim() && suggestions.length > 0) setShowSuggestions(true);
            }}
            onKeyDown={handleAddSkill}
            className="w-full bg-[#FAF7F0] border border-[#142544]/15 rounded-xl px-4 py-2.5 text-sm font-medium text-[#142544] placeholder:text-[#93979F] focus:outline-none focus:border-[#C7A868] focus:ring-2 focus:ring-[#C7A868]/20 transition-all shadow-xs"
          />
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
        <div className="flex flex-wrap gap-1.5 pt-1">
          {filters.skills.map(skill => (
            <span key={skill} className="px-2.5 py-1 rounded-lg bg-[#FAF7F0] border border-[#C7A868]/30 text-xs font-mono font-semibold text-[#142544] flex items-center gap-1.5 shadow-xs">
              {skill}
              <button 
                onClick={() => removeSkill(skill)}
                className="text-[#93979F] hover:text-[#C0424D] transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#142544] uppercase tracking-wider">Location</label>
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#93979F]" />
          <input
            type="text"
            placeholder="City, Country or Remote"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full bg-[#FAF7F0] border border-[#142544]/15 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-[#142544] placeholder:text-[#93979F] focus:outline-none focus:border-[#C7A868] focus:ring-2 focus:ring-[#C7A868]/20 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-[#142544] uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#C7A868]" />
            Experience
          </label>
          <span className="text-xs font-mono font-bold text-[#8B6B23] bg-[#FAF7F0] px-2 py-0.5 rounded-md border border-[#C7A868]/20">
            {filters.experience} yrs+
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={filters.experience}
          onChange={(e) => setFilters({ ...filters, experience: Number(e.target.value) })}
          className="w-full accent-[#C7A868] cursor-pointer"
        />
      </div>

      {/* Available Immediately Toggle */}
      <div className="pt-3 border-t border-[#142544]/10">
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C7A868]" />
            <span className="text-xs font-bold text-[#142544] uppercase tracking-wider">Available Now</span>
          </div>
          <input
            type="checkbox"
            checked={filters.availableNow}
            onChange={(e) => setFilters({ ...filters, availableNow: e.target.checked })}
            className="w-4 h-4 rounded text-[#C7A868] focus:ring-[#C7A868] border-[#142544]/20 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};

export default DiscoveryFilters;
export { DiscoveryFilters };
