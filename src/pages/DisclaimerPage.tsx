import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, Mail, HeartHandshake } from "lucide-react";
import { SEO } from "../components/SEO";

export const DisclaimerPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Disclaimer & Copyright Policy | Rishitha Gorupati"
        description="Official disclaimer and copyright policy for Rishitha Gorupati's literary writings, psychological reflections, Zentangle sketches, and published book links."
        canonicalPath="/disclaimer"
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
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Official Notices</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221E1B] font-medium tracking-tight">
              Disclaimer &amp; Copyright Policy
            </h1>
            <p className="font-serif italic text-sm text-[#736B61]">
              Effective Date: November 13, 2026 • Last Updated: November 2026
            </p>
            <p className="text-xs text-[#5C564E] leading-relaxed">
              This Disclaimer sets forth general information, literary context, and copyright provisions applicable to the
              writings, poetry, and creative works presented on{" "}
              <a href="https://www.rishithagorupati.com" className="text-[#856E4E] underline">
                https://www.rishithagorupati.com
              </a>
              .
            </p>
          </header>

          <div className="space-y-8 text-sm text-[#3E3832] font-serif leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                1. Literary, Philosophical &amp; Personal Inquiries Disclaimer
              </h2>
              <p>
                The essays, contemplations, and articles published in the <strong>Musings</strong> section (including works such as
                <em>&ldquo;Fractals of Thought: A Psychological Inquiry into Zentangle Practice&rdquo;</em> and{" "}
                <em>&ldquo;Healing Between Stillness and Speech&rdquo;</em>) represent the author&apos;s personal creative
                explorations, philosophical reflections, introspective inquiries, and lived human observations.
              </p>
              <div className="p-4 bg-[#F7F3EB] border border-[#EFE9DD] rounded-sm space-y-2 font-sans text-xs text-[#4B453E]">
                <p className="font-medium text-[#221E1B] flex items-center">
                  <HeartHandshake className="w-4 h-4 mr-1.5 text-[#856E4E]" />
                  No Medical or Psychological Advice:
                </p>
                <p>
                  Content on this website is shared for artistic, literary, and self-reflective purposes only. It is{" "}
                  <strong>not</strong> intended to be a substitute for professional psychological counseling, psychotherapy,
                  psychiatric assessment, medical diagnosis, or clinical treatment.
                </p>
                <p>
                  Always seek the guidance of a qualified healthcare professional or licensed mental health provider with any
                  questions regarding an emotional condition, psychological distress, or medical health concern. Never disregard
                  professional advice or delay seeking it because of something read on this portfolio.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                2. Copyright &amp; Authorship Attribution
              </h2>
              <p>
                All poems (24 manuscript verses), journal essays, book synopses, and original writings displayed across this
                website are © 2026 <strong>Rishitha Gorupati</strong>. All rights are reserved worldwide.
              </p>
              <p>
                Except as permitted under applicable fair-dealing or fair-use exceptions for brief educational quotation with clear
                attribution, no portion of these works may be reproduced, archived, redistributed, adapted, or transmitted in any
                form or by any means (electronic, mechanical, recording, or otherwise) without prior written permission from the
                author.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                3. Artwork &amp; Image Licensing
              </h2>
              <p>
                The Zentangle sketch studies presented alongside the psychological musings are original, hand-drawn works
                created by Rishitha Gorupati using pencil on paper. The author portraits and photographic plates are original
                copyrighted media. Unauthorized downloading, alteration, or commercial redistribution of these images is strictly
                prohibited.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                4. Book Retailer &amp; External Links Disclaimer
              </h2>
              <p>
                The book <em>That Day is Inevitable</em> (ISBN: 978-93-58136-03-6) is published in paperback format through String
                Production India and distributed on third-party commercial platforms such as Amazon India (<code>amzn.in</code>).
              </p>
              <p>
                Outbound purchase links are provided to assist readers in acquiring authentic copies of the author&apos;s book.
                Rishitha Gorupati is not responsible for the order processing, shipping, customs, or customer service policies of
                independent third-party merchants.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3 border-t border-[#EFE9DD] pt-6">
              <h2 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
                5. Permissions &amp; Contact
              </h2>
              <p>
                To request permissions for anthology reprinting, academic citation, or literary collaborations, please contact:
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

