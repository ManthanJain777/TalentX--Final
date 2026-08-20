import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  className = '',
  layoutId = 'activeTabPill',
}) => {
  return (
    <div
      className={`flex items-center gap-1.5 p-1.5 rounded-2xl bg-cover/5 border border-cover/10 overflow-x-auto relative ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const count = tab.count !== undefined ? tab.count : null;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-colors duration-200 focus-visible:outline-gold cursor-pointer z-10 ${
              isActive
                ? 'text-white'
                : 'text-ink-soft hover:text-ink hover:bg-white/40'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                className="absolute inset-0 bg-cover rounded-xl shadow-[0_3px_12px_rgba(20,37,68,0.25)] z-[-1]"
              />
            )}
            {tab.icon && <tab.icon className="w-3.5 h-3.5 shrink-0" />}
            <span>{tab.label}</span>
            {count !== null && (
              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded-full transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-cover/10 text-ink-soft'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
export { Tabs };
