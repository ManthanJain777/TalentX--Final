import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { fadeUp } from '../utils/animations';

const CTASection = () => {
  const perks = [
    'No upfront retainer fees',
    'Full milestone escrow protection',
    'Verified Talent Passports in 24h',
  ];

  return (
    <section id="cta" className="cta-section" aria-label="Call to Action">
      {/* Background Radial Purple Glow */}
      <div className="cta-radial-glow" aria-hidden="true" />

      <div className="site-container relative-z">
        <div className="cta-content-box text-center">
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            className="cta-pill-tag"
          >
            Start in Minutes
          </motion.span>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={1}
            className="cta-main-title"
          >
            Ready to Transform Your <br className="hidden-sm" />
            <span className="text-gradient">Talent Journey?</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={2}
            className="cta-subtitle"
          >
            Join forward-thinking software companies and verified technical specialists who have eliminated
            interview guesswork with proof-first hiring.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={3}
            className="cta-buttons-row"
          >
            <a href="#how-it-works" className="btn-primary-lg group">
              <span>Create Your Talent Passport</span>
              <ArrowRight className="btn-arrow-icon" aria-hidden="true" />
            </a>
            <a href="#why-talentx" className="btn-outline-white-lg">
              <span>Schedule an Enterprise Demo</span>
            </a>
          </motion.div>

          {/* Value Perks Row */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={4}
            className="cta-perks-row"
          >
            {perks.map((perk) => (
              <div key={perk} className="cta-perk-item">
                <CheckCircle2 className="perk-check-icon" aria-hidden="true" />
                <span>{perk}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
