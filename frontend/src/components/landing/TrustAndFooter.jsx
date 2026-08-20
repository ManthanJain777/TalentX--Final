import React from 'react';
import { ArrowRight, Search, Lock } from 'lucide-react';

const TrustAndFooter = () => {
  return (
    <footer id="trust-footer" className="bg-[#080C11] border-t border-gold/20 pt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Privacy Declaration Strip */}
        <div className="bg-ink-elevated/70 border border-gold/25 rounded-xl p-6 sm:p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-subtle">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-verified/15 border border-verified/40 flex items-center justify-center text-verified shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-base sm:text-lg">
                Passports are Private by Default
              </div>
              <div className="text-fog text-xs sm:text-sm mt-0.5">
                You control who discovers you, when your identity is unmasked, and which offers you negotiate. Zero automated exposure.
              </div>
            </div>
          </div>

          <div className="health-pill-verified font-mono text-xs font-bold px-4 py-2 rounded-lg shrink-0">
            ENCRYPTED IDENTITY
          </div>
        </div>

        {/* Final Dual CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* Candidate Card */}
          <div className="card-elevated p-8 sm:p-10 border-1.5 border-gold bg-gradient-to-br from-ink-elevated to-ink">
            <div className="passport-stamp text-gold border-gold/50 text-xs mb-4">
              FOR BUILDERS & TALENT
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Your work, verified.<br />Your visibility, your call.
            </h3>
            <p className="text-fog text-sm mb-6 leading-relaxed">
              End the 200-application grind. Build your Talent Passport once with real GitHub proof, benchmark scores, and milestone escrow protection.
            </p>
            <a href="#passport" className="btn-gold w-full justify-center">
              <span>Build your Passport</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Employer Card */}
          <div className="card-elevated p-8 sm:p-10 border border-white/15 bg-gradient-to-br from-ink-elevated to-ink">
            <div className="passport-stamp text-fog border-fog/40 text-xs mb-4">
              FOR EMPLOYERS & TEAMS
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Hire for proof,<br />not resume buzzwords.
            </h3>
            <p className="text-fog text-sm mb-6 leading-relaxed">
              Search verified capabilities, review 100% explainable match scores, and commission paid micro-challenges with zero hiring risk.
            </p>
            <a href="#explainable-match" className="btn-outline-fog w-full justify-center text-gold border-gold/40">
              <Search className="w-4 h-4" />
              <span>Discover talent</span>
            </a>
          </div>

        </div>

        {/* Footer Meta & Links */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-fog">
          <div>
            © 2026 TALENTX PROTOCOL. ALL RIGHTS RESERVED. · PROOF-FIRST RECRUITMENT ECOSYSTEM
          </div>
          <div className="flex gap-6 font-mono text-[11px]">
            <a href="#passport" className="text-fog hover:text-gold transition-colors">
              SECURITY
            </a>
            <a href="#passport" className="text-fog hover:text-gold transition-colors">
              PRIVACY
            </a>
            <a href="#passport" className="text-fog hover:text-gold transition-colors">
              ESCROW TERMS
            </a>
            <a href="#passport" className="text-fog hover:text-gold transition-colors">
              API LEDGER
            </a>
          </div>
        </div>

      </div>

      {/* Monospace MRZ Bookend Ribbon (Bottom Edge) */}
      <div className="bg-[#05070A] border-t border-gold/30 py-2.5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mrz-line text-xs font-mono text-gold opacity-80">
            TALENTX&lt;&lt;PASSPORT&lt;VERIFIED&lt;&lt;&lt;GOVERNED&lt;ESCROW&lt;HEALTH&lt;G-Y-R&lt;&lt;&lt;MATCH&lt;94&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TrustAndFooter;
export { TrustAndFooter };
