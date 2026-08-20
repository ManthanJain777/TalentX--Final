import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  helperText,
  className = '',
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-white/70 tracking-wide flex items-center justify-between">
          <span>
            {label} {required && <span className="text-purple-400">*</span>}
          </span>
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-white/40 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40
            backdrop-blur-md transition-all duration-200
            focus:outline-none focus:border-purple-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-purple-500/20
            disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error ? (
        <span className="text-xs text-rose-400 mt-0.5">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-white/40 mt-0.5">{helperText}</span>
      ) : null}
    </div>
  );
};

export const Select = ({
  label,
  value,
  onChange,
  options = [],
  error,
  helperText,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-white/70 tracking-wide flex items-center justify-between">
          <span>
            {label} {required && <span className="text-purple-400">*</span>}
          </span>
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`
          w-full bg-[#1A1A2E] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white
          backdrop-blur-md transition-all duration-200
          focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
          ${error ? 'border-rose-500' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#111118] text-white py-1">
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <span className="text-xs text-rose-400 mt-0.5">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-white/40 mt-0.5">{helperText}</span>
      ) : null}
    </div>
  );
};

export const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  helperText,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-white/70 tracking-wide flex items-center justify-between">
          <span>
            {label} {required && <span className="text-purple-400">*</span>}
          </span>
        </label>
      )}
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40
          backdrop-blur-md transition-all duration-200 resize-y
          focus:outline-none focus:border-purple-500 focus:bg-white/[0.08] focus:ring-2 focus:ring-purple-500/20
          ${error ? 'border-rose-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error ? (
        <span className="text-xs text-rose-400 mt-0.5">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-white/40 mt-0.5">{helperText}</span>
      ) : null}
    </div>
  );
};

export default Input;
export { Input };
