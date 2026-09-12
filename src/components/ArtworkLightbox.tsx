import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Artwork } from "../data/artworks";

interface ArtworkLightboxProps {
  artworks: Artwork[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ArtworkLightbox: React.FC<ArtworkLightboxProps> = ({
  artworks,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  // Handle keyboard navigation
  useEffect(() => {
    if (currentIndex === null || currentIndex < 0 || currentIndex >= artworks.length) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
        onNavigate(prevIndex);
      } else if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % artworks.length;
        onNavigate(nextIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [currentIndex, artworks.length, onClose, onNavigate]);

  if (currentIndex === null || currentIndex < 0 || currentIndex >= artworks.length) {
    return null;
  }

  const current = artworks[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#FDFBF7]/98 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox view of ${current.title}`}
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full pb-4 border-b border-[#EFE9DD]">
        <div className="flex items-center space-x-3">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#736B61]">
            Exhibit {currentIndex + 1} of {artworks.length}
          </span>
          <span className="text-xs text-[#968D81]">|</span>
          <span className="text-xs uppercase tracking-wider text-[#968D81]">
            {current.medium}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-[#221E1B] hover:text-[#856E4E] hover:bg-[#F7F3EB] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#856E4E]"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Exhibition Area */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + artworks.length) % artworks.length)}
          className="absolute left-2 sm:left-6 z-10 p-3 bg-[#FDFBF7]/90 hover:bg-[#F7F3EB] border border-[#EAE3D6] text-[#221E1B] hover:text-[#856E4E] rounded-full shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#856E4E]"
          aria-label="Previous sketch"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Artwork Canvas */}
        <div className="max-w-4xl max-h-[72vh] flex flex-col items-center justify-center p-2">
          <img
            src={current.image}
            alt={current.title}
            className="max-h-[66vh] max-w-full object-contain rounded shadow-lg border border-[#EAE3D6] bg-white"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={() => onNavigate((currentIndex + 1) % artworks.length)}
          className="absolute right-2 sm:right-6 z-10 p-3 bg-[#FDFBF7]/90 hover:bg-[#F7F3EB] border border-[#EAE3D6] text-[#221E1B] hover:text-[#856E4E] rounded-full shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#856E4E]"
          aria-label="Next sketch"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Editorial Details */}
      <div className="max-w-3xl mx-auto w-full text-center pt-3 border-t border-[#EFE9DD] space-y-1">
        <h3 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
          {current.title}
        </h3>
        <p className="font-serif italic text-sm sm:text-base text-[#856E4E]">
          {current.editorialCaption}
        </p>
        <p className="text-xs text-[#736B61] max-w-xl mx-auto pt-1 leading-relaxed">
          {current.visualDescription}
        </p>
        <p className="text-[10px] uppercase tracking-widest text-[#968D81] pt-1">
          Use ← and → arrow keys to browse • ESC to close
        </p>
      </div>
    </div>
  );
};
