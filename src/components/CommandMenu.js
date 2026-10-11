'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  ArrowRight,
  Contrast,
  Copy,
  FileText,
  FlaskConical,
  FolderGit2,
  Github,
  Home,
  Linkedin,
  Mail,
  Search,
  User,
} from 'lucide-react';
import { site } from '@/data/site';

export const OPEN_EVENT = 'command-menu:open';

/** Global ⌘K / Ctrl+K palette for navigation and quick actions. */
export default function CommandMenu() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const returnFocus = useRef(null);

  const commands = useMemo(
    () => [
      { group: 'Pages', label: 'Home', icon: Home, run: () => router.push('/') },
      { group: 'Pages', label: 'Research', hint: 'Thesis', icon: FlaskConical, run: () => router.push('/research') },
      { group: 'Pages', label: 'Projects', icon: FolderGit2, run: () => router.push('/projects') },
      { group: 'Pages', label: 'About', icon: User, run: () => router.push('/about') },
      { group: 'Pages', label: 'Contact', icon: Mail, run: () => router.push('/contact') },
      {
        group: 'Actions',
        label: 'Copy email address',
        hint: site.email,
        icon: Copy,
        keep: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            setToast('Email copied');
          } catch {
            setToast('Copy failed');
          }
        },
      },
      { group: 'Actions', label: 'Download résumé', hint: 'PDF', icon: FileText, run: () => window.open(site.resume, '_blank', 'noopener') },
      {
        group: 'Actions',
        label: `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`,
        icon: Contrast,
        run: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
      },
      { group: 'Links', label: 'GitHub', hint: 'panteliskarabetsos', icon: Github, run: () => window.open(site.github, '_blank', 'noopener') },
      { group: 'Links', label: 'LinkedIn', icon: Linkedin, run: () => window.open(site.linkedin, '_blank', 'noopener') },
      { group: 'Links', label: 'Send an email', icon: Mail, run: () => (window.location.href = `mailto:${site.email}`) },
    ],
    [router, resolvedTheme, setTheme]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint ?? ''} ${c.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement;
    setQuery('');
    setActive(0);
    setToast('');
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  // Global shortcut + custom open event from the header button
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open ? hide() : show();
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
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const execute = async (cmd) => {
    if (!cmd) return;
    await cmd.run();
    if (!cmd.keep) hide();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      execute(results[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      hide();
    } else if (e.key === 'Tab') {
      // Keep focus inside the dialog
      e.preventDefault();
    }
  };

  let lastGroup = null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center px-4 pt-[12vh]" onKeyDown={onKeyDown}>
      <div className="reveal absolute inset-0 bg-background/60 backdrop-blur-xs" style={{ '--d': '0ms' }} onClick={hide} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="reveal relative w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
        style={{ '--d': '0ms' }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={16} className="shrink-0 text-muted" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
            className="h-12 w-full bg-transparent text-[15px] outline-hidden placeholder:text-muted"
          />
          <kbd className="kbd">esc</kbd>
        </div>

        <ul ref={listRef} id="command-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No results.</li>}
          {results.map((cmd, i) => {
            const header = cmd.group !== lastGroup ? cmd.group : null;
            lastGroup = cmd.group;
            const Icon = cmd.icon;
            const isActive = i === active;
            return (
              <li key={cmd.label} role="presentation">
                {header && <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted first:pt-1">{header}</p>}
                <div
                  id={`cmd-${i}`}
                  role="option"
                  aria-selected={isActive}
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => execute(cmd)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive ? 'bg-foreground/6 text-foreground' : 'text-muted'
                  }`}
                >
                  <Icon size={16} aria-hidden className={isActive ? 'text-accent' : ''} />
                  <span className="flex-1">{cmd.label}</span>
                  {cmd.hint && <span className="truncate font-mono text-[11px] text-muted">{cmd.hint}</span>}
                  {isActive && <ArrowRight size={14} aria-hidden className="text-muted" />}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] text-muted">
          <span aria-live="polite" className="text-accent">
            {toast}
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="kbd">↑</kbd>
              <kbd className="kbd">↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="kbd">↵</kbd> select
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
