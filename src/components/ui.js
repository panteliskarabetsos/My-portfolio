import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function Page({ children, className = '' }) {
  return <main className={`mx-auto max-w-page px-5 sm:px-6 ${className}`}>{children}</main>;
}

export function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="pb-14 pt-14 sm:pt-24">
      {eyebrow && (
        <p className="eyebrow reveal" style={{ '--d': '0ms' }}>
          {eyebrow}
        </p>
      )}
      <h1
        className="reveal mt-3 text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"
        style={{ '--d': '60ms' }}
      >
        {title}
      </h1>
      {children && (
        <div className="reveal mt-4 max-w-prose text-pretty text-muted" style={{ '--d': '120ms' }}>
          {children}
        </div>
      )}
    </header>
  );
}

/** Section label like "01 · Research": the number is set in the accent colour. */
function Label({ children }) {
  const m = typeof children === 'string' && children.match(/^(\d+) · (.+)$/);
  return (
    <p className="eyebrow flex items-center gap-2">
      {m ? (
        <>
          <span className="text-accent">{m[1]}</span>
          <span className="h-px w-4 bg-line" aria-hidden />
          {m[2]}
        </>
      ) : (
        children
      )}
    </p>
  );
}

export function Section({ label, title, action, children, className = '', delay }) {
  const animated = delay !== undefined;
  return (
    <section
      className={`border-t border-line py-14 ${animated ? 'reveal' : 'reveal-scroll'} ${className}`}
      style={animated ? { '--d': `${delay}ms` } : undefined}
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          {label && <Label>{label}</Label>}
          {title && <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">{title}</h2>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

/** Internal or external text link with a small arrow. */
export function ArrowLink({ href, children, className = '' }) {
  const external = href.startsWith('http') || href.endsWith('.pdf');
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const Comp = external ? 'a' : Link;
  return (
    <Comp
      href={href}
      {...props}
      className={`group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground ${className}`}
    >
      <span className="link">{children}</span>
      <ArrowUpRight
        size={14}
        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden
      />
    </Comp>
  );
}

export function Chips({ items, className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Two-column row used for timelines: period on the left, content on the right. */
export function Row({ meta, title, org, children }) {
  return (
    <li className="grid gap-1 py-4 sm:grid-cols-[9rem,1fr] sm:gap-6">
      <p className="font-mono text-xs leading-6 text-muted">{meta}</p>
      <div>
        <p className="font-medium">
          {title}
          {org && <span className="text-muted"> · {org}</span>}
        </p>
        {children && <div className="mt-1 text-sm text-muted">{children}</div>}
      </div>
    </li>
  );
}
