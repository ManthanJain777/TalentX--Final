import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';

const TrustedBy = () => {
  const companies = [
    { name: 'NEXUSFLOW', domain: 'Cloud Infrastructure', tag: 'Series B' },
    { name: 'HYPERION AI', domain: 'Autonomous Agents', tag: 'Enterprise' },
    { name: 'QUANTUM PROTOCOL', domain: 'DeFi & Escrow', tag: 'Web3 Leader' },
    { name: 'VORTEX CORE', domain: 'Distributed DB', tag: 'Fast 500' },
    { name: 'PRISM LABS', domain: 'Applied ML', tag: 'YC Alum' },
    { name: 'AURA SECURITY', domain: 'Zero Trust Cyber', tag: 'Enterprise' },
  ];

  return (
    <section id="trusted-by" className="trusted-by-section" aria-label="Companies using TALENTX">
      <div className="site-container">
        <div className="section-header text-center">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            className="trusted-by-tagline"
          >
            TRUSTED BY HIGH-VELOCITY ENGINEERING TEAMS WORLDWIDE
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="trusted-grid"
        >
          {companies.map((company, idx) => (
            <motion.div
              key={company.name}
              variants={fadeUp}
              custom={idx}
              className="trusted-brand-card"
            >
              <div className="brand-logo-text">{company.name}</div>
              <div className="brand-domain-row">
                <span className="brand-domain-text">{company.domain}</span>
                <span className="brand-tag-badge">{company.tag}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;
