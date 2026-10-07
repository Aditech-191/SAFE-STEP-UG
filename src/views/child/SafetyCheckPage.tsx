import React, { useState } from 'react';
import { 
  MessageSquare, 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  CheckCircle2, 
  EyeOff, 
  HeartHandshake, 
  ArrowRight,
  Sparkles,
  Info,
  Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SAMPLE_MESSAGE_PRESETS } from '../../data/mockData';

export const SafetyCheckPage: React.FC = () => {
  const { navigateTo } = useApp();

  const [messageInput, setMessageInput] = useState<string>(SAMPLE_MESSAGE_PRESETS[1].text);
  const [analysis, setAnalysis] = useState<any>(SAMPLE_MESSAGE_PRESETS[1]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Harmful image blur simulation state
  const [isBlurred, setIsBlurred] = useState<boolean>(true);

  const handleAnalyze = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const lower = messageInput.toLowerCase();
      if (lower.includes('clothes') || lower.includes('naked') || lower.includes('bedroom') || lower.includes('secret') || lower.includes('private pic')) {
        setAnalysis({
          category: 'Sexual/Grooming Concern',
          severity: 'Critical',
          action: 'Block immediately • Never send photos • Inform trusted adult or call Sauti 116',
          explanation: 'Severe risk: Detected demand for private images and secrecy coercion. Anyone asking for private photos or demanding secrets is breaking safeguarding laws.'
        });
      } else if (lower.includes('money') || lower.includes('ugx') || lower.includes('airtel') || lower.includes('tell the whole school') || lower.includes('leak') || lower.includes('or else')) {
        setAnalysis({
          category: 'Threat / Coercion',
          severity: 'Critical',
          action: 'Never send money • Save screenshot proof • Tell a guardian or Sauti 116 right away',
          explanation: 'High risk: Detected financial blackmail and social threats. Blackmail is an illegal crime committed against you. Never pay under pressure.'
        });
      } else if (lower.includes('useless') || lower.includes('nobody wants you') || lower.includes('ugly') || lower.includes('loser') || lower.includes('idiot')) {
        setAnalysis({
          category: 'Potential Bullying',
          severity: 'High',
          action: 'Do not respond • Mute the sender • Talk to a trusted adult',
          explanation: 'Bullying concern: Detected derogatory and exclusionary language targeting your emotional safety.'
        });
      } else if (lower.includes('free') || lower.includes('claim') || lower.includes('link') || lower.includes('win')) {
        setAnalysis({
          category: 'Suspicious Request',
          severity: 'Medium',
          action: 'Do not click link • Verify identity • Delete message',
          explanation: 'Detected suspicious offer or link that may attempt mobile malware or identity harvesting.'
        });
      } else {
        setAnalysis({
          category: 'Safe',
          severity: 'Low',
          action: 'Ordinary conversation • No safety concerns detected',
          explanation: 'Language appears healthy, ordinary peer interaction. SafeUganda stays quiet and lets you communicate freely.'
        });
      }
      setIsProcessing(false);
    }, 400);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="md">Cybersecurity Diagnostic Tool</Badge>
          <span className="text-xs text-slate-400 font-mono">On-Device NLP Analysis</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100">
          Check a Message for Safety Concerns
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          "If a message makes you feel uncomfortable, threatened, scared or pressured, you can check it here."
        </p>
      </div>

      {/* Main Analyzer Interface (Section 7 Requirements) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input & Presets Column */}
        <div className="lg:col-span-7 space-y-4">
          <Card variant="glass" className="p-6 space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 font-mono uppercase tracking-wider">
                Or Try Sample Situations:
              </label>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_MESSAGE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setMessageInput(preset.text);
                      setAnalysis(preset);
                    }}
                    className="text-xs px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 font-mono uppercase tracking-wider">
                Paste suspicious message here:
              </label>
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                rows={5}
                placeholder="Paste suspicious text here..."
                className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-100 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 placeholder-slate-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Button
                variant="primary"
                size="md"
                onClick={handleAnalyze}
                disabled={!messageInput.trim() || isProcessing}
                icon={<ShieldCheck className="w-4 h-4" />}
              >
                {isProcessing ? 'Analyzing On-Device...' : 'Analyze Safely'}
              </Button>

              <button
                onClick={() => setMessageInput('')}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Clear input
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Zero-Storage Rule: Text is evaluated inside your browser session and discarded immediately after.</span>
            </div>

          </Card>
        </div>

        {/* Diagnostic Assessment Panel */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="shield" className="p-6 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold uppercase text-slate-400">
                Diagnostic Result
              </span>
              <Badge 
                variant={analysis.severity === 'Critical' ? 'red' : (analysis.severity === 'High' ? 'yellow' : (analysis.severity === 'Medium' ? 'cyan' : 'green'))}
                size="md"
              >
                {analysis.category}
              </Badge>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase font-mono">
                Why was this flagged?
              </span>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {analysis.explanation || "This message contains pressure or language that warrants support."}
              </p>
            </div>

            {/* Recommended Action Checklist */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-amber-400 uppercase font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Recommended Actions:</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 pl-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1"></span>
                  <span><strong>Do not respond:</strong> Replying often escalates peer anger.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1"></span>
                  <span><strong>Save evidence:</strong> Take a screenshot with date and phone number.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1"></span>
                  <span><strong>Block the sender:</strong> Stop further incoming harassment.</span>
                </li>
                <li className="flex items-start gap-2 text-amber-300 font-semibold bg-amber-950/20 p-2 rounded-lg border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1"></span>
                  <span><strong>Talk to a trusted adult:</strong> (Primary action) Reach out right away.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 space-y-2">
              <Button
                variant="yellow"
                size="sm"
                className="w-full"
                onClick={() => navigateTo('/dashboard/child/report')}
              >
                Talk to a Trusted Adult Now
              </Button>
            </div>

          </Card>
        </div>

      </div>

      {/* =========================================================================
          SECTION 8: INAPPROPRIATE CONTENT / PORNOGRAPHY SAFETY SHIELD DEMO
          ========================================================================= */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121E3B] via-[#0E162B] to-[#0A1020] border border-cyan-500/30 space-y-8">
        
        <div className="max-w-2xl space-y-2">
          <Badge variant="green" size="md">Harmful Media Shield</Badge>
          <h2 className="text-2xl font-extrabold text-slate-100">
            Harmful Content &amp; Media Protection Demo
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            SafeUganda protects children without reproducing, viewing, or uploading explicit content. The UI uses local blur and abstract placeholders for complete child protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Abstract Protected Media Card Mock (Zero explicit images) */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-6 text-center space-y-4 overflow-hidden">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between pb-2 border-b border-slate-800">
              <span>Incoming Media Stream</span>
              <span className="text-red-400 font-bold">Filtered Locally</span>
            </div>

            {/* Blurred Abstract Mock Frame */}
            <div className="relative w-full h-44 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden border border-slate-800">
              {/* Blurred abstract shapes */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all ${isBlurred ? 'filter blur-xl opacity-40' : 'opacity-80'}`}>
                <div className="w-24 h-24 rounded-full bg-cyan-500/30"></div>
                <div className="w-20 h-20 rounded-full bg-amber-500/30 -ml-8"></div>
              </div>

              {/* Protective Shield Overlay */}
              <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shadow-lg">
                  <EyeOff className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-100">
                  {isBlurred ? 'Media Shielded by SafeUganda' : 'Caution: Simulated Educational Mock'}
                </h4>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  {isBlurred 
                    ? 'Content blurred locally to protect your space. You never have to view or share uncomfortable images.' 
                    : 'This is a synthetic abstract placeholder. SafeUganda never exposes graphic imagery.'}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Button
                variant={isBlurred ? 'outline' : 'secondary'}
                size="sm"
                onClick={() => setIsBlurred(!isBlurred)}
              >
                {isBlurred ? 'Peek Demo Overlay' : 'Re-engage Shield'}
              </Button>
              <Button
                variant="safety"
                size="sm"
                onClick={() => navigateTo('/report')}
              >
                Report Sender
              </Button>
            </div>
          </div>

          {/* 6 Rules Checklist Reminder */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-100">
              Remember the 6 Golden Rules:
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>1. <strong>Leave the page:</strong> Close the app or browser window.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>2. <strong>Do not share:</strong> Never forward it to peers or WhatsApp groups.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>3. <strong>Do not download:</strong> Do not save files to phone storage.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>4. <strong>Do not send to friends:</strong> Keep your friends safe as well.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>5. <strong>Tell a trusted adult:</strong> You will not be punished or blamed.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>6. <strong>Report the content:</strong> Help block the link for other children.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
