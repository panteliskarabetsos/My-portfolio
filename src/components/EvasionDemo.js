'use client';

import { useId, useMemo, useState } from 'react';

/*
 * Toy 2-D illustration of an evasion attack. The data is synthetic and has
 * nothing to do with the thesis numbers; it only shows the mechanism.
 *
 * x: features the attacker can influence (timing, packet size)
 * y: features the attacker cannot change without breaking the traffic
 * The detector flags a flow as malicious when w·p + b > 0.
 */

const W = { x: 0.42, y: 0.907 }; // unit normal of the decision boundary
const B = -0.62;
const N = 36; // points per class
const MARGIN = 0.02; // how far past the boundary the attacker pushes

const score = (p) => W.x * p.x + W.y * p.y + B;

// Small deterministic PRNG so the scatter is identical on server and client
function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cluster(rand, cx, cy, spread, keep) {
  const pts = [];
  while (pts.length < N) {
    // Box–Muller for a roughly gaussian blob
    const r = Math.sqrt(-2 * Math.log(rand() || 1e-9)) * spread;
    const a = rand() * Math.PI * 2;
    // Rounded so server and browser (whose Math.* may differ in the last bit) agree
    const p = { x: +(cx + r * Math.cos(a)).toFixed(3), y: +(cy + r * Math.sin(a)).toFixed(3) };
    if (p.x > 0.04 && p.x < 0.96 && p.y > 0.04 && p.y < 0.96 && keep(p)) pts.push(p);
  }
  return pts;
}

const rand = mulberry32(7);
const MALICIOUS = cluster(rand, 0.6, 0.66, 0.11, (p) => score(p) > 0.01);
const BENIGN = cluster(rand, 0.26, 0.3, 0.1, (p) => score(p) < -0.03);

/** Move a detected point towards the benign side with budget eps. */
function attack(p, eps, constrained) {
  const d = score(p); // distance to the boundary (W is unit length)
  if (constrained) {
    // Only the x features may change, so crossing costs d / W.x instead of d
    const need = d / W.x + MARGIN;
    const step = Math.min(eps, need, p.x - 0.01);
    return { x: p.x - step, y: p.y, evaded: score({ x: p.x - step, y: p.y }) < 0 };
  }
  const step = Math.min(eps, d + MARGIN);
  const q = { x: p.x - W.x * step, y: p.y - W.y * step };
  return { ...q, evaded: score(q) < 0 };
}

// Benign half of the unit square (Sutherland–Hodgman clip against score <= 0)
function benignRegion() {
  const box = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
  ];
  const out = [];
  for (let i = 0; i < box.length; i++) {
    const a = box[i];
    const b = box[(i + 1) % box.length];
    const sa = score(a);
    const sb = score(b);
    if (sa <= 0) out.push(a);
    if (sa <= 0 !== sb <= 0) {
      const t = sa / (sa - sb);
      out.push({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) });
    }
  }
  return out;
}

const VW = 420;
const VH = 300;
const PAD = 28;
const sx = (x) => +(PAD + x * (VW - PAD * 2)).toFixed(2);
const sy = (y) => +(VH - PAD - y * (VH - PAD * 2)).toFixed(2);

const REGION = benignRegion()
  .map((p) => `${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`)
  .join(' ');

// Boundary line endpoints where it meets the square
const LINE = benignRegion().filter((p) => Math.abs(score(p)) < 1e-9);

const rate = (eps, constrained) =>
  MALICIOUS.filter((p) => attack(p, eps, constrained).evaded).length / MALICIOUS.length;

export default function EvasionDemo() {
  const [eps, setEps] = useState(0.18);
  const [constrained, setConstrained] = useState(false);
  const sliderId = useId();

  const moved = useMemo(() => MALICIOUS.map((p) => ({ from: p, to: attack(p, eps, constrained) })), [eps, constrained]);
  const evaded = moved.filter((m) => m.to.evaded).length;
  const free = Math.round(rate(eps, false) * 100);
  const real = Math.round(rate(eps, true) * 100);

  return (
    <figure className="rounded-xl border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <figcaption className="text-sm font-medium">Interactive: how an evasion attack works</figcaption>
        <div role="radiogroup" aria-label="Attacker constraints" className="flex rounded-full border border-line p-0.5 text-xs">
          {[
            { v: false, l: 'Unconstrained' },
            { v: true, l: 'Realistic' },
          ].map((o) => (
            <button
              key={o.l}
              type="button"
              role="radio"
              aria-checked={constrained === o.v}
              onClick={() => setConstrained(o.v)}
              className={`rounded-full px-3 py-1 transition-colors ${
                constrained === o.v ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
              }`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-0 sm:grid-cols-[1fr_12rem]">
        <div className="relative px-2 pt-2 sm:px-3">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="h-auto w-full"
            role="img"
            aria-label={`Scatter plot: with an attack budget of ${eps.toFixed(2)}, ${evaded} of ${MALICIOUS.length} malicious flows cross into the benign region.`}
          >
            {/* benign region */}
            <polygon points={REGION} className="fill-accent/6" />
            <rect x={sx(0)} y={sy(1)} width={sx(1) - sx(0)} height={sy(0) - sy(1)} className="fill-none stroke-line" />
            {/* decision boundary */}
            {LINE.length === 2 && (
              <line
                x1={sx(LINE[0].x)}
                y1={sy(LINE[0].y)}
                x2={sx(LINE[1].x)}
                y2={sy(LINE[1].y)}
                className="stroke-foreground/40"
                strokeDasharray="4 4"
              />
            )}
            <text x={sx(0.03)} y={sy(0.04)} className="fill-muted font-mono text-[9px]">
              classified benign
            </text>
            <text x={sx(0.97)} y={sy(0.95)} textAnchor="end" className="fill-muted font-mono text-[9px]">
              classified malicious
            </text>

            {/* axis labels */}
            <text x={sx(0.5)} y={VH - 8} textAnchor="middle" className="fill-muted font-mono text-[9px]">
              timing &amp; packet size → (attacker can change)
            </text>
            <text
              transform={`translate(11 ${sy(0.5)}) rotate(-90)`}
              textAnchor="middle"
              className="fill-muted font-mono text-[9px]"
            >
              other features → (fixed when realistic)
            </text>

            {/* benign flows */}
            {BENIGN.map((p, i) => (
              <circle key={`b${i}`} cx={sx(p.x)} cy={sy(p.y)} r="3.2" className="fill-none stroke-foreground/30" strokeWidth="1.2" />
            ))}

            {/* perturbation trails */}
            {moved.map((m, i) =>
              m.to.x !== m.from.x || m.to.y !== m.from.y ? (
                <line
                  key={`t${i}`}
                  x1={sx(m.from.x)}
                  y1={sy(m.from.y)}
                  x2={sx(m.to.x)}
                  y2={sy(m.to.y)}
                  className={m.to.evaded ? 'stroke-accent/50' : 'stroke-foreground/15'}
                  strokeWidth="1"
                />
              ) : null
            )}

            {/* malicious flows, animated to their perturbed position */}
            {moved.map((m, i) => (
              <circle
                key={`m${i}`}
                cx="0"
                cy="0"
                r={m.to.evaded ? 4 : 3.2}
                className={`transition-[transform,fill] duration-500 ease-out ${
                  m.to.evaded ? 'fill-accent stroke-surface' : 'fill-foreground/80 stroke-surface'
                }`}
                strokeWidth="1.5"
                style={{ transform: `translate(${sx(m.to.x)}px, ${sy(m.to.y)}px)` }}
              />
            ))}
          </svg>
        </div>

        <div className="flex flex-col gap-5 border-t border-line p-4 sm:border-l sm:border-t-0 sm:p-5">
          <div aria-live="polite">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Evaded</p>
            <p className="mt-1 font-mono text-3xl font-medium tabular-nums tracking-tight">
              {Math.round((evaded / MALICIOUS.length) * 100)}%
            </p>
            <p className="text-xs text-muted">
              {evaded} of {MALICIOUS.length} malicious flows
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <Bar label="Unconstrained" value={free} active={!constrained} />
            <Bar label="Realistic" value={real} active={constrained} />
          </div>

          <div>
            <label htmlFor={sliderId} className="flex items-baseline justify-between text-xs">
              <span>Attack budget ε</span>
              <span className="font-mono tabular-nums text-muted">{eps.toFixed(2)}</span>
            </label>
            <input
              id={sliderId}
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={eps}
              onChange={(e) => setEps(Number(e.target.value))}
              className="mt-2 w-full accent-[rgb(var(--accent))]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-4 py-3 text-[11px] text-muted sm:px-5">
        <Legend label="benign">
          <circle cx="5" cy="5" r="3.2" className="fill-none stroke-foreground/40" strokeWidth="1.2" />
        </Legend>
        <Legend label="malicious, detected">
          <circle cx="5" cy="5" r="3.2" className="fill-foreground/80" />
        </Legend>
        <Legend label="malicious, evaded">
          <circle cx="5" cy="5" r="4" className="fill-accent" />
        </Legend>
        <span className="ml-auto italic">Synthetic data for illustration, not thesis results.</span>
      </div>
    </figure>
  );
}

function Bar({ label, value, active }) {
  return (
    <div>
      <div className="flex justify-between">
        <span className={active ? 'text-foreground' : 'text-muted'}>{label}</span>
        <span className="font-mono tabular-nums text-muted">{value}%</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-foreground/[0.07]">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${active ? 'bg-chart' : 'bg-foreground/25'}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Legend({ label, children }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
        {children}
      </svg>
      {label}
    </span>
  );
}
