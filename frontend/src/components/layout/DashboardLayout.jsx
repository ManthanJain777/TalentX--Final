import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout = ({ children, title = 'Dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen dashboard-bg text-ink font-body overflow-x-hidden">
      {/* Global Spotlight */}
      <div 
        className="spotlight"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-cover-deep/60 backdrop-blur-sm md:hidden transition-opacity duration-500"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Layout Area */}
      <div className="md:ml-72 flex flex-col min-h-screen relative z-10">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} title={title} />

        {/* Scrollable Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto relative">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-6 px-8 mt-auto flex flex-col items-center justify-center opacity-70">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold-soft to-transparent mb-4" />
          <div className="meta-label tracking-[0.2em] text-center">
            TALENTX PROTOCOL &bull; PROOF-FIRST TALENT ECOSYSTEM
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
