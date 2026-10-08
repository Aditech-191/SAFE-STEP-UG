import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart3, 
  BookOpen, 
  TrendingUp, 
  Lock,
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const SchoolDashboard: React.FC = () => {
  const { school, incidents, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'anonymized-incidents' | 'curriculum'>('overview');

  const categoryBreakdown = [
    { name: 'Cyberbullying', count: 4, percentage: 50, color: 'bg-cyan-400' },
    { name: 'Threats & Coercion', count: 2, percentage: 25, color: 'bg-red-400' },
    { name: 'Inappropriate Content', count: 1, percentage: 12.5, color: 'bg-amber-400' },
    { name: 'Suspicious Contacts', count: 1, percentage: 12.5, color: 'bg-purple-400' },
    { name: 'Grooming Concerns', count: 0, percentage: 0, color: 'bg-rose-400' },
    { name: 'Other', count: 0, percentage: 0, color: 'bg-slate-400' }
  ];

  const monthlyTrends = [
    { month: 'May', reports: 12, resolved: 11 },
    { month: 'Jun', reports: 14, resolved: 14 },
    { month: 'Jul', reports: 9, resolved: 8 },
    { month: 'Aug', reports: 11, resolved: 10 },
    { month: 'Sep', reports: 15, resolved: 13 },
    { month: 'Oct (Current)', reports: 8, resolved: 6 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="green" size="md">School Safeguarding Officer Desk</Badge>
            <span className="text-xs text-slate-400 font-mono">Kampala Primary School</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 mt-1">
            Student Online Safety &amp; Wellbeing
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Aggregated, anonymized safeguarding analytics protecting student identity.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigateTo('/report')}
        >
          File Institutional Report
        </Button>
      </div>

      {/* 5 Core Metrics (Section 12 Requirements) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <Card variant="default" className="p-4 space-y-1">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
            Active Students
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">
            {school.studentCount}
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            Enrolled in safety labs
          </span>
        </Card>

        <Card variant="warning" className="p-4 space-y-1">
          <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
            Reports This Month
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
            {school.reportsThisMonth}
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            Peer group concerns
          </span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            Resolved Cases
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
            {school.resolvedCases}
          </div>
          <span className="text-[11px] text-emerald-400 block pt-1">
            75% resolution rate
          </span>
        </Card>

        <Card variant="default" className="p-4 space-y-1">
          <span className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider">
            Pending Cases
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400">
            {school.pendingCases}
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            Under active review
          </span>
        </Card>

        <Card variant="default" className="p-4 space-y-1 col-span-2 lg:col-span-1">
          <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
            Training Done
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">
            {school.trainingCompletionRate}%
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            352 students certified
          </span>
        </Card>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6 text-sm">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'overview' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Safeguarding Overview
        </button>
        <button
          onClick={() => setActiveTab('anonymized-incidents')}
          className={`pb-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'anonymized-incidents' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Anonymized Incident Queue ({incidents.length})
        </button>
      </div>

      {activeTab === 'overview' ? (
        /* Analytics Charts Grid (Section 12 Requirements) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Chart 1: Incidents by Category */}
          <div className="lg:col-span-6 space-y-4">
            <Card variant="glass" className="p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-slate-100">Incidents by Category</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">October 2026</span>
              </div>

              <div className="space-y-3">
                {categoryBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-200">{item.name}</span>
                      <span className="font-mono text-slate-400">{item.count} cases ({item.percentage}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${Math.max(item.percentage, 2)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Aggregated data. Individual student names are strictly redacted.</span>
              </div>
            </Card>
          </div>

          {/* Chart 2: Monthly Safety Trends */}
          <div className="lg:col-span-6 space-y-4">
            <Card variant="glass" className="p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-slate-100">Monthly Safety Trends</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">6 Months</span>
              </div>

              {/* Bar visualization of monthly trends */}
              <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
                {monthlyTrends.map((t, idx) => {
                  const maxVal = 16;
                  const repHeight = (t.reports / maxVal) * 100;
                  const resHeight = (t.resolved / maxVal) * 100;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="w-full flex items-end justify-center gap-1 h-32">
                        {/* Reports bar */}
                        <div 
                          className="w-1/2 bg-amber-400/80 rounded-t-md hover:bg-amber-400 transition-all"
                          style={{ height: `${repHeight}%` }}
                          title={`${t.reports} Reports`}
                        />
                        {/* Resolved bar */}
                        <div 
                          className="w-1/2 bg-emerald-400/80 rounded-t-md hover:bg-emerald-400 transition-all"
                          style={{ height: `${resHeight}%` }}
                          title={`${t.resolved} Resolved`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 truncate w-full text-center">
                        {t.month}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-6 pt-2 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-400"></span>
                  <span>Reports Ingested</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-400"></span>
                  <span>Resolved with Guardian</span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      ) : (
        /* Anonymized Incident Queue Table */
        <Card variant="default" className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-slate-100">
              Anonymized Incident Queue (School Level)
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Privacy Filter Active: Student PII Hidden
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase">
                <tr>
                  <th className="p-3">Reference ID</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Severity</th>
                  <th className="p-3">Platform</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {incidents.map(inc => (
                  <tr key={inc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-cyan-400">{inc.id}</td>
                    <td className="p-3 font-medium text-slate-200">{inc.category}</td>
                    <td className="p-3">
                      <Badge variant={inc.severity === 'Critical' ? 'red' : (inc.severity === 'High' ? 'yellow' : 'cyan')} size="sm">
                        {inc.severity}
                      </Badge>
                    </td>
                    <td className="p-3">{inc.platform}</td>
                    <td className="p-3 font-mono text-slate-400">{inc.date}</td>
                    <td className="p-3">
                      <Badge variant={inc.status === 'Resolved' ? 'green' : 'slate'} size="sm">
                        {inc.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

    </div>
  );
};
