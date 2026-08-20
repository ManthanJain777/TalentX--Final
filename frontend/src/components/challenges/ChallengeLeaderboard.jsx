import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink } from 'lucide-react';

const ChallengeLeaderboard = ({ submissions, winners }) => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  // Sort: Winners first, then by date
  const sorted = [...submissions].sort((a, b) => {
    const aIsWinner = winners.some(w => w.candidate === a.candidate);
    const bIsWinner = winners.some(w => w.candidate === b.candidate);
    if (aIsWinner && !bIsWinner) return -1;
    if (!aIsWinner && bIsWinner) return 1;
    return new Date(a.submittedAt) - new Date(b.submittedAt);
  });

  return (
    <div className="glass-2 overflow-hidden">
      <div className="p-6 border-b border-ink/5 flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg text-ink flex items-center gap-2">
          <Trophy className="w-5 h-5 text-gold" />
          Submissions Leaderboard
        </h3>
        <span className="text-xs font-mono text-ink-soft">{submissions.length} Total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-ink/5 bg-white/20 text-[10px] text-ink-faint font-mono uppercase tracking-wider">
              <th className="p-4 font-medium w-16 text-center">Rank</th>
              <th className="p-4 font-medium">Candidate</th>
              <th className="p-4 font-medium">Submitted</th>
              <th className="p-4 font-medium text-right">Solution</th>
            </tr>
          </thead>
          <motion.tbody variants={container} initial="hidden" animate="show">
            {sorted.map((sub, idx) => {
              const isWinner = winners.some(w => w.candidate === sub.candidate);
              
              return (
                <motion.tr 
                  key={sub.id} 
                  variants={item} 
                  className={`border-b border-ink/5 hover:bg-white/40 transition-colors ${isWinner ? 'bg-gold/5 hover:bg-gold/10' : ''}`}
                >
                  <td className="p-4 text-center">
                    {isWinner ? (
                      <span className="inline-flex w-6 h-6 items-center justify-center bg-gold text-white rounded-full text-xs font-bold shadow-lg shadow-gold/20">
                        1
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-ink-faint">{idx + 1}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-display shrink-0 ${isWinner ? 'bg-gradient-to-br from-gold to-gold-soft' : 'bg-gradient-to-br from-cover to-cover-deep'}`}>
                        {sub.candidate.charAt(0)}
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${isWinner ? 'text-gold' : 'text-ink'}`}>
                          {sub.candidate}
                          {isWinner && <span className="ml-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-gold/10 border border-gold/20">Winner</span>}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-xs font-mono text-ink-soft">
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </p>
                    <p className="text-[10px] font-mono text-ink-faint">
                      {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>
                  <td className="p-4 text-right">
                    <a 
                      href={sub.solutionUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink/10 text-ink text-xs font-medium hover:bg-white hover:border-gold/30 transition-colors"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </motion.tr>
              );
            })}
            
            {sorted.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-sm text-ink-soft">
                  No submissions yet.
                </td>
              </tr>
            )}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};

export default ChallengeLeaderboard;
