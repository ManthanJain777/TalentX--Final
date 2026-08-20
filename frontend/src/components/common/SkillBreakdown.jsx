import React from 'react';
import { ShieldCheck } from 'lucide-react';

const SkillBreakdown = ({
  skills = [
    { name: 'Java / Spring Boot', score: 95, verified: true, proofTag: 'GITHUB' },
    { name: 'Distributed Systems (Kafka)', score: 92, verified: true, proofTag: 'ASSESSMENT' },
    { name: 'PostgreSQL Optimization', score: 88, verified: true, proofTag: 'BENCHMARK' },
    { name: 'AWS Cloud Architecture', score: 85, verified: true, proofTag: 'CERTIFIED' },
  ],
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {skills.map((skill) => (
        <div key={skill.name} className="space-y-1">
          <div className="flex justify-between items-center text-xs font-sans">
            <div className="flex items-center gap-1.5 font-bold text-ink">
              {skill.verified && (
                <ShieldCheck className="w-3.5 h-3.5 text-verified shrink-0" />
              )}
              <span>{skill.name}</span>
              {skill.proofTag && (
                <span className="font-mono text-[9px] font-bold px-1.5 py-0.2 rounded bg-verified/15 text-verified border border-verified/30">
                  {skill.proofTag}
                </span>
              )}
            </div>
            <span className="font-mono font-bold text-ink-soft">
              {skill.score}%
            </span>
          </div>

          {/* Bar */}
          <div className="w-full h-2 bg-cover/8 rounded-full overflow-hidden p-0.5 border border-cover/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cover via-cover-light to-gold transition-all duration-700 ease-out"
              style={{ width: `${skill.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillBreakdown;
export { SkillBreakdown };
