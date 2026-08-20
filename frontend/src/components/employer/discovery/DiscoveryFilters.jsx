import React, { useState } from 'react';
import { Search, MapPin, SlidersHorizontal, Briefcase } from 'lucide-react';

const DiscoveryFilters = ({ filters, setFilters }) => {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      if (!filters.skills.includes(skillInput.trim())) {
        setFilters({ ...filters, skills: [...filters.skills, skillInput.trim()] });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <div className="glass-2 p-6 space-y-6 sticky top-24">
      <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
        <SlidersHorizontal className="w-5 h-5 text-gold" />
        <h3 className="font-display font-semibold text-lg text-ink">Filters</h3>
      </div>

      {/* Role / Keyword Search */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-ink-faint">Role or Keyword</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
          <input
            type="text"
            placeholder="e.g. Backend Engineer"
            value={filters.keyword}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
            className="w-full bg-white/50 border border-cover/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold/30 transition-colors"
          />
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-ink-faint">Skills</label>
        <input
          type="text"
          placeholder="Type skill and press Enter"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleAddSkill}
          className="w-full bg-white/50 border border-cover/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold/30 transition-colors"
        />
        <div className="flex flex-wrap gap-1.5 pt-2">
          {filters.skills.map(skill => (
            <span key={skill} className="px-2.5 py-1 rounded-full bg-ink/5 border border-ink/10 text-[11px] font-mono text-ink flex items-center gap-1.5 group cursor-default">
              {skill}
              <button 
                onClick={() => removeSkill(skill)}
                className="text-ink-faint group-hover:text-ink transition-colors"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-ink-faint">Location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
          <input
            type="text"
            placeholder="City, Country or Remote"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full bg-white/50 border border-cover/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold/30 transition-colors"
          />
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-mono text-ink-faint flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            Experience
          </label>
          <span className="text-xs font-mono text-gold">{filters.experience} yrs+</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={filters.experience}
          onChange={(e) => setFilters({ ...filters, experience: parseInt(e.target.value) })}
          className="w-full accent-gold h-1.5 bg-ink/10 rounded-full appearance-none outline-none"
        />
      </div>

      {/* Availability Toggle */}
      <div className="flex items-center justify-between pt-2 border-t border-ink/5">
        <label className="text-sm font-medium text-ink cursor-pointer">Available Now</label>
        <button
          onClick={() => setFilters({ ...filters, availableNow: !filters.availableNow })}
          className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
            filters.availableNow ? 'bg-gold' : 'bg-ink/20'
          }`}
        >
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-md ${
            filters.availableNow ? 'left-6' : 'left-1'
          }`} />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button 
          onClick={() => setFilters({
            keyword: '', skills: [], location: '', experience: 0, availableNow: false
          })}
          className="flex-1 py-2.5 rounded-xl border border-ink/10 text-ink hover:bg-ink/5 transition-colors text-sm font-medium"
        >
          Reset
        </button>
        <button className="flex-1 py-2.5 rounded-xl bg-gold text-white hover:bg-gold-soft transition-colors text-sm font-medium shadow-lg shadow-gold/20">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default DiscoveryFilters;
