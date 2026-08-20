import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';

export default function DecryptedText({
  text = '',
  speed = 40,
  maxIterations = 10,
  sequential = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%@$!',
  className = '',
  encryptedClassName = 'text-gold font-mono',
  animateOn = 'hover',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const intervalRef = useRef(null);

  const availableChars = useMemo(() => characters.split(''), [characters]);

  const shuffleText = useCallback(
    (originalText, currentRevealed) => {
      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');
    },
    [availableChars]
  );

  const triggerAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    let iteration = 0;
    const revealed = new Set();
    const length = text.length;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (sequential) {
        if (revealed.size < length) {
          revealed.add(revealed.size);
          setRevealedIndices(new Set(revealed));
          setDisplayText(shuffleText(text, revealed));
        } else {
          clearInterval(intervalRef.current);
          setIsAnimating(false);
          setDisplayText(text);
        }
      } else {
        iteration++;
        if (iteration < maxIterations) {
          setDisplayText(shuffleText(text, revealed));
        } else {
          clearInterval(intervalRef.current);
          setIsAnimating(false);
          setDisplayText(text);
        }
      }
    }, speed);
  }, [isAnimating, sequential, text, maxIterations, speed, shuffleText]);

  useEffect(() => {
    if (animateOn === 'mount') {
      triggerAnimation();
    }
    return () => clearInterval(intervalRef.current);
  }, [animateOn, triggerAnimation]);

  return (
    <span
      onMouseEnter={animateOn === 'hover' ? triggerAnimation : undefined}
      className={`inline-block cursor-default select-none ${className}`}
      {...props}
    >
      {displayText.split('').map((char, index) => {
        const isRevealed = revealedIndices.has(index) || !isAnimating;
        return (
          <span
            key={index}
            className={isRevealed ? '' : encryptedClassName}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

export { DecryptedText };
