import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 20, staggerChildren: 0.1 }
    }
  };
  
  const linkVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0, scale: 0.95 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, type: 'spring', bounce: 0.2 }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: 'easeInOut' }
    }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled ? 'pt-4 px-4' : 'pt-6 px-6'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`flex items-center justify-between transition-all duration-500 ease-out ${scrolled ? 'h-[64px] glass-pill px-6' : 'h-[72px] bg-transparent'}`}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-cover group focus-visible:outline-gold relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cover to-cover-deep border border-gold/30 flex items-center justify-center text-gold shadow-lg group-hover:scale-105 group-hover:rotate-3 group-hover:border-gold/60 transition-all duration-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-xl tracking-widest font-sans text-cover leading-none">TALENTX</span>
              <span className="text-[10px] font-mono text-gold-dark tracking-[0.2em] font-semibold mt-1 uppercase">
                Network
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2" aria-label="Main Navigation">
            {['Home', 'Candidate Portal', 'Employer Portal', 'Admin Portal'].map((item, index) => {
              const paths = ['/', '/candidate/dashboard', '/employer/dashboard', '/admin/dashboard'];
              const path = paths[index];
              const isActive = location.pathname === path;
              
              return (
                <motion.div key={item} variants={linkVariants}>
                  <Link 
                    to={path} 
                    className={`text-sm font-semibold relative group transition-colors py-2 ${isActive ? 'text-cover' : 'text-ink-soft hover:text-cover'}`}
                  >
                    {item}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ease-out rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Actions */}
          <motion.div variants={linkVariants} className="hidden md:flex items-center gap-4 relative z-10">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  to={`/${user.role}/dashboard`}
                  className="group flex items-center gap-2 text-sm font-bold font-sans text-cover bg-white/50 hover:bg-white/80 px-4 py-2.5 rounded-full border border-cover/10 hover:border-gold/40 shadow-sm transition-all duration-300"
                >
                  <span className="w-2 h-2 rounded-full bg-verified animate-pulse"></span>
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/auth/login');
                  }}
                  className="text-sm font-semibold text-ink-soft hover:text-risk px-2 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/auth/login"
                  className="text-sm font-bold text-cover hover:text-gold-dark px-4 py-2.5 rounded-full transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="btn-primary text-sm px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  Get Started
                </Link>
              </div>
            )}
          </motion.div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden relative z-50 p-2.5 rounded-xl transition-all duration-300 focus-visible:outline-gold ${mobileOpen ? 'bg-cover text-white' : scrolled ? 'bg-white/50 text-cover hover:bg-white/80' : 'text-cover hover:bg-black/5'}`}
            aria-label="Toggle menu"
          >
            <motion.div animate={{ rotate: mobileOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
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
              className="md:hidden overflow-hidden mt-4 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl origin-top"
            >
              <div className="p-6 space-y-1">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Candidate Portal', path: '/candidate/dashboard' },
                  { name: 'Employer Portal', path: '/employer/dashboard' },
                  { name: 'Admin Portal', path: '/admin/dashboard' }
                ].map((item, i) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                  >
                    <Link
                      to={item.path}
                      className={`block text-base font-bold py-3 px-4 rounded-xl transition-colors ${location.pathname === item.path ? 'bg-gold/10 text-cover' : 'text-ink-soft hover:text-cover hover:bg-black/5'}`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 pb-2 border-t border-cover/5 flex flex-col gap-3 mt-4"
                >
                  {isAuthenticated ? (
                    <>
                       <Link
                        to={`/${user.role}/dashboard`}
                        className="w-full text-sm font-bold text-center py-3.5 text-cover border border-cover/20 rounded-xl hover:bg-cover/5 transition-colors"
                      >
                        Go to Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          navigate('/auth/login');
                        }}
                        className="w-full text-sm font-bold text-center py-3.5 text-risk hover:bg-risk/5 rounded-xl transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth/login"
                        className="w-full text-sm font-bold text-center py-3.5 text-cover border border-cover/20 rounded-xl hover:bg-cover/5 transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/auth/register"
                        className="btn-primary w-full justify-center text-sm py-3.5 rounded-xl"
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </motion.div>
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
