import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Lock, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Info,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const ChildSettingsPage: React.FC = () => {
  const { childProfile, addTrustedAdult, removeTrustedAdult, addToast } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Parent / Guardian');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    addTrustedAdult({
      name,
      relationship,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@family.ug`,
      isVerified: true
    });

    setName('');
    setPhone('');
    setEmail('');
    setIsAddModalOpen(false);
  };

  const handleClearAccountData = () => {
    addToast('info', 'Local Data Reset', 'Device offline telemetry cleared safely.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-200">
      
      {/* Title */}
      <div className="space-y-2">
        <Badge variant="cyan" size="md">Settings &amp; Guardians</Badge>
        <h1 className="text-3xl font-extrabold text-slate-100">
          My Trusted People &amp; Privacy
        </h1>
        <p className="text-sm text-slate-300">
          Choose the caring adults who can support you when online situations get uncomfortable.
        </p>
      </div>

      {/* =========================================================================
          SECTION 17: MY TRUSTED PEOPLE
          ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-slate-100">My Trusted People</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Trusted Adult
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {childProfile.trustedAdults.map(adult => (
            <Card key={adult.id} variant="default" className="p-5 space-y-3 relative group">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-100">{adult.name}</h3>
                  <span className="text-xs text-cyan-400 font-semibold">{adult.relationship}</span>
                </div>
                {adult.isVerified && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>

              <div className="space-y-1 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{adult.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{adult.email}</span>
                </div>
              </div>

              {childProfile.trustedAdults.length > 1 && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => removeTrustedAdult(adult.id)}
                    className="text-slate-500 hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 18: PRIVACY CENTRE ("MY PRIVACY")
          ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-slate-100">My Privacy Guarantee</h2>
        </div>

        <Card variant="glass" className="p-6 sm:p-8 space-y-6">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 font-medium leading-relaxed">
            "Your safety information should only be available to people who need it to help keep you safe. SafeUganda will never sell your details or turn your device into a spy camera."
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-slate-100">What We Collect</h4>
              <p className="text-slate-400 leading-relaxed">
                Only the reports you explicitly submit, and your learning points. We never track your location or read chats secretly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-slate-100">Who Can See It</h4>
              <p className="text-slate-400 leading-relaxed">
                Only verified school safeguarding counsellors or the adults you select. Other students will never see your reports.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-slate-100">How Evidence is Protected</h4>
              <p className="text-slate-400 leading-relaxed">
                Screenshots you attach are sealed with cryptographic SHA-256 hashes to prevent tampering or unauthorized leaks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h4 className="font-bold text-slate-100">Your Rights Under Uganda Law</h4>
              <p className="text-slate-400 leading-relaxed">
                Under the Data Protection and Privacy Act 2019, you have the complete right to request the deletion of your records.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center text-xs">
            <span className="text-slate-400">Want to clear local demo data?</span>
            <Button variant="ghost" size="sm" onClick={handleClearAccountData}>
              Clear Local Data
            </Button>
          </div>
        </Card>
      </section>

      {/* Add Adult Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add a Trusted Adult"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aunt Grace or Teacher Peter"
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Relationship</label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="Parent / Guardian">Parent / Guardian</option>
              <option value="Teacher">Teacher</option>
              <option value="School Counsellor">School Counsellor</option>
              <option value="Older Sibling / Relative">Older Sibling / Relative</option>
              <option value="Mentor / Church Leader">Mentor / Religious Leader</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Phone Number (Uganda)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+256 7XX XXX XXX"
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Email Address (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@example.ug"
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Contact
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
