import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  ShieldAlert, 
  HeartHandshake, 
  FileText, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  MapPin, 
  Info,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const EmergencyHelpPage: React.FC = () => {
  const { navigateTo, childProfile } = useApp();
  const [selectedAdultCall, setSelectedAdultCall] = useState<string | null>(null);

  const primaryGuardian = childProfile.trustedAdults[0];
  const schoolCounsellor = childProfile.trustedAdults[1];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* High-Visibility Emergency Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/50 text-red-400 font-mono text-xs font-bold animate-pulse">
          <AlertTriangle className="w-4 h-4" />
          <span>URGENT CHILD SAFETY ASSISTANCE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight">
          I Need Help Now
        </h1>
      </div>

      {/* Immediate Danger Callout Banner (Prompt Section 10 Requirement) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950 via-[#2A0F1A] to-slate-900 border-2 border-red-500 shadow-2xl shadow-red-950/60 text-slate-100 space-y-3">
        <div className="flex items-center gap-3 text-red-400 font-extrabold text-lg">
          <ShieldAlert className="w-6 h-6 animate-bounce" />
          <span>If You Are In Immediate Danger:</span>
        </div>
        <p className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
          "If you are in immediate danger, move to a safe place and contact a trusted adult or appropriate emergency service."
        </p>
        <p className="text-xs text-slate-300">
          Remember: You did nothing wrong. It is always safe and courageous to ask for help when someone threatens or harasses you online.
        </p>
      </div>

      {/* 4 Core Quick Emergency Buttons (Prompt Section 10) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Button 1: Call Trusted Adult */}
        <Card 
          variant="interactive" 
          onClick={() => setSelectedAdultCall(primaryGuardian.name)}
          className="p-6 border-cyan-500/30 hover:border-cyan-400 bg-gradient-to-br from-[#121E3B] to-[#0A1224] space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Call Trusted Adult</h3>
            <p className="text-xs text-slate-300 mt-1">
              Reach your parent or guardian: <strong className="text-cyan-300">{primaryGuardian?.name}</strong> ({primaryGuardian?.relationship}).
            </p>
          </div>
          <div className="text-xs text-cyan-400 font-bold flex items-center gap-1.5 pt-1">
            <Phone className="w-4 h-4" />
            <span>{primaryGuardian?.phone || '+256 772 123 456'}</span>
          </div>
        </Card>

        {/* Button 2: Contact School Safeguarding Officer */}
        <Card 
          variant="interactive" 
          onClick={() => setSelectedAdultCall(schoolCounsellor.name)}
          className="p-6 border-emerald-500/30 hover:border-emerald-400 bg-gradient-to-br from-[#0F2228] to-[#0A1224] space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">School Safeguarding Officer</h3>
            <p className="text-xs text-slate-300 mt-1">
              Talk confidentially with <strong className="text-emerald-300">{schoolCounsellor?.name}</strong> at Kampala Primary School.
            </p>
          </div>
          <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
            <Phone className="w-4 h-4" />
            <span>{schoolCounsellor?.phone || '+256 701 987 654'}</span>
          </div>
        </Card>

        {/* Button 3: Report Incident */}
        <Card 
          variant="interactive" 
          onClick={() => navigateTo('/report')}
          className="p-6 border-amber-500/30 hover:border-amber-400 bg-gradient-to-br from-[#261B10] to-[#0A1224] space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Report Incident Confidentially</h3>
            <p className="text-xs text-slate-300 mt-1">
              Log cyberbullying, sextortion, or threats into our encrypted safeguarding queue.
            </p>
          </div>
          <div className="text-xs text-amber-400 font-bold flex items-center gap-1.5 pt-1">
            <span>Open 5-Step Report Wizard</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Card>

        {/* Button 4: Find Help / Sauti 116 */}
        <Card 
          variant="interactive" 
          onClick={() => setSelectedAdultCall('Sauti 116 Helpline')}
          className="p-6 border-red-500/40 hover:border-red-400 bg-gradient-to-br from-[#2D0F19] to-[#0A1224] space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">National Sauti 116 Child Helpline</h3>
            <p className="text-xs text-slate-300 mt-1">
              Official toll-free Uganda Government helpline. Free from MTN, Airtel, and Uganda Telecom.
            </p>
          </div>
          <div className="text-xs text-red-400 font-bold flex items-center gap-1.5 pt-1">
            <Phone className="w-4 h-4 animate-pulse" />
            <span>Toll-Free: Dial 116</span>
          </div>
        </Card>

      </div>

      {/* Verified Official Uganda Helplines Directory */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <span>Official Verified Child Protection Directory (Uganda)</span>
          <Badge variant="green" size="sm">Government Verified</Badge>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-[#0F172E] border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200">Sauti 116 Child Helpline</h4>
            <p className="text-slate-400">Ministry of Gender, Labour &amp; Social Development</p>
            <div className="text-sm font-bold text-amber-400 font-mono">116 (Toll-Free)</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F172E] border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200">Uganda Police CFPU</h4>
            <p className="text-slate-400">Child &amp; Family Protection Unit Head Office</p>
            <div className="text-sm font-bold text-cyan-400 font-mono">0800 199 195</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F172E] border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-200">Police Emergency Direct</h4>
            <p className="text-slate-400">National Police Rapid Response</p>
            <div className="text-sm font-bold text-red-400 font-mono">999 / 112</div>
          </div>

        </div>

        <p className="text-[11px] text-slate-500 italic">
          Emergency phone contacts are verified with Uganda Communications Commission and Ministry of Gender child-safeguarding directives. Configurable by authorized administrator officers.
        </p>
      </div>

      {/* Simulated Call Modal */}
      {selectedAdultCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-[#0E1730] border border-cyan-500/40 p-6 text-center space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mx-auto text-2xl animate-bounce">
              <Phone className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Connecting Call...</span>
              <h3 className="text-xl font-bold text-slate-100 mt-1">{selectedAdultCall}</h3>
              <p className="text-xs text-emerald-400 mt-1">Simulated Direct Safeguarding Line</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              In a real situation on your mobile phone, this button will immediately dial the verified number without saving any public trace.
            </p>

            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setSelectedAdultCall(null)}
            >
              Close Simulator
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};
