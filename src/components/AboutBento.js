import Link from 'next/link';
import { ArrowUpRight, Download } from 'lucide-react';
import LocalTime from './LocalTime';
import { certifications, languages, site, skills, thesis, training } from '@/data/site';

const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

function Card({ className = '', children }) {
  return <div className={`spotlight flex flex-col rounded-2xl border border-line bg-surface p-5 ${className}`}>{children}</div>;
}

function Label({ children }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{children}</p>;
}

/** Bento grid of quick facts for the home page. */
export default function AboutBento() {
  const toolbox = skills.filter((s) => ['Security', 'Machine learning', 'Languages'].includes(s.group));

  return (
    <div className="grid gap-3 sm:grid-cols-6">
      {/* Education with a 2020 → 2026 timeline */}
      <Card className="sm:col-span-4">
        <div className="flex items-start justify-between gap-3">
          <Label>Education</Label>
          <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
            completed
          </span>
        </div>
        <p className="mt-3 text-lg font-semibold tracking-tight">Integrated Master&apos;s (MEng)</p>
        <p className="text-sm text-muted">Informatics &amp; Computer Engineering · University of West Attica</p>

        <div className="mt-auto pt-8">
          <div className="relative h-1 rounded-full bg-foreground/10">
            <div className="grow-x absolute inset-y-0 left-0 w-full rounded-full bg-chart" />
            <span className="absolute -top-[5px] right-0 h-3.5 w-3.5 translate-x-1/2 rounded-full border-2 border-surface bg-accent" />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-muted">
            {years.map((y) => (
              <span key={y} className={y === 2020 || y === 2026 ? 'text-foreground' : 'hidden sm:inline'}>
                {y}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            Thesis · {thesis.date} ·{' '}
            <Link href="/research" className="link text-foreground">
              adversarial attacks on ML-based NIDS
            </Link>
          </p>
        </div>
      </Card>

      {/* Location + live clock */}
      <Card className="sm:col-span-2">
        <Label>Based in</Label>
        <p className="mt-3 text-lg font-semibold tracking-tight">Athens, Greece</p>
        <p className="mt-auto pt-6 font-mono text-3xl font-medium tracking-tight">
          <LocalTime />
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          local time
        </p>
      </Card>

      {/* Toolbox */}
      <Card className="sm:col-span-3">
        <Label>Toolbox</Label>
        <dl className="mt-3 space-y-3">
          {toolbox.map((g) => (
            <div key={g.group}>
              <dt className="text-xs text-muted">{g.group}</dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5">
                {g.items.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Card>

      {/* Training & certificates */}
      <Card className="sm:col-span-3">
        <div className="flex items-baseline justify-between">
          <Label>Training &amp; certificates</Label>
          <span className="font-mono text-2xl font-medium tabular-nums">{certifications.length + training.length}</span>
        </div>
        <ul className="mt-3 divide-y divide-line text-sm">
          {[{ name: training[0].title, issuer: training[0].org }, ...certifications.slice(0, 4)].map((c) => (
            <li key={c.name} className="flex items-baseline justify-between gap-3 py-2">
              <span>{c.name}</span>
              <span className="shrink-0 text-right text-xs text-muted">{c.issuer}</span>
            </li>
          ))}
        </ul>
        <Link href="/about" className="group mt-auto inline-flex items-center gap-1 pt-3 text-xs text-muted hover:text-foreground">
          <span className="link">See all</span>
          <ArrowUpRight size={13} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Card>

      {/* Languages */}
      <Card className="sm:col-span-2">
        <Label>Languages</Label>
        <ul className="mt-3 space-y-2.5 text-sm">
          {languages.map((l) => (
            <li key={l.name} className="flex items-baseline justify-between">
              <span>{l.name}</span>
              <span className="font-mono text-xs text-muted">{l.level}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* What I'm looking for */}
      <Card className="sm:col-span-4">
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 rounded-[inherit] mask-[radial-gradient(ellipse_70%_90%_at_100%_0%,black,transparent_70%)]"
        />
        <Label>Looking for</Label>
        <p className="relative mt-3 text-pretty text-lg font-semibold tracking-tight">
          An entry-level role in network security, intrusion detection or digital forensics.
        </p>
        <div className="relative mt-auto flex flex-wrap items-center gap-3 pt-5">
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Download size={15} aria-hidden />
            Résumé
          </a>
          <Link href="/contact" className="link text-sm text-muted hover:text-foreground">
            Get in touch
          </Link>
        </div>
      </Card>
    </div>
  );
}
