import React from "react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { LinkedinIcon, InstagramIcon } from "./SocialIcons";
import { useData } from "../context/DataContext";

export const Footer: React.FC = () => {
  const { authorData } = useData();
  return (
    <footer className="bg-[#F7F3EB] border-t border-[#EFE9DD] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                <img
                  src="/assets/author/rishitha_casual.jpg"
                  alt="Rishitha Gorupati"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <Link to="/" className="inline-block">
                  <span className="font-serif text-2xl font-medium tracking-tight text-[#221E1B]">
                    {authorData.name}
                  </span>
                </Link>
                <p className="text-xs uppercase tracking-[0.2em] text-[#736B61]">
                  Author • Poet • Writer
                </p>
              </div>
            </div>
            <p className="font-serif italic text-sm text-[#5C564E] max-w-sm leading-relaxed pt-2">
              &ldquo;{authorData.tagline}&rdquo;
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#221E1B]">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 text-xs uppercase tracking-[0.12em] text-[#736B61]">
              <li>
                <Link to="/" className="hover:text-[#221E1B] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/poetry" className="hover:text-[#221E1B] transition-colors">
                  Poetry
                </Link>
              </li>
              <li>
                <Link to="/musings" className="hover:text-[#221E1B] transition-colors">
                  Musings
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-[#221E1B] transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-[#221E1B] transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#221E1B] transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#221E1B] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social Links */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#221E1B]">
              Connect
            </h3>
            <p className="text-xs text-[#736B61] leading-relaxed">
              Inquiries, readings, and reflections are warmly welcomed.
            </p>
            <div className="flex items-center space-x-4 pt-1">
              <a
                href={`mailto:${authorData.social.email}`}
                className="p-2 rounded-full border border-[#E5DDCF] bg-[#FDFBF7] text-[#4B453E] hover:text-[#856E4E] hover:border-[#856E4E] transition-colors"
                title={`Email: ${authorData.social.email}`}
                aria-label="Send email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={authorData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-[#E5DDCF] bg-[#FDFBF7] text-[#4B453E] hover:text-[#856E4E] hover:border-[#856E4E] transition-colors group relative"
                title="LinkedIn Profile: Rishitha Gorupati"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={authorData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-[#E5DDCF] bg-[#FDFBF7] text-[#4B453E] hover:text-[#856E4E] hover:border-[#856E4E] transition-colors group relative"
                title="Instagram Profile: @rishitha.gorupati"
                aria-label="Instagram profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-[#968D81] italic">
              Email: <span className="font-mono text-[#4B453E]">{authorData.social.email}</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#EFE9DD] flex flex-col sm:flex-row items-center justify-between text-xs text-[#968D81] gap-4">
          <p>© 2026 Rishitha Gorupati. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-[11px] tracking-wide text-[#736B61]">
            <span>Designed with literary care</span>
            <span>•</span>
            <Link
              to="/admin"
              className="inline-flex items-center text-[#856E4E] hover:text-[#221E1B] transition-colors"
              title="Author & Admin Portal"
            >
              <Lock className="w-3 h-3 mr-1" />
              Author Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
