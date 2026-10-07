import React from 'react';
import { Bell, CheckCheck, BookOpen, AlertTriangle, ShieldCheck, ExternalLink, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, navigateTo } = useApp();

  if (!isOpen) return null;

  const iconMap = {
    reminder: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    lesson: <BookOpen className="w-4 h-4 text-cyan-400" />,
    report: <AlertTriangle className="w-4 h-4 text-amber-400" />,
    alert: <AlertTriangle className="w-4 h-4 text-red-400" />,
    announcement: <Bell className="w-4 h-4 text-purple-400" />,
  };

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-[#0E172E] border border-cyan-500/20 rounded-2xl shadow-2xl z-50 overflow-hidden text-slate-100 animate-in fade-in duration-150">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-100">Notifications</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono">
            {notifications.filter(n => n.unread).length} new
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllNotificationsRead}
            className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
            title="Mark all as read"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mark read</span>
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs">
            No notifications right now.
          </div>
        ) : (
          notifications.map(item => (
            <div
              key={item.id}
              onClick={() => {
                markNotificationRead(item.id);
                if (item.link) {
                  onClose();
                  navigateTo(item.link);
                }
              }}
              className={`p-3.5 hover:bg-slate-800/50 transition-colors cursor-pointer flex items-start gap-3 ${item.unread ? 'bg-cyan-950/20' : ''}`}
            >
              <div className="p-2 rounded-lg bg-slate-800/90 flex-shrink-0 mt-0.5">
                {iconMap[item.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-slate-200 truncate">{item.title}</h4>
                  <span className="text-[10px] text-slate-400 font-mono flex-shrink-0 ml-2">{item.time}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{item.message}</p>
                {item.link && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline mt-1 font-medium">
                    View details <ExternalLink className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
