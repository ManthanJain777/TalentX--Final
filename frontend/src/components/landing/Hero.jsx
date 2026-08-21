import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Search, Award } from 'lucide-react';
import Meteors from '../ui/Meteors';
import { TrueFocus } from '../react-bits/TrueFocus';

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [mrzText, setMrzText] = useState('');
  const fullMrz = 'TALENTX<<ANIKA<R<<<<<<<<<<<<<<VERIFIED<<TX8842<<MATCH<94<<<<<<<<<<<<<<<<<<';

  useEffect(() => {
    // Open the passport booklet shortly after load for cinematic feel
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    return () => clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Typing effect for the MRZ line
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullMrz.length) {
        setMrzText(fullMrz.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Skill chips data with authentic proof sources
  const stampedSkills = [
    {
      name: 'Spring Boot & Java 21',
      tag: 'GITHUB PROOF · 18 PRs',
      detail: 'Concurrency & Distributed Locks in Prod',
      delay: 0.8,
    },
    {
      name: 'Distributed Systems (Kafka)',
      tag: 'ASSESSMENT · 98TH %ILE',
      detail: 'Event Streaming 100k msg/sec Benchmark',
      delay: 1.0,
    },
    {
      name: 'PostgreSQL Optimization',
      tag: 'BENCHMARK · 42ms p99',
      detail: 'Index & Shard Tuning Challenge Verified',
      delay: 1.2,
    },
    {
      name: 'AWS Solutions Architect',
      tag: 'CERTIFIED · CKA & AWS',
      detail: 'Cryptographic Credential Seal Verified',
      delay: 1.4,
    },
  ];

  return (
    <section
      id="hero"
      className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden"
      aria-label="TALENTX Hero Section"
    >
      {/* Top Ambient Gold Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold/10 rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Protocol Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="passport-stamp bg-ink-elevated/80 border-gold/40 text-xs px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(198,161,91,0.15)]">
            <span className="w-2 h-2 rounded-full bg-verified animate-pulse" />
            <span className="text-gold font-bold">OFFICIAL TALENT PASSPORT PROTOCOL</span>
            <span className="text-fog">·</span>
            <span className="text-fog">ZERO RESUME SPAM</span>
          </div>
        </motion.div>

        {/* Main Serif Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto mb-5"
        >
          <div className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] text-white">
            <TrueFocus 
              sentence="Stop applying into the void"
              manualMode={false}
              blurAmount={5}
              borderColor="#C7A868"
              glowColor="rgba(199, 168, 104, 0.6)"
            />
            <br />
            <span className="text-gold italic mt-2 block">Get discovered instead.</span>
          </div>
        </motion.div>

        {/* Plain, Direct Subhead */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <p className="text-base sm:text-lg text-fog font-normal leading-relaxed">
            Build one verified Talent Passport with real GitHub proof, benchmark assessments, and certifications. Employers discover you, send transparent explainable offers, and govern contracts in escrow.
          </p>
        </motion.div>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a href="#passport" className="btn-gold">
            <span>Build your Passport</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#explainable-match" className="btn-outline-fog">
            <Search className="w-4 h-4" />
            <span>Discover talent</span>
          </a>
        </motion.div>

        {/* ====================================================================
             SIGNATURE MOMENT: 3D UNFOLDING TALENT PASSPORT
             ==================================================================== */}
        <div className="relative max-w-3xl mx-auto" style={{ perspective: '1600px' }}>
          
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.92, rotateX: 12, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* The Open Passport (Parchment Surface) */}
            <div className="parchment-sheet rounded-xl p-5 sm:p-8 border-2 border-gold/40 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(198,161,91,0.15)] relative overflow-hidden">
              
              {/* Security Watermark Crest in background */}
              <div
                className="absolute right-4 bottom-12 w-64 h-64 border-4 border-gold-dark/10 rounded-full flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <ShieldCheck className="w-48 h-48 text-gold-dark/10" />
              </div>

              {/* Passport Header Ribbon */}
              <div className="flex flex-wrap items-center justify-between border-b-2 border-gold-dark/35 pb-4 mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded border border-gold-dark/60 bg-gold/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-gold-dark" />
                  </div>
                  <div>
                    <div className="font-mono text-xs font-bold tracking-widest text-[#5A4822] uppercase">
                      TALENTX RECOGNITION PASSPORT
                    </div>
                    <div className="text-[11px] font-mono text-[#736243] font-semibold">
                      CRYPTOGRAPHIC IDENTITY · SERIAL #TX-8842-2026
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="health-pill-verified font-mono text-xs font-bold px-2.5 py-1 rounded inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-verified" />
                    VERIFIED
                  </span>
                  <span className="font-mono text-xs font-bold text-[#1A160F] bg-black/5 px-2.5 py-1 rounded border border-black/10">
                    MATCH 94%
                  </span>
                </div>
              </div>

              {/* Two-Column Document Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Left Column: Biometric Photo & Identity Block (md: 5 cols) */}
                <div className="md:col-span-5 bg-[#E8DFC8] border border-gold-dark/35 rounded-lg p-4 relative">
                  
                  {/* Photo Stamp */}
                  <div className="w-full aspect-[1/1.05] bg-[#D9CEB4] border-2 border-gold-dark/40 rounded-md mb-3 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="w-16 h-16 rounded-full bg-[#C4B698] border-2 border-gold-dark/50 flex items-center justify-center mb-1.5">
                      <svg className="w-9 h-9 text-[#4A3D23]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#5A4822] tracking-wider">
                      ANIKA R.
                    </span>

                    {/* Stamp Watermark Overlay */}
                    <div className="absolute bottom-2 right-2 opacity-30">
                      <Award className="w-8 h-8 text-[#5A4822]" />
                    </div>
                  </div>

                  {/* Identity Ledger Entries */}
                  <div className="font-mono text-xs text-[#4A3D23] space-y-1.5">
                    <div className="flex justify-between border-b border-dotted border-gold-dark/30 pb-1">
                      <span className="text-[#736243]">Role:</span>
                      <span className="font-bold text-[#1A160F]">Backend Infra Eng</span>
                    </div>
                    <div className="flex justify-between border-b border-dotted border-gold-dark/30 pb-1">
                      <span className="text-[#736243]">Seniority:</span>
                      <span className="font-bold text-[#1A160F]">L5 Senior (6 yrs)</span>
                    </div>
                    <div className="flex justify-between border-b border-dotted border-gold-dark/30 pb-1">
                      <span className="text-[#736243]">Visibility:</span>
                      <span className="font-bold text-verified">Selective Inbound</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#736243]">Key Auth:</span>
                      <span className="font-bold text-[#1A160F]">SHA256: 7f3b..91a</span>
                    </div>
                  </div>

                </div>

                {/* Right Column: Stamped Skill Chips (md: 7 cols) */}
                <div className="md:col-span-7">
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#5A4822] tracking-wider uppercase">
                      VERIFIED SKILL EVIDENCE STAMPS
                    </span>
                    <span className="font-mono text-[11px] text-[#736243]">
                      STAMPED 2026-08
                    </span>
                  </div>

                  {/* Stamped Skill Chips Container */}
                  <div className="space-y-2">
                    {stampedSkills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 1.8, rotate: -4 }
                        }
                        animate={
                          isOpen
                            ? { opacity: 1, scale: 1, rotate: 0 }
                            : {}
                        }
                        transition={{
                          duration: 0.5,
                          delay: skill.delay,
                          ease: [0.34, 1.56, 0.64, 1], // Stamp overshoot thud curve
                        }}
                        className="bg-white border-1.5 border-verified/60 rounded-md p-2.5 flex items-center justify-between shadow-sm hover:border-gold transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-verified shrink-0" />
                          <div>
                            <span className="font-bold text-sm text-[#1A160F] block leading-tight">
                              {skill.name}
                            </span>
                            <span className="text-[11px] text-[#736243] font-mono block">
                              {skill.detail}
                            </span>
                          </div>
                        </div>

                        <span className="font-mono text-[10px] font-bold text-[#00876C] bg-verified/15 px-2 py-0.5 rounded border border-verified/30 shrink-0 ml-2">
                          {skill.tag}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Issuing Authority seal line */}
                  <div className="mt-3 pt-2 border-t border-dashed border-gold-dark/30 flex items-center justify-between font-mono text-[11px] text-[#5A4822]">
                    <span>ISSUED BY: TALENTX PROTOCOL</span>
                    <span className="text-verified font-bold">✓ NO SELF-REPORTED ESTIMATES</span>
                  </div>

                </div>

              </div>

              {/* Bottom MRZ Machine-Readable Zone Line */}
              <div className="mt-6 pt-3 border-t-2 border-gold-dark/35 text-center">
                <div className="mrz-line text-[#5A4822] font-semibold text-xs sm:text-sm">
                  {mrzText || fullMrz}
                  <span className="inline-block w-2 h-3.5 bg-gold ml-1 animate-pulse" />
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Bottom Trust Metrics Ribbon */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gold/15 pt-8 text-center">
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-gold">94.8%</div>
            <div className="text-xs sm:text-sm text-fog mt-1">Explainable Match Accuracy</div>
          </div>
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-verified">100%</div>
            <div className="text-xs sm:text-sm text-fog mt-1">Cryptographically Verified Proof</div>
          </div>
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-gold">0</div>
            <div className="text-xs sm:text-sm text-fog mt-1">Black-Hole Applications Sent</div>
          </div>
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-fog">₹8K–₹40K</div>
            <div className="text-xs sm:text-sm text-fog mt-1">Paid Employer Challenges</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
export { Hero };
