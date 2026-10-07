import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, ShieldAlert, FileText, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo, lessons, incidents } = useApp();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const lessonMatches = lessons
      .filter(l => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.category.toLowerCase().includes(q))
      .map(l => ({
        type: 'Lesson',
        title: l.title,
        subtitle: `${l.category} • +${l.points} points`,
        icon: <BookOpen className="w-4 h-4 text-cyan-400" />,
        route: '/dashboard/child/learn'
      }));

    const incidentMatches = incidents
      .filter(i => i.id.toLowerCase().includes(q) || i.category.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
      .map(i => ({
        type: 'Incident Report',
        title: `${i.id}: ${i.category}`,
        subtitle: `Severity: ${i.severity} • Status: ${i.status}`,
        icon: <ShieldAlert className="w-4 h-4 text-amber-400" />,
        route: '/dashboard/admin'
      }));

    const guideMatches = [
      {
        type: 'Safety Guide',
        title: 'Check a Suspicious Message',
        subtitle: 'Analyze messages for cyberbullying, coercion, or grooming',
        icon: <FileText className="w-4 h-4 text-emerald-400" />,
        route: '/dashboard/child'
      },
      {
        type: 'Emergency Action',
        title: 'I Need Help Now (Sauti 116)',
        subtitle: 'Emergency assistance and verified contacts',
        icon: <ShieldAlert className="w-4 h-4 text-red-400" />,
        route: '/emergency-help'
      },
      {
        type: 'Reporting Guide',
        title: 'Report a Safety Concern Confidentially',
        subtitle: '5-step private reporting wizard',
        icon: <FileText className="w-4 h-4 text-cyan-400" />,
        route: '/report'
      }
    ].filter(g => g.title.toLowerCase().includes(q) || g.subtitle.toLowerCase().includes(q));

    return [...guideMatches, ...lessonMatches, ...incidentMatches];
  }, [query, lessons, incidents]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-[#0D152B] rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search input header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/60">
          <Search className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, safety topics, incidents, reporting guides..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-base font-medium"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-slate-400">
              <p className="text-sm">Try typing <span className="text-cyan-400 font-medium">"bullying"</span>, <span className="text-amber-400 font-medium">"passwords"</span>, <span className="text-emerald-400 font-medium">"grooming"</span>, or <span className="text-red-400 font-medium">"emergency"</span>.</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p className="text-sm font-medium">No results found for "{query}".</p>
              <p className="text-xs text-slate-500 mt-1">Try another keyword or visit the Learning Centre.</p>
            </div>
          ) : (
            searchResults.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setIsSearchOpen(false);
                  navigateTo(item.route);
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/70 border border-transparent hover:border-cyan-500/20 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-slate-800/80 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-slate-400 uppercase">[{item.type}]</span>
                      <h4 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-400 truncate transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 flex-shrink-0 ml-3 transition-colors" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
