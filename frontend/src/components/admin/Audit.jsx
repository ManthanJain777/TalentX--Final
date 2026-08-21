import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import AuditTable from './AuditTable';
import { Download } from 'lucide-react';
import Loader from '../ui/Loader';

const AdminAudit = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/admin/audit');
        const mapped = (response.data.content || []).map(log => ({
          id: log.id,
          timestamp: log.timestamp ? new Date(log.timestamp).toLocaleString() : 'N/A',
          user: log.userName || 'System',
          action: log.action || 'UNKNOWN_ACTION',
          target: log.details || log.entityId || 'N/A',
          ip: log.ipAddress || '0.0.0.0',
          hash: log.hash || '0x00000000000000000000000000000000',
        }));
        setLogs(mapped);
      } catch (err) {
        console.error('Error fetching audit logs:', err);
        toast.error('Failed to load audit logs.');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-display font-bold text-ink">System Audit Logs</h2>
          <p className="text-sm text-ink-soft mt-1 font-mono">Immutable cryptographic record of platform actions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-ink border border-ink/10 rounded-lg text-sm font-medium hover:bg-gold/5 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex-1 glass-panel rounded-xl border border-ink/5 overflow-hidden flex flex-col">
        <div className="p-4 bg-ink text-white font-mono text-xs flex justify-between items-center">
          <div className="flex gap-4">
            <span className="text-white/60">NODE:</span> <span className="text-gold">validator-us-east-1</span>
            <span className="text-white/60">BLOCK:</span> <span className="text-gold">#14,592,801</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-verified animate-pulse"></div>
            Syncing Live
          </div>
        </div>
        <AuditTable logs={logs} />
      </div>
    </div>
  );
};

export default AdminAudit;
