import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, BookOpen, ExternalLink, X, ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { achievements } from "../data/achievements";

export const AchievementsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "publication" | "appreciation">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredAchievements = achievements.filter((a) => {
    if (activeFilter === "all") return true;
    return a.type === activeFilter;
  });

  const publicationCount = achievements.filter((a) => a.type === "publication").length;
  const appreciationCount = achievements.filter((a) => a.type === "appreciation").length;

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    const total = filteredAchievements.length;
    setLightboxIndex(
      direction === "next"
        ? (lightboxIndex + 1) % total
        : (lightboxIndex - 1 + total) % total
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredAchievements]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 space-y-12 sm:space-y-16">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-mono text-[#856E4E] bg-[#F7F3EB] px-3.5 py-1.5 rounded-full border border-[#EFE9DD]">
          <Award className="w-3.5 h-3.5" />
          <span>Recognition &amp; Literary Honors</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#221E1B] font-medium tracking-tight">
          Achievements &amp; Certificates
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[#5C564E] max-w-2xl mx-auto leading-relaxed">
          &ldquo;Every verse written, every anthology published, and every recognition received marks a milestone in the journey of words.&rdquo;
        </p>
        <p className="text-xs text-[#736B61] max-w-xl mx-auto leading-relaxed">
          Official certificates of publication, appreciation, and anthology contributions presented to Rishitha Gorupati by recognized publishers and literary platforms.
        </p>
      </div>

      {/* Highlights Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-6 text-center space-y-1 shadow-xs">
          <span className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium">
            {achievements.length}
          </span>
          <p className="text-xs uppercase tracking-[0.16em] font-mono text-[#856E4E]">
            Total Certificates
          </p>
          <p className="text-[11px] text-[#736B61]">Verified literary records</p>
        </div>
        <div className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-6 text-center space-y-1 shadow-xs">
          <span className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium">
            {publicationCount}
          </span>
          <p className="text-xs uppercase tracking-[0.16em] font-mono text-[#856E4E]">
            Publications
          </p>
          <p className="text-[11px] text-[#736B61]">Co-authored anthologies &amp; books</p>
        </div>
        <div className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-6 text-center space-y-1 shadow-xs">
          <span className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium">
            {appreciationCount}
          </span>
          <p className="text-xs uppercase tracking-[0.16em] font-mono text-[#856E4E]">
            Appreciations
          </p>
          <p className="text-[11px] text-[#736B61]">Author recognition &amp; honors</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center items-center gap-2 border-b border-[#EFE9DD] pb-6">
        <button
          type="button"
          onClick={() => { setActiveFilter("all"); setLightboxIndex(null); }}
          className={`px-5 py-2 text-xs uppercase tracking-[0.16em] font-medium rounded-sm transition-colors ${
            activeFilter === "all"
              ? "bg-[#221E1B] text-[#FDFBF7]"
              : "bg-[#F7F3EB] text-[#736B61] hover:text-[#221E1B] hover:bg-[#EFE9DD]"
          }`}
        >
          All ({achievements.length})
        </button>
        <button
          type="button"
          onClick={() => { setActiveFilter("publication"); setLightboxIndex(null); }}
          className={`px-5 py-2 text-xs uppercase tracking-[0.16em] font-medium rounded-sm transition-colors ${
            activeFilter === "publication"
              ? "bg-[#221E1B] text-[#FDFBF7]"
              : "bg-[#F7F3EB] text-[#736B61] hover:text-[#221E1B] hover:bg-[#EFE9DD]"
          }`}
        >
          Publications ({publicationCount})
        </button>
        <button
          type="button"
          onClick={() => { setActiveFilter("appreciation"); setLightboxIndex(null); }}
          className={`px-5 py-2 text-xs uppercase tracking-[0.16em] font-medium rounded-sm transition-colors ${
            activeFilter === "appreciation"
              ? "bg-[#221E1B] text-[#FDFBF7]"
              : "bg-[#F7F3EB] text-[#736B61] hover:text-[#221E1B] hover:bg-[#EFE9DD]"
          }`}
        >
          Appreciations ({appreciationCount})
        </button>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAchievements.map((achievement, idx) => (
          <div
            key={achievement.id}
            className="group bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm overflow-hidden hover:border-[#856E4E] hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
            onClick={() => setLightboxIndex(idx)}
          >
            {/* Certificate Preview Image */}
            <div className="relative aspect-[4/3] bg-[#F7F3EB] overflow-hidden border-b border-[#EAE3D6]">
              <img
                src={achievement.certificateImage}
                alt={achievement.title}
                className="w-full h-full object-contain p-4 group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#221E1B]/0 group-hover:bg-[#221E1B]/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-[#221E1B]/90 text-white text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5 shadow-md">
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Certificate
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-mono font-medium rounded-xs border ${
                      achievement.type === "publication"
                        ? "bg-[#F4EFE6] text-[#856E4E] border-[#E5DDCF]"
                        : "bg-[#F0EDE6] text-[#6B5E4D] border-[#DED6C6]"
                    }`}
                  >
                    {achievement.type === "publication" ? "Publication" : "Appreciation"}
                  </span>
                  <span className="text-xs text-[#968D81] font-mono">{achievement.year}</span>
                </div>

                <h3 className="font-serif text-xl text-[#221E1B] font-medium leading-snug group-hover:text-[#856E4E] transition-colors">
                  {achievement.title}
                </h3>

                <p className="text-xs text-[#5C564E] leading-relaxed">
                  {achievement.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
                <span className="font-medium text-[#856E4E]">{achievement.publisher}</span>
                {achievement.isbn && (
                  <span className="font-mono text-[11px] text-[#968D81]">
                    ISBN: {achievement.isbn}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredAchievements[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-[#221E1B]/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            type="button"
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            type="button"
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
            aria-label="Previous certificate"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Certificate Display */}
          <div
            className="max-w-4xl max-h-[90vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredAchievements[lightboxIndex].certificateImage}
              alt={filteredAchievements[lightboxIndex].title}
              className="max-w-full max-h-[72vh] object-contain rounded-sm shadow-2xl bg-white p-2"
            />
            <div className="text-center space-y-1 text-white">
              <h4 className="font-serif text-xl font-medium">
                {filteredAchievements[lightboxIndex].title}
              </h4>
              <p className="text-sm text-white/80">
                {filteredAchievements[lightboxIndex].publisher} &middot;{" "}
                {filteredAchievements[lightboxIndex].year}
                {filteredAchievements[lightboxIndex].isbn && ` &middot; ISBN ${filteredAchievements[lightboxIndex].isbn}`}
              </p>
              <p className="text-xs text-white/50 font-mono">
                {lightboxIndex + 1} of {filteredAchievements.length}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            type="button"
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
            aria-label="Next certificate"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Connect & Explore Works CTA */}
      <section className="bg-[#F7F3EB] border border-[#EFE9DD] rounded-sm p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
        <div className="w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#E5DDCF] flex items-center justify-center text-[#856E4E] mx-auto">
          <Sparkles className="w-4 h-4" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#221E1B] font-medium">
          Explore Rishitha&apos;s Literary Catalog
        </h2>
        <p className="font-serif italic text-sm sm:text-base text-[#5C564E] max-w-lg mx-auto leading-relaxed">
          From the published book <em>That Day is Inevitable</em> to curated verses and psychological inquiries.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/books"
            className="inline-flex items-center px-6 py-3 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-[0.16em] font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            View Books
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center px-6 py-3 bg-white text-[#221E1B] border border-[#D5C7B2] text-xs uppercase tracking-[0.16em] font-medium rounded-sm hover:border-[#856E4E] transition-colors"
          >
            About Rishitha
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AchievementsPage;
