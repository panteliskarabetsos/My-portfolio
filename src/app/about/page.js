import Link from 'next/link';
import Image from 'next/image';
import { Download } from 'lucide-react';
import { ArrowLink, Page, Row, Section } from '@/components/ui';
import {
  certifications,
  education,
  experience,
  languages,
  site,
  skills,
  thesis,
  training,
} from '@/data/site';

export const metadata = {
  title: 'About',
  description:
    'Informatics & Computer Engineer (MEng, University of West Attica) with a thesis on adversarial attacks against ML-based intrusion detection. Training in digital forensics and offensive security.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <Page>
      <header className="grid gap-8 pb-14 pt-14 sm:grid-cols-[1fr,11rem] sm:gap-12 sm:pt-24">
        <div>
          <p className="eyebrow reveal">About</p>
          <h1 className="reveal mt-3 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl" style={{ '--d': '60ms' }}>
            Hi, I&apos;m Pantelis.
          </h1>
          <div className="reveal mt-5 space-y-4 text-pretty leading-relaxed text-muted" style={{ '--d': '120ms' }}>
            <p>
              I&apos;m an Informatics and Computer Engineer from Athens. I completed my integrated master&apos;s
              (MEng) at the University of West Attica in 2026, with a thesis on{' '}
              <Link href="/research" className="link text-foreground">
                adversarial attacks against ML-based network intrusion detection
              </Link>
              .
            </p>
            <p>
              I like understanding systems well enough to break them, and then working out what it takes to
              defend them. Recently I&apos;ve trained in digital forensics with the University of Patras
              and practised offensive security on Hack The Box Academy.
            </p>
            <p className="text-foreground">{site.seeking}</p>
          </div>
          <div className="reveal mt-6 flex flex-wrap items-center gap-4" style={{ '--d': '180ms' }}>
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Download size={15} aria-hidden />
              Download résumé
            </a>
            <ArrowLink href={site.linkedin}>LinkedIn</ArrowLink>
            <ArrowLink href={site.github}>GitHub</ArrowLink>
          </div>
        </div>

        <div className="reveal relative order-first aspect-square w-28 overflow-hidden rounded-2xl border border-line sm:order-none sm:mt-10 sm:w-44" style={{ '--d': '60ms' }}>
          <Image
            src="/images/profile.jpg"
            alt="Portrait of Pantelis Karabetsos"
            fill
            sizes="160px"
            priority
            className="object-cover grayscale transition duration-500 hover:grayscale-0"
          />
        </div>
      </header>

      <Section label="01 · Education" title="Where I studied" delay={240}>
        <ul className="divide-y divide-line">
          {education.map((e) => (
            <Row key={e.title} meta={e.period} title={e.title} org={e.org}>
              {e.note}
            </Row>
          ))}
          <Row meta={thesis.date} title="Thesis" org="Adversarial ML · Network security">
            {thesis.title}. Trained an MLP and a Random Forest on {thesis.dataset} and evaluated FGSM, PGD, ZOO and
            HopSkipJump attacks against them.
          </Row>
        </ul>
      </Section>

      <Section label="02 · Security training" title="Hands-on practice">
        <ul className="divide-y divide-line">
          {training.map((t) => (
            <Row key={t.title} meta="Training" title={t.title} org={t.org}>
              {t.note}
            </Row>
          ))}
        </ul>
      </Section>

      <Section label="03 · Certifications" title="Courses & certificates">
        <ul className="grid gap-3 sm:grid-cols-2">
          {certifications.map((c) => {
            const body = (
              <>
                <p className="font-medium">{c.name}</p>
                <p className="mt-0.5 text-sm text-muted">{c.issuer}</p>
                {c.url && <p className="mt-3 font-mono text-[11px] text-accent">Verify credential ↗</p>}
              </>
            );
            const cls = 'spotlight block h-full rounded-xl border border-line bg-surface p-4';
            return (
              <li key={c.name}>
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section label="04 · Skills" title="Toolbox">
        <dl className="divide-y divide-line">
          {skills.map((s) => (
            <div key={s.group} className="grid gap-1 py-3 sm:grid-cols-[9rem,1fr] sm:gap-6">
              <dt className="font-mono text-xs leading-6 text-muted">{s.group}</dt>
              <dd className="text-[15px]">{s.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="05 · Experience" title="Work">
        <ul className="divide-y divide-line">
          {experience.map((e) => (
            <Row key={e.title} meta={e.period} title={e.title} org={e.org}>
              {e.note}
            </Row>
          ))}
        </ul>
      </Section>

      <Section label="06 · Languages" title="Spoken">
        <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[15px]">
          {languages.map((l) => (
            <li key={l.name}>
              {l.name} <span className="text-muted">· {l.level}</span>
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  );
}
