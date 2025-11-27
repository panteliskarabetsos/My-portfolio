"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [lastTrigger, setLastTrigger] = useState(null); // to restore focus
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState(new Set());
  const [sortBy, setSortBy] = useState("featured"); // 'featured' | 'title'

  // --- DATA -----------------------------------------------------------------
  const projects = [
    {
      id: 1,
      title: "Oasis - Agrotourism and Wellness Booking Platform",
      description: `A modern, ambient booking platform for wellness and agritourism experiences across Crete.\nUsers can explore experiences, check real-time availability, and book their spot in a seamless, mobile-first environment.\nAdmins can manage experiences, clients, and schedules in one place.`,
      tech: [
        "Next.js 14",
        "TailwindCSS",
        "Framer Motion",
        "Node.js",
        "Prisma ORM",
        "PostgreSQL",
        "REST API",
        "NextAuth.js",
        "Stripe",
        "Recaptcha",
      ],
      image: "/images/oasis.png",
      github: "https://github.com/panteliskarabetsos/oasis",
      demo: "https://youroasis.gr/",
      featured: true,
    },
    {
      id: 2,
      title: "Dr. Zisis Website",
      description:
        "A professional, responsive portfolio site built for Dr. Marios Zisis, a recent medical graduate with a focus on cardiology and research. Highlights academic achievements, clinical interests, and recommendations as a clean digital CV.",
      tech: ["React", "TailwindCSS", "Vercel", "Framer Motion", "Next.js"],
      image: "/images/drzisis.png",
      github: "https://github.com/panteliskarabetsos/drzisis-portfolio",
      demo: "https://www.drzisis.com/",
      featured: true,
    },
    {
      id: 3,
      title: "Web Crawler & Search Engine",
      description:
        "Python-based mini search engine that crawls Wikipedia articles, builds an inverted index, and supports Boolean queries with ranking (TF-IDF, BM25, VSM). Includes full text preprocessing with NLTK and an interactive CLI.",
      tech: [
        "Python",
        "NLTK",
        "BeautifulSoup",
        "NumPy",
        "Regex",
        "Custom IR logic",
      ],
      image: "",
      github: "https://github.com/panteliskarabetsos/IR-Lab-Project",
      demo: "",
      featured: false,
    },
    {
      id: 4,
      title: "Unit Testing App in C#",
      description:
        "A C# application designed to demonstrate and validate core functionalities using NUnit. Focused on writing clean, testable logic and achieving good coverage through TDD-like practices.",
      tech: ["C#", ".NET", "NUnit", "Testing"],
      image: "",
      github: "https://github.com/panteliskarabetsos/PayrollApp",
      demo: "",
      featured: false,
    },
    {
      id: 5,
      title: "Personal Portfolio Website",
      description: `A fully custom, animated portfolio built with Next.js and TailwindCSS.\nIncludes scroll-animated sections, ambient visuals, and a live contact form with email API.\nFully responsive with light/dark theme and subtle micro-interactions.`,
      tech: [
        "Next.js",
        "TailwindCSS",
        "Framer Motion",
        "Nodemailer",
        "Next-Themes",
        "Lucide Icons",
      ],
      image: "/images/myportfolio.png",
      github: "https://github.com/panteliskarabetsos/My-portfolio",
      demo: "",
      featured: true,
    },
    {
      id: 6,
      title: "Dr. Kollia Website",
      description: `Custom website for an endocrinologist based in Athens. Combines a modern clinic portfolio with a booking system for patients.\nIncludes admin tools to manage appointments, patients and schedule.`,
      tech: [
        "Next.js",
        "TailwindCSS",
        "Supabase",
        "Nodemailer",
        "Next-Themes",
        "Lucide Icons",
        "Vercel Hosting",
      ],
      image: "/images/drkollia.png",
      github: "https://github.com/panteliskarabetsos/drkollia",
      demo: "https://drkollia.com/",
      featured: true,
    },
    {
      id: 7,
      title: "Apartment Booking App",
      description: `A full-stack apartment rental platform with a clean, intuitive UI.\n\n• Interactive search bar for city, dates, and guests.\n• Real-time availability via React + custom Node.js/Express backend.\n• Smooth UX with React Router, validation, and error handling.\n• Modular structure ready for auth, dashboards, and payments.`,
      tech: [
        "React",
        "TailwindCSS",
        "Framer Motion",
        "Node.js",
        "Express",
        "MongoDB",
        "REST API",
      ],
      image: "/images/booknow.png",
      github: "https://github.com/panteliskarabetsos/BookNow",
      demo: "https://book-now-amber.vercel.app/",
      featured: false,
    },
  ];

  const allTags = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filtered = useMemo(() => {
    let list = [...projects];

    // search
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      );
    }

    // tags
    if (activeTags.size > 0) {
      list = list.filter((p) => p.tech.some((t) => activeTags.has(t)));
    }

    // sort
    if (sortBy === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // featured first, then by id (stable-ish)
      list.sort((a, b) => {
        if (a.featured === b.featured) return a.id - b.id;
        return Number(b.featured) - Number(a.featured);
      });
    }

    return list;
  }, [projects, query, activeTags, sortBy]);

  // --- ACCESSIBILITY & UX ---------------------------------------------------
  const modalRef = useRef(null);

  useEffect(() => {
    // prevent body scroll when modal open
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  useEffect(() => {
    // focus first focusable in modal when opened
    if (selectedProject && modalRef.current) {
      const btn = modalRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      btn?.focus();
    }
  }, [selectedProject]);

  const handleOpen = (project, triggerEl) => {
    setLastTrigger(triggerEl);
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
    // restore focus to the trigger
    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
    }
  };

  const toggleTag = (tag) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  // prefers-reduced-motion respects users
  const transition = {
    duration: 0.6,
    ease: "easeOut",
  };

  const totalCount = projects.length;
  const resultCount = filtered.length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background font-sans text-foreground transition-colors duration-500">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]" />
      </div>

      <AnimatePresence>
        <motion.div
          aria-hidden
          initial={{ scale: 1, x: 0, y: 0, opacity: 0 }}
          animate={{
            opacity: 0.4,
            scale: [1, 1.05, 1],
            x: [0, 10, -10, 0],
            y: [0, -10, 10, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-40 -left-40 z-0 h-[600px] w-[600px] rounded-full blur-[160px]
                bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300
                dark:from-pink-500 dark:via-purple-600 dark:to-indigo-500"
        />
      </AnimatePresence>

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-28 pt-32 text-center md:px-8 md:pt-36">
        {/* HERO */}
        <div className="mx-auto max-w-4xl space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Selected projects
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent drop-shadow-md md:text-6xl"
          >
            My Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            From booking platforms and personal sites to internal tools and
            experiments. Each project taught me something about design,
            reliability, and the details that make interfaces feel calm.
          </motion.p>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-3xl border border-zinc-200 bg-white/80 p-4 text-left shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 md:flex-row md:items-center md:gap-6"
        >
          <div className="flex-1 space-y-2">
            <label
              htmlFor="search"
              className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
            >
              Search
            </label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, tech, or description…"
              className="w-full rounded-2xl border border-zinc-200 bg-white/90 px-4 py-2.5 text-sm shadow-sm outline-none ring-indigo-300/0 transition focus:border-indigo-300 focus:ring-4 dark:border-white/10 dark:bg-zinc-900/60"
            />
          </div>

          <div className="flex flex-col gap-2 md:w-56">
            <label
              htmlFor="sort"
              className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
            >
              Sort by
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white/90 px-3 py-2.5 text-sm shadow-sm outline-none ring-indigo-300/0 transition focus:border-indigo-300 focus:ring-4 dark:border-white/10 dark:bg-zinc-900/60"
            >
              <option value="featured">Featured first</option>
              <option value="title">Title A→Z</option>
            </select>
          </div>

          <div className="flex items-end justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400 md:w-40 md:flex-col md:items-end md:text-right">
            <span>
              Showing{" "}
              <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                {resultCount}
              </span>{" "}
              of {totalCount}
            </span>
            {activeTags.size > 0 && (
              <button
                onClick={() => setActiveTags(new Set())}
                className="text-[11px] font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-300"
              >
                Clear filters
              </button>
            )}
          </div>
        </motion.div>

        {/* Tag filter */}
        {/* <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 text-left"
        >
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            Filter by tech
          </span>
          {allTags.map((tag) => {
            const active = activeTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                  active
                    ? "border-indigo-400 bg-indigo-500 text-white shadow-sm"
                    : "border-zinc-200 bg-white/80 text-zinc-700 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                }`}
                aria-pressed={active}
              >
                {tag}
              </button>
            );
          })}
        </motion.div> */}

        {/* Grid */}
        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white/90 text-left shadow-sm ring-1 ring-black/0 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(88,28,135,0.35)] dark:border-white/10 dark:bg-white/5"
            >
              {/* Featured badge */}
              {project.featured && (
                <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-emerald-200 backdrop-blur dark:bg-black/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Featured
                </span>
              )}

              {project.image ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index < 3}
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-xs text-zinc-500 dark:text-zinc-400">
                  Preview unavailable
                </div>
              )}

              <div className="flex flex-col gap-3 p-6">
                <h3 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white">
                  {project.title}
                </h3>
                <p className="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>

                <div className="mt-1 flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-zinc-200 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="rounded-full border border-zinc-200 bg-white/80 px-2.5 py-1 text-[11px] text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  {project.demo && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
                    >
                      Live
                    </Link>
                  )}
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 dark:bg-white/10 dark:text-white dark:ring-white/10 dark:hover:bg-white/20"
                    >
                      GitHub
                    </Link>
                  )}
                  <button
                    onClick={(e) => handleOpen(project, e.currentTarget)}
                    className="ml-auto inline-flex items-center justify-center rounded-full bg-transparent px-3 py-2 text-xs font-medium text-indigo-600 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 dark:text-indigo-300"
                  >
                    View details →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-zinc-300 bg-white/60 p-10 text-center text-sm text-zinc-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
              No projects match your filters. Try clearing them or adjusting
              your search.
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-2 py-6 backdrop-blur-sm sm:px-4"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleClose();
            }}
          >
            <motion.div
              key="modal"
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/90 p-4 shadow-2xl backdrop-blur-xl dark:bg-zinc-950/80 sm:p-6"
            >
              {/* Ambient Glow */}
              <motion.div
                aria-hidden
                animate={{ scale: [1, 1.04, 1] }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute -inset-4 rounded-[2.2rem] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-20 blur-[110px]"
              />

              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute right-3 top-3 z-40 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black/80 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="relative z-10 space-y-6 text-sm sm:space-y-7 sm:text-base">
                <h2 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                  {selectedProject.title}
                </h2>

                {selectedProject.image && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/20 shadow-lg">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      width={1280}
                      height={720}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-3 whitespace-pre-wrap leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {selectedProject.description
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, idx) => (
                      <p key={idx}>{line.trim()}</p>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/20 bg-white/60 px-3 py-1 text-xs font-medium text-zinc-900 backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  {selectedProject.github && (
                    <Link
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-black shadow-md transition hover:opacity-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 sm:w-auto"
                    >
                      GitHub
                    </Link>
                  )}
                  {selectedProject.demo && (
                    <Link
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded-full bg-indigo-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 sm:w-auto"
                    >
                      Live site
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
