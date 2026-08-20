import React from 'react';

const ShinyText = ({
  text,
  disabled = false,
  speed = 3,
  className = '',
  color = '#1C1F26',
  shineColor = '#C7A868',
}) => {
  return (
    <span
      className={`inline-block relative overflow-hidden font-bold ${className}`}
      style={{
        color: color,
        backgroundImage: `linear-gradient(120deg, ${color} 0%, ${color} 40%, ${shineColor} 50%, ${color} 60%, ${color} 100%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: disabled ? 'none' : `shinyTextSweep ${speed}s infinite linear`,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
export { ShinyText };
