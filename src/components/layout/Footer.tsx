import React from 'react';
import { Shield, Phone, Heart, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#050914] border-t border-slate-800/80 text-slate-300 pt-12 pb-16 md:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency Helpline Banner */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-[#111A33] via-[#0E162B] to-[#161224] border border-cyan-500/30 shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">National Child Helpline — Sauti 116</h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  Toll-Free in Uganda
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                24/7 confidential support for children facing cyberbullying, threats, blackmail, or abuse. Dial <strong className="text-amber-400">116</strong> from any telecom network in Uganda.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('/emergency-help')}
            className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-950/40 border border-red-500/40"
          >
            Emergency Guidance
          </button>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-amber-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0A1224] rounded-[6px] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                </div>
              </div>
              <span className="text-lg font-bold text-slate-100">SafeUganda</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uganda's child online-safety and cyberbullying prevention platform. Empowering children, families, and educators with privacy-first education and early intervention.
            </p>
            <div className="pt-1 text-[11px] font-mono text-cyan-400">
              Education • Prevention • Reporting • Protection
            </div>
          </div>

          {/* Col 2: Public Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3 font-mono">
              Public Portal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => navigateTo('/')} className="hover:text-cyan-400 transition-colors">Home Landing</button></li>
              <li><button onClick={() => navigateTo('/about')} className="hover:text-cyan-400 transition-colors">About the Initiative</button></li>
              <li><button onClick={() => navigateTo('/how-it-works')} className="hover:text-cyan-400 transition-colors">How It Works</button></li>
              <li><button onClick={() => navigateTo('/resources')} className="hover:text-cyan-400 transition-colors">Safety Guides &amp; Toolkits</button></li>
              <li><button onClick={() => navigateTo('/report')} className="hover:text-cyan-400 transition-colors">Confidential Reporting Wizard</button></li>
              <li><button onClick={() => navigateTo('/emergency-help')} className="hover:text-red-400 transition-colors">Emergency Assistance Hub</button></li>
            </ul>
          </div>

          {/* Col 3: Role Dashboards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3 font-mono">
              Stakeholder Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => navigateTo('/dashboard/child')} className="hover:text-cyan-400 transition-colors">👧 Child Dashboard (Alex)</button></li>
              <li><button onClick={() => navigateTo('/dashboard/parent')} className="hover:text-amber-400 transition-colors">👨‍👩‍👧 Parent &amp; Guardian Centre</button></li>
              <li><button onClick={() => navigateTo('/dashboard/school')} className="hover:text-emerald-400 transition-colors">🏫 School Safeguarding Desk</button></li>
              <li><button onClick={() => navigateTo('/dashboard/admin')} className="hover:text-rose-400 transition-colors">🛡️ National Safeguarding Ops</button></li>
              <li><button onClick={() => navigateTo('/dashboard/child/safety-check')} className="hover:text-cyan-400 transition-colors">Digital Safety Score (82%)</button></li>
              <li><button onClick={() => navigateTo('/dashboard/child/learn')} className="hover:text-cyan-400 transition-colors">Interactive Learning Centre</button></li>
            </ul>
          </div>

          {/* Col 4: Legal & Child Safeguarding Standards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3 font-mono">
              Governance &amp; Privacy
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
              <p>
                Aligned with Section 3 of Uganda's <strong className="text-slate-200">Data Protection and Privacy Act (2019)</strong> and the <strong className="text-slate-200">Children Act (Cap 59)</strong>.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                🔒 <strong>Zero Surveillance:</strong> SafeUganda never functions as secret spyware. We empower children and foster mutual trust with parents and educators.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} SafeUganda. Built for child online protection across Uganda.
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Kampala • Jinja • Mbarara • Gulu</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Child-Safe Verified
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
