import React from 'react';


const Footer = () => {
  return (
    <footer className="w-full bg-[#F8F8FA] border-t border-black/[0.08] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#1A1A2E]">
            TALENT<span className="text-[#5E0ED7]">X</span>
          </span>
          <span>© 2025 TALENTX. All rights reserved.</span>
        </div>

        <p className="text-center sm:text-left">
          Built for proof-first talent ecosystems.
        </p>

        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white border border-black/[0.08] text-[11px] font-mono font-semibold text-[#4B4B56]">
          Pilot v0.1
        </span>
      </div>
    </footer>
  );
};

export default Footer;
export { Footer };
