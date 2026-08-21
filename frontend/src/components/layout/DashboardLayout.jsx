import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';

const DashboardLayout = ({ children, title = 'Dashboard' }) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen dashboard-bg text-ink font-body overflow-x-hidden flex flex-col">
      {/* Global Spotlight */}
      <div 
        className="spotlight"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Landing Page Style Top Navigation Bar */}
      <TopBar title={title} />

      {/* Main Content Area (Full 100% Width Canvas) */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-6 px-8 mt-auto flex flex-col items-center justify-center opacity-70 relative z-10">
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold-soft to-transparent mb-4" />
        <div className="meta-label tracking-[0.2em] text-center text-xs text-[#8B6B23] font-mono">
          TALENTX PROTOCOL &bull; PROOF-FIRST TALENT ECOSYSTEM
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
