import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  BookOpen, 
  MessageSquareWarning, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight, 
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Lock,
  Phone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SafetyScoreRing } from '../../components/common/SafetyScoreRing';

export const ChildDashboard: React.FC = () => {
  const { childProfile, safetyScore, navigateTo } = useApp();

  const dailyTips = [
    "Tip of the Day: If someone online asks you to keep secrets from your parents, that is a red flag. Talk to a trusted adult right away.",
    "Tip of the Day: Never share your passwords or device passcodes with anyone, even your best friend.",
    "Tip of the Day: You are in control of your digital space. Muting or blocking a mean user is a superpower."
  ];

  const [tipIndex, setTipIndex] = useState(0);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Greeting Banner (Section 6 Prompt Requirement) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Hi Alex 👋
            </h1>
            <Badge variant="green" size="sm">Shield Active</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Let's keep your digital world safe and friendly.
          </p>
        </div>

        {/* Large Accessible Emergency Button: "I Need Help" */}
        <Button
          variant="danger"
          size="lg"
          icon={<AlertTriangle className="w-5 h-5 animate-pulse" />}
          onClick={() => navigateTo('/emergency-help')}
          className="shadow-xl"
        >
          I Need Help
        </Button>
      </div>

      {/* Safety Score Section */}
      <SafetyScoreRing 
        score={safetyScore} 
        onExploreMore={() => navigateTo('/dashboard/child/safety-check')} 
      />

      {/* Quick Action Cards Grid (Section 6 Requirements) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Check a Message */}
        <Card 
          variant="interactive"
          onClick={() => navigateTo('/dashboard/child/safety-check')}
          className="p-6 space-y-4 border-cyan-500/30 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
            <MessageSquareWarning className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
              Check a Message
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Unsure if a chat is mean, threatening, or suspicious? Paste it to receive safe, private advice.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold pt-1">
            <span>Analyze a message</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Card>

        {/* Card 2: Interactive Safety Lessons */}
        <Card 
          variant="interactive"
          onClick={() => navigateTo('/dashboard/child/learn')}
          className="p-6 space-y-4 border-amber-500/30 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                Safety Quizzes &amp; Lessons
              </h3>
              <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                {childProfile.safetyPoints} pts
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Play real-life scenario questions, earn badges, and build digital superpowers.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold pt-1">
            <span>Play interactive lessons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Card>

        {/* Card 3: Report a Concern */}
        <Card 
          variant="interactive"
          onClick={() => navigateTo('/dashboard/child/report')}
          className="p-6 space-y-4 border-emerald-500/30 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
              Tell Someone I Trust
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Confidentially ask for adult assistance or reach Sauti 116 with zero shame or fear.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold pt-1">
            <span>Start confidential report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Card>

      </div>

      {/* Two Column Section: My Trusted Adults & Daily Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: My Trusted Adults List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-slate-100">My Trusted People</h3>
            </div>
            <button
              onClick={() => navigateTo('/dashboard/child/settings')}
              className="text-xs text-cyan-400 hover:underline"
            >
              Manage contacts
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {childProfile.trustedAdults.map(adult => (
              <div
                key={adult.id}
                className="p-4 rounded-2xl bg-[#0F172E] border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{adult.name}</h4>
                  <span className="text-xs text-cyan-400 block mt-0.5">{adult.relationship}</span>
                  <span className="text-[11px] font-mono text-slate-400 mt-1 block">{adult.phone}</span>
                </div>
                <button
                  onClick={() => navigateTo('/emergency-help')}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-300 transition-colors"
                  title={`Call ${adult.name}`}
                >
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Daily Rotating Safety Tip & Badges */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/20 via-[#101B33] to-slate-900 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400">
              <span className="flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Daily Safe Tip</span>
              </span>
              <button
                onClick={() => setTipIndex((tipIndex + 1) % dailyTips.length)}
                className="text-[10px] text-slate-400 hover:text-white underline"
              >
                Next Tip ➔
              </button>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              "{dailyTips[tipIndex]}"
            </p>
          </div>

          {/* Child's Earned Safety Badges */}
          <div className="p-5 rounded-2xl bg-[#0F172E] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                My Safety Badges
              </h4>
              <span className="text-xs text-cyan-400 font-bold">{childProfile.badges.length} Unlocked</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {childProfile.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-xl bg-slate-800 text-slate-200 border border-cyan-500/20 flex items-center gap-1.5"
                >
                  <span>🏆</span>
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
