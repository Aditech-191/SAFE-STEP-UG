import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Lock, 
  Sparkles, 
  Info,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { IncidentCategory, PlatformType } from '../types';

export const ReportPage: React.FC = () => {
  const { submitReport, navigateTo } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [category, setCategory] = useState<IncidentCategory>('Cyberbullying');
  const [affectedPerson, setAffectedPerson] = useState<'Me' | 'A friend' | 'Another child' | 'Someone else'>('Me');
  const [description, setDescription] = useState<string>('');
  const [platform, setPlatform] = useState<PlatformType>('WhatsApp');
  const [hasEvidence, setHasEvidence] = useState<boolean>(false);
  const [submittedIncidentId, setSubmittedIncidentId] = useState<string | null>(null);

  const categories: IncidentCategory[] = [
    'Cyberbullying',
    'Threats',
    'Harassment',
    'Inappropriate Content',
    'Grooming Concerns',
    'Sextortion',
    'Fake Account',
    'Suspicious Message',
    'Other'
  ];

  const affectedOptions: ('Me' | 'A friend' | 'Another child' | 'Someone else')[] = [
    'Me',
    'A friend',
    'Another child',
    'Someone else'
  ];

  const platforms: PlatformType[] = [
    'WhatsApp',
    'Facebook',
    'Instagram',
    'TikTok',
    'YouTube',
    'Online Game',
    'SMS',
    'Website',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const evidenceItems = hasEvidence ? [
      {
        id: 'ev-' + Date.now(),
        title: 'Mock Incident Screenshot (Sealed)',
        type: 'screenshot' as const,
        maskedPreview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60',
        sha256: 'sha256:mock_sealed_proof_' + Math.random().toString(36).substring(2, 9)
      }
    ] : [];

    const id = submitReport({
      category,
      severity: (category === 'Threats' || category === 'Sextortion' || category === 'Grooming Concerns') ? 'Critical' : 'High',
      locationDistrict: 'Kampala',
      reporterRole: 'child',
      affectedPerson,
      description,
      platform,
      assignedOfficer: 'Unassigned (In Triage Queue)',
      evidenceItems
    });

    setSubmittedIncidentId(id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title & Reassurance Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Confidential Safeguarding Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Report a Safety Concern
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          You are not in trouble for reporting. This form is private, protected, and reviewed only by authorized child-safeguarding officers.
        </p>
      </div>

      {submittedIncidentId ? (
        /* Submission Success Confirmation */
        <Card variant="shield" className="p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-3xl">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-800 text-cyan-400 border border-cyan-500/30">
              Reference #{submittedIncidentId}
            </span>
            <h2 className="text-2xl font-bold text-slate-100 mt-2">
              Your Concern Has Been Safely Received
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Thank you for speaking up. Your report has been sealed in the confidential safeguarding vault. An authorized child-protection officer is reviewing this case.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 text-left space-y-2">
            <div className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              <span>Immediate Protective Next Steps:</span>
            </div>
            <ul className="space-y-1 pl-4 list-disc text-slate-300">
              <li>Do not reply to any threatening or insulting messages from the sender.</li>
              <li>Keep screenshots or proof safe on your device.</li>
              <li>If you feel unsafe right now, call the toll-free child helpline: <strong>Sauti 116</strong>.</li>
            </ul>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              variant="primary"
              onClick={() => navigateTo('/dashboard/child')}
            >
              Return to Child Safety Hub
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSubmittedIncidentId(null);
                setCurrentStep(1);
                setDescription('');
              }}
            >
              Submit Another Report
            </Button>
          </div>
        </Card>
      ) : (
        /* 5-Step Report Wizard */
        <Card variant="glass" className="p-6 sm:p-10 shadow-2xl">
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Step {currentStep} of 5</span>
              <span>{Math.round((currentStep / 5) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: What happened? */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-slate-100">Step 1: What happened?</h3>
                <p className="text-xs text-slate-400 mt-1">Select the category that best describes the concern:</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all ${
                      category === cat
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{cat}</span>
                      {category === cat && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  variant="primary"
                  onClick={() => setCurrentStep(2)}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Who is affected? */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-slate-100">Step 2: Who is affected?</h3>
                <p className="text-xs text-slate-400 mt-1">Tell us who was targeted by this behavior:</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {affectedOptions.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAffectedPerson(opt)}
                    className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all ${
                      affectedPerson === opt
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {affectedPerson === opt && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setCurrentStep(1)} icon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button variant="primary" onClick={() => setCurrentStep(3)} icon={<ArrowRight className="w-4 h-4" />}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Tell us what happened */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-slate-100">Step 3: Tell us what happened</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Describe what was said or done in your own words. You don't have to use fancy language.
                </p>
              </div>

              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="For example: What did the person say? Did they make threats or ask for secrets? When did it start?"
                  className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  required
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Remember: Nothing you write here will ever be made public. Only verified safeguarding leads see this.</span>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setCurrentStep(2)} icon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setCurrentStep(4)} 
                  disabled={!description.trim()}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Where did this happen? */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-slate-100">Step 4: Where did this happen?</h3>
                <p className="text-xs text-slate-400 mt-1">Select the app, game, or platform where this occurred:</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {platforms.map(plat => (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => setPlatform(plat)}
                    className={`p-3.5 rounded-xl border text-left text-sm font-semibold transition-all ${
                      platform === plat
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md ring-1 ring-cyan-400'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{plat}</span>
                      {platform === plat && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setCurrentStep(3)} icon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button variant="primary" onClick={() => setCurrentStep(5)} icon={<ArrowRight className="w-4 h-4" />}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Would you like to attach evidence? & Privacy Pledge */}
          {currentStep === 5 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-slate-100">Step 5: Evidence &amp; Privacy Pledge</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Optional screenshot proof can help safeguarding officers verify and take action.
                </p>
              </div>

              {/* Evidence Upload Card Mock */}
              <div 
                onClick={() => setHasEvidence(!hasEvidence)}
                className={`p-6 rounded-2xl border-2 border-dashed cursor-pointer text-center space-y-3 transition-colors ${
                  hasEvidence 
                    ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-200' 
                    : 'border-slate-700 hover:border-cyan-500/50 bg-slate-900/50 text-slate-300'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-cyan-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">
                    {hasEvidence ? '✓ 1 Evidence Screenshot Mock Attached (SHA-256 Sealed)' : 'Click to Attach Screenshot Evidence (Simulated)'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Images are sanitized locally on your device before transfer.
                  </p>
                </div>
              </div>

              {/* Strict Privacy Pledge Callout (Prompt Requirement) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#101A33] to-[#0A1224] border border-cyan-500/30 text-xs text-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-cyan-300">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>Confidentiality &amp; Protection Guarantee</span>
                </div>
                <p className="leading-relaxed text-slate-300">
                  "Your report is private and will only be shared with authorized safeguarding personnel according to the platform's protection rules. It will never be publicly displayed or broadcast to other students."
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setCurrentStep(4)} icon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button 
                  variant="safety" 
                  size="lg" 
                  type="submit"
                  icon={<ShieldCheck className="w-5 h-5" />}
                >
                  Submit Protected Report
                </Button>
              </div>
            </form>
          )}

        </Card>
      )}

    </div>
  );
};
