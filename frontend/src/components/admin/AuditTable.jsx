import React, { useState } from 'react';
import { Hash } from 'lucide-react';

const AuditTable = ({ logs }) => {
  const [filter, setFilter] = useState('All');
  
  const getActionColor = (action) => {
    if (action.includes('REJECTED') || action.includes('SUSPENDED')) return 'text-red-500 bg-red-500/10 border-red-500/20';
    if (action.includes('APPROVED')) return 'text-verified bg-verified/10 border-verified/20';
    if (action.includes('RELEASED')) return 'text-gold bg-gold/10 border-gold/20';
    return 'text-pending bg-pending/10 border-pending/20';
  };

  const filtered = logs.filter(l => filter === 'All' || l.action.includes(filter));

  return (
    <div className="glass-panel overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-ink/5 flex justify-between items-center">
        <h3 className="font-display font-semibold text-lg text-ink flex items-center gap-2">
          <Hash className="w-5 h-5 text-gold" />
          Immutable Audit Trail
        </h3>
        <select 
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="bg-white/50 border border-cover/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
        >
          <option value="All">All Actions</option>
          <option value="VERIFICATION">Verifications</option>
          <option value="ESCROW">Escrow</option>
          <option value="DISPUTE">Disputes</option>
          <option value="USER">Users</option>
        </select>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-ink/5 bg-white/20 text-xs text-ink-faint font-mono uppercase tracking-wider">
              <th className="p-4 font-medium">Timestamp</th>
              <th className="p-4 font-medium">User / IP</th>
              <th className="p-4 font-medium">Action</th>
              <th className="p-4 font-medium">Target</th>
              <th className="p-4 font-medium">SHA-256 Hash</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(log => (
              <tr key={log.id} className="border-b border-ink/5 hover:bg-white/40 transition-colors">
                <td className="p-4">
                  <span className="text-xs font-mono text-ink-soft">{log.timestamp}</span>
                </td>
                <td className="p-4">
                  <p className="text-sm font-medium text-ink">{log.user}</p>
                  <p className="text-[10px] font-mono text-ink-faint">{log.ip}</p>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase border ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-xs text-ink">{log.target}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 group relative cursor-help">
                    <span className="text-xs font-mono text-gold bg-gold/5 px-2 py-1 rounded border border-gold/10 truncate max-w-[120px]">
                      {log.hash.substring(0, 16)}...
                    </span>
                    <div className="absolute right-0 top-full mt-1 p-2 bg-ink text-white text-xs font-mono rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-max shadow-xl">
                      {log.hash}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-ink/5 flex justify-between items-center bg-white/20 text-xs text-ink-soft">
        <span>Showing {filtered.length} records</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-ink/10 rounded hover:bg-white">Prev</button>
          <button className="px-3 py-1 border border-ink/10 rounded hover:bg-white">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AuditTable;
