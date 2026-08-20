import React from 'react';

const LoadingSpinner = ({ size = 'md', text = '', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2.5',
    lg: 'w-12 h-12 border-3',
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} border-cover/20 border-t-gold rounded-full animate-spin`}
      />
      {text && (
        <span className="font-mono text-xs text-ink-soft font-semibold tracking-wider uppercase">
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-page/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
export { LoadingSpinner };
