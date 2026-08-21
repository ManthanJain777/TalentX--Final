import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ProblemSection from './ProblemSection';
import HowItWorks from './HowItWorks';
import PassportSection from './PassportSection';
import ExplainableMatchDemo from './ExplainableMatchDemo';
import BeyondTheMatch from './BeyondTheMatch';
import ComparisonTable from './ComparisonTable';
import TrustAndFooter from './TrustAndFooter';
import { AuroraBackground } from '../ui/AuroraBackground';

const HomePage = () => {
  return (
    <AuroraBackground showRadialGradient={true}>
      <div className="w-full text-white flex flex-col justify-between selection:bg-[#C6A15B] selection:text-[#0B0F14] relative z-10">
        {/* Sticky Header / Passport Navigation */}
        <Navbar />

        {/* Exactly 8 Marketing Sections in Canonical Sequence */}
        <main id="main-content" className="flex-1 w-full">
          {/* 01 HERO — The 3D Passport Opening Signature Sequence */}
          <Hero />

          {/* 02 THE PROBLEM — Application Black Holes */}
          <ProblemSection />

          {/* 03 HOW IT WORKS — The Candidate Loop as Passport Stamps */}
          <HowItWorks />

          {/* 04 THE TALENT PASSPORT — Deep Dive & Inspection */}
          <PassportSection />

          {/* 05 EXPLAINABLE MATCHING — Reference Demo: Anika R. 94% */}
          <ExplainableMatchDemo />

          {/* 06 BEYOND THE MATCH — Governed Workspace, Health Rail & Challenges */}
          <BeyondTheMatch />

          {/* 07 WHY TALENTX — Positioning Comparison Matrix */}
          <ComparisonTable />
        </main>

        {/* 08 TRUST STRIP, FINAL DUAL CTA & MRZ FOOTER */}
        <TrustAndFooter />
      </div>
    </AuroraBackground>
  );
};

export default HomePage;
export { HomePage };
