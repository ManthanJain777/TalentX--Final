import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, SplitSquareVertical } from 'lucide-react';

const RulingMatrix = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRuling, setSelectedRuling] = useState(null);

  const rulings = [
    {
      id: 'refund',
      title: 'Refund to Employer',
      desc: 'Deliverables failed to meet criteria or freelancer defaulted.',
      icon: XCircle,
      color: 'red-500',
      bgHover: 'hover:bg-red-50',
      border: 'border-red-500/20'
    },
    {
      id: 'split',
      title: '50/50 Split',
      desc: 'Partial delivery or mutual fault. Escrow divided equally.',
      icon: SplitSquareVertical,
      color: 'gold',
      bgHover: 'hover:bg-gold/5',
      border: 'border-gold/20'
    },
    {
      id: 'release',
      title: 'Release to Candidate',
      desc: 'Work delivered to spec. Employer improperly withheld funds.',
      icon: CheckCircle,
      color: 'verified',
      bgHover: 'hover:bg-verified/5',
      border: 'border-verified/20'
    }
  ];

  const handleSelect = (ruling) => {
    setSelectedRuling(ruling);
    setShowConfirm(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rulings.map((r) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.id}
              whileHover={{ y: -5 }}
              className={`glass-panel p-6 flex flex-col items-center text-center cursor-pointer transition-colors border-2 border-transparent hover:${r.border} ${r.bgHover}`}
              onClick={() => handleSelect(r)}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 text-${r.color} bg-${r.color}/10`}>
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-display font-semibold text-ink mb-2">{r.title}</h4>
              <p className="text-xs text-ink-soft">{r.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {showConfirm && selectedRuling && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirm(false)}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-panel w-full max-w-sm overflow-hidden pointer-events-auto p-6 text-center"
              >
                <selectedRuling.icon className={`w-12 h-12 mx-auto text-${selectedRuling.color} mb-4`} />
                <h3 className="font-display font-semibold text-xl text-ink mb-2">Confirm Ruling</h3>
                <p className="text-sm text-ink-soft mb-6">
                  Are you sure you want to <strong>{selectedRuling.title}</strong>? This action will execute the smart contract and is irreversible.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 py-2.5 rounded-xl border border-ink/10 text-ink text-sm font-medium hover:bg-ink/5"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setShowConfirm(false)}
                    className={`flex-1 py-2.5 rounded-xl text-white text-sm font-medium shadow-lg bg-${selectedRuling.color} shadow-${selectedRuling.color}/20`}
                  >
                    Execute
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

export default RulingMatrix;
