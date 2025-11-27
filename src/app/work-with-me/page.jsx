"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WorkWithMePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground font-sans">
      {/* Soft background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 
        bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.16),_transparent_55%)] 
        dark:bg-[radial-gradient(circle_at_top,_rgba(250,250,250,0.04),_transparent_60%)]"
      />

      {/* HERO */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-5 text-center sm:text-left"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/60 px-4 py-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 animate-pulse" />
              Work with me
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Let&apos;s build a website that feels calm, clear and on-brand.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto sm:mx-0 leading-relaxed">
              I help small teams, solo founders and studios design and ship
              modern websites and simple web apps — with a process that&apos;s
              structured, transparent and not chaotic.
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mt-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.45)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3 sm:px-8 sm:py-3.5 rounded-full text-sm sm:text-base font-medium text-white 
                    bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500
                    hover:from-emerald-500 hover:via-sky-600 hover:to-indigo-600
                    transition-all shadow-xl backdrop-blur-xl border border-white/10"
                >
                  Share your project
                </motion.button>
              </Link>

              <Link href="/projects">
                <button
                  className="px-7 py-3 sm:px-8 sm:py-3.5 rounded-full text-sm sm:text-base font-medium 
                    border border-zinc-300/80 dark:border-zinc-700/80 
                    bg-white/80 dark:bg-zinc-900/60 
                    hover:bg-white dark:hover:bg-zinc-900 
                    backdrop-blur-xl text-zinc-800 dark:text-zinc-100 
                    transition-all shadow-sm hover:shadow-md"
                >
                  View selected work
                </button>
              </Link>
            </div>

            <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-500">
              Remote-friendly. Ideal for portfolios, service businesses and lean
              product teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FIT SECTION */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-3 text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
              Fit
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Are we a good match?
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto sm:mx-0">
              I&apos;m best when you care about clarity, long-term
              maintainability and a calm digital presence more than quick hacks
              or loud visuals.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/70 backdrop-blur-xl p-5 sm:p-6 space-y-3 shadow-sm">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 text-sm">
                  ✓
                </span>
                We&apos;ll likely work well together if you…
              </h3>
              <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-2">
                <li>• Want a clean, minimal website or web app.</li>
                <li>• Prefer thoughtful UX over flashy one-off effects.</li>
                <li>• Can give honest, timely feedback during the project.</li>
                <li>• Care that the codebase is solid and easy to extend.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl p-5 sm:p-6 space-y-3 shadow-sm">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 text-sm">
                  …
                </span>
                It might not be the right fit if you…
              </h3>
              <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-2">
                <li>
                  • Need a &quot;tomorrow&quot; launch with no flexibility.
                </li>
                <li>
                  • Only want a quick template copy-paste with no thinking.
                </li>
                <li>• Prefer very heavy, noisy visuals over readability.</li>
                <li>• Can&apos;t be available to review work as we go.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-3 text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
              Process
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              A clear path from idea to launch
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto sm:mx-0">
              No big reveals at the end. You see the work as it evolves, can ask
              questions anytime and know exactly where we are in the process.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-950/65 p-5 sm:p-6 space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                01 · Discovery
              </p>
              <h3 className="text-base font-semibold">Understand & scope</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                We define the goal, pages, features, constraints and timeline.
                You get a simple written scope so we&apos;re aligned before any
                real work starts.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-950/65 p-5 sm:p-6 space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                02 · Design & build
              </p>
              <h3 className="text-base font-semibold">Structure & interface</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                I design directly in code using a component-based approach.
                You&apos;ll see links, screen recordings or staging URLs as
                things come together.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-950/65 p-5 sm:p-6 space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                03 · Launch & support
              </p>
              <h3 className="text-base font-semibold">Ship & refine</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                We deploy, connect tools (forms, analytics, etc.) and polish any
                rough edges. Longer-term support or follow-up iterations are
                possible if you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TYPICAL PROJECTS */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-3 text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
              Typical projects
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Common ways we can collaborate
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto sm:mx-0">
              These aren&apos;t strict packages, just shapes that most projects
              fall into. We&apos;ll adjust them to what you actually need.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 1 */}
            <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-950/70 backdrop-blur-xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
              <div className="space-y-1.5">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                  Essentials
                </p>
                <h3 className="text-base sm:text-lg font-semibold">
                  Single-page launch
                </h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                A focused landing page for a product, service or event that
                explains what you do and nudges people to take action.
              </p>
              <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-1.5">
                <li>• 1 long-scrolling page</li>
                <li>• Mobile-first, responsive layout</li>
                <li>• Simple contact or signup flow</li>
              </ul>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                Often ~1–2 weeks from content-ready to launch.
              </p>
            </div>

            {/* 2 */}
            <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-500/60 bg-emerald-50/80 dark:bg-emerald-950/40 backdrop-blur-xl p-5 sm:p-6 flex flex-col gap-4 shadow-md">
              <div className="space-y-1.5">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                  Most common
                </p>
                <h3 className="text-base sm:text-lg font-semibold">
                  Small marketing site
                </h3>
              </div>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-100/90">
                A small but complete site (for example Home, About, Services and
                Contact) that explains who you are and how you can help.
              </p>
              <ul className="text-sm text-emerald-900/80 dark:text-emerald-100/90 space-y-1.5">
                <li>• 3–6 pages tailored to your content</li>
                <li>• Navigation that stays clear on mobile and desktop</li>
                <li>• Forms, basic SEO setup, analytics integration</li>
              </ul>
              <p className="mt-2 text-xs text-emerald-900/80 dark:text-emerald-200/80">
                Usually ~2–4 weeks depending on content and number of pages.
              </p>
            </div>

            {/* 3 */}
            <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-950/70 backdrop-blur-xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
              <div className="space-y-1.5">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                  Custom
                </p>
                <h3 className="text-base sm:text-lg font-semibold">
                  Web app / refactor
                </h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                For dashboards, small tools, MVPs or existing codebases that
                need to be cleaned up, modernised or made easier to maintain.
              </p>
              <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-1.5">
                <li>• Component-driven architecture</li>
                <li>• API integrations, dynamic content</li>
                <li>• Performance & accessibility improvements</li>
              </ul>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                Scoped together based on current state and feature list.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I NEED FROM YOU */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-3 text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
              Collaboration
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              What I need from you
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto sm:mx-0">
              Smooth projects don&apos;t need dozens of calls. They just need a
              clear goal, realistic expectations and someone on your side who
              can make decisions.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/70 p-5 sm:p-6 space-y-2">
              <h3 className="text-base font-semibold">A clear goal</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Why the site exists, who it&apos;s for, and what would make the
                project a success in your eyes.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/70 p-5 sm:p-6 space-y-2">
              <h3 className="text-base font-semibold">
                Content & quick feedback
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Text, images and branding (if you have them), plus someone who
                can review and respond within a few days.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/70 p-5 sm:p-6 space-y-2">
              <h3 className="text-base font-semibold">Realistic timing</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                If there&apos;s a hard deadline, we&apos;ll work backwards from
                it. If not, we&apos;ll set a calm but steady schedule together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 pb-20 sm:pb-24">
        <div className="mx-auto max-w-5xl flex flex-col gap-8 lg:flex-row">
          {/* FAQ */}
          <div className="flex-1 space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
              FAQ
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              A few quick answers
            </h2>

            <div className="space-y-3">
              <details className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/70 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <span>How long does a project usually take?</span>
                  <span className="text-xs text-zinc-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  Single-page sites are often done in around 1–2 weeks once
                  content is ready. Small marketing sites usually take 2–4
                  weeks. Anything more complex depends on scope — I&apos;ll give
                  you a realistic range before we start.
                </div>
              </details>

              <details className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/70 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <span>Can you work with my existing site or design?</span>
                  <span className="text-xs text-zinc-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  Yes. I can rebuild an existing design in a modern stack, or
                  refactor your current site to be faster, clearer and easier to
                  maintain without rebuilding everything from scratch.
                </div>
              </details>

              <details className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/70 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <span>Do you help with copy and structure?</span>
                  <span className="text-xs text-zinc-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  I can help you shape, shorten and structure your content so it
                  matches the design and is easy to scan. For deeper brand
                  messaging, I&apos;m happy to collaborate with a dedicated
                  copywriter.
                </div>
              </details>
            </div>
          </div>

          {/* CTA CARD */}
          <div className="flex-1">
            <div className="relative h-full">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-emerald-400/40 via-sky-500/35 to-indigo-500/40 opacity-80 blur-xl dark:opacity-70" />
              <div className="relative rounded-3xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-2xl px-6 py-7 sm:px-7 sm:py-8 h-full flex flex-col justify-between shadow-[0_18px_60px_rgba(15,23,42,0.45)]">
                <div className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                    Next step
                  </p>
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                    Tell me a bit about what you&apos;re building
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
                    A short message is enough: what you need, who it&apos;s for,
                    any deadlines, and links to anything that already exists.
                    I&apos;ll reply with thoughts, questions and a suggested way
                    to move forward.
                  </p>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <Link href="/contact">
                    <button
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm sm:text-base font-medium 
                        border border-zinc-300/80 dark:border-zinc-700/80 
                        bg-zinc-50/90 dark:bg-zinc-900/70 
                        hover:bg-white dark:hover:bg-black 
                        transition-all shadow-sm hover:shadow-md"
                    >
                      Use the contact form
                      <span aria-hidden>↗</span>
                    </button>
                  </Link>

                  {/* Replace mailto with your real email */}
                  <a
                    href="mailto:contact@pkarabetsos.com"
                    className="block text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 underline-offset-4 hover:underline text-center"
                  >
                    or email me directly at contact@pkarabetsos.com
                  </a>

                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500 text-center mt-1">
                    I usually reply within 1–2 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
