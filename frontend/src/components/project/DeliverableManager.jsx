import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, CheckCircle, Clock, XCircle, ChevronDown } from 'lucide-react';

const DeliverableManager = ({ deliverables, isEmployer }) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="flex items-center gap-1 text-[10px] text-verified bg-verified/10 px-2 py-0.5 rounded border border-verified/20 font-mono uppercase"><CheckCircle className="w-3 h-3" /> Approved</span>;
      case 'Rejected':
        return <span className="flex items-center gap-1 text-[10px] text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 font-mono uppercase"><XCircle className="w-3 h-3" /> Rejected</span>;
      case 'Pending':
      default:
        return <span className="flex items-center gap-1 text-[10px] text-pending bg-pending/10 px-2 py-0.5 rounded border border-pending/20 font-mono uppercase"><Clock className="w-3 h-3" /> Pending</span>;
    }
  };

  return (
    <div className="glass-panel p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display font-semibold text-lg text-ink">Deliverables</h3>
        {!isEmployer && (
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/50 border border-cover/10 rounded-lg hover:border-gold/30 hover:text-gold transition-colors shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload New
          </button>
        )}
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {deliverables.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-ink/5 rounded-xl">
            <File className="w-8 h-8 text-ink/20 mb-2" />
            <p className="text-sm text-ink-soft">No deliverables uploaded yet.</p>
          </div>
        ) : (
          deliverables.map((d) => (
            <div key={d.id} className="border border-ink/5 rounded-xl overflow-hidden bg-white/30 transition-colors hover:border-gold-soft/30">
              <div 
                className="p-3 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-ink/5 flex items-center justify-center shrink-0">
                    <File className="w-4 h-4 text-ink-soft" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink truncate flex items-center gap-2">
                      <span className="text-gold font-mono text-xs">{d.version}</span>
                      {d.fileName}
                    </p>
                    <p className="text-[10px] text-ink-faint font-mono mt-0.5">Uploaded {d.uploaded} · {d.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {getStatusDisplay(d.status)}
                  <ChevronDown className={`w-4 h-4 text-ink-faint transition-transform ${expandedId === d.id ? 'rotate-180' : ''}`} />
                </div>
              </div>
              
              <AnimatePresence>
                {expandedId === d.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-white/50 border-t border-ink/5"
                  >
                    <div className="p-4 space-y-4">
                      {isEmployer && d.status === 'Pending' && (
                        <div className="flex gap-2 justify-end">
                          <button className="px-3 py-1.5 text-xs font-medium text-red-500 border border-red-500/20 rounded-lg hover:bg-red-50">Reject Revision</button>
                          <button className="px-3 py-1.5 text-xs font-medium text-white bg-verified rounded-lg hover:bg-verified/90">Approve File</button>
                        </div>
                      )}
                      <div className="text-xs text-ink-soft">
                        <p className="font-medium text-ink mb-1">Submission Notes:</p>
                        <p className="italic">"Here is the finalized design file with all requested changes applied."</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadOpen(false)}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-panel w-full max-w-md p-6 overflow-hidden pointer-events-auto"
              >
                <h3 className="font-display font-semibold text-lg text-ink mb-4">Upload Deliverable</h3>
                
                <div className="border-2 border-dashed border-ink/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/30 hover:border-gold/30 transition-colors cursor-pointer mb-4">
                  <Upload className="w-8 h-8 text-gold mb-2" />
                  <p className="text-sm font-medium text-ink">Click to browse or drag file here</p>
                  <p className="text-xs text-ink-faint mt-1">PDF, ZIP, FIG (Max 50MB)</p>
                </div>
                
                <div className="space-y-1.5 mb-6">
                  <label className="text-xs font-medium text-ink">Revision Notes</label>
                  <textarea 
                    placeholder="Describe what's included in this version..."
                    className="w-full h-20 bg-white/50 border border-cover/10 rounded-xl p-3 text-sm focus:outline-none focus:border-gold/30 resize-none"
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setIsUploadOpen(false)}
                    className="px-4 py-2 rounded-lg border border-ink/10 text-ink text-sm font-medium hover:bg-ink/5"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsUploadOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gold text-white text-sm font-medium hover:bg-gold-soft shadow-lg shadow-gold/20"
                  >
                    Upload Version
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeliverableManager;
