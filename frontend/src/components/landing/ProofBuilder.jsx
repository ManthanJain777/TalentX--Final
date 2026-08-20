import React from 'react';
import {
  GitBranch,
  Award,
  Terminal,
  Layers
} from 'lucide-react';

const ProofBuilder = () => {
  const currentEvidence = [
    { name: 'GitHub Repositories', status: '2 repositories — Verified', state: 'verified', icon: GitBranch },
    { name: 'Java Assessment', status: '65% — Needs Improvement', state: 'warning', icon: Award },
    { name: 'Docker Evidence', status: 'Missing — Action Required', state: 'missing', icon: Layers },
    { name: 'Projects Portfolio', status: '1 completed — Verified', state: 'verified', icon: Terminal },
  ];

  const projectedActions = [
    { action: 'Add Docker production project', impact: '+8%', type: 'Docker Evidence' },
    { action: 'Complete Java advanced assessment', impact: '+5%', type: 'Java Assessment' },
    { action: 'Connect third GitHub repository', impact: '+3%', type: 'GitHub Repositories' },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-[#F8F8FA]">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.08] shadow-sm mb-4">
          <span className="text-xs font-semibold text-[#4B4B56]">Proof Builder</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1A1A2E] tracking-tight leading-tight">
          Build stronger evidence.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#4B4B56] leading-relaxed">
          Missing evidence? Add it. See your projected match impact improve.
        </p>
      </div>

      {/* Proof Builder Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Current Evidence State (78% Match) */}
        <div className="lg:col-span-6 talentx-card p-6 sm:p-8 bg-white border border-black/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-[#6B7280] font-bold block">
                  Current Evidence State
                </span>
                <h3 className="text-base font-bold text-[#1A1A2E] mt-0.5">Senior Backend Role Baseline</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-[#1A1A2E] font-mono">78%</span>
                <span className="block text-[10px] text-[#6B7280] uppercase font-semibold">Current Match</span>
              </div>
            </div>

            {/* Evidence items list */}
            <div className="space-y-3">
              {currentEvidence.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#F8F8FA] border border-black/[0.04] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center text-[#4B4B56]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#1A1A2E]">{item.name}</h4>
                        <span className="text-[11px] text-[#6B7280]">{item.status}</span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        item.state === 'verified'
                          ? 'text-[#00876C] bg-[#00D4AA]/15'
                          : item.state === 'warning'
                          ? 'text-[#B37408] bg-[#F5B042]/20'
                          : 'text-[#DC2626] bg-[#DC2626]/10'
                      }`}
                    >
                      {item.state === 'verified' ? 'Verified' : item.state === 'warning' ? 'Needs Review' : 'Action Req.'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black/[0.06] text-xs text-[#6B7280]">
            Current evaluation based on verified submissions on file.
          </div>
        </div>

        {/* Right Column: Projected Match Impact (94% Target) */}
        <div className="lg:col-span-6 talentx-card p-6 sm:p-8 bg-white border-2 border-[#5E0ED7]/20 shadow-md flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-[#5E0ED7] font-bold block">
                  Projected Match Impact
                </span>
                <h3 className="text-base font-bold text-[#1A1A2E] mt-0.5">Target Requisition Optimization</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-[#5E0ED7] font-mono">94%</span>
                <span className="block text-[10px] text-[#00876C] font-semibold font-mono">+16% Growth</span>
              </div>
            </div>

            {/* Impact Additions */}
            <div className="space-y-3">
              {projectedActions.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#5E0ED7]/5 border border-[#5E0ED7]/15 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#5E0ED7] font-semibold block">
                      {proj.type}
                    </span>
                    <h4 className="text-xs font-bold text-[#1A1A2E] mt-0.5">{proj.action}</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00876C] bg-white border border-black/[0.06] px-2.5 py-1 rounded-lg shadow-2xs">
                    {proj.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="mt-6 pt-4 border-t border-black/[0.06]">
            <p className="text-[11px] text-[#6B7280] italic">
              *Estimated impact. Actual results may vary based on benchmark precision and employer rubric weights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofBuilder;
export { ProofBuilder };
