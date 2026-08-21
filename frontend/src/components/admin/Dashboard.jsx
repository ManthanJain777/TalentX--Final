import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollText, Gavel, CheckCircle, Hash, Activity } from 'lucide-react';
import api from '../../api/api';
import AdminStats from './AdminStats';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admin/audit?page=0&size=5');
        const content = res.data?.content || (Array.isArray(res.data) ? res.data : []);
        setLogs(content);
      } catch (err) {
        console.error('Error fetching admin logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const quickActions = [
    {
      title: 'Review Verifications',
      desc: 'Inspect pending candidate identity proofs',
      icon: CheckCircle,
      link: '/admin/verifications',
      color: 'pending'
    },
    {
      title: 'Manage Disputes',
      desc: 'Smart contract escrow arbitration queue',
      icon: Gavel,
      link: '/admin/disputes',
      color: 'risk'
    },
    {
      title: 'View Audit Trail',
      desc: 'Immutable platform logs in MongoDB',
      icon: Hash,
      link: '/admin/audit',
      color: 'gold'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-ink">Platform Overview</h2>
        <p className="text-sm text-ink-soft mt-1 font-mono">Global Arbitration &amp; Governance Dashboard (MongoDB Live)</p>
      </div>

      <AdminStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Activity & Charts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-semibold text-ink flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-gold" />
              Real-time Protocol Activity
            </h3>
            <Link to="/admin/audit" className="text-xs font-mono text-ink-soft hover:text-gold transition-colors">
              Full Ledger &rarr;
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-0 overflow-hidden"
          >
            {loading ? (
              <div className="p-8 text-center"><Loader /></div>
            ) : logs.length === 0 ? (
              <div className="p-8">
                <EmptyState title="No Recent Audit Logs" description="Platform events and actions will be logged here in real-time." />
              </div>
            ) : (
              <div className="divide-y divide-cover/5">
                {logs.map((activity, index) => (
                  <div key={activity.id || index} className="p-4 hover:bg-white/40 transition-colors group flex items-center justify-between table-row-hover">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-gold" />
                        <h4 className="text-sm font-semibold text-ink">{activity.action || activity.eventType || 'System Event'}</h4>
                      </div>
                      <p className="text-xs font-mono text-ink-soft ml-4">User: {activity.userId || activity.target || 'System'}</p>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="font-mono text-[10px] text-ink-faint">
                        {activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : 'Recent'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 flex flex-col items-center justify-center min-h-[200px]"
          >
            <Activity className="w-8 h-8 text-gold/30 mb-2" />
            <p className="text-sm text-ink-soft">MongoDB Live Analytics Feed</p>
            <Link to="/admin/analytics" className="text-xs font-mono text-gold mt-2 hover:underline">
              View full platform metrics &rarr;
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Quick Actions */}
        <div className="space-y-6">
          <h3 className="text-lg font-display font-semibold text-ink mb-6">Quick Actions</h3>
          
          <div className="flex flex-col gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={action.link} className="block">
                    <div className="glass-panel p-5 hover:border-gold-soft/30 transition-all group relative overflow-hidden">
                      <div className={`absolute top-0 right-0 w-16 h-16 bg-${action.color}/10 blur-2xl rounded-full pointer-events-none group-hover:bg-${action.color}/20 transition-colors`} />
                      <div className="flex items-start gap-4 relative z-10">
                        <div className={`w-10 h-10 rounded-xl bg-${action.color}/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-5 h-5 text-${action.color}`} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-ink group-hover:text-gold transition-colors">{action.title}</h4>
                          <p className="text-xs text-ink-soft mt-1">{action.desc}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
