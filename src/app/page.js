"use client";

import { motion, useCycle } from "framer-motion";
import { useTheme } from "next-themes";
import Header from "./components/header";
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
        {/* Prevents early render of the Header before hydration */}
        <div className="opacity-0 pointer-events-none"></div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground font-sans transition-colors overflow-hidden">
      {/* Animated Blob */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none transition-colors duration-1000"
      >
        <div
          className={`w-[600px] h-[600px] rounded-full
            blur-[70px] dark:blur-[110px]
            opacity-80 dark:opacity-60
            mix-blend-multiply dark:mix-blend-screen
            transition-all duration-1000
            ${activeTheme === "dark" ? darkColors : colors}`}
        />
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center gap-8 sm:gap-12 px-4 sm:px-6 md:px-20 pt-24 sm:pt-32 pb-20 sm:pb-24 min-h-[calc(100vh-6rem)]">
        <div className="space-y-8 max-w-3xl">
          {/* Gradient Headline */}
          <div className="text-5xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-indigo-500 via-purple-500 to-fuchsia-500 animate-gradient">
            {["Engineer", "Builder", "Dreamer"].map((word, index) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.3,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="my-1"
              >
                {word}
              </motion.div>
            ))}
          </div>

          {/*  Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-zinc-400 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed tracking-wide"
          >
            Building the brains behind the interface.
          </motion.p>

          {/* Contact Button */}
          <Link href="/projects">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                type: "spring",
                bounce: 0.25,
              }}
              className={`mt-6 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-white font-semibold 
                transition-all bg-gradient-to-r 
                ${
                  activeTheme === "dark"
                    ? "from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                    : "from-amber-400 to-pink-400 hover:from-amber-500 hover:to-pink-500"
                } 
                hover:opacity-90 
                shadow-lg ring-2 ring-transparent hover:ring-amber-200 dark:hover:ring-indigo-200 
                backdrop-blur-xl text-sm sm:text-base lg:text-lg`}
            >
              View Projects
            </motion.button>
          </Link>
        </div>
      </section>
    </main>
  );
}
