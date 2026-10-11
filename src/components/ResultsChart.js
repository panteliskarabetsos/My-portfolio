import { thesis } from '@/data/site';

const ticks = [0, 25, 50, 75, 100];

const fmt = (r) => (r.min === r.max ? `${r.max}%` : `${r.min}–${r.max}%`);

/**
 * Range chart of evasion rates. Each row is one scenario; the bar spans the
 * lowest to highest evasion rate reported across attacks.
 */
export default function ResultsChart({ results = thesis.results }) {
  return (
    <figure className="spotlight relative rounded-xl border border-line bg-surface p-5 sm:p-6">
      <figcaption className="mb-6">
        <p className="text-sm font-medium">Evasion rate by scenario</p>
        <p className="mt-1 text-xs text-muted">
          Share of malicious flows classified as benign. Bars span the lowest to highest rate across attacks.
        </p>
      </figcaption>

      <div aria-hidden className="space-y-5">
        {results.map((r) => {
          const point = r.min === r.max;
          return (
            <div
              key={r.label}
              className="group relative grid grid-cols-1 gap-2 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-4"
            >
              <div className="flex items-baseline justify-between gap-3 sm:block">
                <p className="text-sm">{r.label}</p>
                <p className="font-mono text-xs text-muted sm:hidden">{fmt(r)}</p>
              </div>

              <div className="relative h-6">
                {/* recessive gridlines */}
                {ticks.map((t) => (
                  <span key={t} className="absolute inset-y-0 w-px bg-line" style={{ left: `${t}%` }} />
                ))}
                {/* track */}
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
                {point ? (
                  <span
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart ring-2 ring-surface"
                    style={{ left: `${r.max}%` }}
                  />
                ) : (
                  <span
                    className="grow-x absolute top-1/2 h-2.5 -translate-y-1/2 rounded-[4px] bg-chart transition-[height] duration-200 group-hover:h-3.5"
                    style={{ left: `${r.min}%`, width: `max(${r.max - r.min}%, 6px)` }}
                  />
                )}
                <span
                  className="absolute top-1/2 hidden -translate-y-1/2 bg-surface px-1.5 font-mono text-xs text-muted sm:block"
                  style={
                    r.max > 80
                      ? { right: `calc(${100 - r.min}% + 0.25rem)` }
                      : { left: `calc(${r.max}% + 0.25rem)` }
                  }
                >
                  {fmt(r)}
                </span>

                {/* tooltip */}
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full z-10 mb-2 hidden w-max max-w-[16rem] rounded-md border border-line bg-background px-3 py-2 text-xs opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 sm:block"
                  style={{ left: `clamp(0%, ${(r.min + r.max) / 2}% - 6rem, calc(100% - 12rem))` }}
                >
                  <span className="block font-medium">{r.label}</span>
                  <span className="block text-muted">{r.detail}</span>
                  <span className="mt-1 block font-mono">{fmt(r)} evasion</span>
                </span>
              </div>
            </div>
          );
        })}

        {/* axis */}
        <div className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] sm:gap-4">
          <span className="hidden sm:block" />
          <div className="relative h-4 font-mono text-[10px] text-muted">
            {ticks.map((t) => (
              <span
                key={t}
                className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
                style={{ left: `${t}%` }}
              >
                {t}%
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible table view of the same data */}
      <div className="sr-only">
        <table>
          <caption>Evasion rate by scenario</caption>
          <thead>
            <tr>
              <th scope="col">Scenario</th>
              <th scope="col">Condition</th>
              <th scope="col">Evasion rate</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                <td>{r.detail}</td>
                <td>{fmt(r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
