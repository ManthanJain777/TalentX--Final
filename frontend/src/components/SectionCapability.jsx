import React from 'react';
import { ChevronRight } from 'lucide-react';

const SectionCapability = () => {
  const capabilities = [
    {
      index: '01',
      title: 'Verified Passport',
      body: 'Skills, GitHub repos, certifications, and real assessments in one tamper-evident profile.',
    },
    {
      index: '02',
      title: 'Explainable Matching',
      body: 'See exactly why you matched with a transparent, skill-by-skill evaluation score breakdown.',
    },
    {
      index: '03',
      title: 'Governed Delivery',
      body: 'Milestones, automated escrow contracts, and versioned deliverables keep projects on track.',
    },
  ];

  return (
    <section
      id="capability"
      className="relative z-10 w-full min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 pb-12 md:pb-16 max-w-7xl mx-auto"
      aria-label="TALENTX Capability Overview"
    >
      {/* Top Row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between pt-6">
        {/* Left Badge */}
        <div className="inline-flex items-center border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md text-white shadow-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/95">
            Intelligent Matching
          </span>
        </div>

        {/* Right Editorial Copy */}
        <div className="max-w-sm sm:text-right">
          <p className="text-lg sm:text-xl leading-relaxed text-white drop-shadow-md font-normal">
            Our AI doesn't just match keywords — it interprets skills, verifies evidence, and delivers explainable scores.
          </p>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="flex-1 flex flex-col justify-end pt-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
          {/* Left Column */}
          <div className="max-w-xl">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg">
              Discover
              <br />
              brilliantly.
            </h2>

            <p className="mt-6 max-w-md text-sm sm:text-base text-white/80 drop-shadow-md leading-relaxed font-normal">
              From skill verification to project delivery, TALENTX turns raw capability into actionable insights your team
              can trust — quietly, precisely, at speed.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#stats"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-black hover:bg-white/85 transition-all duration-200 shadow-md focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
              >
                <span>Explore Talent</span>
                <ChevronRight size={14} className="text-black" aria-hidden="true" />
              </a>

              <a
                href="#stats"
                className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm text-white hover:bg-white/20 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Column: Frosted Capability Panel */}
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 sm:px-6 shadow-2xl">
            {capabilities.map((cap, idx) => (
              <div
                key={cap.index}
                className={`group flex gap-5 py-5 transition-all duration-300 ${
                  idx < capabilities.length - 1 ? 'border-b border-white/15' : ''
                }`}
              >
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/55 pt-0.5">
                  {cap.index}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-white transition-colors">
                      {cap.title}
                    </h3>
                    <ChevronRight
                      size={16}
                      className="text-white/40 group-hover:translate-x-1 group-hover:text-white transition-all duration-200"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                    {cap.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCapability;
