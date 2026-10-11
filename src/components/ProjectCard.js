import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import { Chips } from './ui';

const host = (url) => url?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

/** Screenshot inside a minimal browser window. */
function BrowserFrame({ src, alt, url, priority, sizes, fill = false }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-line bg-background ${fill ? 'flex flex-col' : ''}`}>
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        {url && (
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-foreground/5 px-2.5 py-0.5 font-mono text-[10px] text-muted">
            {host(url)}
          </span>
        )}
      </div>
      <div className={`relative overflow-hidden ${fill ? 'aspect-16/10 sm:aspect-auto sm:min-h-64 sm:flex-1' : 'aspect-16/10'}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
      </div>
    </div>
  );
}

/**
 * Project card. `feature` lays the screenshot and text side by side on wider
 * screens; the default stacks them. The title link stretches over the whole card.
 */
export default function ProjectCard({ project, feature = false, priority = false }) {
  const { title, subtitle, description, highlights, tech, image, github, demo } = project;
  const primary = demo || github;

  return (
    <article
      className={`spotlight group rounded-2xl border border-line bg-surface p-2.5 transition-colors hover:border-foreground/20 ${
        feature ? 'sm:grid sm:grid-cols-[1.35fr_1fr] sm:gap-2' : 'flex flex-col'
      }`}
    >
      {image && (
        <BrowserFrame
          src={image}
          alt={`Screenshot of ${title}`}
          url={demo}
          fill={feature}
          priority={priority}
          sizes={feature ? '(min-width: 640px) 480px, 100vw' : '(min-width: 640px) 400px, 100vw'}
        />
      )}

      <div className={`flex flex-1 flex-col px-3 pb-3 ${feature ? 'pt-4 sm:justify-center sm:px-5 sm:py-5' : 'pt-4'}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[17px] font-semibold tracking-[-0.01em]">
              <a
                href={primary}
                target="_blank"
                rel="noopener noreferrer"
                className="outline-hidden after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:after:outline-solid focus-visible:after:outline-2 focus-visible:after:outline-accent"
              >
                {title}
              </a>
            </h3>
            <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
          </div>
          <ArrowUpRight
            size={18}
            aria-hidden
            className="mt-0.5 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>

        <p className={`mt-3 text-pretty text-[14.5px] leading-relaxed text-foreground/85`}>
          {description}
        </p>

        {feature && highlights && (
          <ul className="mt-3 space-y-1 text-sm text-muted">
            {highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="text-accent" aria-hidden>
                  ›
                </span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4">
          <Chips items={tech} />
          {github && demo && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 mt-4 inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
            >
              <Github size={13} aria-hidden />
              <span className="link">Source code</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
