import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  MessageSquare,
  AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const CandidateProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = {
    id: id || 'proj-01',
    title: 'Autonomous Drone Vector Path Optimization',
    client: 'AeroVance Autonomous',
    clientContact: 'Sarah Jenkins (VP of Engineering)',
    contractAddress: '0x9F41C24401AA9427e1fB1187C17a421885bc41A9',
    totalBudget: '₹19.20L',
    fundedInEscrow: '₹19.20L',
    releasedPaid: '₹9.60L',
    startDate: 'Jul 20, 2026',
    estimatedEnd: 'Sep 15, 2026',
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
        status: 'In Progress',
        dueDate: 'Aug 24, 2026',
        deliverableUrl: 'Working on branch feat/swarm-latency'
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
  };

  const handleDispute = () => {
    toast.error('Escrow dispute ticket generated. Redirecting to arbitration chamber...', {
      style: { background: '#1A1A2E', color: '#FFF', border: '1px solid #EF4444' }
    });
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/candidate/projects')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Milestone Contracts
      </button>

      {/* Contract Header */}
      <GlassCard className="p-6 sm:p-8 border-purple-500/40 shadow-[0_0_50px_rgba(94,14,215,0.15)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-xs font-mono text-purple-300 font-bold">{project.client}</span>
              <span className="text-white/40">•</span>
              <Badge variant="success" size="sm" dot>
                100% Escrow Funded
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{project.title}</h1>
            <p className="text-xs font-mono text-white/50 mt-2">
              Smart Contract: <span className="text-purple-300">{project.contractAddress}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              icon={MessageSquare}
              onClick={() => navigate('/candidate/messages')}
            >
              Message Client
            </Button>
            <Button
              variant="danger"
              size="md"
              icon={AlertTriangle}
              onClick={handleDispute}
            >
              Raise Dispute
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
            <p className="text-[10px] text-emerald-400 uppercase font-mono">Released to You</p>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">{project.releasedPaid}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02]">
            <p className="text-[10px] text-white/40 uppercase font-mono">Remaining Locked</p>
            <span className="text-xl font-bold text-white mt-1 block">₹9.60L</span>
          </div>
        </div>
      </GlassCard>

      {/* Milestones Progression */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-purple-400" /> Milestone Execution Schedule
        </h2>

        <div className="space-y-4">
          {project.milestones.map((m) => (
            <GlassCard
              key={m.number}
              className={`p-6 transition-all ${
                m.status === 'Approved & Released' ? 'border-emerald-500/30 bg-emerald-950/10' :
                m.status === 'In Progress' ? 'border-purple-500/50 bg-purple-950/20' :
                'border-white/[0.06] opacity-70'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    m.status === 'Approved & Released' ? 'bg-emerald-500 text-white' :
                    m.status === 'In Progress' ? 'bg-[#5E0ED7] text-white shadow-[0_0_15px_rgba(94,14,215,0.4)]' :
                    'bg-white/10 text-white/50'
                  }`}>
                    {m.status === 'Approved & Released' ? <CheckCircle2 className="w-5 h-5" /> : `#${m.number}`}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">{m.title}</h3>
                    <p className="text-xs text-white/60 mt-0.5">
                      {m.deliverableUrl}
                    </p>
                    {m.proofTx && (
                      <span className="inline-block text-[11px] font-mono text-purple-300 mt-1">
                        Release Proof Tx: {m.proofTx}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-base font-black text-emerald-400 font-mono">{m.amount}</span>
                    <span className="block text-[10px] text-white/40">{m.dueDate || `Released ${m.releasedOn}`}</span>
                  </div>

                  <Badge
                    variant={m.status === 'Approved & Released' ? 'success' : m.status === 'In Progress' ? 'primary' : 'neutral'}
                    size="sm"
                  >
                    {m.status}
                  </Badge>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateProjectDetails;
export { CandidateProjectDetails };
