'use client';

import { useEffect, useState } from 'react';

/** Sticky table of contents that highlights the section currently in view. */
export default function Toc({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // The active section is the last one whose top has passed 30% of the viewport
      const line = window.innerHeight * 0.3;
      let current = items[0]?.id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom, highlight the last section even if it's short
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = items[items.length - 1]?.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="eyebrow">On this page</p>
      <ol className="mt-4 space-y-1 border-l border-line text-sm">
        {items.map((item, i) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? 'true' : undefined}
                className={`-ml-px flex gap-2.5 border-l py-1 pl-3 transition-colors ${
                  on ? 'border-accent text-foreground' : 'border-transparent text-muted hover:text-foreground'
                }`}
              >
                <span className={`font-mono text-[11px] leading-5 ${on ? 'text-accent' : ''}`}>0{i + 1}</span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
