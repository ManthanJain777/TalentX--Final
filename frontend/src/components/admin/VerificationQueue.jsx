import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import VerificationModal from './VerificationModal';

const VerificationQueue = ({ verifications }) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = verifications.filter(v => {
    if (filter !== 'All' && v.type !== filter) return false;
    if (search && !v.user.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <div className="glass-2 overflow-hidden flex flex-col h-full min-h-[500px]">
        {/* Header & Controls */}
        <div className="p-6 border-b border-ink/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-semibold text-lg text-ink">Verification Queue</h3>
            <span className="px-3 py-1 rounded-full bg-pending/10 text-pending text-xs font-mono border border-pending/20">
              {verifications.length} Pending
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              {['All', 'Skill', 'Identity', 'Certification'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === t ? 'bg-ink text-white' : 'bg-white/50 text-ink-soft hover:bg-white border border-cover/10'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
              <input 
                type="text" 
                placeholder="Search user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 rounded-lg border border-cover/10 bg-white/50 text-sm focus:outline-none focus:border-gold/30"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-ink/5 bg-white/20 text-xs text-ink-faint font-mono uppercase tracking-wider">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Evidence</th>
                <th className="p-4 font-medium">Submitted</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <motion.tbody variants={container} initial="hidden" animate="show">
              {filtered.map(v => (
                <motion.tr key={v.id} variants={item} className="border-b border-ink/5 hover:bg-white/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cover to-cover-deep flex items-center justify-center text-white text-xs font-display">
                        {v.user.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-ink">{v.user}</p>
                        <p className="text-[10px] text-ink-soft">{v.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-mono border border-gold/20 uppercase">
                      {v.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-ink-soft max-w-[250px] truncate" title={v.evidence}>{v.evidence}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-xs font-mono text-ink-faint">{v.submitted}</p>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-pending/10 text-pending text-[10px] font-mono border border-pending/20 uppercase">
                      {v.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setSelected(v)}
                      className="px-4 py-1.5 rounded-lg border border-ink/10 text-ink text-xs font-medium hover:bg-gold hover:border-gold hover:text-white transition-colors"
                    >
                      Review
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-sm text-ink-soft">
                    No verifications found in queue.
                  </td>
                </tr>
              )}
            </motion.tbody>
          </table>
        </div>
      </div>
      
      <VerificationModal 
        isOpen={!!selected} 
        onClose={() => setSelected(null)} 
        verification={selected} 
      />
    </>
  );
};

export default VerificationQueue;
