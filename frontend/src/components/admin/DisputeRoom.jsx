import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Clock, File, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import RulingMatrix from './RulingMatrix';
import Loader from '../ui/Loader';

const DisputeRoom = () => {
  const { id } = useParams();
  const [d, setDispute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDispute = async () => {
      try {
        const res = await api.get(`/disputes/${id || '1'}`);
        const data = res.data;
        setDispute({
          ...data,
          project: data.title || data.projectId || 'Project',
          description: data.description || 'No description provided.',
          priority: 'high',
          parties: { employer: data.raisedAgainst || 'Employer', freelancer: data.raisedBy || 'Freelancer' },
          chatLogs: [],
          deliverables: [],
          milestones: [],
        });
      } catch (err) {
        console.error('Error fetching dispute:', err);
        toast.error('Failed to load dispute room.');
      } finally {
        setLoading(false);
      }
    };
    fetchDispute();
  }, [id]);

  if (loading || !d) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink mb-1">Dispute Resolution Room</h2>
          <p className="text-sm text-ink-soft font-mono">Project: {d.project}</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-mono uppercase tracking-wider border border-red-500/20 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" /> {d.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Evidence Lockbox */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-6 flex flex-col max-h-[600px]">
            <h3 className="font-display font-semibold text-lg text-ink mb-4 flex items-center gap-2">
              Evidence Lockbox
            </h3>
            
            <div className="overflow-y-auto space-y-6 pr-2 custom-scrollbar">
              {/* Chat Logs */}
              <div>
                <h4 className="text-xs font-mono text-ink-faint uppercase tracking-wider mb-3">Project Chat History</h4>
                <div className="space-y-3 bg-white/30 rounded-xl p-4 border border-ink/5">
                  {d.chatLogs.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.sender === d.parties.freelancer ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-ink-faint">{msg.sender}</span>
                      </div>
                      <div className={`max-w-[85%] p-3 rounded-xl text-xs ${msg.sender === d.parties.freelancer ? 'bg-gold/10 border-gold/20' : 'bg-white/80 border-ink/5'} border`}>
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div>
                <h4 className="text-xs font-mono text-ink-faint uppercase tracking-wider mb-3">Milestone State</h4>
                <div className="space-y-2 bg-white/30 rounded-xl p-4 border border-ink/5">
                  {d.milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {m.completed ? <CheckCircle className="w-4 h-4 text-verified" /> : <Clock className="w-4 h-4 text-pending" />}
                      <span className={`text-sm ${m.completed ? 'text-ink-soft line-through' : 'text-ink font-medium'}`}>{m.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-mono text-ink-faint uppercase tracking-wider mb-3">Deliverable Audit</h4>
                <div className="space-y-2 bg-white/30 rounded-xl p-4 border border-ink/5">
                  {d.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/50 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <File className="w-4 h-4 text-ink-soft" />
                        <span className="text-xs font-mono text-ink">{del.version}</span>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${del.status === 'Approved' ? 'bg-verified/10 text-verified' : 'bg-pending/10 text-pending'}`}>
                        {del.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Dispute Resolution Panel */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-6">
            <h3 className="font-display font-semibold text-lg text-ink mb-6">Dispute Details</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                <p className="text-[10px] uppercase font-mono text-ink-faint mb-1">Raised By</p>
                <p className="font-medium text-sm text-ink">{d.raisedBy}</p>
                <p className="text-xs text-ink-soft">(Employer)</p>
              </div>
              <div className="p-4 bg-white/40 rounded-xl border border-ink/5">
                <p className="text-[10px] uppercase font-mono text-ink-faint mb-1">Against</p>
                <p className="font-medium text-sm text-ink">{d.parties.freelancer}</p>
                <p className="text-xs text-ink-soft">(Freelancer)</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-[10px] uppercase font-mono text-ink-faint mb-1">Primary Reason</p>
              <p className="font-medium text-ink bg-white/50 inline-block px-3 py-1.5 rounded-lg border border-ink/5">{d.reason}</p>
            </div>

            <div className="mb-6">
              <p className="text-[10px] uppercase font-mono text-ink-faint mb-1">Description Provided</p>
              <p className="text-sm text-ink-soft bg-white/40 p-4 rounded-xl border border-ink/5 italic">"{d.description}"</p>
            </div>

            <div>
              <p className="text-[10px] uppercase font-mono text-ink-faint mb-2">Arbitration Notes (Internal)</p>
              <textarea 
                placeholder="Log your arbitration process here..."
                className="w-full h-32 bg-white/50 border border-cover/10 rounded-xl p-4 text-sm focus:outline-none focus:border-gold/30 resize-none"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="font-display font-semibold text-lg text-ink mb-4 pl-1">Final Ruling</h3>
        <RulingMatrix />
      </motion.div>
    </div>
  );
};

export default DisputeRoom;
