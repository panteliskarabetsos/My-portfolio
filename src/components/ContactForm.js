'use client';

import { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

const MAX_LEN = 2000;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const field =
  'w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[15px] outline-hidden transition-colors placeholder:text-muted/70 focus:border-foreground/40';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please add your name.';
    if (!emailRe.test(form.email.trim())) next.email = 'Please use a valid email.';
    if (!form.message.trim()) next.message = 'Please write a short message.';
    else if (form.message.length > MAX_LEN) next.message = `Keep it under ${MAX_LEN} characters.`;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) setForm({ name: '', email: '', message: '', company: '' });
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timer);
    }
  };

  if (status === 'sent') {
    return (
      <div className="reveal rounded-xl border border-line bg-surface p-6" role="status">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent">
          <Check size={18} aria-hidden />
        </span>
        <p className="mt-4 font-medium">Message sent.</p>
        <p className="mt-1 text-sm text-muted">Thanks for reaching out. I&apos;ll reply as soon as I can.</p>
        <button type="button" onClick={() => setStatus('idle')} className="link mt-4 text-sm text-muted hover:text-foreground">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name} id="name">
          <input id="name" name="name" autoComplete="name" value={form.name} onChange={update} className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
        </Field>
        <Field label="Email" error={errors.email} id="email">
          <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
        </Field>
      </div>

      <Field
        label="Message"
        error={errors.message}
        id="message"
        hint={<span className={form.message.length > MAX_LEN ? 'text-red-500' : ''}>{form.message.length}/{MAX_LEN}</span>}
      >
        <textarea id="message" name="message" rows={6} value={form.message} onChange={update} className={`${field} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
      </Field>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={update} />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button type="submit" disabled={status === 'sending'} className="btn-primary group disabled:opacity-60">
          {status === 'sending' ? (
            <>
              <Loader2 size={15} className="animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
            </>
          )}
        </button>
        {status === 'error' && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            Something went wrong. Please email me directly instead.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({ label, id, error, hint, children }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
        {hint && <span className="font-mono text-[11px] text-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
