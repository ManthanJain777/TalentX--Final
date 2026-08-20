import React from 'react';
import { Hexagon } from 'lucide-react';

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const Footer = () => {
  const socialLinks = [
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com' },
    { name: 'X / Twitter', icon: TwitterIcon, href: 'https://twitter.com' },
    { name: 'GitHub', icon: GithubIcon, href: 'https://github.com' },
    { name: 'YouTube', icon: YoutubeIcon, href: 'https://youtube.com' },
  ];

  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-black/40 backdrop-blur-xl py-12" aria-label="Site Footer">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1: Logo & Description */}
          <div className="col-span-2 sm:col-span-1">
            <a href="#hero" className="flex items-center gap-2 mb-4 group" aria-label="TALENTX Home">
              <Hexagon className="w-5 h-5 text-[#5E0ED7]" strokeWidth={1.5} />
              <span className="text-lg font-medium tracking-tight text-white">talentx</span>
            </a>
            <p className="text-xs text-white/60 leading-relaxed max-w-xs mb-4">
              Proof-first talent ecosystem matching verified specialists with high-growth engineering teams.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => {
                const IconComponent = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200"
                    aria-label={`Follow TALENTX on ${s.name}`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/90 mb-4">
              Product
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/60">
              <li><a href="#capability" className="hover:text-white transition-colors">Discover</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Talent</a></li>
              <li><a href="#capability" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#stats" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/90 mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/60">
              <li><a href="#stats" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#stats" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/90 mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/60">
              <li><a href="#hero" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-white/40 text-xs mt-10 border-t border-white/10 pt-8">
          © 2026 TALENTX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
