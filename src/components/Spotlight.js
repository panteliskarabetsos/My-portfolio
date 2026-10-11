'use client';

import { useEffect } from 'react';

/**
 * One document-level listener that feeds cursor coordinates to whichever
 * `.spotlight` (or `[data-glow]`) element is under the pointer, and tilts
 * `.tilt` elements slightly towards the cursor.
 */
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let last;
    let tilted = null;
    const reset = (el) => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    const onMove = (e) => {
      last = e;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = last.target instanceof Element && last.target.closest('.spotlight');
        if (el) {
          const r = el.getBoundingClientRect();
          el.style.setProperty('--mx', `${last.clientX - r.left}px`);
          el.style.setProperty('--my', `${last.clientY - r.top}px`);
        }
        const t = last.target instanceof Element && last.target.closest('.tilt');
        if (tilted && tilted !== t) reset(tilted);
        tilted = t || null;
        if (t) {
          const r = t.getBoundingClientRect();
          const nx = (last.clientX - r.left) / r.width - 0.5;
          const ny = (last.clientY - r.top) / r.height - 0.5;
          t.style.setProperty('--rx', `${(-ny * 3).toFixed(2)}deg`);
          t.style.setProperty('--ry', `${(nx * 3).toFixed(2)}deg`);
        }
        document.querySelectorAll('[data-glow]').forEach((g) => {
          const r = g.getBoundingClientRect();
          g.style.setProperty('--gx', `${last.clientX - r.left}px`);
          g.style.setProperty('--gy', `${last.clientY - r.top}px`);
        });
      });
    };

    const onLeave = () => tilted && reset(tilted);
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
