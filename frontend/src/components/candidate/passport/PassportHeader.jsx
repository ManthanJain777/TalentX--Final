import React, { useState } from 'react';
import { User, MapPin, Briefcase, Edit2, Check } from 'lucide-react';

const PassportHeader = ({
  name,
  headline,
  location,
  setName,
  setHeadline,
  setLocation,
}) => {
  return (
    <div className="glass-panel p-6 space-y-4 relative group">
      <div className="shimmer-track" />
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cover to-cover-deep flex items-center justify-center text-white text-2xl font-display border-2 border-gold-soft/30">
            {name?.charAt(0) || '?'}
          </div>
          <button className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-gold text-white hover:bg-gold-soft transition-colors shadow-lg">
            <Edit2 className="w-3 h-3" />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-1 min-w-0">
          <EditableField
            value={name}
            placeholder="Full Name"
            icon={<User className="w-4 h-4 text-gold shrink-0" />}
            onSave={(val) => setName(val)}
            className="text-xl font-display font-semibold text-ink truncate"
          />

          <EditableField
            value={headline}
            placeholder="Professional Headline"
            icon={<Briefcase className="w-4 h-4 text-gold shrink-0" />}
            onSave={(val) => setHeadline(val)}
            className="text-sm text-ink-soft truncate"
          />

          <EditableField
            value={location}
            placeholder="Location"
            icon={<MapPin className="w-4 h-4 text-gold shrink-0" />}
            onSave={(val) => setLocation(val)}
            className="text-sm text-ink-faint truncate"
          />
        </div>
      </div>

      {/* Profile Completion */}
      <div className="pt-4 border-t border-ink/5">
        <div className="flex items-center justify-between text-xs text-ink-faint">
          <span className="font-mono">Profile Completion</span>
          <span className="font-mono text-gold">72%</span>
        </div>
        <div className="mt-1.5 w-full h-1.5 rounded-full bg-ink/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold"
            style={{ width: '72%' }}
          />
        </div>
      </div>
    </div>
  );
};

const EditableField = ({ value, placeholder, icon, onSave, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <div className="group/item flex items-center gap-2">
      {icon}
      {isEditing ? (
        <div className="flex items-center gap-2 flex-1">
          <input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className={`flex-1 bg-white/50 border border-gold-soft/30 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gold-soft/30 ${className}`}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
          />
          <button
            onClick={handleSave}
            className="p-1 rounded-lg bg-verified/10 text-verified hover:bg-verified/20 transition-colors"
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className={`${className} flex-1 truncate`}>{value || placeholder}</span>
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover/item:opacity-100 transition-opacity p-1 rounded-lg hover:bg-ink/5"
          >
            <Edit2 className="w-3 h-3 text-ink-faint" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PassportHeader;
