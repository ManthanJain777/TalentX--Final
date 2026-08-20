import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const EmployerProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({
    id: id || 'proj-01',
    title: 'Autonomous Drone Vector Path Optimization',
    candidate: 'Alex Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    contractAddress: '0x9F41C24401AA9427e1fB1187C17a421885bc41A9',
    totalBudget: '₹19.20L',
    fundedInEscrow: '₹19.20L',
    releasedPaid: '₹9.60L',
    milestones: [
      {
        number: 1,
        title: 'Algorithmic 3D Spatial Path Partitioning',
        amount: '₹9.60L',
        status: 'Approved & Released',
        releasedOn: 'Aug 05, 2026',
        deliverableUrl: 'https://github.com/aerovance/autonomy-core/pull/72',
        proofTx: '0x88f12a...90bc'
      },
      {
        number: 2,
        title: 'Multi-Agent Swarm Latency < 12ms',
        amount: '₹5.20L',
        status: 'Submitted for Review',
        dueDate: 'Aug 24, 2026',
        deliverableUrl: 'https://github.com/aerovance/autonomy-core/pull/88',
        testPassRate: '100% (48/48 tests passed, 8.4ms measured latency)'
      },
      {
        number: 3,
        title: 'Field Flight Sim Stress Test & Documentation',
        amount: '₹4.40L',
        status: 'Upcoming',
        dueDate: 'Sep 15, 2026',
        deliverableUrl: 'Pending previous milestone'
      }
    ]
  });

  const handleApprove = () => {
    setProject(prev => ({
      ...prev,
      releasedPaid: '₹14.80L',
      milestones: prev.milestones.map((m, i) => i === 1 ? { ...m, status: 'Approved & Released' } : m)
    }));

    toast.success('Milestone 2 Approved! ₹5.20L released from escrow to candidate wallet.', {
      style: { background: '#1A1A2E', color: '#FFF', border: '1px solid #10B981' },
      icon: '💸'
    });
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/employer/projects')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Milestone Escrow
      </button>

      {/* Contract Header */}
      <GlassCard className="p-6 sm:p-8 border-purple-500/40 shadow-[0_0_50px_rgba(94,14,215,0.15)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={project.candidateAvatar}
              alt={project.candidate}
              className="w-14 h-14 rounded-2xl object-cover border border-purple-500/40"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-mono text-purple-300 font-bold">Hired: {project.candidate}</span>
                <span className="text-white/40">•</span>
                <Badge variant="success" size="sm" dot>Escrow Vault Funded</Badge>
              </div>
              <h1 className="text-2xl font-black text-white">{project.title}</h1>
              <p className="text-xs font-mono text-white/50 mt-1">
                Smart Contract: <span className="text-purple-300">{project.contractAddress}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={MessageSquare}
              onClick={() => navigate('/employer/messages')}
            >
              Message Engineer
            </Button>
          </div>
        </div>

        {/* Financial Escrow Breakdown */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-white/[0.02]">
            <p className="text-[10px] text-white/40 uppercase font-mono">Total Budget</p>
            <span className="text-xl font-bold text-white mt-1 block">{project.totalBudget}</span>
          </div>
          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20">
            <p className="text-[10px] text-purple-300 uppercase font-mono">Funded in Escrow</p>
            <span className="text-xl font-bold text-purple-300 mt-1 block">{project.fundedInEscrow}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
            <p className="text-[10px] text-emerald-400 uppercase font-mono">Released to Candidate</p>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">{project.releasedPaid}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02]">
            <p className="text-[10px] text-white/40 uppercase font-mono">Remaining Locked</p>
            <span className="text-xl font-bold text-white mt-1 block">₹4.40L</span>
          </div>
        </div>
      </GlassCard>

      {/* Milestone Review Schedule */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-purple-400" /> Milestone Review & Authorization
        </h2>

        <div className="space-y-4">
          {project.milestones.map((m) => (
            <GlassCard
              key={m.number}
              className={`p-6 transition-all ${
                m.status === 'Submitted for Review' ? 'border-purple-500/50 bg-purple-950/25 shadow-[0_0_30px_rgba(94,14,215,0.15)]' :
                m.status === 'Approved & Released' ? 'border-emerald-500/30 bg-emerald-950/10' :
                'border-white/[0.06] opacity-70'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-purple-300 font-bold">Milestone #{m.number}</span>
                    <Badge variant={m.status === 'Approved & Released' ? 'success' : m.status === 'Submitted for Review' ? 'warning' : 'neutral'} size="sm">
                      {m.status}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-white">{m.title}</h3>
                  <a
                    href="#pr"
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> {m.deliverableUrl}
                  </a>
                  {m.testPassRate && (
                    <span className="inline-block text-xs text-emerald-400 font-mono mt-1">
                      ✓ CI Benchmark: {m.testPassRate}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <span className="text-base font-black text-emerald-400 font-mono">{m.amount}</span>

                  {m.status === 'Submitted for Review' && (
                    <Button
                      variant="glow"
                      size="sm"
                      icon={Check}
                      onClick={handleApprove}
                    >
                      Approve & Release {m.amount}
                    </Button>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerProjectDetails;
export { EmployerProjectDetails };
