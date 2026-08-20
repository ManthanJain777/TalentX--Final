import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
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
      className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'py-2' : 'py-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 rounded-2xl ${scrolled ? 'h-[64px] bg-white/70 backdrop-blur-xl shadow-glass border border-white/40 px-6' : 'h-[72px] glass-nav bg-transparent'}`}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 text-cover group focus-visible:outline-gold">
            <div className="w-9 h-9 rounded-lg bg-cover border border-gold/40 flex items-center justify-center text-gold shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-wider font-sans text-cover">TALENTX</span>
              <span className="ml-1.5 text-[9px] font-mono text-gold-dark bg-gold/15 px-1.5 py-0.5 rounded border border-gold/30">
                PASSPORT
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            <Link to="/" className="text-sm font-semibold text-ink-soft hover:text-cover transition-colors">
              Home
            </Link>
            <Link to="/candidate/dashboard" className="text-sm font-semibold text-ink-soft hover:text-cover transition-colors">
              Candidate Portal
            </Link>
            <Link to="/employer/dashboard" className="text-sm font-semibold text-ink-soft hover:text-cover transition-colors">
              Employer Portal
            </Link>
            <Link to="/admin/dashboard" className="text-sm font-semibold text-ink-soft hover:text-cover transition-colors">
              Admin Portal
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to={`/${user.role}/dashboard`}
                  className="text-xs font-bold font-sans text-cover bg-cover/8 hover:bg-cover/15 px-3.5 py-2 rounded-xl border border-cover/15 transition-all"
                >
                  Dashboard ({user.role})
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/auth/login');
                  }}
                  className="text-xs font-semibold text-ink-soft hover:text-risk transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/auth/login"
                  className="text-xs font-bold text-cover hover:text-gold-dark px-3.5 py-2 rounded-xl transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="btn-gold text-xs px-4 py-2 shadow-gold-glow"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors focus-visible:outline-gold ${scrolled ? 'bg-white/50 text-cover' : 'text-ink-soft hover:text-cover'}`}
            aria-label="Toggle menu"
          >
            <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </button>

        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden mt-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-cover/10 shadow-glass"
            >
              <div className="py-4 px-3 space-y-2">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-semibold text-ink-soft py-2 px-3 hover:text-cover hover:bg-black/5 rounded-lg transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/candidate/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-semibold text-ink-soft py-2 px-3 hover:text-cover hover:bg-black/5 rounded-lg transition-colors"
                >
                  Candidate Portal
                </Link>
                <Link
                  to="/employer/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-semibold text-ink-soft py-2 px-3 hover:text-cover hover:bg-black/5 rounded-lg transition-colors"
                >
                  Employer Portal
                </Link>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-semibold text-ink-soft py-2 px-3 hover:text-cover hover:bg-black/5 rounded-lg transition-colors"
                >
                  Admin Portal
                </Link>
                <div className="pt-3 border-t border-cover/10 flex flex-col gap-2 mt-2">
                  <Link
                    to="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-xs font-bold text-center py-3 text-cover border border-cover/20 rounded-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="btn-gold text-xs text-center py-3 rounded-xl shadow-gold-glow"
                  >
                    Create Account
                  </Link>
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
