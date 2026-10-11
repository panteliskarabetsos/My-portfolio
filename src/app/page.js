import Link from 'next/link';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import HeroGrid from '@/components/HeroGrid';
import AboutBento from '@/components/AboutBento';
import AsciiGlobe from '@/components/AsciiGlobe';
import ProjectCard from '@/components/ProjectCard';
import Scramble from '@/components/Scramble';
import { ArrowLink, Section } from '@/components/ui';
import { projects, site } from '@/data/site';

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

      <main>
        <div className="mx-auto max-w-page px-5 sm:px-6">
          {/* Hero */}
          <section className="grid items-center gap-10 pb-16 pt-16 sm:pb-20 sm:pt-28 md:grid-cols-[minmax(0,1fr)_19rem] md:gap-4">
            <div>
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
                <Scramble text="computer engineer · network security · athens" />
              </p>

              <p
                className="reveal mt-8 max-w-xl text-pretty text-lg leading-relaxed sm:text-xl sm:leading-relaxed"
                style={{ '--d': '200ms' }}
              >
                I focus on network security and intrusion detection,{' '}
                <span className="text-muted">and build fast, minimal web platforms along the way.</span>
              </p>

              <div className="reveal mt-10 flex flex-wrap items-center gap-3" style={{ '--d': '260ms' }}>
                <Link href="/projects" className="btn-primary group">
                  View projects
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
            </div>

            <div className="reveal mx-auto w-full max-w-[19rem] md:mx-0" style={{ '--d': '300ms' }}>
              <AsciiGlobe />
            </div>
          </section>

          {/* Projects */}
          <Section
            label="01 · Selected work"
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
          <Section label="02 · Background" title="At a glance" action={<ArrowLink href="/about">About me</ArrowLink>}>
            <AboutBento />
          </Section>

          {/* Contact */}
          <section className="reveal-scroll pb-4 pt-6">
            <div className="spotlight rounded-2xl border border-line bg-surface px-6 py-12 sm:px-12 sm:py-16">
              <div
                aria-hidden
                className="dot-grid pointer-events-none absolute inset-0 rounded-[inherit] mask-[radial-gradient(ellipse_60%_80%_at_100%_100%,black,transparent_70%)]"
              />
              <p className="eyebrow relative flex items-center gap-2">
                <span className="text-accent">03</span>
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
        </div>
      </main>
    </>
  );
}
