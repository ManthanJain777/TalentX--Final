import React from 'react';

const MorphingShapes = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      <div className="morph-shape morph-shape-1" />
      <div className="morph-shape morph-shape-2" />
      <div className="morph-shape morph-shape-3" />
    </div>
  );
};

export default MorphingShapes;
