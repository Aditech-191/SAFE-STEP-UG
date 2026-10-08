import React from 'react';
import { Home, ShieldAlert, BookOpen, AlertCircle, HeartHandshake } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const { role, currentRoute, navigateTo } = useApp();

  const navItems = [
    { label: 'Home', route: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Dashboard', route: `/dashboard/${role}`, icon: <ShieldAlert className="w-5 h-5" /> },
    { label: 'Learn', route: '/dashboard/child/learn', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Report', route: '/report', icon: <HeartHandshake className="w-5 h-5" /> },
    { label: 'Get Help', route: '/emergency-help', icon: <AlertCircle className="w-5 h-5 text-red-400" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070D1D]/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 flex items-center justify-around">
      {navItems.map(item => {
        const isActive = currentRoute === item.route;
        return (
          <button
            key={item.route}
            onClick={() => navigateTo(item.route)}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold transition-all ${
              isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
