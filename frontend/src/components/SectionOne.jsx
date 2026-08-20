import React, { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

const PORTRAIT_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85';

const SectionOne = () => {
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

  const services = [
    '/ AI AUTOMATION',
    '/ AI INTEGRATION',
    '/ AI AGENT DEVELOPMENT',
  ];

  return (
    <section
      id="section-one"
      ref={sectionRef}
      className="relative z-10 w-full min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 pb-12 md:pb-16"
      aria-label="NovaAI Hero Overview"
    >
      {/* Top Row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between pt-4">
        {/* Left: Service List */}
        <div className="flex flex-col gap-2">
          {services.map((service, idx) => (
            <div
              key={service}
              className="reveal-init font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md"
              style={{ transitionDelay: `${150 + idx * 120}ms` }}
            >
              {service}
            </div>
          ))}
        </div>

        {/* Right: Intro */}
        <div className="max-w-xs sm:text-right">
          <p
            className="reveal-init text-lg sm:text-xl leading-relaxed text-white drop-shadow-md"
            style={{ transitionDelay: '300ms' }}
          >
            We design automation that brings clarity, precision, and efficiency to the way your company operates.
          </p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between pt-12">
        {/* Left Column: Badge + H1 */}
        <div className="max-w-xl">
          {/* Badge */}
          <div
            className="reveal-init inline-flex border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md mb-5"
            style={{ transitionDelay: '150ms' }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white">
              We Automate 100+ Businesses
            </span>
          </div>

          {/* H1 Headline */}
          <h1
            className="reveal-init text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg"
            style={{ transitionDelay: '280ms' }}
          >
            Clear. Precise.
            <br />
            Automated.
          </h1>
        </div>

        {/* Right Column: Glass Contact Card */}
        <div
          className="reveal-init flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md"
          style={{ transitionDelay: '420ms' }}
        >
          {/* Portrait Image */}
          <img
            src={PORTRAIT_URL}
            alt="Mitha, co-founder of NovaAI"
            className="h-24 w-20 rounded-lg object-cover flex-shrink-0"
            loading="eager"
          />

          {/* Text Column */}
          <div className="flex flex-col gap-1.5 pr-2">
            <div className="text-sm font-medium text-white">Talk with Mitha</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
              Co-founder of NovaAI
            </div>
            <a
              href="#section-two"
              className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black hover:bg-white/85 transition-colors duration-200 mt-1.5 focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <span>Book 15-mins call</span>
              <ChevronRight size={14} className="text-black" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
