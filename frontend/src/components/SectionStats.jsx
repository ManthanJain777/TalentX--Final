import React, { useState, useEffect, useRef } from 'react';
import { Lock, Brain, Zap } from 'lucide-react';
import { useCounter } from '../hooks/useCounter';

const StatItem = ({ target, suffix, label, startCount }) => {
  const count = useCounter(target, 1800, startCount);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white drop-shadow-md">
        <span>{count}</span>
        <span className="text-[#7C3AED]">{suffix}</span>
      </div>
      <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em] text-white/70 mt-2">
        {label}
      </div>
    </div>
  );
};

const SectionStats = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { target: 500, suffix: '+', label: 'Verified Talents' },
    { target: 200, suffix: '+', label: 'Active Employers' },
    { target: 100, suffix: '+', label: 'Projects Delivered' },
    { target: 98, suffix: '%', label: 'Match Satisfaction' },
  ];

  const features = [
    {
      icon: Lock,
      title: 'AES-256 Encrypted',
      desc: 'End-to-end repository encryption and non-custodial milestone smart contracts.',
    },
    {
      icon: Brain,
      title: 'Explainable AI',
      desc: 'Algorithmic clarity with transparent skill-by-skill compatibility scoring.',
    },
    {
      icon: Zap,
      title: 'Instant Discovery',
      desc: 'Zero manual resume screening with sub-second verified profile queries.',
    },
  ];

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative z-10 w-full min-h-screen supports-[height:100svh]:min-h-[100svh] flex justify-center items-center px-5 sm:px-8 md:px-12 py-20 max-w-7xl mx-auto"
      aria-label="TALENTX Ecosystem Metrics and Architecture"
    >
      <div className="max-w-5xl mx-auto text-center w-full">
        {/* Header */}
        <div className="inline-flex items-center border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md mb-6 text-white shadow-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/95">
            Proof-First Ecosystem
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white drop-shadow-lg">
          Trusted by the Best
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 py-6 border-y border-white/15">
          {stats.map((s, idx) => (
            <StatItem
              key={idx}
              target={s.target}
              suffix={s.suffix}
              label={s.label}
              startCount={inView}
            />
          ))}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          {features.map((f) => {
            const IconComponent = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-md p-6 shadow-xl hover:border-white/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:bg-[#5E0ED7]/20 transition-colors">
                  <IconComponent className="text-[#7C3AED]" size={22} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionStats;
