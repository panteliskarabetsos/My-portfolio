import Link from 'next/link';
import LocalTime from './LocalTime';
import { nav, site } from '@/data/site';

const elsewhere = [
  { name: 'GitHub', href: site.github },
  { name: 'LinkedIn', href: site.linkedin },
  { name: 'Email', href: `mailto:${site.email}` },
  { name: 'Résumé', href: site.resume },
];

const ext = (href) => (href.startsWith('http') || href.endsWith('.pdf') ? { target: '_blank', rel: 'noopener noreferrer' } : {});

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-page gap-10 px-5 py-12 sm:grid-cols-[1fr,auto,auto] sm:gap-16 sm:px-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm">
            <span className="grid h-7 w-7 place-items-center rounded-md border border-line text-[11px] font-semibold">PK</span>
            {site.name}
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted">{site.seeking}</p>
          <p className="mt-4 flex items-center gap-2 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            Athens, GR · <LocalTime />
          </p>
        </div>

        <FooterList title="Site" items={nav} />
        <FooterList title="Elsewhere" items={elsewhere} />
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-2 px-5 py-5 font-mono text-[11px] text-muted sm:px-6">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p className="flex gap-4">
            <Link href="/legal" className="link hover:text-foreground">
              Legal
            </Link>
            <a href="https://github.com/panteliskarabetsos/My-portfolio" {...ext('https://')} className="link hover:text-foreground">
              Source
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, items }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((l) => {
          const Comp = l.href.startsWith('/') && !l.href.endsWith('.pdf') ? Link : 'a';
          return (
            <li key={l.name}>
              <Comp href={l.href} {...ext(l.href)} className="link text-muted transition-colors hover:text-foreground">
                {l.name}
              </Comp>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
