"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Code,
  BrainCog,
  Download,
  Sparkles,
  GraduationCap,
  Globe2,
  Mail,
  Github,
  Linkedin,
  CalendarDays,
  Rocket,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

export default function About() {
  // Motion helpers
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-20% 0px -10% 0px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  // Timeline + scroll progress
  const tlRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: tlRef,
    offset: ["start 0.9", "end 0.2"],
  });

  const timeline = [
    {
      date: "2022",
      title: "Started building & exploring",
      text: "Began developing web apps and a wide range of university projects, from low-level code to full-stack prototypes.",
      icon: <Briefcase className="h-4 w-4" />,
      tags: ["Web", "Python", "Java", "C/C++", "JavaScript"],
    },
    {
      date: "2023",
      title: "Started M.Eng.",
      text: "Joined the M.Eng. in Informatics & Computer Engineering at the University of West Attica.",
      icon: <GraduationCap className="h-4 w-4" />,
      tags: ["Athens", "UNIWA"],
    },
    {
      date: "2025",
      title: "Final year of M.Eng.",
      text: "Completing my final year, focusing on software engineering, systems and cybersecurity.",
      icon: <Rocket className="h-4 w-4" />,
      tags: ["Master of Engineering", "UNIWA"],
    },
  ];

  const certificates = [
    {
      name: "Career Essentials in Cybersecurity",
      issuer: "Microsoft",
      year: "2025",
      url: "https://www.linkedin.com/learning/certificates/2ea8615ffb07e941052c943470d765532c4e194d15fa52255461b95ed28484ad",
    },
    {
      name: "Career Essentials in Data Analysis",
      issuer: "Microsoft",
      year: "2025",
      url: "https://www.linkedin.com/learning/certificates/afa9ab76624e5e327efa56ccd455ec4cf063ad7e239a3e30dc251f2f3b3d2084",
    },
    {
      name: "Career Essentials in Generative AI",
      issuer: "Microsoft",
      year: "2025",
      url: "https://www.linkedin.com/learning/certificates/a1aa2bff8f1da79a4dd427eb3b62593862480b02e8ef3d8a7079580d34056b10",
    },
    {
      name: "Career Essentials in GitHub",
      issuer: "GitHub",
      year: "2025",
      url: "https://www.linkedin.com/learning/certificates/03b7d9e09872660a0398fd3c5e2ca2097927210c1718c80c0387e0db363b29ff",
    },
    {
      name: "Workshop on Cybersecurity in Critical Sectors",
      issuer: "University of Piraeus & University of West Attica",
      year: "2025",
    },
    {
      name: "Career Essentials in Software Development",
      issuer: "Microsoft",
      year: "2025",
      url: "https://www.linkedin.com/learning/certificates/a577679ee6bdd94aaaf96fe64f7301bea1d29a4a13a8e2b8be9908e28f12480b",
    },
  ];

  // Active year for sticky badge
  const [activeYear, setActiveYear] = useState(timeline[0]?.date ?? "");

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background grid + blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]" />
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.35, scale: [0.95, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        className="pointer-events-none absolute -top-40 -left-40 z-0 h-[620px] w-[620px] rounded-full blur-[160px]
                   bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300
                   dark:from-pink-500 dark:via-purple-600 dark:to-indigo-500"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.3, scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse" }}
        className="pointer-events-none absolute -bottom-44 -right-40 z-0 h-[540px] w-[540px] rounded-full blur-[140px]
                   bg-gradient-to-br from-rose-300 via-amber-200 to-emerald-200
                   dark:from-indigo-500 dark:via-sky-500 dark:to-cyan-400"
      />

      {/* ===== Content ===== */}
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-14 px-6 pb-28 pt-32 md:px-8 md:pt-40">
        {/* HERO */}
        <header className="grid items-center gap-8 md:grid-cols-[auto,1fr] md:gap-10">
          <motion.div
            {...fadeUp}
            className="relative mx-auto h-28 w-28 overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-lg md:h-36 md:w-36 dark:ring-white/10"
          >
            <Image
              src="/images/profile.jpg"
              alt="Pantelis Karabetsos portrait"
              fill
              sizes="144px"
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-zinc-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              OPEN TO COLLABORATION
            </div>

            <h1 className="mt-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              Hi, I’m Pantelis.
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Final-year Informatics & Computer Engineering student at the
              University of West Attica, exploring software engineering, systems
              and cybersecurity — and how they come together in real-world
              products.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
              >
                View my work →
              </Link>
              {/* <Link
                href="/Resume.pdf"
                disabled={true}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/20"
              >
                <Download className="h-4 w-4" />
                Download resume
              </Link> */}
            </div>

            {/* Socials */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                href="mailto:contact@pkarabetsos.com"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
              >
                <Mail className="h-4 w-4" /> Contact
              </Link>
              <Link
                href="https://github.com/panteliskarabetsos"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
              >
                <Github className="h-4 w-4" /> GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/panteliskarabetsos/"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </Link>
            </div>
          </motion.div>
        </header>

        {/* QUICK STATS */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="space-y-3"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-zinc-500 dark:text-zinc-400">
            Snapshot
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                icon: <GraduationCap className="h-5 w-5" />,
                label: "Degree",
                value:
                  "M.Eng. Informatics & Computer Engineering (in progress)",
              },
              {
                icon: <Code className="h-5 w-5" />,
                label: "Interests",
                value: "Systems · Security · Software",
              },
              {
                icon: <Globe2 className="h-5 w-5" />,
                label: "Based in",
                value: "Athens, GR",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <div className="mb-2 inline-flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {item.icon}
                  <span className="font-medium uppercase tracking-[0.16em]">
                    {item.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {item.value}
                </p>
                <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-2xl transition group-hover:opacity-100" />
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ABOUT TEXT */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="relative rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
        >
          <Sparkles className="absolute -left-3 -top-3 h-6 w-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            About me
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              I’m a final-year M.Eng. student who enjoys understanding how
              systems are built end-to-end — from low-level details to the parts
              users actually touch.
            </p>
            <p>
              Lately I’ve been focused on writing cleaner, safer code, improving
              performance where it matters, and treating security as a default
              requirement rather than an afterthought.
            </p>
          </div>
        </motion.div>

        {/* FOCUS AREAS */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.25 }}
          className="relative space-y-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-zinc-500 dark:text-zinc-400">
            What I like working on
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: <LayoutDashboard className="h-5 w-5 text-indigo-500" />,
                title: "Systems thinking",
                text: "Understanding how pieces connect across client, server, and infrastructure — and designing for the whole flow.",
              },
              {
                icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />,
                title: "Security mindset",
                text: "Curious about threat models, hardening, and building features that are safe-by-default.",
              },
              {
                icon: <Code className="h-5 w-5 text-orange-500" />,
                title: "Code quality",
                text: "Readable, testable code with an eye on performance and a preference for simplicity over cleverness.",
              },
              {
                icon: <BrainCog className="h-5 w-5 text-purple-500" />,
                title: "Continuous learning",
                text: "From distributed systems and algorithms to hands-on security labs and new tools.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <div className="mb-2 inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {item.icon}
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {item.title}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* TOOLBOX */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="space-y-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-zinc-500 dark:text-zinc-400">
            Toolbox
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Languages & scripting",
                items: ["Python", "C/C++", "Java", "JavaScript", "HTML/CSS"],
              },
              {
                title: "Security & infra",
                items: [
                  "Linux",
                  "Docker",
                  "Git",
                  "Wireshark",
                  "Nginx",
                  "Command line",
                ],
              },
              {
                title: "Data & workflow",
                items: ["PostgreSQL", "SQLite", "Regex", "CI/CD", "Testing"],
              },
            ].map((group, i) => (
              <div
                key={i}
                className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {group.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* TIMELINE */}
        <motion.section
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.35 }}
          ref={tlRef}
          className="relative"
        >
          <div className="relative mx-auto max-w-5xl rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Timeline
              </h3>
              <span className="sticky top-2 ml-auto hidden rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur md:inline-flex dark:border-white/10 dark:bg-white/10 dark:text-zinc-200">
                {activeYear}
              </span>
            </div>

            {/* rail */}
            <div className="relative mt-8">
              <div className="pointer-events-none absolute left-1/2 top-0 -z-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-zinc-300/70 to-transparent dark:via-white/20 md:block" />
              <motion.div
                style={{ scaleY: scrollYProgress }}
                className="pointer-events-none absolute left-1/2 top-0 z-0 hidden h-full w-[3px] origin-top -translate-x-1/2 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 md:block"
              />

              <ol className="space-y-10 md:space-y-16" aria-label="Timeline">
                {timeline.map((e, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <li key={i} className="relative md:flex md:items-center">
                      {/* center marker */}
                      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                        <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/40 bg-white shadow-md dark:border-white/20 dark:bg-zinc-900">
                          <span className="absolute h-5 w-5 animate-ping rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 opacity-20" />
                          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500" />
                        </span>
                      </div>

                      <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.05 * i,
                        }}
                        onViewportEnter={() => setActiveYear(e.date)}
                        className={`relative rounded-2xl border border-zinc-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 md:w-[calc(50%-2rem)] ${
                          isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                        }`}
                      >
                        {/* connector rail */}
                        <span
                          aria-hidden
                          className={`pointer-events-none absolute top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-zinc-300/70 to-transparent dark:from-white/20 md:block ${
                            isLeft ? "right-0" : "left-0 rotate-180"
                          }`}
                        />

                        <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4" />
                            <span>{e.date}</span>
                          </span>
                          <span className="hidden rounded-full border border-zinc-200 bg-white/70 px-2 py-0.5 text-[10px] font-medium text-zinc-600 md:inline-flex dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                            {e.icon}
                          </span>
                        </div>

                        <h4 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
                          {e.title}
                        </h4>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                          {e.text}
                        </p>
                        {e.tags?.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {e.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-zinc-200 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </motion.article>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </motion.section>

        {/* CERTIFICATES */}
        <motion.section
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.38 }}
          className="relative"
        >
          <div className="relative mx-auto max-w-5xl rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Certificates & workshops
              </h3>
              <span className="hidden text-xs text-zinc-500 md:inline dark:text-zinc-400">
                Always learning, one course at a time.
              </span>
            </div>

            {certificates.length > 0 ? (
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {certificates.map((c, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-zinc-200 bg-white/90 p-4 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
                  >
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {c.name}
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {c.issuer}
                      {c.year ? ` • ${c.year}` : ""}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      {c.url && (
                        <Link
                          href={c.url}
                          target="_blank"
                          className="rounded-full border border-zinc-200 bg-white/80 px-2.5 py-0.5 font-medium underline-offset-2 hover:bg-zinc-50 hover:underline dark:border-white/10 dark:bg-white/5"
                        >
                          View credential
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-400">
                No certificates yet. Add them in the{" "}
                <code className="rounded bg-white/60 px-1 py-0.5 dark:bg-white/10">
                  certificates
                </code>{" "}
                array in this file.
              </div>
            )}
          </div>
        </motion.section>

        {/* VALUES */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="relative rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
        >
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            Values
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "Clarity",
              "Reliability",
              "Curiosity",
              "Respect for users",
              "Craft",
            ].map((v) => (
              <span
                key={v}
                className="rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
              >
                {v}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.45 }}
          className="flex flex-col items-center justify-center gap-3 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Want the short version of all this?
          </p>
          <Link
            href="/projects"
            className="inline-block rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
          >
            Browse projects →
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
