import React from "react";
import { Link } from "react-router-dom";
import { Feather, BookOpen, Compass, ArrowRight, Home } from "lucide-react";
import { SEO } from "../components/SEO";

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Page Not Found (404) | Rishitha Gorupati"
        description="The page you are looking for could not be found in the literary records of Rishitha Gorupati's portfolio."
        canonicalPath="/404"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center space-y-10">
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-mono text-[#856E4E] bg-[#F7F3EB] px-3.5 py-1.5 rounded-full border border-[#EFE9DD]">
          <Compass className="w-3.5 h-3.5" />
          <span>Error 404 • Page Not Found</span>
        </div>

        <div className="space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#221E1B] font-medium tracking-tight">
            Lost Between the Pages
          </h1>
          <p className="font-serif italic text-base sm:text-xl text-[#5C564E] max-w-xl mx-auto leading-relaxed">
            &ldquo;Perhaps this passage was never written, or the verse has quietly shifted to another volume.&rdquo;
          </p>
          <p className="text-xs text-[#736B61] max-w-md mx-auto leading-relaxed">
            The URL you requested does not exist in the author&apos;s literary archives. You can return home or explore
            featured sections below.
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl mx-auto">
          <Link
            to="/poetry"
            className="p-5 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm hover:border-[#856E4E] transition-all group space-y-2 text-left"
          >
            <div className="flex items-center justify-between text-[#856E4E]">
              <Feather className="w-4 h-4" />
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="font-serif text-base font-medium text-[#221E1B]">Poetry Collection</p>
            <p className="text-[11px] text-[#736B61]">24 manuscript verses</p>
          </Link>

          <Link
            to="/musings"
            className="p-5 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm hover:border-[#856E4E] transition-all group space-y-2 text-left"
          >
            <div className="flex items-center justify-between text-[#856E4E]">
              <BookOpen className="w-4 h-4" />
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="font-serif text-base font-medium text-[#221E1B]">Musings &amp; Inquiries</p>
            <p className="text-[11px] text-[#736B61]">Reflective essays &amp; art</p>
          </Link>

          <Link
            to="/books"
            className="p-5 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm hover:border-[#856E4E] transition-all group space-y-2 text-left"
          >
            <div className="flex items-center justify-between text-[#856E4E]">
              <BookOpen className="w-4 h-4" />
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="font-serif text-base font-medium text-[#221E1B]">Published Books</p>
            <p className="text-[11px] text-[#736B61]">That Day is Inevitable</p>
          </Link>
        </div>

        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex items-center px-7 py-3.5 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-[0.18em] font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-2" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </>
  );
};
