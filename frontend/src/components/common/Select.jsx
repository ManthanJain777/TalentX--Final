import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({
  label,
  id,
  value,
  onChange,
  options = [],
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  placeholder = 'Select an option...',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-bold text-cover mb-1.5 font-sans"
        >
          {label} {required && <span className="text-risk">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full appearance-none bg-white/90 hover:bg-white focus:bg-white text-ink border rounded-xl text-sm font-sans px-4 py-2.5 pr-10 transition-all duration-200 shadow-xs focus-visible:outline-none focus:ring-2 disabled:opacity-50 ${
            error
              ? 'border-risk focus:border-risk focus:ring-risk/20'
              : 'border-cover/15 hover:border-cover/30 focus:border-gold focus:ring-gold/20'
          }`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3.5 text-ink-soft/70 pointer-events-none">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error && (
        <p className="mt-1 text-xs text-risk font-mono font-medium">{error}</p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-xs text-ink-soft font-sans">{helperText}</p>
      )}
    </div>
  );
};

export default Select;
export { Select };
