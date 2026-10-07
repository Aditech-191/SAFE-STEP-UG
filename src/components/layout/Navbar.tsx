import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  AlertCircle, 
  Users, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { NotificationDropdown } from './NotificationDropdown';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    currentRoute, 
    navigateTo, 
    theme, 
    toggleTheme, 
    notifications,
    setIsSearchOpen 
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const publicNavLinks = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'How It Works', route: '/how-it-works' },
    { label: 'Resources', route: '/resources' },
    { label: 'Report Concern', route: '/report' },
  ];

  const roleLabels: Record<UserRole, { label: string; icon: string; bg: string }> = {
    child: { label: 'Child View', icon: '👧', bg: 'border-cyan-500/40 text-cyan-300' },
    parent: { label: 'Parent View', icon: '👨‍👩‍👧', bg: 'border-amber-500/40 text-amber-300' },
    school: { label: 'School View', icon: '🏫', bg: 'border-emerald-500/40 text-emerald-300' },
    admin: { label: 'Safeguarding Ops', icon: '🛡️', bg: 'border-rose-500/40 text-rose-300' },
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#060B18]/90 dark:bg-[#060B18]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => navigateTo('/')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-amber-500 p-0.5 shadow-md shadow-cyan-950/60 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0A1224] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                  <Shield className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                  {/* Subtle Uganda flag-colored dot indicator */}
                  <div className="absolute bottom-1 flex gap-0.5">
                    <span className="w-1.5 h-1 bg-slate-900 rounded-sm"></span>
                    <span className="w-1.5 h-1 bg-amber-400 rounded-sm"></span>
                    <span className="w-1.5 h-1 bg-red-500 rounded-sm"></span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-50 to-amber-400 bg-clip-text text-transparent">
                    SafeUganda
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    UG
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider hidden sm:block">
                  Child Online Safety &amp; Protection
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {publicNavLinks.map(link => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => navigateTo(link.route)}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                    isActive 
                      ? 'bg-slate-800 text-cyan-400 shadow-sm' 
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Role Switcher, Search, Notifications, Emergency */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors hidden sm:flex items-center gap-1.5 text-xs border border-transparent hover:border-slate-700"
              title="Search topics, lessons, reports (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-slate-400">Search</span>
              <kbd className="hidden xl:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">⌘K</kbd>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(prev => !prev)}
                className="relative p-2 rounded-xl text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>
              <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Persona / Role Quick Switcher Dropdown */}
            <div className="relative hidden md:block">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="text-xs bg-[#0F182F] text-slate-200 border border-cyan-500/30 rounded-xl px-2.5 py-1.5 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
                aria-label="Switch User Persona"
              >
                <option value="child">👧 Child (Alex)</option>
                <option value="parent">👨‍👩‍👧 Parent (Sarah)</option>
                <option value="school">🏫 School (David)</option>
                <option value="admin">🛡️ Admin (Joyce)</option>
              </select>
            </div>

            {/* Go to Dashboard Button */}
            <button
              onClick={() => navigateTo(`/dashboard/${role}`)}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/50 shadow-sm transition-all"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* High-Visibility Emergency Help Button */}
            <button
              onClick={() => navigateTo('/emergency-help')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-md shadow-red-950/40 hover:from-red-500 hover:to-amber-500 transition-all border border-red-400/30 active:scale-95"
            >
              <AlertCircle className="w-4 h-4 animate-pulse" />
              <span>Get Help</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-slate-100 hover:bg-slate-800/60"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1124] border-b border-slate-800 px-4 py-4 space-y-3 animate-in slide-in-from-top-5 duration-200">
          <div className="space-y-1">
            {publicNavLinks.map(link => (
              <button
                key={link.route}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateTo(link.route);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentRoute === link.route ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <label className="block text-xs font-semibold text-slate-400">Switch Persona Mode:</label>
            <div className="grid grid-cols-2 gap-2">
              {(['child', 'parent', 'school', 'admin'] as UserRole[]).map(r => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 text-xs rounded-lg font-medium border text-left flex items-center gap-1.5 ${
                    role === r ? 'bg-cyan-950/50 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <span>{roleLabels[r].icon}</span>
                  <span className="capitalize">{r}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo(`/dashboard/${role}`);
              }}
              className="w-full mt-2 py-2 text-center text-sm font-semibold rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white"
            >
              Enter {role.toUpperCase()} Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
