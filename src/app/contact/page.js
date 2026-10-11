"use client";

import { motion } from "framer-motion";
import Header from "../components/header";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Contact() {
  // UI state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | spam
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [messageLen, setMessageLen] = useState(0);

  // Honeypot for bots
  const [hpot, setHpot] = useState(""); // if filled -> spam

  const MAX_LEN = 1200;
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, []);

  useEffect(() => {
    setMessageLen(form.message.length);
  }, [form.message]);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!emailRegex.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.message.trim()) next.message = "Please write a short message.";
    if (form.message.length > MAX_LEN)
      next.message = `Keep it under ${MAX_LEN} characters.`;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("idle");

    if (hpot) {
      setStatus("spam");
      return;
    }

    if (!validate()) return;

    setStatus("sending");

    const controller = new AbortController();
    const to = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      clearTimeout(to);
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (_) {
      setStatus("error");
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-20% 0px -10% 0px" },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact@pkarabetsos.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <Header />

      {/* Background grid + blobs (SSR‑safe) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]" />
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0.2, scale: 0.9 }}
        animate={{ opacity: 0.35, scale: [0.95, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
        className="pointer-events-none absolute -top-40 -left-40 z-0 h-[620px] w-[620px] rounded-full blur-[160px]
                   bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300
                   dark:from-pink-500 dark:via-purple-600 dark:to-indigo-500"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0.15, scale: 0.95 }}
        animate={{ opacity: 0.28, scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse" }}
        className="pointer-events-none absolute -bottom-40 -right-40 z-0 h-[540px] w-[540px] rounded-full blur-[140px]
                   bg-gradient-to-br from-rose-300 via-amber-200 to-emerald-200
                   dark:from-indigo-500 dark:via-sky-500 dark:to-cyan-400"
      />

      {/* Content */}
      <section className="relative z-10 mx-auto w-full max-w-2xl px-6 pb-20 pt-32 text-center md:px-8 md:pt-40">
        <motion.h1
          {...fadeUp}
          className="bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl"
        >
          Get in touch
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground md:text-xl"
        >
          Questions, collaboration ideas, or just a hello — send a note and I’ll
          get back to you.
        </motion.p>

        {/* Form */}
        <motion.form
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 text-left"
          noValidate
        >
          {/* Honeypot field (hidden from users) */}
          <div className="hidden">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              value={hpot}
              onChange={(e) => setHpot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="Your full name"
              className="w-full rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-3 text-zinc-800 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-300/30 dark:border-white/20 dark:bg-white/10 dark:text-white"
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-rose-500">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-3 text-zinc-800 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-300/30 dark:border-white/20 dark:bg-white/10 dark:text-white"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-rose-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="message"
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <span
                className={`text-xs ${
                  messageLen > MAX_LEN
                    ? "text-rose-500"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {messageLen}/{MAX_LEN}
              </span>
            </div>
            <textarea
              id="message"
              required
              rows={6}
              maxLength={2000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              placeholder="Your message…"
              className="w-full rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-3 text-zinc-800 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-300/30 dark:border-white/20 dark:bg-white/10 dark:text-white"
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-xs text-rose-500">
                {errors.message}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <motion.button
              whileHover={{ scale: status === "sending" ? 1 : 1.04 }}
              whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
              type="submit"
              disabled={status === "sending"}
              className="no-cursor-label inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white shadow transition hover:opacity-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="3"
                      fill="none"
                      opacity="0.3"
                    />
                    <path
                      d="M22 12a10 10 0 0 1-10 10"
                      stroke="white"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                  Sending…
                </span>
              ) : (
                "Send message"
              )}
            </motion.button>

            <p className="text-center text-[11px] italic text-muted-foreground sm:text-left">
              By clicking “Send message”, you agree to our{" "}
              <a
                href="/legal"
                className="underline underline-offset-2 hover:opacity-80"
              >
                legal terms
              </a>
              .
            </p>
          </div>

          {/* Feedback */}
          <div aria-live="polite">
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-emerald-200 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">✅</span>
                  <span>Message sent successfully!</span>
                </div>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-rose-200 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">❌</span>
                  <span>Something went wrong. Please try again.</span>
                </div>
              </motion.div>
            )}
            {status === "spam" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-amber-200 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚠️</span>
                  <span>
                    Looks like a bot submission. If this is a mistake, email me
                    directly.
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.form>

        {/* Direct email */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.25 }}
          className="mt-12 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground sm:flex-row"
        >
          <span className="no-cursor-label text-zinc-500 dark:text-zinc-400">
            Or email me directly:
          </span>
          <button
            type="button"
            onClick={copyEmail}
            className="group relative inline-flex items-center gap-2 font-medium text-indigo-500 transition hover:text-pink-500"
            aria-live="polite"
          >
            <span className="relative z-10 break-all sm:break-normal">
              contact@pkarabetsos.com
            </span>
            <span className="pointer-events-none absolute -inset-1 rounded-lg bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-0 blur-xl transition duration-300 group-hover:opacity-20" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4 text-indigo-400 transition group-hover:text-pink-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6.75L12 13.5L21 6.75M4.5 6h15a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5v-9A1.5 1.5 0 0 1 4.5 6Z"
              />
            </svg>
            <span className="sr-only">Copy email</span>
          </button>
          {copied && <span className="text-xs text-emerald-500">Copied!</span>}
        </motion.div>

        {/* Socials */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="mt-10 flex justify-center gap-6 text-zinc-500 dark:text-zinc-400 sm:gap-8"
        >
          {[
            {
              href: "https://github.com/panteliskarabetsos",
              label: "GitHub",
              svg: (
                <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.3 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.3 0-.3-.5-1.3.1-2.8 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0C17 4.9 18 5.2 18 5.2c.6 1.5.1 2.5.1 2.8.8.9 1.2 2 1.2 3.3 0 4.6-2.8 5.6-5.4 5.9.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5Z" />
              ),
            },
            {
              href: "https://linkedin.com/in/panteliskarabetsos",
              label: "LinkedIn",
              svg: (
                <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-1 0-1.7-.7-1.7-1.6s.7-1.6 1.7-1.6c1 0 1.7.7 1.7 1.6s-.8 1.6-1.7 1.6zm13.5 10.3h-3v-4.8c0-1.1-.4-1.8-1.3-1.8s-1.5.6-1.7 1.3c-.1.2-.1.5-.1.7v4.6h-3v-9h3v1.2c.4-.6 1.2-1.4 2.8-1.4 2.1 0 3.5 1.4 3.5 4.3v4.9z" />
              ),
            },
            {
              href: "https://instagram.com/pantelis.kb",
              label: "Instagram",
              svg: (
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-2a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
              ),
            },
          ].map(({ href, label, svg }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              aria-label={label}
            >
              <span className="pointer-events-none absolute -inset-2 rounded-xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-20" />
              <svg
                className="relative z-10 h-6 w-6 text-zinc-500 transition-colors duration-300 group-hover:text-indigo-500 dark:group-hover:text-pink-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {svg}
              </svg>
            </a>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
