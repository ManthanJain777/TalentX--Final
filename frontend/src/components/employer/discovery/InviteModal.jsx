import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import MatchScoreDisplay from './MatchScoreDisplay';

const InviteModal = ({ isOpen, onClose, candidate }) => {
  const [message, setMessage] = useState('');
  
  if (!candidate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-2 w-full max-w-lg overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-ink/5">
                <h3 className="font-display font-semibold text-xl text-ink">Invite to Apply</h3>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-ink/5 text-ink-faint hover:text-ink transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Candidate Preview */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-cover/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cover to-cover-deep flex items-center justify-center text-white text-lg font-display shrink-0">
                    {candidate.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-ink truncate">{candidate.name}</p>
                    <p className="text-sm text-ink-soft truncate">{candidate.headline}</p>
                  </div>
                  <div className="shrink-0">
                    <MatchScoreDisplay score={candidate.matchScore} size={48} />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink">Message (Optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Hi ${candidate.name.split(' ')[0]}, your profile caught our eye...`}
                    className="w-full h-32 bg-white/50 border border-cover/10 rounded-xl p-4 text-sm focus:outline-none focus:border-gold/30 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 pt-0">
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl border border-ink/10 text-ink hover:bg-ink/5 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={onClose} // In real app, trigger invite action
                  className="px-6 py-2.5 rounded-xl bg-gold text-white hover:bg-gold-soft transition-colors text-sm font-medium shadow-lg shadow-gold/20 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Invitation
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InviteModal;
