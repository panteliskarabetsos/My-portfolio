import Link from 'next/link';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import HeroGrid from '@/components/HeroGrid';
import LocalTime from '@/components/LocalTime';
import ProjectCard from '@/components/ProjectCard';
import Scramble from '@/components/Scramble';
import Terminal from '@/components/Terminal';
import { ArrowLink, Page, Row, Section } from '@/components/ui';
import { certifications, projects, site, thesis, training } from '@/data/site';

export const metadata = {
  alternates: { canonical: '/' },
};

const socials = [
  { name: 'GitHub', href: site.github, icon: Github },
  { name: 'LinkedIn', href: site.linkedin, icon: Linkedin },
  { name: 'Email', href: `mailto:${site.email}`, icon: Mail },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <HeroGrid />

      <Page>
        {/* Hero */}
        <section className="pb-16 pt-16 sm:pb-20 sm:pt-28">
          <p
            className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-1 pl-2.5 pr-3 text-xs text-muted backdrop-blur-sm"
            style={{ '--d': '0ms' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Open to entry-level security roles
          </p>

          <h1
            className="reveal mt-7 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-7xl"
            style={{ '--d': '80ms' }}
          >
            Pantelis
            <br />
            Karabetsos<span className="text-accent">.</span>
          </h1>
          <p className="reveal mt-4 font-mono text-[13px] text-muted" style={{ '--d': '140ms' }}>
            <span className="text-accent">~/</span>
            <Scramble text="informatics & computer engineer · network security · adversarial ml" />
          </p>

          <p
            className="reveal mt-8 max-w-xl text-pretty text-lg leading-relaxed sm:text-xl sm:leading-relaxed"
            style={{ '--d': '200ms' }}
          >
            I study how machine-learning intrusion detectors fail, so they can be built to hold.{' '}
            <span className="text-muted">
              My thesis attacked ML-based NIDS with four adversarial techniques and measured what a realistic
              attacker can actually get past them.
            </span>
          </p>

          <div className="reveal mt-10 flex flex-wrap items-center gap-3" style={{ '--d': '260ms' }}>
            <Link href="/research" className="btn-primary group">
              Read the research
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Download size={15} aria-hidden />
              Résumé
            </a>
            <ul className="ml-1 flex items-center gap-1">
              {socials.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    aria-label={name}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
                  >
                    <Icon size={17} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* At a glance */}
          <dl
            className="reveal mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4"
            style={{ '--d': '320ms' }}
          >
            {[
              { k: 'Based in', v: 'Athens, GR', extra: <LocalTime className="text-muted" /> },
              { k: 'Degree', v: 'MEng · UNIWA', extra: <span className="text-muted">2020 – 2026</span> },
              { k: 'Focus', v: 'NetSec · IDS', extra: <span className="text-muted">Forensics</span> },
              { k: 'Thesis', v: 'Adversarial ML', extra: <span className="text-muted">{thesis.date}</span> },
            ].map((item) => (
              <div key={item.k} className="bg-background/80 px-4 py-3.5 backdrop-blur-sm">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{item.k}</dt>
                <dd className="mt-1.5 text-sm font-medium">{item.v}</dd>
                <dd className="font-mono text-[11px]">{item.extra}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Research */}
        <Section
          label="01 · Research"
          title="Can ML intrusion detectors be fooled?"
          action={<ArrowLink href="/research" className="hidden sm:inline-flex">Full write-up</ArrowLink>}
        >
          <p className="max-w-prose text-pretty text-muted">
            For my MEng thesis I trained an MLP and a Random Forest on {thesis.dataset}, then attacked both with
            FGSM, PGD, ZOO and HopSkipJump using PyTorch, scikit-learn and the Adversarial Robustness Toolbox.
          </p>

          <div className="mt-8">
            <Terminal
              title="thesis — nids-eval"
              label="Summary of thesis results"
              lines={[
                { cmd: 'nids-eval --dataset cicids2017 --models mlp,rf --attacks fgsm,pgd,zoo,hsj' },
                { key: 'clean detection', value: '> 99%' },
                { key: 'evasion, unconstrained', value: '57.8 – 100%' },
                { key: 'evasion, realistic constraints', value: '45.5 – 78.6%' },
                { key: 'transfer mlp → rf', value: '100%' },
                { key: 'transfer rf → mlp', value: '0 – 39%' },
              ]}
            />
          </div>

          <p className="mt-8 max-w-prose text-pretty text-[15px]">
            Realistic constraints reduce evasion but don&apos;t eliminate it, and an attack that fails against one
            model can succeed against another. Robustness has to be tested across models, not against a single
            detector.
          </p>
          <ArrowLink href="/research" className="mt-4 sm:hidden">
            Full write-up
          </ArrowLink>
        </Section>

        {/* Projects */}
        <Section
          label="02 · Selected work"
          title="Things I've built"
          action={<ArrowLink href="/projects">All projects</ArrowLink>}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((p, i) => (
              <div key={p.slug} className={i === 0 ? 'sm:col-span-2' : ''}>
                <ProjectCard project={p} feature={i === 0} />
              </div>
            ))}
          </div>
        </Section>

        {/* Background */}
        <Section
          label="03 · Background"
          title="Education & training"
          action={<ArrowLink href="/about">About me</ArrowLink>}
        >
          <ul className="divide-y divide-line">
            <Row meta="2020 – 2026" title="MEng, Informatics & Computer Engineering" org="University of West Attica" />
            <Row meta={thesis.date} title="Thesis" org="Adversarial attacks on ML-based NIDS" />
            <Row meta="Training" title={training[0].title} org={training[0].org} />
            {certifications.slice(0, 2).map((c) => (
              <Row key={c.name} meta="Certificate" title={c.name} org={c.issuer} />
            ))}
          </ul>
        </Section>

        {/* Contact */}
        <section className="reveal-scroll pb-4 pt-6">
          <div className="spotlight rounded-2xl border border-line bg-surface px-6 py-12 sm:px-12 sm:py-16">
            <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 rounded-[inherit] mask-[radial-gradient(ellipse_60%_80%_at_100%_100%,black,transparent_70%)]" />
            <p className="eyebrow relative flex items-center gap-2">
              <span className="text-accent">04</span>
              <span className="h-px w-4 bg-line" aria-hidden />
              Contact
            </p>
            <h2 className="relative mt-4 max-w-lg text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Hiring for a security team? I&apos;d like to hear from you.
            </h2>
            <div className="relative mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href="/contact" className="btn-primary group">
                Get in touch
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <a href={`mailto:${site.email}`} className="link font-mono text-sm text-muted hover:text-foreground">
                {site.email}
              </a>
            </div>
          </div>
        </section>
      </Page>
    </>
  );
}
