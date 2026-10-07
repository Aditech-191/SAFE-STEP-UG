import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'interactive' | 'shield' | 'warning' | 'subtle';
  className?: string;
  glow?: 'cyan' | 'yellow' | 'green' | 'none';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  glow = 'none',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-200 border';

  const variantStyles = {
    default: 'bg-[#121B33] dark:bg-[#121B33] border-slate-800/80 shadow-card-soft text-slate-100',
    glass: 'glass-panel shadow-xl text-slate-100',
    interactive: 'bg-[#121B33] hover:bg-[#182442] border-slate-700/60 hover:border-cyan-500/40 cursor-pointer shadow-card-soft text-slate-100 active:scale-[0.99]',
    shield: 'bg-gradient-to-br from-[#121B33] to-[#0A1224] border-cyan-500/30 shadow-glow-cyan text-slate-100',
    warning: 'bg-gradient-to-br from-amber-950/20 to-[#121B33] border-amber-500/30 shadow-glow-yellow text-slate-100',
    subtle: 'bg-slate-900/40 border-slate-800/60 text-slate-200',
  };

  const glowStyles = {
    none: '',
    cyan: 'shadow-glow-cyan border-cyan-500/40',
    yellow: 'shadow-glow-yellow border-amber-500/40',
    green: 'shadow-glow-green border-emerald-500/40',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${glowStyles[glow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
