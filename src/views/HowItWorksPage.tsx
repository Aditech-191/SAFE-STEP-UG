import React from 'react';
import { 
  Eye, 
  ShieldCheck, 
  HeartHandshake, 
  Lock, 
  HelpCircle, 
  ArrowRight,
  Smartphone,
  Cpu,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const HowItWorksPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="cyan" size="md">Architecture &amp; Ethics</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          How SafeUganda Protects Without Spying
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Our four-pillar approach combines local on-device risk evaluation, calm child-controlled de-escalation, and transparent trusted-adult reporting.
        </p>
      </div>

      {/* 4-Step Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <Card variant="default" className="p-6 space-y-3 relative">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-base">
            01
          </div>
          <h3 className="text-base font-bold text-slate-100">1. On-Device Scan</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Language inference happens inside the device memory sandbox. Raw chats never upload to cloud data centers.
          </p>
        </Card>

        <Card variant="default" className="p-6 space-y-3 relative">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-base">
            02
          </div>
          <h3 className="text-base font-bold text-slate-100">2. Calm Advisory</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Classifications are labeled as advisory signals with explicit uncertainty margins, preventing false blame over peer banter.
          </p>
        </Card>

        <Card variant="default" className="p-6 space-y-3 relative">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-base">
            03
          </div>
          <h3 className="text-base font-bold text-slate-100">3. Child Choices</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Child decides whether to pause &amp; breathe, mute the contact, save a local cryptographic proof file, or escalate.
          </p>
        </Card>

        <Card variant="default" className="p-6 space-y-3 relative">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-mono font-bold text-base">
            04
          </div>
          <h3 className="text-base font-bold text-slate-100">4. Transparent Help</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            If escalating, the child previews the exact single message snippet before confirming dispatch to their trusted adult.
          </p>
        </Card>

      </div>

      {/* Algorithmic Humility & False Alarms Note */}
      <Card variant="glass" className="p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-3 text-cyan-400">
          <Cpu className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-slate-100">
            Algorithmic Humility &amp; Banter Mitigation
          </h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          No NLP classification model is 100% accurate. Treating automated software classifications as absolute proof causes devastating false accusations against friendly football banter or playful classroom jokes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <h4 className="text-xs font-bold text-emerald-400">One-Tap Dismissal</h4>
            <p className="text-xs text-slate-400">
              Children can tap "Dismiss as Friendly Teasing" to quickly calibrate sensitivity thresholds.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <h4 className="text-xs font-bold text-cyan-400">Explicit Uncertainty Intervals</h4>
            <p className="text-xs text-slate-400">
              Telemetry displays confidence intervals (e.g., ±15.8% advisory) to remind users that software is not infallible.
            </p>
          </div>
        </div>
      </Card>

      {/* CTA Box */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-100">Ready to explore the prototype?</h3>
        <div className="flex justify-center gap-4">
          <Button variant="primary" onClick={() => navigateTo('/dashboard/child')}>
            Try Child Safety Hub
          </Button>
          <Button variant="outline" onClick={() => navigateTo('/report')}>
            Report Concern
          </Button>
        </div>
      </div>

    </div>
  );
};
