import React, { useEffect, useRef } from 'react';

const FloatingParticles = ({ count = 15, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const size = 20 + Math.random() * 80;
      const duration = 15 + Math.random() * 20;
      const delay = Math.random() * 10;
      el.className = 'particle-dot';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.top = Math.random() * 100 + '%';
      el.style.left = Math.random() * 100 + '%';
      el.style.animationDuration = duration + 's';
      el.style.animationDelay = delay + 's';
      container.appendChild(el);
      particles.push(el);
    }

    return () => {
      particles.forEach(el => el.remove());
    };
  }, [count]);

  return <div ref={containerRef} className={`particles-bg ${className}`} />;
};

export default FloatingParticles;
