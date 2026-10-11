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
      description: `This project is a modern, ambient booking platform for wellness and agritourism experiences across Crete.\nUsers can explore experiences, check real-time availability, and book their spot in a seamless and mobile-friendly environment.\nThe platform focuses on simplicity, luxurious design and exceptional user experience. The admin can manage clients, the experiences and the schedule making it easy to keep track of everything.`,
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
        "A professional, modern, and responsive portfolio site built for Dr. Marios Zisis, a recent medical graduate with a passion for cardiology and research. Designed to highlight his academic achievements, clinical interests, and recommendations, the website serves as a digital CV and a platform for professional outreach.",
      tech: ["React", "TailwindCSS", "Vercel", "Framer Motion", "Next.js"],
      image: "/images/drzisis.png",
      github: "https://github.com/panteliskarabetsos/drzisis-portfolio",
      demo: "https://www.drzisis.com/",
      featured: false,
    },
    {
      id: 3,
      title: "Web Crawler & Search Engine",
      description:
        "A Python-based mini search engine that crawls Wikipedia articles, builds an inverted index, and supports Boolean queries with ranking options (TF-IDF, BM25, VSM). Includes full text preprocessing with NLTK and an interactive CLI for querying and evaluation.",
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
        "A C# application designed to demonstrate and validate core functionalities using unit tests with NUnit. Focused on writing clean, testable logic and achieving high code coverage through test-driven development (TDD) practices.",
      tech: ["C#", ".NET", "NUnit", "Testing"],
      image: "",
      github: "https://github.com/panteliskarabetsos/PayrollApp",
      demo: "",
      featured: false,
    },
    {
      id: 5,
      title: "Personal Portfolio Website",
      description: `A fully custom, animated portfolio built with Next.js and TailwindCSS.\nIncludes scroll-animated sections, ambient blobs and a live contact form with email API.\nFully responsive, with light/dark theme support and modern UI interactions.`,
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
      description: `A fully custom website built for Dr. Kollia, an endocrinologist based in Athens, Greece.\n In this website we built a modern portfolio for her and her clinic and also designed a booking system for her patients. The website have various of admin tools for managing appointments, patients and schedule.`,
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
      description: `A complete apartment rental platform designed and built with a full-stack architecture. Users can search, view, and book vacation rentals through a clean and intuitive interface.\n\n• Interactive Search Bar – Filter properties by city, date range, and guests.\n\n• Real-Time Availability – Built with React, MUI, date-fns, and custom Node.js/Express backend.\n\n• Smooth UX – Dynamic pages powered by React Router with form validation and error handling.\n\n• Scalable – Modular structure enables feature expansion like auth, dashboard, and payment systems.`,
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
      featured: true,
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
      // featured first, then original order
      list.sort((a, b) => Number(b.featured) - Number(a.featured));
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

  return (
    <main className="relative min-h-screen bg-background text-foreground font-sans transition-colors duration-500 overflow-hidden">
      {/* Decorative ambient blob */}
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
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none z-0
                bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300
                dark:from-pink-500 dark:via-purple-600 dark:to-indigo-500"
        />
      </AnimatePresence>

      <section className="relative z-10 flex flex-col items-center gap-10 px-6 pb-28 pt-40 text-center md:px-20">
        <div className="mx-auto max-w-4xl space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent drop-shadow-md md:text-7xl"
          >
            My Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            A journey through functional ideas and creative expression — one
            build at a time.
          </motion.p>

          {/* Controls */}
          <div className="mx-auto flex w-full max-w-5xl flex-col items-stretch gap-4 rounded-2xl border border-zinc-200/60 bg-white/60 p-3 backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:p-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">
                Search projects
              </label>
              <input
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, tech, or description…"
                className="w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-2 text-sm shadow-sm outline-none ring-indigo-300/0 transition focus:border-indigo-300 focus:ring-4 dark:border-white/10 dark:bg-zinc-900/60"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="sr-only">
                Sort projects
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-zinc-200 bg-white/80 px-3 py-2 text-sm shadow-sm outline-none ring-indigo-300/0 transition focus:border-indigo-300 focus:ring-4 dark:border-white/10 dark:bg-zinc-900/60"
              >
                <option value="featured">Featured first</option>
                <option value="title">Title A→Z</option>
              </select>
            </div>
          </div>

          {/* Tag filter */}
          {/* <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-2">
            {allTags.map((tag) => {
              const active = activeTags.has(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    active
                      ? "border-indigo-400 bg-indigo-500 text-white shadow"
                      : "border-zinc-200 bg-white/70 text-zinc-700 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                  }`}
                  aria-pressed={active}
                >
                  {tag}
                </button>
              );
            })}
            {activeTags.size > 0 && (
              <button
                onClick={() => setActiveTags(new Set())}
                className="rounded-full border border-transparent bg-zinc-100 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-200 dark:bg-white/10 dark:text-zinc-200 dark:hover:bg-white/20"
              >
                Clear filters
              </button>
            )}
          </div> */}
        </div>

        {/* Grid */}
        <div className="grid w-full max-w-6xl grid-cols-1 gap-10 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: index * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white/90 p-0 shadow-sm ring-1 ring-black/0 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(147,51,234,0.25)] dark:border-white/10 dark:bg-white/5"
            >
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
                <div className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-sm text-zinc-500 dark:text-zinc-400">
                  Preview unavailable
                </div>
              )}

              <div className="flex flex-col gap-3 p-6">
                <h3 className="text-left text-xl font-semibold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-white">
                  {project.title}
                </h3>
                <p className="line-clamp-2 text-left text-sm text-zinc-600 dark:text-zinc-400">
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

                <div className="mt-4 flex gap-3">
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
                    className="ml-auto inline-flex items-center justify-center rounded-full bg-transparent px-3 py-2 text-sm font-medium text-indigo-600 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 dark:text-indigo-300"
                  >
                    View details →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-400">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 py-6 backdrop-blur-sm sm:px-4"
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
              className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/80 p-4 shadow-2xl backdrop-blur-xl dark:bg-white/5 sm:p-6"
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
                className="pointer-events-none absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-20 blur-[100px]"
              />

              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute right-3 top-3 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/75 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="relative z-10 space-y-6 text-sm sm:space-y-8 sm:text-base">
                <h2 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-xl font-bold text-transparent sm:text-3xl">
                  {selectedProject.title}
                </h2>

                {selectedProject.image && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      width={1280}
                      height={720}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-3 whitespace-pre-wrap leading-relaxed text-zinc-800 dark:text-zinc-300">
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
                      className="rounded-full border border-white/10 bg-white/20 px-3 py-1 text-xs font-medium text-zinc-900 backdrop-blur dark:bg-white/10 dark:text-white"
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
                      Live
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
