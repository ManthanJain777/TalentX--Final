import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Award, ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: 'Build Your Passport',
      description:
        'Connect your GitHub, verified code repos, and past client attestations to construct an immutable Talent Passport with tangible proof of ability.',
      badge: 'Proof Ingestion',
    },
    {
      number: '02',
      icon: Search,
      title: 'Get Discovered with AI',
      description:
        'Our explainable AI matches engineers with companies using multidimensional fit scores, transparent algorithmic reasoning, and zero resume bias.',
      badge: 'Explainable AI',
    },
    {
      number: '03',
      icon: Award,
      title: 'Deliver & Receive Escrow',
      description:
        'Agree on clear project milestones. Funds are securely locked in escrow and automatically disbursed upon verifiable milestone sign-off.',
      badge: 'Escrow Protected',
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-surface-alt" aria-label="How TALENTX Works">
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
            Streamlined Execution
          </motion.span>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            custom={1}
            className="section-title"
          >
            How TALENTX Works
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            custom={2}
            className="section-subtitle"
          >
            From discovery to delivery — a seamless journey powered by proof and governed by escrow.
          </motion.p>
        </div>

        {/* 3 Step Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="steps-grid"
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                custom={index}
                className="step-card"
              >
                {/* Step Top Meta */}
                <div className="step-card-meta">
                  <span className="step-number-badge">{step.number}</span>
                  <span className="step-feature-badge">{step.badge}</span>
                </div>

                {/* Step Icon */}
                <div className="step-icon-box" aria-hidden="true">
                  <IconComponent className="step-icon" />
                </div>

                {/* Step Content */}
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>

                {/* Step Arrow Indicator */}
                {index < steps.length - 1 && (
                  <div className="step-connector-icon" aria-hidden="true">
                    <ArrowRight className="connector-arrow" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
