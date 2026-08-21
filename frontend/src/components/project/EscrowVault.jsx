import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Helper to animate numbers
const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 1500; // ms
    const increment = value / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <>{displayValue.toLocaleString()}</>;
};

const EscrowVault = ({ escrow }) => {
  const releasedPercent = (escrow.released / escrow.total) * 100;
  
  return (
    <div className="glass-panel p-6 border-gold-soft/30 shadow-lg shadow-gold/5 overflow-hidden relative">
      {/* Decorative gradient orb */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
      
      <h3 className="font-display font-semibold text-lg text-ink mb-6 relative z-10">TalentX Escrow</h3>
      
      <div className="space-y-6 relative z-10">
        <div>
          <p className="text-xs text-ink-soft mb-1">Total Budget</p>
          <div className="flex items-baseline gap-1 text-2xl font-mono font-bold text-ink">
            <span className="text-gold text-lg">₹</span>
            <AnimatedNumber value={escrow.total} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white/40 rounded-xl border border-verified/10">
            <p className="text-[10px] text-ink-faint uppercase tracking-wider mb-1">Released</p>
            <div className="flex items-baseline gap-1 font-mono text-verified">
              <span className="text-xs">₹</span>
              <AnimatedNumber value={escrow.released} />
            </div>
          </div>
          
          <div className="p-3 bg-white/40 rounded-xl border border-pending/10">
            <p className="text-[10px] text-ink-faint uppercase tracking-wider mb-1">Pending in Vault</p>
            <div className="flex items-baseline gap-1 font-mono text-pending">
              <span className="text-xs">₹</span>
              <AnimatedNumber value={escrow.pending} />
            </div>
          </div>
        </div>
        
        {/* Visual Bar */}
        <div>
          <div className="flex justify-between text-[10px] font-mono text-ink-faint mb-1.5">
            <span>Progress</span>
            <span>{Math.round(releasedPercent)}% Released</span>
          </div>
          <div className="w-full h-2 rounded-full bg-ink/5 overflow-hidden flex">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${releasedPercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-verified"
            />
            <div className="flex-1 bg-pending/30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscrowVault;
