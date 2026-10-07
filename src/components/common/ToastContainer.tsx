import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-cyan-400" />,
  };

  const borderMap = {
    success: 'border-emerald-500/40 bg-[#0E1E28]/95 shadow-glow-green',
    warning: 'border-amber-500/40 bg-[#1E1A14]/95 shadow-glow-yellow',
    error: 'border-red-500/40 bg-[#251217]/95 shadow-red-950/40',
    info: 'border-cyan-500/40 bg-[#0D182E]/95 shadow-glow-cyan',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none p-2 sm:p-0">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-xl text-slate-100 transition-all transform animate-in slide-in-from-bottom-5 duration-300 ${borderMap[toast.type]}`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {iconMap[toast.type]}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-slate-100 leading-snug">{toast.title}</h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
