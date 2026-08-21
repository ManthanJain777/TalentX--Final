import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle, ChevronRight, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import Loader from '../ui/Loader';

const AdminDisputes = () => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const response = await api.get('/admin/disputes');
        const mapped = response.data.map(d => ({
          id: d.id,
          project: d.title || d.projectId || 'Project',
          raisedBy: d.raisedBy || 'User',
          reason: d.type || 'Dispute',
          status: d.status?.toLowerCase() || 'open',
          priority: 'high',
          submitted: d.createdAt ? new Date(d.createdAt).toISOString().split('T')[0] : 'N/A',
        }));
        setDisputes(mapped);
      } catch (err) {
        console.error('Error fetching disputes:', err);
        toast.error('Failed to load disputes.');
      } finally {
        setLoading(false);
      }
    };
    fetchDisputes();
  }, []);

  const filteredDisputes = disputes.filter(d => {
    if (activeTab === 'All') return true;
    if (activeTab === 'In Review') return d.status === 'in-review' || d.status === 'under_review';
    return d.status === activeTab.toLowerCase();
  });

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">Dispute Resolution</h2>
          <p className="text-sm text-ink-soft mt-1 font-mono">Arbitrate conflicts and manage escrow holds</p>
        </div>
        <div className="flex gap-2">
          {['All', 'Open', 'In Review', 'Resolved'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === tab ? 'bg-ink text-white' : 'bg-white/50 text-ink-soft hover:bg-white border border-cover/10'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredDisputes.length === 0 ? (
        <div className="glass-panel p-12 text-center text-ink-soft">No disputes found.</div>
      ) : (
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDisputes.map(dispute => (
          <motion.div key={dispute.id} variants={item} className="glass-panel p-6 flex flex-col h-full hover:border-gold-soft/30 transition-colors group">
            <div className="flex justify-between items-start mb-4 gap-4">
              <div className="min-w-0">
                <div className="flex gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-pending/10 text-pending text-[10px] font-mono border border-pending/20 uppercase">
                    {dispute.status}
                  </span>
                  {dispute.priority === 'high' && (
                    <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-mono border border-red-500/20 uppercase flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> High
                    </span>
                  )}
                </div>
                <h4 className="font-display font-semibold text-lg text-ink truncate">{dispute.project}</h4>
                <p className="text-xs text-ink-soft mt-1 flex items-center gap-1.5">
                  Raised by: <span className="font-medium text-ink">{dispute.raisedBy}</span>
                </p>
              </div>
            </div>

            <div className="p-4 bg-white/40 rounded-xl border border-ink/5 mb-6">
              <p className="text-[10px] uppercase font-mono text-ink-faint mb-1">Reason</p>
              <p className="font-medium text-sm text-ink">{dispute.reason}</p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-ink/5">
              <div className="flex items-center gap-2 text-xs text-ink-faint font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>Opened {dispute.submitted}</span>
              </div>
              <Link 
                to={`/admin/disputes/${dispute.id}`}
                className="px-4 py-2 rounded-lg bg-ink text-white text-xs font-medium hover:bg-ink/90 transition-all flex items-center gap-2"
              >
                Review Case
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
      )}
    </div>
  );
};

export default AdminDisputes;
