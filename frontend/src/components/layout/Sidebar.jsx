import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileCheck, Sparkles, Inbox, Briefcase, MessageSquare,
  Settings, PlusCircle, Search, Users, Award, AlertTriangle, FileText,
  TrendingUp, LogOut, X, ShieldCheck, Pin, PinOff, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import MorphingMenuButton from '../common/MorphingMenuButton';

const Sidebar = ({ isOpen, onClose, onStateChange }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isExpanded = isOpen;

  const role = (user?.role || 'candidate').toLowerCase();
  const displayName = user?.fullName || user?.name || user?.companyName || user?.email?.split('@')[0] || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  // Navigation menus by role
  const navItemsByRole = {
    candidate: [
      { path: '/candidate/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/candidate/passport', label: 'Talent Passport', icon: FileCheck },
      { path: '/candidate/matches', label: 'My Matches', icon: Sparkles },
      { path: '/candidate/invitations', label: 'Invitations', icon: Inbox },
      { path: '/candidate/projects', label: 'My Projects', icon: Briefcase },
      { path: '/candidate/messages', label: 'Messages', icon: MessageSquare },
      { path: '/candidate/settings', label: 'Settings', icon: Settings },
    ],
    employer: [
      { path: '/employer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/employer/opportunities', label: 'My Opportunities', icon: Briefcase },
      { path: '/employer/challenges/new', label: 'Post Challenge', icon: PlusCircle },
      { path: '/employer/discovery', label: 'Talent Discovery', icon: Search },
      { path: '/employer/projects', label: 'Governed Projects', icon: FileCheck },
      { path: '/employer/messages', label: 'Messages', icon: MessageSquare },
      { path: '/employer/settings', label: 'Company Settings', icon: Settings },
    ],
    admin: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/admin/users', label: 'User Directory', icon: Users },
      { path: '/admin/verifications', label: 'Verifications', icon: Award },
      { path: '/admin/opportunities', label: 'Opportunities', icon: Briefcase },
      { path: '/admin/disputes', label: 'Disputes Room', icon: AlertTriangle },
      { path: '/admin/audit', label: 'Audit Logs', icon: FileText },
      { path: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
      { path: '/admin/settings', label: 'System Settings', icon: Settings },
    ],
  };

  const navItems = navItemsByRole[role] || navItemsByRole.candidate;
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col justify-between overflow-hidden backdrop-blur-2xl bg-[#FCFAF4]/98 border-r border-[#142544]/15 shadow-[12px_0_40px_rgba(20,37,68,0.12)] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-[74px] flex items-center justify-between px-5 border-b border-[#142544]/10 relative">
            <Link to="/" className="flex items-center gap-3 group min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#142544] to-[#0D1424] border border-[#C7A868]/40 flex items-center justify-center text-[#C7A868] shadow-sm group-hover:scale-105 transition-all shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#C7A868]" />
              </div>
              
              <div className="overflow-hidden whitespace-nowrap">
                <span className="font-sans text-lg font-extrabold tracking-wider text-[#142544] block leading-none">
                  TALENT<span className="text-[#C7A868]">X</span>
                </span>
                <span className="font-mono text-[9px] text-[#8B6B23] uppercase tracking-widest mt-1 block font-bold">
                  Protocol &bull; LIVE
                </span>
              </div>
            </Link>

            <MorphingMenuButton
              isOpen={true}
              onClick={onClose}
              className="w-8 h-8 rounded-xl"
            />
          </div>

          {/* Navigation Items */}
          <nav className="px-2.5 py-4 space-y-1.5" aria-label="Sidebar Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="relative block group"
                  title={!isExpanded ? item.label : undefined}
                >
                  <motion.div
                    whileHover={{ x: 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-sans transition-all relative z-10 ${
                      active
                        ? 'text-white font-bold bg-gradient-to-r from-[#142544] to-[#1E345B] shadow-md shadow-[#142544]/15'
                        : 'text-[#585D68] hover:text-[#142544] hover:bg-[#142544]/5 font-medium'
                    }`}
                  >
                    <div className={`w-5 h-5 flex items-center justify-center shrink-0 transition-colors ${active ? 'text-[#C7A868]' : 'text-[#8B6B23]/70 group-hover:text-[#142544]'}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-between flex-1 overflow-hidden whitespace-nowrap"
                        >
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                              active ? 'bg-[#C7A868]/30 text-[#F7F3E8]' : 'bg-[#142544]/10 text-[#142544]'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer */}
        <div className="p-3 border-t border-[#142544]/10 space-y-2">
          <div className={`flex items-center gap-3 p-2 rounded-2xl bg-white/80 border border-[#142544]/10 transition-all ${isExpanded ? 'justify-between' : 'justify-center'}`}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#142544] to-[#0D1424] border border-[#C7A868]/40 flex items-center justify-center shrink-0 relative shadow-xs">
              <span className="font-mono text-xs font-bold text-[#C7A868]">{initials}</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 min-w-0 overflow-hidden"
                >
                  <div className="text-xs font-bold text-[#142544] font-sans truncate">
                    {displayName}
                  </div>
                  <div className="text-[10px] text-[#8B6B23] font-mono truncate capitalize font-semibold">
                    {role} &bull; Verified
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    logout();
                    navigate('/auth/login');
                  }}
                  className="p-1.5 text-[#93979F] hover:text-[#C0424D] transition-colors shrink-0 rounded-lg hover:bg-[#C0424D]/10 cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
export { Sidebar };
