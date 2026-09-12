import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, ExternalLink, BookOpen, Feather } from "lucide-react";
import { useData } from "../context/DataContext";

export const BookDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { books, poems } = useData();
  const [activeSide, setActiveSide] = useState<"front" | "back" | "mockup">("front");

  const book = books.find((b) => b.slug === slug || b.id === slug);

  if (!book) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <h2 className="font-serif text-3xl text-[#221E1B]">Book Not Found</h2>
        <p className="text-sm text-[#736B61]">
          The requested book volume could not be found.
        </p>
        <button
          onClick={() => navigate("/books")}
          className="px-6 py-2.5 bg-[#221E1B] text-white text-xs uppercase tracking-widest rounded-sm hover:bg-[#856E4E] transition-colors"
        >
          Return to Books
        </button>
      </div>
    );
  }

  const currentCover =
    activeSide === "front"
      ? book.coverFront
      : activeSide === "back"
      ? book.coverBack || book.coverFront
      : book.mockup || book.coverFront;

  // Thematically resonant poems for mortality / life / time: e.g. "These lines", "IT IS..", "Give more to life"
  const relatedPoems = poems.filter((p) =>
    ["these-lines", "it-is", "give-more-to-life"].includes(p.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20 space-y-16">
      {/* Back Button */}
      <div>
        <Link
          to="/books"
          className="inline-flex items-center text-xs uppercase tracking-[0.16em] font-medium text-[#736B61] hover:text-[#221E1B] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2" />
          Back to Books
        </Link>
      </div>

      {/* Main Book Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Book Cover Presentation */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-64 sm:w-80 aspect-2/3 shadow-2xl rounded-sm overflow-hidden border border-[#DCD5C9] bg-white flex items-center justify-center">
            <img
              src={currentCover}
              alt={`${book.title} ${activeSide} view`}
              className={`w-full h-full ${activeSide === "mockup" ? "object-contain p-2 bg-[#FDFBF7]" : "object-cover"}`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-mono uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setActiveSide("front")}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeSide === "front"
                  ? "bg-[#221E1B] text-[#FDFBF7]"
                  : "bg-[#F7F3EB] text-[#736B61] hover:text-[#221E1B]"
              }`}
            >
              Front Cover
            </button>
            {book.coverBack && (
              <button
                type="button"
                onClick={() => setActiveSide("back")}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeSide === "back"
                    ? "bg-[#221E1B] text-[#FDFBF7]"
                    : "bg-[#F7F3EB] text-[#736B61] hover:text-[#221E1B]"
                }`}
              >
                Back Cover
              </button>
            )}
            {book.mockup && (
              <button
                type="button"
                onClick={() => setActiveSide("mockup")}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeSide === "mockup"
                    ? "bg-[#221E1B] text-[#FDFBF7]"
                    : "bg-[#F7F3EB] text-[#736B61] hover:text-[#221E1B]"
                }`}
              >
                3D Edition
              </button>
            )}
          </div>
        </div>

        {/* Right: Editorial Overview & Intentions */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2 border-b border-[#EFE9DD] pb-6">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#856E4E]">
              Authored Work
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#221E1B] font-medium tracking-tight">
              {book.title}
            </h1>
            <p className="font-serif italic text-lg text-[#736B61]">
              by {book.author}
            </p>
          </div>

          {/* Synopsis */}
          <div className="space-y-4 font-serif text-[#342F2A] text-lg leading-relaxed">
            {book.synopsis.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Purchase Options */}
          <div className="p-6 bg-[#F7F3EB] rounded-sm border border-[#EAE3D6] space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#221E1B]">
              Acquire a Copy
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={book.buyLinks.amazon}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-[0.16em] font-medium rounded-sm hover:bg-[#856E4E] transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Order on Amazon (India)
                <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-70" />
              </a>

              <a
                href={book.buyLinks.flipkart}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3 bg-[#FDFBF7] text-[#736B61] border border-[#DCD5C9] text-xs uppercase tracking-[0.16em] font-medium rounded-sm hover:bg-[#EFE9DD] hover:text-[#221E1B] transition-colors"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Flipkart
                <span className="ml-2 text-[10px] text-[#968D81] font-mono">[Placeholder]</span>
              </a>
            </div>

            {book.buyLinks.amazonAlt && (
              <p className="text-[11px] text-[#736B61]">
                Alternate Amazon direct link:{" "}
                <a
                  href={book.buyLinks.amazonAlt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#221E1B]"
                >
                  {book.buyLinks.amazonAlt}
                </a>
              </p>
            )}
          </div>

          {/* Editorial Book Meta Note */}
          <div className="text-xs text-[#968D81] pt-2 border-t border-[#EFE9DD] space-y-1 font-mono">
            <p>Format: {book.details.format}</p>
            <p>Language: {book.details.language}</p>
            <p>Publisher: {book.details.publisher}</p>
            <p>ISBN: {book.details.isbn}</p>
            {book.details.price && <p>Price: {book.details.price}</p>}
            {book.details.genre && <p>Category: {book.details.genre}</p>}
          </div>
        </div>
      </div>

      {/* Visual Editions Showcase */}
      <div className="pt-10 border-t border-[#EFE9DD] space-y-6">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
            Book Gallery
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#221E1B] font-medium">
            Visual Editions &amp; Covers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div
            onClick={() => setActiveSide("front")}
            className={`cursor-pointer p-4 bg-[#FDFBF7] border rounded-sm transition-all text-center space-y-3 ${
              activeSide === "front" ? "border-[#856E4E] shadow-sm" : "border-[#EAE3D6] hover:border-[#856E4E]"
            }`}
          >
            <div className="aspect-2/3 max-w-[200px] mx-auto overflow-hidden rounded shadow-sm bg-white border border-[#E0D8CB]">
              <img
                src={book.coverFront}
                alt="Front Cover"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-serif text-sm font-medium text-[#221E1B]">Front Cover Edition</p>
          </div>

          {book.coverBack && (
            <div
              onClick={() => setActiveSide("back")}
              className={`cursor-pointer p-4 bg-[#FDFBF7] border rounded-sm transition-all text-center space-y-3 ${
                activeSide === "back" ? "border-[#856E4E] shadow-sm" : "border-[#EAE3D6] hover:border-[#856E4E]"
              }`}
            >
              <div className="aspect-2/3 max-w-[200px] mx-auto overflow-hidden rounded shadow-sm bg-white border border-[#E0D8CB]">
                <img
                  src={book.coverBack}
                  alt="Back Cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-serif text-sm font-medium text-[#221E1B]">Back Cover &amp; Author Note</p>
            </div>
          )}

          {book.mockup && (
            <div
              onClick={() => setActiveSide("mockup")}
              className={`cursor-pointer p-4 bg-[#FDFBF7] border rounded-sm transition-all text-center space-y-3 ${
                activeSide === "mockup" ? "border-[#856E4E] shadow-sm" : "border-[#EAE3D6] hover:border-[#856E4E]"
              }`}
            >
              <div className="aspect-2/3 max-w-[200px] mx-auto overflow-hidden rounded shadow-sm bg-white border border-[#E0D8CB] flex items-center justify-center p-1">
                <img
                  src={book.mockup}
                  alt="3D Edition Mockup"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-serif text-sm font-medium text-[#221E1B]">3D Volume &amp; Stack</p>
            </div>
          )}
        </div>
      </div>

      {/* Thematically Resonant Poems */}
      <div className="pt-16 border-t border-[#EFE9DD] space-y-8">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
            Resonant Verses
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#221E1B] font-medium">
            Related Poems from Rishitha
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPoems.map((p) => (
            <div
              key={p.id}
              className="p-6 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <Feather className="w-4 h-4 text-[#856E4E] opacity-60" />
                <h3 className="font-serif text-xl font-medium text-[#221E1B]">
                  &ldquo;{p.title}&rdquo;
                </h3>
                <p className="font-serif italic text-xs text-[#5C564E] line-clamp-3">
                  {p.excerpt}
                </p>
              </div>
              <Link
                to={`/poetry/${p.slug}`}
                className="text-xs uppercase tracking-wider font-medium text-[#856E4E] hover:text-[#221E1B] pt-2 border-t border-[#F0EBE1]"
              >
                Read Poem →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
