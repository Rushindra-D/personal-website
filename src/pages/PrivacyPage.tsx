import React from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Mail, Lock, ExternalLink } from "lucide-react";
import { SEO } from "../components/SEO";

export const PrivacyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Rishitha Gorupati"
        description="Comprehensive privacy policy for Rishitha Gorupati's official portfolio, covering form inquiries, cookie practices, Google AdSense disclosures, and visitor privacy rights."
        canonicalPath="/privacy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
        {/* Navigation & Header */}
        <div className="border-b border-[#EFE9DD] pb-6">
          <Link
            to="/"
            className="inline-flex items-center text-xs uppercase tracking-[0.16em] font-medium text-[#736B61] hover:text-[#221E1B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2" />
            Back to Home
          </Link>
        </div>

        <article className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-8 sm:p-14 lg:p-16 shadow-xs space-y-10">
          <header className="space-y-4 border-b border-[#EFE9DD] pb-8">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E] bg-[#F7F3EB] px-3.5 py-1.5 rounded-full border border-[#EFE9DD]">
              <Shield className="w-3.5 h-3.5" />
              <span>Legal Disclosures</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221E1B] font-medium tracking-tight">
              Privacy Policy
            </h1>
            <p className="font-serif italic text-sm text-[#736B61]">
              Effective Date: November 13, 2026 • Last Updated: November 2026
            </p>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              This Privacy Policy explains how the official author portfolio of Rishitha Gorupati (accessible at{" "}
              <a href="https://www.rishithagorupati.com" className="text-[#856E4E] underline">
                https://www.rishithagorupati.com
              </a>
              ) handles information collected through our website, our contact channels, and our advertising practices.
            </p>
          </header>

          <div className="space-y-8 text-sm text-[#3E3832] font-serif leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                1. Information Collected Through Website Forms
              </h2>
              <p>
                When you choose to contact the author through our website inquiry form at <code>/contact</code>, we collect
                the following information:
              </p>
              <ul className="list-disc pl-6 space-y-1 font-sans text-xs text-[#4B453E]">
                <li><strong>Full Name:</strong> To address you respectfully in communication.</li>
                <li><strong>Email Address:</strong> To reply directly to your inquiry or feedback.</li>
                <li><strong>Subject &amp; Message:</strong> To read and respond to your literary reflections or professional inquiries.</li>
              </ul>
              <p>
                <strong>How Form Data Is Processed:</strong> Message submissions are sent securely over encrypted HTTPS to our
                backend serverless function and processed directly via the Resend API to deliver the email directly into the
                author&apos;s personal inbox (<code>rishithagorupati@gmail.com</code>).
              </p>
              <p>
                We do not store your contact submissions in a marketing database, and we will never sell, rent, monetize, or
                disclose your contact details to third-party telemarketers or external advertising lists.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                2. Cookies and Similar Technologies
              </h2>
              <p>
                Cookies are small text files placed on your device to enable core website functionality or analyze web traffic.
              </p>
              <div className="p-4 bg-[#F7F3EB] border border-[#EFE9DD] rounded-sm space-y-2 font-sans text-xs">
                <p className="font-medium text-[#221E1B] flex items-center">
                  <Lock className="w-3.5 h-3.5 mr-1.5 text-[#856E4E]" />
                  Current Website Cookies:
                </p>
                <p className="text-[#5C564E]">
                  This website currently uses an <code>HttpOnly</code> session cookie (<code>author_admin_session</code>)
                  strictly for author access to the password-protected Author Portal at <code>/admin</code>. Public visitors
                  browsing poems, articles, and book pages are not subject to persistent tracking cookies by default.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                3. Google AdSense and Third-Party Advertising Disclosures
              </h2>
              <p>
                This website is prepared for participation in the Google AdSense program. Once advertising is activated on this
                website, third-party vendors, including Google, will use cookies to serve advertisements based on a user&apos;s prior
                visits to this website or other websites on the Internet:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-sans text-xs text-[#4B453E]">
                <li>
                  <strong>Advertising Cookies:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve
                  ads to our visitors based on their visit to this website and/or other websites across the web.
                </li>
                <li>
                  <strong>Personalized vs. Non-Personalized Ads:</strong> Depending on your location and consent choices, Google may
                  serve personalized advertisements tailored to your interests, or non-personalized advertisements based on page
                  context rather than personal browsing history.
                </li>
                <li>
                  <strong>Third-Party Ad Partners:</strong> Third-party ad networks or vendors certified by Google may also serve ads
                  and place or read cookies on your browser.
                </li>
              </ul>
              <div className="p-4 bg-[#F7F3EB]/70 border border-[#EAE3D6] rounded-sm space-y-2">
                <p className="font-medium text-[#221E1B] text-xs font-sans">
                  How You Can Control and Opt Out of Personalized Advertising:
                </p>
                <p className="text-xs text-[#5C564E]">
                  Visitors may opt out of personalized advertising at any time by visiting{" "}
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#856E4E] underline inline-flex items-center"
                  >
                    Google Ads Settings <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                  . Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by
                  visiting{" "}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#856E4E] underline inline-flex items-center"
                  >
                    aboutads.info <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                  .
                </p>
                <p className="text-xs text-[#5C564E]">
                  For comprehensive details regarding how Google manages data across its partner sites, please review the official
                  policy:{" "}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#856E4E] underline inline-flex items-center"
                  >
                    Google Advertising Technologies Policy <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                4. Analytics &amp; Performance Measurement
              </h2>
              <p>
                To understand audience engagement and improve website navigation, we may implement Google Analytics 4 (GA4).
                When active, GA4 collects non-personally identifiable metrics such as device type, country, pages viewed, and
                duration of visit. IP anonymization is enabled by default in GA4, and this data is never linked to personally
                identifiable form inquiries.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                5. Data Retention and Deletion
              </h2>
              <p>
                Contact inquiries delivered via email are retained only as long as necessary to converse with readers or conduct
                professional correspondence. You may request the deletion of any prior correspondence by sending an email to{" "}
                <code>rishithagorupati@gmail.com</code> with the subject line &ldquo;Privacy / Data Deletion Request&rdquo;.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                6. International &amp; European Privacy Rights (GDPR / UK GDPR / CCPA)
              </h2>
              <p>
                If you reside in the European Economic Area (EEA), the United Kingdom, Switzerland, or applicable U.S. states
                (such as California), you have statutory rights regarding your personal data, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 font-sans text-xs text-[#4B453E]">
                <li>The right to access the personal data we hold about you.</li>
                <li>The right to request rectification of inaccurate data.</li>
                <li>The right to request the erasure of your personal data.</li>
                <li>The right to restrict or object to certain processing activities.</li>
                <li>The right to withdraw consent at any time without affecting lawful prior processing.</li>
              </ul>
              <p>
                For visitors from the EEA, UK, and Switzerland, Google AdSense uses an IAB TCF-certified consent management
                mechanism to obtain and record consent choices before serving personalized advertisements.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                7. Outbound Links to Third-Party Retailers &amp; Platforms
              </h2>
              <p>
                This portfolio provides direct outbound links to purchase the author&apos;s book (*That Day is Inevitable*) on
                Amazon (<code>amzn.in</code>), as well as links to official professional profiles on LinkedIn and Instagram.
                These third-party platforms maintain their own independent privacy policies and data practices. We encourage you
                to review their privacy policies when leaving our website.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3 border-t border-[#EFE9DD] pt-6">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                8. Contact Information for Privacy Inquiries
              </h2>
              <p>
                If you have questions, feedback, or requests regarding this Privacy Policy or your personal information, please
                contact the author directly:
              </p>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#856E4E] pt-1">
                <Mail className="w-4 h-4" />
                <span>Email: rishithagorupati@gmail.com</span>
              </div>
            </section>
          </div>
        </article>
      </div>
    </>
  );
};
