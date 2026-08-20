import React, { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

const SectionTwo = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal-init');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const capabilities = [
    {
      index: '01',
      title: 'Real-time vision',
      body: 'Reads context as it happens and surfaces what matters before you ask.',
    },
    {
      index: '02',
      title: 'Layered insight',
      body: 'Moves from rough outline to sharp output without losing the thread.',
    },
    {
      index: '03',
      title: 'Adaptive speed',
      body: 'Learns your cadence and tightens every pass as you work.',
    },
  ];

  return (
    <section
      id="section-two"
      ref={sectionRef}
      className="relative z-10 w-full min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 pb-12 md:pb-16"
      aria-label="NovaAI Capabilities"
    >
      {/* Top Row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between pt-4">
        {/* Left: Badge */}
        <div
          className="reveal-init inline-flex border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md"
          style={{ transitionDelay: '120ms' }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white">
            Insight On Demand
          </span>
        </div>

        {/* Right: Copy */}
        <div className="max-w-sm sm:text-right">
          <p
            className="reveal-init text-lg sm:text-xl leading-relaxed text-white drop-shadow-md"
            style={{ transitionDelay: '220ms' }}
          >
            Our AI doesn't just respond — it interprets, sharpens, and delivers the signal you need.
          </p>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="flex-1 flex flex-col justify-end pt-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between gap-16">
          {/* Left Column */}
          <div className="max-w-xl">
            <h2
              className="reveal-init text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg"
              style={{ transitionDelay: '180ms' }}
            >
              Learn to see
              <br />
              brilliantly.
            </h2>

            <p
              className="reveal-init mt-6 max-w-md text-sm sm:text-base text-white/80 drop-shadow-md leading-relaxed"
              style={{ transitionDelay: '320ms' }}
            >
              From the first sketch to the final render, Nova turns raw intent into decisions your team can act on — quietly, precisely, at speed.
            </p>

            <div
              className="reveal-init mt-8 flex flex-wrap gap-3"
              style={{ transitionDelay: '420ms' }}
            >
              <a
                href="#section-one"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-black hover:bg-white/85 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <span>Run the demo</span>
                <ChevronRight size={14} className="text-black" aria-hidden="true" />
              </a>

              <a
                href="#section-one"
                className="inline-flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm text-white hover:bg-white/20 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Free consultation
              </a>
            </div>
          </div>

          {/* Right Column: Frosted Capability Panel */}
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 sm:px-6">
            {capabilities.map((cap, idx) => (
              <div
                key={cap.index}
                className={`reveal-init group flex gap-5 py-5 ${
                  idx < capabilities.length - 1 ? 'border-b border-white/15' : ''
                }`}
                style={{ transitionDelay: `${300 + idx * 110}ms` }}
              >
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/55 pt-0.5">
                  {cap.index}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-medium text-white">
                      {cap.title}
                    </h3>
                    <ChevronRight
                      size={16}
                      className="text-white/40 group-hover:translate-x-0.5 group-hover:text-white transition-all duration-200"
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

export default SectionTwo;
