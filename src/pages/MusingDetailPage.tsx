import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Feather, Eye, Share2, Sparkles } from "lucide-react";
import { useData } from "../context/DataContext";
import { ArtworkLightbox } from "../components/ArtworkLightbox";

export const MusingDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { musings } = useData();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const musing = musings.find((m) => m.slug === slug || m.id === slug) || musings[0];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(100);
        return;
      }
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!musing) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <h2 className="font-serif text-3xl text-[#221E1B]">Journal Not Found</h2>
        <p className="text-sm text-[#736B61]">
          The journal entry you are looking for does not exist in the author&apos;s records.
        </p>
        <button
          onClick={() => navigate("/musings")}
          className="px-6 py-2.5 bg-[#221E1B] text-white text-xs uppercase tracking-widest rounded-sm hover:bg-[#856E4E] transition-colors"
        >
          Return to Musings
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasSketches = Boolean(musing.sketches && musing.sketches.length > 0);

  return (
    <div>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-20 left-0 w-full h-[2.5px] bg-transparent z-30">
        <div
          className="h-full bg-[#856E4E] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Navigation & Controls */}
        <div className="flex items-center justify-between border-b border-[#EFE9DD] pb-6">
          <Link
            to="/musings"
            className="inline-flex items-center text-xs uppercase tracking-[0.16em] font-medium text-[#736B61] hover:text-[#221E1B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2" />
            Back to Musings
          </Link>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center px-3 py-1.5 rounded-sm border border-[#E5DDCF] bg-[#FDFBF7] text-xs font-serif text-[#4B453E] hover:border-[#856E4E] transition-colors"
              title="Copy share link"
            >
              <Share2 className="w-3 h-3 mr-1.5 text-[#856E4E]" />
              {copied ? "Link Copied!" : "Share Journal"}
            </button>
          </div>
        </div>

        {/* Article Header */}
        <article className="space-y-12">
          <header className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E] bg-[#F7F3EB] px-3 py-1 rounded-full border border-[#EFE9DD]">
              <Feather className="w-3 h-3" />
              <span>{musing.category}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#221E1B] font-medium tracking-tight leading-tight max-w-3xl mx-auto">
              {musing.title}
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-[#5C564E] max-w-2xl mx-auto leading-relaxed">
              &ldquo;{musing.subtitle}&rdquo;
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#736B61] pt-2">
              <span className="font-serif font-medium text-[#221E1B]">By {musing.author || "Rishitha Gorupati"}</span>
              <span>•</span>
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {musing.date}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {musing.readTime}
              </span>
            </div>
          </header>

          {musing.id !== "fractals-of-thought" ? (
            <div className="space-y-6 font-serif text-base sm:text-lg text-[#2C2723] leading-relaxed max-w-2xl mx-auto">
              {musing.sections &&
                musing.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-4">
                    {section.heading && (
                      <h3 className="font-serif text-xl sm:text-2xl text-[#221E1B] font-medium pt-2">
                        {section.heading}
                      </h3>
                    )}
                    {section.paragraphs.map((p, idx) => (
                      <p
                        key={idx}
                        className={
                          sIdx === 0 && idx === 0
                            ? "first-letter:text-5xl first-letter:font-serif first-letter:text-[#856E4E] first-letter:float-left first-letter:mr-3 first-letter:leading-none"
                            : ""
                        }
                      >
                        {p}
                      </p>
                    ))}
                    {section.featuredQuote && (
                      <blockquote className="border-l-2 border-[#856E4E] pl-6 py-3 my-4 bg-[#F7F3EB]/60 italic font-serif text-lg">
                        &ldquo;{section.featuredQuote}&rdquo;
                      </blockquote>
                    )}
                  </div>
                ))}

              {musing.concludingReflection && (
                <div className="max-w-2xl mx-auto p-8 bg-[#F4EFE6] border border-[#E5DDCF] rounded-sm space-y-4 text-center my-8">
                  <Sparkles className="w-5 h-5 text-[#856E4E] mx-auto opacity-80" />
                  <p className="font-serif italic text-lg sm:text-xl text-[#221E1B] leading-relaxed">
                    &ldquo;{musing.concludingReflection}&rdquo;
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E] pt-2">
                    — {musing.author || "Rishitha Gorupati"}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Section 1: Non-linear mind */}
              <div className="space-y-6 font-serif text-base sm:text-lg text-[#2C2723] leading-relaxed max-w-2xl mx-auto">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-[#856E4E] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                  Do your thoughts feel scattered, or do they move in straight lines?
                </p>
                <p>
                  I’ve often felt that mine don’t move in straight lines; they loop, they repeat, they shift without any prior notice.
                </p>
                <p className="italic text-[#5C564E]">
                  Strange, right? That we can’t always control our own thoughts.
                </p>
                <p>
                  In a way, it feels like thoughts are fractal; repeating, similar, and sometimes unpredictable, but rarely simple or linear. More precisely, when we think about something, it connects to past memories and future worries, but only occasionally lingers in the present.
                </p>
              </div>

              {/* Pullquote 1 */}
              <div className="my-8 max-w-2xl mx-auto">
                <blockquote className="border-l-2 border-[#856E4E] pl-6 py-3 my-4 bg-[#F7F3EB]/60">
                  <p className="font-serif italic text-xl sm:text-2xl text-[#221E1B] leading-relaxed">
                    &ldquo;In a way, it feels like thoughts are fractal; repeating, similar, and sometimes unpredictable, but rarely simple or linear.&rdquo;
                  </p>
                </blockquote>
              </div>

              {/* Section 2: Sketchbook discovery */}
              <div className="space-y-6 font-serif text-base sm:text-lg text-[#2C2723] leading-relaxed max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
                  A Turn Toward Stillness
                </p>
                <p>Alright, let’s pause and come to what truly matters…</p>
                <p>
                  Have you ever heard of Zentangle art? Or have you ever felt that even the simplest patterns can hold meaning?
                </p>
                <p>
                  Recently, while I was drawing random patterns in my sketchbook, I began to notice something unexpected… I came across an art form I hadn’t even realized would mean this much to me.
                </p>
                <p>
                  At first, it felt like nothing more than simple lines and shapes. But as I continued, those patterns started to feel different, almost as if they carried something deeper within them. It no longer felt like I was just drawing; it felt like I was expressing something I couldn’t put into words.
                </p>
              </div>

              {/* Inline Sketch Highlight */}
              {hasSketches && musing.sketches && musing.sketches[0] && (
                <div className="my-10 max-w-2xl mx-auto bg-white border border-[#EAE3D6] p-4 rounded-sm shadow-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div
                      className="sm:col-span-5 cursor-pointer group relative overflow-hidden rounded bg-[#FDFBF7]"
                      onClick={() => setLightboxIndex(0)}
                    >
                      <img
                        src={musing.sketches[0].image}
                        alt={musing.sketches[0].title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs uppercase tracking-wider">
                        <Eye className="w-4 h-4 mr-1.5" /> Inspect
                      </div>
                    </div>
                    <div className="sm:col-span-7 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#856E4E]">
                        Pencil Study I • Concentric Recursion
                      </span>
                      <h4 className="font-serif text-lg font-medium text-[#221E1B]">
                        {musing.sketches[0].title}
                      </h4>
                      <p className="font-serif italic text-xs text-[#736B61]">
                        {musing.sketches[0].editorialCaption}
                      </p>
                      <p className="text-xs text-[#5C564E] leading-relaxed">
                        {musing.sketches[0].visualDescription}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 3: Inner landscape */}
              <div className="space-y-6 font-serif text-base sm:text-lg text-[#2C2723] leading-relaxed max-w-2xl mx-auto">
                <p>
                  These patterns were not random. They held emotions, reflections, and a quiet sense of presence. The more I observed them, the more I realized that they resembled the way my thoughts move, repetitive, layered, sometimes calm, sometimes chaotic, sometimes complex, yet somehow connected.
                </p>
                <p>
                  And that’s when it struck me — maybe these patterns don’t just exist on paper; maybe they reflect the patterns within the mind itself.
                </p>
                <p>
                  This realization slowly led me into a deeper exploration of how the mind works, shaping what I now understand as a psychological inquiry.
                </p>
              </div>

              {/* Section 4: Zentangle & Therapy */}
              <div className="space-y-6 font-serif text-base sm:text-lg text-[#2C2723] leading-relaxed max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
                  Structured Focus &amp; Psychological Relief
                </p>
                <p>
                  This form of expression is known as Zentangle art — a meaningful drawing technique that creates structured patterns to promote reflection and focus.
                </p>
                <p>
                  As I continued, I realized that it slowly improved my patience and guided me to stay present in the moment. It helped me focus on what is in front of me, allowing the rest to wait.
                </p>
                <p>
                  It has a calming effect on the mind, gently organizing thoughts and bringing a sense of psychological relief once the work is complete.
                </p>
                <p>
                  More than anything, it strengthens the ability to remain in the present, reducing distractions and unnecessary diversions.
                </p>
              </div>

              {/* Pullquote 2 */}
              <div className="my-8 max-w-2xl mx-auto">
                <blockquote className="border-l-2 border-[#856E4E] pl-6 py-4 my-4 bg-[#F7F3EB]/60">
                  <p className="font-serif italic text-xl sm:text-2xl text-[#221E1B] leading-relaxed font-medium">
                    &ldquo;I can say that it’s not just an art that we do, but it is a therapy that we need.&rdquo;
                  </p>
                </blockquote>
              </div>

              {/* Section 5: Connecting lines to understanding */}
              <div className="space-y-6 font-serif text-base sm:text-lg text-[#2C2723] leading-relaxed max-w-2xl mx-auto">
                <p>
                  As I spent more time with it, I realized that these lines resemble the way our mind functions, how our thoughts progress. They may appear as different patterns, yet somehow they remain connected and come together to form a clear meaning in the end.
                </p>
                <p>
                  In the same way, our thoughts are multiple and varied, yet they eventually connect, leading us to understanding. This made me realize that there is something deeper and more reflective within these patterns.
                </p>
                <p>
                  Each pattern we draw feels like a thought being revealed. Zentangle art is a way of understanding the mind, guiding our thoughts and gradually improving our patience.
                </p>
                <p>
                  It allows us to observe how our thoughts run, repeat, and reflect over time.
                </p>
              </div>

              {/* Concluding Reflection Card */}
              {musing.concludingReflection && (
                <div className="max-w-2xl mx-auto p-8 bg-[#F4EFE6] border border-[#E5DDCF] rounded-sm space-y-4 text-center my-8">
                  <Sparkles className="w-5 h-5 text-[#856E4E] mx-auto opacity-80" />
                  <p className="font-serif italic text-lg sm:text-xl text-[#221E1B] leading-relaxed">
                    &ldquo;{musing.concludingReflection}&rdquo;
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E] pt-2">
                    — Rishitha Gorupati
                  </p>
                </div>
              )}
            </>
          )}

          {/* Embedded Zentangle Sketchbook Gallery */}
          {hasSketches && musing.sketches && (
            <div id="sketches" className="pt-12 border-t border-[#EFE9DD] space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#856E4E]">
                  Original Sketches from This Journal
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#221E1B] font-medium">
                  The Five Zentangle Plates
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-[#736B61]">
                  Pencil drawings explored during the writing of this psychological inquiry. Click any sketch to inspect details in full resolution.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {musing.sketches.map((sketch, idx) => (
                  <div
                    key={sketch.id}
                    onClick={() => setLightboxIndex(idx)}
                    className="group cursor-pointer bg-white border border-[#EAE3D6] rounded-sm overflow-hidden p-3 hover:border-[#856E4E] transition-all hover:shadow-md"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#FDFBF7] mb-3 relative">
                      <img
                        src={sketch.image}
                        alt={sketch.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs uppercase tracking-wider">
                        <Eye className="w-3.5 h-3.5 mr-1" /> Examine
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#856E4E]">
                        Plate {idx + 1} • {sketch.medium}
                      </span>
                      <h4 className="font-serif text-base font-medium text-[#221E1B] group-hover:text-[#856E4E] transition-colors line-clamp-1">
                        {sketch.title}
                      </h4>
                      <p className="font-serif italic text-xs text-[#736B61] line-clamp-1">
                        {sketch.editorialCaption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author Footer Card */}
          <footer className="pt-10 border-t border-[#EFE9DD]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/musings"
                className="inline-flex items-center text-xs uppercase tracking-[0.16em] font-medium text-[#221E1B] hover:text-[#856E4E] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-2" />
                All Journal Entries
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-5 py-2.5 bg-[#221E1B] text-[#FDFBF7] text-xs uppercase tracking-[0.16em] font-medium rounded-sm hover:bg-[#856E4E] transition-colors"
              >
                Share Thoughts with Rishitha
              </Link>
            </div>
          </footer>
        </article>
      </div>

      {/* Lightbox for inspecting sketches */}
      {hasSketches && musing.sketches && (
        <ArtworkLightbox
          artworks={musing.sketches}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      )}
    </div>
  );
};
