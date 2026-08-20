import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, GitBranch, FileText, CheckCircle, XCircle } from 'lucide-react';

const VerificationModal = ({ isOpen, onClose, verification }) => {
  const [notes, setNotes] = useState('');

  if (!verification) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-2 w-full max-w-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-ink/5 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-xl text-ink">Review Verification</h3>
                  <p className="text-sm text-ink-soft font-mono mt-1">Submitted on {verification.submitted}</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-mono uppercase tracking-wider border border-gold/20">
                    {verification.type}
                  </span>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-ink/5 transition-colors">
                    <span className="text-ink-soft leading-none">×</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div className="flex items-center gap-4 bg-white/40 p-4 rounded-xl border border-ink/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cover to-cover-deep flex items-center justify-center text-white text-lg font-display shrink-0">
                    {verification.user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-ink">{verification.user}</p>
                    <p className="text-sm text-ink-soft">{verification.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-ink flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gold" />
                    Evidence Provided
                  </h4>
                  <div className="bg-white/50 border border-cover/10 p-6 rounded-xl">
                    <p className="text-sm text-ink mb-4">{verification.evidence}</p>
                    
                    {/* Dynamic evidence view based on type */}
                    {verification.type === 'Skill' && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-ink-soft">
                          <GitBranch className="w-4 h-4" /> <span>{verification.details.githubRepos.length} Repositories</span>
                        </div>
                        <ul className="list-disc pl-5 text-sm font-mono text-ink-faint space-y-1">
                          {verification.details.githubRepos.map(repo => <li key={repo}>{repo}</li>)}
                        </ul>
                        <div className="flex gap-4 mt-4 pt-4 border-t border-ink/5">
                          <div>
                            <p className="text-xs text-ink-faint uppercase">PRs Merged</p>
                            <p className="font-mono text-ink font-semibold">{verification.details.prsMerged}</p>
                          </div>
                          <div>
                            <p className="text-xs text-ink-faint uppercase">Stars</p>
                            <p className="font-mono text-ink font-semibold">{verification.details.stars}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {(verification.type === 'Identity' || verification.type === 'Certification') && (
                      <div className="border-2 border-dashed border-ink/10 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-white/30">
                        <FileText className="w-8 h-8 text-ink-faint mb-2" />
                        <p className="text-xs text-ink-soft font-mono">
                          {verification.details.documentType || verification.details.certificateName}
                        </p>
                        <p className="text-[10px] text-ink-faint mt-1">Preview Document</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink">Admin Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add internal notes about this verification decision..."
                    className="w-full h-24 bg-white/50 border border-cover/10 rounded-xl p-4 text-sm focus:outline-none focus:border-gold/30 resize-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-ink/5 bg-white/30 flex justify-end gap-3">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-red-500/20 text-red-500 hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
                <button 
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-pending/20 text-pending hover:bg-pending/10 transition-colors text-sm font-medium"
                >
                  Request Info
                </button>
                <button 
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg bg-verified text-white hover:bg-verified/90 transition-colors text-sm font-medium shadow-lg shadow-verified/20 flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VerificationModal;
