import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Zap } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import toast from 'react-hot-toast';
import { SpotlightCard } from '../react-bits/SpotlightCard';

const OpportunityNew = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('₹1.12 Cr - ₹1.36 Cr / yr');
  const [requiredSkills, setRequiredSkills] = useState('Java 21 / Spring Boot, Apache Kafka, Distributed Lock');
  const [preferredSkills, setPreferredSkills] = useState('PostgreSQL Sharding, AWS SA Pro');
  const [bountyAmount, setBountyAmount] = useState('₹28K');
  const [challengeTitle, setChallengeTitle] = useState('Build Kafka Event Consumer Microservice');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Opportunity posted! Algorithm is calculating deterministic matches now.', {
      icon: '🚀',
    });
    setTimeout(() => {
      navigate('/employer/opportunities');
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/employer/opportunities"
            className="p-2 rounded-xl bg-white hover:bg-cover/5 border border-cover/15 text-cover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cover tracking-tight">
              Post New Opportunity
            </h2>
            <p className="text-xs text-ink-soft">
              Configure deterministic requirements, milestone scope, and optional paid challenges
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Position & Scope */}
        <SpotlightCard spotlightColor="rgba(199, 168, 104, 0.1)" className="p-6 bg-white/90 space-y-4">
          <h3 className="font-bold text-sm text-cover font-sans border-b border-cover/10 pb-2">
            1. Role Details &amp; Budget
          </h3>

          <Input
            label="Opportunity / Role Title"
            id="title"
            placeholder="e.g. Senior Backend Infrastructure Engineer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Compensation / Budget Range"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
            <Select
              label="Engagement Type"
              id="type"
              options={[
                { value: 'fulltime', label: 'Full-time Governed Contract' },
                { value: 'milestone', label: 'Milestone-based Project (Escrow)' },
                { value: 'consulting', label: 'Specialist Advisory ($/hr)' },
              ]}
            />
          </div>

          <Textarea
            label="Technical Scope & Deliverable Overview"
            id="description"
            rows={4}
            placeholder="Describe the production challenges, architecture stack, and deliverable milestones..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </SpotlightCard>

        {/* Step 2: Skill Specifications */}
        <SpotlightCard spotlightColor="rgba(199, 168, 104, 0.1)" className="p-6 bg-white/90 space-y-4">
          <h3 className="font-bold text-sm text-cover font-sans border-b border-cover/10 pb-2">
            2. Deterministic Matching Weights
          </h3>

          <Input
            label="Required Verified Skills (Comma separated)"
            id="reqSkills"
            value={requiredSkills}
            onChange={(e) => setRequiredSkills(e.target.value)}
            helperText="Matches will prioritize candidates with verified GitHub PRs or benchmark tests in these skills."
            required
          />

          <Input
            label="Preferred Secondary Skills & Certifications"
            id="prefSkills"
            value={preferredSkills}
            onChange={(e) => setPreferredSkills(e.target.value)}
          />
        </SpotlightCard>

        {/* Step 3: Paid Employer Challenge */}
        <SpotlightCard spotlightColor="rgba(199, 168, 104, 0.1)" className="p-6 bg-gradient-to-br from-gold/10 via-white to-page border-gold/35 space-y-4">
          <div className="flex items-center gap-2 border-b border-gold-dark/20 pb-2">
            <Zap className="w-4 h-4 text-gold-dark" />
            <h3 className="font-bold text-sm text-cover font-sans">
              3. Commission a Paid Employer Challenge (Optional)
            </h3>
          </div>

          <p className="text-xs text-ink-soft leading-relaxed">
            Attach a 3-hour micro-challenge (₹8K–₹40K paid bounty). Candidates can complete it to prove their skills immediately with 100% escrow protection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Challenge Title"
              id="challengeTitle"
              value={challengeTitle}
              onChange={(e) => setChallengeTitle(e.target.value)}
            />
            <Input
              label="Paid Bounty Amount ($)"
              id="bountyAmount"
              value={bountyAmount}
              onChange={(e) => setBountyAmount(e.target.value)}
            />
          </div>
        </SpotlightCard>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Link to="/employer/opportunities" className="btn-outline text-xs px-5 py-2.5">
            Cancel
          </Link>
          <Button type="submit" variant="primary" size="md" icon={Save}>
            Publish Opportunity &amp; Run Match
          </Button>
        </div>

      </form>

    </div>
  );
};

export default OpportunityNew;
export { OpportunityNew };
