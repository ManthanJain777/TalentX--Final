import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Menu, ChevronDown, Settings, LogOut, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ShinyText } from '../react-bits/ShinyText';

const TopBar = ({ onMenuClick, title = 'Dashboard' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const role = (user?.role || 'candidate').toLowerCase();
  const displayName = user?.fullName || user?.name || user?.companyName || user?.email?.split('@')[0] || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate('/auth/login');
  };

  return (
    <header className="glass-topbar sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Left: Menu + Brand + Title */}
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuClick} 
            className="md:hidden p-2 rounded-xl hover:bg-cover/5 text-ink-soft transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
          
          <div className="hidden md:flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cover flex items-center justify-center border border-gold/30">
              <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
            </div>
          </div>
          
          <div className="w-px h-6 bg-ink/10 hidden md:block" />
          
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-lg sm:text-xl font-semibold tracking-tight leading-none"
          >
            <ShinyText text={title} speed={3} className="!text-cover" shineColor="#C7A868" />
          </motion.h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex relative">
            <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-white/60 border border-cover/10 rounded-full pl-9 pr-4 py-1.5 text-xs sm:text-sm font-body text-ink placeholder:text-ink-faint focus:outline-none focus:border-gold-soft/50 transition-colors w-48"
            />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-xl hover:bg-cover/5 text-ink-soft transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />
          </motion.button>

          {/* User Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full hover:bg-cover/5 transition-colors border border-transparent hover:border-cover/10 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-cover/10 ring-1 ring-gold/40 flex items-center justify-center">
                <span className="text-[10px] font-bold text-gold">{initials}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-ink-soft transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="absolute right-0 mt-2 w-60 rounded-2xl border border-cover/10 p-2 z-50 shadow-xl bg-white/95 backdrop-blur-2xl"
                  >
                    <div className="px-3 py-3 mb-1 bg-cover/5 rounded-xl">
                      <div className="text-sm font-bold text-cover font-body truncate">{displayName}</div>
                      <div className="text-[10px] text-ink-soft font-mono truncate mt-0.5">
                        {user?.email || 'Authenticated'}
                      </div>
                    </div>
                    <Link
                      to={`/${role}/settings`}
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-body text-ink hover:bg-cover/5 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-ink-soft" />
                      Preferences
                    </Link>
                    <hr className="border-cover/5 my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-body font-medium text-risk hover:bg-risk/10 w-full transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-soft/30 to-transparent" />
    </header>
  );
};

export default TopBar;
export { TopBar };
