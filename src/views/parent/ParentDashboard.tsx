import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  MessageSquare, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Lightbulb,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const ParentDashboard: React.FC = () => {
  const { parentProfile, parentAlerts, markAlertRead, navigateTo, incidents } = useApp();

  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const discussionPrompts = [
    {
      topic: "Class Study Groups",
      prompt: "Hey Alex, school group chats can get noisy or stressful. Have any messages made you or your friends feel uncomfortable lately?",
      why: "Opens non-judgmental space for the child to share peer dynamics without fear of losing their phone."
    },
    {
      topic: "Online Secrets & Strangers",
      prompt: "Alex, remember how we talked about safe secrets? Has anyone online ever asked you to keep something secret from me or dad?",
      why: "Builds resilience against predatory grooming and emotional manipulation."
    },
    {
      topic: "Money & Airtime Requests",
      prompt: "Did you see those fake promotions promising free airtime on WhatsApp? What would you do if someone asked you to send them money?",
      why: "Educates on financial blackmail and scams without feeling like an interrogation."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="yellow" size="md">Parent &amp; Guardian Centre</Badge>
            <span className="text-xs text-slate-400 font-mono">Trust-Based Digital Wellbeing</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 mt-1">
            Family Safety Centre
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Encouraging open dialogue, mutual trust, and timely safeguarding for your children.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigateTo('/report')}
        >
          Lodge Family Concern
        </Button>
      </div>

      {/* 4 Stat Cards (Section 11 Requirements) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card variant="default" className="p-5 space-y-1">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
            Children Protected
          </span>
          <div className="text-3xl font-extrabold font-mono text-cyan-400">
            {parentProfile.children.length}
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            Alex (13) &amp; Brian (11)
          </span>
        </Card>

        <Card variant="warning" className="p-5 space-y-1">
          <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
            Safety Alerts
          </span>
          <div className="text-3xl font-extrabold font-mono text-amber-400">
            {parentAlerts.filter(a => !a.read).length}
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            {parentAlerts.length} total notifications
          </span>
        </Card>

        <Card variant="default" className="p-5 space-y-1">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
            Reports Logged
          </span>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">
            {incidents.filter(i => i.reporterRole === 'parent' || i.reporterRole === 'child').length}
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            Encrypted case files
          </span>
        </Card>

        <Card variant="default" className="p-5 space-y-1">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
            Learning Progress
          </span>
          <div className="text-3xl font-extrabold font-mono text-cyan-400">
            78%
          </div>
          <span className="text-[11px] text-emerald-400 font-medium block pt-1">
            +140 points this week
          </span>
        </Card>

      </div>

      {/* "Start a Conversation" Discussion Prompts Card (Section 11 Requirement) */}
      <Card variant="glass" className="p-6 sm:p-8 space-y-5 border-amber-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">
                Start a Conversation
              </h3>
              <p className="text-xs text-slate-400">
                Healthy conversation starters to talk with your child without invading their privacy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">
              Prompt {activePromptIndex + 1} of {discussionPrompts.length}
            </span>
            <button
              onClick={() => setActivePromptIndex((activePromptIndex + 1) % discussionPrompts.length)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-400 font-semibold"
            >
              Shuffle ➔
            </button>
          </div>
        </div>

        {/* Selected Prompt Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#141F3B] to-slate-900 border border-slate-700/80 space-y-3">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            Discussion Topic: {discussionPrompts[activePromptIndex].topic}
          </span>
          <p className="text-sm font-semibold text-slate-100 leading-relaxed italic">
            "{discussionPrompts[activePromptIndex].prompt}"
          </p>
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span><strong>Why it works:</strong> {discussionPrompts[activePromptIndex].why}</span>
          </div>
        </div>

        {/* Anti-Spyware Trust Statement (Section 11 Prompt Requirement) */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Safeguarding Principle:</strong> SafeUganda does not turn devices into covert listening bugs. Research shows that covert surveillance destroys child-parent trust and pushes children to hide devices. We prioritize literacy, communication, and mutual consent.
          </p>
        </div>
      </Card>

      {/* Safety Alerts Timeline (Section 11 Requirement) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-slate-100">Recent Safety Alerts Timeline</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Real-time alerts</span>
        </div>

        <div className="space-y-3">
          {parentAlerts.map(alert => (
            <Card 
              key={alert.id} 
              variant="default"
              className={`p-5 transition-all ${alert.read ? 'opacity-80' : 'border-amber-500/40 shadow-glow-yellow'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-100">{alert.title}</span>
                    <Badge variant={alert.severity === 'high' ? 'red' : (alert.severity === 'medium' ? 'yellow' : 'cyan')} size="sm">
                      {alert.childName}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {alert.message}
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-amber-300">
                    <strong>Suggested Parent Discussion:</strong> "{alert.discussionPrompt}"
                  </div>
                </div>

                <div className="text-right flex-shrink-0 space-y-2">
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {alert.timestamp}
                  </span>
                  {!alert.read && (
                    <button
                      onClick={() => markAlertRead(alert.id)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 block ml-auto"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};
