'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { OPEN_EVENT } from './CommandMenu';
import { nav } from '@/data/site';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mod, setMod] = useState('⌘');

  useEffect(() => {
    if (!/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) setMod('Ctrl');
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-line bg-background/80 backdrop-blur-md'
          : 'border-transparent bg-background/0'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-6">
        <Link href="/" className="group flex items-center gap-2 font-mono text-sm tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md border border-line text-[11px] font-semibold transition-colors group-hover:border-accent group-hover:text-accent">
            PK
          </span>
          <span className="hidden text-muted transition-colors group-hover:text-foreground sm:inline">
            karabetsos
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                isActive(item.href)
                  ? 'bg-foreground/6 text-foreground'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <span className="mx-1 h-4 w-px bg-line" aria-hidden />
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
            aria-label="Open command menu"
            className="group flex h-9 items-center gap-1.5 rounded-md px-2 text-muted transition-colors hover:text-foreground"
          >
            <Search size={15} aria-hidden />
            <kbd className="kbd transition-colors group-hover:text-foreground">
              {mod === '⌘' ? '⌘K' : 'Ctrl K'}
            </kbd>
          </button>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 sm:hidden">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
            aria-label="Open command menu"
            className="grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:text-foreground"
          >
            <Search size={16} aria-hidden />
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:text-foreground"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <span aria-hidden className="scroll-progress" />

      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="absolute inset-x-0 top-full border-b border-line bg-background px-5 pb-5 pt-2 shadow-lg sm:hidden">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              style={{ '--d': `${i * 40}ms` }}
              className={`reveal flex items-center justify-between border-b border-line py-3 text-base ${
                isActive(item.href) ? 'text-foreground' : 'text-muted'
              }`}
            >
              {item.name}
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
