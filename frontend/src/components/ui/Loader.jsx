import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ size = 24, className = '' }) => {
  return (
    <div className={`flex justify-center items-center p-8 w-full ${className}`}>
      <Loader2 size={size} className="animate-spin text-gold" />
    </div>
  );
};

export default Loader;
