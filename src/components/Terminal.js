import InView from './InView';

/**
 * Terminal readout. `lines` items are either { cmd } for the prompt line or
 * { key, value } for an aligned result line. Types itself out when scrolled into view.
 */
export default function Terminal({ title = 'zsh', lines, label }) {
  const width = Math.max(...lines.filter((l) => l.key).map((l) => l.key.length)) + 3;
  let i = 0;

  return (
    <figure
      className="spotlight rounded-xl border border-line bg-surface shadow-[0_1px_0_rgb(var(--foreground)/0.03),0_12px_40px_-24px_rgb(var(--foreground)/0.25)]"
      aria-label={label}
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        <span className="ml-2 font-mono text-[11px] text-muted">{title}</span>
      </div>
      <InView className="typer">
        <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-6 sm:text-[13px]">
          {lines.map((l, idx) =>
            l.cmd ? (
              <div key={idx}>
                <span className="text-accent">❯</span>{' '}
                <span className="t-cmd" style={{ '--n': l.cmd.length }}>
                  {l.cmd}
                </span>
              </div>
            ) : (
              <div key={idx} className="t-line text-muted" style={{ '--i': i++ }}>
                {'  '}
                {l.key.padEnd(width, '.')}
                <span className="text-foreground"> {l.value}</span>
              </div>
            )
          )}
          <div className="t-line" style={{ '--i': i }}>
            <span className="text-accent">❯</span>{' '}
            <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-foreground/70" />
          </div>
        </pre>
      </InView>
    </figure>
  );
}
