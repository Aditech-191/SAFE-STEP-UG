import React, { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  AlertTriangle, 
  BookOpen, 
  HeartHandshake, 
  Phone, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Smartphone, 
  Users, 
  EyeOff, 
  MessageSquare, 
  Check, 
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SafetyScoreRing } from '../components/common/SafetyScoreRing';
import { SAMPLE_MESSAGE_PRESETS } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const { navigateTo, safetyScore, setRole } = useApp();

  // Mini interactive Message Checker on landing page
  const [testText, setTestText] = useState(SAMPLE_MESSAGE_PRESETS[0].text);
  const [analysisResult, setAnalysisResult] = useState<any>(SAMPLE_MESSAGE_PRESETS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const lower = testText.toLowerCase();
      if (lower.includes('clothes') || lower.includes('bedroom') || lower.includes('secret') || lower.includes('private pic')) {
        setAnalysisResult({
          category: 'Sexual/Grooming Concern',
          severity: 'Critical',
          action: 'Block immediately • Never send photos • Inform trusted adult or call Sauti 116',
          explanation: 'This message attempts to coerce secrecy and requests indecent private photos. This violates child safeguarding laws.'
        });
      } else if (lower.includes('money') || lower.includes('ugx') || lower.includes('airtel') || lower.includes('tell the whole school') || lower.includes('leak')) {
        setAnalysisResult({
          category: 'Threat / Coercion',
          severity: 'Critical',
          action: 'Never send money • Save screenshot evidence • Tell guardian right away',
          explanation: 'Detected financial extortion and social blackmail. You are never to blame for threats made against you.'
        });
      } else if (lower.includes('useless') || lower.includes('hate you') || lower.includes('nobody wants you') || lower.includes('loser') || lower.includes('idiot')) {
        setAnalysisResult({
          category: 'Potential Bullying',
          severity: 'High',
          action: 'Do not argue back • Mute sender • Tell someone you trust',
          explanation: 'This message contains exclusionary or insulting language targeting your self-worth.'
        });
      } else if (lower.includes('free') || lower.includes('claim') || lower.includes('win') || lower.includes('link') || lower.includes('http')) {
        setAnalysisResult({
          category: 'Suspicious Request',
          severity: 'Medium',
          action: 'Do not click the link • Verify sender identity • Delete message',
          explanation: 'Detected suspicious prize or unverified link that may attempt mobile phishing.'
        });
      } else {
        setAnalysisResult({
          category: 'Safe',
          severity: 'Low',
          action: 'Healthy normal conversation • No safety indicators detected',
          explanation: 'Language appears supportive, ordinary, or friendly peer conversation.'
        });
      }
      setIsAnalyzing(false);
    }, 400);
  };

  return (
    <div className="space-y-20 py-6 overflow-hidden">
      
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        {/* Cybersecurity ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Calls to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust statement pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-medium text-slate-300 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-cyan-400 font-semibold">SAFE + TRUSTED</span>
              <span className="text-slate-500">•</span>
              <span>Education • Prevention • Reporting • Protection</span>
            </div>

            {/* Large headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.15]">
              Safer Digital Spaces for Every Child in{' '}
              <span className="relative whitespace-nowrap">
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-red-400 bg-clip-text text-transparent">
                  Uganda.
                </span>
                {/* Underline accent */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-500/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,0 100,15" fill="transparent" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
              SafeUganda helps children, families and schools prevent cyberbullying, recognize harmful online behaviour, report abuse and build safer digital habits — without turning devices into invasive surveillance tools.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                variant="danger"
                size="lg"
                icon={<AlertTriangle className="w-5 h-5 animate-pulse" />}
                onClick={() => navigateTo('/emergency-help')}
              >
                Get Help Now
              </Button>

              <Button
                variant="yellow"
                size="lg"
                icon={<BookOpen className="w-5 h-5 text-slate-950" />}
                onClick={() => {
                  setRole('child');
                  navigateTo('/dashboard/child/learn');
                }}
              >
                Learn Online Safety
              </Button>

              <Button
                variant="outline"
                size="lg"
                icon={<MessageSquare className="w-5 h-5" />}
                onClick={() => {
                  setRole('child');
                  navigateTo('/dashboard/child/safety-check');
                }}
              >
                Check a Message
              </Button>
            </div>

            {/* Micro Trust Stats */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">100%</div>
                <div className="text-[11px] text-slate-400">Confidential &amp; Child-Safe</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">24/7</div>
                <div className="text-[11px] text-slate-400">Sauti 116 Emergency Toll-Free</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">Zero</div>
                <div className="text-[11px] text-slate-400">Invasive Spyware</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Illustration (Cyber Shield + Device + Safe Chat) */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Visual Hero Container with modern cybersecurity aesthetics */}
            <div className="relative w-full max-w-md">
              
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500/30 via-amber-500/20 to-red-500/20 blur-xl opacity-75 animate-pulse-subtle" />

              {/* Central Hero Device Card */}
              <div className="relative rounded-3xl bg-[#0D152C] border border-cyan-500/40 p-5 shadow-2xl overflow-hidden backdrop-blur-xl">
                
                {/* Header with phone status */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-slate-200 font-bold">SafeStep Shield • Active</span>
                  </div>
                  <span>Kampala 09:42</span>
                </div>

                {/* Cyber Shield Badge */}
                <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-[#121E3E] border border-cyan-500/30 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-950/50 flex items-center justify-center flex-shrink-0 animate-float-slow">
                    <div className="w-full h-full bg-[#081226] rounded-[14px] flex items-center justify-center">
                      <Shield className="w-7 h-7 text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">Live Protective Companion</h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Evaluates messages locally. Never shames, gives calm choices immediately.
                    </p>
                  </div>
                </div>

                {/* Simulated Protected Chat Stream */}
                <div className="space-y-2.5 text-xs">
                  {/* Incoming harmless message */}
                  <div className="p-3 rounded-2xl rounded-tl-sm bg-slate-900/80 border border-slate-800 text-slate-200">
                    <span className="font-semibold text-cyan-400 block mb-1">Alex M. (Classmate)</span>
                    "Hey, are you joining the science study group at lunch?"
                  </div>

                  {/* Flagged incident with protective alert card */}
                  <div className="p-3 rounded-2xl bg-red-950/30 border border-red-500/40 text-slate-200">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-red-400 mb-1">
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Bullying Warning Detected</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Advisory</span>
                    </div>
                    <p className="text-xs text-slate-300 italic">
                      "Everyone in class thinks you are useless..."
                    </p>

                    {/* Safe Action Buttons */}
                    <div className="mt-2.5 pt-2 border-t border-red-900/40 flex flex-wrap gap-1.5">
                      <span className="px-2 py-1 rounded-lg bg-cyan-600 text-white text-[10px] font-bold">
                        Talk to Adult
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-medium">
                        Mute Contact
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-medium">
                        Save Proof
                      </span>
                    </div>
                  </div>

                  {/* Supportive Mascot Message */}
                  <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 flex items-start gap-2.5">
                    <span className="text-xl">🤝</span>
                    <div>
                      <strong className="block text-xs font-bold text-emerald-300">
                        You didn't do anything wrong
                      </strong>
                      <span className="text-[11px] text-slate-300">
                        You are in control of your digital space. Choose a safe step above.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Cards */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Uganda DPPA 2019 ✓</span>
                  <span className="text-amber-400 font-bold">Sauti 116 Active</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SAFETY STATUS COMPONENT (SECTION 5 OF PROMPT)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <Badge variant="cyan" size="md">Digital Wellbeing Indicator</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Explainable, Empowering Safety Scores
          </h2>
          <p className="text-sm text-slate-400">
            Never used to punish, restrict, or label a child. Built strictly to guide positive digital habits with clear transparency.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <SafetyScoreRing 
            score={safetyScore} 
            onExploreMore={() => navigateTo('/dashboard/child/safety-check')} 
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE "CHECK A MESSAGE" TOOL PREVIEW (SECTION 7)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0F1934] via-[#0D152D] to-[#0A1020] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl space-y-3 mb-8">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <MessageSquare className="w-5 h-5" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                Check a Suspicious Message
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              If a message makes you feel uncomfortable, threatened, scared or pressured, you can test it here safely. SafeUganda analyzes the text on your device without storing or publishing your private chats.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input & Presets Column */}
            <div className="lg:col-span-7 space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 font-mono uppercase tracking-wider">
                  Test With Preset Safe Examples:
                </label>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_MESSAGE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setTestText(preset.text);
                        setAnalysisResult(preset);
                      }}
                      className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 font-mono uppercase tracking-wider">
                  Paste Message Text Here:
                </label>
                <textarea
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-100 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 placeholder-slate-500"
                  placeholder="Paste a message here..."
                />
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  icon={<ShieldCheck className="w-4 h-4" />}
                  onClick={handleRunAnalysis}
                  disabled={!testText.trim() || isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing Safely...' : 'Analyze Safely'}
                </Button>

                <button
                  onClick={() => setTestText('')}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear text
                </button>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Cloud Retention: SafeUganda evaluates language without sending chats to remote advertising servers.</span>
              </div>

            </div>

            {/* Assessment Result Column */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#091124] border border-cyan-500/20 p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                    Educational Assessment
                  </span>
                  <Badge 
                    variant={analysisResult.severity === 'Critical' ? 'red' : (analysisResult.severity === 'High' ? 'yellow' : (analysisResult.severity === 'Medium' ? 'cyan' : 'green'))}
                    size="sm"
                  >
                    {analysisResult.category}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-slate-400 uppercase font-mono font-semibold">
                    Why SafeUganda Flagged This:
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    {analysisResult.explanation || "This message contains pressure or language that warrants support."}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-amber-400 uppercase font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Recommended Next Actions:</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 pl-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span><strong>Do not respond</strong> in anger or fear</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span><strong>Save evidence</strong> (take a screenshot)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span><strong>Block the sender</strong> on the platform</span>
                    </li>
                    <li className="flex items-center gap-2 text-amber-300 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span><strong>Talk to a trusted adult</strong> (primary recommendation)</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Button
                    variant="yellow"
                    size="sm"
                    className="w-full"
                    onClick={() => navigateTo('/report')}
                  >
                    Report this concern confidentially
                  </Button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: CORE PILLARS & STAKEHOLDER PORTALS (SECTIONS 11, 12, 13)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <Badge variant="yellow" size="md">Multi-Stakeholder Framework</Badge>
          <h2 className="text-3xl font-extrabold text-slate-100">
            Tailored Portals for the Child Protection Ecosystem
          </h2>
          <p className="text-sm text-slate-400">
            Each dashboard gives tailored tools to protect children without creating invasive surveillance or family mistrust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Child */}
          <Card 
            variant="interactive" 
            onClick={() => { setRole('child'); navigateTo('/dashboard/child'); }}
            className="p-6 space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              👧
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                Child Safety Companion
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Empathetic, non-shaming guidance, message check tools, interactive quizzes, and one-tap access to trusted adults.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
              <span>Open Child View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>

          {/* Card 2: Parent */}
          <Card 
            variant="interactive" 
            onClick={() => { setRole('parent'); navigateTo('/dashboard/parent'); }}
            className="p-6 space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              👨‍👩‍👧
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                Parent Safety Centre
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Trust-based supervision. Conversation starters, wellbeing alerts, and practical advice without reading every private chat.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
              <span>Open Parent View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>

          {/* Card 3: School */}
          <Card 
            variant="interactive" 
            onClick={() => { setRole('school'); navigateTo('/dashboard/school'); }}
            className="p-6 space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              🏫
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                School Safeguarding Desk
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Anonymized school-wide trend analytics, student digital literacy progress, and peer conflict resolution tools.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <span>Open School View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>

          {/* Card 4: Admin */}
          <Card 
            variant="interactive" 
            onClick={() => { setRole('admin'); navigateTo('/dashboard/admin'); }}
            className="p-6 space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              🛡️
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-400 transition-colors">
                Safeguarding Operations
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Triage critical alerts, dispatch verified incidents to officers, maintain audit trails, and coordinate with Sauti 116.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-rose-400 font-semibold">
              <span>Open Admin View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: INAPPROPRIATE CONTENT / PORNOGRAPHY SAFETY (SECTION 8)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 relative overflow-hidden">
          
          <div className="max-w-3xl space-y-3 mb-8">
            <Badge variant="green" size="md">Non-Shaming Protection</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              Protect Me From Harmful Content
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              "Sometimes children may accidentally or intentionally encounter sexual or inappropriate content online. You are not in trouble for seeing something harmful. You can always ask for help."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-[#0F172E] border border-slate-800 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">1</span>
              <h4 className="text-sm font-bold text-slate-100">Leave the Page Immediately</h4>
              <p className="text-xs text-slate-400">Close the browser tab or app right away without lingering.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172E] border border-slate-800 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">2</span>
              <h4 className="text-sm font-bold text-slate-100">Do Not Share It</h4>
              <p className="text-xs text-slate-400">Never forward harmful material to other students or WhatsApp groups.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172E] border border-slate-800 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">3</span>
              <h4 className="text-sm font-bold text-slate-100">Do Not Download It</h4>
              <p className="text-xs text-slate-400">Do not save files or photos to device storage or memory cards.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172E] border border-slate-800 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">4</span>
              <h4 className="text-sm font-bold text-slate-100">Do Not Send to Friends</h4>
              <p className="text-xs text-slate-400">Prevent further emotional distress by breaking the chain of transmission.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172E] border border-slate-800 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">5</span>
              <h4 className="text-sm font-bold text-slate-100">Tell a Trusted Adult</h4>
              <p className="text-xs text-slate-400">Reach a parent, school counsellor, or call Sauti 116 with zero shame.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172E] border border-slate-800 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">6</span>
              <h4 className="text-sm font-bold text-slate-100">Report the Content</h4>
              <p className="text-xs text-slate-400">Use SafeUganda's confidential reporting tool to help block the link.</p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: TRUST STATEMENTS & REGIONAL IMPACT
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#0B1530] to-amber-950/30 border border-cyan-500/30 text-center space-y-6">
          <Badge variant="cyan" size="md">Child Protection Commitment</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 max-w-2xl mx-auto">
            "Every Child Deserves Digital Dignity and Protection"
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            SafeUganda is built with child safeguarding as the primary constraint. Zero advertising trackers, zero invasive cloud storage of chats, and zero shaming.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={<ShieldCheck className="w-5 h-5" />}
              onClick={() => navigateTo('/report')}
            >
              Report a Concern Confidentially
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigateTo('/how-it-works')}
            >
              Read How It Works
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};
