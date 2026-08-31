import React, { useState, useEffect, useRef } from "react";

/**
 * AnimatedNumber — Smooth ease-out count-up animation triggered once on scroll into view.
 * Handles numeric values, prefixes, suffixes, and respects prefers-reduced-motion.
 */
export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
  formatCommas = false,
  className = "",
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  const targetNum = parseInt(value, 10);
  const isNumeric = !isNaN(targetNum);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || !isNumeric || hasAnimated) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayValue(targetNum);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.unobserve(el);

          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Ease-out cubic curve for snappy and natural deceleration
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOutProgress * targetNum);

            setDisplayValue(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(targetNum);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetNum, isNumeric, duration, hasAnimated]);

  const formattedNumber = isNumeric
    ? formatCommas
      ? displayValue.toLocaleString()
      : displayValue
    : value;

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}

