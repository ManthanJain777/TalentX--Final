import React, { useRef, useState } from 'react';
import { CheckCircle, MapPin } from 'lucide-react';
import MatchScoreDisplay from './MatchScoreDisplay';
import SkillBreakdown from './SkillBreakdown';
import MatchExplanation from './MatchExplanation';
import { SpotlightCard } from '../../react-bits/SpotlightCard';

const CandidateCard = ({ candidate, onInvite }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt angles based on mouse position relative to center
    const tiltX = (y / rect.height - 0.5) * -10; // Max tilt 5 deg
    const tiltY = (x / rect.width - 0.5) * 10;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <SpotlightCard
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s ease-out',
      }}
      className="p-6 flex flex-col h-full relative group transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 !border-cover/10"
      spotlightColor="rgba(199, 168, 104, 0.1)"
    >
      {/* Top Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-cover to-cover-deep flex items-center justify-center text-white text-xl font-display border border-white/10 shadow-md">
            {candidate.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h4 className="font-display font-semibold text-lg text-ink truncate">{candidate.name}</h4>
            <p className="text-sm text-ink-soft truncate">{candidate.headline}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-ink-faint">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{candidate.location}</span>
            </div>
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-center gap-1">
          <MatchScoreDisplay score={candidate.matchScore} size={56} />
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-1.5">
          {candidate.skills.slice(0, 5).map(skill => (
            <span key={skill} className="px-2.5 py-1 rounded-full bg-white/50 border border-cover/5 text-[11px] font-mono text-ink-soft">
              {skill}
            </span>
          ))}
          {candidate.skills.length > 5 && (
            <span className="px-2.5 py-1 rounded-full bg-ink/5 border border-ink/5 text-[11px] font-mono text-ink-faint">
              +{candidate.skills.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Verified Sources */}
      <div className="flex items-center gap-1.5 mb-6 text-xs text-ink-soft">
        <CheckCircle className="w-3.5 h-3.5 text-verified" />
        <span className="font-mono">{candidate.verifiedSources} verified sources</span>
      </div>

      {/* Breakdown (Reveals on hover via CSS in parent, or we can just always show it) */}
      <div className="flex-1 space-y-4 mb-6">
        <SkillBreakdown breakdown={candidate.breakdown} />
        <MatchExplanation explanation={candidate.explanation} />
      </div>

      {/* Actions */}
      <div className="mt-auto pt-4 border-t border-ink/5 flex gap-3">
        <button 
          className="flex-1 py-2.5 rounded-xl border border-ink/10 text-ink hover:bg-ink/5 transition-colors text-sm font-medium"
        >
          View Profile
        </button>
        <button 
          onClick={() => onInvite(candidate)}
          className="flex-1 py-2.5 rounded-xl bg-gold text-white hover:bg-gold-soft transition-colors text-sm font-medium shadow-lg shadow-gold/20"
        >
          Invite
        </button>
      </div>
    </SpotlightCard>
  );
};

export default CandidateCard;
