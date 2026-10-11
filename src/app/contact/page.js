import ContactForm from '@/components/ContactForm';
import CopyEmail from '@/components/CopyEmail';
import { Page, PageHeader } from '@/components/ui';
import { site } from '@/data/site';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Pantelis Karabetsos about security roles, research or collaboration.',
  alternates: { canonical: '/contact' },
};

const channels = [
  { k: 'LinkedIn', v: 'in/panteliskarabetsos', href: site.linkedin },
  { k: 'GitHub', v: 'panteliskarabetsos', href: site.github },
  { k: 'Location', v: site.location },
];

export default function Contact() {
  return (
    <Page>
      <PageHeader eyebrow="Contact" title="Let's talk.">
        <p>
          I&apos;m looking for an entry-level role in network security, intrusion detection or digital forensics.
          If you&apos;re hiring, or want to talk about the research, send me a message.
        </p>
      </PageHeader>

      <div className="reveal grid gap-12 sm:grid-cols-[1fr,14rem]" style={{ '--d': '180ms' }}>
        <ContactForm />

        <aside className="space-y-6 text-sm">
          <div>
            <p className="eyebrow">Email</p>
            <div className="mt-2 flex items-center gap-1">
              <a href={`mailto:${site.email}`} className="link break-all">
                {site.email}
              </a>
              <CopyEmail email={site.email} />
            </div>
          </div>
          {channels.map((c) => (
            <div key={c.k}>
              <p className="eyebrow">{c.k}</p>
              {c.href ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-block">
                  {c.v}
                </a>
              ) : (
                <p className="mt-2">{c.v}</p>
              )}
            </div>
          ))}
        </aside>
      </div>
    </Page>
  );
}
