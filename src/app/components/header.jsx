"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  weight: "700",
  subsets: ["latin"],
});

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const activeTheme = theme === "system" ? resolvedTheme : theme;

  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleTheme = () => setTheme(activeTheme === "dark" ? "light" : "dark");

  // Light vs dark styling
  const shellClasses =
    activeTheme === "dark"
      ? "border-zinc-800/70 bg-zinc-950/90 shadow-[0_18px_45px_rgba(0,0,0,0.75)]"
      : "border-zinc-200/80 bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.14)]";

  const themeButtonClasses =
    activeTheme === "dark"
      ? "border-zinc-700/70 bg-zinc-900/80 text-zinc-100 hover:bg-zinc-800/80"
      : "border-zinc-300/80 bg-zinc-50 text-zinc-800 hover:bg-zinc-100";

  const ctaClasses =
    activeTheme === "dark"
      ? "border-zinc-700 text-zinc-200 hover:border-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/5"
      : "border-zinc-300 text-zinc-800 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50";

  return (
    <>
      {/* Logo */}
      <div className="fixed left-6 top-[46px] z-50">
        <Link
          href="/"
          className={`
            no-cursor-label
            text-2xl sm:text-3xl font-extrabold tracking-tight
            bg-clip-text text-transparent
            bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500
            hover:opacity-90 transition-opacity duration-300
            animate-gradient
            ${urbanist.className}
          `}
        >
          Pantelis
        </Link>
      </div>

      {/* Desktop nav */}
      <div className="pointer-events-none fixed left-1/2 top-6 z-50 hidden -translate-x-1/2 md:block">
        <header
          className={`pointer-events-auto relative rounded-full px-8 py-3.5 backdrop-blur-2xl ${shellClasses}`}
        >
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-6 text-sm font-medium tracking-tight text-foreground"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative inline-flex items-center transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                <span>{link.name}</span>
                {/* Active underline */}
                <span
                  className={`
                    absolute -bottom-1 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full 
                    bg-gradient-to-r from-emerald-400 via-indigo-500 to-fuchsia-500 
                    transition-opacity duration-200
                    ${
                      isActive(link.href)
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-60"
                    }
                  `}
                />
              </Link>
            ))}

            {/* Divider */}
            <span className="mx-1 h-5 w-px bg-gradient-to-b from-transparent via-zinc-400/40 to-transparent" />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`no-cursor-label inline-flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition ${themeButtonClasses}`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeTheme}
                  initial={{ opacity: 0, rotate: -45, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeTheme === "dark" ? (
                    <Sun size={18} />
                  ) : (
                    <Moon size={18} />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Work with me – minimal, but not “disabled” */}
            <Link
              href="/work-with-me"
              className={`no-cursor-label inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${ctaClasses}`}
            >
              Work with me
            </Link>
          </nav>
        </header>
      </div>

      {/* Mobile nav toggle */}
      <div className="fixed right-6 top-7 z-50 md:hidden">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300/80 bg-background/85 shadow-lg backdrop-blur transition hover:bg-background/70 dark:border-zinc-800/70"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-4 right-4 top-20 z-40 rounded-2xl border border-zinc-200/80 bg-background/95 p-5 shadow-2xl backdrop-blur-xl dark:border-zinc-800/80 md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="space-y-1.5">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                      : "text-zinc-700 hover:bg-zinc-100/80 dark:text-zinc-200 dark:hover:bg-zinc-900/70"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 h-px bg-gradient-to-r from-transparent via-zinc-400/60 to-transparent dark:via-zinc-600/60" />

            <div className="mt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileOpen(false);
                }}
                className="flex items-center justify-between rounded-xl bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                <span>
                  {activeTheme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeTheme}
                    initial={{ opacity: 0, rotate: -45, scale: 0.9 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950"
                  >
                    {activeTheme === "dark" ? (
                      <Sun size={17} />
                    ) : (
                      <Moon size={17} />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>

              <Link
                href="/work-with-me"
                onClick={() => setMobileOpen(false)}
                className={`no-cursor-label inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-medium transition-colors ${ctaClasses}`}
              >
                Work with me
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
