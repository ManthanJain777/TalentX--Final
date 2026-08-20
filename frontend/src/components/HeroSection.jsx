import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  GitBranch,
} from 'lucide-react';
import { fadeLeft, scaleIn } from '../utils/animations';

const HeroSection = () => {
  const stats = [
    { icon: Users, value: '500+', label: 'Verified Talents' },
    { icon: Building2, value: '200+', label: 'Active Employers' },
    { icon: CheckCircle2, value: '100+', label: 'Projects Delivered' },
  ];

  return (
    <section className="hero-section" aria-label="TALENTX Hero Introduction">
      {/* Background Video & Fallback Poster */}
      <div className="hero-media-wrapper" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-bg"
          poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-gradient-overlay" />
      </div>

      <div className="hero-inner-container">
        <div className="hero-grid">
          {/* Left Column: Core Value Proposition */}
          <div className="hero-left-content">
            {/* Pill Tag */}
            <motion.div
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeLeft}
              className="hero-pill-badge"
            >
              <span className="pill-dot" />
              <span className="pill-text">Proof-First Talent Ecosystem</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeLeft}
              className="hero-main-title"
            >
              Hire with <span className="text-gradient">Verified Proof.</span>
              <br />
              Deliver with <span className="text-accent">Governed Escrow.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeLeft}
              className="hero-lead-text"
            >
              Match with elite software engineers and designers through explainable AI evaluations. 
              Protected by milestone escrow contracts where trust is earned by evidence, not resumes.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeLeft}
              className="hero-cta-group"
            >
              <a href="#how-it-works" className="btn-primary-hero group">
                <span>Start Hiring with Proof</span>
                <ArrowRight className="btn-arrow-icon" aria-hidden="true" />
              </a>
              <a href="#why-talentx" className="btn-secondary-hero">
                <span>Explore Talent Passports</span>
              </a>
            </motion.div>

            {/* Stats Row with Icons */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fadeLeft}
              className="hero-stats-row"
            >
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div key={idx} className="hero-stat-pill">
                    <div className="stat-pill-icon-wrap" aria-hidden="true">
                      <IconComponent className="stat-pill-icon" />
                    </div>
                    <div className="stat-pill-info">
                      <div className="stat-pill-val">{stat.value}</div>
                      <div className="stat-pill-lbl">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Signature Floating Talent Passport Card */}
          <div className="hero-right-content">
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="talent-passport-card"
            >
              {/* Card Header & Pulse Status */}
              <div className="passport-header">
                <div className="passport-avatar-wrap">
                  <div className="passport-avatar">AR</div>
                  <div className="avatar-online-dot" title="Active on platform" />
                </div>
                <div className="passport-profile-info">
                  <div className="passport-name-row">
                    <h3 className="passport-name">Alex Rivera</h3>
                    <span className="verified-pulse-badge">
                      <span className="verified-pulse-dot" />
                      <ShieldCheck className="verified-badge-icon" aria-hidden="true" />
                      Verified
                    </span>
                  </div>
                  <p className="passport-role">Lead Full-Stack Architect</p>
                </div>
              </div>

              {/* Trust Score & Verification Metric */}
              <div className="passport-trust-metric">
                <div className="trust-score-ring">
                  <svg className="ring-svg" viewBox="0 0 44 44" aria-hidden="true">
                    <circle className="ring-bg" cx="22" cy="22" r="18" />
                    <circle
                      className="ring-progress"
                      cx="22"
                      cy="22"
                      r="18"
                      strokeDasharray="113.1"
                      strokeDashoffset="1.2"
                    />
                  </svg>
                  <span className="ring-score-text">99.4%</span>
                </div>
                <div className="trust-metric-text">
                  <div className="trust-metric-title">Cryptographic Trust Score</div>
                  <div className="trust-metric-sub">Calculated across 18 audited milestone deliverables</div>
                </div>
              </div>

              {/* Verified Capability Tags */}
              <div className="passport-skills-section">
                <span className="skills-heading">Verified Proof Artifacts</span>
                <div className="skills-tags-row">
                  <span className="skill-tag">
                    <GitBranch className="skill-tag-icon" aria-hidden="true" />
                    React 19 / TS
                  </span>
                  <span className="skill-tag">
                    <Sparkles className="skill-tag-icon" aria-hidden="true" />
                    Distributed Systems
                  </span>
                  <span className="skill-tag">
                    <Award className="skill-tag-icon" aria-hidden="true" />
                    Solidity Smart Contracts
                  </span>
                  <span className="skill-tag">GraphQL & Node</span>
                </div>
              </div>

              {/* Passport Live Escrow Status Strip */}
              <div className="passport-escrow-status">
                <div className="escrow-dot-status" />
                <div className="escrow-text">
                  <strong>Escrow Protected:</strong> ₹19.60L USDC locked in Smart Contract
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
