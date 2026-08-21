import React, { useState } from 'react';
import { Briefcase, GraduationCap, Plus, Trash2 } from 'lucide-react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import GlassCard from '../../common/GlassCard';

const CareerHistoryManager = ({ experience, education, updateExperience, updateEducation }) => {
  const [expList, setExpList] = useState(experience || []);
  const [eduList, setEduList] = useState(education || []);

  const [isAddingExp, setIsAddingExp] = useState(false);
  const [expForm, setExpForm] = useState({ company: '', role: '', startDate: '', endDate: '', description: '' });

  const [isAddingEdu, setIsAddingEdu] = useState(false);
  const [eduForm, setEduForm] = useState({ institution: '', degree: '', year: '' });

  const handleAddExperience = () => {
    if (expForm.company && expForm.role) {
      const updated = [...expList, expForm];
      setExpList(updated);
      updateExperience(updated);
      setExpForm({ company: '', role: '', startDate: '', endDate: '', description: '' });
      setIsAddingExp(false);
    }
  };

  const removeExperience = (index) => {
    const updated = expList.filter((_, i) => i !== index);
    setExpList(updated);
    updateExperience(updated);
  };

  const handleAddEducation = () => {
    if (eduForm.institution && eduForm.degree) {
      const updated = [...eduList, eduForm];
      setEduList(updated);
      updateEducation(updated);
      setEduForm({ institution: '', degree: '', year: '' });
      setIsAddingEdu(false);
    }
  };

  const removeEducation = (index) => {
    const updated = eduList.filter((_, i) => i !== index);
    setEduList(updated);
    updateEducation(updated);
  };

  return (
    <div className="space-y-6">
      {/* Experience Section */}
      <GlassCard className="p-6 border-cover/15 shadow-sm space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gold" />
            <h3 className="font-bold font-display text-cover text-lg tracking-tight">Experience</h3>
          </div>
          {!isAddingExp && (
            <Button onClick={() => setIsAddingExp(true)} size="sm" variant="outline" icon={Plus}>
              Add Role
            </Button>
          )}
        </div>

        {expList.length === 0 && !isAddingExp && (
          <div className="text-center p-6 bg-cover/5 rounded-xl border border-dashed border-cover/20 text-ink-soft text-sm">
            No experience added yet. Showcase your work history.
          </div>
        )}

        {expList.map((exp, index) => (
          <div key={index} className="p-4 bg-white/50 border border-cover/10 rounded-xl flex justify-between items-start">
            <div>
              <h4 className="font-bold text-cover text-sm">{exp.role}</h4>
              <p className="text-xs text-ink-soft">{exp.company} • {exp.startDate} - {exp.endDate || 'Present'}</p>
              {exp.description && <p className="text-xs text-ink mt-2">{exp.description}</p>}
            </div>
            <button onClick={() => removeExperience(index)} className="text-risk/70 hover:text-risk p-1 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {isAddingExp && (
          <div className="p-4 border border-cover/20 rounded-xl space-y-3 bg-white/30">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Role / Title"
                value={expForm.role}
                onChange={e => setExpForm({ ...expForm, role: e.target.value })}
                placeholder="Senior Engineer"
              />
              <Input
                label="Company"
                value={expForm.company}
                onChange={e => setExpForm({ ...expForm, company: e.target.value })}
                placeholder="Tech Corp"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Start Date"
                value={expForm.startDate}
                onChange={e => setExpForm({ ...expForm, startDate: e.target.value })}
                placeholder="Jan 2020"
              />
              <Input
                label="End Date"
                value={expForm.endDate}
                onChange={e => setExpForm({ ...expForm, endDate: e.target.value })}
                placeholder="Present"
              />
            </div>
            <Input
              label="Description"
              value={expForm.description}
              onChange={e => setExpForm({ ...expForm, description: e.target.value })}
              placeholder="Led frontend architecture..."
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button onClick={() => setIsAddingExp(false)} size="sm" variant="ghost">Cancel</Button>
              <Button onClick={handleAddExperience} size="sm" variant="gold">Save Role</Button>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Education Section */}
      <GlassCard className="p-6 border-cover/15 shadow-sm space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-gold" />
            <h3 className="font-bold font-display text-cover text-lg tracking-tight">Education</h3>
          </div>
          {!isAddingEdu && (
            <Button onClick={() => setIsAddingEdu(true)} size="sm" variant="outline" icon={Plus}>
              Add Education
            </Button>
          )}
        </div>

        {eduList.length === 0 && !isAddingEdu && (
          <div className="text-center p-6 bg-cover/5 rounded-xl border border-dashed border-cover/20 text-ink-soft text-sm">
            No education added yet.
          </div>
        )}

        {eduList.map((edu, index) => (
          <div key={index} className="p-4 bg-white/50 border border-cover/10 rounded-xl flex justify-between items-center">
            <div>
              <h4 className="font-bold text-cover text-sm">{edu.degree}</h4>
              <p className="text-xs text-ink-soft">{edu.institution} • {edu.year}</p>
            </div>
            <button onClick={() => removeEducation(index)} className="text-risk/70 hover:text-risk p-1 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {isAddingEdu && (
          <div className="p-4 border border-cover/20 rounded-xl space-y-3 bg-white/30">
            <Input
              label="Institution"
              value={eduForm.institution}
              onChange={e => setEduForm({ ...eduForm, institution: e.target.value })}
              placeholder="University of Technology"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Degree / Certificate"
                value={eduForm.degree}
                onChange={e => setEduForm({ ...eduForm, degree: e.target.value })}
                placeholder="B.S. Computer Science"
              />
              <Input
                label="Year Completed"
                value={eduForm.year}
                onChange={e => setEduForm({ ...eduForm, year: e.target.value })}
                placeholder="2022"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button onClick={() => setIsAddingEdu(false)} size="sm" variant="ghost">Cancel</Button>
              <Button onClick={handleAddEducation} size="sm" variant="gold">Save Education</Button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default CareerHistoryManager;
