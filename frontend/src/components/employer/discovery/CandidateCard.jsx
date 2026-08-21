import React, { useRef, useState } from 'react';
import { CheckCircle, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MatchScoreDisplay from './MatchScoreDisplay';
import SkillBreakdown from './SkillBreakdown';
import MatchExplanation from './MatchExplanation';
import { SpotlightCard } from '../../react-bits/SpotlightCard';

const CandidateCard = ({ candidate, onInvite }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const tiltX = (y / rect.height - 0.5) * -6;
    const tiltY = (x / rect.width - 0.5) * 6;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const initials = (candidate.name || 'Candidate')
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

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
      className="p-6 sm:p-7 flex flex-col h-full relative group rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_12px_36px_rgba(20,37,68,0.06)] hover:shadow-[0_20px_50px_rgba(199,168,104,0.18)] hover:border-[#C7A868]/40 transition-all duration-400"
      spotlightColor="rgba(199, 168, 104, 0.15)"
    >
      {/* Top Header */}
      <div className="flex items-start justify-between mb-5 gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-13 h-13 shrink-0 rounded-2xl bg-gradient-to-br from-[#142544] to-[#0D1424] flex items-center justify-center text-[#C7A868] font-bold font-mono text-lg border border-[#C7A868]/40 shadow-md">
            {initials}
          </div>
          <div className="min-w-0">
            <h4 className="font-sans font-bold text-lg text-[#142544] truncate group-hover:text-[#8B6B23] transition-colors">
              {candidate.name}
            </h4>
            <p className="text-xs font-semibold text-[#585D68] truncate mt-0.5">
              {candidate.headline || 'Verified Engineer'}
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#93979F] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#C7A868]" />
              <span className="truncate">{candidate.location || 'Remote'}</span>
            </div>
          </div>
        </div>
        
        <div className="shrink-0 flex flex-col items-center">
          <MatchScoreDisplay score={candidate.matchScore} size={60} />
        </div>
      </div>

      {/* Skills Badges */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          {candidate.skills.slice(0, 4).map(skill => (
            <span key={skill} className="px-2.5 py-1 rounded-lg bg-[#FAF7F0] border border-[#C7A868]/20 text-[11px] font-mono font-semibold text-[#142544]">
              {skill}
            </span>
          ))}
          {candidate.skills.length > 4 && (
            <span className="px-2 py-1 rounded-lg bg-cover/5 border border-cover/10 text-[11px] font-mono font-medium text-[#585D68]">
              +{candidate.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Verified Sources Pill */}
      <div className="flex items-center gap-2 mb-5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 font-semibold w-fit">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{candidate.verifiedSources || 3} cryptographic proof sources</span>
      </div>

      {/* Breakdown & Explanation */}
      <div className="flex-1 space-y-4 mb-6">
        <SkillBreakdown breakdown={candidate.breakdown} />
        <MatchExplanation explanation={candidate.explanation} />
      </div>

      {/* Actions */}
      <div className="mt-auto pt-4 border-t border-cover/10 flex gap-3">
        <button 
          onClick={() => navigate(`/employer/passports/${candidate.id || 'me'}`)}
          className="flex-1 py-2.5 px-3 rounded-xl border border-cover/15 bg-white/70 hover:bg-white text-[#142544] font-bold text-xs sm:text-sm transition-all hover:border-cover/30 shadow-xs cursor-pointer"
        >
          View Profile
        </button>
        <button 
          onClick={() => onInvite(candidate)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#C7A868] to-[#B89650] hover:from-[#D8B979] hover:to-[#C7A868] text-[#142544] font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-[#C7A868]/25 hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Invite</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </SpotlightCard>
  );
};

export default CandidateCard;
export { CandidateCard };
