import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search by skill, role, keyword or ID...',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-xs pl-8',
    md: 'py-2.5 px-4 text-sm pl-10',
    lg: 'py-3.5 px-5 text-base pl-12',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-2.5',
    md: 'w-4 h-4 left-3.5',
    lg: 'w-5 h-5 left-4',
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search
        className={`absolute text-ink-soft/70 pointer-events-none ${iconSizes[size] || iconSizes.md}`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white/80 hover:bg-white focus:bg-white text-ink placeholder:text-ink-soft/60 border border-cover/15 hover:border-cover/30 focus:border-gold rounded-xl transition-all duration-200 shadow-xs focus-visible:outline-none focus:ring-2 focus:ring-gold/20 font-sans ${
          sizeClasses[size] || sizeClasses.md
        }`}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 p-1 text-ink-soft hover:text-ink transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
export { SearchBar };
