import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Feather, BookOpen, Palette, PenTool, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useData } from "../context/DataContext";
import { Timeline } from "../components/Timeline";
import { achievements } from "../data/achievements";

export const AboutPage: React.FC = () => {
  const { authorData } = useData();
  const [certLightbox, setCertLightbox] = useState<number | null>(null);

  const navigateCert = (direction: "prev" | "next") => {
    if (certLightbox === null) return;
    const total = achievements.length;
    setCertLightbox(
      direction === "next"
        ? (certLightbox + 1) % total
        : (certLightbox - 1 + total) % total
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20 space-y-24">
      {/* Header & Hero Biography */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Two Editorial Portraits */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-6">
          <div className="relative w-64 sm:w-80 aspect-[3/4] rounded-sm overflow-hidden border border-[#E0D8CB] shadow-md bg-white">
            <img
              src="/assets/author/rishitha_red_dress.jpg"
              alt="Rishitha Gorupati"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Right: Authentic Biography */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#856E4E]">
              Biography &amp; Voice
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#221E1B] font-medium tracking-tight">
              About Rishitha {authorData.pronouns}
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-[#736B61]">
              Author • Poet • Writer • Artist
            </p>
          </div>

          <div className="py-2 border-y border-[#EFE9DD]">
            <blockquote className="font-serif italic text-lg text-[#342F2A] leading-relaxed">
              &ldquo;{authorData.tagline}&rdquo;
            </blockquote>
          </div>

          <div className="space-y-4 font-serif text-base sm:text-lg text-[#4B453E] leading-relaxed">
            <p>{authorData.bio}</p>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              to="/poetry"
              className="px-6 py-3 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
            >
              Read Her Poetry
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#F7F3EB] text-[#221E1B] border border-[#EAE3D6] text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-[#EFE9DD] transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Creative Disciplines */}
      <section className="space-y-10 pt-8 border-t border-[#EFE9DD]">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
            Creative Expressions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium">
            Creative Disciplines
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Her Writing */}
          <div className="p-8 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#F7F3EB] flex items-center justify-center text-[#856E4E]">
              <PenTool className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#221E1B] font-medium">Her Writing</h3>
            <p className="font-serif text-sm text-[#5C564E] leading-relaxed">
              Exploring introspective ideas through prose, reviewing books, and writing articles that reflect thoughts, emotions, and human experiences.
            </p>
          </div>

          {/* Her Poetry */}
          <div className="p-8 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#F7F3EB] flex items-center justify-center text-[#856E4E]">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#221E1B] font-medium">Her Poetry</h3>
            <p className="font-serif text-sm text-[#5C564E] leading-relaxed">
              Verses woven from raw emotions, quiet silences, moments of hope, friendship, parting, and existential questions.
            </p>
            <Link
              to="/poetry"
              className="inline-flex items-center text-xs uppercase tracking-wider font-medium text-[#856E4E] hover:text-[#221E1B]"
            >
              Explore 24 Poems <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* Her Books */}
          <div className="p-8 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#F7F3EB] flex items-center justify-center text-[#856E4E]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#221E1B] font-medium">Her Books</h3>
            <p className="font-serif text-sm text-[#5C564E] leading-relaxed">
              Author of <em>That Day is Inevitable</em> and co-author of several published anthologies exploring literature and the human condition.
            </p>
            <Link
              to="/books"
              className="inline-flex items-center text-xs uppercase tracking-wider font-medium text-[#856E4E] hover:text-[#221E1B]"
            >
              View Books <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* Her Musings & Journals */}
          <div className="p-8 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#F7F3EB] flex items-center justify-center text-[#856E4E]">
              <PenTool className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#221E1B] font-medium">Her Musings &amp; Journals</h3>
            <p className="font-serif text-sm text-[#5C564E] leading-relaxed">
              Introspective essays exploring the non-linear fractal nature of human thoughts, presence, and philosophical reflections.
            </p>
            <Link
              to="/musings"
              className="inline-flex items-center text-xs uppercase tracking-wider font-medium text-[#856E4E] hover:text-[#221E1B]"
            >
              Read Musings <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* Zentangle Art Therapy */}
          <div className="p-8 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#F7F3EB] flex items-center justify-center text-[#856E4E]">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#221E1B] font-medium">Zentangle &amp; Psychological Inquiry</h3>
            <p className="font-serif text-sm text-[#5C564E] leading-relaxed">
              Structured pattern drawings and pencil studies functioning as therapeutic mindfulness, patience training, and visual thought inquiry.
            </p>
            <Link
              to="/musings/fractals-of-thought"
              className="inline-flex items-center text-xs uppercase tracking-wider font-medium text-[#856E4E] hover:text-[#221E1B]"
            >
              View Zentangle Journal <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* Future Inquiries Placeholder */}
          <div className="p-8 bg-[#F7F3EB] border border-[#EAE3D6] rounded-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#856E4E]">
                Collaborations
              </span>
              <h3 className="font-serif text-2xl text-[#221E1B] font-medium">Inquiries &amp; Events</h3>
              <p className="font-serif text-sm text-[#5C564E] leading-relaxed">
                Open for literary readings, panel discussions, anthology contributions, and creative conversations.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center text-xs uppercase tracking-wider font-medium text-[#856E4E] hover:text-[#221E1B]"
            >
              Get in Touch <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements & Certificates */}
      <section id="achievements" className="space-y-10 pt-8 border-t border-[#EFE9DD]">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
            Recognition &amp; Publications
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium">
            Achievements &amp; Certificates
          </h2>
          <p className="text-xs text-[#736B61] max-w-md mx-auto">
            Published works and recognitions received from literary publishers and organizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, idx) => (
            <div
              key={achievement.id}
              className="group bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm overflow-hidden hover:border-[#856E4E] hover:shadow-md transition-all cursor-pointer"
              onClick={() => setCertLightbox(idx)}
            >
              {/* Certificate Image */}
              <div className="aspect-[4/3] overflow-hidden bg-[#F7F3EB]">
                <img
                  src={achievement.certificateImage}
                  alt={achievement.title}
                  className="w-full h-full object-contain p-3 group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              {/* Details */}
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-mono font-medium rounded-xs border ${
                    achievement.type === "publication"
                      ? "bg-[#F4EFE6] text-[#856E4E] border-[#E5DDCF]"
                      : "bg-[#F0EDE6] text-[#6B5E4D] border-[#DED6C6]"
                  }`}>
                    {achievement.type === "publication" ? "Publication" : "Appreciation"}
                  </span>
                  <span className="text-[10px] text-[#968D81] font-mono">{achievement.year}</span>
                </div>

                <h3 className="font-serif text-lg text-[#221E1B] font-medium leading-snug">
                  {achievement.title}
                </h3>

                <p className="text-xs text-[#5C564E] leading-relaxed">
                  {achievement.description}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#856E4E] font-medium">
                    {achievement.publisher}
                  </span>
                  {achievement.isbn && (
                    <span className="text-[10px] font-mono text-[#968D81]">
                      ISBN: {achievement.isbn}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificate Lightbox */}
      {certLightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#221E1B]/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setCertLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setCertLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigate Prev */}
          <button
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); navigateCert("prev"); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Certificate */}
          <div
            className="max-w-3xl max-h-[85vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={achievements[certLightbox].certificateImage}
              alt={achievements[certLightbox].title}
              className="max-w-full max-h-[70vh] object-contain rounded-sm shadow-2xl bg-white"
            />
            <div className="text-center space-y-1">
              <h4 className="font-serif text-lg text-white font-medium">
                {achievements[certLightbox].title}
              </h4>
              <p className="text-sm text-white/70">
                {achievements[certLightbox].publisher} &middot; {achievements[certLightbox].year}
              </p>
              <p className="text-xs text-white/50">
                {certLightbox + 1} of {achievements.length}
              </p>
            </div>
          </div>

          {/* Navigate Next */}
          <button
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); navigateCert("next"); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Creative Journey Timeline */}
      <section className="space-y-8 pt-8 border-t border-[#EFE9DD]">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
            Progression &amp; Evolution
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium">
            Creative Journey
          </h2>
          <p className="text-xs text-[#736B61] max-w-md mx-auto">
            A quiet path through words, poetry, published books, drawings, and future works.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Timeline />
        </div>
      </section>
    </div>
  );
};
