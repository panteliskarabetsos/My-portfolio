'use client';

import { useEffect, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&*+=<>/';

/** Text that "decrypts" from random glyphs into its final value on mount. */
export default function Scramble({ text, duration = 1100, delay = 250, className = '' }) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf;
    let start;
    const tick = (now) => {
      start ??= now;
      const t = Math.max(0, now - start - delay) / duration;
      // Each character locks in at a staggered point in time, left to right
      const next = [...text]
        .map((ch, i) => {
          if (ch === ' ' || /[·,&()]/.test(ch)) return ch;
          return t >= (i / text.length) * 0.8 + 0.2 ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        })
        .join('');
      setOut(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration, delay]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
