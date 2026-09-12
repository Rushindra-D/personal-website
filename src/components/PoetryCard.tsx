import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Feather } from "lucide-react";
import type { Poem } from "../data/poems";

interface PoetryCardProps {
  poem: Poem;
  index?: number;
}

export const PoetryCard: React.FC<PoetryCardProps> = ({ poem, index }) => {
  return (
    <article className="group flex flex-col justify-between p-7 sm:p-8 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm hover:border-[#B89F7B] hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 relative overflow-hidden">
      {/* Decorative subtle page index or feather */}
      <div className="flex items-center justify-between text-[#968D81] mb-6">
        <span className="text-[11px] font-mono tracking-widest uppercase">
          {index !== undefined ? `No. ${String(index + 1).padStart(2, "0")}` : "Verse"}
        </span>
        <Feather className="w-3.5 h-3.5 opacity-30 group-hover:opacity-70 group-hover:text-[#856E4E] transition-opacity" />
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        <h3 className="font-serif text-2xl sm:text-2xl font-medium text-[#221E1B] group-hover:text-[#856E4E] transition-colors leading-snug">
          &ldquo;{poem.title}&rdquo;
        </h3>
        <p className="font-serif italic text-sm text-[#5C564E] line-clamp-3 leading-relaxed">
          {poem.excerpt}
        </p>
      </div>

      {/* Footer Link & Attribution */}
      <div className="mt-8 pt-6 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
        <span className="text-[#968D81] font-serif italic text-[13px]">
          {poem.signature}
        </span>
        <Link
          to={`/poetry/${poem.slug}`}
          className="inline-flex items-center text-xs uppercase tracking-[0.14em] font-medium text-[#856E4E] group-hover:text-[#221E1B] group-hover:translate-x-1 transition-all"
          aria-label={`Read full poem: ${poem.title}`}
        >
          Read Poem
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Link>
      </div>
    </article>
  );
};
