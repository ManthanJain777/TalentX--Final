import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, UserCheck, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeInOut' }
    }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 rounded-2xl ${scrolled ? 'h-[64px] bg-white/10 backdrop-blur-md shadow-glass border border-white/20 px-6' : 'h-[74px] bg-transparent'}`}>
          
          {/* Brand Logo & Passport Seal */}
          <a href="#hero" className="flex items-center gap-3 text-white no-underline group focus-visible:outline-gold">
            <div className="w-10 h-10 rounded-lg bg-ink-elevated/80 backdrop-blur-sm border border-gold/40 flex items-center justify-center shadow-gold-glow group-hover:border-gold transition-colors">
              <ShieldCheck className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-extrabold text-lg tracking-wider font-sans ${scrolled ? 'text-white' : 'text-ink'}`}>TALENTX</span>
                <span className="text-[10px] font-mono text-gold bg-gold/10 px-1.5 py-0.5 rounded border border-gold/30">
                  PASSPORT
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {['The Problem', 'How It Works', 'The Passport', 'Explainable Match', 'Governed Rail', 'Why TALENTX'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-sm font-medium hover:text-gold transition-colors focus-visible:outline-gold ${scrolled ? 'text-gray-200' : 'text-ink'}`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#explainable-match"
              className="btn-outline-fog text-xs py-2.5 px-4 font-semibold inline-flex items-center gap-1.5 backdrop-blur-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Discover talent</span>
            </a>
            <a
              href="#passport"
              className="btn-gold text-xs py-2.5 px-4 font-bold inline-flex items-center gap-1.5 shadow-gold-glow"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Build your Passport</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg backdrop-blur-sm border ${scrolled ? 'bg-white/10 border-white/20 text-white' : 'bg-ink-elevated/10 border-gold/20 text-ink'} hover:text-gold focus-visible:outline-gold transition-colors`}
            aria-label="Toggle menu"
          >
            <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </button>
        </div>

        {/* Mobile Navigation Sheet */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden mt-2 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-glass"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                {['The Problem', 'How It Works', 'The Passport', 'Explainable Match', 'Governed Rail', 'Why TALENTX'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white text-sm font-medium py-2 px-3 hover:bg-white/10 hover:text-gold rounded-lg transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                  <a
                    href="#passport"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-gold text-xs text-center py-3 rounded-xl shadow-gold-glow"
                  >
                    Build your Passport
                  </a>
                  <a
                    href="#explainable-match"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-outline-fog text-xs text-center py-3 rounded-xl bg-white/5"
                  >
                    Discover talent
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
export { Navbar };
