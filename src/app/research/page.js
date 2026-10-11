import AttackFlow from '@/components/AttackFlow';
import CopyButton from '@/components/CopyButton';
import EvasionDemo from '@/components/EvasionDemo';
import ResultsChart from '@/components/ResultsChart';
import Toc from '@/components/Toc';
import TransferDiagram from '@/components/TransferDiagram';
import { ArrowLink, Chips, Section } from '@/components/ui';
import { site, thesis } from '@/data/site';

export const metadata = {
  title: 'Research',
  description:
    'MEng thesis: white-, gray- and black-box adversarial attacks (FGSM, PGD, ZOO, HopSkipJump) against ML-based network intrusion detection systems trained on CICIDS2017.',
  alternates: { canonical: '/research' },
};

const toc = [
  { id: 'motivation', label: 'Motivation' },
  { id: 'threat-model', label: 'Threat model' },
  { id: 'setup', label: 'Setup' },
  { id: 'constraints', label: 'Constraints' },
  { id: 'results', label: 'Results' },
  { id: 'findings', label: 'Findings' },
  { id: 'cite', label: 'Cite' },
];

const questions = [
  'How easily can a detector that scores over 99% on clean traffic be evaded?',
  'Does evasion survive when the attacker is limited to changes real traffic allows?',
  'Do adversarial examples crafted against one model fool a different one?',
];

const meta = [
  { k: 'Author', v: site.name },
  { k: 'Degree', v: 'Integrated Master’s (MEng)' },
  { k: 'Institution', v: thesis.institution },
  { k: 'Date', v: thesis.date },
];

const bibtex = `@mastersthesis{karabetsos2026adversarial,
  author = {Karabetsos, Pantelis},
  title  = {${thesis.title}},
  school = {${thesis.institution}},
  type   = {Integrated Master's (MEng) thesis},
  year   = {2026}
}`;

export default function Research() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:grid lg:grid-cols-[minmax(0,52rem)_10rem] lg:justify-center lg:gap-16">
      <main className="min-w-0">
        {/* Header */}
        <header className="pb-12 pt-14 sm:pt-24">
          <p className="eyebrow reveal">MEng thesis · Cybersecurity</p>
          <h1
            className="reveal mt-3 text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl"
            style={{ '--d': '60ms' }}
          >
            {thesis.title}
          </h1>
          <p className="reveal mt-6 max-w-prose text-pretty text-lg leading-relaxed text-muted" style={{ '--d': '120ms' }}>
            Machine-learning intrusion detectors score near-perfectly on benchmark traffic. I attacked two of them
            with white-, gray- and black-box evasion techniques to see how much of that accuracy holds up against an
            attacker, and how much survives once the attacker is limited to changes a real network would accept.
          </p>

          <dl
            className="reveal mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 sm:grid-cols-4"
            style={{ '--d': '160ms' }}
          >
            {meta.map((m) => (
              <div key={m.k}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{m.k}</dt>
                <dd className="mt-1 text-sm">{m.v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Key numbers */}
        <section
          aria-label="Key results"
          className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4"
          style={{ '--d': '200ms' }}
        >
          {[
            { v: '>99%', l: 'clean detection' },
            { v: '57.8–100%', l: 'evasion, unconstrained' },
            { v: '45.5–78.6%', l: 'evasion, realistic' },
            { v: '100%', l: 'transfer MLP → RF' },
          ].map((s) => (
            <div key={s.l} className="bg-surface p-4 sm:p-5">
              <p className="font-mono text-lg font-medium tabular-nums tracking-tight sm:text-2xl">{s.v}</p>
              <p className="mt-1 text-xs text-muted">{s.l}</p>
            </div>
          ))}
        </section>

        <Section id="motivation" label="01 · Motivation" title="Benchmarks don’t fight back" className="mt-14">
          <div className="max-w-prose space-y-4 text-pretty text-[15px] leading-relaxed">
            <p>
              ML-based network intrusion detection systems are usually judged on benchmark datasets, where they
              routinely report accuracy above 99%. Those numbers assume the traffic is what it is: the attacker
              doesn&apos;t know, or care, that a model is watching.
            </p>
            <p className="text-muted">
              A real attacker can shape their traffic to look benign. The thesis measures how far that gets them, and
              whether it still works when the changes have to be ones a real network would carry.
            </p>
          </div>

          <ol className="mt-8 grid gap-3">
            {questions.map((q, i) => (
              <li key={q} className="flex gap-4 rounded-xl border border-line bg-surface px-4 py-3.5">
                <span className="font-mono text-xs leading-6 text-accent">RQ{i + 1}</span>
                <span className="text-[15px]">{q}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="threat-model" label="02 · Threat model" title="What the attacker knows">
          <div className="grid gap-3 sm:grid-cols-3">
            {thesis.threatModels.map((t, i) => (
              <div key={t.level} className="spotlight flex flex-col rounded-xl border border-line bg-surface p-4">
                <div className="flex items-center gap-2">
                  <span className="flex gap-0.5" aria-hidden>
                    {[0, 1, 2].map((d) => (
                      <span key={d} className={`h-2 w-2 rounded-xs ${d < 3 - i ? 'bg-accent' : 'bg-foreground/15'}`} />
                    ))}
                  </span>
                  <p className="font-medium">{t.level}</p>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted">{t.knows}</p>
                <Chips items={t.attacks} className="mt-4" />
              </div>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-muted">
            <span className="flex gap-0.5" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-xs bg-accent" />
              <span className="h-1.5 w-1.5 rounded-xs bg-accent" />
              <span className="h-1.5 w-1.5 rounded-xs bg-accent" />
            </span>
            more attacker knowledge
          </p>
        </Section>

        <Section id="setup" label="03 · Setup" title="Two detectors, four attacks">
          <dl className="divide-y divide-line">
            {[
              { k: 'Dataset', v: thesis.dataset },
              { k: 'Models', v: thesis.models.join(', ') },
              { k: 'Clean detection', v: 'Over 99% for both models' },
              { k: 'Tooling', v: 'Python, PyTorch, scikit-learn, Adversarial Robustness Toolbox' },
            ].map((s) => (
              <div key={s.k} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="font-mono text-xs leading-6 text-muted">{s.k}</dt>
                <dd className="text-[15px]">{s.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <AttackFlow />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {thesis.attacks.map((a) => (
              <div key={a.name} className="spotlight rounded-xl border border-line bg-surface p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-sm font-medium">{a.name}</p>
                  <p className="text-[11px] text-muted">{a.kind}</p>
                </div>
                <p className="mt-2 text-sm text-muted">{a.note}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="constraints" label="04 · Constraints" title="Feature space vs. the real network">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Feature-space attack</p>
              <p className="mt-2 font-medium">Any feature, any value</p>
              <p className="mt-2 text-sm text-muted">
                The attack edits the model&apos;s input vector directly. It finds the easiest path across the decision
                boundary, even if the resulting values describe traffic that could never exist.
              </p>
            </div>
            <div className="rounded-xl border border-accent/40 bg-accent/5 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Realistic constraints</p>
              <p className="mt-2 font-medium">Timing and packet size only</p>
              <p className="mt-2 text-sm text-muted">
                Perturbations are limited to features an attacker can actually influence on the wire, such as when
                packets are sent and how large they are, and evaluated through network traffic simulations.
              </p>
            </div>
          </div>

          <p className="mb-6 mt-8 max-w-prose text-pretty text-[15px] leading-relaxed">
            Constraining the attacker removes the easy paths, so each flow needs a larger change to cross the boundary.
            Try it below: raise the attack budget, then switch to the realistic setting.
          </p>
          <EvasionDemo />
        </Section>

        <Section id="results" label="05 · Results" title="How often the attacks got through">
          <ResultsChart />
          <div className="mt-4">
            <TransferDiagram />
          </div>
        </Section>

        <Section id="findings" label="06 · Findings" title="What it means for defenders">
          <ol className="space-y-6">
            {thesis.findings.map((f, i) => (
              <li key={i} className="grid grid-cols-[3rem_1fr] gap-2">
                <span className="font-mono text-xs leading-7 text-accent">{i < questions.length ? `RQ${i + 1}` : '→'}</span>
                <p className="text-pretty text-[15px] leading-relaxed">{f}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="cite" label="07 · Cite" title="Reference this work">
          <div className="overflow-hidden rounded-xl border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line py-1.5 pl-4 pr-1.5">
              <span className="font-mono text-[11px] text-muted">BibTeX</span>
              <CopyButton value={bibtex} label="Copy BibTeX" text="Copy" />
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6 text-muted">{bibtex}</pre>
          </div>

          <div className="mt-8">
            <p className="eyebrow">Stack</p>
            <Chips items={thesis.tools} className="mt-3" />
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            <ArrowLink href={site.resume}>Résumé</ArrowLink>
            <ArrowLink href="/contact">Ask me about the thesis</ArrowLink>
          </div>
        </Section>
      </main>

      <aside className="hidden pt-24 lg:block">
        <Toc items={toc} />
      </aside>
    </div>
  );
}
