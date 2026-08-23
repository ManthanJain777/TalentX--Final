import React, { useState, useRef, useEffect } from 'react';
import { Bell, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [notifications, setNotifications] = useState([]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Bell Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-ink-soft hover:text-cover hover:bg-cover/5 transition-colors focus-visible:outline-gold"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold border border-white animate-pulse" />
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-cover/15 shadow-[0_16px_40px_rgba(20,37,68,0.15)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          
          <div className="flex items-center justify-between p-4 border-b border-cover/10 bg-page/40">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-cover font-sans">Notifications</span>
              {unreadCount > 0 && (
                <span className="font-mono text-[10px] bg-gold/15 text-gold-dark font-bold px-1.5 py-0.5 rounded">
                  {unreadCount} NEW
                </span>
              )}
            </div>
            <span className="text-[11px] text-ink-soft font-mono">Live Activity</span>
          </div>

          {/* List */}
          <div className="divide-y divide-cover/5 max-h-80 overflow-y-auto">
            {notifications.map((n) => (
              <Link
                key={n.id}
                to={n.link}
                onClick={() => setIsOpen(false)}
                className={`p-3.5 block transition-colors ${
                  n.unread ? 'bg-cover/[0.02] hover:bg-cover/[0.05]' : 'hover:bg-cover/[0.02]'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-xs text-cover leading-tight font-sans">
                    {n.title}
                  </span>
                  <span className="font-mono text-[10px] text-ink-soft shrink-0 ml-2">
                    {n.time}
                  </span>
                </div>
                <p className="text-xs text-ink-soft leading-snug line-clamp-2">
                  {n.desc}
                </p>
              </Link>
            ))}
          </div>

          <div className="p-2.5 border-t border-cover/10 bg-page/30 text-center">
            <Link
              to="/candidate/messages"
              onClick={() => setIsOpen(false)}
              className="text-xs text-gold-dark hover:text-cover font-bold font-sans inline-flex items-center gap-1"
            >
              <span>View all activity</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

        </div>
      )}

    </div>
  );
};

export default NotificationBell;
export { NotificationBell };
