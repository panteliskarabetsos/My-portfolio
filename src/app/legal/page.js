import Link from 'next/link';

export const metadata = {
  title: 'Legal',
  alternates: { canonical: '/legal' },
};

export default function LegalPage() {
  return (
    <main className="px-5 pt-14 sm:pt-20 text-center">
      <div className="max-w-2xl mx-auto space-y-10">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Legal Information
        </h1>

        <p className="text-muted text-sm sm:text-base">
          Here you can find the legal terms that govern your use of this site and how your data is handled.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/terms"
            className="btn-ghost"
          >
            Terms of Use
          </Link>

          <Link
            href="/privacy-policy"
            className="btn-ghost"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
