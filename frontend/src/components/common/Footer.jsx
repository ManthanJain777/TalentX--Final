import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-cover/10 bg-page pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-cover/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cover border border-gold/40 flex items-center justify-center text-gold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg text-cover font-sans">TALENTX</span>
            <span className="text-xs text-ink-soft font-mono ml-2">
              PROOF-FIRST ECOSYSTEM
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-xs font-semibold text-ink-soft">
            <Link to="/" className="hover:text-cover transition-colors">Home</Link>
            <Link to="/candidate/dashboard" className="hover:text-cover transition-colors">Candidate</Link>
            <Link to="/employer/dashboard" className="hover:text-cover transition-colors">Employer</Link>
            <Link to="/admin/dashboard" className="hover:text-cover transition-colors">Admin</Link>
            <Link to="/auth/login" className="hover:text-cover transition-colors">Sign In</Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-ink-soft font-mono">
          <div>
            &copy; 2026 TALENTX PROTOCOL. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[11px] text-gold-dark font-bold">
            TALENTX&lt;&lt;PASSPORT&lt;VERIFIED&lt;&lt;&lt;GOVERNED&lt;ESCROW&lt;HEALTH&lt;&lt;&lt;&lt;
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
export { Footer };
