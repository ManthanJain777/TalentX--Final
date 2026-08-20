import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { UserCheck, GitPullRequest, Award, Eye, Inbox, FileCheck } from 'lucide-react';

const HowItWorks = () => {
  const shouldReduceMotion = useReducedMotion();

  const stamps = [
    {
      stamp: 'STAMP 01 · REGISTER',
      step: 'STEP 01/06',
      title: 'Private Identity Created',
      desc: 'Create your account. By default, your passport is 100% private and invisible to search engines and current employers.',
      icon: UserCheck,
      color: 'gold',
    },
    {
      stamp: 'STAMP 02 · BUILD PASSPORT',
      step: 'STEP 02/06',
      title: 'Import Real Proof',
      desc: 'Connect your GitHub repositories, production deployments, system architecture diagrams, certifications, and past project milestones.',
      icon: GitPullRequest,
      color: 'gold',
    },
    {
      stamp: 'STAMP 03 · ADD EVIDENCE',
      step: 'STEP 03/06',
      title: 'Algorithmic Verification',
      desc: 'TALENTX automatically parses PR impact, test pass rates, and codebase complexity, stamping each skill with an objective verification badge.',
      icon: Award,
      color: 'verified',
    },
    {
      stamp: 'STAMP 04 · SET VISIBILITY',
      step: 'STEP 04/06',
      title: 'Your Visibility, Your Rules',
      desc: 'Set minimum compensation thresholds, specify target industries, and reveal your identity only to companies you explicitly approve.',
      icon: Eye,
      color: 'gold',
    },
    {
      stamp: 'STAMP 05 · GET DISCOVERED',
      step: 'STEP 05/06',
      title: 'Receive Inbound Offers',
      desc: 'Employers browse verified capability and send direct invitations and paid micro-challenges with transparent 100% explainable match scores.',
      icon: Inbox,
      color: 'verified',
    },
    {
      stamp: 'STAMP 06 · RESPOND & GOVERN',
      step: 'STEP 06/06',
      title: 'Escrow & Milestone Delivery',
      desc: 'Accept, decline, or counter-negotiate terms. Transition smoothly into a governed project workspace with escrow funding and milestone protection.',
      icon: FileCheck,
      color: 'gold',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-28 relative overflow-hidden passport-bg"
      aria-label="How TALENTX Works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="font-mono text-gold text-xs font-bold tracking-widest uppercase mb-2">
            THE VERIFIED CANDIDATE LIFECYCLE
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
            How TALENTX Works.
          </h2>
          <p className="text-fog text-base sm:text-lg leading-relaxed">
            A connected sequence stamped into your permanent Talent Passport. You build once; opportunities arrive directly.
          </p>
        </div>

        {/* 6 Stamps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stamps.map((item, index) => {
            const Icon = item.icon;
            const isVerified = item.color === 'verified';

            return (
              <motion.div
                key={item.stamp}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.9, y: 30 }
                }
                whileInView={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, scale: 1, y: 0 }
                }
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.34, 1.56, 0.64, 1], // Stamp overshoot curve
                }}
                className={`card-elevated p-6 relative ${
                  isVerified ? 'border-t-2 border-t-verified' : 'border-t-2 border-t-gold'
                }`}
              >
                {/* Stamp Tag & Step Indicator */}
                <div className="flex justify-between items-start mb-4 gap-2">
                  <div
                    className={`passport-stamp text-xs ${
                      isVerified
                        ? 'text-verified border-verified/50 bg-verified/5'
                        : 'text-gold border-gold/50 bg-gold/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.stamp}</span>
                  </div>
                  <span className="font-mono text-[11px] text-fog font-semibold">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-fog text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
export { HowItWorks };
