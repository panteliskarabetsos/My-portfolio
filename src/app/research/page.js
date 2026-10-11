import AttackFlow from '@/components/AttackFlow';
import ResultsChart from '@/components/ResultsChart';
import { ArrowLink, Chips, Page, PageHeader, Section } from '@/components/ui';
import { site, thesis } from '@/data/site';

export const metadata = {
  title: 'Research',
  description:
    'MEng thesis: adversarial attacks (FGSM, PGD, ZOO, HopSkipJump) against ML-based network intrusion detection systems trained on CICIDS2017.',
  alternates: { canonical: '/research' },
};

const setup = [
  { k: 'Dataset', v: thesis.dataset },
  { k: 'Models', v: thesis.models.join(', ') },
  { k: 'Clean detection', v: 'Over 99% for both models' },
  { k: 'Threat models', v: 'White-box & black-box' },
];

export default function Research() {
  return (
    <Page>
      <PageHeader eyebrow={`MEng thesis · ${thesis.institution} · ${thesis.date}`} title={thesis.title}>
        <p>
          Machine-learning detectors score extremely well on benchmark traffic. I wanted to know how much of that
          holds up against an attacker who deliberately crafts traffic to be misclassified, and how much survives
          once the attacker is limited to changes that would work on a real network.
        </p>
      </PageHeader>

      {/* Key numbers */}
      <section className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4" style={{ '--d': '180ms' }} aria-label="Key results">
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

      <Section label="01 · Setup" title="Two detectors, four attacks" className="mt-14">
        <dl className="divide-y divide-line">
          {setup.map((s) => (
            <div key={s.k} className="grid gap-1 py-3 sm:grid-cols-[9rem,1fr] sm:gap-6">
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

        <p className="mt-6 text-sm text-muted">
          The realistic scenario restricts perturbations to timing and packet-size features, changes an attacker can
          plausibly make without breaking the underlying traffic.
        </p>
      </Section>

      <Section label="02 · Results" title="How often the attacks got through">
        <ResultsChart />
      </Section>

      <Section label="03 · Findings" title="What it means for defenders">
        <ol className="space-y-5">
          {thesis.findings.map((f, i) => (
            <li key={i} className="grid grid-cols-[2rem,1fr] gap-2">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <p className="text-pretty text-[15px] leading-relaxed">{f}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="04 · Stack" title="Tools">
        <Chips items={thesis.tools} />
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          <ArrowLink href={site.resume}>Résumé</ArrowLink>
          <ArrowLink href="/contact">Ask me about it</ArrowLink>
        </div>
      </Section>
    </Page>
  );
}
