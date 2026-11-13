import React from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowLeft, Mail, BookOpen } from "lucide-react";
import { SEO } from "../components/SEO";

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms & Conditions | Rishitha Gorupati"
        description="Terms and conditions governing the use of Rishitha Gorupati's official literary portfolio, original poetry copyright, book purchases, and visitor conduct."
        canonicalPath="/terms"
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
              <FileText className="w-3.5 h-3.5" />
              <span>User Agreement</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221E1B] font-medium tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="font-serif italic text-sm text-[#736B61]">
              Effective Date: November 13, 2026 • Last Updated: November 2026
            </p>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              Welcome to the official literary portfolio of author, poet, and writer Rishitha Gorupati (
              <a href="https://www.rishithagorupati.com" className="text-[#856E4E] underline">
                https://www.rishithagorupati.com
              </a>
              ). By accessing or using this website, you agree to be bound by these Terms &amp; Conditions.
            </p>
          </header>

          <div className="space-y-8 text-sm text-[#3E3832] font-serif leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                1. Acceptance of Terms
              </h2>
              <p>
                By visiting, browsing, or reading content on this website, you acknowledge that you have read, understood, and
                agree to abide by these Terms &amp; Conditions, along with our Privacy Policy and Disclaimer. If you do not agree
                with any part of these terms, please discontinue using this website.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                2. Copyright &amp; Intellectual Property Ownership
              </h2>
              <p>
                All content published on this website—including but not limited to the 24 manuscript poems, excerpts from the
                published book <em>That Day is Inevitable</em>, reflective journal inquiries, philosophical musings, original
                Zentangle sketchbook plates, editorial photography, layout styling, and design elements—is the exclusive
                intellectual property of <strong>Rishitha Gorupati</strong>, protected by Indian and international copyright,
                trademark, and intellectual property laws.
              </p>
              <div className="p-4 bg-[#F7F3EB] border border-[#EFE9DD] rounded-sm space-y-2 font-sans text-xs text-[#4B453E]">
                <p className="font-medium text-[#221E1B] flex items-center">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5 text-[#856E4E]" />
                  Permitted Use vs. Prohibited Reproduction:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Personal Reading:</strong> You are granted a personal, non-exclusive, non-transferable license to
                    view, read, and share links to pages on this website for non-commercial educational or personal appreciation.
                  </li>
                  <li>
                    <strong>Brief Excerpts:</strong> Short literary quotes (under 4 lines) may be cited in scholarly reviews or
                    literary discussions, provided full credit and a direct clickable link to{" "}
                    <code>https://www.rishithagorupati.com</code> are visibly given to Rishitha Gorupati.
                  </li>
                  <li>
                    <strong>Prohibited Commercial Use:</strong> You may not republish, reproduce, distribute, translate, sell,
                    feed into automated generative AI training datasets, or broadcast any full poem, journal essay, or artwork
                    without explicit prior written consent from Rishitha Gorupati.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                3. Third-Party Links &amp; Book Retailers
              </h2>
              <p>
                This website includes outbound hyperlinks to third-party services and retailers—such as Amazon (<code>amzn.in</code>)
                for the purchase of <em>That Day is Inevitable</em> (ISBN: 978-93-58136-03-6), as well as professional profiles on
                LinkedIn and Instagram.
              </p>
              <p>
                These links are provided for visitor convenience. Rishitha Gorupati does not operate, control, or assume
                responsibility for the privacy practices, shipping terms, pricing fluctuations, availability, or return policies of
                independent retail platforms. Transactions concluded on external merchant platforms are strictly governed by their
                respective terms of service.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                4. Acceptable Visitor Conduct
              </h2>
              <p>
                When accessing this website or using our contact form, you agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-1 font-sans text-xs text-[#4B453E]">
                <li>Transmit abusive, defamatory, harassing, unsolicited promotional spam, or malicious code.</li>
                <li>Attempt to breach or probe the administrative portal (<code>/admin</code>) or backend APIs.</li>
                <li>Use automated scrapers, data miners, or bots to harvest content or contact email addresses.</li>
                <li>Impersonate any person or misrepresent your affiliation with the author.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                5. Limitation of Liability
              </h2>
              <p>
                This website and its literary contents are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
                basis without warranties of any kind, whether express or implied. In no event shall Rishitha Gorupati be liable
                for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or
                inability to use this website.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3 border-t border-[#EFE9DD] pt-6">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                6. Inquiries &amp; Permissions
              </h2>
              <p>
                For questions regarding these Terms &amp; Conditions, or to request permission for literary readings, syndication,
                or anthology rights, please contact:
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
