import Link from 'next/link';
import { Github } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { Chips, Page, PageHeader, Section } from '@/components/ui';
import { projects, site } from '@/data/site';

export const metadata = {
  title: 'Projects',
  description: 'Full-stack platforms, booking systems and information-retrieval tools built by Pantelis Karabetsos.',
  alternates: { canonical: '/projects' },
};

export default function Projects() {
  const withImage = projects.filter((p) => p.image);
  const other = projects.filter((p) => !p.image);

  return (
    <Page>
      <PageHeader eyebrow="Projects" title="Things I've built">
        <p>
          Live web platforms, plus university and personal projects. For my security
          research, see{' '}
          <Link href="/research" className="link text-foreground">
            the thesis write-up
          </Link>
          .
        </p>
      </PageHeader>

      <div className="reveal grid gap-4 sm:grid-cols-2" style={{ '--d': '180ms' }}>
        {withImage.map((p, i) => {
          // First card is wide; the last one goes wide too if it would otherwise sit alone
          const wide = i === 0 || (i === withImage.length - 1 && i % 2 === 1);
          return (
            <div key={p.slug} className={wide ? 'sm:col-span-2' : ''}>
              <ProjectCard project={p} feature={wide} priority={i === 0} />
            </div>
          );
        })}
      </div>

      <Section label="More" title="Smaller projects" className="mt-14">
        <ul className="grid gap-3 sm:grid-cols-2">
          {other.map((p) => (
            <li key={p.slug}>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="spotlight group flex h-full flex-col rounded-xl border border-line bg-surface p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-sm text-muted">{p.subtitle}</p>
                  </div>
                  <Github size={16} className="mt-1 shrink-0 text-muted transition-colors group-hover:text-foreground" aria-label="Source on GitHub" />
                </div>
                <p className="mt-3 flex-1 text-sm text-muted">{p.description}</p>
                <Chips items={p.tech} className="mt-4" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          More on{' '}
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="link text-foreground">
            GitHub
          </a>
          .
        </p>
      </Section>
    </Page>
  );
}
