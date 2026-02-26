import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for LP Web Studio - How we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, GDPR, personal information"
      />

      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6 transition-colors duration-300">
          Privacy Policy
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mb-8 transition-colors duration-300">
          <strong>Effective Date:</strong> November 19, 2025
        </p>

        <div className="space-y-8 text-slate-700 dark:text-slate-300 transition-colors duration-300">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
              1. Introduction
            </h2>
            <p className="mb-4">
              LP Web Studio ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{' '}
              <a href="https://lpwebstudio.com" className="text-orange-500 hover:underline">
                lpwebstudio.com
              </a>
              .
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
              2. Information We Collect
            </h2>
            <p className="mb-4">We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>

            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6 transition-colors duration-300">
              Personal Data
            </h3>
            <p className="mb-4">
              Personally identifiable information, such as your name, email address, phone number, and demographic information that you voluntarily give to us when you contact us through our contact form or when you choose to participate in various activities related to the site.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3 mt-6 transition-colors duration-300">
              Derivative Data
            </h3>
            <p>
              Information our servers automatically collect when you access the site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the site.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your inquiries and provide customer service</li>
              <li>To send you marketing and promotional communications (with your consent)</li>
              <li>To improve our website and services</li>
              <li>To monitor and analyze usage and trends to improve your experience</li>
              <li>To protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="mb-4">
              We may use cookies, web beacons, tracking pixels, and other tracking technologies on the site to help customize the site and improve your experience.
            </p>
            <p>
              Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the site.
            </p>
          </section>

          {/* Disclosure of Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
              5. Disclosure of Your Information
            </h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personally identifiable information to third parties. We may share information we have collected about you in certain situations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>By Law or to Protect Rights:</strong> If we believe disclosure is necessary to comply with the law or protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of company assets</li>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us (e.g., hosting, analytics)</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
              6. Security of Your Information
            </h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
              7. Your Data Protection Rights
            </h2>
            <p className="mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request access to your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate personal data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Objection:</strong> Object to processing of your personal data</li>
              <li><strong>Portability:</strong> Request transfer of your personal data</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at{' '}
              <a href="mailto:contact@lpwebstudio.co.za" className="text-orange-500 hover:underline">
                contact@lpwebstudio.co.za
              </a>
            </p>
          </section>

          {/* Third-Party Websites */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
              8. Third-Party Websites
            </h2>
            <p>
              The site may contain links to third-party websites. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
              9. Children's Privacy
            </h2>
            <p>
              We do not knowingly collect information from children under 13. If you are a parent or guardian and believe we have collected information from your child, please contact us immediately.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
              10. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4 transition-colors duration-300">
              11. Contact Us
            </h2>
            <p className="mb-4">
              If you have questions or comments about this Privacy Policy, please contact us:
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg transition-colors duration-300">
              <p className="mb-2"><strong>LP Web Studio</strong></p>
              <p className="mb-2">
                Email:{' '}
                <a href="mailto:contact@lpwebstudio.co.za" className="text-orange-500 hover:underline">
                  contact@lpwebstudio.co.za
                </a>
              </p>
              <p className="mb-2">
                Phone:{' '}
                <a href="tel:+27673852286" className="text-orange-500 hover:underline">
                  (067) 385-2286
                </a>
              </p>
              <p>Cape Town, South Africa</p>
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
}

