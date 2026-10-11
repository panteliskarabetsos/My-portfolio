import { ArrowUpRight } from 'lucide-react';
import LocalTime from './LocalTime';
import { languages, site } from '@/data/site';

const toolbox = ['Python', 'PyTorch', 'scikit-learn', 'C/C++', 'Java', 'Linux', 'Docker', 'Git', 'Next.js', 'React'];

const facts = [
  { k: 'Based in', v: 'Athens, Greece', sub: <LocalTime /> },
  { k: 'Education', v: 'MEng, UNIWA', sub: '2020 – 2026' },
  { k: 'Focus', v: 'Network security', sub: 'Intrusion detection' },
  {
    k: 'Languages',
    v: languages.slice(0, 2).map((l) => l.name).join(', '),
    sub: languages
      .slice(2)
      .map((l) => `${l.name} ${l.level}`)
      .join(', '),
  },
];

const Label = ({ children }) => (
  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{children}</dt>
);

/** Compact, table-like summary of key facts for the home page. */
export default function AtAGlance() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
        {facts.map((f) => (
          <div key={f.k} className="bg-background p-5">
            <Label>{f.k}</Label>
            <dd className="mt-3 text-[15px] font-medium tracking-tight">{f.v}</dd>
            <dd className="mt-0.5 font-mono text-xs text-muted">{f.sub}</dd>
          </div>
        ))}
      </dl>

      <dl className="grid gap-2 border-t border-line p-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
        <Label>Toolbox</Label>
        <dd className="text-sm leading-relaxed text-muted">
          {toolbox.map((t, i) => (
            <span key={t}>
              <span className="whitespace-nowrap text-foreground">{t}</span>
              {i < toolbox.length - 1 && <span className="text-line"> / </span>}
            </span>
          ))}
        </dd>
      </dl>

      <div className="flex flex-col gap-3 border-t border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm">
          <span className="relative mr-2 inline-flex h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-accent" aria-hidden />
          Looking for an entry-level role in network security, intrusion detection or digital forensics.
        </p>
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          <span className="link">Résumé</span>
          <ArrowUpRight
            size={14}
            aria-hidden
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </div>
  );
}
