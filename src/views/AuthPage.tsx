import React, { useState } from 'react';
import { Shield, Lock, Mail, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { UserRole } from '../types';

export const AuthPage: React.FC<{ isRegister?: boolean }> = ({ isRegister = false }) => {
  const { setRole, navigateTo, addToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('child');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    addToast('success', 'Logged in Successfully', `Welcome to the ${selectedRole.toUpperCase()} safety workspace.`);
    navigateTo(`/dashboard/${selectedRole}`);
  };

  const quickDemoAccounts: { role: UserRole; name: string; email: string; label: string }[] = [
    { role: 'child', name: 'Alex Mukasa', email: 'alex@kampalaprimary.ac.ug', label: 'Child (13 yo)' },
    { role: 'parent', name: 'Sarah Mukasa', email: 'sarah.mukasa@example.ug', label: 'Parent / Guardian' },
    { role: 'school', name: 'David Okello', email: 'okello.d@kampalaprimary.ac.ug', label: 'School Counsellor' },
    { role: 'admin', name: 'Joyce Nabakooza', email: 'joyce.n@safeguarding.ug', label: 'Safeguarding Officer' },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-amber-500 p-0.5 mx-auto flex items-center justify-center">
          <div className="w-full h-full bg-[#0A1224] rounded-[14px] flex items-center justify-center">
            <Shield className="w-6 h-6 text-amber-400" />
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-100">
          {isRegister ? 'Create SafeUganda Account' : 'Welcome Back'}
        </h1>
        <p className="text-xs text-slate-400">
          Role-protected access to your safeguarding portal
        </p>
      </div>

      <Card variant="glass" className="p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Role Selector Tabs */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 font-mono uppercase tracking-wider">
            Select Your Role:
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {(['child', 'parent', 'school', 'admin'] as UserRole[]).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRole(r)}
                className={`py-2 px-3 rounded-xl border text-center font-semibold capitalize transition-all ${
                  selectedRole === r
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email or Student ID</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.ug"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Passcode / Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                required
              />
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full justify-center"
            size="md"
            type="submit"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {isRegister ? 'Register Account' : 'Sign In Safely'}
          </Button>
        </form>

        {/* 1-Click Demo Profiles */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider text-center">
            Or Click a Demo Persona:
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {quickDemoAccounts.map(demo => (
              <button
                key={demo.role}
                type="button"
                onClick={() => {
                  setSelectedRole(demo.role);
                  setEmail(demo.email);
                  setPassword('demo-safe-pass');
                  setRole(demo.role);
                  navigateTo(`/dashboard/${demo.role}`);
                }}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left hover:bg-slate-800/80 transition-colors"
              >
                <div className="font-bold text-slate-200 truncate">{demo.label}</div>
                <div className="text-[10px] text-cyan-400 truncate">{demo.name}</div>
              </button>
            ))}
          </div>
        </div>

      </Card>

    </div>
  );
};
