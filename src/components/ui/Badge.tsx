import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

export const Badge = ({ className = '', variant = 'neutral', children, ...props }: BadgeProps) => {
  const variants = {
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    info: 'bg-info/10 text-info border-info/20',
    neutral: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
