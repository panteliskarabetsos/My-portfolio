"use client";

import { motion, useCycle } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [colors, setColors] = useCycle(
    "bg-orange-400",
    "bg-amber-400",
    "bg-rose-400",
    "bg-yellow-400"
  );
  const [darkColors, setDarkColors] = useCycle(
    "bg-indigo-500",
    "bg-purple-600",
    "bg-blue-500",
    "bg-fuchsia-600"
  );

  const activeTheme = theme === "system" ? resolvedTheme : theme;

  useEffect(() => {
    if (!activeTheme) return;

    setMounted(true);

    const interval = setInterval(() => {
      activeTheme === "dark" ? setDarkColors() : setColors();
    }, 4000);

    return () => clearInterval(interval);
  }, [activeTheme, setColors, setDarkColors]);

  if (!mounted || !activeTheme) {
    return (
      <main className="min-h-screen bg-background text-foreground font-sans transition-colors overflow-hidden">
        {/* Prevents early render before hydration */}
        <div className="opacity-0 pointer-events-none" />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground font-sans transition-colors overflow-hidden">
      {/* Soft background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 
        bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.16),_transparent_55%)] 
        dark:bg-[radial-gradient(circle_at_top,_rgba(250,250,250,0.04),_transparent_60%)]"
      />

      {/* Animated Blob */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none transition-colors duration-1000"
      >
        <div
          className={`w-[540px] h-[540px] sm:w-[640px] sm:h-[640px] rounded-full
            blur-[70px] dark:blur-[110px]
            opacity-70 dark:opacity-55
            mix-blend-multiply dark:mix-blend-screen
            transition-all duration-1000
            ${activeTheme === "dark" ? darkColors : colors}`}
        />
      </motion.div>

      {/* HERO */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left: copy + CTAs */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/60 px-4 py-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500" />
                Portfolio & web studio
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight 
                  bg-clip-text text-transparent 
                  bg-gradient-to-r from-emerald-400 via-indigo-500 to-fuchsia-500"
              >
                I design and build
                <span className="block mt-1">modern web experiences.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-sm sm:text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Clean, fast and minimal websites and web apps for people,
                products and small businesses who want a calm, solid presence
                online.
              </motion.p>

              {/* Small highlight chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-[11px] sm:text-xs"
              >
                <span className="rounded-full px-3 py-1 border border-emerald-200/70 dark:border-emerald-500/40 bg-emerald-50/60 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-200">
                  Responsive & accessible
                </span>
                <span className="rounded-full px-3 py-1 border border-indigo-200/70 dark:border-indigo-500/40 bg-indigo-50/60 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-200">
                  Next.js & React based
                </span>
                <span className="rounded-full px-3 py-1 border border-pink-200/70 dark:border-pink-500/40 bg-pink-50/60 dark:bg-pink-500/10 text-pink-700 dark:text-pink-200">
                  Thoughtful, minimal UI
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-5 mt-4"
              >
                <Link href="/work-with-me">
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 18px 45px rgba(15, 23, 42, 0.45)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-7 py-3 sm:px-8 sm:py-3.5 rounded-full text-sm sm:text-base font-medium text-white 
                      bg-gradient-to-r 
                      ${
                        activeTheme === "dark"
                          ? "from-indigo-500 via-violet-500 to-fuchsia-600 hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-600"
                          : "from-amber-400 via-orange-400 to-pink-400 hover:from-amber-500 hover:via-orange-500 hover:to-pink-500"
                      } 
                      transition-all shadow-xl backdrop-blur-xl border border-white/10`}
                  >
                    Start a project
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
                    View portfolio
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right: small “studio card” */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1 w-full max-w-md lg:max-w-sm"
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-emerald-400/40 via-indigo-500/40 to-fuchsia-500/40 opacity-70 blur-xl dark:opacity-60" />
                {/* Card */}
                <div className="relative rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-950/70 backdrop-blur-2xl px-6 py-6 sm:px-7 sm:py-7 shadow-[0_18px_60px_rgba(15,23,42,0.28)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
                        Web design & build
                      </p>
                      <p className="mt-2 text-lg font-semibold">
                        Calm, considered interfaces.
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-400 via-sky-500 to-indigo-500 flex items-center justify-center text-white text-xl">
                      ✦
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="space-y-1.5">
                      <p className="font-medium text-zinc-700 dark:text-zinc-100 text-[11px] uppercase tracking-[0.16em]">
                        Focus
                      </p>
                      <p>Portfolios, studios, services, small products.</p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="font-medium text-zinc-700 dark:text-zinc-100 text-[11px] uppercase tracking-[0.16em]">
                        Stack
                      </p>
                      <p>Next.js, React, Tailwind, modern tooling.</p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-zinc-200/70 dark:border-zinc-800/80 pt-4 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 dark:bg-emerald-500 animate-pulse" />
                      Currently taking on new projects
                    </span>
                    <Link
                      href="/work-with-me"
                      className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Let&apos;s talk →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col gap-3 text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
              Services
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              What I can build for you
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto sm:mx-0">
              From focused one-pagers to more complex web apps, I help you turn
              ideas into clear, functional and good-looking products.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* 1 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-xl p-5 sm:p-6 space-y-3 shadow-sm hover:shadow-xl hover:border-emerald-200/70 dark:hover:border-emerald-500/50"
            >
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
                <span className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[11px]">
                  01
                </span>
                Custom websites & portfolios
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Unique sites for individuals, creators and teams who want to
                present their work and story in a clean, modern way.
              </p>
              <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-1.5">
                <li>• Responsive, accessible layouts</li>
                <li>• Minimal, focused design</li>
                <li>• Easy to update and extend</li>
              </ul>
            </motion.div>

            {/* 2 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-xl p-5 sm:p-6 space-y-3 shadow-sm hover:shadow-xl hover:border-amber-200/70 dark:hover:border-amber-500/50"
            >
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
                <span className="h-5 w-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-[11px]">
                  02
                </span>
                Landing pages & one-pagers
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Launch pages for products, events or services that explain what
                you do in a few clear sections and drive action.
              </p>
              <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-1.5">
                <li>• Simple structure that tells a story</li>
                <li>• Conversion-focused layout</li>
                <li>• Ready for analytics and A/B tests</li>
              </ul>
            </motion.div>

            {/* 3 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-xl p-5 sm:p-6 space-y-3 shadow-sm hover:shadow-xl hover:border-indigo-200/70 dark:hover:border-indigo-500/50"
            >
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
                <span className="h-5 w-5 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-[11px]">
                  03
                </span>
                Web apps & prototypes
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Interactive tools, dashboards and MVPs built with modern stacks,
                ready to connect to APIs and real data.
              </p>
              <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-1.5">
                <li>• Component-driven architecture</li>
                <li>• Next.js / React foundations</li>
                <li>• Designed to scale with your idea</li>
              </ul>
            </motion.div>

            {/* 4 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-xl p-5 sm:p-6 space-y-3 shadow-sm hover:shadow-xl hover:border-rose-200/70 dark:hover:border-rose-500/50"
            >
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
                <span className="h-5 w-5 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center text-[11px]">
                  04
                </span>
                Improvements, audits & refactors
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Already have a site? I can review performance, structure and UX,
                then help you clean things up without starting from zero.
              </p>
              <ul className="text-sm text-zinc-500 dark:text-zinc-400 space-y-1.5">
                <li>• Performance & accessibility checks</li>
                <li>• UX and content recommendations</li>
                <li>• Step-by-step refactor plan</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center sm:text-left space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
              Process
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              How working together looks
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto sm:mx-0">
              A simple, transparent process from first message to launch, with
              no unnecessary jargon or surprises.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/60 p-5 sm:p-6 space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                01 · Understand
              </p>
              <h3 className="text-base font-semibold">
                Goals, content & budget
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                We talk about what you need the website to do, who it&apos;s
                for, what content you have and what constraints we should
                respect.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/60 p-5 sm:p-6 space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                02 · Design & build
              </p>
              <h3 className="text-base font-semibold">
                Structure, design, implementation
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                I propose a structure and visual direction. Once we align, I
                build it in code, sharing progress regularly so we can adjust
                early.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/60 p-5 sm:p-6 space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                03 · Launch & after
              </p>
              <h3 className="text-base font-semibold">Deploy & iterate</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                We launch the site, connect the tools you need (analytics,
                forms, etc.), and keep improving if you want ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO TEASER */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20 pb-20 sm:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-zinc-200/70 dark:border-zinc-800/80 bg-gradient-to-r from-white/80 via-white/70 to-zinc-50/80 dark:from-zinc-950/80 dark:via-zinc-950/70 dark:to-zinc-900/80 backdrop-blur-2xl px-6 py-8 sm:px-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_18px_60px_rgba(15,23,42,0.35)]">
            <div className="space-y-3 max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                Work
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Selected work & experiments
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
                Explore projects, prototypes and side experiments. This is where
                I test ideas, refine flows and push how I build for the web.
              </p>
            </div>
            <Link href="/projects">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-medium 
                  border border-zinc-300/80 dark:border-zinc-700/80 
                  bg-zinc-50/90 dark:bg-zinc-900/70 
                  hover:bg-white dark:hover:bg-black 
                  transition-all shadow-sm hover:shadow-md"
              >
                Browse projects
                <span aria-hidden>↗</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
