import { useState, useEffect } from 'react';

/**
 * Hook to track and smooth page scroll progress from 0 to 1
 * Uses requestAnimationFrame with lerp smoothing (0.12 factor)
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [smoothedProgress, setSmoothedProgress] = useState(0);

  useEffect(() => {
    let rawProgress = 0;
    let currentSmoothed = 0;
    let animationFrameId = null;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateRawProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const calculated = totalScrollable > 0 ? Math.min(Math.max(scrollY / totalScrollable, 0), 1) : 0;
      rawProgress = calculated;
      setProgress(calculated);
    };

    const loop = () => {
      if (prefersReducedMotion) {
        currentSmoothed = rawProgress;
      } else {
        currentSmoothed += (rawProgress - currentSmoothed) * 0.12;
      }
      setSmoothedProgress(currentSmoothed);
      animationFrameId = requestAnimationFrame(loop);
    };

    updateRawProgress();
    window.addEventListener('scroll', updateRawProgress, { passive: true });
    window.addEventListener('resize', updateRawProgress, { passive: true });
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', updateRawProgress);
      window.removeEventListener('resize', updateRawProgress);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return { progress, smoothedProgress };
}
