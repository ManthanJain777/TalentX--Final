import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Search, Plus, Calendar, AlertCircle } from 'lucide-react';

const availableSkills = ['Java', 'Spring Boot', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'SQL', 'MongoDB', 'GraphQL'];

const ChallengeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prize: '',
    deadline: '',
    skills: []
  });
  
  const [skillSearch, setSkillSearch] = useState('');

  const toggleSkill = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    } else if (formData.skills.length < 5) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const filteredSkills = availableSkills.filter(s => 
    s.toLowerCase().includes(skillSearch.toLowerCase()) && !formData.skills.includes(s)
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-2 p-6 md:p-8">
      <div className="mb-6 border-b border-ink/5 pb-4">
        <h3 className="font-display font-semibold text-xl text-ink">Challenge Details</h3>
        <p className="text-sm text-ink-soft">Define the task, requirements, and reward.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Challenge Title</label>
          <input 
            type="text"
            placeholder="e.g. Build a REST API with Spring Boot"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            className="w-full bg-white/50 border border-cover/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Description & Requirements</label>
          <textarea 
            placeholder="Describe the task, expected outcomes, and any specific constraints..."
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full h-32 bg-white/50 border border-cover/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-colors resize-none custom-scrollbar"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Required Skills (Max 5)</label>
          
          {/* Selected Skills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.skills.map(skill => (
              <span key={skill} className="px-3 py-1 rounded-lg bg-gold/10 border border-gold/20 text-gold text-xs font-medium flex items-center gap-1">
                {skill}
                <button onClick={() => toggleSkill(skill)} className="hover:text-gold-soft">&times;</button>
              </span>
            ))}
          </div>
          
          {/* Skill Search */}
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
            <input 
              type="text"
              placeholder="Search and add skills..."
              value={skillSearch}
              onChange={e => setSkillSearch(e.target.value)}
              disabled={formData.skills.length >= 5}
              className="w-full bg-white/50 border border-cover/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-50"
            />
          </div>
          
          {/* Skill Suggestions */}
          {skillSearch && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filteredSkills.slice(0, 5).map(skill => (
                <button 
                  key={skill}
                  onClick={() => { toggleSkill(skill); setSkillSearch(''); }}
                  className="px-3 py-1 rounded-lg bg-white/40 border border-ink/5 text-ink-soft hover:text-ink hover:border-ink/20 text-xs transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> {skill}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Prize Amount</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gold">
                <IndianRupee className="w-4 h-4" />
              </div>
              <input 
                type="number"
                placeholder="250"
                value={formData.prize}
                onChange={e => setFormData({...formData, prize: e.target.value})}
                className="w-full bg-white/50 border border-cover/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold/50 transition-colors font-mono"
              />
            </div>
            <p className="text-[10px] text-ink-soft mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Amount will be held in escrow upon publishing
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Submission Deadline</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint">
                <Calendar className="w-4 h-4" />
              </div>
              <input 
                type="datetime-local"
                value={formData.deadline}
                onChange={e => setFormData({...formData, deadline: e.target.value})}
                className="w-full bg-white/50 border border-cover/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeForm;
