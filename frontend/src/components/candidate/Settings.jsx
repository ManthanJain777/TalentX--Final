import React, { useState } from 'react';
import { Lock, Bell, Save } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const CandidateSettings = () => {
  const [incognito, setIncognito] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [directOffersOnly, setDirectOffersOnly] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Privacy and security settings updated');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-cover tracking-tight">
          Privacy &amp; Account Settings
        </h2>
        <p className="text-xs text-ink-soft">
          Control your visibility, notification preferences, and cryptographic authentication keys
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Privacy Controls */}
        <GlassCard className="p-6 bg-white/90 border-cover/15 space-y-4">
          <div className="flex items-center gap-2 border-b border-cover/10 pb-2">
            <Lock className="w-4 h-4 text-gold-dark" />
            <h3 className="font-bold text-sm text-cover font-sans">
              1. Talent Passport Visibility &amp; Incognito Controls
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-cover/[0.02] border border-cover/10 cursor-pointer hover:bg-cover/[0.04]">
              <div>
                <div className="font-bold text-xs text-cover font-sans">Incognito Mode (Blind Discovery)</div>
                <div className="text-xs text-ink-soft">Mask your name and employer history until you explicitly accept an invitation.</div>
              </div>
              <input
                type="checkbox"
                checked={incognito}
                onChange={(e) => setIncognito(e.target.checked)}
                className="w-4 h-4 rounded text-cover focus:ring-gold"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-cover/[0.02] border border-cover/10 cursor-pointer hover:bg-cover/[0.04]">
              <div>
                <div className="font-bold text-xs text-cover font-sans">Filter by Minimum Rate (₹10K/hr floor)</div>
                <div className="text-xs text-ink-soft">Block inbound requests that do not meet your specified compensation floor.</div>
              </div>
              <input
                type="checkbox"
                checked={directOffersOnly}
                onChange={(e) => setDirectOffersOnly(e.target.checked)}
                className="w-4 h-4 rounded text-cover focus:ring-gold"
              />
            </label>
          </div>
        </GlassCard>

        {/* Notifications */}
        <GlassCard className="p-6 bg-white/90 border-cover/15 space-y-4">
          <div className="flex items-center gap-2 border-b border-cover/10 pb-2">
            <Bell className="w-4 h-4 text-gold-dark" />
            <h3 className="font-bold text-sm text-cover font-sans">
              2. Real-Time Alert Channels
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-cover/[0.02] border border-cover/10 cursor-pointer hover:bg-cover/[0.04]">
              <div>
                <div className="font-bold text-xs text-cover font-sans">Instant Match &amp; Invitation Notifications</div>
                <div className="text-xs text-ink-soft">Receive real-time alerts when high-score matches (90%+) land in your portal.</div>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-4 h-4 rounded text-cover focus:ring-gold"
              />
            </label>
          </div>
        </GlassCard>

        <div className="flex justify-end gap-3">
          <Button type="submit" variant="primary" size="md" icon={Save}>
            Save Preferences
          </Button>
        </div>

      </form>

    </div>
  );
};

export default CandidateSettings;
export { CandidateSettings };
