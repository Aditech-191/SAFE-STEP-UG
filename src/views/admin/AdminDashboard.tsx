import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Users, 
  CheckCircle2, 
  Activity, 
  Search, 
  Filter, 
  ArrowRight,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { IncidentDetailView } from './IncidentDetailView';
import { Incident, IncidentSeverity } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { incidents, selectedIncident, setSelectedIncident } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredIncidents = useMemo(() => {
    return incidents.filter(inc => {
      const matchesSearch = inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inc.assignedOfficer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeverity = severityFilter === 'All' || inc.severity === severityFilter;
      const matchesStatus = statusFilter === 'All' || inc.status === statusFilter;

      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [incidents, searchQuery, severityFilter, statusFilter]);

  if (selectedIncident) {
    return (
      <IncidentDetailView
        incident={selectedIncident}
        onBack={() => setSelectedIncident(null)}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="red" size="md">National Safeguarding Desk</Badge>
            <span className="text-xs text-slate-400 font-mono">Operations Command</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 mt-1">
            Safeguarding Operations Centre
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Real-time incident response, multi-agency escalation, and audit logging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="green" size="md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
            System Health: 99.9%
          </Badge>
        </div>
      </div>

      {/* 5 Core Metrics (Section 13 Requirements) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <Card variant="warning" className="p-4 space-y-1">
          <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
            Active Incidents
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
            {incidents.filter(i => i.status !== 'Resolved').length}
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            Requiring follow-up
          </span>
        </Card>

        <Card variant="default" className="p-4 space-y-1 border-red-500/30">
          <span className="text-xs font-mono font-semibold text-red-400 uppercase tracking-wider">
            Critical Alerts
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-red-400">
            {incidents.filter(i => i.severity === 'Critical').length}
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            High-urgency escalation
          </span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
            Pending Reviews
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">
            5
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            Awaiting officer triage
          </span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            Resolved Reports
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
            48
          </div>
          <span className="text-[11px] text-emerald-400 font-medium block pt-1">
            Closed with safety plan
          </span>
        </Card>

        <Card variant="default" className="p-4 space-y-1 col-span-2 lg:col-span-1">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
            System Health
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100">
            99.9%
          </div>
          <span className="text-[11px] text-emerald-400 font-medium block pt-1">
            All services operational
          </span>
        </Card>

      </div>

      {/* Incident Table Card (Section 13 Requirement) */}
      <Card variant="glass" className="p-6 space-y-5">
        
        {/* Table Filters & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reference ID, category, officer..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span>Severity:</span>
            </div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="text-xs p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Under Review">Under Review</option>
              <option value="Escalated">Escalated</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Incidents Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase">
              <tr>
                <th className="p-3.5">ID</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Severity</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Assigned Officer</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No incidents match your filter query.
                  </td>
                </tr>
              ) : (
                filteredIncidents.map(inc => (
                  <tr 
                    key={inc.id}
                    onClick={() => setSelectedIncident(inc)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors group"
                  >
                    <td className="p-3.5 font-mono font-bold text-cyan-400 group-hover:underline">
                      {inc.id}
                    </td>
                    <td className="p-3.5 font-medium text-slate-100">
                      {inc.category}
                    </td>
                    <td className="p-3.5">
                      <Badge 
                        variant={inc.severity === 'Critical' ? 'red' : (inc.severity === 'High' ? 'yellow' : (inc.severity === 'Medium' ? 'cyan' : 'green'))}
                        size="sm"
                      >
                        {inc.severity}
                      </Badge>
                    </td>
                    <td className="p-3.5 font-mono text-slate-400">
                      {inc.date}
                    </td>
                    <td className="p-3.5">
                      <Badge 
                        variant={inc.status === 'Resolved' ? 'green' : (inc.status === 'Escalated' ? 'red' : 'yellow')}
                        size="sm"
                      >
                        {inc.status}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-slate-300">
                      {inc.assignedOfficer}
                    </td>
                    <td className="p-3.5 text-right">
                      <span className="text-cyan-400 font-semibold group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
                        <span>Inspect</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </Card>

    </div>
  );
};
