import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCounter } from '../hooks/useCounter';
import { fadeUp } from '../utils/animations';

const StatCard = ({ target, suffix, prefix = '', label, sublabel, startCount }) => {
  const count = useCounter(target, 1800, startCount);

  return (
    <div className="stat-metric-card">
      <div className="stat-metric-number">
        {prefix}
        <span className="stat-val-text">{count}</span>
        <span className="stat-suffix-text">{suffix}</span>
      </div>
      <div className="stat-metric-label">{label}</div>
      <div className="stat-metric-sub">{sublabel}</div>
    </div>
  );
};

const StatsSection = () => {
  const [inView, setInView] = useState(false);

  const statsData = [
    { target: 500, suffix: '+', label: 'Verified Talents', sublabel: 'Passing audited capability benchmarks' },
    { target: 200, suffix: '+', label: 'Active Employers', sublabel: 'From Seed startups to Fortune 500' },
    { target: 100, suffix: '+', label: 'Projects Delivered', sublabel: 'With 100% on-time milestone payouts' },
    { target: 98, suffix: '%', label: 'Match Satisfaction', sublabel: 'Measured by 90-day retention rating' },
  ];

  return (
    <section className="stats-section-wrapper" aria-label="TALENTX Ecosystem Metrics">
      <div className="site-container">
        <div className="stats-glass-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            onViewportEnter={() => setInView(true)}
            variants={fadeUp}
            className="stats-header text-center"
          >
            <span className="stats-pill-tag">Empirical Proof</span>
            <h2 className="stats-heading">Trusted by the Best Teams Worldwide</h2>
            <p className="stats-lead">
              Our verified milestone architecture delivers predictable quality and zero guesswork.
            </p>
          </motion.div>

          <div className="stats-metrics-grid">
            {statsData.map((stat, idx) => (
              <StatCard
                key={idx}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                sublabel={stat.sublabel}
                startCount={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
