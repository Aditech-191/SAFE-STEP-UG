import React from 'react';
import { BookOpen, Download, Shield, Users, HeartHandshake, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const ResourcesPage: React.FC = () => {
  const { addToast } = useApp();

  const handleDownload = (docName: string) => {
    addToast('success', 'Safety Toolkit Downloaded', `Generated printable PDF packet for "${docName}".`);
  };

  const toolkits = [
    {
      title: "Child's Pocket Guide to Cyberbullying",
      audience: "Children & Teens (Ages 10-17)",
      description: "Simple, visual flowchart explaining how to mute bullies, take screenshot evidence, and report without panic.",
      pages: "4 Pages • English & Luganda"
    },
    {
      title: "Parent's Trust-Based Digital Handbook",
      audience: "Parents & Guardians",
      description: "How to talk with your children about social media, screen limits, and sextortion risks without using invasive spyware.",
      pages: "12 Pages • English"
    },
    {
      title: "School Safeguarding Protocol Template",
      audience: "Headteachers & Safeguarding Leads",
      description: "Standard operating procedures for managing peer WhatsApp bullying, student distress, and coordination with Sauti 116.",
      pages: "16 Pages • Official Template"
    },
    {
      title: "Sextortion & Coercion Emergency Guide",
      audience: "Counsellors & Child Stakeholders",
      description: "Immediate trauma-informed response checklist for financial blackmail and non-consensual image demands.",
      pages: "8 Pages • Professional Guide"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="yellow" size="md">Educational Toolkits</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          Safety Resources &amp; Guides
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Free, downloadable toolkits tailored for Ugandan children, families, educators, and community child-protection committees.
        </p>
      </div>

      {/* Toolkits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {toolkits.map((kit, idx) => (
          <Card key={idx} variant="default" className="p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {kit.audience}
                </span>
                <span className="text-xs text-slate-400">{kit.pages}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100">{kit.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{kit.description}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              onClick={() => handleDownload(kit.title)}
              className="w-full justify-center"
            >
              Download Printable Toolkit (PDF)
            </Button>
          </Card>
        ))}
      </div>

    </div>
  );
};
