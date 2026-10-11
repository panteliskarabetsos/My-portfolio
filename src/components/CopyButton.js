'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Icon button that copies `value` to the clipboard; pass `text` to show a visible label. */
export default function CopyButton({ value, label = 'Copy', text, className = '' }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : label}
      className={`inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-md px-2 text-xs text-muted transition-colors hover:bg-foreground/[0.05] hover:text-foreground ${className}`}
    >
      {copied ? <Check size={14} className="text-accent" aria-hidden /> : <Copy size={14} aria-hidden />}
      {text && <span>{copied ? 'Copied' : text}</span>}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}
