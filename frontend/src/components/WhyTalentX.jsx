import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Brain, Shield, Lock, Check } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const WhyTalentX = () => {
  const features = [
    {
      icon: BadgeCheck,
      title: 'Verified Talent Passport',
      tagline: 'Cryptographic proof replacing fabricated resumes',
      description:
        'Live synchronization with GitHub commits, benchmarked coding assessments, and audited production deployments gathered in an immutable profile.',
      highlights: ['Commit history validation', 'Real-time capability scoring', 'Decentralized skill badges'],
    },
    {
      icon: Brain,
      title: 'Explainable AI Matching',
      tagline: 'Transparent fit reasoning without black-box bias',
      description:
        'Every match recommendation comes with an interpretable breakdown of architecture experience, domain familiarity, and past project complexity match.',
      highlights: ['Transparent scoring weights', 'Zero hallucinated qualifications', 'Skill-gap visualizer'],
    },
    {
      icon: Shield,
      title: 'Governed Project Delivery',
      tagline: 'Milestone escrow that eliminates payment risk',
      description:
        'Smart contracts hold capital securely until verified GitHub deliverables meet pre-agreed acceptance criteria, protecting both client and contractor.',
      highlights: ['Automated milestone escrow', 'Arbitration-ready audit trails', 'Instant global settlement'],
    },
    {
      icon: Lock,
      title: 'Enterprise Security & Privacy',
      tagline: 'Bank-grade compliance and IP confidentiality',
      description:
        'All client intellectual property, repository integrations, and financial transfers are shielded with AES-256 encryption and SOC 2 Type II controls.',
      highlights: ['Strict IP assignment clauses', 'Role-based access boundaries', 'End-to-end payload encryption'],
    },
  ];

  return (
    <section id="why-talentx" className="section-padding bg-surface" aria-label="Why TALENTX Feature Breakdown">
      <div className="site-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="section-tag"
          >
            Core Architecture
          </motion.span>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            custom={1}
            className="section-title"
          >
            Built for Trust. Powered by Proof.
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            custom={2}
            className="section-subtitle"
          >
            Designed from first principles to eliminate the friction, fraud, and uncertainty of remote technical hiring.
          </motion.p>
        </div>

        {/* 2x2 Feature Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="features-grid-2x2"
        >
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={idx}
                className="feature-card"
              >
                <div className="feature-card-glow" aria-hidden="true" />
                <div className="feature-card-inner">
                  {/* Icon & Tag */}
                  <div className="feature-card-top">
                    <div className="feature-icon-wrapper" aria-hidden="true">
                      <IconComponent className="feature-icon" />
                    </div>
                    <span className="feature-subtag">{feature.tagline}</span>
                  </div>

                  {/* Title & Body */}
                  <h3 className="feature-card-title">{feature.title}</h3>
                  <p className="feature-card-desc">{feature.description}</p>

                  {/* Highlights Bullet List */}
                  <ul className="feature-highlights-list" aria-label={`Key benefits of ${feature.title}`}>
                    {feature.highlights.map((item) => (
                      <li key={item} className="feature-highlight-item">
                        <Check className="highlight-check-icon" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTalentX;
