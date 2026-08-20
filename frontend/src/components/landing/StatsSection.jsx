import React from 'react';
import { Lock, BrainCircuit, Zap } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';

const StatsSection = () => {
  const protocolPillars = [
    {
      icon: Lock,
      title: 'AES-256 & ZK Proofs',
      subtitle: 'Zero-Knowledge Privacy',
      desc: 'Candidates prove exact mathematical capabilities without exposing proprietary employer codebase or private identities before NDA.'
    },
    {
      icon: BrainCircuit,
      title: 'Explainable AI Engine',
      subtitle: 'Transparent Scoring Weights',
      desc: 'No black-box algorithms. Both talents and hiring managers receive comprehensive breakdown vectors for every matching metric.'
    },
    {
      icon: Zap,
      title: 'Instant Discovery & Sourcing',
      subtitle: '< 48 Hour Time-to-Hire',
      desc: 'Pre-verified pipelines reduce typical 60-day hiring loops into rapid contract activations with fully escrowed guarantees.'
    }
  ];

  return (
    <section id="proof" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="primary" size="md" className="mb-4">
          Proof Infrastructure
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Cryptographic Reliability at <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#BA8DFF]">Scale</span>
        </h2>
        <p className="text-white/60 text-sm sm:text-base mt-4">
          Engineered for global tech enterprises demanding verifiable talent quality and zero friction.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {protocolPillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <GlassCard
              key={i}
              className="p-8 border-purple-500/20 hover:border-purple-500/40 hover:shadow-[0_0_35px_rgba(94,14,215,0.15)] group"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-6 group-hover:scale-110 group-hover:bg-[#5E0ED7] group-hover:text-white transition-all duration-300">
                <Icon className="w-6 h-6" />
              </div>

              <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-semibold block mb-1">
                {pillar.subtitle}
              </span>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {pillar.desc}
              </p>
            </GlassCard>
          );
        })}
      </div>

      {/* Metric Counters Banner */}
      <GlassCard className="p-8 sm:p-12 border-purple-500/30 shadow-[0_0_60px_rgba(94,14,215,0.12)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          <div className="pt-4 md:pt-0">
            <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              ₹147.20 Cr<span className="text-purple-400 text-3xl">+</span>
            </div>
            <p className="text-xs text-white/50 uppercase tracking-widest font-mono mt-2">Escrow Settled</p>
          </div>

          <div className="pt-4 md:pt-0">
            <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              99.2<span className="text-purple-400 text-3xl">%</span>
            </div>
            <p className="text-xs text-white/50 uppercase tracking-widest font-mono mt-2">Dispute-Free Rate</p>
          </div>

          <div className="pt-4 md:pt-0">
            <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              4.8<span className="text-purple-400 text-3xl">x</span>
            </div>
            <p className="text-xs text-white/50 uppercase tracking-widest font-mono mt-2">Hiring Velocity</p>
          </div>

          <div className="pt-4 md:pt-0">
            <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              1,400<span className="text-purple-400 text-3xl">+</span>
            </div>
            <p className="text-xs text-white/50 uppercase tracking-widest font-mono mt-2">Verified Proofs</p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
};

export default StatsSection;
export { StatsSection };
