import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PassportSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillsData = [
    {
      id: 'spring',
      category: 'github',
      name: 'Spring Boot 3.2 / Java 21',
      proficiency: 'Expert · L5 Level',
      sourceType: 'GITHUB',
      sourceDetail: '18 PRs merged in org/payment-core-engine (Distributed Lock Implementation)',
      status: 'VERIFIED',
      score: '96%',
    },
    {
      id: 'kafka',
      category: 'assessment',
      name: 'Apache Kafka Event Streams',
      proficiency: 'Advanced · High Throughput',
      sourceType: 'ASSESSMENT',
      sourceDetail: 'TALENTX Live Lab: 100k msg/sec zero-drop consumer pipeline (98th percentile)',
      status: 'VERIFIED',
      score: '98%',
    },
    {
      id: 'postgres',
      category: 'assessment',
      name: 'PostgreSQL Query Optimization',
      proficiency: 'Advanced · Sharding & Indices',
      sourceType: 'ASSESSMENT',
      sourceDetail: 'Query latency benchmark reduced from 420ms to 42ms p99 on 10M rows dataset',
      status: 'VERIFIED',
      score: '96%',
    },
    {
      id: 'aws',
      category: 'certified',
      name: 'AWS Solutions Architect Pro',
      proficiency: 'Certified Cloud Architect',
      sourceType: 'CERTIFIED',
      sourceDetail: 'AWS Validation ID: AWS-882194 (Cryptographically verified against issuer API)',
      status: 'VERIFIED',
      score: '100%',
    },
    {
      id: 'kubernetes',
      category: 'certified',
      name: 'Certified Kubernetes Admin (CKA)',
      proficiency: 'Production Cluster Orchestration',
      sourceType: 'CERTIFIED',
      sourceDetail: 'Linux Foundation Verification Hash: 0x8192a4f9 (Valid through Dec 2027)',
      status: 'VERIFIED',
      score: '100%',
    },
    {
      id: 'internship',
      category: 'projects',
      name: 'FinTech Core Internship',
      proficiency: 'NeoBank Corp · 6-Month Contract',
      sourceType: 'VERIFIED WORK',
      sourceDetail: 'Milestone sign-off in TALENTX Governed Workspace with 100% Escrow Release',
      status: 'VERIFIED',
      score: '95%',
    },
  ];

  const filteredSkills =
    activeTab === 'all'
      ? skillsData
      : skillsData.filter((item) => item.category === activeTab);

  return (
    <section
      id="passport"
      className="py-20 sm:py-28 bg-ink-elevated border-y border-white/5 relative overflow-hidden"
      aria-label="The Talent Passport Deep Dive"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="font-mono text-gold text-xs font-bold tracking-widest uppercase mb-2">
            THE VERIFIED PROFILE SPECIFICATION
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight mb-4">
            The Talent Passport.
          </h2>
          <p className="text-fog text-base sm:text-lg leading-relaxed">
            A zoomed-in look at verified capability. Hover over any skill chip to inspect the underlying GitHub commit, benchmark lab, or cryptographic certification.
          </p>
        </div>

        {/* Interactive Passport Dossier Sheet (Parchment Surface) */}
        <div className="parchment-sheet rounded-2xl p-6 sm:p-10 max-w-5xl mx-auto shadow-2xl">
          
          {/* Dossier Header */}
          <div className="flex flex-wrap items-center justify-between border-b-2 border-gold-dark/30 pb-5 mb-6 gap-4">
            <div>
              <div className="font-mono text-xs font-bold text-[#5A4822] uppercase tracking-wider">
                DOSSIER SPECIFICATION · TALENT PASSPORT #TX-8842
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1A160F] mt-1">
                Anika R. — Senior Backend Infrastructure
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="health-pill-verified font-mono text-xs font-bold px-3 py-1 rounded-md">
                STATUS: INCOGNITO DISCOVERABLE
              </span>
              <span className="font-mono text-xs font-bold text-[#1A160F] bg-black/5 px-3 py-1 rounded-md border border-black/10">
                OVERALL MATCH: 94%
              </span>
            </div>
          </div>

          {/* Interactive Evidence Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gold-dark/20 pb-4">
            {[
              { id: 'all', label: 'All Evidence (6)' },
              { id: 'github', label: 'GitHub Repos' },
              { id: 'assessment', label: 'System Benchmarks' },
              { id: 'certified', label: 'Certifications' },
              { id: 'projects', label: 'Governed Projects' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`font-mono text-xs px-3.5 py-1.5 rounded transition-all focus-visible:outline-gold ${
                  activeTab === tab.id
                    ? 'bg-[#1A160F] text-[#EFE7D3] font-bold shadow-sm'
                    : 'bg-[#EAE1CB] text-[#5A4822] hover:bg-[#DDD2BA]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Stamped Skill Chips & Live Inspection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`p-4 rounded-lg border transition-all cursor-pointer bg-white ${
                  hoveredSkill === skill.id
                    ? 'border-gold shadow-md bg-amber-50/20'
                    : 'border-gold-dark/25 hover:border-gold-dark/50'
                }`}
              >
                {/* Chip Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-verified" />
                    <span className="font-bold text-sm text-[#1A160F]">
                      {skill.name}
                    </span>
                  </div>
                  
                  {/* Mono Source Tag */}
                  <span className="font-mono text-[10px] font-bold text-[#00876C] bg-verified/15 px-2 py-0.5 rounded border border-verified/30">
                    {skill.sourceType}
                  </span>
                </div>

                {/* Proficiency Line */}
                <div className="flex justify-between items-center text-xs font-mono text-[#736243] mb-2">
                  <span>{skill.proficiency}</span>
                  <span className="font-bold text-[#1A160F]">{skill.score} Score</span>
                </div>

                {/* Evidence Source Description */}
                <div className="text-xs text-[#4A3D23] bg-[#F5EFE1] p-2.5 rounded border border-gold-dark/15 font-mono leading-relaxed">
                  {skill.sourceDetail}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cryptographic Ledger Footer Strip */}
          <div className="mt-8 pt-4 border-t-2 border-gold-dark/30 flex flex-wrap justify-between items-center font-mono text-xs text-[#5A4822] gap-2">
            <div>
              <span>LEDGER HASH: </span>
              <span className="font-bold">0x7f3b892ac1982b</span>
            </div>
            <div>
              <span>VALIDATION: </span>
              <span className="font-bold text-verified">CRYPTOGRAPHICALLY STAMPED</span>
            </div>
            <div>
              <span>VISIBILITY: </span>
              <span className="font-bold">CANDIDATE CONTROLLED</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PassportSection;
export { PassportSection };
