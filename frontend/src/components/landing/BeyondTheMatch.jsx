import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BeyondTheMatch = () => {
  const [selectedHealth, setSelectedHealth] = useState('green');

  const railNodes = [
    { phase: 'PHASE 01', title: 'Accepted Match', desc: 'Mutual agreement on scope, timeline, and rate.' },
    { phase: 'PHASE 02', title: 'Project Contract', desc: 'Milestones signed with clear test criteria.' },
    { phase: 'PHASE 03', title: 'Escrow Vault', desc: '100% milestone funds locked safely upfront.' },
    { phase: 'PHASE 04', title: 'Deliverable Git', desc: 'Versioned code commits submitted directly.' },
    { phase: 'PHASE 05', title: 'Health Engine', desc: 'Continuous G/Y/R status monitoring.' },
    { phase: 'PHASE 06', title: 'Release Payment', desc: 'Instant escrow release with zero platform drag.' },
  ];

  return (
    <section
      id="beyond-match"
      className="py-20 sm:py-28 bg-ink-elevated border-y border-white/5 relative overflow-hidden"
      aria-label="Beyond the Match Governed Rail"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="font-mono text-gold text-xs font-bold tracking-widest uppercase mb-2">
            THE DELIVERY ADVANTAGE
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
            Beyond the Match.
          </h2>
          <p className="text-fog text-base sm:text-lg leading-relaxed">
            TALENTX does not abandon you at the introduction. We govern the full working relationship through milestones, escrow vaults, and project-health monitoring.
          </p>
        </div>

        {/* Connected Horizontal Timeline Rail */}
        <div className="overflow-x-auto pb-6 mb-14">
          <div className="min-w-[860px] grid grid-cols-6 gap-3 relative">
            {railNodes.map((node, index) => (
              <motion.div
                key={node.phase}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="card-elevated p-4 bg-[#0E131B] border-gold/25 relative"
              >
                <div className="font-mono text-[10px] text-gold font-bold mb-1">
                  {node.phase}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {node.title}
                </h4>
                <p className="text-fog text-xs leading-snug">
                  {node.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Two Featured Components: Project Health Engine + Paid Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Component 1: Live Project Health Engine */}
          <div className="card-elevated p-6 sm:p-8 border-gold/25 bg-ink-surface">
            <div className="flex justify-between items-center mb-4">
              <div className="font-mono text-xs font-bold text-gold tracking-wider">
                PROJECT HEALTH ENGINE
              </div>
              <span className="health-pill-verified font-mono text-[11px] font-bold px-2.5 py-0.5 rounded">
                LIVE ENGINE
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Semantic Health Tracking
            </h3>
            <p className="text-fog text-xs sm:text-sm mb-6 leading-relaxed">
              Our project engine continuously monitors deliverable velocity, test suite outputs, and milestone approvals:
            </p>

            {/* 3 Interactive Health State Cards */}
            <div className="space-y-3">
              {/* Green */}
              <div
                onClick={() => setSelectedHealth('green')}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  selectedHealth === 'green'
                    ? 'bg-verified/15 border-verified shadow-[0_0_15px_rgba(52,194,142,0.2)]'
                    : 'bg-white/5 border-white/10 hover:border-verified/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-verified animate-pulse" />
                  <div>
                    <div className="font-bold text-sm text-white">GREEN · ON SCHEDULE</div>
                    <div className="text-xs text-fog">Deliverables passed test suite; escrow funded.</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-verified">NORMAL</span>
              </div>

              {/* Yellow */}
              <div
                onClick={() => setSelectedHealth('yellow')}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  selectedHealth === 'yellow'
                    ? 'bg-pending/15 border-pending shadow-[0_0_15px_rgba(227,168,59,0.2)]'
                    : 'bg-white/5 border-white/10 hover:border-pending/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-pending" />
                  <div>
                    <div className="font-bold text-sm text-white">YELLOW · ACTION REQUIRED</div>
                    <div className="text-xs text-fog">Revision requested or feedback pending &gt; 48h.</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-pending">ATTN</span>
              </div>

              {/* Red */}
              <div
                onClick={() => setSelectedHealth('red')}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  selectedHealth === 'red'
                    ? 'bg-risk/15 border-risk shadow-[0_0_15px_rgba(224,97,107,0.2)]'
                    : 'bg-white/5 border-white/10 hover:border-risk/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-risk" />
                  <div>
                    <div className="font-bold text-sm text-white">RED · ESCROW SHIELD ACTIVE</div>
                    <div className="text-xs text-fog">Scope dispute raised; funds secured in mediation.</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-risk">SHIELD</span>
              </div>
            </div>
          </div>

          {/* Component 2: Paid Employer Challenges Strip */}
          <div className="card-elevated p-6 sm:p-8 border-gold/25 bg-ink-surface flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="font-mono text-xs font-bold text-gold tracking-wider">
                  EMPLOYER CHALLENGES
                </div>
                <span className="passport-stamp text-[10px] text-gold border-gold/40 px-2 py-0.5">
                  PAID BOUNTIES
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Prove Skill Fast (₹8K–₹40K Paid)
              </h3>
              <p className="text-fog text-xs sm:text-sm mb-6 leading-relaxed">
                Don't have years of resume history? Complete real, paid employer micro-challenges to verify capabilities and get paid immediately:
              </p>

              {/* Sample Live Challenges */}
              <div className="space-y-3">
                <div className="p-3.5 bg-[#0E131B] border border-white/10 rounded-lg hover:border-gold/40 transition-colors">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="font-bold text-sm text-white">
                        Build Kafka Event Consumer Microservice
                      </div>
                      <div className="text-xs text-fog mt-1">
                        Deliverable: Java 21 / Docker container with 99% test coverage
                      </div>
                    </div>
                    <div className="font-mono font-bold text-gold text-base shrink-0">
                      ₹28K
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#0E131B] border border-white/10 rounded-lg hover:border-gold/40 transition-colors">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <div className="font-bold text-sm text-white">
                        Optimize PostgreSQL Sharded Migration Query
                      </div>
                      <div className="text-xs text-fog mt-1">
                        Deliverable: SQL tuning plan cutting query time below 50ms
                      </div>
                    </div>
                    <div className="font-mono font-bold text-gold text-base shrink-0">
                      ₹40K
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono text-fog">
              <span>FUNDS IN ESCROW BEFORE WORK</span>
              <span className="text-verified font-bold">GUARANTEED PAYOUT</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BeyondTheMatch;
export { BeyondTheMatch };
