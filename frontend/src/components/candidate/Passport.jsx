import React, { useState } from 'react';
import {
  ShieldCheck,
  ExternalLink,
  Copy,
  Download,
  Share2,
  GitPullRequest,
  Cpu,
  Lock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import Badge from '../ui/Badge';


const CandidatePassport = () => {
  const { user } = useAuth();

  const [showExportModal, setShowExportModal] = useState(false);

  const passportHash = user?.walletAddress || '0x8F9B73aE825C992bFc71900F351Da1e55093557A';

  const copyHash = () => {
    navigator.clipboard.writeText(passportHash);
    toast.success('Cryptographic Proof Hash to clipboard!', {
      style: {
        background: '#1A1A2E',
        color: '#FFFFFF',
        border: '1px solid #5E0ED7' }
    });
  };

  const verifiedSkills = [
    {
      skill: 'PyTorch / Distributed LLM Inference',
      level: 'L3 Verifiable (Top 1%)',
      proofType: 'Production Model Benchmark',
      score: 99,
      hash: '0x4f12...e81a',
      validatedOn: 'Aug 12, 2026',
      details: 'Optimized 70B parameter tensor-parallel model achieving 124 tok/sec latency under vLLM benchmark.'
    },
    {
      skill: 'Distributed Systems & Raft Consensus',
      level: 'L3 Verifiable (Top 2%)',
      proofType: 'Jepsen Fault Injection Suite',
      score: 97,
      hash: '0x99a1...10c2',
      validatedOn: 'Jul 28, 2026',
      details: 'Zero partition split-brain data loss over 10,000 simulated network partition chaos events.'
    },
    {
      skill: 'React / Next.js Enterprise Architecture',
      level: 'L3 Verifiable (Top 1%)',
      proofType: 'Production PR Audit',
      score: 98,
      hash: '0x7b23...98dd',
      validatedOn: 'Jun 19, 2026',
      details: 'Architected micro-frontend platform handling 4.2M daily active sessions with 99.99% uptime.'
    },
    {
      skill: 'Solidity & EVM Assembly (Yul)',
      level: 'L2 Cryptographic Proof',
      proofType: 'Formal Verification Exam',
      score: 94,
      hash: '0x2c45...33ab',
      validatedOn: 'May 04, 2026',
      details: 'Audited escrow smart contracts securing ₹144 Cr+ GMV with zero vulnerabilities reported by CertiK.'
    }
  ];

  const githubValidations = [
    {
      repo: 'vllm-project/vllm',
      pr: 'PR #4912: PagedAttention CUDA Memory Optimization',
      status: 'Merged to Main',
      date: '2 weeks ago',
      additions: '+842',
      deletions: '-214',
      zkProof: 'ZK-0x892a71f0'
    },
    {
      repo: 'hashicorp/raft',
      pr: 'PR #1204: Quorum Lease Renewal Heartbeat Acceleration',
      status: 'Merged to Main',
      date: '1 month ago',
      additions: '+412',
      deletions: '-89',
      zkProof: 'ZK-0x12bb993c'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Proof Passport Hero Header */}
      <GlassCard className="relative p-6 sm:p-10 border-purple-500/40 shadow-[0_0_60px_rgba(94,14,215,0.2)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="relative">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                alt={user?.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#5E0ED7] shadow-[0_0_30px_rgba(94,14,215,0.5)]"
              />
              <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-emerald-500 text-white shadow-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{user?.name}</h1>
                <Badge variant="proof" size="md">
                  Cryptographic Proof Passport
                </Badge>
                <Badge variant="success" size="sm" dot>
                  ZK-Verified On-Chain
                </Badge>
              </div>

              <p className="text-sm text-white/70 mt-1">{user?.title}</p>

              {/* Passport Hash Display */}
              <div className="mt-3 flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 max-w-lg">
                <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-xs font-mono text-purple-300 truncate">
                  Hash: {passportHash}
                </span>
                <button
                  onClick={copyHash}
                  className="p-1 text-white/50 hover:text-white hover:bg-white/10 rounded-lg ml-auto transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full lg:w-auto">
            <Button
              variant="outline"
              size="md"
              icon={Download}
              onClick={() => {
                toast.success('Proof Passport JSON downloaded!', {
                  style: { background: '#1A1A2E', color: '#FFF', border: '1px solid #5E0ED7' }
                });
              }}
            >
              Export JSON
            </Button>
            <Button
              variant="glow"
              size="md"
              icon={Share2}
              onClick={() => setShowExportModal(true)}
            >
              Share Verifiable Link
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Verified Skills Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" /> Mathematically Verified Skills
            </h2>
            <p className="text-xs text-white/50 mt-0.5">
              Tested via automated bytecode sandboxes & verifiable benchmarks. Zero subjective claims.
            </p>
          </div>
          <Badge variant="primary" size="sm">4 Verifications Active</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verifiedSkills.map((item, idx) => (
            <GlassCard key={idx} className="p-6 hover:border-purple-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{item.skill}</h3>
                    <span className="text-xs text-purple-300 font-mono">{item.proofType}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-purple-400">{item.score}%</span>
                    <span className="block text-[10px] text-white/40 font-mono">Score</span>
                  </div>
                </div>

                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  {item.details}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-white/50">
                <span className="font-mono text-purple-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Hash: {item.hash}
                </span>
                <span>Verified: {item.validatedOn}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* GitHub Production PR Validations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GitPullRequest className="w-5 h-5 text-purple-400" /> Production Repository Validations
            </h2>
            <p className="text-xs text-white/50 mt-0.5">
              Cryptographically validated commits merged into high-impact open source & enterprise codebases.
            </p>
          </div>
          <Badge variant="proof" size="sm">ZK Validated</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {githubValidations.map((pr, idx) => (
            <GlassCard key={idx} className="p-5 flex flex-col justify-between hover:border-purple-500/40">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-purple-300 font-bold">{pr.repo}</span>
                  <Badge variant="success" size="sm">{pr.status}</Badge>
                </div>
                <h4 className="text-sm font-semibold text-white mb-2">{pr.pr}</h4>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-emerald-400">{pr.additions}</span>
                  <span className="text-rose-400">{pr.deletions}</span>
                  <span className="text-white/40">• {pr.date}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-white/40">Proof: {pr.zkProof}</span>
                <span className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-xs font-semibold cursor-pointer">
                  Inspect On-Chain <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <GlassCard className="max-w-md w-full p-6 border-purple-500/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Share Verifiable Proof Passport</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-white/60 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              Anyone with this cryptographic link can verify your skill benchmarks, production commits, and escrow track record with zero reveal of private identity.
            </p>

            <div className="p-3 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-purple-300 truncate">
                https://talentx.network/proof/{passportHash.slice(0, 16)}
              </span>
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  navigator.clipboard.writeText(`https://talentx.network/proof/${passportHash.slice(0, 16)}`);
                  toast.success('Verifiable link !');
                  setShowExportModal(false);
                }}
              >
                Copy Link
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default CandidatePassport;
export { CandidatePassport };
