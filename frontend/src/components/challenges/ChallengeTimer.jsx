import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const ChallengeTimer = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [status, setStatus] = useState('green'); // green, amber, red

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(deadline) - new Date();
      
      if (difference <= 0) {
        setTimeLeft('00:00:00:00');
        setStatus('red');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      // Pad with zeros
      const d = String(days).padStart(2, '0');
      const h = String(hours).padStart(2, '0');
      const m = String(minutes).padStart(2, '0');
      const s = String(seconds).padStart(2, '0');

      setTimeLeft(`${d}:${h}:${m}:${s}`);

      if (days === 0 && hours < 6) {
        setStatus('red');
      } else if (days === 0) {
        setStatus('amber');
      } else {
        setStatus('green');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  const getColorClass = () => {
    switch (status) {
      case 'red': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'amber': return 'text-pending bg-pending/10 border-pending/20';
      default: return 'text-verified bg-verified/10 border-verified/20';
    }
  };

  return (
    <motion.div 
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getColorClass()}`}
      animate={status === 'red' ? { scale: [1, 1.02, 1] } : {}}
      transition={status === 'red' ? { repeat: Infinity, duration: 2 } : {}}
    >
      <Clock className="w-4 h-4" />
      <span className="font-mono text-sm font-semibold tracking-wider">{timeLeft}</span>
    </motion.div>
  );
};

export default ChallengeTimer;
