import React from 'react';
import { Clock, ShieldCheck } from 'lucide-react';

const ChallengeDelivery = () => {
  const challenges = [
    {
      id: '01',
      title: 'Build a REST API with Spring Boot',
      budget: '₹20K',
      skills: ['Java', 'Spring Boot', 'MongoDB'],
      time: '48 hours',
      type: 'Backend Micro-Task'
    },
    {
      id: '02',
      title: 'Design a React Component Library',
      budget: '₹12K',
      skills: ['React', 'TypeScript', 'CSS'],
      time: '36 hours',
      type: 'Frontend Micro-Task'
    }
  ];

  const deliveryStages = [
    { step: '01', title: 'Match & Contract', desc: 'Pre-verified capability match triggers standard automated agreement.' },
    { step: '02', title: 'Define Milestones', desc: 'Deliverable benchmarks and acceptance criteria locked in escrow contract.' },
    { step: '03', title: 'Deliver & Review', desc: 'Candidate pushes PR artifacts; automated CI sandboxes validate tests.' },
    { step: '04', title: 'Escrow Payment', desc: 'Funds release automatically upon verified deliverable approval.' },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-[#F8F8FA]">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.08] shadow-sm mb-4">
          <span className="text-xs font-semibold text-[#4B4B56]">Start Matching Today</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1A1A2E] tracking-tight leading-tight">
          From challenge to outcome.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#4B4B56] leading-relaxed">
          Employers post paid micro-tasks. Candidates deliver. Everyone wins.
        </p>
      </div>

      {/* Two Challenge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {challenges.map((ch) => (
          <div
            key={ch.id}
            className="talentx-card p-6 sm:p-8 bg-white border border-black/[0.08] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-5">
                <span className="text-xs font-mono uppercase text-[#5E0ED7] font-bold">
                  CHALLENGE {ch.id} • {ch.type}
                </span>
                <span className="text-base font-extrabold text-[#00876C] font-mono">
                  {ch.budget}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">{ch.title}</h3>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {ch.skills.map((skill) => (
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
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#6B7280]" /> Duration: <strong className="text-[#1A1A2E]">{ch.time}</strong>
              </span>
              <span className="text-[#5E0ED7] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Escrow Funded
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Governed Delivery Flow (4 Connected Stages with Proof Route) */}
      <div className="talentx-card p-6 sm:p-10 bg-white border border-black/[0.08]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase text-[#5E0ED7] font-bold block mb-1">
            GOVERNED DELIVERY LIFECYCLE
          </span>
          <h3 className="text-xl font-bold text-[#1A1A2E]">
            Four Deterministic Milestones
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {deliveryStages.map((stage, idx) => (
            <div
              key={stage.step}
              className="p-5 rounded-2xl bg-[#F8F8FA] border border-black/[0.06] flex flex-col justify-between relative z-10"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-[#1A1A2E] text-white text-xs font-mono font-bold flex items-center justify-center">
                    {stage.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#5E0ED7]" />
                </div>
                <h4 className="text-sm font-bold text-[#1A1A2E] mb-1.5">{stage.title}</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengeDelivery;
export { ChallengeDelivery };
