import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IndianRupee, Users, ChevronRight, Trophy } from 'lucide-react';
import ChallengeTimer from './ChallengeTimer';

const ChallengeCard = ({ challenge, role = 'candidate' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isClosed = challenge.status !== 'open';
  const hasWinner = challenge.winners && challenge.winners.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, rotateX: 2, rotateY: 2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
      className={`glass-2 p-6 flex flex-col h-full transition-all duration-300 relative overflow-hidden ${
        isHovered ? 'border-gold-soft/40 shadow-xl shadow-gold/5' : 'border-cover/10'
      }`}
    >
      {/* Background Glow */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} 
        style={{ pointerEvents: 'none' }} 
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border uppercase ${
            isClosed 
              ? hasWinner ? 'bg-verified/10 text-verified border-verified/20' : 'bg-ink/5 text-ink-soft border-ink/10'
              : 'bg-gold/10 text-gold border-gold/20'
          }`}>
            {challenge.status}
          </span>
          <h3 className="font-display font-semibold text-lg text-ink mt-3 leading-snug">{challenge.title}</h3>
          <p className="text-sm text-ink-soft mt-1">{challenge.employer}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center text-gold font-mono font-bold text-xl">
            <IndianRupee className="w-5 h-5" />
            <span>{challenge.prize}</span>
          </div>
          <span className="text-[10px] text-ink-faint uppercase font-mono mt-1">Prize Pool</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {challenge.skills.map((skill, i) => (
          <span key={i} className="px-2.5 py-1 rounded-md bg-white/40 border border-ink/5 text-xs text-ink font-medium">
            {skill}
          </span>
        ))}
      </div>

      {/* Footer Details */}
      <div className="mt-auto space-y-4 relative z-10">
        <div className="flex items-center justify-between text-sm text-ink-soft">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span className="font-mono">{challenge.submissions} Submissions</span>
          </div>
          {hasWinner && (
            <div className="flex items-center gap-1.5 text-verified">
              <Trophy className="w-4 h-4" />
              <span className="font-mono text-xs">Winner Selected</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-ink/5">
          {!isClosed ? (
            <ChallengeTimer deadline={challenge.deadline} />
          ) : (
            <span className="font-mono text-xs text-ink-faint">Deadline Passed</span>
          )}
          
          <Link 
            to={`/${role}/challenges/${challenge.id}`}
            className="flex items-center gap-1 text-sm font-medium text-ink hover:text-gold transition-colors"
          >
            View Details <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;
