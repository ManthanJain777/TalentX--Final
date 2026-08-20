import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const MetricsCTA = () => {
  const navigate = useNavigate();

  const metrics = [
    { value: '50+', label: 'Pilot Talents', desc: 'Pre-registered for verification' },
    { value: '15+', label: 'Pilot Employers', desc: 'Active hiring partners' },
    { value: '12', label: 'Completed Matches', desc: 'Pilot milestone contracts' },
    { value: '92%', label: 'Match Accuracy', desc: 'Explainable vector score' },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-[#F8F8FA]">
      {/* 1. Prototype Validation Metrics Block */}
      <div className="talentx-card p-8 sm:p-12 bg-white border border-black/[0.08] mb-20 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-8 border-b border-black/[0.06] mb-8">
          <div>
            <span className="text-xs font-mono uppercase text-[#5E0ED7] font-bold block">
              Prototype Validation Metrics
            </span>
            <span className="text-xs text-[#6B7280]">
              Simulated pilot metrics for demonstration
            </span>
          </div>
          <span className="text-xs font-mono text-[#6B7280] bg-[#F1F1F5] px-3 py-1 rounded-full self-start sm:self-center">
            Pilot Stage v0.1
          </span>
        </div>

        {/* 4 Metric Items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-black/[0.06]">
          {metrics.map((m, idx) => (
            <div key={idx} className="pt-4 sm:pt-0 sm:px-4">
              <span className="text-4xl sm:text-5xl font-black text-[#1A1A2E] font-mono tracking-tight block">
                {m.value}
              </span>
              <span className="text-sm font-bold text-[#1A1A2E] block mt-1">{m.label}</span>
              <span className="text-xs text-[#6B7280] block mt-0.5">{m.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Final CTA: Culmination of Journey */}
      <div className="talentx-card p-10 sm:p-16 bg-[#1A1A2E] text-white text-center rounded-3xl relative overflow-hidden shadow-xl border border-black/10">
        {/* Background subtle route gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5E0ED7] via-[#00D4AA] to-[#3B82F6]" />

        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#00D4AA]" />
            <span>Join the TALENTX Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Build the proof.
            <span className="block text-[#BA8DFF]">Discover the talent.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
            Join the pilot. Start matching, delivering, and building your reputation.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => navigate('/talent')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-[#1A1A2E] bg-white hover:bg-white/90 rounded-full transition-all duration-200 shadow-md active:scale-98"
            >
              Build Your Passport
            </button>
            <button
              onClick={() => navigate('/discover')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-full transition-all duration-200 active:scale-98"
            >
              Explore Talent
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsCTA;
export { MetricsCTA };
