import React, { useState } from 'react';
import { Hexagon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', href: '#section-two', badge: '6' },
    { name: 'About', href: '#section-two' },
    { name: 'Blog', href: '#section-two' },
    { name: 'Contact', href: '#section-two' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/15 bg-white/5 backdrop-blur-md transition-colors duration-300">
        <div className="w-full px-5 sm:px-8 md:px-12 h-20 flex items-center justify-between">
          {/* Logo Left */}
          <a
            href="#section-one"
            className="flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-white/60 rounded-md p-1"
            style={{ transitionDelay: '0ms' }}
            aria-label="NovaAI Home"
          >
            <Hexagon
              className="w-6 h-6 text-white"
              strokeWidth={1.5}
            />
            <span className="text-lg sm:text-xl font-medium tracking-tight text-white font-sans">
              novaai
            </span>
          </a>

          {/* Center Nav Links (Hidden below md) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-white/85 hover:text-white transition-colors duration-300 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-white/60 rounded px-1.5 py-1"
                style={{ transitionDelay: `${100 + idx * 100}ms` }}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <sup className="font-mono text-[10px] text-white/60 top-[-0.3em]">
                    {link.badge}
                  </sup>
                )}
              </a>
            ))}
          </nav>

          {/* CTA Right */}
          <div className="hidden md:flex items-center" style={{ transitionDelay: '500ms' }}>
            <a
              href="#section-two"
              className="rounded-md border border-white/20 bg-white/15 backdrop-blur-md px-4 py-2 text-xs sm:px-5 sm:text-sm text-white hover:bg-white/25 transition-all duration-300 font-medium focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Get Free Consultation
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-white/60"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed right-0 top-0 bottom-0 w-3/4 max-w-xs bg-[#0f0f14]/95 backdrop-blur-2xl border-l border-white/15 p-6 flex flex-col justify-between z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Hexagon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  <span className="text-lg font-medium text-white">novaai</span>
                </div>
                <button
                  type="button"
                  className="p-1 text-white/70 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base text-white/90 hover:text-white py-2 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="font-mono text-xs text-white/50 bg-white/10 px-2 py-0.5 rounded">
                        {link.badge}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <a
                href="#section-two"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center rounded-md border border-white/20 bg-white/15 backdrop-blur-md text-white py-3 text-sm font-medium hover:bg-white/25 transition-colors"
              >
                Get Free Consultation
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
