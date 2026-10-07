import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ArrowLeft, 
  UserCheck, 
  Lock, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Send, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Incident } from '../../types';

interface IncidentDetailViewProps {
  incident: Incident;
  onBack: () => void;
}

export const IncidentDetailView: React.FC<IncidentDetailViewProps> = ({ incident, onBack }) => {
  const { updateIncidentStatus, assignIncidentOfficer, addIncidentNote, addToast } = useApp();

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);

  const [selectedOfficer, setSelectedOfficer] = useState('Joyce Nabakooza (Safeguarding Lead)');
  const [escalateAgency, setEscalateAgency] = useState('Sauti 116 National Child Helpline');
  const [newNote, setNewNote] = useState('');
  const [resolutionText, setResolutionText] = useState('');

  const handleAssign = () => {
    assignIncidentOfficer(incident.id, selectedOfficer);
    setIsAssignModalOpen(false);
  };

  const handleEscalate = () => {
    updateIncidentStatus(incident.id, 'Escalated', `Escalated to external partner: ${escalateAgency}`);
    setIsEscalateModalOpen(false);
    addToast('warning', 'Incident Escalated', `Case #${incident.id} formally escalated to ${escalateAgency}.`);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    addIncidentNote(incident.id, newNote);
    setNewNote('');
    setIsNoteModalOpen(false);
  };

  const handleResolve = () => {
    updateIncidentStatus(incident.id, 'Resolved', resolutionText || 'Case marked as resolved after student safety check.');
    setIsResolveModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Back & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Incident Queue
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold font-mono text-slate-100">
                {incident.id}
              </h1>
              <Badge 
                variant={incident.severity === 'Critical' ? 'red' : (incident.severity === 'High' ? 'yellow' : 'cyan')}
                size="md"
              >
                {incident.severity} Severity
              </Badge>
              <Badge 
                variant={incident.status === 'Resolved' ? 'green' : (incident.status === 'Escalated' ? 'red' : 'yellow')}
                size="md"
              >
                {incident.status}
              </Badge>
            </div>
            <span className="text-xs text-slate-400 font-mono mt-0.5 block">
              Filed: {incident.date} • Location: {incident.locationDistrict} • Platform: {incident.platform}
            </span>
          </div>
        </div>

        {/* 4 Primary Action Buttons (Section 14 Prompt Requirement) */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsAssignModalOpen(true)}>
            Assign Officer
          </Button>
          <Button variant="danger" size="sm" onClick={() => setIsEscalateModalOpen(true)}>
            Escalate to Sauti 116
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setIsNoteModalOpen(true)}>
            Add Confidential Note
          </Button>
          {incident.status !== 'Resolved' && (
            <Button variant="safety" size="sm" onClick={() => setIsResolveModalOpen(true)}>
              Mark Resolved
            </Button>
          )}
        </div>
      </div>

      {/* Grid Layout: Main Case File vs Meta Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Incident Summary Card */}
          <Card variant="glass" className="p-6 space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase font-mono tracking-wider">
              Incident Summary &amp; Description
            </h3>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 leading-relaxed">
              "{incident.description}"
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-2 font-mono">
              <span>Category: <strong className="text-slate-200">{incident.category}</strong></span>
              <span>Affected: <strong className="text-slate-200">{incident.affectedPerson}</strong></span>
              <span>Reporter Role: <strong className="text-slate-200 uppercase">{incident.reporterRole}</strong></span>
            </div>
          </Card>

          {/* Evidence Card */}
          <Card variant="default" className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-400 uppercase font-mono tracking-wider">
                Attached Sealed Evidence ({incident.evidenceItems.length})
              </h3>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <Lock className="w-3 h-3" /> Cryptographic Integrity Verified
              </span>
            </div>

            {incident.evidenceItems.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">
                No screenshot evidence was attached to this report.
              </p>
            ) : (
              <div className="space-y-3">
                {incident.evidenceItems.map(item => (
                  <div key={item.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">{item.title}</span>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase">{item.type}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 truncate">
                      SHA-256 Hash: <span className="text-emerald-400">{item.sha256}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Timeline of Safeguarding Actions */}
          <Card variant="default" className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase font-mono tracking-wider pb-2 border-b border-slate-800">
              Case Timeline &amp; Chain of Custody
            </h3>

            <div className="space-y-4">
              {incident.timeline.map((event, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-100 font-semibold">{event.title}</strong>
                      <span className="text-[10px] font-mono text-slate-500">{event.time}</span>
                    </div>
                    <p className="text-slate-300">{event.description}</p>
                    <span className="text-[10px] text-cyan-400 font-mono block">By: {event.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Meta / Notes Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Officer Assignment */}
          <Card variant="shield" className="p-5 space-y-3">
            <span className="text-xs font-bold uppercase text-slate-400 font-mono">Assigned Officer</span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                JN
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">{incident.assignedOfficer}</h4>
                <span className="text-[11px] text-emerald-400 font-medium">Authorized Case Lead</span>
              </div>
            </div>
          </Card>

          {/* Safeguarding Notes */}
          <Card variant="default" className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400 font-mono">Confidential Notes</span>
              <button onClick={() => setIsNoteModalOpen(true)} className="text-xs text-cyan-400 hover:underline">
                + Add Note
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              {incident.safeguardingNotes.map((note, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 leading-relaxed">
                  {note}
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>

      {/* Assign Modal */}
      <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title="Assign Safeguarding Officer">
        <div className="space-y-4 text-xs">
          <p className="text-slate-300">Select an authorized child-protection officer to take ownership of this case:</p>
          <select 
            value={selectedOfficer}
            onChange={(e) => setSelectedOfficer(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
          >
            <option value="Joyce Nabakooza (Safeguarding Lead)">Joyce Nabakooza (Safeguarding Lead)</option>
            <option value="Paul Kasozi (Operations Officer)">Paul Kasozi (Operations Officer)</option>
            <option value="David Okello (Kampala Primary Lead)">David Okello (Kampala Primary Lead)</option>
            <option value="National Sauti 116 Desk">National Sauti 116 Desk</option>
          </select>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsAssignModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleAssign}>Confirm Assignment</Button>
          </div>
        </div>
      </Modal>

      {/* Escalate Modal */}
      <Modal isOpen={isEscalateModalOpen} onClose={() => setIsEscalateModalOpen(false)} title="Escalate to Child Protection Agency">
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200">
            ⚠️ Formal escalation will securely forward the single verified snippet to national authorities under the Uganda Children Act Cap 59.
          </div>
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Escalation Destination:</label>
            <select
              value={escalateAgency}
              onChange={(e) => setEscalateAgency(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
            >
              <option value="Sauti 116 National Child Helpline">Sauti 116 National Child Helpline (Toll-Free)</option>
              <option value="Uganda Police CFPU (Child & Family Protection Unit)">Uganda Police CFPU</option>
              <option value="Ministry of Gender Safeguarding Desk">Ministry of Gender Safeguarding Desk</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEscalateModalOpen(false)}>Cancel</Button>
            <Button variant="danger" size="sm" onClick={handleEscalate}>Confirm &amp; Dispatch Escalation</Button>
          </div>
        </div>
      </Modal>

      {/* Add Note Modal */}
      <Modal isOpen={isNoteModalOpen} onClose={() => setIsNoteModalOpen(false)} title="Append Safeguarding Note">
        <div className="space-y-4 text-xs">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={4}
            placeholder="Type confidential case observations or consultation details..."
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsNoteModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleAddNote}>Save Note</Button>
          </div>
        </div>
      </Modal>

      {/* Resolve Modal */}
      <Modal isOpen={isResolveModalOpen} onClose={() => setIsResolveModalOpen(false)} title="Close Case as Resolved">
        <div className="space-y-4 text-xs">
          <p className="text-slate-300">Document the resolution and protective actions completed before closing:</p>
          <textarea
            value={resolutionText}
            onChange={(e) => setResolutionText(e.target.value)}
            rows={3}
            placeholder="e.g. Sender blocked, guardian checked in with student, school counsellor conducted safe debrief."
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100"
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setIsResolveModalOpen(false)}>Cancel</Button>
            <Button variant="safety" size="sm" onClick={handleResolve}>Mark Resolved</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
