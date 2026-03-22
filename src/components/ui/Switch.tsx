interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Switch = ({ checked, onChange, label, disabled = false }: SwitchProps) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {label && <span className="text-sm font-medium text-zinc-300">{label}</span>}
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <div 
          className={`
            w-10 h-5 rounded-full transition-all duration-200 border
            ${checked ? 'bg-primary-500 border-primary-600' : 'bg-zinc-800 border-zinc-700'}
          `}
        />
        <div 
          className={`
            absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-all duration-200 shadow-sm
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </div>
    </label>
  );
};
