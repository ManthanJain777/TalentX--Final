import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, AlertTriangle, Lock } from 'lucide-react';
import api from '../../api/api';

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCandidates: 0,
    totalEmployers: 0,
    pendingVerifications: 0,
    openDisputes: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        if (res.data) {
          setStats(res.data);
        }
      } catch (e) {
        console.error('Error fetching admin stats:', e);
      }
    };
    fetchStats();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const statCards = [
    {
      label: 'Total Registered Users',
      value: stats.totalUsers?.toLocaleString() || '0',
      trend: `${stats.totalCandidates || 0} Candidates · ${stats.totalEmployers || 0} Employers`,
      icon: Users,
      color: 'gold',
      badge: 'bg-gold/10 text-gold border-gold/20'
    },
    {
      label: 'Pending Verifications',
      value: stats.pendingVerifications?.toString() || '0',
      trend: stats.pendingVerifications > 0 ? 'Requires action' : 'All clear',
      icon: CheckCircle,
      color: 'risk',
      badge: 'bg-red-500/10 text-red-500 border-red-500/20',
      urgent: stats.pendingVerifications > 0
    },
    {
      label: 'Open Disputes',
      value: stats.openDisputes?.toString() || '0',
      trend: stats.openDisputes > 0 ? 'Arbitration required' : 'Zero disputes',
      icon: AlertTriangle,
      color: 'pending',
      badge: 'bg-pending/10 text-pending border-pending/20'
    },
    {
      label: 'Total Platform Candidates',
      value: stats.totalCandidates?.toString() || '0',
      trend: 'Verified on MongoDB',
      icon: Lock,
      color: 'verified',
      badge: 'bg-verified/10 text-verified border-verified/20'
    }
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div key={index} variants={item} className="glass-panel p-6 relative overflow-hidden group hover:border-gold-soft/30 transition-colors">
            {stat.urgent && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 blur-2xl rounded-full pointer-events-none" />
            )}
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-xl ${stat.badge} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">{stat.trend}</span>
            </div>
            <p className="text-3xl font-display font-bold text-ink mb-1">{stat.value}</p>
            <p className="text-sm text-ink-soft">{stat.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default AdminStats;
