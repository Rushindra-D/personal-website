import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Feather, Mail } from "lucide-react";
import { artworks } from "../data/artworks";
import { PoetryCard } from "../components/PoetryCard";
import { ArtworkCard } from "../components/ArtworkCard";
import { ArtworkLightbox } from "../components/ArtworkLightbox";
import { BookCard } from "../components/BookCard";
import { Timeline } from "../components/Timeline";
import { useData } from "../context/DataContext";

export const HomePage: React.FC = () => {
  const { authorData, poems, books } = useData();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featuredPoems = poems.filter((p) => p.featured).slice(0, 4);
  const featuredArtworks = artworks.slice(0, 3);
  const featuredBook = books[0] || {
    id: "that-day-is-inevitable",
    slug: "that-day-is-inevitable",
    title: "That Day is Inevitable",
    subtitle: "A reflection on mortality, awareness, and living with purpose",
    author: "Rishitha Gorupati",
    synopsis: [],
    coverFront: "/assets/books/that_day_is_inevitable_front.jpg",
    buyLinks: { amazon: "https://amzn.in/d/02x4k9iQ", flipkart: "", isFlipkartPlaceholder: true },
    details: {},
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Author Portrait with fine editorial framing */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-sm overflow-hidden border border-[#E0D8CB] shadow-md bg-white">
                <img
                  src={authorData.photos.portrait}
                  alt="Rishitha Gorupati - Author, Poet, Writer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              {/* Subtle second layered photo accent */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#FDFBF7] shadow-lg hidden sm:block">
                <img
                  src={authorData.photos.garden}
                  alt="Rishitha Gorupati in garden"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Author Introduction & Tagline */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-mono text-[#856E4E]">
                Personal Creative Portfolio
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#221E1B] font-medium tracking-tight">
                {authorData.name}
              </h1>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#736B61]">
                Author • Poet • Writer • Artist {authorData.pronouns}
              </p>
            </div>

            {/* Authentic Author Quote */}
            <div className="py-2 border-y border-[#EFE9DD]">
              <blockquote className="font-serif italic text-lg sm:text-xl text-[#342F2A] leading-relaxed">
                &ldquo;{authorData.tagline}&rdquo;
              </blockquote>
            </div>

            <p className="font-serif text-base sm:text-lg text-[#5C564E] max-w-2xl leading-relaxed">
              {authorData.shortBio}
            </p>

            {/* Hero CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to="/poetry"
                className="px-7 py-3.5 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-[0.16em] font-medium rounded-sm hover:bg-[#856E4E] transition-all flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#856E4E]"
              >
                <Feather className="w-4 h-4" />
                <span>Explore Poetry</span>
              </Link>
              <Link
                to="/books"
                className="px-7 py-3.5 bg-[#F7F3EB] text-[#221E1B] border border-[#EAE3D6] text-xs uppercase tracking-[0.16em] font-medium rounded-sm hover:bg-[#EFE9DD] transition-all flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#856E4E]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Books</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED POEM SPOTLIGHT */}
      <section className="bg-[#F7F3EB] border-y border-[#EFE9DD] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="flex items-center justify-center space-x-2 text-[#856E4E]">
            <span className="h-px w-10 bg-[#B89F7B]"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-mono">Featured Verse</span>
            <span className="h-px w-10 bg-[#B89F7B]"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium">
            &ldquo;Who knows&rdquo;
          </h2>

          <div className="poem-content text-lg sm:text-xl text-[#342F2A] max-w-xl mx-auto italic font-serif leading-loose">
            {`Who knows, one day
we might become friends,
Who knows, one day
we might become foes,
Who knows, one day
we might become strangers,
Who knows, one day
we might become immigrants,
Who knows, one day
we might become guests,
But at last
who knows, one day
we could not see each other,
Forever and ever..`}
          </div>

          <div className="pt-2 text-sm font-serif italic text-[#856E4E]">
            ~Rishitha Gorupati
          </div>

          <div className="pt-4">
            <Link
              to="/poetry/who-knows"
              className="inline-flex items-center text-xs uppercase tracking-[0.18em] font-medium text-[#221E1B] hover:text-[#856E4E] border-b border-[#221E1B] hover:border-[#856E4E] pb-1 transition-colors"
            >
              Read in Dedicated Poem Page
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SELECTED POETRY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EFE9DD] pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
              From the Manuscript
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium mt-1">
              Selected Poetry
            </h2>
          </div>
          <Link
            to="/poetry"
            className="inline-flex items-center text-xs uppercase tracking-[0.14em] font-medium text-[#856E4E] hover:text-[#221E1B] transition-colors"
          >
            View Complete Collection ({poems.length} Poems)
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPoems.map((poem, index) => (
            <PoetryCard key={poem.id} poem={poem} index={index} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED BOOK SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
            Literary Works
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium">
            Published Book
          </h2>
        </div>

        <BookCard book={featuredBook} />
      </section>

      {/* 5. MUSINGS & ZENTANGLE PRACTICE HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EFE9DD] pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
              Psychological Inquiry &amp; Sketches
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium mt-1">
              Musings &amp; Zentangle Practice
            </h2>
            <p className="font-serif italic text-sm text-[#736B61] mt-1">
              &ldquo;Maybe these patterns don’t just exist on paper; maybe they reflect the patterns within the mind itself.&rdquo;
            </p>
          </div>
          <Link
            to="/musings"
            className="inline-flex items-center text-xs uppercase tracking-[0.14em] font-medium text-[#856E4E] hover:text-[#221E1B] transition-colors"
          >
            Explore Musings &amp; Sketches
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>

        {/* Featured Musing Card Banner */}
        <div className="bg-[#FDFBF7] border border-[#EAE3D6] rounded-sm p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#856E4E] bg-[#F7F3EB] px-2.5 py-1 rounded-xs border border-[#E5DDCF]">
              Featured Journal Entry
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#221E1B] font-medium">
              Fractals of Thought: A Psychological Inquiry into Zentangle Practice
            </h3>
            <p className="font-serif italic text-sm text-[#5C564E]">
              An exploration into how structured, repetitive pattern drawings reveal non-linear thoughts and bring psychological relief.
            </p>
          </div>
          <Link
            to="/musings/fractals-of-thought"
            className="shrink-0 px-6 py-3 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-[0.16em] font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
          >
            Read Journal
          </Link>
        </div>

        {/* Sketches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtworks.map((artwork, idx) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={idx}
              onClick={() => setLightboxIndex(idx)}
            />
          ))}
        </div>
      </section>

      {/* 6. ABOUT THE AUTHOR PREVIEW */}
      <section className="bg-[#F7F3EB] border-y border-[#EFE9DD] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 aspect-square rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                <img
                  src={authorData.photos.garden}
                  alt="Rishitha Gorupati portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
                About the Author
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium">
                About Rishitha {authorData.pronouns}
              </h2>
              <p className="font-serif text-base sm:text-lg text-[#4B453E] leading-relaxed">
                {authorData.bio}
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center text-xs uppercase tracking-[0.16em] font-medium text-[#221E1B] hover:text-[#856E4E] transition-colors"
                >
                  Read Full Journey &amp; Creative Disciplines
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CREATIVE JOURNEY TIMELINE PREVIEW */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
            Milestones &amp; Mediums
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium">
            Creative Journey
          </h2>
          <p className="text-xs text-[#736B61] max-w-md mx-auto">
            A progression through words, verses, published volumes, reflective musings, and structured art.
          </p>
        </div>

        <Timeline />
      </section>

      {/* 8. INVITATION & CONNECT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 py-12">
        <div className="w-10 h-10 rounded-full bg-[#F7F3EB] border border-[#EAE3D6] flex items-center justify-center text-[#856E4E] mx-auto">
          <Mail className="w-4 h-4" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#221E1B] font-medium">
          Let&apos;s Connect
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#5C564E] max-w-lg mx-auto leading-relaxed">
          Whether you have reflections on <em>That Day is Inevitable</em>, wish to discuss poetry, or explore collaborative artistic ventures.
        </p>
        <div>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-[0.18em] font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
          >
            Get in Touch
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Lightbox for Artworks */}
      <ArtworkLightbox
        artworks={artworks}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};
