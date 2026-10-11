const steps = [
  { k: 'Input', title: 'Malicious flow', text: 'Labelled attack traffic from CICIDS2017' },
  { k: 'Attack', title: 'FGSM · PGD · ZOO · HSJ', text: 'Searches for a small change that flips the prediction' },
  { k: 'Perturbed', title: 'Adversarial flow', text: 'Realistic case: only timing & packet size change' },
  { k: 'Detector', title: 'MLP / Random Forest', text: 'Same models that score >99% on clean traffic' },
];

/** Schematic of an evasion attack, left to right (top to bottom on mobile). */
export default function AttackFlow() {
  return (
    <figure className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <figcaption className="sr-only">How an evasion attack works</figcaption>
      <ol className="grid gap-0 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_auto] sm:items-stretch">
        {steps.map((s, i) => (
          <li key={s.k} className="contents">
            <div className="rounded-lg border border-line bg-background p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                <span className="text-accent">{i + 1}</span> {s.k}
              </p>
              <p className="mt-1.5 text-[13px] font-medium leading-snug">{s.title}</p>
              <p className="mt-1 text-xs leading-snug text-muted">{s.text}</p>
            </div>
            <Connector />
          </li>
        ))}
        <li className="flex items-center justify-center rounded-lg border border-accent/40 bg-accent/[0.07] px-3 py-3 sm:flex-col">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Result</p>
          <p className="ml-2 text-[13px] font-medium sm:ml-0 sm:mt-1.5">“benign”</p>
        </li>
      </ol>
    </figure>
  );
}

function Connector() {
  return (
    <div aria-hidden className="flex items-center justify-center py-1.5 sm:px-1.5 sm:py-0">
      <span className="flow-line block h-4 w-px sm:h-px sm:w-4" />
    </div>
  );
}
