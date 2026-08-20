import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Plus, Trash2, ArrowLeft, Save } from 'lucide-react';
import api from '../../api/api';
import GlassCard from '../common/GlassCard';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import Loader from '../ui/Loader';
import toast from 'react-hot-toast';

const PassportEdit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [headline, setHeadline] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState('Advanced');

  useEffect(() => {
    const fetchPassport = async () => {
      try {
        setLoading(true);
        const res = await api.get('/passports/me');
        if (res.data) {
          setHeadline(res.data.headline || '');
          setLocation(res.data.location || '');
          setSummary(res.data.summary || '');
          setSkills(res.data.skills || []);
        }
      } catch (e) {
        console.error('Error loading passport:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPassport();
  }, []);

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    setSkills([...skills, { name: newSkillName.trim(), proficiency: newSkillProficiency, verified: true }]);
    setNewSkillName('');
    toast.success('Skill added');
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/passports/me', {
        headline,
        location,
        summary,
        skills,
        profileCompleteness: Math.min(100, Math.max(10, skills.length * 20 + 20)),
      });
      toast.success('Talent Passport updated successfully in MongoDB!');
      navigate('/candidate/passport');
    } catch (err) {
      toast.error('Failed to update passport');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/candidate/passport"
            className="p-2 rounded-xl bg-white hover:bg-cover/5 border border-cover/15 text-cover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="font-display text-2xl font-bold text-cover tracking-tight">
              Edit Talent Passport
            </h2>
            <p className="text-xs text-ink-soft">
              Update your verified evidence and skills saved to your real database account
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleSave}
          variant="primary"
          size="sm"
          icon={Save}
          loading={saving}
        >
          Save Changes
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Core Identity */}
        <GlassCard className="p-6 bg-white/90 space-y-4">
          <h3 className="font-bold text-sm text-cover font-sans border-b border-cover/10 pb-2">
            1. Core Identity &amp; Headline
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Professional Headline"
              id="headline"
              value={headline}
              placeholder="e.g. Senior Full-Stack Engineer"
              onChange={(e) => setHeadline(e.target.value)}
              required
            />
            <Input
              label="Location"
              id="location"
              value={location}
              placeholder="e.g. Remote / San Francisco, CA"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <Textarea
            label="Executive Summary"
            id="summary"
            rows={3}
            value={summary}
            placeholder="Describe your technical background and areas of expertise..."
            onChange={(e) => setSummary(e.target.value)}
          />
        </GlassCard>

        {/* Skills & Evidence Proof */}
        <GlassCard className="p-6 bg-white/90 space-y-4">
          <h3 className="font-bold text-sm text-cover font-sans border-b border-cover/10 pb-2">
            2. Verified Skills &amp; Capabilities ({skills.length})
          </h3>

          {/* Current Skills */}
          {skills.length === 0 ? (
            <p className="text-xs text-ink-soft italic">No skills added yet. Add your first skill below.</p>
          ) : (
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div
                  key={skill.name || index}
                  className="flex items-center justify-between p-3 rounded-xl bg-cover/5 border border-cover/10"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-verified" />
                    <span className="font-bold text-xs text-cover font-sans">{skill.name}</span>
                    <span className="font-mono text-[10px] font-bold bg-verified/15 text-verified px-2 py-0.5 rounded">
                      {skill.proficiency || 'Verified'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="p-1 text-ink-soft hover:text-risk transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Skill Row */}
          <div className="pt-3 border-t border-cover/10 flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="e.g. Java, React, MongoDB, Kubernetes..."
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <select
                value={newSkillProficiency}
                onChange={(e) => setNewSkillProficiency(e.target.value)}
                className="w-full h-full px-3 py-2 text-xs border border-cover/15 rounded-xl bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <Button
              type="button"
              onClick={handleAddSkill}
              variant="ghost"
              size="md"
              icon={Plus}
            >
              Add Skill
            </Button>
          </div>
        </GlassCard>

        <div className="flex justify-end gap-3 pt-2">
          <Link to="/candidate/passport" className="btn-outline text-xs px-5 py-2.5">
            Cancel
          </Link>
          <Button type="submit" variant="primary" size="md" icon={Save} loading={saving}>
            Save Passport
          </Button>
        </div>

      </form>

    </div>
  );
};

export default PassportEdit;
export { PassportEdit };
