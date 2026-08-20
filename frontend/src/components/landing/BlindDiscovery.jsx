import React from 'react';
import { CheckCircle2, EyeOff } from 'lucide-react';

const BlindDiscovery = () => {
  const anonymousCandidates = [
    {
      id: '#2041',
      title: 'Backend Engineer',
      skills: ['Java', 'Spring', 'MongoDB'],
      score: 94,
      evidence: '4 Repositories • L3 Benchmark'
    },
    {
      id: '#2088',
      title: 'Frontend Engineer',
      skills: ['React', 'TypeScript', 'CSS'],
      score: 91,
      evidence: 'Component Library • 92nd Percentile'
    },
    {
      id: '#2134',
      title: 'Full Stack Engineer',
      skills: ['Java', 'React', 'MongoDB'],
      score: 89,
      evidence: 'Full-Stack Monorepo • REST API Exam'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-[#F8F8FA]">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.08] shadow-sm mb-4">
          <span className="text-xs font-semibold text-[#4B4B56]">Blind Discovery</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1A1A2E] tracking-tight leading-tight">
          Evaluate capability before identity.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#4B4B56] leading-relaxed">
          Employers see skills and evidence — not names, photos, or backgrounds. Focus on what matters.
        </p>
      </div>

      {/* 3 Anonymous Candidate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {anonymousCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="talentx-card p-6 sm:p-7 bg-white border border-black/[0.08] flex flex-col justify-between"
          >
            <div>
              {/* Anonymous Identifier header */}
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A2E]/5 flex items-center justify-center text-[#1A1A2E]">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#1A1A2E] block">
                      Candidate {candidate.id}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">Anonymous Vector</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl font-extrabold text-[#5E0ED7] font-mono">{candidate.score}%</span>
                  <span className="block text-[9px] text-[#6B7280] uppercase font-semibold">Match</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-[#1A1A2E] mb-2">{candidate.title}</h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-[#F8F8FA] border border-black/[0.06] text-xs font-mono font-medium text-[#4B4B56]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-[#6B7280]">
              <span>{candidate.evidence}</span>
              <span className="text-[#00876C] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3 Core Explanation Points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-1.5">
          <h4 className="text-sm font-bold text-[#1A1A2E]">Focus on capability</h4>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Hiring decisions start with code reviews, benchmark metrics, and verified project outcomes.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-1.5">
          <h4 className="text-sm font-bold text-[#1A1A2E]">Reduce exposure to irrelevant signals</h4>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Identity credentials remain decoupled during preliminary evaluation, ensuring purely objective shortlisting.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] space-y-1.5">
          <h4 className="text-sm font-bold text-[#1A1A2E]">Every match is explainable</h4>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Clear vector weights demonstrate why candidate capability aligns with role requirements.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlindDiscovery;
export { BlindDiscovery };
