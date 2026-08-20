import React from 'react';

const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error,
  helperText,
  icon: Icon,
  required = false,
  disabled = false,
  className = '',
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
        {Icon && (
          <div className="absolute left-3.5 text-ink-soft/70 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full bg-white/90 hover:bg-white focus:bg-white text-ink placeholder:text-ink-soft/60 border rounded-xl text-sm font-sans transition-all duration-200 shadow-xs focus-visible:outline-none focus:ring-2 disabled:opacity-50 disabled:bg-cover/5 ${
            Icon ? 'pl-10 pr-4 py-2.5' : 'px-4 py-2.5'
          } ${
            error
              ? 'border-risk focus:border-risk focus:ring-risk/20'
              : 'border-cover/15 hover:border-cover/30 focus:border-gold focus:ring-gold/20'
          }`}
          {...props}
        />
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

export default Input;
export { Input };
