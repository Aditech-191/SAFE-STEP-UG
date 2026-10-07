import React from 'react';
import { ShieldCheck, Info, Sparkles, Check, AlertTriangle } from 'lucide-react';
import { SafetyScore } from '../../types';

interface SafetyScoreRingProps {
  score: SafetyScore;
  onExploreMore?: () => void;
}

export const SafetyScoreRing: React.FC<SafetyScoreRingProps> = ({ score, onExploreMore }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score.overall / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#121B33] via-[#0E172C] to-[#0A1020] border border-cyan-500/30 p-6 shadow-glow-cyan">
      {/* Background glow decoration */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-wider uppercase text-cyan-400/90 font-mono">
              Your Digital Safety Score
            </h2>
            <div className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>{score.label}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                Active Protection
              </span>
            </div>
          </div>
        </div>

        {onExploreMore && (
          <button
            onClick={onExploreMore}
            className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>How it works</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Radial Circular Progress Meter */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-2">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
              {/* Background circle track */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="text-slate-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Animated Progress gradient circle */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="url(#safetyScoreGradient)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="safetyScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="60%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-slate-50 tracking-tight font-mono">
                {score.overall}%
              </span>
              <span className="text-[11px] font-medium text-emerald-400 uppercase tracking-wider">
                Protected
              </span>
            </div>
          </div>

          <p className="mt-2 text-xs text-slate-300 text-center font-medium max-w-[220px]">
            {score.feedback}
          </p>
        </div>

        {/* Breakdown bars */}
        <div className="md:col-span-7 space-y-2.5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Safety Pillars</span>
            <span className="text-emerald-400 text-[11px] font-mono">Never shaming, always guiding</span>
          </div>

          {/* Privacy */}
          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
              </span>
              <span className="text-sm font-medium text-slate-200">Privacy & Personal Info</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${score.categories.privacy}%` }} />
              </div>
              <span className="text-xs font-mono font-bold text-slate-300">{score.categories.privacy}%</span>
            </div>
          </div>

          {/* Cyberbullying */}
          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
              </span>
              <span className="text-sm font-medium text-slate-200">Cyberbullying Resilience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${score.categories.cyberbullying}%` }} />
              </div>
              <span className="text-xs font-mono font-bold text-slate-300">{score.categories.cyberbullying}%</span>
            </div>
          </div>

          {/* Content Safety */}
          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
              </span>
              <div>
                <span className="text-sm font-medium text-slate-200">Harmful Content Shield</span>
                <span className="block text-[10px] text-amber-400/90 font-medium">1 educational lesson recommended</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${score.categories.contentSafety}%` }} />
              </div>
              <span className="text-xs font-mono font-bold text-slate-300">{score.categories.contentSafety}%</span>
            </div>
          </div>

          {/* Account Security / Passwords */}
          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
              </span>
              <span className="text-sm font-medium text-slate-200">Passcodes & Devices</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${score.categories.accountSecurity}%` }} />
              </div>
              <span className="text-xs font-mono font-bold text-slate-300">{score.categories.accountSecurity}%</span>
            </div>
          </div>

          {/* Reporting Readiness */}
          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
              </span>
              <span className="text-sm font-medium text-slate-200">Confident Reporting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-400 h-full rounded-full" style={{ width: `${score.categories.reporting}%` }} />
              </div>
              <span className="text-xs font-mono font-bold text-slate-300">{score.categories.reporting}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
