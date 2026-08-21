import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, ChevronDown, Settings, LogOut, Search,
  LayoutDashboard, FileCheck, Sparkles, Inbox, Briefcase, 
  MessageSquare, PlusCircle, Users, Award, AlertTriangle, FileText, TrendingUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import MorphingMenuButton from '../common/MorphingMenuButton';

const TopBar = ({ title = 'Dashboard' }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role = (user?.role || 'candidate').toLowerCase();
  const displayName = user?.fullName || user?.name || user?.companyName || user?.email?.split('@')[0] || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate('/auth/login');
  };

  // Role navigation items
  const navItemsByRole = {
    candidate: [
      { path: '/candidate/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/candidate/passport', label: 'Talent Passport', icon: FileCheck },
      { path: '/candidate/matches', label: 'My Matches', icon: Sparkles },
      { path: '/candidate/invitations', label: 'Invitations', icon: Inbox },
      { path: '/candidate/projects', label: 'My Projects', icon: Briefcase },
      { path: '/candidate/messages', label: 'Messages', icon: MessageSquare },
    ],
    employer: [
      { path: '/employer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/employer/opportunities', label: 'Opportunities', icon: Briefcase },
      { path: '/employer/challenges/new', label: 'Post Challenge', icon: PlusCircle },
      { path: '/employer/discovery', label: 'Talent Discovery', icon: Search },
      { path: '/employer/projects', label: 'Governed Projects', icon: FileCheck },
      { path: '/employer/messages', label: 'Messages', icon: MessageSquare },
    ],
    admin: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/admin/users', label: 'User Directory', icon: Users },
      { path: '/admin/verifications', label: 'Verifications', icon: Award },
      { path: '/admin/opportunities', label: 'Opportunities', icon: Briefcase },
      { path: '/admin/disputes', label: 'Disputes Room', icon: AlertTriangle },
      { path: '/admin/audit', label: 'Audit Logs', icon: FileText },
      { path: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
    ],
  };

  const navItems = navItemsByRole[role] || navItemsByRole.candidate;
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFF5]/95 backdrop-blur-2xl border-b border-[#C7A868]/30 shadow-[0_10px_35px_-10px_rgba(20,37,68,0.08)] transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6 shrink-0">
          <Link to="/" className="logo group flex items-center gap-2.5">
            <span className="dot !w-2 !h-2 !bg-[#C7A868] shadow-xs group-hover:scale-150 transition-transform" />
            <span className="font-mono font-bold text-lg sm:text-xl tracking-wider text-[#142544]">
              TALENT<span className="text-[#C7A868]">X</span>
            </span>
          </Link>

          <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#142544]/5 text-[#8B6B23] border border-[#C7A868]/30">
            {role} portal
          </span>
        </div>

        {/* Center: Desktop Navigation Links (Landing Page Style) */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
          {navItems.map((item) => {
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-3.5 py-2 rounded-xl text-sm font-sans font-semibold transition-all duration-200 cursor-pointer"
              >
                {active && (
                  <motion.div
                    layoutId="topNavActivePill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-[#142544] rounded-xl shadow-md shadow-[#142544]/15 z-0"
                  />
                )}
                <span className={`relative z-10 text-xs sm:text-sm transition-colors ${
                  active 
                    ? 'text-[#FFFFF0] font-bold' 
                    : 'text-[#585D68] hover:text-[#142544]'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Search, Notifications & User Dropdown */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex relative">
            <Search className="w-4 h-4 text-[#93979F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search protocol..." 
              className="bg-[#FAF7F0] border border-[#142544]/15 rounded-full pl-9 pr-4 py-1.5 text-xs font-medium text-[#142544] placeholder:text-[#93979F] focus:outline-none focus:border-[#C7A868] focus:ring-2 focus:ring-[#C7A868]/20 transition-all w-40 lg:w-48 shadow-xs"
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-xl bg-white border border-[#142544]/15 hover:border-[#C7A868] text-[#142544] transition-colors shadow-xs cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5 text-[#142544]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />
          </motion.button>

          {/* User Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 py-1.5 px-3 rounded-full bg-white border border-[#142544]/15 hover:border-[#C7A868] transition-all cursor-pointer shadow-xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#142544] border border-[#C7A868]/50 flex items-center justify-center shrink-0 shadow-xs">
                <span className="text-[10px] font-mono font-bold text-[#C7A868]">{initials}</span>
              </div>
              <span className="hidden sm:block text-xs font-bold text-[#142544] font-sans truncate max-w-[110px]">
                {displayName}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#8B6B23] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-[90]" onClick={() => setIsDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                    className="absolute right-0 mt-2.5 w-64 rounded-2xl border border-[#142544]/15 p-2 z-[100] shadow-[0_25px_60px_rgba(20,37,68,0.25)] bg-white"
                  >
                    {/* User Header */}
                    <div className="p-3 mb-1.5 bg-[#FAF7F0] rounded-xl border border-[#C7A868]/20 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#142544] border border-[#C7A868]/40 flex items-center justify-center shrink-0">
                        <span className="text-xs font-mono font-bold text-[#C7A868]">{initials}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#142544] truncate">{displayName}</p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                          {role} Verified
                        </span>
                      </div>
                    </div>

                    <div className="space-y-0.5 pt-1">
                      <Link
                        to={`/${role}/settings`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-[#585D68] hover:text-[#142544] hover:bg-[#142544]/5 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-[#8B6B23]" />
                        <span>Settings & Preferences</span>
                      </Link>

                      <div className="h-px bg-[#142544]/10 my-1" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-[#C0424D] hover:bg-[#C0424D]/10 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-[#C0424D]" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* 3-Line Animated Morphing Button for Tablet/Mobile */}
          <div className="xl:hidden">
            <MorphingMenuButton 
              isOpen={mobileMenuOpen} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="xl:hidden border-t border-[#142544]/10 bg-[#FFFFF5]/98 backdrop-blur-2xl overflow-hidden px-4 sm:px-6 py-4 space-y-1.5 shadow-xl"
          >
            {navItems.map((item) => {
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-[#142544] text-[#FFFFF0] shadow-md font-bold'
                      : 'text-[#585D68] hover:text-[#142544] hover:bg-[#142544]/5'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TopBar;
export { TopBar };
