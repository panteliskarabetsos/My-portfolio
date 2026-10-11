# pkarabetsos.com

Personal site of Pantelis Karabetsos, Informatics & Computer Engineer (MEng) focused on network security, intrusion detection and adversarial machine learning.

## Stack

- Next.js (App Router), mostly server components
- Tailwind CSS with a small token-based theme (light/dark via `next-themes`)
- Geist Sans & Geist Mono
- Nodemailer contact endpoint (`/api/contact`) with server-side validation and HTML escaping
- Generated Open Graph image, sitemap and robots

## Structure

- `src/data/site.js` - all content (profile, thesis, projects, certifications). Edit this to update the site.
- `src/components/` - shared UI (header, footer, project card, results chart, terminal)
- `src/app/` - routes: `/`, `/research`, `/projects`, `/about`, `/contact`, legal pages

## Development

```bash
npm install
npm run dev
```

The contact form needs `EMAIL_USER` and `EMAIL_PASS` (Gmail app password) in `.env.local`.
