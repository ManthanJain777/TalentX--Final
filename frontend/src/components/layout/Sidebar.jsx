import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FileCheck, Sparkles, Inbox, Briefcase, MessageSquare,
  Settings, PlusCircle, Search, Users, Award, AlertTriangle, FileText,
  TrendingUp, LogOut, X, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col justify-between transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{
        background: 'rgba(10,10,11,0.95)',
        backdropFilter: 'blur(24px) saturate(1.5)',
        borderRight: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      {/* Brand Header */}
      <div>
        <div className="h-[76px] flex items-center justify-between px-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-cover border border-gold/40 flex items-center justify-center text-gold shadow-xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-white block leading-none">
                TALENT<span className="text-gold">X</span>
              </span>
              <span className="font-mono text-[9px] text-gold-soft/70 uppercase tracking-widest mt-1 block">
                Protocol v2.0 &bull; LIVE
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-6 space-y-1.5" aria-label="Sidebar Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="relative block"
              >
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-body transition-colors relative z-10 ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebarActivePill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-white/10 border border-gold/30 rounded-xl shadow-[0_2px_12px_rgba(139,107,35,0.15)] z-[-1]"
                    />
                  )}
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? 'text-gold' : 'text-white/40 group-hover:text-white/80'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                      active ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/60'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-white/5 space-y-4">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white/5 border border-white/5 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-cover border border-gold/40 flex items-center justify-center shrink-0 relative">
            <span className="font-mono text-xs font-bold text-gold">{initials}</span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0A0A0B] animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white font-body truncate group-hover:text-gold transition-colors">
              {displayName}
            </div>
            <div className="text-[10px] text-white/50 font-mono truncate">
              {user?.email || 'user@talentx.proof'}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              logout();
              navigate('/auth/login');
            }}
            className="p-2 text-white/40 hover:text-red-400 transition-colors shrink-0"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </aside>
  );
};

export default Sidebar;
