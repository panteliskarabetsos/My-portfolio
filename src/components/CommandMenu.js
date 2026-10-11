'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Shell from './Shell';

export const OPEN_EVENT = 'command-menu:open';

/** Global terminal overlay, opened from the header button or ⌘K / Ctrl+K. */
export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const returnFocus = useRef(null);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement;
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open ? hide() : show();
      } else if (e.key === 'Escape' && open) {
        hide();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [open, show, hide]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center px-4 pt-[10vh]">
      <div className="reveal absolute inset-0 bg-background/60 backdrop-blur-xs" style={{ '--d': '0ms' }} onClick={hide} aria-hidden />
      <div role="dialog" aria-modal="true" aria-label="Terminal" className="reveal relative w-full max-w-2xl" style={{ '--d': '0ms' }}>
        <Shell variant="modal" onExit={hide} />
      </div>
    </div>
  );
}
