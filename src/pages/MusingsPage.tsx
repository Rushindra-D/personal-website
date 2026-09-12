import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles, ArrowRight, Eye, Calendar, Clock, Feather } from "lucide-react";
import { useData } from "../context/DataContext";
import { artworks } from "../data/artworks";
import { ArtworkCard } from "../components/ArtworkCard";
import { ArtworkLightbox } from "../components/ArtworkLightbox";

export const MusingsPage: React.FC = () => {
  const { musings } = useData();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const featuredMusing = musings[0] || {
    id: "fractals-of-thought",
    slug: "fractals-of-thought",
    title: "Fractals of Thought: A Psychological Inquiry into Zentangle Practice",
    subtitle: "Do your thoughts feel scattered, or do they move in straight lines?",
    date: "March 2026",
    readTime: "6 min read",
    category: "Psychological Inquiry & Art",
    coverImage: "/assets/sketches/sketch_pattern_grid.jpg",
    content: []
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 space-y-16 sm:space-y-20">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-mono text-[#856E4E] bg-[#F7F3EB] px-3.5 py-1.5 rounded-full border border-[#EFE9DD]">
          <Feather className="w-3.5 h-3.5" />
          <span>Author&apos;s Journals &amp; Contemplations</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#221E1B] font-medium tracking-tight">
          Musings
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-[#5C564E] max-w-2xl mx-auto leading-relaxed">
          &ldquo;A collection of thoughts and ideas that offer new perspectives and something to learn.&rdquo;
        </p>
        <p className="text-xs text-[#736B61] max-w-xl mx-auto leading-relaxed">
          Explore journals and writings that look at different subjects, ideas, and experiences from a fresh perspective.
        </p>
      </div>

      {/* Featured Journal Hero Presentation */}
      <section className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-6 sm:p-10 lg:p-14 shadow-sm hover:border-[#D5C7B2] transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Journal Editorial Summary */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-2.5 py-1 bg-[#F4EFE6] text-[#856E4E] uppercase tracking-wider font-mono font-medium rounded-xs border border-[#E5DDCF]">
                {featuredMusing.category}
              </span>
              <span className="flex items-center text-[#736B61]">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {featuredMusing.date}
              </span>
              <span className="text-[#968D81]">•</span>
              <span className="flex items-center text-[#736B61]">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {featuredMusing.readTime}
              </span>
            </div>

            <div className="space-y-3">
              <Link to={`/musings/${featuredMusing.slug}`} className="group">
                <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium group-hover:text-[#856E4E] transition-colors leading-tight">
                  {featuredMusing.title}
                </h2>
              </Link>
              <p className="font-serif italic text-base text-[#736B61] leading-relaxed">
                {featuredMusing.subtitle}
              </p>
            </div>

            <blockquote className="border-l-2 border-[#856E4E] pl-4 py-1 text-sm sm:text-base font-serif text-[#4B453E] italic bg-[#F7F3EB]/50">
              &ldquo;In a way, it feels like thoughts are fractal; repeating, similar, and sometimes unpredictable, but rarely simple or linear... Maybe these patterns don&apos;t just exist on paper; maybe they reflect the patterns within the mind itself.&rdquo;
            </blockquote>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to={`/musings/${featuredMusing.slug}`}
                className="inline-flex items-center px-6 py-3 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-[0.16em] font-medium rounded-sm hover:bg-[#856E4E] transition-colors shadow-sm"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Read Full Journal &amp; Inquiry
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Link>

              <button
                type="button"
                onClick={() => setLightboxIndex(0)}
                className="inline-flex items-center px-5 py-3 border border-[#D5C7B2] bg-white text-[#4B453E] text-xs uppercase tracking-[0.14em] font-medium rounded-sm hover:border-[#856E4E] hover:text-[#221E1B] transition-colors"
              >
                <Eye className="w-3.5 h-3.5 mr-2 text-[#856E4E]" />
                View {artworks.length} Zentangle Sketches
              </button>
            </div>
          </div>

          {/* Right: Zentangle Sketch Montage */}
          <div className="lg:col-span-5">
            <div className="relative group cursor-pointer" onClick={() => setLightboxIndex(0)}>
              <div className="aspect-[4/3] rounded-sm overflow-hidden border border-[#EAE3D6] shadow-md bg-white p-2">
                <img
                  src={featuredMusing.coverImage || "/assets/sketches/sketch_nested_vortex.jpg"}
                  alt="Zentangle Fractal Study"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/sketches/sketch_nested_vortex.jpg";
                  }}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-x-4 bottom-4 bg-[#221E1B]/85 backdrop-blur-xs text-[#FDFBF7] p-3 rounded-xs text-xs flex items-center justify-between opacity-95 group-hover:opacity-100 transition-opacity">
                <div>
                  <p className="font-serif font-medium">Study in Spiral Geometry</p>
                  <p className="text-[10px] text-[#D5C7B2] tracking-wider uppercase">Pencil on Paper • Plate I</p>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#D5C7B2] flex items-center">
                  Inspect <Eye className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Zentangle Sketchbook Gallery */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EFE9DD] pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
              From the Journal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium mt-1">
              Zentangle Sketchbook Studies
            </h2>
            <p className="font-serif italic text-sm text-[#5C564E] mt-1">
              &ldquo;These patterns were not random. They held emotions, reflections, and a quiet sense of presence.&rdquo;
            </p>
          </div>
          <Link
            to={`/musings/${featuredMusing.slug}#sketches`}
            className="inline-flex items-center text-xs uppercase tracking-[0.14em] font-medium text-[#856E4E] hover:text-[#221E1B] transition-colors"
          >
            Read Alongside Text
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>

        {/* 5 Artwork Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {artworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={index}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Additional Musings / Journals */}
      {musings.length > 1 && (
        <section className="space-y-6">
          <div className="border-b border-[#EFE9DD] pb-4">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">Archive</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#221E1B] font-medium mt-1">
              More Journals &amp; Essays
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {musings.slice(1).map((m) => (
              <div key={m.id} className="p-6 bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm space-y-3 hover:border-[#856E4E] transition-all">
                <div className="flex items-center gap-2 text-xs text-[#856E4E] font-mono">
                  <span>{m.category}</span>
                  <span>•</span>
                  <span>{m.readTime}</span>
                </div>
                <Link to={`/musings/${m.slug}`}>
                  <h3 className="font-serif text-xl font-medium text-[#221E1B] hover:text-[#856E4E] transition-colors">{m.title}</h3>
                </Link>
                <p className="font-serif italic text-sm text-[#736B61] line-clamp-2">{m.subtitle}</p>
                <Link to={`/musings/${m.slug}`} className="inline-flex items-center text-xs uppercase tracking-wider text-[#856E4E] font-medium pt-2">
                  Read Journal <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Author Journal Note */}
      <div className="p-8 sm:p-10 bg-[#F7F3EB] border border-[#EFE9DD] rounded-sm text-center max-w-2xl mx-auto space-y-3">
        <div className="w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#E5DDCF] flex items-center justify-center text-[#856E4E] mx-auto">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium">
          Contemplations &amp; Future Inquiries
        </h3>
        <p className="font-serif text-sm text-[#5C564E] leading-relaxed">
          A collection of journals exploring different ideas, subjects, and experiences. Each piece offers a perspective shaped by curiosity, observation, and reflection. These writings invite you to pause, think differently, and discover something new along the way.
        </p>
        <p className="text-xs text-[#856E4E] font-medium">
          New journals and philosophical essays are added periodically.
        </p>
      </div>

      {/* Interactive Lightbox for Sketches */}
      <ArtworkLightbox
        artworks={artworks}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};
