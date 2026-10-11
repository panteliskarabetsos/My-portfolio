'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { certifications, languages, nav, projects, site, skills } from '@/data/site';

const PROMPT = 'guest@pk:~$';
const PAGES = ['home', ...nav.map((n) => n.href.slice(1))];

const LOGO = [
  ' ____  _  __',
  '|  _ \\| |/ /',
  "| |_) | ' / ",
  '|  __/| . \\ ',
  '|_|   |_|\\_\\',
];

const A = ({ href, children }) => {
  const external = href.startsWith('http') || href.startsWith('mailto:') || href.endsWith('.pdf');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-foreground underline decoration-line underline-offset-4 hover:decoration-accent"
    >
      {children}
    </a>
  );
};

const Key = ({ children }) => <span className="text-accent">{children}</span>;

function athensTime() {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Athens',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date());
}

/**
 * An interactive terminal with a handful of commands about me.
 * `inline` boots itself with neofetch when scrolled into view; `modal` starts
 * focused with a short welcome, and `exit`, Esc or `cd` close it via onExit.
 */
export default function Shell({ variant = 'inline', onExit }) {
  const modal = variant === 'modal';
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [lines, setLines] = useState(() =>
    modal
      ? [
          {
            id: 'welcome',
            cmd: null,
            output: (
              <span className="text-muted">
                Welcome. Type <Key>help</Key> to see what you can do, or <Key>exit</Key> to close.
              </span>
            ),
          },
        ]
      : []
  );
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const [booted, setBooted] = useState(modal);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const rootRef = useRef(null);

  const commands = {
    help: {
      desc: 'list available commands',
      run: () => (
        <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 [overflow-wrap:anywhere] sm:grid-cols-[9rem_minmax(0,1fr)]">
          {Object.entries(commands)
            .filter(([, c]) => !c.hidden)
            .map(([name, c]) => (
              <Fragment key={name}>
                <Key>{name}</Key>
                <span className="text-muted">{c.desc}</span>
              </Fragment>
            ))}
        </div>
      ),
    },
    neofetch: {
      desc: 'system info, but about me',
      run: () => (
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <pre className="text-[10px] leading-[1.15] text-accent sm:text-[11px]">{LOGO.join('\n')}</pre>
          <div>
            <p>
              <Key>pantelis</Key>@<Key>karabetsos</Key>
            </p>
            <p className="text-muted">-------------------</p>
            {[
              ['role', `${site.role} (${site.degree})`],
              ['location', site.location],
              ['education', 'University of West Attica, 2020–2026'],
              ['focus', 'network security, intrusion detection'],
              ['languages', languages.map((l) => l.name).join(', ')],
              ['stack', 'Python, PyTorch, C/C++, Java, Next.js'],
              ['status', 'open to entry-level security roles'],
            ].map(([k, v]) => (
              <p key={k}>
                <Key>{k}</Key>: {v}
              </p>
            ))}
          </div>
        </div>
      ),
    },
    whoami: {
      desc: 'who am I?',
      run: () => `${site.name}. ${site.role} (${site.degree}) based in ${site.location}.`,
    },
    projects: {
      desc: 'things I have built',
      run: () => (
        <ul>
          {projects.map((p) => (
            <li key={p.slug}>
              <Key>›</Key> <A href={p.demo || p.github}>{p.title}</A> <span className="text-muted">— {p.subtitle}</span>
            </li>
          ))}
        </ul>
      ),
    },
    skills: {
      desc: 'what I work with',
      run: () => (
        <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 [overflow-wrap:anywhere] sm:grid-cols-[9rem_minmax(0,1fr)]">
          {skills.map((s) => (
            <Fragment key={s.group}>
              <Key>{s.group.toLowerCase()}</Key>
              <span>{s.items.join(', ')}</span>
            </Fragment>
          ))}
        </div>
      ),
    },
    certs: {
      desc: 'certifications & training',
      run: () => (
        <ul>
          {certifications.map((c) => (
            <li key={c.name}>
              <Key>›</Key> {c.url ? <A href={c.url}>{c.name}</A> : c.name}{' '}
              <span className="text-muted">— {c.issuer}</span>
            </li>
          ))}
        </ul>
      ),
    },
    contact: {
      desc: 'how to reach me',
      run: () => (
        <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 [overflow-wrap:anywhere] sm:grid-cols-[9rem_minmax(0,1fr)]">
          <Key>email</Key>
          <A href={`mailto:${site.email}`}>{site.email}</A>
          <Key>github</Key>
          <A href={site.github}>github.com/panteliskarabetsos</A>
          <Key>linkedin</Key>
          <A href={site.linkedin}>in/panteliskarabetsos</A>
        </div>
      ),
    },
    resume: {
      desc: 'open my résumé (PDF)',
      run: () => {
        window.open(site.resume, '_blank', 'noopener');
        return 'Opening Resume.pdf…';
      },
    },
    ls: {
      desc: 'list pages',
      run: () => (
        <p>
          {PAGES.map((p) => (
            <span key={p} className="mr-4 text-accent">
              {p}/
            </span>
          ))}
          <span>Resume.pdf</span>
        </p>
      ),
    },
    cd: {
      desc: 'go to a page, e.g. cd projects',
      run: (arg) => {
        const page = (arg || '').replace(/^\/|\/$/g, '').toLowerCase();
        if (!page || page === '~' || page === 'home') {
          if (!modal) return 'Already home.';
          router.push('/');
          onExit?.();
          return null;
        }
        if (!PAGES.includes(page)) return `cd: no such page: ${arg}. Try ls.`;
        if (modal) {
          router.push(`/${page}`);
          onExit?.();
          return null;
        }
        setTimeout(() => router.push(`/${page}`), 350);
        return `Navigating to /${page}…`;
      },
    },
    theme: {
      desc: 'switch theme: theme light | dark',
      run: (arg) => {
        const next = arg === 'light' || arg === 'dark' ? arg : resolvedTheme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        return `Theme set to ${next}.`;
      },
    },
    date: { desc: 'local time in Athens', run: () => athensTime() },
    echo: { desc: 'print text', run: (arg) => arg || '' },
    history: {
      desc: 'previous commands',
      run: () => (history.length ? history.map((h, i) => `${String(i + 1).padStart(3)}  ${h}`).join('\n') : 'No history yet.'),
    },
    clear: { desc: 'clear the screen', run: () => null },
    sudo: {
      hidden: true,
      run: () => 'guest is not in the sudoers file. This incident will be reported.',
    },
    exit: {
      hidden: !modal,
      desc: 'close the terminal',
      run: () => {
        if (!modal) return "There's no escape. Try `contact` instead.";
        onExit?.();
        return null;
      },
    },
    hire: { hidden: true, run: () => "Great choice. Run `contact` and let's talk." },
  };

  const print = useCallback((cmd, output) => {
    setLines((l) => [...l, { cmd, output, id: Math.random() }]);
  }, []);

  const execute = (raw) => {
    const text = raw.trim();
    if (!text) {
      print('', null);
      return;
    }
    const [name, ...rest] = text.split(/\s+/);
    const arg = rest.join(' ');
    setHistory((h) => [...h, text]);
    setCursor(-1);
    const cmd = commands[name.toLowerCase()];
    if (name.toLowerCase() === 'clear') {
      setLines([]);
      return;
    }
    print(text, cmd ? cmd.run(arg) : `command not found: ${name}. Type help to see what's available.`);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      execute(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cursor < 0) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setInput('');
      } else {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (e.key === 'Tab' && input.trim() && !e.shiftKey) {
      // Autocomplete only when something is typed, so Tab still moves focus otherwise
      e.preventDefault();
      const [head, ...tail] = input.split(' ');
      if (tail.length && (head === 'cd' || head === 'theme')) {
        const opts = head === 'cd' ? PAGES : ['light', 'dark'];
        const match = opts.filter((o) => o.startsWith(tail.join(' ')));
        if (match.length === 1) setInput(`${head} ${match[0]}`);
      } else {
        const match = Object.keys(commands).filter((c) => !commands[c].hidden && c.startsWith(head));
        if (match.length === 1) setInput(`${match[0]} `);
        else if (match.length > 1) print(input, match.join('  '));
      }
    } else if (e.key === 'Escape' && modal) {
      e.preventDefault();
      onExit?.();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  // Modal: ready for input straight away
  useEffect(() => {
    if (modal) inputRef.current?.focus({ preventScroll: true });
  }, [modal]);

  // Inline: when first scrolled into view, "type" neofetch on its own
  useEffect(() => {
    const el = rootRef.current;
    if (!el || modal) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const text = 'neofetch';
        if (reduced) {
          print(text, commands.neofetch.run());
          setBooted(true);
          return;
        }
        let i = 0;
        const type = () => {
          i++;
          setInput(text.slice(0, i));
          if (i < text.length) timer = setTimeout(type, 70 + Math.random() * 60);
          else
            timer = setTimeout(() => {
              setInput('');
              print(text, commands.neofetch.run());
              setBooted(true);
            }, 280);
        };
        timer = setTimeout(type, 500);
      },
      { rootMargin: '0px 0px -25% 0px' }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
    // commands is rebuilt every render; boot should only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [print, modal]);

  // Keep the newest output in view (inside the terminal, not the page)
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines]);

  return (
    <div
      ref={rootRef}
      className={
        modal
          ? 'overflow-hidden rounded-xl border border-line bg-surface shadow-2xl'
          : 'spotlight rounded-xl border border-line bg-surface shadow-[0_1px_0_rgb(var(--foreground)/0.03),0_12px_40px_-24px_rgb(var(--foreground)/0.25)]'
      }
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="ml-2 font-mono text-[11px] text-muted">guest@pk — zsh</span>
        {modal ? (
          <button
            type="button"
            onClick={onExit}
            className="ml-auto rounded border border-line px-1.5 font-mono text-[10px] text-muted transition-colors hover:text-foreground"
            aria-label="Close terminal"
          >
            esc
          </button>
        ) : (
          <span className="ml-auto hidden font-mono text-[10px] text-muted sm:inline">
            try <Key>help</Key>, <Key>neofetch</Key>, <Key>cd projects</Key>
          </span>
        )}
      </div>

      <div
        ref={bodyRef}
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
        }}
        className={`${modal ? 'h-[min(60vh,26rem)]' : 'h-80 sm:h-96'} cursor-text overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-6 sm:text-[13px]`}
      >
        <div aria-live="polite">
          {lines.map((l) => (
            <div key={l.id} className="mb-2">
              {l.cmd !== null && (
                <p>
                  <span className="text-accent">{PROMPT}</span> {l.cmd}
                </p>
              )}
              {l.output !== null && l.output !== undefined && l.output !== '' && (
                <div className="whitespace-pre-wrap break-words text-foreground/90">{l.output}</div>
              )}
            </div>
          ))}
        </div>

        <label className="flex items-center gap-2">
          <span className="shrink-0 text-accent">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal command"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            enterKeyHint="send"
            placeholder={booted ? 'type help' : ''}
            className="peer w-full min-w-0 bg-transparent text-base text-foreground caret-accent sm:text-[13px] outline-hidden placeholder:text-muted/60"
          />
        </label>
      </div>
    </div>
  );
}
