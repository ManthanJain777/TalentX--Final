import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';

const PassportPreview = ({ data }) => {
  return (
    <div className="glass-2 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-semibold text-ink">Live Preview</h3>
        <span className="text-[10px] font-mono text-gold">What employers see</span>
      </div>

      <div className="bg-cover/5 rounded-xl p-4 border border-cover/10">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-cover to-cover-deep flex items-center justify-center text-white text-xl font-display">
            {data.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-display font-semibold text-ink text-lg truncate">{data.name}</p>
            <p className="text-sm text-ink-soft truncate">{data.headline}</p>
            <p className="text-xs text-ink-faint truncate">{data.location}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {data.skills.slice(0, 6).map((skill) => (
            <span
              key={skill.name}
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                skill.verified
                  ? 'bg-verified/10 text-verified border border-verified/20'
                  : 'bg-ink/5 text-ink-faint border border-ink/10'
              }`}
            >
              {skill.name}
            </span>
          ))}
          {data.skills.length > 6 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-ink/5 text-ink-faint font-mono">
              +{data.skills.length - 6} more
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2 text-xs text-ink-faint">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-verified" />
            <span className="font-mono">
              {data.github.repos.length + data.certifications.filter(c => c.verified).length} verified sources
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-gold" />
            <span className="font-mono">{data.projects.length} projects</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-ink/5 flex items-center justify-between">
          <span className="text-[10px] font-mono text-ink-faint">
            {data.privacy.discoverable ? '🔍 Discoverable' : '🔒 Private'}
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
