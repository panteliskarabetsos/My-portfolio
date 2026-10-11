/** Two models with an arrow each way, weighted by how often crafted examples transferred. */
export default function TransferDiagram() {
  return (
    <figure className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <figcaption className="mb-6">
        <p className="text-sm font-medium">Transferability between models</p>
        <p className="mt-1 text-xs text-muted">
          Adversarial examples crafted against one model (unconstrained), replayed against the other.
        </p>
      </figcaption>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-5">
        <Node name="MLP" sub="neural network" />

        <div className="space-y-5">
          <Arrow dir="right" value="100%" strong label="MLP → RF" />
          <Arrow dir="left" value="0–39%" label="RF → MLP" />
        </div>

        <Node name="RF" sub="tree ensemble" />
      </div>

      <p className="mt-6 text-sm text-muted">
        Examples built on the neural network carried over completely; examples built on the tree ensemble mostly
        did not. A defender can&apos;t assume one model&apos;s robustness says anything about another&apos;s.
      </p>
    </figure>
  );
}

function Node({ name, sub }) {
  return (
    <div className="grid h-18 w-18 place-items-center rounded-xl border border-line bg-background text-center sm:h-24 sm:w-24">
      <div>
        <p className="font-mono text-lg font-semibold">{name}</p>
        <p className="px-1 text-[9px] leading-tight text-muted sm:text-[10px]">{sub}</p>
      </div>
    </div>
  );
}

function Arrow({ dir, value, label, strong = false }) {
  const right = dir === 'right';
  return (
    <div>
      <div className={`flex items-baseline justify-between gap-2 whitespace-nowrap text-xs ${right ? '' : 'flex-row-reverse'}`}>
        <span className="text-muted">{label}</span>
        <span className={`font-mono tabular-nums ${strong ? 'text-foreground' : 'text-muted'}`}>{value}</span>
      </div>
      <div className={`relative mt-1.5 flex items-center ${right ? '' : 'flex-row-reverse'}`}>
        <span className={`flex-1 rounded-full ${strong ? 'h-[3px] bg-chart' : 'h-px bg-foreground/30'}`} />
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className={right ? '' : 'rotate-180'}>
          <path d="M0 0 L10 5 L0 10 Z" className={strong ? 'fill-chart' : 'fill-foreground/30'} />
        </svg>
      </div>
    </div>
  );
}
