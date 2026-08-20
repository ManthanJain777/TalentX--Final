import { useState, useEffect, useRef } from 'react';

/**
 * requestAnimationFrame-based smooth counter hook
 * @param {number} target - The number to count up to
 * @param {number} duration - Animation duration in ms (default 1800ms)
 * @param {boolean} shouldStart - When true, triggers the counter once
 * @returns {number} current counter value
 */
export function useCounter(target, duration = 1800, shouldStart = false) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease out cubic: 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * target);
      setCount(currentVal);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = window.requestAnimationFrame(step);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [target, duration, shouldStart]);

  return count;
}
