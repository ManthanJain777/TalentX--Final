import React from 'react';
import { ChevronRight } from 'lucide-react';

const SectionHero = () => {
  const services = [
    '/ TALENT DISCOVERY',
    '/ AI MATCHING',
    '/ PROJECT GOVERNANCE',
  ];

  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 pb-12 md:pb-16 max-w-7xl mx-auto"
      aria-label="TALENTX Hero Introduction"
    >
      {/* Top Row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between pt-4">
        {/* Left: Service List */}
        <div className="flex flex-col gap-2">
          {services.map((service, idx) => (
            <div
              key={service}
              className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md"
              style={{ transitionDelay: `${150 + idx * 120}ms` }}
            >
              {service}
            </div>
          ))}
        </div>

        {/* Right: Intro */}
        <div className="max-w-xs sm:text-right">
          <p
            className="text-lg sm:text-xl leading-relaxed text-white drop-shadow-md"
            style={{ transitionDelay: '300ms' }}
          >
            Where verified talent meets opportunity through explainable AI matching and governed project delivery.
          </p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between pt-12">
        {/* Left Column: Badge + H1 */}
        <div className="max-w-xl">
          {/* Badge */}
          <div
            className="inline-flex border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md mb-5"
            style={{ transitionDelay: '150ms' }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white">
              Trusted by 500+ Talents
            </span>
          </div>

          {/* H1 Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg"
            style={{ transitionDelay: '280ms' }}
          >
            Talent.
            <br />
            Verified.
            <br />
            Delivered.
          </h1>
        </div>

        {/* Right Column: Glass Contact Card */}
        <div
          className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md border border-white/10 shadow-2xl"
          style={{ transitionDelay: '420ms' }}
        >
          {/* Generated Avatar */}
          <div className="h-24 w-20 rounded-lg bg-gradient-to-br from-[#5E0ED7] to-[#7C3AED] flex flex-col items-center justify-center text-white relative flex-shrink-0 border border-white/20">
            <span className="font-mono text-xl font-semibold tracking-wider">AR</span>
            <span className="text-[9px] uppercase tracking-wider text-white/70 font-mono mt-0.5">Verified</span>
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00D9B5] shadow-[0_0_8px_#00D9B5]" />
          </div>

          {/* Text Column */}
          <div className="flex flex-col gap-1.5 pr-2">
            <div className="text-sm font-medium text-white">Talk with Anika</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
              Lead Engineer at TALENTX
            </div>
            <a
              href="#capability"
              className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black hover:bg-white/85 transition-colors duration-200 mt-1.5 focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
            >
              <span>Book a Demo</span>
              <ChevronRight size={14} className="text-black" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
