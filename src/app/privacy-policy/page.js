export const metadata = {
    title: 'Privacy Policy',
    description: 'Detailed privacy policy for visitors of pkarabetsos.com — learn how your data is handled and protected.',
  };
  
  export default function PrivacyPolicyPage() {
    return (
      <main className="max-w-page mx-auto px-5 sm:px-6 pt-14 sm:pt-20 text-[15px] leading-relaxed">
        <h1 className="text-3xl font-semibold tracking-tight mb-6">
          Privacy Policy
        </h1>
  
        <p className="mb-6 text-sm text-muted">
          Last updated: April 12, 2025
        </p>
  
        <div className="space-y-8 text-base leading-relaxed">
          <p>
            This Privacy Policy describes how your personal information is collected, used and protected when you visit <strong>pkarabetsos.com</strong> (the "Site").
          </p>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Who we are</h2>
            <p>
              This website is operated by <strong>Pantelis Karabetsos</strong>, a Computer Engineer showcasing personal projects, work experience and offering contact capabilities through a form.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">2. What data we collect</h2>
            <ul className="list-disc pl-6">
              <li><strong>Contact Form:</strong> Name, email address, message content, IP address and estimated location.</li>
              <li><strong>Analytics:</strong> Non-identifiable data like page views, referrer URLs, browser type, screen resolution etc. collected anonymously via <a href="https://plausible.io" className="link text-accent" target="_blank">Plausible Analytics</a>.</li>
              <li><strong>Server Logs:</strong> Automatically collected IP addresses for spam prevention and debugging.</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">3. Why we collect your data</h2>
            <ul className="list-disc pl-6">
              <li>To respond to messages submitted through the contact form</li>
              <li>To understand how users interact with the site and improve UX</li>
              <li>To protect the site from spam and abuse</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">4. Legal basis for processing</h2>
            <p>
              Data is processed under the following legal bases:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Consent:</strong> When you submit the contact form</li>
              <li><strong>Legitimate interest:</strong> For analytics and site security</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">5. Cookies & tracking</h2>
            <p>
              This website does <strong>not use cookies</strong>. Analytics is powered by Plausible, a privacy-first, cookie-free service that doesn’t collect personal data.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">6. Who has access to your data</h2>
            <p>
              Your data is never sold or shared with third parties. Email content is processed by Gmail and Vercel serverless functions. Analytics data is hosted on EU-based servers by Plausible.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">7. How long we keep your data</h2>
            <p>
              Messages submitted through the contact form are kept for up to <strong>6 months</strong> for reference and then deleted. Analytics data is kept aggregated and anonymous.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">8. Your data rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6">
              <li>Request access to any personal data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>To request deletion of your data, email <a href="mailto:contact@pkarabetsos.com" className="link text-accent">contact@pkarabetsos.com</a>.</p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">10. Changes to this policy</h2>
            <p>
              This privacy policy may be updated from time to time. Changes will be posted on this page with the updated date.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">11. Contact</h2>
            <p>
              For any questions or requests regarding your data, you can contact:
            </p>
            <p>
              <strong>Pantelis Karabetsos</strong><br />
              Email: <a href="mailto:contact@pkarabetsos.com" className="link text-accent">contact@pkarabetsos.com</a>
            </p>
          </section>
        </div>
      </main>
    );
  }
  