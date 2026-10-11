import nodemailer from 'nodemailer';

const SITE = 'https://www.pkarabetsos.com';
const LIMITS = { name: 100, email: 200, message: 2000 };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Everything user-supplied is escaped before it is placed in HTML email bodies.
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Header values (subject, reply-to) must not contain line breaks.
const oneLine = (s) => s.replace(/[\r\n]+/g, ' ').trim();

const json = (body, status) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

async function lookupLocation(ip) {
  if (!ip || ip === 'Unknown') return 'Unknown';
  try {
    const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, {
      headers: { 'User-Agent': 'pkarabetsos.com contact form' },
      signal: AbortSignal.timeout(3000),
    });
    const geo = await res.json();
    if (!geo || geo.error) return 'Unknown';
    return `${geo.city || 'Unknown city'}, ${geo.country_name || 'Unknown country'}`;
  } catch {
    return 'Unknown';
  }
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return json({ success: false, error: 'Invalid request' }, 400);
  }

  const name = oneLine(String(body?.name ?? ''));
  const email = oneLine(String(body?.email ?? ''));
  const message = String(body?.message ?? '').trim();

  // Honeypot filled in: pretend success so bots don't retry.
  if (body?.company) return json({ success: true }, 200);

  if (
    !name ||
    !message ||
    !emailRe.test(email) ||
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return json({ success: false, error: 'Invalid input' }, 400);
  }

  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'Unknown';
  const location = await lookupLocation(ip);

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    message: escapeHtml(message).replace(/\n/g, '<br />'),
    ip: escapeHtml(ip),
    location: escapeHtml(location),
  };

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const notification = {
    from: `"pkarabetsos.com" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: 'karapantelis21@gmail.com',
    subject: `New message from ${name}`,
    text: `${name} <${email}>\n${ip} · ${location}\n\n${message}`,
    html: `
      <div style="font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; background: #fafafa; padding: 24px;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; border: 1px solid #e5e5e5;">
          <div style="padding: 20px 24px; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: #737373;">New message</p>
            <h1 style="margin: 6px 0 0; font-size: 18px; color: #0a0a0a;">${safe.name}</h1>
          </div>
          <div style="padding: 20px 24px; font-size: 14px; color: #404040; line-height: 1.6;">
            <p style="margin: 0;"><strong>Email:</strong> ${safe.email}</p>
            <p style="margin: 0;"><strong>Received:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Athens' })}</p>
            <p style="margin: 0;"><strong>IP:</strong> ${safe.ip} · ${safe.location}</p>
            <div style="margin-top: 16px; background: #f5f5f5; border-radius: 8px; padding: 16px; color: #0a0a0a;">${safe.message}</div>
          </div>
        </div>
      </div>
    `,
  };

  const autoReply = {
    from: `"Pantelis Karabetsos" <noreply@pkarabetsos.com>`,
    replyTo: 'contact@pkarabetsos.com',
    to: email,
    subject: 'Thanks for your message',
    text: `Hi ${name},\n\nThanks for getting in touch. I've received your message and will reply as soon as I can.\n\nPantelis Karabetsos\n${SITE}`,
    html: `
      <div style="font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; background: #fafafa; padding: 32px 16px;">
        <div style="max-width: 560px; margin: auto; background: #fff; border-radius: 12px; border: 1px solid #e5e5e5; padding: 32px 28px; font-size: 15px; line-height: 1.7; color: #262626;">
          <p style="margin-top: 0;">Hi ${safe.name},</p>
          <p>Thanks for getting in touch. I've received your message and will reply as soon as I can.</p>
          <p style="margin-bottom: 0;">Pantelis Karabetsos<br />
            <a href="${SITE}" style="color: #047857; text-decoration: none;">pkarabetsos.com</a>
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(notification);
    await transporter.sendMail(autoReply);
    return json({ success: true }, 200);
  } catch (err) {
    console.error('Email sending error:', err);
    return json({ success: false, error: 'Could not send message' }, 500);
  }
}
