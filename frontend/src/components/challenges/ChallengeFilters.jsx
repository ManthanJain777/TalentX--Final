import React from 'react';
import { Search, Filter } from 'lucide-react';

const availableSkills = ['Java', 'Spring Boot', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'SQL', 'MongoDB', 'GraphQL'];

const ChallengeFilters = ({ filters, setFilters }) => {
  const toggleSkill = (skill) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    setFilters({ ...filters, skills: newSkills });
  };

  return (
    <div className="glass-panel p-4 md:p-6 mb-8 flex flex-col md:flex-row gap-6 md:items-start justify-between">
      {/* Search & Status */}
      <div className="space-y-4 flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
          <input 
            type="text"
            placeholder="Search challenges by title or employer..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full bg-white/50 border border-cover/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Open', 'Closed', 'Completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilters({ ...filters, status: status.toLowerCase() })}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                filters.status === status.toLowerCase() 
                  ? 'bg-ink text-white border-ink' 
                  : 'bg-white/50 text-ink-soft hover:bg-white border-cover/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Filter */}
      <div className="flex-1 max-w-xl">
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-4 h-4 text-ink-soft" />
          <span className="text-xs font-medium text-ink">Filter by Skill</span>
          {filters.skills.length > 0 && (
            <button 
              onClick={() => setFilters({ ...filters, skills: [] })}
              className="ml-auto text-[10px] text-gold hover:underline font-mono"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {availableSkills.map(skill => {
            const isSelected = filters.skills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all border ${
                  isSelected 
                    ? 'bg-gold/10 text-gold border-gold/20' 
                    : 'bg-white/30 text-ink-soft border-ink/5 hover:bg-white hover:border-ink/20'
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChallengeFilters;
