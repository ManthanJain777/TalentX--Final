import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const ExplainableMatchDemo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const target = 94;
    const interval = setInterval(() => {
      current += 2;
      if (current >= target) {
        setScore(target);
        clearInterval(interval);
      } else {
        setScore(current);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [isInView]);

  const criteria = [
    {
      label: 'Verified Skills (Spring Boot, Kafka, Distributed DB)',
      weight: '40% WEIGHT',
      value: '38.4 / 40.0',
      percentage: '96%',
      width: '96%',
      source: '18 merged GitHub PRs + 42ms p99 database indexing benchmark.',
    },
    {
      label: 'Project Relevance (High-concurrency payment engine)',
      weight: '25% WEIGHT',
      value: '23.5 / 25.0',
      percentage: '94%',
      width: '94%',
      source: 'Open-source fintech repo with distributed lock proof.',
    },
    {
      label: 'Assessment Scores (System Design & Throughput)',
      weight: '20% WEIGHT',
      value: '19.6 / 20.0',
      percentage: '98%',
      width: '98%',
      source: 'TALENTX System Design & Throughput benchmark evaluation.',
    },
    {
      label: 'Certifications & Work History (AWS SA Pro, CKA, NeoBank)',
      weight: '10% WEIGHT',
      value: '9.0 / 10.0',
      percentage: '90%',
      width: '90%',
      source: 'Cryptographic issuer verification with Linux Foundation & AWS.',
    },
    {
      label: 'Profile Completeness & Identity Proof',
      weight: '5% WEIGHT',
      value: '5.0 / 5.0',
      percentage: '100%',
      width: '100%',
      source: 'Verified biometric passport cryptographic key link.',
    },
  ];

  return (
    <section
      id="explainable-match"
      ref={ref}
      className="py-20 sm:py-28 relative overflow-hidden passport-bg"
      aria-label="Explainable Matching Demo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="font-mono text-gold text-xs font-bold tracking-widest uppercase mb-2">
            TRANSPARENT MATCH ENGINE
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
            Explainable Matching.
          </h2>
          <p className="text-fog text-base sm:text-lg leading-relaxed">
            Every match is calculated from transparent, weighted criteria and visible to both sides. No black boxes, no guessing.
          </p>
        </div>

        {/* The Reference Demo Card */}
        <div className="card-elevated p-6 sm:p-10 max-w-4xl mx-auto border-gold/30 bg-ink-surface shadow-2xl relative">
          
          {/* Reference Candidate Header */}
          <div className="flex flex-wrap justify-between items-center border-b border-white/10 pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/30">
                  MATCH REFERENCE CALCULATION
                </span>
                <span className="health-pill-verified font-mono text-xs font-bold px-2 py-0.5 rounded">
                  CONFIRMED 94%
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Candidate: Anika R. — Senior Backend Engineer
              </h3>
              <p className="text-fog text-xs sm:text-sm mt-0.5">
                Target Role: High-Throughput Infrastructure & Payment Pipeline Architect
              </p>
            </div>

            {/* Score Counter Box */}
            <div className="text-right bg-ink-elevated border-1.5 border-gold rounded-xl p-4 px-6 shadow-[0_0_25px_rgba(198,161,91,0.15)]">
              <div className="font-mono text-4xl sm:text-5xl font-extrabold text-gold leading-none">
                {score}%
              </div>
              <div className="font-mono text-[11px] text-fog tracking-wider uppercase mt-1">
                OVERALL MATCH SCORE
              </div>
            </div>
          </div>

          {/* Weighted Breakdown Progress Bars */}
          <div className="space-y-6">
            {criteria.map((item, index) => (
              <div key={item.label}>
                <div className="flex flex-wrap justify-between items-center mb-1.5 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gold">
                      {item.weight}
                    </span>
                    <span className="font-semibold text-sm text-white">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-verified">
                    {item.value} ({item.percentage})
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: item.width } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-gold to-verified rounded-full"
                  />
                </div>

                <div className="font-mono text-[11px] text-fog mt-1">
                  Source: {item.source}
                </div>
              </div>
            ))}
          </div>

          {/* Plain English Rule Box */}
          <div className="mt-8 p-4 bg-gold/10 border border-gold/25 rounded-lg flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-white leading-relaxed">
              <strong>Plain transparency rule:</strong> Candidates see the exact same breakdown that hiring managers see. If your score is lower in one dimension, you receive an actionable path to submit new evidence or take a paid challenge to boost it.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExplainableMatchDemo;
export { ExplainableMatchDemo };
