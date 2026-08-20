import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Cpu, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import GlassCard from '../ui/GlassCard';

const CapabilitySection = () => {
  const navigate = useNavigate();

  const capabilities = [
    {
      icon: ShieldCheck,
      title: 'Cryptographic Proof Passports',
      desc: 'Resume inflation is impossible. Every pull request, production benchmark, and architectural exam is verified on-chain via ZK-SNARK hashes.',
      badge: 'L3 Verifiable',
      metric: '0% False Claims'
    },
    {
      icon: Cpu,
      title: 'Vector Semantic Matching',
      desc: 'Our proprietary neural matcher converts enterprise job taxonomies into multidimensional skill vectors, predicting performance with 98.4% accuracy.',
      badge: 'Explainable AI',
      metric: '98.4% Precision'
    },
    {
      icon: Lock,
      title: 'Deterministic Milestone Escrow',
      desc: 'Smart contracts hold client budgets securely. Code deliveries are automatically tested and funds released instantly upon proof milestone pass.',
      badge: 'Zero Counterparty Risk',
      metric: '₹0 Fund Loss'
    }
  ];

  return (
    <section id="capabilities" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
        <div>
          <Badge variant="primary" size="md" className="mb-4">
            Intelligent Matching Architecture
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#BA8DFF]">brilliantly.</span>
          </h2>
        </div>

        <div className="max-w-md">
          <p className="text-white/70 text-base leading-relaxed mb-6">
            Eliminate months of screening with deterministic skill verification and AI orchestration designed for high-velocity teams.
          </p>
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/employer/discovery')}
            >
              Explore Verified Database
            </Button>
          </div>
        </div>
      </div>

      {/* Frosted Panel Grid with 3 features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {capabilities.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <GlassCard
              key={idx}
              className="group p-8 flex flex-col justify-between hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(94,14,215,0.2)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:bg-[#5E0ED7] group-hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(94,14,215,0.2)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="proof" size="sm">
                    {cap.badge}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {cap.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  {cap.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="font-mono text-purple-300 font-semibold">{cap.metric}</span>
                <span className="text-white/40 flex items-center gap-1">
                  Active in Protocol <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};

export default CapabilitySection;
export { CapabilitySection };
