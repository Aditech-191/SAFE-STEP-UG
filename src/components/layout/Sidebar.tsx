import React from 'react';
import { 
  Shield, 
  ShieldCheck, 
  AlertTriangle, 
  BookOpen, 
  Settings, 
  Users, 
  BarChart3, 
  FileText, 
  Lock, 
  HelpCircle,
  Home,
  MessageSquareWarning,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Sidebar: React.FC = () => {
  const { role, setRole, currentRoute, navigateTo, childProfile, incidents } = useApp();

  const childNav = [
    { label: 'My Safety Hub', route: '/dashboard/child', icon: <Home className="w-4 h-4" /> },
    { label: 'Check a Message', route: '/dashboard/child/safety-check', icon: <MessageSquareWarning className="w-4 h-4" /> },
    { label: 'I Need Help / Report', route: '/dashboard/child/report', icon: <AlertTriangle className="w-4 h-4 text-amber-400" /> },
    { label: 'Safety Lessons', route: '/dashboard/child/learn', icon: <BookOpen className="w-4 h-4 text-cyan-400" /> },
    { label: 'Trusted Adults', route: '/dashboard/child/settings', icon: <HeartHandshake className="w-4 h-4 text-emerald-400" /> },
  ];

  const parentNav = [
    { label: 'Family Safety Centre', route: '/dashboard/parent', icon: <Home className="w-4 h-4" /> },
    { label: 'Protected Children', route: '/dashboard/parent/children', icon: <Users className="w-4 h-4" /> },
    { label: 'Safety Alerts', route: '/dashboard/parent/alerts', icon: <AlertTriangle className="w-4 h-4 text-amber-400" /> },
    { label: 'Incident Reports', route: '/dashboard/parent/reports', icon: <FileText className="w-4 h-4" /> },
    { label: 'Parent Guidance', route: '/dashboard/parent/resources', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Family Settings', route: '/dashboard/parent/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const schoolNav = [
    { label: 'School Safeguarding', route: '/dashboard/school', icon: <Home className="w-4 h-4" /> },
    { label: 'Student Safety', route: '/dashboard/school/students', icon: <Users className="w-4 h-4" /> },
    { label: 'School Alerts', route: '/dashboard/school/alerts', icon: <AlertTriangle className="w-4 h-4 text-amber-400" /> },
    { label: 'Safeguarding Reports', route: '/dashboard/school/reports', icon: <FileText className="w-4 h-4" /> },
    { label: 'Safety Training', route: '/dashboard/school/resources', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Safety Analytics', route: '/dashboard/school/analytics', icon: <BarChart3 className="w-4 h-4 text-cyan-400" /> },
  ];

  const adminNav = [
    { label: 'Operations Centre', route: '/dashboard/admin', icon: <ShieldCheck className="w-4 h-4 text-rose-400" /> },
    { label: 'Incident Desk', route: '/dashboard/admin/incidents', icon: <AlertTriangle className="w-4 h-4 text-amber-400" /> },
    { label: 'Reports & Audits', route: '/dashboard/admin/reports', icon: <FileText className="w-4 h-4" /> },
    { label: 'National Analytics', route: '/dashboard/admin/analytics', icon: <BarChart3 className="w-4 h-4 text-cyan-400" /> },
    { label: 'Safeguarding Standards', route: '/dashboard/admin/resources', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Authorized Officers', route: '/dashboard/admin/users', icon: <Users className="w-4 h-4" /> },
  ];

  const navMap: Record<UserRole, typeof childNav> = {
    child: childNav,
    parent: parentNav,
    school: schoolNav,
    admin: adminNav,
  };

  const navItems = navMap[role];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#090F20] border-r border-slate-800/80 min-h-[calc(100vh-5rem)] flex flex-col justify-between p-4 hidden md:flex">
      <div className="space-y-6">
        {/* Active Persona Profile Card */}
        <div className="p-3.5 rounded-2xl bg-[#121B33] border border-cyan-500/20 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-amber-500 flex items-center justify-center text-lg font-bold text-slate-950 shadow-inner">
              {role === 'child' ? 'AM' : (role === 'parent' ? 'SM' : (role === 'school' ? 'KP' : 'JN'))}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-slate-100 truncate">
                {role === 'child' ? childProfile.name : (role === 'parent' ? 'Sarah Mukasa' : (role === 'school' ? 'Kampala Primary' : 'Joyce Nabakooza'))}
              </h4>
              <span className="text-[11px] font-mono text-cyan-400 capitalize flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {role} account
              </span>
            </div>
          </div>

          {/* Quick Persona Switcher in Sidebar */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <span>Switch Role:</span>
            <div className="flex gap-1">
              {(['child', 'parent', 'school', 'admin'] as UserRole[]).map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`w-6 h-6 rounded text-[11px] flex items-center justify-center font-bold ${role === r ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                  title={`Switch to ${r}`}
                >
                  {r[0].toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Dashboard Navigation
          </div>
          {navItems.map(item => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => navigateTo(item.route)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Emergency Card */}
      <div className="pt-4 border-t border-slate-800/80 space-y-2">
        <div className="p-3 rounded-xl bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-500/30">
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>National Sauti 116</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Free 24/7 child helpline across Uganda on any mobile network.
          </p>
          <button
            onClick={() => navigateTo('/emergency-help')}
            className="w-full mt-2.5 py-1.5 px-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold text-center transition-colors shadow-sm"
          >
            I Need Help Now
          </button>
        </div>
      </div>
    </aside>
  );
};
