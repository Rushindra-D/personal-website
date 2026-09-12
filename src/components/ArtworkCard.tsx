import React from "react";
import { Maximize2 } from "lucide-react";
import type { Artwork } from "../data/artworks";

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: () => void;
  index?: number;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick, index }) => {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-4 sm:p-5 hover:border-[#B89F7B] hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 flex flex-col justify-between"
    >
      {/* Image Container with Hover Overlay */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded bg-[#F7F3EB] border border-[#EFE9DD]">
        <img
          src={artwork.image}
          alt={artwork.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-[#221E1B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="p-3 bg-[#FDFBF7]/90 rounded-full text-[#221E1B] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Maximize2 className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Metadata & Editorial Caption */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#968D81] uppercase tracking-wider">
          <span>{index !== undefined ? `Plate ${String(index + 1).padStart(2, "0")}` : "Sketch"}</span>
          <span>{artwork.medium}</span>
        </div>
        <h3 className="font-serif text-xl font-medium text-[#221E1B] group-hover:text-[#856E4E] transition-colors">
          {artwork.title}
        </h3>
        <p className="font-serif italic text-sm text-[#856E4E] leading-snug">
          {artwork.editorialCaption}
        </p>
        <p className="text-xs text-[#736B61] line-clamp-2 pt-1 leading-relaxed">
          {artwork.visualDescription}
        </p>
      </div>
    </article>
  );
};
