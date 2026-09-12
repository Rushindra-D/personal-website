import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ExternalLink, ArrowRight } from "lucide-react";
import type { Book } from "../data/books";

interface BookCardProps {
  book: Book;
  isDetailed?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book, isDetailed = false }) => {
  const [activeSide, setActiveSide] = useState<"front" | "back" | "mockup">("front");

  const currentCover =
    activeSide === "front"
      ? book.coverFront
      : activeSide === "back"
      ? book.coverBack || book.coverFront
      : book.mockup || book.coverFront;

  return (
    <div className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-6 sm:p-10 lg:p-12 hover:shadow-[0_12px_40px_rgb(0,0,0,0.03)] transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Book Cover Presentation with Front/Back/Mockup Toggle */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group w-52 sm:w-64 aspect-2/3 shadow-xl rounded-sm overflow-hidden border border-[#E0D8CB] bg-white transition-transform duration-300 group-hover:scale-102 flex items-center justify-center">
            <img
              src={currentCover}
              alt={`${book.title} ${activeSide} view`}
              className={`w-full h-full ${activeSide === "mockup" ? "object-contain p-2 bg-[#FDFBF7]" : "object-cover"}`}
            />
          </div>

          {/* View Toggle Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] font-mono uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setActiveSide("front")}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeSide === "front"
                  ? "bg-[#221E1B] text-[#FDFBF7]"
                  : "bg-[#F7F3EB] text-[#736B61] hover:text-[#221E1B]"
              }`}
            >
              Front
            </button>
            {book.coverBack && (
              <button
                type="button"
                onClick={() => setActiveSide("back")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeSide === "back"
                    ? "bg-[#221E1B] text-[#FDFBF7]"
                    : "bg-[#F7F3EB] text-[#736B61] hover:text-[#221E1B]"
                }`}
              >
                Back
              </button>
            )}
            {book.mockup && (
              <button
                type="button"
                onClick={() => setActiveSide("mockup")}
                className={`px-2.5 py-1 rounded transition-colors ${
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

        {/* Right: Book Details & Purchase Options */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
              Featured Publication
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium tracking-tight">
              {book.title}
            </h2>
            <p className="font-serif italic text-base text-[#736B61]">
              by {book.author}
            </p>
          </div>

          {/* Book Synopsis */}
          <div className="space-y-4 font-serif text-[#4B453E] text-base leading-relaxed">
            {book.synopsis.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Purchase Actions */}
          <div className="pt-4 border-t border-[#F0EBE1] flex flex-wrap items-center gap-4">
            <a
              href={book.buyLinks.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-[0.16em] font-medium rounded-sm hover:bg-[#856E4E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#856E4E]"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Buy on Amazon
              <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-70" />
            </a>



            {!isDetailed && (
              <Link
                to={`/books/${book.slug}`}
                className="inline-flex items-center text-xs uppercase tracking-[0.14em] font-medium text-[#856E4E] hover:text-[#221E1B] ml-auto transition-colors"
              >
                Explore Details
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
