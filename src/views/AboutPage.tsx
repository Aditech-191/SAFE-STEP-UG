import React from 'react';
import { Shield, Users, Heart, Award, CheckCircle2, Lock, Scale } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="cyan" size="md">About SafeUganda</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          Protecting Children's Digital Dignity in Uganda
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          SafeUganda was founded to bridge the critical gap between passive inaction and invasive spyware, offering children a safe, empathetic companion in online spaces.
        </p>
      </div>

      {/* The Problem & The Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card variant="warning" className="p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-400">The Problem We Are Solving</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            As mobile devices and school WhatsApp study groups proliferate across Kampala, Mbarara, Gulu, and Jinja, children increasingly face cyberbullying, financial extortion, and unwanted sexual requests.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Commercial parental surveillance software silently logs every chat, photo, and keystroke. This destroys trust between children and parents, causes children to hide secondary devices, and creates severe cloud data leak risks.
          </p>
        </Card>

        <Card variant="shield" className="p-8 space-y-4">
          <h2 className="text-xl font-bold text-cyan-400">Our Privacy-First Solution</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            SafeUganda evaluates text on-device. When danger is detected, it does not sound sirens or shame the child. It offers calm guidance, breathing de-escalation, and clear choices: mute the sender, save tamper-evident local evidence, or reach a verified trusted adult.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            The child explicitly previews and approves any message snippet shared with an adult. Trust and agency remain at the center.
          </p>
        </Card>
      </div>

      {/* Ugandan Legal & Regulatory Alignment */}
      <Card variant="glass" className="p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <Scale className="w-6 h-6 text-amber-400" />
          <h2 className="text-2xl font-bold text-slate-100">
            Ugandan Legal &amp; Safeguarding Alignment
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-200 text-sm">Data Protection Act, 2019</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Section 3 mandates data minimisation and lawful processing. SafeUganda transmits zero raw chat data to cloud servers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-200 text-sm">Computer Misuse Act, 2022</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides legal recourse against cyber harassment, digital blackmail, and unauthorized sharing of indecent materials.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="font-bold text-slate-200 text-sm">Children Act (Cap 59)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mandates priority protection of children against all forms of psychological abuse, sexual exploitation, and neglect.
            </p>
          </div>
        </div>
      </Card>

      {/* Stakeholder Partners */}
      <div className="text-center space-y-6 pt-6">
        <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400">
          Collaborative Ecosystem &amp; Safeguarding Channels
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300 font-medium">
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">Uganda Communications Commission (UCC)</span>
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">Sauti 116 National Child Helpline</span>
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">Uganda Police CFPU</span>
          <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">Ministry of Gender, Labour &amp; Social Development</span>
        </div>
      </div>

    </div>
  );
};
