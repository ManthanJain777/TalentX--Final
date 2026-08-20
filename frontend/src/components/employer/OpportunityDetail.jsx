import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import MatchScore from '../common/MatchScore';
import StatusBadge from '../common/StatusBadge';
import Avatar from '../common/Avatar';
import toast from 'react-hot-toast';

const OpportunityDetail = () => {
  const matchedCandidates = [
    {
      id: 'cand-01',
      name: 'Anika R.',
      title: 'Senior Backend Infrastructure Engineer',
      matchScore: 94,
      skills: ['Java 21 / Spring Boot', 'Kafka Event Pipeline', 'PostgreSQL Tuning'],
      rate: '₹10K/hr',
      experience: '6 yrs production',
      status: 'Top Candidate',
      evidenceSummary: '18 merged PRs, 98th %ile lab, AWS SA Pro',
    },
    {
      id: 'cand-02',
      name: 'Dmitri V.',
      title: 'High-Concurrency Systems Architect',
      matchScore: 91,
      skills: ['Spring Boot', 'PostgreSQL Tuning', 'Go'],
      rate: '₹10.80K/hr',
      experience: '8 yrs production',
      status: 'Verified Fit',
      evidenceSummary: '12 merged PRs, 95th %ile lab',
    },
    {
      id: 'cand-03',
      name: 'Maya Lin',
      title: 'Cloud Event Pipeline Engineer',
      matchScore: 88,
      skills: ['Kafka', 'Docker', 'Kubernetes'],
      rate: '₹9.20K/hr',
      experience: '5 yrs production',
      status: 'Strong Fit',
      evidenceSummary: '8 merged PRs, CKA certified',
    },
  ];

  const handleSendInvite = (name) => {
    toast.success(`Invitation & challenge offer sent to ${name}!`);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/employer/opportunities"
            className="p-2 rounded-xl bg-white hover:bg-cover/5 border border-cover/15 text-cover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-ink-soft font-bold">OPPORTUNITY #OPP-2041</span>
              <StatusBadge status="open" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cover tracking-tight">
              High-Throughput Payment Core Architect
            </h2>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="p-4 bg-white/90">
          <span className="text-xs font-mono text-ink-soft uppercase">Total Matched</span>
          <div className="text-2xl font-bold text-cover font-mono mt-0.5">18 Candidates</div>
        </GlassCard>
        <GlassCard className="p-4 bg-white/90">
          <span className="text-xs font-mono text-ink-soft uppercase">Top Match Score</span>
          <div className="text-2xl font-bold text-gold-dark font-mono mt-0.5">94.0% (Anika R.)</div>
        </GlassCard>
        <GlassCard className="p-4 bg-white/90">
          <span className="text-xs font-mono text-ink-soft uppercase">Paid Challenge Bounty</span>
          <div className="text-2xl font-bold text-verified font-mono mt-0.5">₹28K Active</div>
        </GlassCard>
      </div>

      {/* Matched Talent Leaderboard */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold text-cover tracking-tight">
          Deterministic Matched Candidate Leaderboard
        </h3>

        <div className="space-y-4">
          {matchedCandidates.map((cand) => (
            <GlassCard
              key={cand.id}
              className="p-6 bg-white/90 border-cover/15 hover:border-gold/40 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex items-start gap-4 flex-1">
                <Avatar name={cand.name} size="lg" verified={true} />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-cover font-sans">{cand.name}</h4>
                    <span className="font-mono text-xs font-bold text-gold-dark bg-gold/15 px-2 py-0.5 rounded border border-gold/30">
                      {cand.rate}
                    </span>
                    <StatusBadge status={cand.status} />
                  </div>

                  <p className="text-xs font-mono text-ink-soft font-semibold">
                    {cand.title} &bull; {cand.experience}
                  </p>

                  <div className="text-xs font-mono text-[#00876C] bg-verified/10 p-2 rounded-lg border border-verified/25 mt-2">
                    Verified Proof: {cand.evidenceSummary}
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-cover/10 gap-3 shrink-0">
                <MatchScore score={cand.matchScore} size={70} />

                <div className="flex items-center gap-2">
                  <Link
                    to={`/employer/discovery/${cand.id}`}
                    className="btn-ghost text-xs py-2 px-3 font-bold"
                  >
                    View Dossier
                  </Link>
                  <Button
                    type="button"
                    onClick={() => handleSendInvite(cand.name)}
                    variant="primary"
                    size="sm"
                    icon={Send}
                  >
                    Send Invitation
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

    </div>
  );
};

export default OpportunityDetail;
export { OpportunityDetail };
