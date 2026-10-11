// app/terms/page.jsx
export const metadata = {
    title: 'Terms of Use',
    description: 'Terms of use for the personal website of Pantelis Karabetsos.',
  };
  
  export default function TermsPage() {
    return (
      <main className="max-w-page mx-auto px-5 sm:px-6 pt-14 sm:pt-20 text-[15px] leading-relaxed">
        <h1 className="text-3xl font-semibold tracking-tight mb-6">Terms of Use</h1>
  
        <p className="mb-4">
          Welcome to the personal website of Pantelis Karabetsos. By accessing or using this website, you agree to the following terms and conditions. If you do not agree, please refrain from using the site.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">1. Intellectual Property</h2>
        <p className="mb-4">
          All content on this website—including code, design, text, images, and projects—is the intellectual property of Pantelis Karabetsos unless otherwise stated. Unauthorized reproduction, redistribution, or modification of any part of this site is strictly prohibited.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">2. Acceptable Use</h2>
        <p className="mb-4">
          You agree not to use this website for any unlawful purpose or in a way that may harm the site, its performance, or its content. Spamming, attempting unauthorized access, or malicious activity is prohibited.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Disclaimer</h2>
        <p className="mb-4">
          The content provided on this site is for informational purposes only. While efforts are made to keep it accurate and up-to-date, no guarantees are made regarding its completeness or accuracy.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">4. Limitation of Liability</h2>
        <p className="mb-4">
          Pantelis Karabetsos is not liable for any damages, direct or indirect, resulting from the use or inability to use this website.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">5. Third-Party Links</h2>
        <p className="mb-4">
          This website may include links to third-party websites. These are provided for convenience only, and I am not responsible for the content or practices of those websites.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">6. Changes to Terms</h2>
        <p className="mb-4">
          These terms may be updated at any time without prior notice. Continued use of the site implies acceptance of the latest version.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">7. Governing Law</h2>
        <p className="mb-4">
          These Terms of Use are governed by and construed in accordance with the laws of Greece.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">8. Contact</h2>
        <p>
          For questions or concerns regarding these terms, please contact: <a href="mailto:contact@pkarabetsos.com" className="link text-accent">contact@pkarabetsos.com</a>
        </p>
      </main>
    );
  }
  