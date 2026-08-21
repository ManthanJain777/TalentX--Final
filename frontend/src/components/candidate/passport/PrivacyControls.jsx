import React from 'react';
import { Shield, Eye, Users, Lock } from 'lucide-react';

const PrivacyControls = ({ privacy = {}, setPrivacy }) => {
  const controls = [
    {
      key: 'public',
      label: 'Public Profile',
      description: 'Allow employers to see your profile',
      icon: <Eye className="w-4 h-4 text-gold" />,
    },
    {
      key: 'discoverable',
      label: 'Discoverable',
      description: 'Appear in employer search results',
      icon: <Users className="w-4 h-4 text-gold" />,
    },
    {
      key: 'showCompensation',
      label: 'Show Compensation',
      description: 'Display salary expectations',
      icon: <Shield className="w-4 h-4 text-gold" />,
    },
    {
      key: 'allowDirectInvites',
      label: 'Allow Direct Invites',
      description: 'Employers can invite you without prior contact',
      icon: <Lock className="w-4 h-4 text-gold" />,
    },
  ];

  const toggle = (key) => {
    setPrivacy({ ...privacy, [key]: !privacy[key] });
  };

  const activeCount = Object.values(privacy || {}).filter(Boolean).length;
  const totalCount = Object.values(privacy || {}).length || 4; // default to 4 options

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-display font-semibold text-ink">Privacy & Visibility</h3>
        <span className="text-[10px] font-mono text-ink-faint ml-auto">
          {activeCount}/{totalCount} active
        </span>
      </div>

      <div className="space-y-3">
        {controls.map((control) => (
          <div
            key={control.key}
            className="flex items-center justify-between p-3 rounded-xl bg-ink/5 border border-ink/5 hover:border-gold-soft/20 transition-all cursor-pointer"
            onClick={() => toggle(control.key)}
          >
            <div className="flex items-center gap-3">
              {control.icon}
              <div>
                <p className="text-sm font-medium text-ink">{control.label}</p>
                <p className="text-xs text-ink-faint">{control.description}</p>
              </div>
            </div>
            <ToggleSwitch
              value={privacy[control.key]}
              onChange={() => toggle(control.key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ToggleSwitch = ({ value, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`w-12 h-6 shrink-0 rounded-full transition-all duration-300 ${
        value ? 'bg-gold' : 'bg-ink/20'
      } relative`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
          value ? 'left-7' : 'left-1'
        } shadow-md`}
      />
    </button>
  );
};

export default PrivacyControls;
