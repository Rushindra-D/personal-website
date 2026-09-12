import React from "react";
import { Mail, MessageSquare } from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "../components/SocialIcons";
import { authorData } from "../data/author";
import { ContactForm } from "../components/ContactForm";

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#856E4E]">
          Conversations &amp; Inquiries
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#221E1B] font-medium tracking-tight">
          Get in Touch
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-[#5C564E] leading-relaxed">
          &ldquo;I welcome reflections on my writing, poetic inquiries, and literary discussions.&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Contact Details & Direct Links */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#221E1B] font-medium">
              Direct Contact
            </h2>
            <p className="font-serif text-sm text-[#5C564E] leading-relaxed">
              Feel free to reach out via email or connect with Rishitha across her official professional and social channels.
            </p>
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start space-x-4 pt-2">
              <div className="p-2.5 bg-[#FDFBF7] rounded-full border border-[#E0D8CB] text-[#856E4E]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#968D81]">
                  Email Address
                </span>
                <p className="text-sm font-medium text-[#221E1B] mt-0.5">
                  <a
                    href={`mailto:${authorData.social.email}`}
                    className="hover:text-[#856E4E] transition-colors underline underline-offset-4"
                  >
                    {authorData.social.email}
                  </a>
                </p>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-[#FDFBF7] rounded-full border border-[#E0D8CB] text-[#856E4E]">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#968D81]">
                  LinkedIn
                </span>
                <p className="text-sm font-medium text-[#221E1B] mt-0.5">
                  <a
                    href={authorData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#856E4E] transition-colors underline underline-offset-4"
                  >
                    linkedin.com/in/rishitha-gorupati
                  </a>
                </p>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-[#FDFBF7] rounded-full border border-[#E0D8CB] text-[#856E4E]">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#968D81]">
                  Instagram
                </span>
                <p className="text-sm font-medium text-[#221E1B] mt-0.5">
                  <a
                    href={authorData.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#856E4E] transition-colors underline underline-offset-4"
                  >
                    @rishitha.gorupati
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm space-y-2">
            <div className="flex items-center space-x-2 text-[#856E4E]">
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">
                Reader Reflections
              </span>
            </div>
            <p className="font-serif italic text-sm text-[#5C564E] leading-relaxed">
              If you have read <em>That Day is Inevitable</em> or any poem in this anthology, sharing your impressions brings warmth to the ongoing creative journey.
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
