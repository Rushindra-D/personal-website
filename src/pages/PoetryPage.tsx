import React, { useState, useMemo } from "react";
import { Search, Feather, X } from "lucide-react";
import { PoetryCard } from "../components/PoetryCard";
import { useData } from "../context/DataContext";

export const PoetryPage: React.FC = () => {
  const { poems } = useData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPoems = useMemo(() => {
    if (!searchQuery.trim()) {
      return poems;
    }
    const query = searchQuery.toLowerCase().trim();
    return poems.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.signature.toLowerCase().includes(query)
    );
  }, [searchQuery, poems]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#856E4E]">
          Complete Anthology
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#221E1B] font-medium tracking-tight">
          Poetry Collection
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-[#5C564E] leading-relaxed">
          &ldquo;Where thoughts become words, words become reflections, and words are woven into verses.&rdquo;
        </p>
        <p className="text-xs text-[#736B61]">
          {poems.length} original poems preserved verbatim as authored by Rishitha Gorupati.
        </p>
      </div>

      {/* Minimal Search & Filter Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#968D81] absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search poems by title or verse..."
            className="w-full pl-11 pr-10 py-3 bg-[#FDFBF7] border border-[#E0D8CB] rounded-sm text-sm text-[#221E1B] placeholder-[#968D81] focus:outline-none focus:border-[#856E4E] focus:ring-1 focus:ring-[#856E4E] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 p-1 text-[#968D81] hover:text-[#221E1B]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-xs text-[#736B61] mt-2 text-center">
            Found {filteredPoems.length} {filteredPoems.length === 1 ? "poem" : "poems"} matching &ldquo;{searchQuery}&rdquo;
          </p>
        )}
      </div>

      {/* Poetry Grid */}
      {filteredPoems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPoems.map((poem, index) => (
            <PoetryCard key={poem.id} poem={poem} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#F7F3EB] rounded-sm border border-[#EFE9DD] space-y-4">
          <Feather className="w-8 h-8 text-[#B89F7B] mx-auto opacity-50" />
          <h3 className="font-serif text-2xl text-[#221E1B]">No poems found</h3>
          <p className="text-xs text-[#736B61]">
            No poems match the phrase &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;Hope&rdquo;, &ldquo;Silence&rdquo;, or &ldquo;Distance&rdquo;.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="px-4 py-2 bg-[#221E1B] text-white text-xs uppercase tracking-widest rounded-sm hover:bg-[#856E4E] transition-colors"
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
};
