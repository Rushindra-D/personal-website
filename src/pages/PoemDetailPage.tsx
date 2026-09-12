import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Feather, BookOpen } from "lucide-react";
import { useData } from "../context/DataContext";

export const PoemDetailPage: React.FC = () => {
  const { poems } = useData();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentIndex = poems.findIndex((p) => p.slug === slug || p.id === slug);
  const currentPoem = poems[currentIndex];

  const prevPoem = currentIndex > 0 ? poems[currentIndex - 1] : poems[poems.length - 1];
  const nextPoem = currentIndex < poems.length - 1 ? poems[currentIndex + 1] : poems[0];

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(100);
        return;
      }
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!currentPoem) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <h2 className="font-serif text-3xl text-[#221E1B]">Poem Not Found</h2>
        <p className="text-sm text-[#736B61]">
          The poem you are looking for could not be found in the manuscript.
        </p>
        <button
          onClick={() => navigate("/poetry")}
          className="px-6 py-2.5 bg-[#221E1B] text-white text-xs uppercase tracking-widest rounded-sm hover:bg-[#856E4E] transition-colors"
        >
          Return to Poetry Collection
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Subtle Top Reading Progress Indicator */}
      <div className="fixed top-20 left-0 w-full h-[2px] bg-transparent z-30">
        <div
          className="h-full bg-[#856E4E] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Back navigation */}
        <div className="mb-10 flex items-center justify-between border-b border-[#EFE9DD] pb-4">
          <Link
            to="/poetry"
            className="inline-flex items-center text-xs uppercase tracking-[0.16em] font-medium text-[#736B61] hover:text-[#221E1B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2" />
            Back to Poetry
          </Link>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#968D81]">
            Poem {currentIndex + 1} of {poems.length}
          </span>
        </div>

        {/* Dedicated Literary Poem Reading Page */}
        <article className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-8 sm:p-14 lg:p-20 shadow-sm max-w-2xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 pb-8 border-b border-[#F0EBE1]">
            <Feather className="w-5 h-5 text-[#856E4E] mx-auto opacity-70" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-mono text-[#856E4E]">
              Original Poem
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221E1B] font-medium tracking-tight">
              &ldquo;{currentPoem.title}&rdquo;
            </h1>
          </div>

          {/* Verbatim Poem Body */}
          <div className="poem-content text-lg sm:text-xl text-[#2C2723] leading-loose max-w-lg mx-auto py-2">
            {currentPoem.content}
          </div>

          {/* Verbatim Author Signature */}
          <div className="pt-8 border-t border-[#F0EBE1] text-right">
            <span className="font-serif italic text-base sm:text-lg text-[#856E4E]">
              {currentPoem.signature}
            </span>
          </div>
        </article>

        {/* Previous / Next Navigation */}
        <div className="mt-14 max-w-2xl mx-auto pt-8 border-t border-[#EFE9DD] flex items-center justify-between gap-4">
          <Link
            to={`/poetry/${prevPoem.slug}`}
            className="group flex flex-col items-start text-left focus:outline-none"
          >
            <span className="inline-flex items-center text-[10px] uppercase tracking-widest text-[#968D81] group-hover:text-[#856E4E] transition-colors">
              <ArrowLeft className="w-3 h-3 mr-1" />
              Previous Poem
            </span>
            <span className="font-serif text-base sm:text-lg text-[#221E1B] group-hover:text-[#856E4E] transition-colors">
              &ldquo;{prevPoem.title}&rdquo;
            </span>
          </Link>

          <Link
            to="/poetry"
            className="hidden sm:inline-flex p-2 text-[#736B61] hover:text-[#221E1B] border border-[#EFE9DD] rounded-full hover:bg-[#F7F3EB] transition-colors"
            title="All Poems"
          >
            <BookOpen className="w-4 h-4" />
          </Link>

          <Link
            to={`/poetry/${nextPoem.slug}`}
            className="group flex flex-col items-end text-right focus:outline-none"
          >
            <span className="inline-flex items-center text-[10px] uppercase tracking-widest text-[#968D81] group-hover:text-[#856E4E] transition-colors">
              Next Poem
              <ArrowRight className="w-3 h-3 ml-1" />
            </span>
            <span className="font-serif text-base sm:text-lg text-[#221E1B] group-hover:text-[#856E4E] transition-colors">
              &ldquo;{nextPoem.title}&rdquo;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
