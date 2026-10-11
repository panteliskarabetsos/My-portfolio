import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Terminal from '@/components/Terminal';
import { Page } from '@/components/ui';

export const metadata = { title: 'Not found' };

export default function NotFound() {
  return (
    <Page className="pb-8 pt-16 sm:pt-24">
      <p className="eyebrow reveal">Error 404</p>
      <h1 className="reveal mt-3 text-3xl font-semibold tracking-tight sm:text-4xl" style={{ '--d': '60ms' }}>
        This page doesn&apos;t exist.
      </h1>
      <p className="reveal mt-3 text-muted" style={{ '--d': '120ms' }}>
        It may have moved, or the link might be mistyped.
      </p>
      <div className="reveal mt-8" style={{ '--d': '180ms' }}>
        <Terminal
          title="404"
          label="Page not found"
          lines={[
            { cmd: 'curl -I $REQUEST_URI' },
            { key: 'status', value: '404 Not Found' },
            { key: 'suggestion', value: 'cd ~' },
          ]}
        />
      </div>
      <Link href="/" className="btn-ghost reveal mt-8" style={{ '--d': '240ms' }}>
        <ArrowLeft size={15} aria-hidden />
        Back home
      </Link>
    </Page>
  );
}
