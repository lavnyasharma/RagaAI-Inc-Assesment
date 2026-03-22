import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="text-xs font-medium text-zinc-400 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary-500 transition-colors">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full h-10 bg-zinc-900 border border-zinc-800 rounded-lg px-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors focus:outline-none focus:border-primary-500
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${error ? 'border-danger' : ''}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary-500 transition-colors">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-[10px] text-danger ml-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
