import React from 'react';
import { CheckCircle, Shield, Briefcase, GraduationCap, CheckCircle2, ShieldCheck, Circle } from 'lucide-react';

const PassportPreview = ({ data }) => {
  const getSkillBadge = (level) => {
    switch (level) {
      case 'PROVEN_IN_WORK':
        return 'bg-gold/10 text-gold border-gold/20';
      case 'ASSESSED':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'PEER_REVIEWED':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default:
        return 'bg-ink/5 text-ink-faint border-ink/10';
    }
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-semibold text-ink">Live Preview</h3>
        <span className="text-[10px] font-mono text-gold">What employers see</span>
      </div>

      <div className="bg-cover/5 rounded-xl p-4 border border-cover/10">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-cover to-cover-deep flex items-center justify-center text-white text-xl font-display overflow-hidden">
            {data?.avatarUrl ? (
              <img src={data.avatarUrl} alt={data.name} className="w-full h-full object-cover" />
            ) : (
              data?.name?.charAt(0) || '?'
            )}
          </div>
          <div className="min-w-0">
            <p className="font-display font-semibold text-ink text-lg truncate">{data.name}</p>
            <p className="text-sm text-ink-soft truncate">{data.headline}</p>
            <p className="text-xs text-ink-faint truncate">{data.location}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {(data.skills || []).slice(0, 6).map((skill) => (
            <span
              key={skill.name}
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${getSkillBadge(skill.verificationLevel)}`}
            >
              {skill.name}
            </span>
          ))}
          {(data.skills || []).length > 6 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-ink/5 text-ink-faint font-mono">
              +{(data.skills || []).length - 6} more
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2 text-xs text-ink-faint">
          <div className="flex items-center gap-2">
            <Briefcase className="w-3 h-3 text-gold" />
            <span className="font-mono">{(data.experience || []).length} past roles</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-verified" />
            <span className="font-mono">
              {(data.socialLinks?.github ? 1 : 0) + (data.socialLinks?.linkedin ? 1 : 0)} verified socials
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-gold" />
            <span className="font-mono">{(data.projects || []).length} projects</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-ink/5 flex items-center justify-between">
          <span className="text-[10px] font-mono text-ink-faint">
            {data?.privacy?.discoverable ? '🔍 Discoverable' : '🔒 Private'}
          </span>
          <span className="text-[10px] font-mono text-gold flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Verified
          </span>
        </div>
      </div>

      <p className="text-[10px] text-ink-faint text-center mt-3 font-mono">
        Changes update in real-time
      </p>
    </div>
  );
};

export default PassportPreview;
