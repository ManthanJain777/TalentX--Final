import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import GlassCard from '../ui/GlassCard';
import Input, { Select, Textarea } from '../ui/Input';
import Button from '../ui/Button';
import { SpotlightCard } from '../react-bits/SpotlightCard';


const NewOpportunity = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');

  const [budget, setBudget] = useState('₹36L');
  const [duration, setDuration] = useState('3 Months');
  const [location, setLocation] = useState('Remote (Global)');
  const [description, setDescription] = useState('');

  // Skills & Proof
  const [skills, setSkills] = useState(['PyTorch', 'Distributed Systems', 'CUDA']);
  const [newSkill, setNewSkill] = useState('');
  const [minProofLevel, setMinProofLevel] = useState('L3 Verifiable (Top 5%)');

  // Milestones
  const [milestones, ] = useState([
    { title: 'Milestone 1: Architecture & Baseline Benchmarks', amount: '₹12L', weeks: 3 },
    { title: 'Milestone 2: High-throughput Kernel Optimization', amount: '₹16L', weeks: 4 },
    { title: 'Milestone 3: Production Validation & Handover', amount: '₹8L', weeks: 2 },
  ]);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !description || !budget) {
      toast.error('Please fill in title, description, and budget');
      return;
    }
    setLoading(true);
    try {
      // Clean budget string to number (basic parsing)
      const numericBudget = parseFloat(budget.replace(/[^0-9.]/g, '')) * (budget.includes('L') || budget.includes('Cr') ? 100000 : 1);
      
      await api.post('/projects', {
        title,
        description,
        budget: numericBudget || 3600000
      });

      toast.success('Project created! Smart contract initialized.', {
        style: { background: '#1A1A2E', color: '#FFF', border: '1px solid #5E0ED7' },
        icon: '🚀'
      });
      navigate('/employer/projects');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Wizard Header */}
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-purple-400" /> Post Verified Opportunity
        </h2>
        <p className="text-xs text-white/50 mt-1">
          Create high-impact milestone contracts verified by cryptographic proof and neural vector matching.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {[
          { num: 1, label: 'Role Basics' },
          { num: 2, label: 'Proof Criteria' },
          { num: 3, label: 'Milestones' },
          { num: 4, label: 'Escrow Vault' }
        ].map((s) => (
          <div
            key={s.num}
            className={`p-3 rounded-xl border text-center transition-all ${
              step === s.num
                ? 'bg-purple-950/40 border-[#5E0ED7] shadow-[0_0_15px_rgba(94,14,215,0.3)]'
                : step > s.num
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'
                : 'bg-white/[0.02] border-white/10 text-white/40'
            }`}
          >
            <span className="text-[10px] uppercase font-mono block">Step {s.num}</span>
            <span className="text-xs font-bold text-white block mt-0.5 truncate">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Step Form Container */}
      <SpotlightCard spotlightColor="rgba(199, 168, 104, 0.1)" className="p-6 sm:p-10 border-purple-500/30">
        {step === 1 && (
          <div className="space-y-4 animate-fade-up">
            <h3 className="text-lg font-bold text-white mb-2">Step 1: Role Overview & Engagement Model</h3>

            <Input
              label="Role Title"
              placeholder="e.g. Staff Distributed AI Systems Architect"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Total Contract Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
              <Input
                label="Estimated Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
              <Input
                label="Location / Timezone"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <Textarea
              label="Requisition Description & Problem Statement"
              rows={4}
              placeholder="Describe the architectural challenge, systems scale, and business impact..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-end pt-4">
              <Button
                variant="glow"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => setStep(2)}
              >
                Proceed to Proof Criteria
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-up">
            <h3 className="text-lg font-bold text-white mb-2">Step 2: Cryptographic Proof & Skill Requirements</h3>

            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Required Skills (Vector Match Weight)</label>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Add skill tag (e.g. Rust, PyTorch, CUDA)..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button variant="secondary" size="sm" onClick={addSkill}>
                  Add Tag
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-300 flex items-center gap-2"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-white/40 hover:text-rose-400"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <Select
              label="Minimum Verifiable Proof Tier"
              value={minProofLevel}
              onChange={(e) => setMinProofLevel(e.target.value)}
              options={[
                { value: 'L3 Verifiable (Top 1%)', label: 'L3 Verifiable (Top 1% - Production Benchmarks Only)' },
                { value: 'L3 Verifiable (Top 5%)', label: 'L3 Verifiable (Top 5% - Verified Code PRs)' },
                { value: 'L2 Cryptographic Proof', label: 'L2 Cryptographic Proof (Formal Verification)' },
              ]}
            />

            <div className="flex justify-between pt-4">
              <Button variant="ghost" size="md" icon={ArrowLeft} onClick={() => setStep(1)}>
                Back
              </Button>
              <Button variant="glow" size="md" icon={ArrowRight} iconPosition="right" onClick={() => setStep(3)}>
                Configure Milestones
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-up">
            <h3 className="text-lg font-bold text-white mb-2">Step 3: Milestone Breakdown & Escrow Allocations</h3>
            <p className="text-xs text-white/60 -mt-3">
              Define concrete deliverables for automated escrow release upon passing tests.
            </p>

            <div className="space-y-3">
              {milestones.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#5E0ED7] text-white text-xs font-bold flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-white">{m.title}</span>
                  </div>
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <span className="text-sm font-bold text-emerald-400 font-mono">{m.amount}</span>
                    <span className="text-xs text-white/40">{m.weeks} Weeks</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="ghost" size="md" icon={ArrowLeft} onClick={() => setStep(2)}>
                Back
              </Button>
              <Button variant="glow" size="md" icon={ArrowRight} iconPosition="right" onClick={() => setStep(4)}>
                Review & Fund Escrow
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-up">
            <h3 className="text-lg font-bold text-white mb-2">Step 4: Authorize Escrow Funding</h3>

            <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/70">Total Opportunity Budget</span>
                <span className="text-2xl font-black text-white">{budget}</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.08] pt-3">
                <span className="text-xs text-white/70">Pre-Funded Escrow Smart Contract</span>
                <span className="text-sm font-mono text-emerald-400 font-bold">{budget} USDC</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs text-white/50">
                <span>Protocol Fee (0% for Employers)</span>
                <span>₹0</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white/70 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Funds will be locked inside an automated smart contract. You only release milestone disbursements when candidate deliverable passes your test suites.
              </span>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="ghost" size="md" icon={ArrowLeft} onClick={() => setStep(3)}>
                Back
              </Button>
              <Button
                variant="glow"
                size="lg"
                loading={loading}
                icon={Sparkles}
                iconPosition="right"
                onClick={handlePublish}
              >
                Publish Opportunity & Escrow
              </Button>
            </div>
          </div>
        )}
      </SpotlightCard>
    </div>
  );
};

export default NewOpportunity;
export { NewOpportunity };
