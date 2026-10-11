'use client';

import Link from "next/link";
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

  return (
    <>
      {/* Logo */}
      <div className="fixed top-[48px] left-6 z-50">
        <Link href="/" legacyBehavior>
          <a
            className={`
              no-cursor-label
              text-2xl sm:text-3xl font-extrabold tracking-tight
              bg-clip-text text-transparent
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
              hover:opacity-90 transition-colors duration-300
              animate-gradient
              ${urbanist.className}
            `}
          >
            Pantelis
          </a>
        </Link>
      </div>

      {/*Desktop Nav */}
      <div className="hidden md:block fixed top-8 left-1/2 -translate-x-1/2 transform z-50">
        <header className="relative px-10 py-4 rounded-full border border-white/10 shadow backdrop-blur-2xl bg-background/50">
          <div className="absolute inset-0 rounded-full border border-primary/20 blur-[8px] pointer-events-none z-0" />
          <div className="relative z-10 flex items-center gap-8 text-base text-foreground font-medium tracking-tight">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
              className="no-cursor-label ml-4 p-2 rounded-full hover:bg-muted-foreground/10 transition"
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
                  {activeTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </header>
      </div>

      {/*Mobile Nav Toggle Button */}
      <div className="md:hidden fixed top-9 right-6 z-50">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="p-2 rounded-full bg-background/80 border border-white/10 backdrop-blur shadow hover:bg-background/60 transition"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/*Mobile Nav Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 left-6 z-40 bg-background/90 border border-white/10 rounded-2xl shadow-lg backdrop-blur p-6 space-y-4 md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-base text-foreground font-medium hover:text-primary transition"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setTheme(activeTheme === "dark" ? "light" : "dark");
                setMobileOpen(false);
              }}
              className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeTheme}
                  initial={{ opacity: 0, rotate: -45, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="block"
                >
                  {activeTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </motion.span>
              </AnimatePresence>
              {activeTheme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
