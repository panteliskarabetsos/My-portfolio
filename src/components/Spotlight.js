'use client';

import { useEffect } from 'react';

/**
 * One document-level listener that feeds cursor coordinates to whichever
 * `.spotlight` (or `[data-glow]`) element is under the pointer.
 */
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let last;
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
        document.querySelectorAll('[data-glow]').forEach((g) => {
          const r = g.getBoundingClientRect();
          g.style.setProperty('--gx', `${last.clientX - r.left}px`);
          g.style.setProperty('--gy', `${last.clientY - r.top}px`);
        });
      });
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
