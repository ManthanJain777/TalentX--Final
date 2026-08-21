import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const DisputeButton = ({ project, onDisputeSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('Milestone Delayed');
  const [description, setDescription] = useState('');
  
  if (project.status !== 'Active') return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 flex items-center gap-1.5"
      >
        <AlertTriangle className="w-3.5 h-3.5" />
        Raise Dispute
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-panel w-full max-w-md overflow-hidden pointer-events-auto"
              >
                <div className="p-6 border-b border-ink/5 bg-red-500/5">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <h3 className="font-display font-semibold text-lg text-red-500">Raise Dispute</h3>
                  </div>
                  <p className="text-xs text-ink-soft">This will pause the project and notify admins.</p>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-ink">Reason</label>
                    <select 
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full bg-white/50 border border-cover/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-300"
                    >
                      <option>Milestone Delayed</option>
                      <option>Deliverable Quality Issue</option>
                      <option>Payment Issue</option>
                      <option>Communication Breakdown</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-ink">Description</label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please provide details about the issue..."
                      className="w-full h-24 bg-white/50 border border-cover/10 rounded-xl p-3 text-sm focus:outline-none focus:border-red-300 resize-none"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-ink">Evidence (Optional)</label>
                    <div className="border-2 border-dashed border-ink/10 rounded-xl p-4 text-center hover:bg-white/30 transition-colors cursor-pointer">
                      <p className="text-xs text-ink-soft">Click to upload screenshots or files</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex justify-end gap-3">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg border border-ink/10 text-ink text-sm font-medium hover:bg-ink/5"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      if (onDisputeSubmit) onDisputeSubmit({ reason, description });
                      setIsOpen(false);
                    }} 
                    className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 shadow-lg shadow-red-500/20"
                  >
                    Submit Dispute
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DisputeButton;
